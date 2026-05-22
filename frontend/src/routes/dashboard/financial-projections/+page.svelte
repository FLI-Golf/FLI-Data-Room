<script lang="ts">
	import { Table2, Upload, ExternalLink, TrendingUp, TrendingDown, BarChart2, LineChart } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	type ProjRow = { year: string; revenue: string; cogs: string; grossProfit: string; opex: string; ebitda: string; netIncome: string; margin: string; notes: string };
	type StreamRow = { stream: string; pct2026: string; pct2031: string };

	const DEFAULT_PROJECTIONS = [
		{ year: '2026', revenue: 2.8,   cogs: 1.2,  grossProfit: 1.6,   opex: 3.4,  ebitda: -1.8, netIncome: -1.8, margin: null,  notes: 'Inaugural season. Seed capital deployed. Single event production.' },
		{ year: '2027', revenue: 21.4,  cogs: 7.5,  grossProfit: 13.9,  opex: 12.8, ebitda: 1.1,  netIncome: 1.1,  margin: 5.1,   notes: 'Full 4-event season. Media rights deal activated. Sponsorship ramp.' },
		{ year: '2028', revenue: 30.0,  cogs: 9.8,  grossProfit: 20.2,  opex: 15.0, ebitda: 5.2,  netIncome: 5.2,  margin: 17.3,  notes: 'Expanded venue footprint. Sports betting integration revenue.' },
		{ year: '2029', revenue: 62.8,  cogs: 18.4, grossProfit: 44.4,  opex: 23.2, ebitda: 21.2, netIncome: 21.2, margin: 33.8,  notes: 'National broadcast deal. Tribal gaming partnerships at scale.' },
		{ year: '2030', revenue: 113.2, cogs: 30.1, grossProfit: 83.1,  opex: 39.1, ebitda: 44.0, netIncome: 44.0, margin: 38.9,  notes: 'International expansion. Fantasy sports and media licensing.' },
		{ year: '2031', revenue: 182.7, cogs: 45.2, grossProfit: 137.5, opex: 52.0, ebitda: 85.5, netIncome: 85.5, margin: 46.8,  notes: 'Full league maturity. Multiple revenue streams at scale.' },
	];

	const DEFAULT_STREAMS = [
		{ stream: 'Event Ticket Sales',         pct2026: '45', pct2031: '12' },
		{ stream: 'Sponsorship & Naming Rights', pct2026: '30', pct2031: '22' },
		{ stream: 'Media Rights & Streaming',    pct2026: '10', pct2031: '28' },
		{ stream: 'Sports Betting (B2B)',         pct2026:  '5', pct2031: '18' },
		{ stream: 'Fantasy Sports & Gaming',      pct2026:  '5', pct2031: '10' },
		{ stream: 'Tribal Gaming Partnerships',   pct2026:  '3', pct2031:  '6' },
		{ stream: 'Merchandise & Licensing',      pct2026:  '2', pct2031:  '4' },
	];

	$: hasData = ((data.content?.projections as ProjRow[]) ?? []).some(p => p.revenue);

	$: projections = hasData
		? (data.content?.projections as ProjRow[]).map(p => ({
			year: p.year,
			revenue:     parseFloat(p.revenue)     || 0,
			cogs:        parseFloat(p.cogs)        || 0,
			grossProfit: parseFloat(p.grossProfit) || 0,
			opex:        parseFloat(p.opex)        || 0,
			ebitda:      parseFloat(p.ebitda)      || 0,
			netIncome:   parseFloat(p.netIncome)   || 0,
			margin:      p.margin ? parseFloat(p.margin) : null,
			notes:       p.notes,
		}))
		: DEFAULT_PROJECTIONS;

	$: revenueStreams = ((data.content?.revenueStreams as StreamRow[]) ?? []).length > 0
		? (data.content?.revenueStreams as StreamRow[]).map(s => ({
			stream:  s.stream,
			pct2026: parseFloat(s.pct2026) || 0,
			pct2031: parseFloat(s.pct2031) || 0,
		}))
		: DEFAULT_STREAMS.map(s => ({ stream: s.stream, pct2026: parseFloat(s.pct2026), pct2031: parseFloat(s.pct2031) }));

	$: excelDocId = (data.content?.excelDocId as string) ?? '';

	function fmt(v: number) {
		return `$${Math.abs(v).toFixed(1)}M`;
	}

	// ── Chart logic ──────────────────────────────────────────────────────────
	type Tab = 'table' | 'revenue' | 'ebitda';
	let tab: Tab = 'table';

	let revenueCanvas: HTMLCanvasElement;
	let ebitdaCanvas: HTMLCanvasElement;
	let revenueChart: import('chart.js').Chart | null = null;
	let ebitdaChart: import('chart.js').Chart | null = null;

	async function buildRevenueChart() {
		if (!revenueCanvas) return;
		const { Chart, BarElement, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, BarController, LineController } = await import('chart.js');
		Chart.register(BarElement, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, BarController, LineController);
		if (revenueChart) revenueChart.destroy();
		revenueChart = new Chart(revenueCanvas, {
			type: 'bar',
			data: {
				labels: projections.map(p => p.year),
				datasets: [
					{
						label: 'Revenue ($M)',
						data: projections.map(p => p.revenue),
						backgroundColor: 'rgba(255,255,255,0.15)',
						borderColor: 'rgba(255,255,255,0.5)',
						borderWidth: 1,
						borderRadius: 4,
						order: 2
					},
					{
						label: 'Gross Profit ($M)',
						data: projections.map(p => p.grossProfit),
						backgroundColor: 'rgba(99,179,237,0.25)',
						borderColor: 'rgba(99,179,237,0.8)',
						borderWidth: 1,
						borderRadius: 4,
						order: 3
					},
					{
						type: 'line' as const,
						label: 'Net Margin (%)',
						data: projections.map(p => p.margin),
						borderColor: 'rgba(251,191,36,0.9)',
						backgroundColor: 'rgba(251,191,36,0.1)',
						borderWidth: 2,
						pointRadius: 4,
						pointBackgroundColor: 'rgba(251,191,36,1)',
						tension: 0.3,
						yAxisID: 'yPct',
						order: 1
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				interaction: { mode: 'index', intersect: false },
				plugins: {
					legend: { labels: { color: 'rgba(255,255,255,0.7)', font: { size: 12 } } },
					tooltip: {
						callbacks: {
							label: (ctx) => {
								if (ctx.dataset.yAxisID === 'yPct') return ` ${ctx.dataset.label}: ${(ctx.parsed.y ?? 0).toFixed(1)}%`;
								return ` ${ctx.dataset.label}: $${(ctx.parsed.y ?? 0).toFixed(1)}M`;
							}
						}
					}
				},
				scales: {
					x: { ticks: { color: 'rgba(255,255,255,0.6)' }, grid: { color: 'rgba(255,255,255,0.05)' } },
					y: { ticks: { color: 'rgba(255,255,255,0.6)', callback: (v) => `$${v}M` }, grid: { color: 'rgba(255,255,255,0.05)' } },
					yPct: {
						position: 'right',
						ticks: { color: 'rgba(251,191,36,0.7)', callback: (v) => `${v}%` },
						grid: { drawOnChartArea: false }
					}
				}
			}
		});
	}

	async function buildEbitdaChart() {
		if (!ebitdaCanvas) return;
		const { Chart, BarElement, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, BarController, LineController } = await import('chart.js');
		Chart.register(BarElement, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, BarController, LineController);
		if (ebitdaChart) ebitdaChart.destroy();
		ebitdaChart = new Chart(ebitdaCanvas, {
			type: 'bar',
			data: {
				labels: projections.map(p => p.year),
				datasets: [
					{
						label: 'Revenue ($M)',
						data: projections.map(p => p.revenue),
						backgroundColor: 'rgba(255,255,255,0.08)',
						borderColor: 'rgba(255,255,255,0.3)',
						borderWidth: 1,
						borderRadius: 4,
						order: 2
					},
					{
						label: 'EBITDA ($M)',
						data: projections.map(p => p.ebitda),
						backgroundColor: projections.map(p => p.ebitda < 0 ? 'rgba(192,57,43,0.65)' : 'rgba(34,197,94,0.65)'),
						borderColor: projections.map(p => p.ebitda < 0 ? 'rgba(192,57,43,1)' : 'rgba(34,197,94,1)'),
						borderWidth: 1,
						borderRadius: 4,
						order: 1
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				interaction: { mode: 'index', intersect: false },
				plugins: {
					legend: { labels: { color: 'rgba(255,255,255,0.7)', font: { size: 12 } } },
					tooltip: { callbacks: { label: (ctx) => ` ${ctx.dataset.label}: $${(ctx.parsed.y ?? 0).toFixed(1)}M` } }
				},
				scales: {
					x: { ticks: { color: 'rgba(255,255,255,0.6)' }, grid: { color: 'rgba(255,255,255,0.05)' } },
					y: { ticks: { color: 'rgba(255,255,255,0.6)', callback: (v) => `$${v}M` }, grid: { color: 'rgba(255,255,255,0.05)' } }
				}
			}
		});
	}

	$: if (tab === 'revenue') setTimeout(buildRevenueChart, 50);
	$: if (tab === 'ebitda') setTimeout(buildEbitdaChart, 50);

	onMount(() => () => {
		revenueChart?.destroy();
		ebitdaChart?.destroy();
	});
</script>

<svelte:head>
	<title>Financial Projections — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-10">
	<div>
		<h1 class="text-3xl font-black text-white">Financial Projection Detail</h1>
		<p class="mt-1 text-white/50">Full 6-year pro forma income statement underlying the pitch deck forecast (2026–2031).</p>
	</div>

	{#if !hasData}
	<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5 flex items-start gap-3">
		<Upload class="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
		<div>
			<div class="text-sm font-semibold text-yellow-400 mb-1">Projection Figures Not Yet Entered</div>
			<p class="text-xs text-white/50 leading-relaxed">
				Go to <a href="/admin/content/financial-projections" class="text-yellow-400 hover:text-yellow-300 underline">Admin → Content Editor → Financial Projections</a> to enter the actual P&L figures from your financial model. The table below shows default pitch deck estimates.
			</p>
		</div>
	</div>
	{/if}

	{#if excelDocId}
	<div class="flex justify-end">
		<a href="/api/documents/{excelDocId}" target="_blank"
		class="flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 transition-colors">
			<ExternalLink class="h-4 w-4" /> Download Excel Model
		</a>
	</div>
	{/if}

	<!-- P&L section with tabs -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<div class="flex items-center justify-between mb-5 flex-wrap gap-3">
			<h2 class="text-lg font-bold text-white">Pro Forma Income Statement ($M)</h2>
			<!-- Tab bar -->
			<div class="flex items-center gap-1 rounded-lg bg-white/5 p-1">
				<button
					on:click={() => (tab = 'table')}
					class="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors
						{tab === 'table' ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'}"
				>
					<Table2 class="h-3.5 w-3.5" /> Table
				</button>
				<button
					on:click={() => (tab = 'revenue')}
					class="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors
						{tab === 'revenue' ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'}"
				>
					<BarChart2 class="h-3.5 w-3.5" /> Revenue
				</button>
				<button
					on:click={() => (tab = 'ebitda')}
					class="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors
						{tab === 'ebitda' ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'}"
				>
					<LineChart class="h-3.5 w-3.5" /> EBITDA
				</button>
			</div>
		</div>

		<!-- Table tab -->
		{#if tab === 'table'}
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/15 text-white/40 text-xs uppercase tracking-wide">
						<th class="text-left py-2 pr-4 min-w-[140px]">Line Item</th>
						{#each projections as p}
							<th class="text-right py-2 px-3">{p.year}</th>
						{/each}
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 text-xs">
					{#each [
						{ label: 'Revenue',       key: 'revenue',      bold: true,  color: 'text-white' },
						{ label: 'COGS',          key: 'cogs',         bold: false, color: 'text-white/60' },
						{ label: 'Gross Profit',  key: 'grossProfit',  bold: true,  color: 'text-fli-blue-300' },
						{ label: 'OpEx',          key: 'opex',         bold: false, color: 'text-white/60' },
						{ label: 'EBITDA / Net',  key: 'netIncome',    bold: true,  color: '' },
					] as row}
						<tr class="{row.bold ? 'bg-white/3' : ''}">
							<td class="py-2.5 pr-4 {row.bold ? 'font-bold text-white' : 'text-white/50'}">{row.label}</td>
							{#each projections as p}
								{@const val = (p as Record<string, unknown>)[row.key] as number}
								<td class="py-2.5 px-3 text-right font-mono {row.key === 'netIncome' ? (val < 0 ? 'text-brand-400 font-bold' : 'text-green-400 font-bold') : row.color}">
									{val < 0 ? '(' : ''}{fmt(val)}{val < 0 ? ')' : ''}
								</td>
							{/each}
						</tr>
					{/each}
					<tr class="border-t border-white/15">
						<td class="py-2.5 pr-4 text-white/40 text-xs">Net Margin</td>
						{#each projections as p}
							<td class="py-2.5 px-3 text-right text-xs text-white/40">
								{p.margin ? p.margin + '%' : '—'}
							</td>
						{/each}
					</tr>
				</tbody>
			</table>
		</div>
		<p class="text-xs text-white/25 mt-4">Figures in USD millions. Parentheses indicate losses. Upload the Excel model for full line-item detail.</p>
		{/if}

		<!-- Revenue chart tab -->
		{#if tab === 'revenue'}
		<div>
			<p class="text-xs text-white/40 mb-4">Revenue and gross profit by year, with net margin overlay (right axis).</p>
			<canvas bind:this={revenueCanvas} class="w-full" style="max-height:360px"></canvas>
		</div>
		{/if}

		<!-- EBITDA chart tab -->
		{#if tab === 'ebitda'}
		<div>
			<p class="text-xs text-white/40 mb-4">EBITDA vs. revenue by year. Red bars indicate pre-profitability years.</p>
			<canvas bind:this={ebitdaCanvas} class="w-full" style="max-height:360px"></canvas>
		</div>
		{/if}
	</div>

	<!-- Revenue mix -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<h2 class="text-lg font-bold text-white mb-5">Revenue Stream Mix</h2>
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/15 text-white/40 text-xs uppercase tracking-wide">
						<th class="text-left py-2 pr-4">Revenue Stream</th>
						<th class="text-right py-2 px-4">2026 Mix</th>
						<th class="text-right py-2 px-4">2031 Mix</th>
						<th class="text-right py-2 pl-4">Trend</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 text-xs">
					{#each revenueStreams as s}
						<tr>
							<td class="py-2.5 pr-4 text-white/70">{s.stream}</td>
							<td class="py-2.5 px-4 text-right text-white/60">{s.pct2026}%</td>
							<td class="py-2.5 px-4 text-right text-white/60">{s.pct2031}%</td>
							<td class="py-2.5 pl-4 text-right">
								{#if s.pct2031 > s.pct2026}
									<span class="flex items-center justify-end gap-1 text-green-400">
										<TrendingUp class="h-3 w-3" />
										+{s.pct2031 - s.pct2026}pp
									</span>
								{:else if s.pct2031 < s.pct2026}
									<span class="flex items-center justify-end gap-1 text-white/30">
										<TrendingDown class="h-3 w-3" />
										{s.pct2031 - s.pct2026}pp
									</span>
								{:else}
									<span class="text-white/30">—</span>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Year notes -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<h2 class="text-base font-bold text-white mb-4">Year-by-Year Assumptions</h2>
		<div class="space-y-2">
			{#each projections as p}
				<div class="flex items-start gap-3 text-xs">
					<span class="font-bold text-white/60 w-10 shrink-0">{p.year}</span>
					<span class="text-white/40 leading-relaxed">{p.notes}</span>
				</div>
			{/each}
		</div>
	</div>

	<p class="text-xs text-white/20">Forward-looking statements involve risk and uncertainty. Past performance is not indicative of future results. All figures are confidential and subject to the NDA you accepted.</p>
</div>
