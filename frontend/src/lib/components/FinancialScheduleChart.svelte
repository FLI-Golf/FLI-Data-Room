<script lang="ts">
  import { onMount } from "svelte";
  import { BarChart3, LineChart } from "lucide-svelte";
  import type { ScheduleChartData } from "$lib/sports-projections-charts";

  export let data: ScheduleChartData;
  let chartType: "bar" | "line" = "bar";
  let canvas: HTMLCanvasElement;
  let chart: import("chart.js").Chart | undefined;
  let ChartConstructor: typeof import("chart.js/auto").default | null = null;
  let chartError = false;
  const colors = ["#7ec8e8", "#ffb787", "#a7f3d0", "#fde68a", "#fda4af"];
  const pointStyles = [
    "circle",
    "rectRot",
    "triangle",
    "rect",
    "crossRot",
  ] as const;
  const dashes = [[], [6, 4], [2, 3], [8, 3, 2, 3], [10, 4]];

  function drawChart(
    type: "bar" | "line",
    snapshot: ScheduleChartData,
    Constructor: NonNullable<typeof ChartConstructor>,
  ) {
    chart?.destroy();
    chart = new Constructor(canvas, {
      type,
      data: {
        labels: snapshot.periods,
        datasets: snapshot.series.map((series, index) => ({
          label: series.label,
          data: [...series.values],
          borderColor: colors[index % colors.length],
          backgroundColor: colors[index % colors.length],
          borderWidth: type === "line" ? 2 : 1,
          borderDash: type === "line" ? dashes[index % dashes.length] : [],
          pointStyle: pointStyles[index % pointStyles.length],
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBorderColor: "#ffffff",
          pointBorderWidth: 1,
          tension: 0,
          spanGaps: false,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            position: "bottom",
            align: "start",
            labels: {
              color: "#f3f4f6",
              usePointStyle: true,
              padding: 14,
              font: { size: 11 },
            },
          },
          tooltip: {
            backgroundColor: "#0a2233",
            titleColor: "#ffffff",
            bodyColor: "#f3f4f6",
            borderColor: "#7ec8e8",
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (context) =>
                `${snapshot.series[context.datasetIndex].label}: ${snapshot.series[context.datasetIndex].formatted[context.dataIndex]}`,
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "#e5e7eb", maxRotation: 0, autoSkip: false },
            grid: { display: false },
            stacked: false,
          },
          y: {
            beginAtZero: true,
            stacked: false,
            title: { display: true, text: snapshot.unit, color: "#e5e7eb" },
            ticks: {
              color: "#e5e7eb",
              callback: (value) =>
                snapshot.unit === "USD"
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      notation: "compact",
                    }).format(Number(value))
                  : new Intl.NumberFormat("en-US", {
                      maximumFractionDigits: snapshot.unit === "FTE" ? 1 : 0,
                    }).format(Number(value)),
            },
            grid: {
              color: (context) =>
                context.tick.value === 0
                  ? "rgba(255,255,255,0.45)"
                  : "rgba(255,255,255,0.1)",
            },
          },
        },
      },
    });
  }

  $: if (ChartConstructor && canvas)
    drawChart(chartType, data, ChartConstructor);

  onMount(() => {
    let disposed = false;
    void import("chart.js/auto")
      .then(({ default: Constructor }) => {
        if (!disposed) ChartConstructor = Constructor;
      })
      .catch(() => {
        if (!disposed) chartError = true;
      });
    return () => {
      disposed = true;
      chart?.destroy();
    };
  });
</script>

<figure
  aria-labelledby="financial-schedule-chart-heading"
  class="min-w-0 border-y border-fg-mint/25 bg-fg-green-900/45 px-3 py-5 sm:px-5"
>
  <figcaption class="mb-4 space-y-3">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <h4
        id="financial-schedule-chart-heading"
        class="min-w-0 text-sm font-bold text-white"
      >
        {data.title}
      </h4>
      <div
        role="group"
        aria-label="Schedule chart type"
        class="flex shrink-0 gap-2"
      >
        <button
          type="button"
          aria-pressed={chartType === "bar"}
          on:click={() => (chartType = "bar")}
          class="inline-flex min-h-9 items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-mint {chartType ===
          'bar'
            ? 'border-fg-mint bg-fg-mint text-fg-green-900'
            : 'border-fg-mint/40 bg-fg-green-900 text-white/85 hover:border-fg-mint hover:text-white'}"
          ><BarChart3 class="h-3.5 w-3.5" aria-hidden="true" />Bar chart</button
        >
        <button
          type="button"
          aria-pressed={chartType === "line"}
          on:click={() => (chartType = "line")}
          class="inline-flex min-h-9 items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-mint {chartType ===
          'line'
            ? 'border-fg-mint bg-fg-mint text-fg-green-900'
            : 'border-fg-mint/40 bg-fg-green-900 text-white/85 hover:border-fg-mint hover:text-white'}"
          ><LineChart class="h-3.5 w-3.5" aria-hidden="true" />Line chart</button
        >
      </div>
    </div>
    <p class="text-xs text-white/85">
      {data.unit} | Calendar years {data.periods[0]}-{data.periods.at(-1)}
    </p>
  </figcaption>
  {#if chartError}<p role="status" class="py-4 text-sm text-amber-100">
      The chart is unavailable. Exact source values remain in the schedule
      tables.
    </p>{/if}
  <div class="relative h-96 min-w-0 w-full sm:h-80">
    <canvas bind:this={canvas} aria-hidden="true"></canvas>
  </div>
  <div class="sr-only">
    <table>
      <caption>{data.title}, {data.unit}</caption>
      <thead
        ><tr
          ><th scope="col">Metric</th>{#each data.periods as period}<th
              scope="col">{period}</th
            >{/each}</tr
        ></thead
      >
      <tbody
        >{#each data.series as series}<tr
            ><th scope="row">{series.label}</th
            >{#each series.formatted as value}<td>{value}</td>{/each}</tr
          >{/each}</tbody
      >
    </table>
  </div>
</figure>
