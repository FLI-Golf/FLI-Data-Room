<script lang="ts">
	import {
		Cpu, Smartphone, MessageSquare, LayoutGrid, Bot, Video,
		TrendingUp, DollarSign, Shield, Globe, Lock, Database, ArrowRight,
		Zap, Users, Coins, Radio, CalendarClock, FileCheck, Building2,
		ServerCog, Layers, Sparkles, Megaphone, BadgeDollarSign, Rocket, Star,
		Eye, Shuffle, Camera, Activity, Package, Lightbulb, BarChart2,
		CheckCircle2, Target, Repeat2, Trophy
	} from 'lucide-svelte';

	const platforms = [
		{
			number: '01',
			label: 'Fan Engagement',
			title: 'Proprietary Fantasy App',
			subtitle: 'In partnership with Coghlan Technology Group · Final development stage',
			icon: Smartphone,
			color: 'text-brand-400',
			border: 'border-brand-500/60',
			bg: 'bg-brand-600/8',
			accent: 'bg-brand-500',
			id: 'fantasy-app',
			features: [
				{ icon: Activity,        title: 'Live Fantasy Competition', body: 'Hole-by-hole scoring, pressure-shot bonuses & real-time team performance — every tournament a continuous engagement event.' },
				{ icon: Users,           title: 'Integrated Community',     body: 'Fantasy + live chat + creator content + fan leagues — driving industry-leading session lengths.' },
				{ icon: BadgeDollarSign, title: 'Revenue Expansion',        body: 'Premium memberships · Betting integrations · Digital collectibles · Prediction systems · Gaming integrations.' },
			],
			vision: '"The Fortnite + Fantasy Sports + TopGolf ecosystem of disc golf." Stadium-building & metaverse environments, virtual league ecosystems + esports integrations, digital skins, collectibles & NFT progression.',
			valuations: [
				{ stage: 'MVP Infrastructure',       range: '$500K–$1.5M' },
				{ stage: 'Full Engagement Platform', range: '$2M–$8M' },
				{ stage: 'Multi-League Ecosystem',   range: '$10M–$50M+' },
			]
		},
		{
			number: '02',
			label: 'Audience Ownership',
			title: 'FGL Discord Community',
			subtitle: '"Most sports organizations rent their audience. FLI Golf is building infrastructure to own theirs."',
			icon: MessageSquare,
			color: 'text-fli-blue-400',
			border: 'border-fli-blue-500/60',
			bg: 'bg-fli-blue-800/10',
			accent: 'bg-fli-blue-500',
			id: 'discord',
			features: [
				{ icon: Radio, title: 'Fan Engagement Channels',  body: 'Live tournament watch parties, real-time score reactions, fantasy discussion rooms, team fan clubs, verified player/creator channels, sponsor giveaways & VIP branded experiences.' },
				{ icon: Coins, title: 'Crypto & Web3 Integration', body: 'Token-gated fan experiences, NFT collectibles, blockchain-based fan rewards, fantasy app wallet integrations, crypto sponsorship activations, and access to digital-native global audiences.' },
			],
			vision: null,
			valuations: [
				{ stage: 'Early Infrastructure',       range: '$100K–$500K' },
				{ stage: 'Fantasy + Crypto Ecosystem', range: '$500K–$2M' },
				{ stage: 'Web3 Sports Platform',       range: '$2M–$10M+' },
			]
		},
		{
			number: '03',
			label: 'League Operations',
			title: 'FLIHUB — League OS',
			subtitle: '"The Operating System Powering the Next Generation of Sports Leagues"',
			icon: LayoutGrid,
			color: 'text-yellow-400',
			border: 'border-yellow-500/60',
			bg: 'bg-yellow-500/8',
			accent: 'bg-yellow-500',
			id: 'flihub',
			features: [
				{ icon: CalendarClock, title: 'League Operations',       body: 'Scheduling · venue mgmt · staff coordination · live ops' },
				{ icon: DollarSign,    title: 'Financial Infrastructure', body: 'Budget approvals · revenue tracking · sponsorship accounting' },
				{ icon: FileCheck,     title: 'Sponsor & Partner',        body: 'Contract mgmt · activation tracking · deliverable workflows' },
				{ icon: Shield,        title: 'Governance & Compliance',  body: 'Board ops · voting · policy approvals · integrity mgmt' },
				{ icon: Building2,     title: 'Franchise Expansion',      body: 'Pipeline mgmt · owner onboarding · territory tracking' },
				{ icon: Database,      title: 'Data Centralization',      body: 'Unified operational, financial, sponsor & media data' },
			],
			vision: null,
			valuations: [
				{ stage: 'Internal Tool',         range: '$250K–$750K' },
				{ stage: 'League Infrastructure', range: '$1M–$3M' },
				{ stage: 'SaaS Platform',         range: '$5M–$15M+' },
			]
		},
		{
			number: '04',
			label: 'Competitive Integrity',
			title: 'AI Draft System',
			subtitle: "World's First AI-Generated Disc Golf Draft System",
			icon: Bot,
			color: 'text-green-400',
			border: 'border-green-500/60',
			bg: 'bg-green-500/8',
			accent: 'bg-green-500',
			id: 'ai-draft',
			features: [
				{ icon: Shuffle,      title: 'Live AI Randomization',   body: 'Teams generated live via AI randomized selection before each season — zero manual team manipulation, verifiable on-chain.' },
				{ icon: Eye,          title: 'Public Transparency',     body: 'Celebrities, athletes & sponsors press the button publicly in real-time. Full transparency broadcast creates viral fan engagement moments.' },
				{ icon: CheckCircle2, title: 'Betting-Friendly Design', body: 'Built-in integrity infrastructure positions FLI as the preferred league for regulated sports betting partnerships.' },
			],
			vision: null,
			valuations: [
				{ stage: 'Internal Integrity Tool',        range: '$250K–$750K' },
				{ stage: 'Public League Infrastructure',   range: '$1M–$5M' },
				{ stage: 'Multi-Sport Licensing Platform', range: '$5M–$25M+' },
			]
		},
		{
			number: '05',
			label: 'Broadcast Technology',
			title: 'AI Production Infrastructure',
			subtitle: 'In Partnership with Pure Mobile Productions',
			icon: Video,
			color: 'text-purple-400',
			border: 'border-purple-500/60',
			bg: 'bg-purple-500/8',
			accent: 'bg-purple-500',
			id: 'ai-production',
			features: [
				{ icon: Camera,    title: 'Autonomous Disc Tracking',  body: 'Unmanned cameras · AI-assisted shot following · automated player tracking · real-time flight-path overlays.' },
				{ icon: Sparkles,  title: 'AI Broadcast Enhancements', body: 'Real-time storyline generation · live stat comparisons · automated graphics · dynamic player insights.' },
				{ icon: Megaphone, title: 'Sponsor Integration',       body: 'AI-triggered sponsor moments · dynamic in-broadcast inventory · measurable activation data.' },
				{ icon: Rocket,    title: 'Economic Impact',           body: 'Lower long-term production costs · scalable globally · enhanced streaming potential.' },
			],
			vision: null,
			valuations: [
				{ stage: 'Advanced Broadcast Tools',      range: '$500K–$2M' },
				{ stage: 'AI Production Infrastructure',  range: '$3M–$10M' },
				{ stage: 'Licensable Broadcast Platform', range: '$10M–$50M+' },
			]
		},
	];

	const moatPoints = [
		{ icon: Lock,       color: 'text-brand-400',    title: 'Proprietary Operational Infrastructure', body: 'Custom-built workflows become embedded IP. Mission-critical systems create switching costs and defensible operational moats.' },
		{ icon: Database,   color: 'text-fli-blue-400', title: 'First-Party Data Ownership',             body: 'Fan behavior, fantasy engagement, and sponsor activation data compound in value — not rented from platforms.' },
		{ icon: Shield,     color: 'text-green-400',    title: 'Integrity-First Betting Positioning',    body: 'AI-verified draft systems and transparent operations position FLI as the preferred league for regulated sports betting partnerships.' },
		{ icon: Repeat2,    color: 'text-yellow-400',   title: 'SaaS & Licensing Revenue Channels',     body: 'FLIHUB, AI Draft, and Production tech are each independently licensable to other leagues, creating recurring B2B revenue.' },
		{ icon: TrendingUp, color: 'text-purple-400',   title: 'Scalable Without Linear Cost Growth',   body: "Technology infrastructure means franchise expansion, new markets, and additional leagues don't require proportional operational headcount." },
		{ icon: Globe,      color: 'text-brand-400',    title: 'Audience Ownership vs. Rental',         body: 'Discord + Fantasy App create owned engagement infrastructure. Zero algorithm dependency. Direct fan monetization.' },
	];

	const valueTable = [
		{ icon: Smartphone,    platform: 'Fantasy App',        stage1: '$500K–$1.5M', stage2: '$2M–$8M',   full: '$10M–$50M+', color: 'text-brand-400' },
		{ icon: MessageSquare, platform: 'Discord Community',  stage1: '$100K–$500K', stage2: '$500K–$2M', full: '$2M–$10M+',  color: 'text-fli-blue-400' },
		{ icon: LayoutGrid,    platform: 'FLIHUB League OS',   stage1: '$250K–$750K', stage2: '$1M–$3M',   full: '$5M–$15M+',  color: 'text-yellow-400' },
		{ icon: Bot,           platform: 'AI Draft System',    stage1: '$250K–$750K', stage2: '$1M–$5M',   full: '$5M–$25M+',  color: 'text-green-400' },
		{ icon: Video,         platform: 'AI Production Infra', stage1: '$500K–$2M',  stage2: '$3M–$10M',  full: '$10M–$50M+', color: 'text-purple-400' },
	];
</script>

<svelte:head>
	<title>Technology & Digital Infrastructure — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-12">

	<!-- Header -->
	<div>
		<div class="flex items-center gap-2 mb-2">
			<Cpu class="h-4 w-4 text-brand-400" />
			<div class="text-xs font-semibold text-brand-400 uppercase tracking-widest">Investor Overview · Confidential</div>
		</div>
		<h1 class="text-3xl font-black text-white">Technology & Digital Infrastructure</h1>
		<p class="mt-1 text-white/50">Building the Operating System for the Future of Sports</p>
	</div>

	<!-- Executive overview stats -->
	<div class="rounded-xl border border-brand-500/60 bg-brand-600/8 p-8">
		<div class="flex items-center gap-2 mb-1">
			<Lightbulb class="h-4 w-4 text-brand-400" />
			<div class="text-sm font-semibold text-brand-400 uppercase tracking-widest">Executive Overview</div>
		</div>
		<p class="text-lg font-bold text-white mb-6 mt-2">
			FLI Golf League is not building a traditional sports brand.<br />
			<span class="text-brand-400">We are building a vertically integrated sports technology ecosystem.</span>
		</p>
		<div class="grid grid-cols-3 gap-6 text-center">
			<div>
				<div class="flex justify-center mb-2"><Package class="h-5 w-5 text-brand-400" /></div>
				<div class="text-3xl font-black text-white">5</div>
				<div class="text-xs text-white/50 mt-1">Proprietary Tech Platforms</div>
			</div>
			<div class="border-x border-white/10">
				<div class="flex justify-center mb-2"><DollarSign class="h-5 w-5 text-brand-400" /></div>
				<div class="text-3xl font-black text-white">$100M+</div>
				<div class="text-xs text-white/50 mt-1">Combined Platform Value Potential</div>
			</div>
			<div>
				<div class="flex justify-center mb-2"><Repeat2 class="h-5 w-5 text-brand-400" /></div>
				<div class="text-3xl font-black text-white">∞</div>
				<div class="text-xs text-white/50 mt-1">SaaS Licensing Opportunity</div>
			</div>
		</div>
	</div>

	<!-- Platform pillars overview -->
	<div>
		<div class="flex items-center gap-2 mb-4">
			<Layers class="h-5 w-5 text-white/40" />
			<h2 class="text-lg font-bold text-white">Platform Pillars</h2>
		</div>
		<div class="grid sm:grid-cols-5 gap-3">
			{#each platforms as p}
				<a href="#{p.id}" class="rounded-xl border {p.border} {p.bg} p-4 text-center hover:brightness-110 transition-all group">
					<svelte:component this={p.icon} class="h-6 w-6 {p.color} mx-auto mb-2" />
					<div class="text-xs font-black text-white/80 group-hover:text-white leading-snug">{p.title}</div>
					<div class="text-xs text-white/35 mt-1">{p.label}</div>
				</a>
			{/each}
		</div>
	</div>

	<!-- Individual platform sections -->
	{#each platforms as p}
		<div id={p.id} class="rounded-xl border {p.border} {p.bg} overflow-hidden">
			<!-- Platform header -->
			<div class="px-6 pt-6 pb-4 border-b border-white/8">
				<div class="flex items-start gap-4">
					<div class="h-12 w-12 rounded-xl {p.accent}/20 border {p.border} flex items-center justify-center shrink-0">
						<svelte:component this={p.icon} class="h-6 w-6 {p.color}" />
					</div>
					<div class="flex-1 min-w-0">
						<div class="flex items-center gap-2 mb-0.5">
							<span class="text-xs font-black {p.color} uppercase tracking-widest">Platform {p.number} · {p.label}</span>
						</div>
						<h2 class="text-xl font-black text-white">{p.title}</h2>
						<p class="text-sm text-white/45 mt-0.5 italic">{p.subtitle}</p>
					</div>
				</div>
			</div>

			<div class="p-6 space-y-5">
				<!-- Features grid -->
				<div class="grid sm:grid-cols-2 gap-4">
					{#each p.features as f}
						<div class="rounded-lg border border-white/8 bg-white/3 p-4">
							<div class="flex items-center gap-2 mb-2">
								<svelte:component this={f.icon} class="h-4 w-4 {p.color} shrink-0" />
								<div class="text-sm font-bold text-white">{f.title}</div>
							</div>
							<p class="text-sm text-white/55 leading-relaxed">{f.body}</p>
						</div>
					{/each}
				</div>

				<!-- Vision quote if present -->
				{#if p.vision}
					<div class="rounded-lg border border-white/10 bg-white/3 p-4">
						<div class="flex items-center gap-2 mb-2">
							<Star class="h-4 w-4 text-white/30" />
							<div class="text-xs font-semibold text-white/30 uppercase tracking-widest">Long-Term Vision</div>
						</div>
						<p class="text-sm text-white/60 italic leading-relaxed">{p.vision}</p>
					</div>
				{/if}

				<!-- Strategic value progression -->
				<div>
					<div class="flex items-center gap-2 mb-3">
						<Target class="h-4 w-4 text-white/25" />
						<div class="text-xs font-semibold text-white/30 uppercase tracking-widest">Strategic Value Progression</div>
					</div>
					<div class="grid grid-cols-3 gap-3">
						{#each p.valuations as v, i}
							<div class="rounded-lg border border-white/8 bg-white/3 p-3 text-center relative overflow-hidden">
								<div class="absolute top-0 left-0 right-0 h-0.5 {p.accent} opacity-{i === 2 ? '100' : i === 1 ? '60' : '30'}"></div>
								<div class="text-xs text-white/35 mb-1">Stage {i + 1}</div>
								<div class="text-sm font-black {p.color}">{v.range}</div>
								<div class="text-xs text-white/45 mt-0.5 leading-snug">{v.stage}</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/each}

	<!-- Investment thesis: value table -->
	<div id="value-table">
		<div class="flex items-center gap-2 mb-2">
			<BarChart2 class="h-5 w-5 text-white/40" />
			<h2 class="text-lg font-bold text-white">The Digital Asset Stack</h2>
		</div>
		<p class="text-sm text-white/50 mb-5">Five proprietary platforms. One integrated ecosystem. Compounding defensibility.</p>
		<div class="rounded-xl border border-white/15 bg-navy-700/50 overflow-hidden">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/10">
						<th class="text-left px-5 py-3 text-xs font-semibold text-white/30 uppercase tracking-widest">Platform</th>
						<th class="text-right px-4 py-3 text-xs font-semibold text-white/30 uppercase tracking-widest">Stage 1</th>
						<th class="text-right px-4 py-3 text-xs font-semibold text-white/30 uppercase tracking-widest">Stage 2</th>
						<th class="text-right px-5 py-3 text-xs font-semibold text-white/30 uppercase tracking-widest">Full Scale</th>
					</tr>
				</thead>
				<tbody>
					{#each valueTable as row}
						<tr class="border-b border-white/6 hover:bg-white/3 transition-colors">
							<td class="px-5 py-3">
								<div class="flex items-center gap-2">
									<svelte:component this={row.icon} class="h-4 w-4 {row.color} shrink-0" />
									<span class="font-semibold {row.color}">{row.platform}</span>
								</div>
							</td>
							<td class="px-4 py-3 text-right text-white/60">{row.stage1}</td>
							<td class="px-4 py-3 text-right text-white/60">{row.stage2}</td>
							<td class="px-5 py-3 text-right font-bold text-white">{row.full}</td>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr class="bg-white/3">
						<td class="px-5 py-4 text-sm font-black text-white" colspan="3">
							<div class="flex items-center gap-2">
								<Trophy class="h-4 w-4 text-brand-400" />
								Combined Full-Scale Ecosystem Value Potential
							</div>
						</td>
						<td class="px-5 py-4 text-right text-xl font-black text-brand-400">$150M+</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>

	<!-- Competitive moat -->
	<div id="moat">
		<div class="flex items-center gap-2 mb-4">
			<Shield class="h-5 w-5 text-white/40" />
			<h2 class="text-lg font-bold text-white">Competitive Moat — Why FLI Wins</h2>
		</div>
		<div class="grid sm:grid-cols-2 gap-4">
			{#each moatPoints as m}
				<div class="rounded-xl border border-white/10 bg-navy-700/50 p-5">
					<div class="flex items-center gap-3 mb-2">
						<div class="h-8 w-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
							<svelte:component this={m.icon} class="h-4 w-4 {m.color}" />
						</div>
						<span class="text-sm font-bold text-white">{m.title}</span>
					</div>
					<p class="text-sm text-white/55 leading-relaxed">{m.body}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Long-term vision -->
	<div class="rounded-xl border border-brand-500/40 bg-brand-600/6 p-8 text-center space-y-4">
		<div class="flex items-center justify-center gap-2">
			<Rocket class="h-4 w-4 text-brand-400" />
			<div class="text-xs font-semibold text-brand-400 uppercase tracking-widest">The Long-Term Vision</div>
		</div>
		<div class="grid sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
			{#each [
				{ icon: ServerCog, text: 'A technology company operating through the vehicle of sports entertainment.' },
				{ icon: Lock,      text: 'Proprietary infrastructure that creates scalability, institutional value & defensible IP.' },
				{ icon: Layers,    text: 'Five integrated platforms with independent and combined licensing potential.' },
				{ icon: Zap,       text: 'First-mover advantage in AI-powered disc golf and emerging sports tech.' },
			] as item}
				<div class="flex items-start gap-3 rounded-lg border border-white/8 bg-white/3 p-3">
					<svelte:component this={item.icon} class="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
					<span class="text-sm text-white/65 leading-snug">{item.text}</span>
				</div>
			{/each}
		</div>
		<blockquote class="text-base font-bold text-white italic max-w-2xl mx-auto pt-2">
			"We are not simply modernizing disc golf. We are building the technological foundation for the future of interactive sports entertainment."
		</blockquote>
		<div class="text-xs text-white/25 uppercase tracking-widest">Confidential · For Investor Use Only</div>
	</div>

	<!-- CTA -->
	<div class="rounded-xl border border-yellow-500/60 bg-yellow-500/5 p-6 flex items-center justify-between gap-4">
		<div>
			<div class="text-sm font-bold text-white mb-1">Ready to go deeper?</div>
			<div class="text-sm text-white/50">Review the full pitch deck, financial model, and supporting documents.</div>
		</div>
		<a href="/dashboard/investment-thesis" class="flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 transition-colors shrink-0">
			Investment Thesis <ArrowRight class="h-4 w-4" />
		</a>
	</div>

</div>
