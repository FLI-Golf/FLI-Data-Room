import assert from "node:assert/strict";
import { test } from "node:test";
import ExcelJS from "exceljs";
import {
  parseSportsProjections,
  type ProjectionSheet,
} from "./sports-projections.ts";
import { getScheduleChart } from "../sports-projections-charts.ts";

function sourceFixture() {
  const workbook = new ExcelJS.Workbook();
  const summary = workbook.addWorksheet("Summary");
  summary.getCell("C2").value = "FLI Sports Technologies financial projection";
  summary.getCell("C3").value =
    "Management planning model supporting the investor-deck forecast. USD, calendar years 2027-2031.";
  summary.getCell("C6").value = "Metric";
  for (const [index, year] of [2027, 2028, 2029, 2030, 2031].entries()) {
    summary.getCell(6, index + 4).value = year;
  }
  const metrics = [
    {
      label: "Total revenue",
      values: [795000, 3750000, 10825000, 22150000, 50000000],
      format: "$#,##0;($#,##0);-",
    },
    {
      label: "EBITDA",
      values: [-485000, 550000, 3325000, 7850000, 33000000],
      format: "$#,##0;($#,##0);-",
    },
    {
      label: "Gross margin",
      values: [0.648, 0.68, 0.723, 0.738, 0.85],
      format: "0.0%",
    },
    {
      label: "Paid users",
      values: [12000, 60000, 180000, 360000, 900000],
      format: "#,##0",
    },
  ];
  for (const [index, metric] of metrics.entries()) {
    summary.getCell(index + 7, 3).value = metric.label;
    metric.values.forEach((value, column) => {
      const cell = summary.getCell(index + 7, column + 4);
      cell.value = { formula: String(value), result: value };
      cell.numFmt = metric.format;
    });
  }
  summary.getCell("K6").value = "Model status";
  summary.getCell("K7").value = "Revenue reconciliation";
  summary.getCell("L7").value = { formula: "0", result: 0 };
  summary.getCell("L7").numFmt = "$#,##0;($#,##0);-";
  summary.getCell("K13").value =
    "Use limitations: this model is a management forecast, not GAAP financial statements. It excludes income taxes, stock compensation, depreciation and amortization, debt service, detailed deferred-revenue accounting, and a fully supported balance sheet. The Cash Planning tab is an operating cash illustration and must not replace Ina's treasury model.";
  return workbook;
}

test("preserves cached figures, negative EBITDA, units, periods, and number formats", async () => {
  const data = await parseSportsProjections(
    await sourceFixture().xlsx.writeBuffer(),
  );
  assert.deepEqual(data.periods, ["2027", "2028", "2029", "2030", "2031"]);
  assert.deepEqual(
    data.cards.map((card) => card.value),
    ["$50,000,000", "$33,000,000", "85.0%", "900,000"],
  );
  assert.equal(data.trend[1].values[0], -485000);
  assert.equal(data.trend[1].formatted[0], "($485,000)");
  assert.ok(data.qualifications[0].includes("not GAAP financial statements"));
  assert.ok(
    data.qualifications[0].includes("must not replace Ina's treasury model"),
  );
});

test("preserves cached zero formulas and explicitly blank formulas", async () => {
  const workbook = sourceFixture();
  workbook.getWorksheet("Summary")!.getCell("L8").value = { formula: '""' };
  const data = await parseSportsProjections(await workbook.xlsx.writeBuffer());
  assert.equal(data.sheets[0].tables[1].rows[0].cells[1].number, 0);
  assert.equal(data.sheets[0].tables[1].rows[0].cells[1].text, "-");
});

test("rejects missing financial formula results rather than recalculating them", async () => {
  const workbook = sourceFixture();
  workbook.getWorksheet("Summary")!.getCell("D7").value = { formula: "795000" };
  await assert.rejects(
    () => workbook.xlsx.writeBuffer().then(parseSportsProjections),
    /Missing cached formula result/,
  );
});

test("flags unlabeled rows and conflicting source labels without correcting them", async () => {
  const workbook = sourceFixture();
  for (const name of ["Assumptions", "Revenue Build"]) {
    const sheet = workbook.addWorksheet(name);
    sheet.getCell("C2").value = name;
    sheet.getCell("C6").value = "Metric";
    sheet.getCell("D6").value = 2027;
    sheet.getCell("C7").value = "FLIHUB annual license";
    sheet.getCell("D7").value = name === "Assumptions" ? 10000 : 5;
  }
  workbook.getWorksheet("Revenue Build")!.getCell("D8").value = 95000;
  const data = await parseSportsProjections(await workbook.xlsx.writeBuffer());
  assert.ok(data.reviewNotes.some((note) => note.includes("different values")));
  assert.ok(
    data.reviewNotes.some((note) => note.includes("no source row label")),
  );
  assert.equal(data.sheets[2].tables[0].rows[0].cells[1].number, 5);
  assert.equal(data.sheets[2].tables[0].rows[1].cells[0].text, "");
});

test("rejects unexpected Summary periods or missing required metrics", async () => {
  const workbook = sourceFixture();
  workbook.getWorksheet("Summary")!.getCell("D6").value = "Unclear period";
  await assert.rejects(
    () => workbook.xlsx.writeBuffer().then(parseSportsProjections),
    /Unrecognized projection periods/,
  );
  workbook.getWorksheet("Summary")!.getCell("D6").value = 2027;
  workbook.getWorksheet("Summary")!.getCell("C7").value = "Unclear metric";
  await assert.rejects(
    () => workbook.xlsx.writeBuffer().then(parseSportsProjections),
    /Missing Summary metric/,
  );
});

const chartPeriods = ["2027", "2028", "2029", "2030", "2031"];

function chartFixture(): ProjectionSheet {
  const metrics = [
    { label: "FLIHUB enterprise clients", values: [5, 20, 50, 100, 110] },
    { label: "FGF enterprise clients", values: [3, 10, 25, 50, 60] },
  ];
  return {
    name: "Assumptions",
    title: "Forecast assumptions",
    description: "Management assumptions",
    notes: [],
    tables: [
      {
        headers: ["Driver", ...chartPeriods].map((text, index) => ({
          address: `${index}:6`,
          text,
          number: null,
          input: false,
        })),
        rows: metrics.map((metric, index) => ({
          number: index + 7,
          cells: [
            {
              address: `C${index + 7}`,
              text: metric.label,
              number: null,
              input: false,
            },
            ...metric.values.map((value, column) => ({
              address: `${column}:${index + 7}`,
              text: String(value),
              number: value,
              input: true,
            })),
          ],
        })),
      },
    ],
  };
}

test("schedule charts preserve source labels, periods, units and exact numeric/displayed values", () => {
  const source = chartFixture();
  const original = structuredClone(source);
  const { chart, reason } = getScheduleChart(source, chartPeriods);
  assert.ok(chart);
  assert.equal(reason, null);
  assert.equal(chart.unit, "Enterprise clients");
  assert.deepEqual(chart.periods, chartPeriods);
  assert.deepEqual(chart.series[0], {
    label: "FLIHUB enterprise clients",
    values: [5, 20, 50, 100, 110],
    formatted: ["5", "20", "50", "100", "110"],
  });
  assert.deepEqual(source, original);
});

test("schedule charts preserve blanks as gaps rather than inventing zero values", () => {
  const source = chartFixture();
  source.tables[0].rows[0].cells[2].number = null;
  source.tables[0].rows[0].cells[2].text = "";
  const { chart } = getScheduleChart(source, chartPeriods);
  assert.ok(chart);
  assert.equal(chart.series[0].values[1], null);
  assert.equal(chart.series[0].formatted[1], "");
});

test("schedule charts reject mismatched periods, ambiguous labels and mixed units", () => {
  const periods = chartFixture();
  periods.tables[0].headers[1].text = "Price";
  assert.equal(getScheduleChart(periods, chartPeriods).chart, null);
  const labels = chartFixture();
  labels.tables[0].rows.push(structuredClone(labels.tables[0].rows[0]));
  assert.equal(getScheduleChart(labels, chartPeriods).chart, null);
  const units = chartFixture();
  units.tables[0].rows[0].cells[1].text = "5%";
  assert.equal(getScheduleChart(units, chartPeriods).chart, null);
});

test("table-only schedules provide explanations instead of misleading charts", () => {
  for (const name of ["Revenue Build", "Sensitivity", "Audit", "Sources"]) {
    const source = chartFixture();
    source.name = name;
    const result = getScheduleChart(source, chartPeriods);
    assert.equal(result.chart, null);
    assert.ok(result.reason);
  }
});
