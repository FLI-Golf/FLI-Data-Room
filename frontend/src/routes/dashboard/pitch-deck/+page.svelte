<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { BarChart2, Table2 } from 'lucide-svelte';
	export let data: PageData;

	const forecast = [
		{ year: '2026', revenue: 2.824,    profit: -1.789 },
		{ year: '2027', revenue: 21.392,   profit: 1.087 },
		{ year: '2028', revenue: 29.971,   profit: 5.186 },
		{ year: '2029', revenue: 62.784,   profit: 21.190 },
		{ year: '2030', revenue: 113.180,  profit: 43.995 },
		{ year: '2031', revenue: 182.733,  profit: 85.524 }
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
					legend: { labels: { color: 'rgba(255,255,255,0.7)', font: { size: 12 } } },
					tooltip: { callbacks: { label: (ctx) => ` ${ctx.dataset.label}: $${(ctx.parsed.y ?? 0).toFixed(2)}M` } }
				},
				scales: {
					x: { ticks: { color: 'rgba(255,255,255,0.6)' }, grid: { color: 'rgba(255,255,255,0.05)' } },
					y: { ticks: { color: 'rgba(255,255,255,0.6)', callback: (v) => `$${v}M` }, grid: { color: 'rgba(255,255,255,0.05)' } }
				}
			}
		});
	}

	$: if (tab === 'chart') setTimeout(buildChart, 50);
	onMount(() => () => chart?.destroy());
</script>

<svelte:head>
	<title>Pitch Deck — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-4xl space-y-8">
	<div>
		<h1 class="text-3xl font-black text-white">Pitch Deck</h1>
		<p class="mt-1 text-white/50">FLI Golf League · Q2 2026 Seed Round · $7.5M</p>
	</div>

	{#if !data.fullAccess}
		<div class="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-5 text-sm text-yellow-300">
			You have <strong>Basic</strong> access. You can view the overview sections below.
			Contact <a href="mailto:investors@fligolf.com" class="underline">investors@fligolf.com</a> to request Advanced access for the full deck and financials.
		</div>
	{/if}

	<!-- Sections visible to all authenticated + NDA users -->
	<div class="space-y-6">
		<!-- The Opportunity -->
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
			<h2 class="text-lg font-bold text-white mb-3">The Opportunity</h2>
			<p class="text-white/70 leading-relaxed">
				FLI Golf League is creating the world's first stadium-style professional disc golf league —
				engineered for media, betting, and franchise scale from Day 1. One category. Zero competition.
			</p>
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
				{#each [
					{ v: '100+', l: 'Countries Playing' },
					{ v: '20M+', l: 'Active Players' },
					{ v: '17,287', l: 'Courses Worldwide' },
					{ v: '86%', l: 'Growth Since 2020' }
				] as s}
					<div class="text-center">
						<div class="text-xl font-black text-white">{s.v}</div>
						<div class="text-xs text-white/40 mt-0.5">{s.l}</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- The Roster -->
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
			<h2 class="text-lg font-bold text-white mb-3">Elite Athletes. Massive Reach.</h2>
			<p class="text-white/70 leading-relaxed mb-5">
				The world's top disc golf pros — committed to FLI Golf League — bring a combined digital
				footprint that no other disc golf property has ever assembled.
			</p>
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{#each [
					{ v: '1M+', l: 'Combined Social Followers' },
					{ v: '323M+', l: 'YouTube Views' },
					{ v: '15+', l: 'PDGA World Titles' },
					{ v: '600+', l: 'Career Pro Wins' }
				] as s}
					<div class="text-center">
						<div class="text-xl font-black text-white">{s.v}</div>
						<div class="text-xs text-white/40 mt-0.5">{s.l}</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- The Team -->
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
			<h2 class="text-lg font-bold text-white mb-4">The Team</h2>
			<div class="grid sm:grid-cols-2 gap-4">
				{#each [
					{
						name: 'Andrew Panza',
						title: 'CEO & Tour Director',
						bio: 'Led $25M in annual retail sales; managed 250+ employees before 30. CEO of Sunsteps Entertainment Group with 3 reality TV shows in production.'
					},
					{
						name: 'Mark Coleman',
						title: 'Production Director — 13× Emmy Winner',
						bio: '30+ years in sports broadcasting. Senior roles at Spectrum, NBC Universal, Fox Sports, The Golf Channel. Designed broadcast facilities for the Lakers & Dodgers.'
					},
					{
						name: 'Ina Masten',
						title: 'Chief Financial Officer',
						bio: '35+ years in accounting, FP&A, and CFO leadership. Founder of Masten Solutions. Brings rigorous governance and investor strategy.'
					},
					{
						name: 'Gary G. Santos',
						title: 'Tribal & Gaming — Strategic Lead',
						bio: '23+ years tribal governance at Tule River Indian Tribe. IGA Board 10+ years. Unmatched tribal gaming relationships and regulatory expertise.'
					}
				] as member}
					<div class="rounded-lg bg-navy-700/50 border border-white/15 p-4">
						<div class="font-semibold text-white text-sm">{member.name}</div>
						<div class="text-xs text-yellow-400 mb-2">{member.title}</div>
						<p class="text-xs text-white/50 leading-relaxed">{member.bio}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Advanced/Admin only sections -->
	{#if data.fullAccess}
		<div class="space-y-6">
			<div class="flex items-center gap-3">
				<div class="h-px flex-1 bg-yellow-500/20" />
				<span class="text-xs text-yellow-400 font-semibold uppercase tracking-widest">Advanced Access</span>
				<div class="h-px flex-1 bg-yellow-500/20" />
			</div>

			<!-- Financial forecast -->
			<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
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
								{#each [
									{ year: '2026', sales: '$2,824,000',    profit: '–$1,789,129',  margin: '—' },
									{ year: '2027', sales: '$21,392,200',   profit: '$1,086,592',   margin: '5.08%' },
									{ year: '2028', sales: '$29,970,500',   profit: '$5,186,187',   margin: '17.30%' },
									{ year: '2029', sales: '$62,783,500',   profit: '$21,189,778',  margin: '33.75%' },
									{ year: '2030', sales: '$113,180,050',  profit: '$43,995,239',  margin: '38.87%' },
									{ year: '2031', sales: '$182,733,473',  profit: '$85,524,327',  margin: '46.80%' }
								] as row}
									<tr class="text-white/70">
										<td class="py-2.5 pr-4 font-medium text-white">{row.year}</td>
										<td class="py-2.5 px-4 text-right text-white">{row.sales}</td>
										<td class="py-2.5 px-4 text-right {row.profit.startsWith('–') ? 'text-red-500' : 'text-green-600'}">{row.profit}</td>
										<td class="py-2.5 pl-4 text-right text-white/60">{row.margin}</td>
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

				<p class="text-xs text-white/30 mt-4">Forward-looking statements involve risk and uncertainty. Past performance is not indicative of future results.</p>
			</div>

			<!-- Gaming strategy -->
			<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
				<h2 class="text-lg font-bold text-white mb-3">Gaming & Tribal Strategy</h2>
				<p class="text-white/70 leading-relaxed mb-4">
					No disc golf tour has formalized a sportsbook partnership. FGL owns this vertical. Par-3
					format creates more micro-betting moments per event than any golf format — moneyline,
					per-hole props, over/under engineered in from Day 1.
				</p>
				<div class="grid sm:grid-cols-3 gap-4">
					{#each [
						{ title: 'Tribal Venue Hosting', body: 'Tribal lands as premier FGL event venues with built-in gaming infrastructure.' },
						{ title: 'Sportsbook Partnerships', body: 'Licensed sportsbook integration — event betting markets, in-play wagering.' },
						{ title: 'Fantasy Platform', body: 'Digital player assets, draft leagues, skill-based prize contests — zero integration delay.' }
					] as item}
						<div class="rounded-lg bg-fli-blue-800/30 border border-fli-blue-600/20 p-4">
							<div class="text-sm font-semibold text-white mb-1">{item.title}</div>
							<p class="text-xs text-white/50 leading-relaxed">{item.body}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<div class="pt-4">
		<a href="/dashboard/documents" class="text-sm text-brand-600 hover:text-yellow-400 transition-colors">
			View supporting documents →
		</a>
	</div>
</div>
