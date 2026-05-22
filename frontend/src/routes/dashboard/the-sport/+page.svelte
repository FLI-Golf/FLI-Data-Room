<script lang="ts">
	import { Globe, TrendingUp, Tv, DollarSign, MapPin, Users, BarChart2, Table2, ExternalLink } from 'lucide-svelte';
	import { onMount } from 'svelte';

	const courseData = [
		{ year: '2015', count: 7300 },
		{ year: '2018', count: 9200 },
		{ year: '2020', count: 11000 },
		{ year: '2022', count: 14000 },
		{ year: '2024', count: 17000 },
		{ year: '2026+', count: 20000 },
	];

	// PDGA annual membership figures (source: PDGA / UDisc Growth Report 2024)
	const membershipData = [
		{ year: '2015', members: 30000  },
		{ year: '2016', members: 35000  },
		{ year: '2017', members: 40000  },
		{ year: '2018', members: 45000  },
		{ year: '2019', members: 50000  },
		{ year: '2020', members: 55000  },
		{ year: '2021', members: 75000  },
		{ year: '2022', members: 90000  },
		{ year: '2023', members: 98000  },
		{ year: '2024', members: 102000 },
	];

	let tab: 'table' | 'chart' = 'chart';
	let canvas: HTMLCanvasElement;
	let chart: import('chart.js').Chart | null = null;

	let memberTab: 'chart' | 'table' = 'chart';
	let memberCanvas: HTMLCanvasElement;
	let memberChart: import('chart.js').Chart | null = null;

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

	async function initMemberChart() {
		if (!memberCanvas) return;
		const { Chart, BarElement, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, BarController, LineController, Filler } = await import('chart.js');
		Chart.register(BarElement, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, BarController, LineController, Filler);
		if (memberChart) memberChart.destroy();

		// Highlight post-2020 bars (the 86% growth era)
		const colors = membershipData.map(r =>
			parseInt(r.year) >= 2020 ? 'rgba(34,197,94,0.7)' : 'rgba(255,255,255,0.12)'
		);
		const borders = membershipData.map(r =>
			parseInt(r.year) >= 2020 ? 'rgba(34,197,94,1)' : 'rgba(255,255,255,0.3)'
		);

		memberChart = new Chart(memberCanvas, {
			type: 'bar',
			data: {
				labels: membershipData.map(r => r.year),
				datasets: [
					{
						label: 'PDGA Members',
						data: membershipData.map(r => r.members),
						backgroundColor: colors,
						borderColor: borders,
						borderWidth: 1,
						borderRadius: 4,
						order: 2,
					},
					{
						type: 'line' as const,
						label: 'Trend',
						data: membershipData.map(r => r.members),
						borderColor: 'rgba(251,191,36,0.8)',
						borderWidth: 2,
						pointRadius: 3,
						pointBackgroundColor: 'rgba(251,191,36,1)',
						tension: 0.4,
						fill: false,
						order: 1,
					}
				]
			},
			options: {
				responsive: true,
				interaction: { mode: 'index', intersect: false },
				plugins: {
					legend: { labels: { color: 'rgba(255,255,255,0.6)', font: { size: 11 } } },
					tooltip: { callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${Number(ctx.parsed.y).toLocaleString()}` } }
				},
				scales: {
					x: { ticks: { color: 'rgba(255,255,255,0.6)' }, grid: { color: 'rgba(255,255,255,0.05)' } },
					y: {
						beginAtZero: true,
						ticks: { color: 'rgba(255,255,255,0.6)', callback: (v) => Number(v).toLocaleString() },
						grid: { color: 'rgba(255,255,255,0.05)' }
					}
				}
			}
		});
	}

	$: if (tab === 'chart') setTimeout(initChart, 50);
	$: if (memberTab === 'chart') setTimeout(initMemberChart, 50);
	onMount(() => () => { chart?.destroy(); memberChart?.destroy(); });
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

	<!-- PDGA Membership Growth -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6 space-y-4">
		<div class="flex items-center justify-between flex-wrap gap-3">
			<div>
				<h2 class="text-lg font-bold text-white">PDGA Membership Growth</h2>
				<p class="text-xs text-white/40 mt-0.5">Professional Disc Golf Association · 2024 · <span class="text-green-400 font-semibold">86% growth since 2020</span></p>
			</div>
			<div class="flex items-center gap-2">
				<a
					href="https://udisc.com/disc-golf-growth-report"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-1.5 text-xs text-white/50 hover:text-white hover:border-white/30 transition-colors"
				>
					<ExternalLink class="h-3 w-3" /> UDisc Report
				</a>
				<div class="flex items-center gap-1 rounded-lg bg-white/5 p-1">
					<button
						on:click={() => (memberTab = 'chart')}
						class="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors
							{memberTab === 'chart' ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'}"
					>
						<BarChart2 class="h-3.5 w-3.5" /> Chart
					</button>
					<button
						on:click={() => (memberTab = 'table')}
						class="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors
							{memberTab === 'table' ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'}"
					>
						<Table2 class="h-3.5 w-3.5" /> Table
					</button>
				</div>
			</div>
		</div>

		<!-- 86% callout -->
		<div class="grid grid-cols-3 gap-3">
			{#each [
				{ value: '86%',    label: 'Participation growth',  sub: '2020 → 2024',         color: 'text-green-400' },
				{ value: '102K+',  label: 'PDGA members',          sub: 'As of 2024',           color: 'text-white' },
				{ value: '2×',     label: 'Growth rate vs. 2019',  sub: 'Post-pandemic surge',  color: 'text-yellow-400' },
			] as kpi}
				<div class="rounded-lg border border-white/10 bg-white/3 px-4 py-3 text-center">
					<div class="text-xl font-black {kpi.color}">{kpi.value}</div>
					<div class="text-xs font-semibold text-white/60 mt-0.5">{kpi.label}</div>
					<div class="text-xs text-white/30 mt-0.5">{kpi.sub}</div>
				</div>
			{/each}
		</div>

		{#if memberTab === 'chart'}
			<div>
				<p class="text-xs text-white/35 mb-3">Green bars = post-2020 growth era. Yellow line = trend.</p>
				<canvas bind:this={memberCanvas} class="w-full" style="max-height:300px"></canvas>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-white/15 text-white/40 text-xs uppercase tracking-wide">
							<th class="text-left py-2.5 pr-4">Year</th>
							<th class="text-right py-2.5 px-4">PDGA Members</th>
							<th class="text-right py-2.5 pl-4">YoY Growth</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-white/5">
						{#each membershipData as row, i}
							<tr class="{parseInt(row.year) >= 2020 ? 'bg-green-500/5' : ''}">
								<td class="py-2.5 pr-4 font-semibold {parseInt(row.year) >= 2020 ? 'text-green-400' : 'text-white'}">{row.year}</td>
								<td class="py-2.5 px-4 text-right text-white font-mono">{row.members.toLocaleString()}</td>
								<td class="py-2.5 pl-4 text-right text-xs {i === 0 ? 'text-white/30' : 'text-green-400'}">
									{#if i === 0}—{:else}
										+{((row.members - membershipData[i-1].members) / membershipData[i-1].members * 100).toFixed(0)}%
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}

		<p class="text-xs text-white/25 border-t border-white/10 pt-3">
			Source: <a href="https://udisc.com/disc-golf-growth-report" target="_blank" rel="noopener noreferrer" class="text-white/40 hover:text-white underline">UDisc Disc Golf Growth Report</a> · PDGA Annual Membership Statistics · 2024
		</p>
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
