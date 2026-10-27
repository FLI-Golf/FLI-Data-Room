import ExcelJS from "exceljs";
import SSF from "ssf";

export const SPORTS_PROJECTIONS_SOURCE =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTJZ87mFD_0s9m8L9keQJYAH6HTdUluJCPXo9f0Vk3r2m7UxRwbvOVegsz8kn-nXQ/pubhtml";
const EXPORT_URL = SPORTS_PROJECTIONS_SOURCE.replace(
  "/pubhtml",
  "/pub?output=xlsx",
);
const CACHE_MS = 5 * 60 * 1000;

export interface ProjectionCell {
  address: string;
  text: string;
  number: number | null;
  input: boolean;
}

export interface ProjectionRow {
  number: number;
  cells: ProjectionCell[];
}

export interface ProjectionTable {
  headers: ProjectionCell[];
  rows: ProjectionRow[];
}

export interface ProjectionSheet {
  name: string;
  title: string;
  description: string;
  tables: ProjectionTable[];
  notes: string[];
}

export interface SportsProjections {
  fetchedAt: string;
  sheets: ProjectionSheet[];
  qualifications: string[];
  reviewNotes: string[];
  periods: string[];
  cards: { label: string; value: string; period: string }[];
  trend: { label: string; values: number[]; formatted: string[] }[];
}

function readCell(cell: ExcelJS.Cell): ProjectionCell {
  if (cell.type === ExcelJS.ValueType.Merge) {
    return { address: cell.address, text: "", number: null, input: false };
  }
  let value = cell.value;
  if (
    value &&
    typeof value === "object" &&
    ("formula" in value || "sharedFormula" in value)
  ) {
    if ("formula" in value && value.formula === '""') value = "";
    else {
      if (cell.result === undefined)
        throw new Error(`Missing cached formula result: ${cell.address}`);
      value = cell.result;
    }
  }
  if (value && typeof value === "object" && "error" in value) {
    throw new Error(`Spreadsheet error at ${cell.address}`);
  }
  let text = "";
  if (typeof value === "number") {
    if (!Number.isFinite(value))
      throw new Error(`Invalid number at ${cell.address}`);
    text = SSF.format(cell.numFmt || "General", value);
  } else if (typeof value === "string" || typeof value === "boolean") {
    text = String(value);
  } else if (value && typeof value === "object" && "richText" in value) {
    text = value.richText.map((part) => part.text).join("");
  } else if (value && typeof value === "object" && "text" in value) {
    text = value.text;
  } else if (value !== null && value !== undefined) {
    throw new Error(`Unsupported cell value: ${cell.address}`);
  }
  return {
    address: cell.address,
    text,
    number: typeof value === "number" ? value : null,
    input: cell.font?.color?.argb?.slice(-6).toUpperCase() === "0000FF",
  };
}

export async function parseSportsProjections(
  buffer: ArrayBuffer,
): Promise<SportsProjections> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  const reviewNotes: string[] = [];
  const sheets = workbook.worksheets.map((sheet): ProjectionSheet => {
    const populated = new Map<number, Map<number, ProjectionCell>>();
    const columns = new Set<number>();
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber < 6) return;
      const cells = new Map<number, ProjectionCell>();
      row.eachCell((cell, column) => {
        const parsed = readCell(cell);
        if (!parsed.text) return;
        cells.set(column, parsed);
        columns.add(column);
      });
      if (cells.size) populated.set(rowNumber, cells);
    });
    const groups: number[][] = [];
    for (const column of [...columns].sort((first, second) => first - second)) {
      const previous = groups.at(-1);
      if (previous && previous.at(-1) === column - 1) previous.push(column);
      else groups.push([column]);
    }
    const notes: string[] = [];
    const tables: ProjectionTable[] = [];
    for (const group of groups) {
      let table: ProjectionTable | null = null;
      let previousRow = 0;
      for (const [rowNumber, cells] of populated) {
        const present = group
          .map((column) => cells.get(column))
          .filter((cell) => cell !== undefined);
        if (!present.length) continue;
        if (
          present.length === 1 &&
          present[0].number === null &&
          present[0].text.length > 120
        ) {
          notes.push(present[0].text);
          continue;
        }
        const row = group.map(
          (column) =>
            cells.get(column) ?? readCell(sheet.getCell(rowNumber, column)),
        );
        if (!table || (group !== groups[0] && rowNumber > previousRow + 1)) {
          table = { headers: row, rows: [] };
          tables.push(table);
        } else {
          table.rows.push({ number: rowNumber, cells: row });
          if (!row[0].text && row.some((cell) => cell.number !== null)) {
            reviewNotes.push(
              `${sheet.name}, row ${rowNumber}: numeric values have no source row label. No label has been inferred.`,
            );
          }
        }
        previousRow = rowNumber;
      }
    }
    return {
      name: sheet.name,
      title: readCell(sheet.getCell("C2")).text,
      description: readCell(sheet.getCell("C3")).text,
      tables,
      notes,
    };
  });
  const summary = sheets.find((sheet) => sheet.name === "Summary");
  const summaryTable = summary?.tables[0];
  if (!summaryTable || !summary?.description.includes("USD"))
    throw new Error("Unrecognized Summary layout or units");
  const periods = summaryTable.headers.slice(1).map((cell) => cell.text);
  if (!periods.length || !periods.every((period) => /^\d{4}$/.test(period)))
    throw new Error("Unrecognized projection periods");
  const findMetric = (label: string) => {
    const row = summaryTable.rows.find((row) => row.cells[0].text === label);
    if (!row || row.cells.slice(1).some((cell) => cell.number === null))
      throw new Error(`Missing Summary metric: ${label}`);
    return row.cells.slice(1);
  };
  const assumptions = sheets.find((sheet) => sheet.name === "Assumptions")
    ?.tables[0];
  const revenue = sheets.find((sheet) => sheet.name === "Revenue Build")
    ?.tables[0];
  for (const row of revenue?.rows ?? []) {
    const assumption = assumptions?.rows.find(
      (candidate) => candidate.cells[0].text === row.cells[0].text,
    );
    if (
      assumption &&
      row.cells
        .slice(1)
        .some(
          (cell, index) => cell.number !== assumption.cells[index + 1]?.number,
        )
    ) {
      reviewNotes.push(
        `Revenue Build ${row.cells[0].address}: "${row.cells[0].text}" has different values from the identically labeled Assumptions row. Confirm the label and values; both are shown unchanged.`,
      );
    }
  }
  if (
    revenue?.rows.some(
      (row) =>
        row.cells[0].text === "Reconciliation difference" &&
        row.cells
          .slice(1)
          .some((cell) => cell.number !== null && cell.number !== 0),
    )
  ) {
    reviewNotes.push(
      'Revenue Build: the row labeled "Reconciliation difference" is nonzero, while the Audit tab reports zero revenue difference. Confirm the source row alignment.',
    );
  }
  return {
    fetchedAt: new Date().toISOString(),
    sheets,
    qualifications: summary.notes,
    reviewNotes,
    periods,
    cards: ["Total revenue", "EBITDA", "Gross margin", "Paid users"].map(
      (label) => ({
        label,
        value: findMetric(label).at(-1)!.text,
        period: periods.at(-1)!,
      }),
    ),
    trend: ["Total revenue", "EBITDA"].map((label) => ({
      label,
      values: findMetric(label).map((cell) => cell.number!),
      formatted: findMetric(label).map((cell) => cell.text),
    })),
  };
}

let cached: SportsProjections | null = null;
let pending: Promise<SportsProjections> | null = null;

export async function loadSportsProjections(): Promise<SportsProjections | null> {
  if (cached && Date.now() - Date.parse(cached.fetchedAt) < CACHE_MS)
    return cached;
  try {
    if (!pending) {
      pending = (async () => {
        const response = await fetch(EXPORT_URL, {
          signal: AbortSignal.timeout(15000),
          cache: "no-store",
        });
        if (!response.ok)
          throw new Error(`Workbook export failed: ${response.status}`);
        const buffer = await response.arrayBuffer();
        if (buffer.byteLength > 5 * 1024 * 1024)
          throw new Error("Workbook export too large");
        return parseSportsProjections(buffer);
      })();
    }
    cached = await pending;
    return cached;
  } catch {
    return null;
  } finally {
    pending = null;
  }
}
