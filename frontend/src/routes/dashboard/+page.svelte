<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { BarChart2, Table2, Presentation, Disc, TrendingUp, Trophy, DollarSign, Star, FileText } from 'lucide-svelte';

	export let data: PageData;

	const forecast = [
		{ year: '2026', revenue: 2.8,   profit: -1.8,  margin: null },
		{ year: '2027', revenue: 21.4,  profit: 1.1,   margin: 5.1 },
		{ year: '2028', revenue: 30.0,  profit: 5.2,   margin: 17.3 },
		{ year: '2029', revenue: 62.8,  profit: 21.2,  margin: 33.8 },
		{ year: '2030', revenue: 113.2, profit: 44.0,  margin: 38.9 },
		{ year: '2031', revenue: 182.7, profit: 85.5,  margin: 46.8 }
	];

	let tab: 'table' | 'chart' = 'table';
	let canvas: HTMLCanvasElement;
	let chart: import('chart.js').Chart | null = null;

	async function buildChart() {
		if (!canvas) return;
		const { Chart, BarElement, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, BarController, LineController } = await import('chart.js');
		Chart.register(BarElement, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, BarController, LineController);

		if (chart) chart.destroy();

		chart = new Chart(canvas, {
			type: 'bar',
			data: {
				labels: forecast.map(r => r.year),
				datasets: [
					{
						label: 'Revenue ($M)',
						data: forecast.map(r => r.revenue),
						backgroundColor: 'rgba(255,255,255,0.15)',
						borderColor: 'rgba(255,255,255,0.6)',
						borderWidth: 1,
						borderRadius: 4,
						order: 2
					},
					{
						label: 'Net Profit ($M)',
						data: forecast.map(r => r.profit),
						backgroundColor: forecast.map(r => r.profit < 0 ? 'rgba(192,57,43,0.7)' : 'rgba(34,197,94,0.7)'),
						borderColor: forecast.map(r => r.profit < 0 ? 'rgba(192,57,43,1)' : 'rgba(34,197,94,1)'),
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
					legend: {
						labels: { color: 'rgba(255,255,255,0.7)', font: { size: 12 } }
					},
					tooltip: {
						callbacks: {
							label: (ctx) => ` ${ctx.dataset.label}: $${(ctx.parsed.y ?? 0).toFixed(1)}M`
						}
					}
				},
				scales: {
					x: {
						ticks: { color: 'rgba(255,255,255,0.6)' },
						grid: { color: 'rgba(255,255,255,0.05)' }
					},
					y: {
						ticks: {
							color: 'rgba(255,255,255,0.6)',
							callback: (v) => `$${v}M`
						},
						grid: { color: 'rgba(255,255,255,0.05)' }
					}
				}
			}
		});
	}

	$: if (tab === 'chart') {
		// wait a tick for canvas to mount
		setTimeout(buildChart, 50);
	}

	onMount(() => () => chart?.destroy());
</script>

<svelte:head>
	<title>Dashboard — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-10">
	<div>
		<h1 class="text-3xl font-black text-white">Welcome, {data.user?.name?.split(' ')[0]}.</h1>
		<p class="mt-1 text-white/50">FLI Golf League · Investor Data Room · Q2 2026 Seed Round</p>
	</div>

	<!-- Raise summary -->
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
		{#each [
			{ value: '$7.5M', label: 'Seed Round', red: true },
			{ value: '$18B+', label: 'SAM by 2030', red: false },
			{ value: '20M+', label: 'Global Players', red: false },
			{ value: '86%', label: 'Growth Since 2020', red: false }
		] as stat}
			<div class="rounded-xl border {stat.red ? 'border-brand-500/50 bg-brand-600/25' : 'border-white/15 bg-navy-700/50'} p-5 text-center">
				<div class="text-2xl font-black {stat.red ? 'text-brand-500' : 'text-white'}">{stat.value}</div>
				<div class="text-xs font-bold text-white mt-1 uppercase tracking-wide">{stat.label}</div>
			</div>
		{/each}
	</div>

	<!-- Use of proceeds -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<h2 class="text-lg font-bold text-white mb-4">Use of Proceeds</h2>
		<div class="grid sm:grid-cols-4 gap-4">
			{#each [
				{ pct: '35%', label: 'Event Production & Technology' },
				{ pct: '25%', label: 'League Operations & Team Development' },
				{ pct: '20%', label: 'Media & Content Buildout' },
				{ pct: '20%', label: 'Marketing, Working Capital & Reserve' }
			] as item}
				<div class="rounded-lg bg-navy-900/80 border border-white/15 p-4 text-center">
					<div class="text-2xl font-black text-brand-600">{item.pct}</div>
					<div class="text-xs font-bold text-white mt-1 leading-snug">{item.label}</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Financial forecast -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<!-- Header + tab toggle -->
		<div class="flex items-center justify-between mb-5">
			<h2 class="text-lg font-bold text-white">Financial Forecast</h2>
			<div class="flex items-center rounded-lg border border-white/15 bg-navy-800/50 p-0.5">
				<button
					on:click={() => tab = 'table'}
					class="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors
						{tab === 'table' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}"
				>
					<Table2 class="h-3.5 w-3.5" />
					Table
				</button>
				<button
					on:click={() => tab = 'chart'}
					class="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors
						{tab === 'chart' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}"
				>
					<BarChart2 class="h-3.5 w-3.5" />
					Chart
				</button>
			</div>
		</div>

		{#if tab === 'table'}
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-white/15 text-white/40 text-xs uppercase tracking-wide">
							<th class="text-left py-2 pr-4">Year</th>
							<th class="text-right py-2 px-4">Revenue</th>
							<th class="text-right py-2 px-4">Net Profit</th>
							<th class="text-right py-2 pl-4">Margin</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-white/5">
						{#each forecast as row}
							<tr class="text-white/70">
								<td class="py-2.5 pr-4 font-medium text-white">{row.year}</td>
								<td class="py-2.5 px-4 text-right text-white">${row.revenue}M</td>
								<td class="py-2.5 px-4 text-right {row.profit < 0 ? 'text-brand-500' : 'text-green-500'}">
									{row.profit < 0 ? '–' : ''}${Math.abs(row.profit)}M
								</td>
								<td class="py-2.5 pl-4 text-right text-white/60">{row.margin ? row.margin + '%' : '—'}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<div class="relative">
				<canvas bind:this={canvas} class="w-full" style="max-height: 320px;"></canvas>
			</div>
		{/if}

		<p class="text-xs text-white/30 mt-4">Past performance is not indicative of future results. Forward-looking statements involve risk and uncertainty.</p>
	</div>

	<!-- Quick links -->
	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
		<a href="/dashboard/pitch-deck" class="rounded-xl border border-brand-600/30 bg-brand-600/15 p-6 hover:bg-brand-600/20 transition-colors group">
			<div class="flex items-center gap-3 mb-3">
				<div class="h-9 w-9 rounded-lg bg-brand-600/30 flex items-center justify-center shrink-0">
					<Presentation class="h-4.5 w-4.5 text-brand-400" />
				</div>
				<div class="text-brand-400 font-bold group-hover:text-brand-300 transition-colors">Pitch Deck</div>
			</div>
			<div class="text-sm text-white/50">Full investor presentation</div>
		</a>

		<a href="/dashboard/the-sport" class="rounded-xl border border-white/15 bg-navy-700/50 p-6 hover:bg-navy-700/60 transition-colors group">
			<div class="flex items-center gap-3 mb-3">
				<div class="h-9 w-9 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
					<Disc class="h-4.5 w-4.5 text-green-400" />
				</div>
				<div class="text-white font-bold group-hover:text-yellow-400 transition-colors">The Sport</div>
			</div>
			<div class="text-sm text-white/50">17K courses · 86% growth · 99 countries</div>
		</a>

		<a href="/dashboard/market-opportunity" class="rounded-xl border border-white/15 bg-navy-700/50 p-6 hover:bg-navy-700/60 transition-colors group">
			<div class="flex items-center gap-3 mb-3">
				<div class="h-9 w-9 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
					<TrendingUp class="h-4.5 w-4.5 text-fli-blue-300" />
				</div>
				<div class="text-white font-bold group-hover:text-yellow-400 transition-colors">Market Opportunity</div>
			</div>
			<div class="text-sm text-white/50">9 revenue pools · $18B SAM</div>
		</a>

		<a href="/dashboard/why-fli-wins" class="rounded-xl border border-white/15 bg-navy-700/50 p-6 hover:bg-navy-700/60 transition-colors group">
			<div class="flex items-center gap-3 mb-3">
				<div class="h-9 w-9 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
					<Trophy class="h-4.5 w-4.5 text-yellow-400" />
				</div>
				<div class="text-white font-bold group-hover:text-yellow-400 transition-colors">Why FLI Wins</div>
			</div>
			<div class="text-sm text-white/50">Stadium format · living analogs</div>
		</a>

		<a href="/dashboard/investment-thesis" class="rounded-xl border border-white/15 bg-navy-700/50 p-6 hover:bg-navy-700/60 transition-colors group">
			<div class="flex items-center gap-3 mb-3">
				<div class="h-9 w-9 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
					<DollarSign class="h-4.5 w-4.5 text-brand-400" />
				</div>
				<div class="text-white font-bold group-hover:text-yellow-400 transition-colors">Investment Thesis</div>
			</div>
			<div class="text-sm text-white/50">$7.5M seed · Q2 2026</div>
		</a>

		<a href="/dashboard/celebrity-network" class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-800/20 p-6 hover:bg-yellow-500/10 transition-colors group">
			<div class="flex items-center gap-3 mb-3">
				<div class="h-9 w-9 rounded-lg bg-fli-blue-700/30 flex items-center justify-center shrink-0">
					<Star class="h-4.5 w-4.5 text-yellow-400" />
				</div>
				<div class="text-white font-bold group-hover:text-yellow-400 transition-colors">Celebrity Network</div>
			</div>
			<div class="text-sm text-white/50">35 celebrities · 500M+ reach</div>
		</a>

		{#if data.user?.role === 'admin'}
			<a href="/dashboard/documents" class="rounded-xl border border-white/15 bg-navy-700/50 p-6 hover:bg-navy-700/60 transition-colors group">
				<div class="flex items-center gap-3 mb-3">
					<div class="h-9 w-9 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
						<FileText class="h-4.5 w-4.5 text-white/60" />
					</div>
					<div class="text-white font-bold group-hover:text-yellow-400 transition-colors">Supporting Documents</div>
				</div>
				<div class="text-sm text-white/50">Financials, legal, and supplemental materials</div>
			</a>
		{/if}
	</div>
</div>
