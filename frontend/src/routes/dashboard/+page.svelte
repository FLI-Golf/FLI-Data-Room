<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { BarChart2, Table2, Presentation, Disc, TrendingUp, Trophy, DollarSign, Star, FileText, Briefcase, Handshake, UserSquare2, MapPin, Receipt, PieChart, PlayCircle } from 'lucide-svelte';

	export let data: PageData;

	$: allowedSlugs = new Set(data.visibleSlugs ?? []);
	const canSee = (slug: string) => allowedSlugs.has(slug);

	const stats = [
		{
			value: '$7.5M',
			label: 'Seed Round',
			red: true,
			tooltip: [
				'Q2 2026 seed round presented by Young America Capital, LLC',
				'SEC-registered broker dealer · FINRA, SIPC member',
				'Funds event production (35%), league ops (25%), media (20%), marketing & reserve (20%)',
				'Targets first-mover advantage before any competing stadium disc golf property exists',
			]
		},
		{
			value: '$18B+',
			label: 'SAM by 2030',
			red: false,
			tooltip: [
				'Serviceable Addressable Market across 9 FLI-addressable revenue pools',
				'Sports Betting $187B · Sponsorship $150B · Sports Tourism $1.3T',
				'Media Rights $78B · Fantasy Sports $65B · Tribal Gaming $44B',
				'1% capture of SAM pools = ~$180M annual run-rate revenue',
			]
		},
		{
			value: '20M+',
			label: 'Global Players',
			red: false,
			tooltip: [
				'Estimated active disc golfers worldwide as of 2024',
				'86% participation growth since 2020 — fastest-growing outdoor sport',
				'Over 17,000 courses across 99 countries',
				'Core U.S. player base supplemented by strong European and Asian markets',
			]
		},
		{
			value: '86%',
			label: 'Growth Since 2020',
			red: false,
			tooltip: [
				'PDGA-tracked participation growth from 2020 to 2024',
				'Driven by pandemic-era outdoor activity surge that retained players post-COVID',
				'Youth demographic skews 18–34 — aligns with sports betting and streaming audiences',
				'Zero stadium infrastructure currently exists — FLI enters with no incumbent to displace',
			]
		},
	];

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

<div class="max-w-6xl space-y-10 lg:ml-8 xl:ml-16 2xl:ml-24">
	<div>
		<h1 class="text-3xl font-black text-white">Welcome, {data.user?.name?.split(' ')[0]}.</h1>
		<p class="mt-1 text-white/50">FLI Golf League · Investor Data Room · Q2 2026 Seed Round</p>
	</div>

	<!-- Raise summary -->
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
		{#each stats as stat}
			<div class="group relative rounded-xl border-2 {stat.red ? 'border-brand-400/70 bg-brand-600/30' : 'border-white/25 bg-navy-700/55'} p-5 text-center cursor-default">
				<div class="text-2xl font-black {stat.red ? 'text-brand-300' : 'text-white'}">{stat.value}</div>
				<div class="text-xs font-bold text-white mt-1 uppercase tracking-wide">{stat.label}</div>

				<!-- Tooltip -->
				<div class="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50
					w-64 rounded-xl border-2 border-white/20 bg-navy-950/95 backdrop-blur-sm p-3 shadow-xl
					opacity-0 group-hover:opacity-100 transition-opacity duration-150">
					<!-- Arrow -->
					<div class="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-white/15"></div>
					<div class="text-xs font-bold text-white mb-2">{stat.label}</div>
					<ul class="space-y-1.5">
						{#each stat.tooltip as point}
							<li class="flex items-start gap-1.5 text-left">
								<span class="mt-1 h-1 w-1 rounded-full bg-brand-400 shrink-0"></span>
								<span class="text-xs text-white/65 leading-snug">{point}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/each}
	</div>

	<!-- Use of Proceeds summary card -->
	{#if canSee('proceeds')}
	<a href="/dashboard/proceeds" class="group block rounded-xl border-2 border-white/20 bg-navy-700/50 p-6 hover:bg-navy-700/60 transition-colors">
		<div class="flex items-center justify-between mb-4">
			<h2 class="text-lg font-bold text-white">Use of Proceeds</h2>
			<span class="text-xs text-white/30 group-hover:text-white/60 transition-colors">View full breakdown →</span>
		</div>
		<div class="flex h-3 rounded-full overflow-hidden gap-0.5 mb-3">
			<div class="h-full bg-brand-500" style="width:35%"></div>
			<div class="h-full bg-fli-blue-500" style="width:25%"></div>
			<div class="h-full bg-yellow-500" style="width:20%"></div>
			<div class="h-full bg-green-500" style="width:20%"></div>
		</div>
		<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
			{#each [
				{ pct: '35%', label: 'Event Production & Technology',       color: 'text-brand-400' },
				{ pct: '25%', label: 'League Operations & Team Development', color: 'text-fli-blue-300' },
				{ pct: '20%', label: 'Media & Content Buildout',             color: 'text-yellow-400' },
				{ pct: '20%', label: 'Marketing, Working Capital & Reserve', color: 'text-green-400' },
			] as item}
				<div class="rounded-lg bg-navy-900/80 border-2 border-white/15 p-3 text-center">
					<div class="text-xl font-black {item.color}">{item.pct}</div>
					<div class="text-xs text-white/50 mt-1 leading-snug">{item.label}</div>
				</div>
			{/each}
		</div>
	</a>
	{/if}

	<!-- Financial forecast -->
	<div class="rounded-xl border-2 border-white/20 bg-navy-700/50 p-6">
		<!-- Header + tab toggle -->
		<div class="flex items-center justify-between mb-5">
			<h2 class="text-lg font-bold text-white">Financial Forecast</h2>
			<div class="flex items-center rounded-lg border-2 border-white/20 bg-navy-800/50 p-0.5">
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
						<tr class="border-b-2 border-white/20 text-white/40 text-xs uppercase tracking-wide">
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
		{#if canSee('pitch-deck')}
		<a href="/dashboard/pitch-deck" class="rounded-xl border-2 border-brand-400/60 bg-brand-600/20 p-6 hover:bg-brand-600/25 transition-colors group">
			<div class="flex items-center gap-3 mb-3">
				<div class="h-9 w-9 rounded-lg bg-brand-500/45 flex items-center justify-center shrink-0">
					<Presentation class="h-4.5 w-4.5 text-brand-200" />
				</div>
				<div class="text-brand-200 font-bold group-hover:text-brand-100 transition-colors">Pitch Deck</div>
			</div>
			<div class="text-sm text-white/50">Full investor presentation</div>
		</a>
		{/if}

		{#if canSee('the-sport')}
		<a href="/dashboard/the-sport" class="rounded-xl border-2 border-white/20 bg-navy-700/50 p-6 hover:bg-navy-700/60 transition-colors group">
			<div class="flex items-center gap-3 mb-3">
				<div class="h-9 w-9 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
					<Disc class="h-4.5 w-4.5 text-green-400" />
				</div>
				<div class="text-white font-bold group-hover:text-yellow-400 transition-colors">The Sport</div>
			</div>
			<div class="text-sm text-white/50">17K courses · 86% growth · 99 countries</div>
		</a>
		{/if}

		{#if canSee('market-opportunity')}
		<a href="/dashboard/market-opportunity" class="rounded-xl border-2 border-white/20 bg-navy-700/50 p-6 hover:bg-navy-700/60 transition-colors group">
			<div class="flex items-center gap-3 mb-3">
				<div class="h-9 w-9 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
					<TrendingUp class="h-4.5 w-4.5 text-fli-blue-300" />
				</div>
				<div class="text-white font-bold group-hover:text-yellow-400 transition-colors">Market Opportunity</div>
			</div>
			<div class="text-sm text-white/50">9 revenue pools · $18B SAM</div>
		</a>
		{/if}

		{#if canSee('why-fli-wins')}
		<a href="/dashboard/why-fli-wins" class="rounded-xl border-2 border-white/20 bg-navy-700/50 p-6 hover:bg-navy-700/60 transition-colors group">
			<div class="flex items-center gap-3 mb-3">
				<div class="h-9 w-9 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
					<Trophy class="h-4.5 w-4.5 text-yellow-400" />
				</div>
				<div class="text-white font-bold group-hover:text-yellow-400 transition-colors">Why FLI Wins</div>
			</div>
			<div class="text-sm text-white/50">Stadium format · living analogs</div>
		</a>
		{/if}

		{#if canSee('investment-thesis')}
		<a href="/dashboard/investment-thesis" class="rounded-xl border-2 border-white/20 bg-navy-700/50 p-6 hover:bg-navy-700/60 transition-colors group">
			<div class="flex items-center gap-3 mb-3">
				<div class="h-9 w-9 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
					<DollarSign class="h-4.5 w-4.5 text-brand-300" />
				</div>
				<div class="text-white font-bold group-hover:text-yellow-400 transition-colors">Investment Thesis</div>
			</div>
			<div class="text-sm text-white/50">$7.5M seed · Q2 2026</div>
		</a>
		{/if}

		{#if canSee('celebrity-network')}
		<a href="/dashboard/celebrity-network" class="rounded-xl border-2 border-fli-blue-500/50 bg-fli-blue-800/25 p-6 hover:bg-yellow-500/10 transition-colors group">
			<div class="flex items-center gap-3 mb-3">
				<div class="h-9 w-9 rounded-lg bg-fli-blue-700/30 flex items-center justify-center shrink-0">
					<Star class="h-4.5 w-4.5 text-yellow-400" />
				</div>
				<div class="text-white font-bold group-hover:text-yellow-400 transition-colors">Celebrity Network</div>
			</div>
			<div class="text-sm text-white/50">35 celebrities · 500M+ reach</div>
		</a>
		{/if}

		{#if canSee('documents')}
			<a href="/dashboard/documents" class="rounded-xl border-2 border-white/20 bg-navy-700/50 p-6 hover:bg-navy-700/60 transition-colors group">
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

	<!-- Investor materials -->
	<div>
		<div class="text-xs font-semibold text-white/25 uppercase tracking-widest mb-3">Investor Materials</div>
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{#if canSee('management')}
				<a href="/dashboard/management" class="rounded-xl border-2 border-white/20 bg-navy-700/50 p-5 hover:bg-navy-700/60 transition-colors group">
					<div class="flex items-center gap-3 mb-2">
						<div class="h-8 w-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
							<Briefcase class="h-4 w-4 text-white/50" />
						</div>
						<div class="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">Management & Team</div>
					</div>
					<div class="text-xs text-white/40">Detailed resumes · advisors · directors</div>
				</a>
				{/if}

				{#if canSee('industry-reports')}
				<a href="/dashboard/industry-reports" class="rounded-xl border-2 border-white/20 bg-navy-700/50 p-5 hover:bg-navy-700/60 transition-colors group">
					<div class="flex items-center gap-3 mb-2">
						<div class="h-8 w-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
							<BarChart2 class="h-4 w-4 text-fli-blue-300" />
						</div>
						<div class="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">Industry Reports</div>
					</div>
					<div class="text-xs text-white/40">Market research · growth analysis</div>
				</a>
				{/if}

				{#if canSee('sponsorships')}
				<a href="/dashboard/sponsorships" class="rounded-xl border-2 border-white/20 bg-navy-700/50 p-5 hover:bg-navy-700/60 transition-colors group">
					<div class="flex items-center gap-3 mb-2">
						<div class="h-8 w-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
							<Handshake class="h-4 w-4 text-green-400" />
						</div>
						<div class="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">Sponsorships</div>
					</div>
					<div class="text-xs text-white/40">LOIs · confirmed sponsor commitments</div>
				</a>
				{/if}

				{#if canSee('player-commitments')}
				<a href="/dashboard/player-commitments" class="rounded-xl border-2 border-white/20 bg-navy-700/50 p-5 hover:bg-navy-700/60 transition-colors group">
					<div class="flex items-center gap-3 mb-2">
						<div class="h-8 w-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
							<UserSquare2 class="h-4 w-4 text-yellow-400" />
						</div>
						<div class="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">Player Commitments</div>
					</div>
					<div class="text-xs text-white/40">24-player roster · LOIs · bios</div>
				</a>
				{/if}

				{#if canSee('inaugural-venue')}
				<a href="/dashboard/inaugural-venue" class="rounded-xl border-2 border-white/20 bg-navy-700/50 p-5 hover:bg-navy-700/60 transition-colors group">
					<div class="flex items-center gap-3 mb-2">
						<div class="h-8 w-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
							<MapPin class="h-4 w-4 text-brand-300" />
						</div>
						<div class="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">Inaugural Venue</div>
					</div>
					<div class="text-xs text-white/40">Top 2 venue candidates · site analysis</div>
				</a>
				{/if}

				{#if canSee('financial-projections')}
				<a href="/dashboard/financial-projections" class="rounded-xl border-2 border-white/20 bg-navy-700/50 p-5 hover:bg-navy-700/60 transition-colors group">
					<div class="flex items-center gap-3 mb-2">
						<div class="h-8 w-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
							<Table2 class="h-4 w-4 text-fli-blue-300" />
						</div>
						<div class="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">Financial Projections</div>
					</div>
					<div class="text-xs text-white/40">Full P&L · revenue mix · assumptions</div>
				</a>
				{/if}

				{#if canSee('financial-statements')}
				<a href="/dashboard/financial-statements" class="rounded-xl border-2 border-white/20 bg-navy-700/50 p-5 hover:bg-navy-700/60 transition-colors group">
					<div class="flex items-center gap-3 mb-2">
						<div class="h-8 w-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
							<Receipt class="h-4 w-4 text-white/50" />
						</div>
						<div class="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">Financial Statements</div>
					</div>
					<div class="text-xs text-white/40">Income statement · balance sheet · FY2025 + Q1 2026</div>
				</a>
				{/if}

				{#if canSee('cap-table')}
				<a href="/dashboard/cap-table" class="rounded-xl border-2 border-white/20 bg-navy-700/50 p-5 hover:bg-navy-700/60 transition-colors group">
					<div class="flex items-center gap-3 mb-2">
						<div class="h-8 w-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
							<PieChart class="h-4 w-4 text-brand-300" />
						</div>
						<div class="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">Cap Table</div>
					</div>
					<div class="text-xs text-white/40">Ownership · investors · loans</div>
				</a>
				{/if}
			</div>
	</div>

	<!-- How to Play — visible to all -->
	{#if canSee('how-to-play')}
	<a href="/dashboard/how-to-play" class="rounded-xl border-2 border-white/20 bg-navy-700/50 p-5 hover:bg-navy-700/60 transition-colors group flex items-center gap-4">
		<div class="h-10 w-10 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
			<PlayCircle class="h-5 w-5 text-green-400" />
		</div>
		<div>
			<div class="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">How to Play Disc Golf</div>
			<div class="text-xs text-white/40 mt-0.5">Rules primer · scoring · the FLI stadium format explained</div>
		</div>
	</a>
	{/if}
</div>
