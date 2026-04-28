<script lang="ts">
	import { Globe, TrendingUp, Tv, DollarSign, MapPin, Users, BarChart2, Table2 } from 'lucide-svelte';
	import { onMount } from 'svelte';

	const courseData = [
		{ year: '2015', count: 7300 },
		{ year: '2018', count: 9200 },
		{ year: '2020', count: 11000 },
		{ year: '2022', count: 14000 },
		{ year: '2024', count: 17000 },
		{ year: '2026+', count: 20000 },
	];

	let tab: 'table' | 'chart' = 'chart';
	let canvas: HTMLCanvasElement;
	let chart: import('chart.js').Chart | null = null;

	async function initChart() {
		if (!canvas) return;
		const { Chart, BarElement, LinearScale, CategoryScale, Tooltip, Legend, BarController } = await import('chart.js');
		Chart.register(BarElement, LinearScale, CategoryScale, Tooltip, Legend, BarController);
		if (chart) chart.destroy();
		chart = new Chart(canvas, {
			type: 'bar',
			data: {
				labels: courseData.map(r => r.year),
				datasets: [{
					label: 'Courses Worldwide',
					data: courseData.map(r => r.count),
					backgroundColor: courseData.map((_, i) =>
						i === courseData.length - 1 ? 'rgba(234,179,8,0.7)' : 'rgba(192,57,43,0.7)'
					),
					borderColor: courseData.map((_, i) =>
						i === courseData.length - 1 ? 'rgba(234,179,8,1)' : 'rgba(192,57,43,1)'
					),
					borderWidth: 2,
					borderRadius: 4,
				}]
			},
			options: {
				responsive: true,
				plugins: { legend: { display: false } },
				scales: {
					x: { ticks: { color: 'rgba(255,255,255,0.6)' }, grid: { color: 'rgba(255,255,255,0.05)' } },
					y: { ticks: { color: 'rgba(255,255,255,0.6)', callback: (v) => Number(v).toLocaleString() }, grid: { color: 'rgba(255,255,255,0.05)' }, beginAtZero: true }
				}
			}
		});
	}

	$: if (tab === 'chart') setTimeout(initChart, 50);
	onMount(() => () => chart?.destroy());
</script>

<svelte:head>
	<title>The Sport — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-10">
	<div>
		<h1 class="text-3xl font-black text-white">The Sport</h1>
		<p class="mt-1 text-white/50">Disc golf is the world's fastest-growing outdoor sport — radically undercapitalized relative to its growth curve.</p>
	</div>

	<!-- Top stats -->
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
		{#each [
			{ value: '17,000+', label: 'Courses Worldwide', sub: 'Up from 7,300 in 2015', icon: MapPin },
			{ value: '86%',     label: 'Participation Growth', sub: 'Since 2020 — UDisc data', icon: TrendingUp },
			{ value: '20M+',    label: 'Global Players', sub: 'Est. 8M–15M active players', icon: Users },
			{ value: '99',      label: 'Countries', sub: 'With playable courses', icon: Globe }
		] as stat}
			<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 text-center">
				<div class="flex justify-center mb-2 text-brand-500">
					<svelte:component this={stat.icon} class="h-5 w-5" />
				</div>
				<div class="text-2xl font-black text-white">{stat.value}</div>
				<div class="text-xs font-semibold text-white/70 mt-1">{stat.label}</div>
				<div class="text-xs text-white/35 mt-0.5 leading-snug">{stat.sub}</div>
			</div>
		{/each}
	</div>

	<!-- Growth callouts -->
	<div class="grid sm:grid-cols-3 gap-6">
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
			<div class="flex items-center gap-2 mb-3">
				<MapPin class="h-4 w-4 text-brand-500 shrink-0" />
				<span class="text-sm font-bold text-white">3 New Courses Per Day</span>
			</div>
			<p class="text-sm text-white/55 leading-relaxed">
				9-hole courses opening at twice the rate of 18-hole. 10,000+ US courses — more than Dunkin', Domino's, or Taco Bell.
			</p>
		</div>

		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
			<div class="flex items-center gap-2 mb-3">
				<Tv class="h-4 w-4 text-fli-blue-400 shrink-0" />
				<span class="text-sm font-bold text-white">301K–600K Finnish Broadcast Viewers</span>
			</div>
			<p class="text-sm text-white/55 leading-relaxed">
				YLE national TV drew 1.8M streams for the 2025 PDGA Pro Worlds. National broadcaster economics are achievable today.
			</p>
		</div>

		<div class="rounded-xl border border-brand-600/25 bg-brand-600/8 p-6">
			<div class="flex items-center gap-2 mb-3">
				<DollarSign class="h-4 w-4 text-brand-500 shrink-0" />
				<span class="text-sm font-bold text-white">89% of Courses Are Free to Play</span>
			</div>
			<p class="text-sm text-white/55 leading-relaxed">
				The single biggest monetization gap in sports. FLI's stadium model directly solves it — converting outdoor rounds into premium spectator events.
			</p>
		</div>
	</div>

	<!-- Growth chart -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6 space-y-4">
		<div class="flex items-center justify-between">
			<h2 class="text-lg font-bold text-white">Course Growth Trajectory</h2>
			<div class="flex rounded-lg border border-white/15 overflow-hidden text-xs">
				<button
					type="button"
					on:click={() => { tab = 'chart'; }}
					class="flex items-center gap-1.5 px-3 py-1.5 transition-colors {tab === 'chart' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}"
				>
					<BarChart2 class="h-3.5 w-3.5" /> Chart
				</button>
				<button
					type="button"
					on:click={() => { tab = 'table'; }}
					class="flex items-center gap-1.5 px-3 py-1.5 transition-colors {tab === 'table' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}"
				>
					<Table2 class="h-3.5 w-3.5" /> Table
				</button>
			</div>
		</div>

		{#if tab === 'chart'}
			<div class="relative">
				<canvas bind:this={canvas} class="w-full" style="max-height: 300px;"></canvas>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-white/15 text-white/40 text-xs uppercase tracking-wide">
							<th class="text-left py-2.5 pr-4">Year</th>
							<th class="text-right py-2.5 px-4">Courses Worldwide</th>
							<th class="text-right py-2.5 pl-4">Growth</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-white/5">
						{#each courseData as row, i}
							<tr class="hover:bg-white/3">
								<td class="py-2.5 pr-4 font-semibold text-white">{row.year}</td>
								<td class="py-2.5 px-4 text-right text-white">{row.count.toLocaleString()}</td>
								<td class="py-2.5 pl-4 text-right text-green-400 text-xs">
									{i === 0 ? '—' : '+' + (row.count - courseData[i-1].count).toLocaleString()}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}

		<p class="text-xs text-white/60 border-t border-white/10 pt-3">Worldwide disc golf courses. Sources: PDGA, UDisc.</p>
	</div>

	<!-- Bottom context -->
	<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6">
		<div class="flex items-start gap-4">
			<TrendingUp class="h-6 w-6 text-yellow-400 shrink-0 mt-0.5" />
			<div>
				<div class="text-sm font-bold text-white mb-1">The Opportunity Gap</div>
				<p class="text-sm text-white/60 leading-relaxed">
					Disc golf has the participation curve of early-stage pickleball and the digital engagement of esports — but zero stadium infrastructure, no franchise model, and no media rights structure. FLI is the first mover to formalize what the market has been building for a decade.
				</p>
			</div>
		</div>
	</div>
</div>
