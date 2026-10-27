<script lang="ts">
  import { onMount } from "svelte";
  import {
    Activity,
    BarChart3,
    BookOpen,
    Briefcase,
    CalendarDays,
    CircleDollarSign,
    Clock3,
    Cpu,
    FileText,
    ListChecks,
    Percent,
    Receipt,
    ShieldAlert,
    SlidersHorizontal,
    Table2,
    TriangleAlert,
    TrendingUp,
    Users,
    Wallet,
  } from "lucide-svelte";
  import type { SportsProjections } from "$lib/server/sports-projections";
  import { getScheduleChart } from "$lib/sports-projections-charts";
  import FinancialScheduleChart from "$lib/components/FinancialScheduleChart.svelte";

  export let projections: SportsProjections | null;
  export let sourceUrl: string;
  let selectedSheet = "Summary";
  let canvas: HTMLCanvasElement;
  const cardAppearance = {
    "Total revenue": {
      icon: CircleDollarSign,
      accent: "text-fg-mint",
      border: "border-t-fg-mint",
      background: "bg-fg-mint/10",
    },
    EBITDA: {
      icon: TrendingUp,
      accent: "text-emerald-200",
      border: "border-t-emerald-300",
      background: "bg-emerald-300/10",
    },
    "Gross margin": {
      icon: Percent,
      accent: "text-amber-200",
      border: "border-t-fg-gold",
      background: "bg-fg-gold/10",
    },
    "Paid users": {
      icon: Users,
      accent: "text-brand-100",
      border: "border-t-brand-300",
      background: "bg-brand-300/10",
    },
  };
  const sheetIcons: Record<string, typeof Table2> = {
    Summary: BarChart3,
    Assumptions: SlidersHorizontal,
    "League Build": Users,
    "Revenue Build": CircleDollarSign,
    "Cost of Revenue": Receipt,
    "Operating Expenses": Briefcase,
    Headcount: Users,
    "Cash Planning": Wallet,
    Sensitivity: Activity,
    Audit: ListChecks,
    Sources: BookOpen,
  };
  const isKeyRow = (label: string) =>
    /^(Total |EBITDA$|Gross profit$|Ending cash before tax and financing$)/.test(
      label,
    );
  $: sheet =
    projections?.sheets.find((candidate) => candidate.name === selectedSheet) ??
    projections?.sheets[0];
  $: selectedTabIndex =
    projections?.sheets.findIndex(
      (candidate) => candidate.name === sheet?.name,
    ) ?? 0;
  $: scheduleChart =
    sheet && projections ? getScheduleChart(sheet, projections.periods) : null;

  function handleTabKeydown(event: KeyboardEvent, index: number) {
    const schedules = projections?.sheets;
    if (!schedules?.length) return;
    let nextIndex = index;
    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % schedules.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + schedules.length) % schedules.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = schedules.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    selectedSheet = schedules[nextIndex].name;
    const tab = (
      event.currentTarget as HTMLButtonElement
    ).parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[
      nextIndex
    ];
    tab?.focus({ preventScroll: true });
    tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  onMount(() => {
    let disposed = false;
    let chart: import("chart.js").Chart | undefined;
    const snapshot = projections;
    if (snapshot && canvas) {
      void import("chart.js/auto").then(({ default: Chart }) => {
        if (disposed) return;
        chart = new Chart(canvas, {
          type: "line",
          data: {
            labels: snapshot.periods,
            datasets: snapshot.trend.map((series, index) => ({
              label: series.label,
              data: series.values,
              borderColor: index === 0 ? "#7ec8e8" : "#ffb787",
              backgroundColor: index === 0 ? "#7ec8e8" : "#ffb787",
              borderDash: index === 0 ? [] : [6, 4],
              pointStyle: index === 0 ? "circle" : "rectRot",
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBorderColor: "#ffffff",
              pointBorderWidth: 1,
              borderWidth: 2,
              tension: 0,
            })),
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            interaction: { mode: "index", intersect: false },
            plugins: {
              legend: {
                labels: {
                  color: "#f3f4f6",
                  usePointStyle: true,
                  padding: 24,
                  font: { size: 12 },
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
                    `${snapshot.trend[context.datasetIndex].label}: ${snapshot.trend[context.datasetIndex].formatted[context.dataIndex]}`,
                },
              },
            },
            scales: {
              x: { ticks: { color: "#d1d5db" }, grid: { display: false } },
              y: {
                title: { display: true, text: "USD", color: "#d1d5db" },
                ticks: {
                  color: "#d1d5db",
                  callback: (value) =>
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      notation: "compact",
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
      });
    }
    return () => {
      disposed = true;
      chart?.destroy();
    };
  });
</script>

<section
  id="fli-sports-technologies-financial-projections"
  aria-labelledby="sports-projections-heading"
  class="min-w-0 scroll-mt-6 space-y-8"
>
  <header class="border-b border-fg-mint/25 pb-6">
    <div class="min-w-0 max-w-4xl">
      <div
        class="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-fg-mint"
      >
        <Cpu class="h-4 w-4 shrink-0" aria-hidden="true" />Investment Area 03
      </div>
      <h1
        id="sports-projections-heading"
        class="mt-3 break-words text-2xl font-black leading-tight text-white sm:text-3xl"
      >
        FLI Sports Technologies Financial Projections
      </h1>
      {#if projections}<p
          class="mt-3 max-w-3xl text-sm leading-relaxed text-white/85"
        >
          {projections.sheets[0].description}
        </p>{/if}
    </div>
  </header>

  {#if projections}
    <div
      class="space-y-3 border-l-4 border-fg-mint bg-fg-green-900/65 px-4 py-4 sm:px-5"
    >
      <h2 class="flex items-center gap-2 text-sm font-bold text-white">
        <ShieldAlert
          class="h-5 w-5 shrink-0 text-fg-mint"
          aria-hidden="true"
        />Forecast qualifications
      </h2>
      {#each projections.qualifications as note}<p
          class="text-sm leading-relaxed text-white/85"
        >
          {note}
        </p>{/each}
    </div>

    {#if projections.reviewNotes.length}
      <details
        class="border-y border-amber-200/40 bg-amber-950/30 px-4 py-4 text-sm text-amber-100"
      >
        <summary
          class="cursor-pointer font-semibold leading-relaxed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
          ><TriangleAlert
            class="mr-2 inline h-4 w-4"
            aria-hidden="true"
          />{projections.reviewNotes.length} source items require review. Labels and
          figures are shown as published.</summary
        >
        <ul class="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed">
          {#each projections.reviewNotes as note}<li>{note}</li>{/each}
        </ul>
      </details>
    {/if}

    <div class="space-y-4">
      <h2 class="flex items-center gap-2 text-lg font-bold text-white">
        <Wallet
          class="h-5 w-5 shrink-0 text-fg-mint"
          aria-hidden="true"
        />Forecast snapshot
      </h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {#each projections.cards as card}
          {@const appearance =
            cardAppearance[card.label as keyof typeof cardAppearance] ??
            cardAppearance["Total revenue"]}
          <div
            class="min-w-0 rounded-lg border border-white/20 border-t-2 {appearance.border} bg-fg-green-900/80 p-5"
          >
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md {appearance.background} {appearance.accent}"
              >
                <svelte:component
                  this={appearance.icon}
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </div>
              <p
                class="text-xs font-semibold uppercase tracking-wide text-white/80"
              >
                {card.period} forecast
              </p>
            </div>
            <p
              class="mt-5 break-words text-2xl font-black tabular-nums text-white"
            >
              {card.value}
            </p>
            <p class="mt-2 text-sm font-semibold {appearance.accent}">
              {card.label}
            </p>
          </div>
        {/each}
      </div>
    </div>

    <figure
      class="min-w-0 border-y border-fg-mint/25 bg-fg-green-900/45 px-3 py-6 sm:px-5"
    >
      <figcaption class="mb-4 flex flex-wrap items-start justify-between gap-3">
        <span class="flex items-center gap-2 text-lg font-bold text-white"
          ><BarChart3
            class="h-5 w-5 shrink-0 text-fg-mint"
            aria-hidden="true"
          />Revenue and EBITDA</span
        >
        <span
          class="inline-flex items-center gap-2 text-xs font-medium text-white/85"
          ><CalendarDays
            class="h-4 w-4 shrink-0 text-fg-mint"
            aria-hidden="true"
          />USD, calendar years {projections
            .periods[0]}-{projections.periods.at(-1)}</span
        >
      </figcaption>
      <div class="relative h-72 min-w-0 w-full sm:h-80">
        <canvas bind:this={canvas} aria-hidden="true"></canvas>
      </div>
      <div class="sr-only">
        <table>
          <caption>Revenue and EBITDA forecast, USD</caption>
          <thead
            ><tr
              ><th scope="col">Metric</th
              >{#each projections.periods as period}<th scope="col">{period}</th
                >{/each}</tr
            ></thead
          >
          <tbody
            >{#each projections.trend as series}<tr
                ><th scope="row">{series.label}</th
                >{#each series.formatted as value}<td>{value}</td>{/each}</tr
              >{/each}</tbody
          >
        </table>
      </div>
    </figure>

    <div class="min-w-0 space-y-6">
      <h2
        id="sports-projections-schedules-heading"
        class="flex items-center gap-2 text-lg font-bold text-white"
      >
        <Table2
          class="h-5 w-5 shrink-0 text-fg-mint"
          aria-hidden="true"
        />Financial schedules
      </h2>
      <div
        role="tablist"
        aria-labelledby="sports-projections-schedules-heading"
        aria-orientation="horizontal"
        class="flex max-w-full gap-1 overflow-x-auto overscroll-x-contain border-b border-fg-mint/30 pb-1"
      >
        {#each projections.sheets as option, index}
          <button
            type="button"
            role="tab"
            id="sports-projections-tab-{index}"
            aria-selected={selectedTabIndex === index}
            aria-controls="sports-projections-panel"
            tabindex={selectedTabIndex === index ? 0 : -1}
            on:click={() => (selectedSheet = option.name)}
            on:keydown={(event) => handleTabKeydown(event, index)}
            class="inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fg-mint {selectedTabIndex ===
            index
              ? 'border-fg-mint bg-fg-green-800 text-white'
              : 'border-transparent text-white/80 hover:border-fg-mint/50 hover:bg-fg-green-900/70 hover:text-white'}"
          >
            <svelte:component
              this={sheetIcons[option.name] ?? Table2}
              class="h-4 w-4 shrink-0 text-fg-mint"
              aria-hidden="true"
            />
            {option.name}
          </button>
        {/each}
      </div>

      {#if sheet}
        <div
          id="sports-projections-panel"
          role="tabpanel"
          aria-labelledby="sports-projections-tab-{selectedTabIndex}"
          tabindex="0"
          class="min-w-0 space-y-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-mint"
        >
          <div>
            <h3 class="flex items-center gap-2 text-base font-bold text-white">
              <svelte:component
                this={sheetIcons[sheet.name] ?? Table2}
                class="h-5 w-5 shrink-0 text-fg-mint"
                aria-hidden="true"
              />{sheet.title}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-white/85">
              {sheet.description}
            </p>
          </div>
          {#if scheduleChart?.chart}
            {#key sheet.name}
              <FinancialScheduleChart data={scheduleChart.chart} />
            {/key}
          {:else if scheduleChart?.reason}
            <p
              class="flex items-start gap-2 border-l-2 border-fg-mint/60 bg-fg-green-900/40 px-4 py-3 text-sm leading-relaxed text-white/85"
            >
              <Table2
                class="mt-0.5 h-4 w-4 shrink-0 text-fg-mint"
                aria-hidden="true"
              /><span>{scheduleChart.reason}</span>
            </p>
          {/if}
          {#each sheet.tables as table, tableIndex}
            {#if table.rows.length}
              <div
                class="max-w-full overflow-x-auto rounded-lg border border-fg-mint/30"
                role="region"
                aria-label="{sheet.name} table {tableIndex + 1}"
              >
                <table class="w-full min-w-[48rem] border-collapse text-sm">
                  <caption class="sr-only"
                    >{sheet.title}, {table.headers[0].text}. Source units and
                    number formats retained.</caption
                  >
                  <thead
                    class="border-b border-fg-mint/30 bg-fg-green-800 text-white"
                  >
                    <tr
                      >{#each table.headers as cell, column}<th
                          scope="col"
                          class="px-4 py-3 font-semibold {column === 0
                            ? 'sticky left-0 z-10 min-w-[12rem] bg-fg-green-800 text-left sm:min-w-[15rem]'
                            : 'text-right'}">{cell.text}</th
                        >{/each}</tr
                    >
                  </thead>
                  <tbody class="divide-y divide-white/15 bg-fg-green-900/65">
                    {#each table.rows as row}
                      {#if row.cells.slice(1).every((cell) => !cell.text)}
                        <tr class="bg-fg-green-800"
                          ><th
                            scope="row"
                            colspan={row.cells.length}
                            class="border-l-2 border-fg-mint px-4 py-3 text-left font-semibold text-white"
                            >{row.cells[0].text}</th
                          ></tr
                        >
                      {:else}
                        <tr
                          class="group {isKeyRow(row.cells[0].text)
                            ? 'bg-fg-green-800/80 font-semibold'
                            : 'even:bg-white/[0.03]'} hover:bg-fg-green-800/70"
                        >
                          <th
                            scope="row"
                            class="sticky left-0 z-10 max-w-xs px-4 py-3 text-left text-white group-hover:bg-fg-green-800 {isKeyRow(
                              row.cells[0].text,
                            )
                              ? 'border-l-2 border-fg-mint bg-fg-green-800 font-semibold'
                              : 'bg-fg-green-900 font-medium'}"
                            >{row.cells[0].text ||
                              `Unlabeled source row ${row.number} (review)`}</th
                          >
                          {#each row.cells.slice(1) as cell}
                            <td
                              class="px-4 py-3 leading-relaxed {cell.number !==
                              null
                                ? 'whitespace-nowrap text-right tabular-nums'
                                : 'min-w-[14rem] whitespace-pre-line text-left'} {cell.input
                                ? 'bg-amber-200/5 text-fli-blue-200'
                                : cell.number !== null && cell.number < 0
                                  ? 'text-rose-200'
                                  : 'text-white/90'}"
                              title={cell.address}>{cell.text}</td
                            >
                          {/each}
                        </tr>
                      {/if}
                    {/each}
                  </tbody>
                </table>
              </div>
            {:else}
              {#each table.headers.filter((cell) => cell.text) as cell}<h4
                  class="text-sm font-bold text-white"
                >
                  {cell.text}
                </h4>{/each}
            {/if}
          {/each}
          {#each sheet.notes as note}<p
              class="border-l-2 border-fg-mint/60 bg-fg-green-900/40 px-4 py-4 text-sm leading-relaxed text-white/85"
            >
              {note}
            </p>{/each}
        </div>
      {/if}
    </div>
  {:else}
    <p
      role="status"
      class="flex items-start gap-3 border-l-4 border-amber-300 bg-fg-green-900/65 px-4 py-4 text-sm leading-relaxed text-white/90"
    >
      <TriangleAlert
        class="mt-0.5 h-5 w-5 shrink-0 text-amber-200"
        aria-hidden="true"
      />Financial projections are temporarily unavailable. Please try again
      later.
    </p>
  {/if}
  <footer
    class="flex flex-col gap-3 border-t border-white/20 pt-5 text-xs leading-relaxed text-white/80 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
  >
    <p class="flex items-center gap-2">
      <FileText class="h-4 w-4 shrink-0 text-fg-mint" aria-hidden="true" /><span
        >Source: <cite title={sourceUrl} class="not-italic"
          >FLI Sports Technologies published management planning model</cite
        ></span
      >
    </p>
    {#if projections}<p class="flex items-center gap-2">
        <Clock3 class="h-4 w-4 shrink-0 text-fg-mint" aria-hidden="true" /><span
          >Retrieved <time datetime={projections.fetchedAt}
            >{new Date(projections.fetchedAt).toLocaleString("en-US", {
              timeZone: "UTC",
            })} UTC</time
          ></span
        >
      </p>{/if}
  </footer>
</section>
