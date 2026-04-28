<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { BarChart2, Table2, Gamepad2, Radio, Video, Cloud, Archive, Trophy, Dices, TrendingUp, MapPin, Star, Globe, Users } from 'lucide-svelte';
	export let data: PageData;

	const forecast = [
		{ year: '2026', revenue: 2.824,   cogs: 1.800,  expenses: 2.813,  profit: -1.789, margin: '—' },
		{ year: '2027', revenue: 21.392,  cogs: 11.765, expenses: 8.541,  profit: 1.087,  margin: '5.08%' },
		{ year: '2028', revenue: 29.971,  cogs: 14.760, expenses: 10.024, profit: 5.186,  margin: '17.30%' },
		{ year: '2029', revenue: 62.784,  cogs: 23.511, expenses: 18.083, profit: 21.190, margin: '33.75%' },
		{ year: '2030', revenue: 113.180, cogs: 38.271, expenses: 30.914, profit: 43.995, margin: '38.87%' },
		{ year: '2031', revenue: 182.733, cogs: 54.961, expenses: 42.248, profit: 85.524, margin: '46.80%' }
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
		<div id="overview" class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
			<h2 class="text-lg font-bold text-white mb-3">The Opportunity</h2>
			<p class="text-white/70 leading-relaxed">
				FLI Golf League is creating the world's first stadium-style professional disc golf league —
				engineered for media, betting, and franchise scale from Day 1. One category. Zero competition.
			</p>
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
				{#each [
					{ v: '100+',   l: 'Countries Playing',  icon: Globe,       color: 'text-fli-blue-300', bg: 'bg-fli-blue-500/15' },
					{ v: '20M+',   l: 'Active Players',     icon: Users,       color: 'text-green-400',    bg: 'bg-green-500/15' },
					{ v: '17,287', l: 'Courses Worldwide',  icon: MapPin,      color: 'text-yellow-400',   bg: 'bg-yellow-500/15' },
					{ v: '86%',    l: 'Growth Since 2020',  icon: TrendingUp,  color: 'text-brand-400',    bg: 'bg-brand-600/15' },
				] as s}
					<div class="rounded-lg bg-navy-800/50 border border-white/10 p-4 flex flex-col items-center text-center gap-2">
						<div class="h-9 w-9 rounded-lg {s.bg} flex items-center justify-center">
							<svelte:component this={s.icon} class="h-5 w-5 {s.color}" />
						</div>
						<div class="text-xl font-black text-white">{s.v}</div>
						<div class="text-xs font-bold text-white/40">{s.l}</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Built Different -->
		<div id="built-different" class="rounded-xl border border-white/15 bg-navy-700/50 p-6 space-y-5">
			<div>
				<h2 class="text-2xl font-black text-white leading-tight">FGL is Built Different —<br/><span class="text-brand-500">In Every Dimension</span></h2>
			</div>

			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-white/15">
							<th class="text-left py-3 pr-4 text-xs font-bold text-white/40 uppercase tracking-widest w-40">Category</th>
							<th class="py-3 px-4 text-center text-xs font-bold text-brand-400 uppercase tracking-widest">FLI Golf League</th>
							<th class="py-3 px-4 text-center text-xs font-bold text-white/40 uppercase tracking-widest">DGPT / PDGA Tour</th>
							<th class="py-3 px-4 text-center text-xs font-bold text-white/40 uppercase tracking-widest">Intl Dance League</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-white/8">
						{#each [
							{ cat: 'Stadium Venue',      fgl: ['✓', 'Custom Built'],  dgpt: ['✗', 'Park Courses'],  idl: ['△', 'Theaters'] },
							{ cat: 'Broadcast Design',   fgl: ['✓', 'Emmy Team'],     dgpt: ['△', 'Minimal'],       idl: ['✓', 'High-Prod'] },
							{ cat: 'Equal Pay / Gender', fgl: ['✓', '100% Equal'],    dgpt: ['✗', 'Unequal'],       idl: ['△', 'Mixed'] },
							{ cat: 'Franchise Model',    fgl: ['✓', '1st in DG'],     dgpt: ['✗', 'None'],          idl: ['✓', '6 Teams'] },
							{ cat: 'Gaming / Betting',   fgl: ['✓', 'Tribal + Books'],dgpt: ['✗', 'None'],          idl: ['✗', 'None'] },
							{ cat: 'Fantasy Platform',   fgl: ['✓', 'Built'],         dgpt: ['✗', 'None'],          idl: ['✗', 'None'] },
							{ cat: 'Hospitality / VIP',  fgl: ['✓', 'Full Tiers'],    dgpt: ['△', 'Minimal'],       idl: ['✓', 'Yes'] },
						] as row}
							<tr class="hover:bg-white/3 transition-colors">
								<td class="py-3 pr-4 text-xs font-semibold text-white/70">{row.cat}</td>
								<td class="py-3 px-4 text-center">
									<span class="inline-flex flex-col items-center gap-0.5">
										<span class="text-base {row.fgl[0] === '✓' ? 'text-green-400' : row.fgl[0] === '△' ? 'text-yellow-400' : 'text-brand-400'}">{row.fgl[0]}</span>
										<span class="text-xs text-white/60">{row.fgl[1]}</span>
									</span>
								</td>
								<td class="py-3 px-4 text-center">
									<span class="inline-flex flex-col items-center gap-0.5">
										<span class="text-base {row.dgpt[0] === '✓' ? 'text-green-400' : row.dgpt[0] === '△' ? 'text-yellow-400' : 'text-white/30'}">{row.dgpt[0]}</span>
										<span class="text-xs text-white/40">{row.dgpt[1]}</span>
									</span>
								</td>
								<td class="py-3 px-4 text-center">
									<span class="inline-flex flex-col items-center gap-0.5">
										<span class="text-base {row.idl[0] === '✓' ? 'text-green-400' : row.idl[0] === '△' ? 'text-yellow-400' : 'text-white/30'}">{row.idl[0]}</span>
										<span class="text-xs text-white/40">{row.idl[1]}</span>
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<p class="text-xs text-white/60 leading-relaxed border-t border-white/10 pt-4">
				Picture images for illustrative purposes only. Past performance is not indicative of future results. An investment in the Company's securities is speculative, illiquid and there may be a total risk of loss. There is no guarantee that any specific outcome will be achieved.
			</p>
		</div>

		<!-- Why Disc Golf. Why Now. -->
		<div id="why-now" class="rounded-xl border border-white/15 bg-navy-700/50 p-6 space-y-6">
			<div>
				<h2 class="text-2xl font-black text-white leading-tight">Why Disc Golf. <span class="text-brand-500">Why Now.</span></h2>
			</div>

			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each [
					{
						v: '500B+',
						title: 'Digital Demand Signal',
						body: 'TikTok #discgolf: 500B+ global views. JomezPro: 441K subscribers, 237M+ YouTube views. Does not include FGL entertainment features like celebrity appearances and music performances.',
						color: 'border-l-fli-blue-400', iconBg: 'bg-fli-blue-500/15', textColor: 'text-fli-blue-300'
					},
					{
						v: '20M+',
						title: 'Global Participation Base',
						body: 'Over 20M active players worldwide. PDGA membership doubled in 4 years. 86% surge in participation since 2020.',
						color: 'border-l-green-400', iconBg: 'bg-green-500/15', textColor: 'text-green-400'
					},
					{
						v: '$18B+',
						title: 'Growing FGL SAM in 2030',
						body: 'New revenue stream introductions by FGL will dramatically increase the revenue and value potential of the sport globally.',
						color: 'border-l-yellow-400', iconBg: 'bg-yellow-500/15', textColor: 'text-yellow-400'
					},
					{
						v: '$1.3B→$2.5B',
						title: 'Core DG Product Market',
						body: 'Core product market growth from $1.2B in 2025 to $2.5B by 2030, continuing at an average 15% CAGR growth rate since 2019.',
						color: 'border-l-brand-500', iconBg: 'bg-brand-600/15', textColor: 'text-brand-400'
					},
					{
						v: '89%',
						title: 'Low-Cost, High-Access Sport',
						body: '89% of 17,287 courses are FREE. 500M people live within 6 miles of a course.',
						color: 'border-l-purple-400', iconBg: 'bg-purple-500/15', textColor: 'text-purple-300'
					},
					{
						v: '18–34',
						title: 'Young, Digital-Native Demo',
						body: "Disc golf's dominant demographic is 18–34 and spending-ready — the most valuable audience in sports.",
						color: 'border-l-pink-400', iconBg: 'bg-pink-500/15', textColor: 'text-pink-300'
					},
				] as s}
					<div class="rounded-lg bg-navy-800/50 border border-white/10 border-l-4 {s.color} p-4 flex flex-col gap-2">
						<div class="text-2xl font-black {s.textColor}">{s.v}</div>
						<div class="text-sm font-bold text-white">{s.title}</div>
						<p class="text-xs text-white/50 leading-relaxed">{s.body}</p>
					</div>
				{/each}
			</div>

			<p class="text-xs text-white/60 leading-relaxed border-t border-white/10 pt-4">
				Picture images for illustrative purposes only. Past performance is not indicative of future results. An investment in the Company's securities is speculative, illiquid and there may be a total risk of loss. There is no guarantee that any specific outcome will be achieved.
			</p>
		</div>

		<!-- The Roster -->
		<div id="roster" class="rounded-xl border border-white/15 bg-navy-700/50 p-6 space-y-6">
			<div>
				<h2 class="text-2xl font-black text-white leading-tight">Elite Athletes.<br/><span class="text-brand-500">Massive Reach.</span></h2>
				<p class="text-white/60 leading-relaxed mt-2 max-w-2xl">
					The world's top disc golf pros — committed to FLI Golf League — bring a combined digital footprint that no other disc golf property has ever assembled.
				</p>
			</div>

			<!-- Reach stats -->
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
				{#each [
					{ v: '1M+',   l: 'Combined Social Media Followers', sub: 'Across Instagram, YouTube & TikTok',   icon: Users,    color: 'text-fli-blue-300', bg: 'bg-fli-blue-500/15' },
					{ v: '323M+', l: 'YouTube Views Featuring Our Players', sub: 'JomezPro lifetime views — 503K subs',  icon: Video,    color: 'text-brand-400',    bg: 'bg-brand-600/15' },
					{ v: '225K+', l: 'ESPN2 Broadcast Viewers — #1 That Day', sub: "Disc golf's mainstream TV debut",    icon: Radio,    color: 'text-yellow-400',   bg: 'bg-yellow-500/15' },
					{ v: '50K+',  l: 'Peak Concurrent Live Viewers', sub: 'Disc Golf Network streaming events',         icon: TrendingUp, color: 'text-green-400',  bg: 'bg-green-500/15' },
				] as s}
					<div class="rounded-lg bg-navy-800/50 border border-white/10 p-4 flex flex-col items-center text-center gap-2">
						<div class="h-9 w-9 rounded-lg {s.bg} flex items-center justify-center">
							<svelte:component this={s.icon} class="h-5 w-5 {s.color}" />
						</div>
						<div class="text-2xl font-black text-white">{s.v}</div>
						<div class="text-xs font-semibold text-white/70 leading-snug">{s.l}</div>
						<div class="text-xs text-white/35 leading-snug">{s.sub}</div>
					</div>
				{/each}
			</div>

			<!-- Accomplishments -->
			<div>
				<div class="text-center mb-4">
					<span class="text-xs font-black text-yellow-400 uppercase tracking-widest">The most accomplished roster assembled in disc golf history!</span>
				</div>
				<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
					{#each [
						{ v: '15+',  title: 'PDGA World Championship Titles',     sub: 'Combined across the FGL roster' },
						{ v: '50+',  title: 'PDGA Major Championship Wins',        sub: 'Worlds · USDGC · Champions Cup · Euro Open' },
						{ v: '600+', title: 'Career Professional Wins',            sub: 'PDGA-sanctioned tournaments' },
						{ v: '4×',   title: 'PDGA Players of the Year on Roster',  sub: 'Multiple multi-year POY award winners' },
						{ v: '2×',   title: 'Grand Slam Completions',              sub: 'All 4 majors in a single season — first ever achieved' },
						{ v: '#1',   title: 'All-Time FPO Major Win Record',       sub: '17 Major titles — most in women\'s history' },
					] as s}
						<div class="rounded-lg bg-navy-800/50 border border-white/10 border-l-4 border-l-brand-500 p-4">
							<div class="text-xl font-black text-brand-400">{s.v}</div>
							<div class="text-xs font-bold text-white mt-0.5">{s.title}</div>
							<div class="text-xs text-white/40 mt-0.5 leading-snug">{s.sub}</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Historic milestones -->
			<div class="grid sm:grid-cols-3 gap-3">
				{#each [
					{ label: '1st Female Player Rated 1000+ (PDGA)', sub: 'Historic — never done before in disc golf' },
					{ label: 'ESPN SportsCenter Top 10 — #1 Play', sub: '"Holy Shot" went viral across mainstream media' },
					{ label: '2025 World Games — Gold Medal', sub: 'USA · Disc golf on the world stage' },
				] as m}
					<div class="rounded-lg bg-yellow-500/8 border border-yellow-500/30 px-4 py-3 text-center">
						<div class="text-xs font-black text-yellow-400 uppercase tracking-wide">{m.label}</div>
						<div class="text-xs text-white/40 mt-1">{m.sub}</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Current Limitations & FGL Fix -->
		<div id="limitations" class="rounded-xl border border-white/15 bg-navy-700/50 p-6 space-y-6">
			<div class="grid sm:grid-cols-2 gap-6">

				<!-- Current Limitations -->
				<div>
					<h2 class="text-sm font-black text-white uppercase tracking-widest mb-4">Current Limitations</h2>
					<div class="space-y-2.5">
						{#each [
							'Wooded park courses limit spectator capacity & camera angles',
							'No broadcast engineering — poor lighting & sightlines',
							'No gender-equal payout across any major disc golf tour',
							'No franchise model — zero team ownership or expansion',
						] as item}
							<div class="flex items-start gap-2.5 rounded-lg bg-brand-600/10 border border-brand-600/25 px-3 py-2.5">
								<span class="text-brand-400 font-black text-sm shrink-0 mt-0.5">✗</span>
								<p class="text-xs text-white/70 leading-relaxed">{item}</p>
							</div>
						{/each}
						<div class="flex items-start gap-2.5 rounded-lg bg-brand-600/10 border border-brand-600/25 px-3 py-2.5">
							<span class="text-brand-400 font-black text-sm shrink-0 mt-0.5">✗</span>
							<p class="text-xs text-white/70 leading-relaxed">No gaming or sportsbook integration</p>
						</div>
						<div class="rounded-lg overflow-hidden border border-brand-600/25">
							<img
								src="https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/wpoabwhngq071x6/p_2_rexgzeig9l.png"
								alt="Current disc golf limitations"
								class="w-full h-auto"
							/>
						</div>
					</div>

				</div>

				<!-- The FGL Fix -->
				<div>
					<div class="flex items-center gap-2 mb-4">
						<h2 class="text-sm font-black text-white uppercase tracking-widest">The FGL Fix</h2>
					</div>
					<div class="rounded-lg bg-yellow-500/10 border border-yellow-500/30 px-3 py-2 mb-3 text-center">
						<span class="text-xs font-black text-yellow-400 uppercase tracking-widest">★ Top 24 World-Ranked Players — All Committed ★</span>
					</div>
					<div class="space-y-2.5">
						{#each [
							{ title: 'Stadium-Engineered Course', body: 'Custom par-3 stadium — front-row seating, controlled lighting, optimal camera angles.' },
							{ title: 'Emmy-Winning Broadcast Team', body: 'GK Productions secured. 13-time Emmy winner Mark Coleman leads production.' },
							{ title: '100% Gender-Equal Payout', body: 'First disc golf league with identical male/female prize pools — total parity.' },
							{ title: '1st Franchisable DG League', body: 'Contracted teams with ownership stakes and growing global fan bases.' },
							{ title: 'Tribal Gaming Network', body: 'Gary Santos: 23 yrs tribal governance; IGA Board 10+ years; sportsbook pipeline built.' },
							{ title: 'Fantasy Platform Ready', body: 'Digital player assets, fantasy leagues, skill-based contests — activates at launch.' }
						] as item}
							<div class="flex items-start gap-2.5 rounded-lg bg-green-500/8 border border-green-500/25 px-3 py-2.5">
								<span class="text-green-400 font-black text-sm shrink-0 mt-0.5">✓</span>
								<div>
									<span class="text-xs font-bold text-white">{item.title}</span>
									<span class="text-xs text-white/50"> — {item.body}</span>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<p class="text-xs text-white/60 leading-relaxed border-t border-white/10 pt-4">
				Picture images for illustrative purposes only. Past performance is not indicative of future results. An investment in the Company's securities is speculative, illiquid and there may be a total risk of loss. There is no guarantee that any specific outcome will be achieved.
			</p>
		</div>

		<!-- The Team -->
		<div id="the-team" class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
			<h2 class="text-lg font-bold text-white mb-4">The Team</h2>
			<div class="grid sm:grid-cols-2 gap-4">
				{#each [
					{
						name: 'Andrew Panza',
						title: 'CEO & Tour Director',
						bio: 'Led $25M in annual retail sales; managed 250+ employees before 30. CEO of Sunsteps Entertainment Group with 3 reality TV shows in production.',
						img: 'https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/wisij1a8u174bk5/andrew_m1eh0dfdp8.png.jpg'
					},
					{
						name: 'Mark Coleman',
						title: 'Production Director — 13× Emmy Winner',
						bio: '30+ years in sports broadcasting. Senior roles at Spectrum, NBC Universal, Fox Sports, The Golf Channel. Designed broadcast facilities for the Lakers & Dodgers.',
						img: 'https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/wit388m9iwh5689/mark_i7ak4w3au9.png.png'
					},
					{
						name: 'Ina Masten',
						title: 'Chief Financial Officer',
						bio: '35+ years in accounting, FP&A, and CFO leadership. Founder of Masten Solutions. Brings rigorous governance and investor strategy.',
						img: 'https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/lxv8ztqunjlxyx8/ina_vhm4nvda6q.png.jpg'
					},
					{
						name: 'Gary G. Santos',
						title: 'Tribal & Gaming — Strategic Lead',
						bio: '23+ years tribal governance at Tule River Indian Tribe. IGA Board 10+ years. Unmatched tribal gaming relationships and regulatory expertise.',
						img: 'https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/fk9v5xwzsfxzrwx/gary_a8u1mrz2mn.jpg',
						imgOffset: '5px'
					}
				] as member}
					<div class="rounded-lg bg-navy-800/50 border border-white/15 p-4 flex gap-4 items-start">
						<img
							src={member.img}
							alt={member.name}
							class="h-28 w-28 rounded-lg object-cover shrink-0 border-2 border-white/15"
							style={member.imgOffset ? `object-position: center ${member.imgOffset}` : ''}
						/>
						<div>
							<div class="font-semibold text-white text-sm">{member.name}</div>
							<div class="text-xs text-yellow-400 mb-2">{member.title}</div>
							<p class="text-xs text-white/50 leading-relaxed">{member.bio}</p>
						</div>
					</div>
				{/each}
			</div>
		<!-- Advisory Board -->
		<div id="advisory-board" class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
			<h2 class="text-lg font-bold text-white mb-1">FLI Golf League Advisory Board</h2>
			<p class="text-white/40 text-xs mb-5 uppercase tracking-widest">Strategic Advisors</p>
			<div class="space-y-5">

				<!-- Stephen Crystal -->
				<div class="rounded-lg bg-navy-800/50 border border-white/15 p-5 flex flex-col sm:flex-row gap-5">
					<img
						src="https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/vlcqriej07y07gx/p_11_2sx9p48nyz.png"
						alt="SCCG / Stephen Crystal"
						class="h-24 w-32 rounded-lg object-cover shrink-0 border-2 border-white/15 self-start"
					/>
					<div class="flex-1">
						<div class="font-bold text-white">Stephen Crystal</div>
						<div class="text-xs text-yellow-400 mb-3">Gaming Strategy Advisor · Founder & CEO, SCCG Management</div>
						<div class="flex gap-4 mb-3">
							{#each [{ v: '30+', l: 'Years in Gaming' }, { v: 'SCCG', l: 'Founder & CEO' }] as s}
								<div class="rounded-lg bg-navy-900/60 border border-white/10 px-3 py-2 text-center">
									<div class="text-sm font-black text-white">{s.v}</div>
									<div class="text-xs text-white/40 mt-0.5">{s.l}</div>
								</div>
							{/each}
						</div>
						<p class="text-xs text-white/50 leading-relaxed">Founder & CEO of SCCG Management, a global consultancy specializing in sports betting, iGaming, eSports, and emerging gaming technologies. Decades of experience in casino operations, regulatory environments, and international gaming markets.</p>
					</div>
				</div>

				<!-- Ricky Wysocki -->
				<div class="rounded-lg bg-navy-800/50 border border-white/15 p-5 flex flex-col sm:flex-row gap-5">
					<img
						src="https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/mebf65thc4t8u3h/p_7_3pphhtdugl.png"
						alt="Ricky Wysocki"
						class="h-24 w-32 rounded-lg object-cover shrink-0 border-2 border-white/15 self-start"
					/>
					<div class="flex-1">
						<div class="font-bold text-white">Ricky Wysocki</div>
						<div class="text-xs text-yellow-400 mb-3">Pro Athlete Advisor · 2× PDGA World Champion</div>
						<div class="flex gap-3 flex-wrap mb-3">
							{#each [{ v: '2×', l: 'World Champion' }, { v: '4×', l: 'PDGA Player of the Year' }, { v: '132', l: 'Career Wins' }] as s}
								<div class="rounded-lg bg-navy-900/60 border border-white/10 px-3 py-2 text-center">
									<div class="text-sm font-black text-white">{s.v}</div>
									<div class="text-xs text-white/40 mt-0.5">{s.l}</div>
								</div>
							{/each}
						</div>
						<p class="text-xs text-white/50 leading-relaxed">A 4-time PDGA Player of the Year and 2-time World Champion (2016 & 2017), "Sockibomb" brings global name recognition, player credibility, and a massive fan following to FLI Golf League. His involvement validates FGL's elite competition standards.</p>
					</div>
				</div>

				<!-- Ohn Scoggins -->
				<div class="rounded-lg bg-navy-800/50 border border-white/15 p-5 flex flex-col sm:flex-row gap-5">
					<img
						src="https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/rvw5gbu196jgjmi/p_8_3pnqn23ggl.png"
						alt="Ohn Scoggins"
						class="h-24 w-32 rounded-lg object-cover shrink-0 border-2 border-white/15 self-start"
					/>
					<div class="flex-1">
						<div class="font-bold text-white">Ohn Scoggins</div>
						<div class="text-xs text-yellow-400 mb-3">Pro Athlete Advisor · 2025 FPO World Champion</div>
						<div class="flex gap-3 flex-wrap mb-3">
							{#each [{ v: '2025', l: 'FPO World Champion' }, { v: '5×', l: 'Masters World Champ' }, { v: '#5', l: 'FPO World Ranking' }] as s}
								<div class="rounded-lg bg-navy-900/60 border border-white/10 px-3 py-2 text-center">
									<div class="text-sm font-black text-white">{s.v}</div>
									<div class="text-xs text-white/40 mt-0.5">{s.l}</div>
								</div>
							{/each}
						</div>
						<p class="text-xs text-white/50 leading-relaxed">The 2025 PDGA FPO World Champion and the oldest player to ever claim the title. A 5× Masters World Champion with the highest FPO event rating in PDGA history. Ohn anchors FGL's gender-equal brand with elite credibility and an inspirational story.</p>
					</div>
				</div>

			</div>
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

			<!-- Use of Proceeds -->
			<div id="proceeds" class="rounded-xl border border-yellow-500/40 bg-navy-700/50 p-6 space-y-6">
				<!-- Header -->
				<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
					<div>
						<div class="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-1">Use of Proceeds</div>
						<h2 class="text-2xl font-black text-white">$7,500,000 <span class="text-yellow-400">Seed Round</span></h2>
						<p class="text-white/50 text-sm mt-1">Inaugural Season Launch Capital</p>
					</div>
					<div class="rounded-xl border border-yellow-500/40 bg-yellow-500/10 px-6 py-4 text-center shrink-0">
						<div class="text-4xl font-black text-yellow-400 leading-none">$7.5<span class="text-2xl">M</span></div>
						<div class="text-xs font-bold text-white mt-1">SEED ROUND</div>
						<div class="text-xs text-white/40 mt-0.5">Raising Now · Q2 2026</div>
						<div class="text-xs text-white/30 mt-0.5">Presented by Young America Capital</div>
					</div>
				</div>

				<!-- Allocation bars -->
				<div class="space-y-3">
					{#each [
						{ pct: 35, label: 'Event Production & Technology',      color: 'bg-brand-500',     textColor: 'text-brand-400' },
						{ pct: 25, label: 'League Operations & Team Development', color: 'bg-fli-blue-500',  textColor: 'text-fli-blue-300' },
						{ pct: 20, label: 'Media & Content Buildout',            color: 'bg-yellow-500',    textColor: 'text-yellow-400' },
						{ pct: 20, label: 'Marketing, Working Capital & Reserve', color: 'bg-green-500',    textColor: 'text-green-400' },
					] as item}
						<div class="flex items-center gap-4">
							<div class="w-10 text-right shrink-0">
								<span class="text-sm font-black {item.textColor}">{item.pct}%</span>
							</div>
							<div class="flex-1">
								<div class="flex items-center justify-between mb-1">
									<span class="text-xs font-semibold text-white">{item.label}</span>
								</div>
								<div class="h-2.5 w-full rounded-full bg-white/10">
									<div class="h-2.5 rounded-full {item.color}" style="width: {item.pct}%"></div>
								</div>
							</div>
						</div>
					{/each}
				</div>

				<p class="text-xs text-white/60 leading-relaxed border-t border-white/10 pt-4">
					Picture images for illustrative purposes only. Past performance is not indicative of future results. An investment in the Company's securities is speculative, illiquid and there may be a total risk of loss. There is no guarantee that any specific outcome will be achieved.
				</p>
			</div>

			<!-- Contact / YAC -->
			<div id="contact" class="rounded-xl border border-white/15 bg-navy-700/50 p-6 space-y-6">
				<p class="text-sm text-white/60 leading-relaxed">For more information about FLI Golf and its investment opportunity, please contact:</p>

				<div class="grid sm:grid-cols-2 gap-4">
					{#each [
						{ name: 'Gary Hearl',    title: 'Sports and Health',  firm: 'Young America Capital', email: 'ghearl@yacapital.com',   phone: '276.964.1612' },
						{ name: 'Robert DeGowin', title: 'Sports and Health', firm: 'Young America Capital', email: 'rdegowin@yacapital.com', phone: '619.795.6182' },
					] as contact}
						<div class="rounded-lg bg-navy-800/50 border border-white/10 p-5 space-y-2">
							<div class="font-bold text-white">{contact.name}</div>
							<div class="text-xs text-white/50">{contact.title}</div>
							<div class="text-xs text-yellow-400 font-semibold">{contact.firm}</div>
							<a href="mailto:{contact.email}" class="flex items-center gap-1.5 text-xs text-fli-blue-300 hover:text-white transition-colors">
								✉ {contact.email}
							</a>
							<a href="tel:{contact.phone.replace(/\./g, '')}" class="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
								✆ {contact.phone} mobile
							</a>
						</div>
					{/each}
				</div>

				<!-- YAC footer -->
				<div class="rounded-lg bg-navy-800/50 border border-white/10 p-5 flex flex-col sm:flex-row items-center gap-5">
					<img
						src="https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/fkv2i8inzynjjux/p_10_4snj024rhn.png"
						alt="Young America Capital"
						class="h-24 w-auto shrink-0"
					/>
					<div class="text-center sm:text-left">
						<div class="text-xs font-bold text-white uppercase tracking-wide">Young America Capital, LLC</div>
						<div class="text-xs text-white/40 mt-0.5">SEC Registered Broker Dealer · Member FINRA, SIPC</div>
						<div class="text-xs text-white/30 mt-0.5">141 East Boston Post Road, Mamaroneck, New York 10543</div>
					</div>
				</div>
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
						<table class="w-full text-xs">
							<thead>
								<tr class="border-b border-white/15">
									<th class="text-left py-2.5 pr-4 text-white/40 uppercase tracking-wide font-semibold w-36">Category</th>
									{#each forecast as f}
										<th class="text-right py-2.5 px-3 text-white font-black">{f.year}</th>
									{/each}
								</tr>
							</thead>
							<tbody class="divide-y divide-white/5">
								<tr class="hover:bg-white/3">
									<td class="py-2.5 pr-4 font-semibold text-white/50 uppercase tracking-wide">Sales</td>
									{#each forecast as f}
										<td class="py-2.5 px-3 text-right text-white font-medium">${(f.revenue * 1000).toLocaleString()}</td>
									{/each}
								</tr>
								<tr class="hover:bg-white/3">
									<td class="py-2.5 pr-4 font-semibold text-white/50 uppercase tracking-wide">COGS</td>
									{#each forecast as f}
										<td class="py-2.5 px-3 text-right text-white/60">${(f.cogs * 1000).toLocaleString()}</td>
									{/each}
								</tr>
								<tr class="hover:bg-white/3">
									<td class="py-2.5 pr-4 font-semibold text-white/50 uppercase tracking-wide">Total Expenses</td>
									{#each forecast as f}
										<td class="py-2.5 px-3 text-right text-white/60">${(f.expenses * 1000).toLocaleString()}</td>
									{/each}
								</tr>
								<tr class="border-t-2 border-white/20 hover:bg-white/3">
									<td class="py-2.5 pr-4 font-bold text-white uppercase tracking-wide">Net Profit</td>
									{#each forecast as f}
										<td class="py-2.5 px-3 text-right font-bold {f.profit < 0 ? 'text-brand-400' : 'text-green-400'}">
											{f.profit < 0 ? '–' : ''}${Math.abs(Math.round(f.profit * 1000)).toLocaleString()}
										</td>
									{/each}
								</tr>
								<tr class="hover:bg-white/3">
									<td class="py-2.5 pr-4 font-semibold text-white/50 uppercase tracking-wide">Profit Margin</td>
									{#each forecast as f}
										<td class="py-2.5 px-3 text-right font-semibold {f.profit < 0 ? 'text-white/30' : 'text-green-400'}">{f.margin}</td>
									{/each}
								</tr>
							</tbody>
						</table>
					</div>
				{:else}
					<div class="relative">
						<canvas bind:this={canvas} class="w-full" style="max-height: 320px;"></canvas>
					</div>
				{/if}

				<p class="text-xs text-white/60 mt-4">Forward-looking statements involve risk and uncertainty. Past performance is not indicative of future results.</p>
			</div>

			<!-- Gaming & Tribal Strategy -->
			<div id="gaming-tribal" class="rounded-xl border border-fli-blue-600/40 bg-navy-700/50 p-6 space-y-6">
				<div>
					<h2 class="text-lg font-bold text-white">Gaming & Tribal Strategy</h2>
					<p class="text-xs text-fli-blue-400 uppercase tracking-widest mt-1">The Untapped Revenue Stream — FGL Is First To Formalize This Channel</p>
				</div>

				<!-- Why Gaming Matters -->
				<div>
					<h3 class="text-sm font-bold text-white mb-3 uppercase tracking-wide">Why Gaming Matters</h3>
					<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each [
							{ icon: Trophy, border: 'border-l-4 border-l-yellow-400', iconBg: 'bg-yellow-500/15', iconColor: 'text-yellow-400', title: 'First Mover Advantage', body: 'No disc golf tour has formalized a sportsbook partnership. FGL owns this vertical.' },
							{ icon: Dices, border: 'border-l-4 border-l-fli-blue-400', iconBg: 'bg-fli-blue-500/15', iconColor: 'text-fli-blue-300', title: 'Par-3 = Perfect Betting Format', body: 'Fewer shots, faster resolution, more micro-betting moments per event than any golf format.' },
							{ icon: TrendingUp, border: 'border-l-4 border-l-green-400', iconBg: 'bg-green-500/15', iconColor: 'text-green-400', title: 'In-Play Wagering Designed In', body: 'Moneyline, per-hole props, over/under — engineered into the format from Day 1.' },
							{ icon: MapPin, border: 'border-l-4 border-l-purple-400', iconBg: 'bg-purple-500/15', iconColor: 'text-purple-300', title: 'State-by-State Expansion', body: 'Sports betting in tribal jurisdictions growing rapidly across the country.' },
							{ icon: Star, border: 'border-l-4 border-l-brand-500', iconBg: 'bg-brand-600/15', iconColor: 'text-brand-400', title: 'Fantasy Platform Ready Now', body: 'Digital player assets, draft leagues, skill-based contests — zero integration delay.' }
						] as item}
							<div class="rounded-lg bg-navy-800/50 border border-white/10 {item.border} p-4 flex flex-col gap-3">
								<div class="h-9 w-9 rounded-lg {item.iconBg} flex items-center justify-center">
									<svelte:component this={item.icon} class="h-5 w-5 {item.iconColor}" />
								</div>
								<div>
									<div class="text-sm font-bold text-white">{item.title}</div>
									<p class="text-xs text-white/55 leading-relaxed mt-1">{item.body}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Tribal Gaming Advantage -->
				<div>
					<h3 class="text-sm font-bold text-white mb-1 uppercase tracking-wide">The Tribal Gaming Advantage</h3>
					<p class="text-xs text-white/40 mb-4">Gary Santos — Tribal & Gaming Lead · 23 yrs tribal governance · Tule River Indian Tribe · $47M budget · IGA Board 10+ yrs</p>
					<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each [
							{ icon: MapPin, border: 'border-l-4 border-l-yellow-400', iconBg: 'bg-yellow-500/15', iconColor: 'text-yellow-400', title: 'Tribal Venue Hosting', body: 'Tribal lands as premier FGL event venues with built-in gaming infrastructure.' },
							{ icon: Dices, border: 'border-l-4 border-l-fli-blue-400', iconBg: 'bg-fli-blue-500/15', iconColor: 'text-fli-blue-300', title: 'Sportsbook Partnerships', body: 'Licensed sportsbook integration — event betting markets, in-play wagering.' },
							{ icon: TrendingUp, border: 'border-l-4 border-l-green-400', iconBg: 'bg-green-500/15', iconColor: 'text-green-400', title: 'Event Betting Markets', body: 'Per-hole, per-round, and championship-level betting lines from tournament open.' },
							{ icon: Star, border: 'border-l-4 border-l-purple-400', iconBg: 'bg-purple-500/15', iconColor: 'text-purple-300', title: 'Digital Fantasy Packs', body: 'Player digital assets, fantasy unlockables, skill-based prize contests.' },
							{ icon: Trophy, border: 'border-l-4 border-l-brand-500', iconBg: 'bg-brand-600/15', iconColor: 'text-brand-400', title: 'Regional Expansion', body: 'Tribal partnerships enable state-by-state regulatory gaming pathway.' }
						] as item}
							<div class="rounded-lg bg-navy-800/50 border border-white/10 {item.border} p-4 flex flex-col gap-3">
								<div class="h-9 w-9 rounded-lg {item.iconBg} flex items-center justify-center">
									<svelte:component this={item.icon} class="h-5 w-5 {item.iconColor}" />
								</div>
								<div>
									<div class="text-sm font-bold text-white">{item.title}</div>
									<p class="text-xs text-white/55 leading-relaxed mt-1">{item.body}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<p class="text-xs text-white/60 leading-relaxed border-t border-white/10 pt-4">
					Picture images for illustrative purposes only. Past performance is not indicative of future results. An investment in the Company's securities is speculative, illiquid and there may be a total risk of loss. There is no guarantee that any specific outcome will be achieved.
				</p>
			</div>
			<!-- Broadcast Scale -->
			<div id="broadcast" class="rounded-xl border border-white/15 bg-navy-700/50 p-6 space-y-6">
				<div>
					<h2 class="text-lg font-bold text-white">Built for Broadcast Scale</h2>
					<p class="text-xs text-white/40 uppercase tracking-widest mt-1">Five proprietary systems — integrated, owned, and activated at Season 1 launch</p>
					<p class="text-sm text-white/60 mt-2">No disc golf organization has assembled this stack.</p>
				</div>

				<div class="space-y-3">
					<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{#each [
						{
							icon: Gamepad2,
							status: 'BUILT',
							statusColor: 'bg-green-500/20 text-green-400 border-green-500/60',
							border: 'border-l-4 border-l-green-500',
							iconColor: 'text-green-400',
							iconBg: 'bg-green-500/15',
							title: 'Fantasy App & Website',
							sub: '1st in Disc Golf History',
							body: 'League-backed fantasy platform with draft leagues, digital player packs, skill-based contests, and live scoring. Zero integration delay — fully activates at Season 1 launch.'
						},
						{
							icon: Radio,
							status: 'LIVE',
							statusColor: 'bg-fli-blue-600/20 text-fli-blue-300 border-fli-blue-500/60',
							border: 'border-l-4 border-l-fli-blue-400',
							iconColor: 'text-fli-blue-300',
							iconBg: 'bg-fli-blue-500/15',
							title: 'Disc Tracking Live Overlay',
							sub: 'Live On-Screen Tracking',
							body: 'Real-time disc flight path tracking delivered as a live broadcast overlay. A first for live disc golf broadcast — no other tour delivers this live.'
						},
						{
							icon: Video,
							status: 'SECURED',
							statusColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/60',
							border: 'border-l-4 border-l-yellow-400',
							iconColor: 'text-yellow-400',
							iconBg: 'bg-yellow-500/15',
							title: 'Streaming Production',
							sub: '13× Emmy-Winning Team',
							body: 'Stadium-engineered broadcast with multi-camera rigs, controlled lighting, and GK Productions. Built for global distribution from the first event.'
						},
						{
							icon: Cloud,
							status: 'SCALABLE',
							statusColor: 'bg-purple-500/20 text-purple-300 border-purple-500/60',
							border: 'border-l-4 border-l-purple-400',
							iconColor: 'text-purple-300',
							iconBg: 'bg-purple-500/15',
							title: 'Cloud Storage & Distribution',
							sub: 'Global Infrastructure',
							body: 'Scalable cloud architecture for live event delivery, VOD, and cross-platform fan access. Designed for multi-city franchise expansion from Day 1.'
						},
						{
							icon: Archive,
							status: 'ACTIVE',
							statusColor: 'bg-brand-600/20 text-brand-400 border-brand-500/60',
							border: 'border-l-4 border-l-brand-500',
							iconColor: 'text-brand-400',
							iconBg: 'bg-brand-600/15',
							title: 'Media Asset Management',
							sub: 'Monetizable Content Library',
							body: 'Centralized MAM system for tagging, archiving, and licensing all league footage — sponsorship reels, highlight clips, and broadcast rights. Every moment is a monetizable asset.'
						}
					] as item}
						<div class="rounded-lg bg-navy-800/50 border border-white/10 {item.border} p-4 flex flex-col gap-3">
							<div class="flex items-center justify-between">
								<div class="h-9 w-9 rounded-lg {item.iconBg} flex items-center justify-center">
									<svelte:component this={item.icon} class="h-5 w-5 {item.iconColor}" />
								</div>
								<span class="rounded-full border px-2 py-0.5 text-xs font-bold {item.statusColor}">{item.status}</span>
							</div>
							<div>
								<div class="text-sm font-bold text-white">{item.title}</div>
								<div class="text-xs text-white/40 uppercase tracking-wide mt-0.5">{item.sub}</div>
							</div>
							<p class="text-xs text-white/55 leading-relaxed">{item.body}</p>
						</div>
					{/each}
				</div>
				</div>

				<p class="text-xs text-white/60 leading-relaxed border-t border-white/10 pt-4">
					Picture images for illustrative purposes only. Past performance is not indicative of future results. An investment in the Company's securities is speculative, illiquid and there may be a total risk of loss. There is no guarantee that any specific outcome will be achieved.
				</p>
			</div>
		</div>
	{/if}

	<div class="pt-4">
		<a href="/dashboard/documents" class="text-sm text-brand-600 hover:text-yellow-400 transition-colors">
			View supporting documents →
		</a>
	</div>
</div>
