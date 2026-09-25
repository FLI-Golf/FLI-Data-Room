<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import AdminDeckImageSlot from '$lib/components/AdminDeckImageSlot.svelte';
	import {
		Building2, Cpu, Globe2, Sparkles, DollarSign,
		TrendingUp, Users2, HandCoins, Mail, Bot, ClipboardList, Megaphone, Video, Wrench,
		Quote, Lock, ShieldCheck
	} from 'lucide-svelte';

	export let data: PageData;

	$: isAdmin = data.user?.role === 'admin';

	type DeckMedia = { id: string; name: string; file: string; alt?: string; collectionId: string };

	const mediaByName = new Map(
		((data.media ?? []) as DeckMedia[]).map((m) => [m.name.trim().toLowerCase(), m])
	);

	function mediaUrl(name: string): string | null {
		const match = mediaByName.get(name.toLowerCase());
		if (!match) return null;
		return `${data.pbUrl}/api/files/${match.collectionId}/${match.id}/${match.file}`;
	}

	function mediaAlt(name: string, fallback: string): string {
		const match = mediaByName.get(name.toLowerCase());
		return match?.alt?.trim() || fallback;
	}

	// Figures sourced from the September 2026 FG Sports Technologies investor deck.
	const projections = [
		{ year: '2027', leagues: 2,   users: 12,   revenue: 0.795,  costOfRevenue: 0.28,  opex: 1.0,  ebitda: -0.485, margin: -61 },
		{ year: '2028', leagues: 10,  users: 60,   revenue: 3.75,   costOfRevenue: 1.2,   opex: 2.0,  ebitda: 0.55,   margin: 15 },
		{ year: '2029', leagues: 30,  users: 180,  revenue: 10.825, costOfRevenue: 3.0,   opex: 4.5,  ebitda: 3.325,  margin: 31 },
		{ year: '2030', leagues: 60,  users: 360,  revenue: 22.15,  costOfRevenue: 5.8,   opex: 8.5,  ebitda: 7.85,   margin: 35 },
		{ year: '2031', leagues: 200, users: 1200, revenue: 66.9,   costOfRevenue: 8.9,   opex: 13.8, ebitda: 44.2,   margin: 66 }
	];

	let canvas: HTMLCanvasElement;
	let chart: import('chart.js').Chart | null = null;

	async function buildChart() {
		if (!canvas) return;
		const { Chart, BarElement, LinearScale, CategoryScale, Tooltip, Legend, BarController } = await import('chart.js');
		Chart.register(BarElement, LinearScale, CategoryScale, Tooltip, Legend, BarController);

		if (chart) chart.destroy();

		chart = new Chart(canvas, {
			type: 'bar',
			data: {
				labels: projections.map((r) => r.year),
				datasets: [
					{
						label: 'Total Revenue ($M)',
						data: projections.map((r) => r.revenue),
						backgroundColor: 'rgba(18,58,45,0.85)',
						borderRadius: 4,
						order: 2
					},
					{
						label: 'EBITDA ($M)',
						data: projections.map((r) => r.ebitda),
						backgroundColor: projections.map((r) => (r.ebitda < 0 ? 'rgba(224,178,60,0.55)' : 'rgba(46,196,182,0.85)')),
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
					legend: { labels: { color: '#12241d', font: { size: 12 } } },
					tooltip: { callbacks: { label: (ctx) => ` ${ctx.dataset.label}: $${(ctx.parsed.y ?? 0).toFixed(2)}M` } }
				},
				scales: {
					x: { ticks: { color: '#12241d99' }, grid: { display: false } },
					y: { ticks: { color: '#12241d99' }, grid: { color: '#12241d14' } }
				}
			}
		});
	}

	onMount(() => { buildChart(); });

	const aiFeatures = [
		{ icon: Bot,           title: 'Auto Draft Generator',      body: 'Builds a recommended fantasy roster from scoring rules, player availability, recent performance and user preferences.' },
		{ icon: ClipboardList, title: 'Lineup & Player Insights',  body: 'Explains matchups, trends, roster alternatives and projected outcomes without changing certified results.' },
		{ icon: Megaphone,     title: 'Sponsor Matching',          body: 'Ranks available inventory against brand goals, audience fit, geography and budget for human approval.' },
		{ icon: Video,         title: 'Media Intelligence',        body: 'Tags footage, identifies players and events, drafts metadata and improves archive search and licensing.' },
		{ icon: Wrench,        title: 'Operations & Support',      body: 'Summarizes performance, flags anomalies, routes support issues and drafts recurring league reports.' },
		{ icon: Sparkles,      title: 'AI Production',             body: 'Supports automated graphics, multilingual content, highlight discovery and broadcast data overlays.' }
	];

	const financing = [
		{ amount: '$150K', label: 'CTG Final Production',    body: 'Final production, integrations, testing and launch preparation.' },
		{ amount: '$275K', label: 'Product & Platform Team', body: 'Engineering, product administration and operating support.' },
		{ amount: '$150K', label: 'Security & Compliance',   body: 'Security controls, privacy, testing and compliance readiness.' },
		{ amount: '$250K', label: 'Market Entry',            body: 'Enterprise sales, user acquisition, PR and partner activation.' },
		{ amount: '$75K',  label: 'Cloud & Software',        body: 'Hosting, software access, monitoring and data services.' },
		{ amount: '$100K', label: 'Working Capital',         body: 'Operating flexibility through launch and early growth.' }
	];
</script>

<svelte:head>
	<title>FG Sports Technologies — Investor Presentation</title>
</svelte:head>

<!-- Scoped light "investor deck" theme — does not affect the rest of the Data Room -->
<div class="-m-8 min-h-screen bg-fg-cream text-fg-ink">
	<!-- Context bar: this section intentionally uses a distinct brand/theme -->
	<div class="max-w-5xl mx-auto px-6 pt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-fg-ink/50">
		<a href="/dashboard" class="hover:text-fg-ink/80 transition-colors">← Back to FLI Golf League Data Room</a>
		<span>A connected but distinct investment: FG Sports Technologies</span>
	</div>

	<div class="max-w-5xl mx-auto px-6 pb-14 pt-8 space-y-24">

		<!-- Hero -->
		<section id="overview" class="rounded-3xl border border-fg-ink/25 bg-fg-cream3 p-8 md:p-10 space-y-6">
			<span class="inline-flex items-center gap-2 rounded-full bg-fg-green-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-fg-green-800">
				<Lock class="h-3.5 w-3.5" /> Confidential Investor Presentation · September 2026
			</span>
			<div class="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
				<div class="space-y-6">
					<h1 class="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight text-fg-green-900">
						The technology company powering FGL and the next generation of sports leagues
					</h1>
					<p class="max-w-2xl text-lg text-fg-ink/70 leading-relaxed">
						<strong>FLIHub</strong> + <strong>FGF Fantasy App</strong> — one investment advances the operating
						system, fantasy platform, AI capabilities and licensable infrastructure for sports leagues.
					</p>
				</div>
				<AdminDeckImageSlot
					src={mediaUrl('fg-cover-hero-image')}
					alt={mediaAlt('fg-cover-hero-image', 'FG Sports Technologies cover hero image')}
					name="fg-cover-hero-image"
					{isAdmin}
					label="FG Sports Technologies cover hero image"
					prompt="Cinematic night shot of a futuristic disc golf stadium, glowing holographic player analytics screens in the background, an athlete mid-throw in dark gear with neon-green accents, 'FLI GOLF LEAGUE' signage lit up, teal and gold stadium lighting, ultra-realistic, dramatic wide-angle, 8k."
					containerClass="rounded-2xl border border-fg-ink/10 bg-white/60 p-3"
					imageClass="w-full max-h-[360px] object-cover rounded-xl"
					placeholderClass="h-72"
				/>
			</div>
		</section>

		<!-- Company structure -->
		<section id="structure" class="rounded-3xl border border-fg-ink/25 bg-fg-cream3 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<Building2 class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Company Structure</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">FG Sports Technologies holds the connected technology portfolio</h3>
			<div class="rounded-2xl border border-fg-ink/10 bg-white/60 p-8 space-y-6">
				<div class="text-center text-sm font-bold uppercase tracking-widest text-fg-ink/60">FG Sports and Media Group</div>
				<div class="mx-auto max-w-md rounded-xl border-2 border-fg-mint bg-fg-mint/15 py-3 text-center text-lg font-black text-fg-green-800">
					FG Sports Technologies
				</div>
				<div class="grid md:grid-cols-2 gap-4">
					<div class="rounded-xl border border-fg-cyan/40 bg-white p-5">
						<div class="font-bold text-fg-cyan">FLIHub</div>
						<p class="mt-1 text-sm text-fg-ink/70">League operations, identity, data, media, payments, sponsors and licensing</p>
					</div>
					<div class="rounded-xl border border-fg-gold/40 bg-white p-5">
						<div class="font-bold text-fg-gold">FGF Fantasy App</div>
						<p class="mt-1 text-sm text-fg-ink/70">Free leagues, prize leagues, AI drafting, live scoring, prizes and fan engagement</p>
					</div>
				</div>
				<p class="text-center text-sm font-semibold text-fg-ink/70">
					FG Sports Technologies develops, operates and commercializes both platforms through documented
					technology, data and operating agreements.
				</p>
			</div>
		</section>

		<!-- Connected platform -->
		<section class="rounded-3xl border border-fg-green-800 bg-fg-green-900 text-fg-cream p-8 md:p-10 space-y-6">
			<div class="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
				<div class="space-y-6">
					<h3 class="text-3xl font-black leading-tight">One system runs the sport.<br />The other turns every event into a fan competition.</h3>
					<div class="grid md:grid-cols-2 gap-6">
						<div class="border-t-2 border-fg-cyan pt-3">
							<div class="font-bold text-fg-cyan">FLIHub</div>
							<p class="mt-1 text-sm text-fg-cream/80">Controls league workflows, player profiles, transactions, media rights, sponsor inventory and business intelligence.</p>
						</div>
						<div class="border-t-2 border-fg-gold pt-3">
							<div class="font-bold text-fg-gold">FGF Fantasy App</div>
							<p class="mt-1 text-sm text-fg-cream/80">Converts official FGL data into leagues, roster decisions, live standings, prizes, content traffic and sponsor activation.</p>
						</div>
					</div>
					<p class="text-sm font-semibold text-fg-mint">
						Every tournament creates more structured data, more fan behavior and more commercial inventory across both products.
					</p>
				</div>
				<AdminDeckImageSlot
					src={mediaUrl('fg-connected-platform-stadium-image')}
					alt={mediaAlt('fg-connected-platform-stadium-image', 'Connected platform stadium visual')}
					name="fg-connected-platform-stadium-image"
					{isAdmin}
					label="Connected platform stadium image"
					prompt="Aerial night view of a connected sports technology ecosystem — a glowing stadium linked by holographic data trails to a city skyline and green fields, broadcast production trucks nearby, teal and gold light trails, cinematic sci-fi realism, wide aspect ratio."
					containerClass="rounded-xl border border-white/15 bg-fg-green-800/50 p-3"
					imageClass="w-full max-h-[320px] object-cover rounded-lg"
					placeholderClass="h-64"
				/>
			</div>
		</section>

		<!-- Platforms -->
		<section id="platforms" class="rounded-3xl border border-fg-mint/60 bg-fg-mint/35 p-8 md:p-10 space-y-8">
			<div class="flex items-center gap-2 text-fg-green-800">
				<Cpu class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">The Connected Platform</h2>
			</div>

			<div class="space-y-4">
				<h3 class="text-2xl font-black text-fg-green-900">FLIHub manages the full sports business</h3>
				<p class="text-sm text-fg-ink/60">The system of record and transaction layer for FGL, then a configurable operating platform for other leagues.</p>
				<div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
					<div class="rounded-xl border-t-2 border-fg-green-600 bg-white/60 p-4">
						<div class="font-bold text-fg-ink">League Operations</div>
						<p class="mt-1 text-xs text-fg-ink/60">Schedules, registration, scoring, standings, staff and finance</p>
					</div>
					<div class="rounded-xl border-t-2 border-fg-cyan bg-white/60 p-4">
						<div class="font-bold text-fg-ink">Player Identity</div>
						<p class="mt-1 text-xs text-fg-ink/60">Profiles, statistics, subscriptions, permissions and opportunity history</p>
					</div>
					<div class="rounded-xl border-t-2 border-fg-gold bg-white/60 p-4">
						<div class="font-bold text-fg-ink">Commercial System</div>
						<p class="mt-1 text-xs text-fg-ink/60">Sponsor inventory, live auction house, campaigns, payments and attribution</p>
					</div>
					<div class="rounded-xl border-t-2 border-fg-ink bg-white/60 p-4">
						<div class="font-bold text-fg-ink">Media & Data</div>
						<p class="mt-1 text-xs text-fg-ink/60">Content archive, rights, licensing, analytics and audience intelligence</p>
					</div>
				</div>
				<div class="rounded-xl border border-fg-ink/10 bg-white/60 p-5">
					<div class="text-xs font-bold uppercase tracking-widest text-fg-green-800">Licenseable Infrastructure</div>
					<p class="mt-1 text-sm text-fg-ink/70">Disc golf, youth programs, facilities and emerging leagues can use the same identity, competition, media, commerce and administration foundation.</p>
					<p class="mt-3 text-xs text-fg-ink/50">
						<span class="font-bold uppercase tracking-widest text-fg-ink/70">Revenue options</span>
						— Subscriptions · organization fees · SaaS licensing · payments · auctions · media · analytics
					</p>
				</div>
			</div>

			<div class="space-y-4">
				<h3 class="text-2xl font-black text-fg-green-900">FGF makes every FGL tournament playable</h3>
				<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div class="rounded-xl bg-white/60 border border-fg-ink/10 p-4 text-center">
						<div class="text-3xl font-black text-fg-gold">$300</div>
						<div class="text-xs text-fg-ink/50 mt-1">Per prize league season</div>
					</div>
					<div class="rounded-xl bg-white/60 border border-fg-ink/10 p-4 text-center">
						<div class="text-3xl font-black text-fg-green-700">6</div>
						<div class="text-xs text-fg-ink/50 mt-1">Managers in each league</div>
					</div>
					<div class="rounded-xl bg-white/60 border border-fg-ink/10 p-4 text-center">
						<div class="text-3xl font-black text-fg-green-700">6</div>
						<div class="text-xs text-fg-ink/50 mt-1">FGL tournaments</div>
					</div>
					<div class="rounded-xl bg-white/60 border border-fg-ink/10 p-4 text-center">
						<div class="text-3xl font-black text-fg-teal">18</div>
						<div class="text-xs text-fg-ink/50 mt-1">Prize placements</div>
					</div>
				</div>
				<div class="grid md:grid-cols-2 gap-4">
					<div class="rounded-xl border-t-2 border-fg-cyan bg-white/60 p-5">
						<div class="font-bold text-fg-cyan">Free Leagues</div>
						<p class="mt-1 text-sm text-fg-ink/70">Low-friction acquisition, commissioner-led invitations, social competition and season-long retention.</p>
					</div>
					<div class="rounded-xl border-t-2 border-fg-gold bg-white/60 p-5">
						<div class="font-bold text-fg-gold">Prize Leagues</div>
						<p class="mt-1 text-sm text-fg-ink/70">Three merchandise winners at each tournament. FGL items may include discs, apparel and jerseys.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Market opportunity -->
		<section id="market" class="rounded-3xl border border-fg-teal/60 bg-fg-teal/35 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<Globe2 class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Global Market Opportunity</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">A global fantasy audience supports $60 million in 2031 revenue</h3>
			<p class="text-sm text-fg-ink/60">FGF reaches the target with 200,000 paid leagues and 1.2 million paid users.</p>
			<div class="rounded-2xl border border-fg-ink/10 bg-white/60 p-8 grid md:grid-cols-3 gap-8 items-center">
				<AdminDeckImageSlot
					src={mediaUrl('fg-market-globe-image')}
					alt={mediaAlt('fg-market-globe-image', 'Global fantasy market opportunity graphic')}
					name="fg-market-globe-image"
					{isAdmin}
					label="Global market opportunity graphic"
					prompt="Photorealistic glowing green-and-teal digital globe with glowing city nodes and connection lines representing a global fantasy sports network, floating user avatar icons around the globe, dark background with soft bloom lighting, high-end investor-deck style."
					containerClass="rounded-xl border border-fg-ink/10 bg-fg-cream2 p-3"
					imageClass="w-full max-h-[280px] object-cover rounded-lg"
					placeholderClass="h-56"
				/>
				<div>
					<div class="text-5xl font-black text-fg-teal">245M+</div>
					<div class="text-xs font-bold uppercase tracking-widest text-fg-teal mt-1">Estimated fantasy users worldwide</div>
					<p class="mt-3 text-sm text-fg-ink/70">FGF targets a fraction of a global category already familiar with fantasy competition.</p>
				</div>
				<div class="space-y-2 text-sm">
					<div class="flex justify-between border-b border-fg-ink/10 pb-2"><span class="font-black text-fg-green-700 text-xl">200,000</span><span class="text-fg-ink/60 self-center">paid leagues</span></div>
					<div class="flex justify-between border-b border-fg-ink/10 pb-2"><span class="font-black text-fg-cyan text-xl">6</span><span class="text-fg-ink/60 self-center">paid managers in each league</span></div>
					<div class="flex justify-between pb-2"><span class="font-black text-fg-gold text-xl">1,200,000</span><span class="text-fg-ink/60 self-center">paid users</span></div>
					<p class="text-xs text-fg-ink/50">1.2 million paid users represent approximately 0.49% of the estimated global fantasy audience.</p>
				</div>
			</div>
			<div class="rounded-xl bg-fg-gold/25 border border-fg-gold/50 p-5 flex flex-wrap items-center gap-3 justify-between">
				<span class="font-semibold text-fg-ink">200,000 paid leagues × $300 annual fee</span>
				<span class="text-2xl font-black text-fg-green-900">= $60,000,000</span>
				<span class="text-xs font-bold uppercase tracking-widest text-fg-ink/50">2031 Revenue</span>
			</div>
		</section>

		<!-- Embedded AI -->
		<section id="ai" class="rounded-3xl border border-fg-cyan/60 bg-fg-cyan/35 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<Sparkles class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Embedded Intelligence</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">AI improves decisions across both products</h3>
			<p class="text-sm text-fg-ink/60">
				AI features sit inside defined workflows and operate against permissioned FGL data. Human review remains
				required for official results, eligibility, prizes and commercial commitments.
			</p>
			<div class="grid md:grid-cols-2 gap-4">
				{#each aiFeatures as f}
					<div class="rounded-xl border-t-2 border-fg-teal bg-white/60 p-5 flex gap-3">
						<svelte:component this={f.icon} class="h-5 w-5 text-fg-teal shrink-0 mt-0.5" />
						<div>
							<div class="font-bold text-fg-ink">{f.title}</div>
							<p class="mt-1 text-sm text-fg-ink/70">{f.body}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Revenue model -->
		<section id="revenue" class="rounded-3xl border border-fg-ink/25 bg-fg-cream3 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<HandCoins class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Commercial Model</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">The combined stack supports recurring and transactional revenue</h3>
			<div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
				<div class="rounded-xl border-t-2 border-fg-green-600 bg-white/60 p-4">
					<div class="font-bold text-fg-ink">Platform</div>
					<ul class="mt-2 text-sm text-fg-ink/70 space-y-1">
						<li>Player subscriptions</li><li>Organization fees</li><li>Enterprise licenses</li>
					</ul>
				</div>
				<div class="rounded-xl border-t-2 border-fg-cyan bg-white/60 p-4">
					<div class="font-bold text-fg-ink">Fantasy</div>
					<ul class="mt-2 text-sm text-fg-ink/70 space-y-1">
						<li>$300 prize leagues</li><li>Premium features</li><li>Sponsored contests</li>
					</ul>
				</div>
				<div class="rounded-xl border-t-2 border-fg-gold bg-white/60 p-4">
					<div class="font-bold text-fg-ink">Marketplace</div>
					<ul class="mt-2 text-sm text-fg-ink/70 space-y-1">
						<li>Auction commissions</li><li>Payment economics</li><li>Products and facilities</li>
					</ul>
				</div>
				<div class="rounded-xl border-t-2 border-fg-ink bg-white/60 p-4">
					<div class="font-bold text-fg-ink">Media & Data</div>
					<ul class="mt-2 text-sm text-fg-ink/70 space-y-1">
						<li>Advertising inventory</li><li>Media licensing</li><li>Analytics products</li>
					</ul>
				</div>
			</div>
			<div class="rounded-xl border border-fg-mint/50 bg-fg-mint/15 p-5">
				<div class="text-xs font-bold uppercase tracking-widest text-fg-green-800">The FGL Advantage</div>
				<p class="mt-1 text-sm font-semibold text-fg-ink/80">
					FGL supplies the official competition, players, stories and first-party distribution that can seed both
					products. FG Sports Technologies can then license the proven technology to additional sports organizations.
				</p>
			</div>
		</section>

		<!-- Financial projections -->
		<section id="projections" class="rounded-3xl border border-fg-mint/60 bg-fg-mint/35 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<TrendingUp class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Five-Year Financial Projection</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">The 2031 plan produces $66,900,000 in total revenue</h3>
			<p class="text-sm text-fg-ink/60">Management base case for FG Sports Technologies, 2027–2031</p>

			<div class="rounded-xl bg-fg-green-900 text-fg-cream p-6 flex flex-wrap gap-8">
				<div><div class="text-2xl font-black text-fg-gold">$60,000,000</div><div class="text-xs uppercase tracking-widest text-fg-cream/60">FGF League Fees</div></div>
				<div><div class="text-2xl font-black text-fg-mint">$66,900,000</div><div class="text-xs uppercase tracking-widest text-fg-cream/60">Total Revenue</div></div>
				<div><div class="text-2xl font-black text-fg-cyan">$44,200,000</div><div class="text-xs uppercase tracking-widest text-fg-cream/60">EBITDA · 66%</div></div>
			</div>

			<div class="rounded-2xl border border-fg-ink/10 bg-white/60 p-6">
				<canvas bind:this={canvas} height="90"></canvas>
			</div>

			<div class="overflow-x-auto rounded-2xl border border-fg-ink/10 bg-white/60">
				<table class="w-full text-sm">
					<thead>
						<tr class="bg-fg-green-900 text-fg-cream">
							<th class="text-left font-semibold px-4 py-2">Projected Results</th>
							{#each projections as row}<th class="text-right font-semibold px-4 py-2">{row.year}</th>{/each}
						</tr>
					</thead>
					<tbody class="divide-y divide-fg-ink/10">
						<tr><td class="px-4 py-2 text-fg-ink/60">Paid leagues (000s)</td>{#each projections as row}<td class="px-4 py-2 text-right">{row.leagues}</td>{/each}</tr>
						<tr><td class="px-4 py-2 text-fg-ink/60">Paid users (000s)</td>{#each projections as row}<td class="px-4 py-2 text-right">{row.users}</td>{/each}</tr>
						<tr class="font-bold bg-fg-cream2"><td class="px-4 py-2">Total Revenue</td>{#each projections as row}<td class="px-4 py-2 text-right">${(row.revenue * 1_000_000).toLocaleString()}</td>{/each}</tr>
						<tr><td class="px-4 py-2 text-fg-ink/60">Cost of revenue</td>{#each projections as row}<td class="px-4 py-2 text-right text-fg-ink/60">(${(row.costOfRevenue * 1_000_000).toLocaleString()})</td>{/each}</tr>
						<tr class="font-bold bg-fg-cream2"><td class="px-4 py-2">Total Operating Expenses</td>{#each projections as row}<td class="px-4 py-2 text-right">(${(row.opex * 1_000_000).toLocaleString()})</td>{/each}</tr>
						<tr class="font-bold bg-fg-gold/25"><td class="px-4 py-2">EBITDA / Margin</td>{#each projections as row}<td class="px-4 py-2 text-right">${(row.ebitda * 1_000_000).toLocaleString()} / {row.margin}%</td>{/each}</tr>
					</tbody>
				</table>
			</div>

			<div class="grid md:grid-cols-3 gap-4 text-sm">
				<div class="rounded-xl border-t-2 border-fg-green-600 bg-white/60 p-4">
					<div class="font-bold text-fg-ink">Total Revenue</div>
					<p class="mt-1 text-fg-ink/70">FGF paid league fees, FLIHub and FGF enterprise licenses, marketplace activity, advertising, media and data.</p>
				</div>
				<div class="rounded-xl border-t-2 border-fg-cyan bg-white/60 p-4">
					<div class="font-bold text-fg-ink">Cost of Revenue</div>
					<p class="mt-1 text-fg-ink/70">Prizes, merchandise fulfillment, payment processing and variable platform delivery costs.</p>
				</div>
				<div class="rounded-xl border-t-2 border-fg-gold bg-white/60 p-4">
					<div class="font-bold text-fg-ink">Operating Expenses</div>
					<p class="mt-1 text-fg-ink/70">Product development, cloud infrastructure, security, compliance, sales, support, legal and administration.</p>
				</div>
			</div>
		</section>

		<!-- Development partner -->
		<section id="partner" class="rounded-3xl border border-fg-gold/60 bg-fg-gold/35 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<Users2 class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Development Partner</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">Coghlan Technology Group brings enterprise and gaming experience</h3>
			<div class="rounded-2xl border border-fg-ink/10 bg-white/60 p-8 grid md:grid-cols-[auto_1fr_1fr] gap-8">
				<AdminDeckImageSlot
					src={mediaUrl('fg-partner-headshot')}
					alt={mediaAlt('fg-partner-headshot', 'Kevin Coghlan headshot')}
					name="fg-partner-headshot"
					tag="team"
					{isAdmin}
					label="Kevin Coghlan headshot"
					prompt="Professional corporate headshot of a confident male tech executive in his 40s-50s, dark blazer, neutral studio background, natural lighting, high-resolution, investor-deck quality."
					containerClass="rounded-xl border border-fg-ink/10 bg-fg-cream2 p-2 w-32"
					imageClass="w-28 h-28 object-cover rounded-lg"
					placeholderClass="h-28 w-28"
				/>
				<div>
					<div class="font-bold text-fg-ink">Kevin Coghlan</div>
					<div class="text-xs text-fg-ink/50">Chief Executive Officer</div>
					<blockquote class="mt-3 flex gap-2 text-lg font-black text-fg-green-900 leading-snug">
						<Quote class="h-5 w-5 shrink-0 text-fg-mint" />
						"Modern sports leagues must combine live events, digital engagement, gaming opportunities, AI
						systems, and scalable technology infrastructure into one unified ecosystem."
					</blockquote>
				</div>
				<div>
					<div class="text-xs font-bold uppercase tracking-widest text-fg-teal">CTG Capabilities</div>
					<ul class="mt-2 space-y-1 text-sm font-semibold text-fg-ink/80">
						<li>AI analytics and visualization systems</li>
						<li>Enterprise operational platforms</li>
						<li>Gaming and regulatory systems</li>
						<li>Real-time data infrastructure</li>
						<li>Mobile apps and fan technology</li>
					</ul>
				</div>
			</div>
			<div class="rounded-xl border border-fg-ink/10 bg-white/60 p-5">
				<div class="text-xs font-bold uppercase tracking-widest text-fg-green-800 mb-3">Notable Project Experience</div>
				<div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-sm">
					<div><div class="font-bold text-fg-green-700">LucasArts</div><div class="text-fg-ink/60 text-xs mt-1">Star Wars and Indiana Jones</div></div>
					<div><div class="font-bold text-fg-cyan">General Motors</div><div class="text-fg-ink/60 text-xs mt-1">Technology initiatives</div></div>
					<div><div class="font-bold text-fg-gold">Pearson</div><div class="text-fg-ink/60 text-xs mt-1">Enterprise education systems</div></div>
					<div><div class="font-bold text-fg-ink">Gaming</div><div class="text-fg-ink/60 text-xs mt-1">Commission environments</div></div>
					<div><div class="font-bold text-fg-teal">AI Systems</div><div class="text-fg-ink/60 text-xs mt-1">Large-scale dashboards</div></div>
				</div>
			</div>
			<p class="text-xs text-fg-ink/50">
				The $150,000 allocation covers final production of FLIHub and FGF under the proposed engagement scope.
				Final claims and deliverables remain subject to CTG confirmation and executed contracts.
			</p>
		</section>

		<!-- Financing request -->
		<section id="financing" class="rounded-3xl border border-fg-ink/25 bg-fg-cream3 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<DollarSign class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Financing Request</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">$1 million completes production and funds a secure commercial launch</h3>
			<p class="text-sm text-fg-ink/60">The expanded financing supports the operating capabilities required to scale both platforms.</p>

			<div class="rounded-2xl border border-fg-gold/40 bg-fg-gold/10 p-8">
				<div class="text-4xl font-black text-fg-green-900">$1,000,000</div>
				<div class="text-xs font-bold uppercase tracking-widest text-fg-ink/60 mt-1">Technology Financing</div>
			</div>

			<div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
				{#each financing as item}
					<div class="rounded-xl border-t-2 border-fg-green-600 bg-white/60 p-4">
						<div class="text-xl font-black text-fg-green-800">{item.amount}</div>
						<div class="text-xs font-bold uppercase tracking-widest text-fg-ink/60 mt-1">{item.label}</div>
						<p class="mt-2 text-sm text-fg-ink/70">{item.body}</p>
					</div>
				{/each}
			</div>
			<p class="text-xs text-fg-ink/50">
				Security, privacy and platform operations become recurring expenses after launch and remain included in
				the five-year projections.
			</p>
		</section>

		<!-- Contact -->
		<section id="contact" class="rounded-3xl border border-fg-teal/60 bg-fg-teal/35 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<Mail class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Investor Contact</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">Reopen the FGL conversation through the technology opportunity</h3>
			<p class="text-fg-teal font-semibold">
				Two connected products. Embedded AI. Recurring and transactional revenue. A licensing path that extends beyond FGL.
			</p>
			<div class="rounded-2xl border border-fg-mint/40 bg-fg-mint/10 p-6 grid sm:grid-cols-[1fr_1fr_auto] gap-6 items-center">
				<div>
					<div class="font-bold text-fg-ink">Gary Hearl</div>
					<div class="text-xs text-fg-ink/50">Sports and Health · Young America Capital</div>
					<div class="mt-2 text-sm text-fg-ink/80">ghearl@yacapital.com</div>
					<div class="text-sm text-fg-ink/80">276.964.1612 mobile</div>
				</div>
				<div>
					<div class="font-bold text-fg-ink">Robert DeGowin</div>
					<div class="text-xs text-fg-ink/50">Sports and Health · Young America Capital</div>
					<div class="mt-2 text-sm text-fg-ink/80">rdegowin@yacapital.com</div>
					<div class="text-sm text-fg-ink/80">619.795.6182 mobile</div>
				</div>
				<AdminDeckImageSlot
					src={mediaUrl('fg-yac-logo')}
					alt={mediaAlt('fg-yac-logo', 'Young America Capital logo')}
					name="fg-yac-logo"
					tag="logo"
					{isAdmin}
					label="YAC logo"
					prompt="Clean vector-style logo mark for 'Young America Capital' — two overlapping circular shapes forming an abstract handshake/infinity symbol in navy blue, minimalist financial services branding, transparent background."
					containerClass="rounded-lg border border-fg-ink/10 bg-white p-2 w-36"
					imageClass="w-32 h-auto object-contain"
					placeholderClass="h-16 w-32"
				/>
			</div>
			<p class="text-xs text-fg-ink/50">
				Young America Capital, LLC — SEC Registered Broker Dealer, Member FINRA, SIPC, MSRB.
				141 East Boston Post Road, Mamaroneck, New York 10543.
			</p>
		</section>

		<!-- Legal footer -->
		<footer class="border-t border-fg-ink/10 pt-6 space-y-2 text-xs text-fg-ink/50 leading-relaxed">
			<div class="flex items-center gap-2 font-bold uppercase tracking-widest text-fg-ink/60">
				<ShieldCheck class="h-4 w-4" /> Confidentiality &amp; Offering Notice
			</div>
			<p>
				This presentation contains sensitive business and financial information delivered on behalf of the
				Company by Young America Capital, LLC (YAC), solely to assist the recipient in deciding whether to
				proceed with further inquiry. It is not all-inclusive, does not constitute an offer to sell or a
				solicitation of an offer to buy securities where unlawful, and contains forward-looking statements
				subject to material risks and uncertainties. Private placements may be illiquid and highly speculative;
				investors may lose their entire investment. Picture images are for illustrative purposes only.
			</p>
		</footer>

	</div>
</div>
