import type { ProjectionSheet } from "./server/sports-projections.ts";

export interface ScheduleChartData {
  title: string;
  unit: "USD" | "Count" | "Enterprise clients" | "FTE";
  periods: string[];
  series: { label: string; values: (number | null)[]; formatted: string[] }[];
}

const CHARTS: Record<
  string,
  { title: string; unit: ScheduleChartData["unit"]; metrics: string[] }
> = {
  Summary: {
    title: "Gross profit, operating expenses and EBITDA",
    unit: "USD",
    metrics: ["Gross profit", "Operating expenses", "EBITDA"],
  },
  Assumptions: {
    title: "Enterprise client assumptions",
    unit: "Enterprise clients",
    metrics: ["FLIHUB enterprise clients", "FGF enterprise clients"],
  },
  "League Build": {
    title: "Paid leagues and paid users",
    unit: "Count",
    metrics: ["Paid leagues", "Paid users"],
  },
  "Cost of Revenue": {
    title: "Direct cost components",
    unit: "USD",
    metrics: [
      "Prize and reward cost",
      "Payment processing",
      "Variable delivery cost",
    ],
  },
  "Operating Expenses": {
    title: "Operating expense components",
    unit: "USD",
    metrics: [
      "Product and engineering",
      "Cloud, security and compliance",
      "Sales and marketing",
      "Customer support",
      "General and administrative",
    ],
  },
  Headcount: {
    title: "Total average paid FTE",
    unit: "FTE",
    metrics: ["Total average paid FTE"],
  },
  "Cash Planning": {
    title: "Illustrative cash collections and payments",
    unit: "USD",
    metrics: [
      "Total cash collections",
      "Cash paid for cost of revenue",
      "Cash paid for operating expenses",
      "Capital expenditures",
    ],
  },
};

const EXCLUSIONS: Record<string, string> = {
  "Revenue Build":
    "Charts are withheld pending review of the source labels and unlabeled totals. The published rows remain unchanged below.",
  Sensitivity:
    "This is a two-variable scenario grid, not a calendar-year series. The tables retain both league-volume and price inputs without flattening them into a single trend.",
  Audit:
    "These are reconciliation controls and budget-capacity checks, not a projection trend. The tables preserve the exact differences and control values.",
  Sources:
    "Source references and open accounting decisions do not form numeric time series.",
};

export function getScheduleChart(
  sheet: ProjectionSheet,
  periods: string[],
): {
  chart: ScheduleChartData | null;
  reason: string | null;
} {
  const definition = CHARTS[sheet.name];
  if (!definition)
    return {
      chart: null,
      reason:
        EXCLUSIONS[sheet.name] ??
        "No validated, comparable calendar-year series is configured for this schedule.",
    };
  const table = sheet.tables[0];
  if (
    !table ||
    periods.length < 2 ||
    !periods.every((period) => /^\d{4}$/.test(period)) ||
    table.headers.length !== periods.length + 1 ||
    table.headers.slice(1).some((cell, index) => cell.text !== periods[index])
  ) {
    return {
      chart: null,
      reason:
        "The source periods do not match the calendar-year chart layout. Exact source values remain in the tables.",
    };
  }
  const series: ScheduleChartData["series"] = [];
  for (const label of definition.metrics) {
    const matches = table.rows.filter((row) => row.cells[0].text === label);
    if (
      matches.length !== 1 ||
      matches[0].cells.length !== periods.length + 1
    ) {
      return {
        chart: null,
        reason:
          "A required chart series is missing or has an ambiguous source label. Exact source rows remain in the tables.",
      };
    }
    const cells = matches[0].cells.slice(1);
    const validUnits = cells.every((cell) => {
      if (cell.number === null) return cell.text === "";
      if (!Number.isFinite(cell.number)) return false;
      return definition.unit === "USD"
        ? cell.text.includes("$") || (cell.number === 0 && cell.text === "-")
        : !/[$%]/.test(cell.text);
    });
    if (
      !validUnits ||
      cells.filter((cell) => cell.number !== null).length < 2
    ) {
      return {
        chart: null,
        reason:
          "The source units or numeric observations are not suitable for a comparable bar/line chart. Exact source values remain in the tables.",
      };
    }
    series.push({
      label,
      values: cells.map((cell) => cell.number),
      formatted: cells.map((cell) => cell.text),
    });
  }
  return {
    chart: {
      title: definition.title,
      unit: definition.unit,
      periods: [...periods],
      series,
    },
    reason: null,
  };
}
