<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import AdminDeckImageSlot from '$lib/components/AdminDeckImageSlot.svelte';
	import {
		Building2, Cpu, Globe2, Sparkles, DollarSign,
		TrendingUp, Users, Users2, GraduationCap, Rocket, Trophy, Mail, Bot, Video, Wrench,
		AlertTriangle, Lock, ShieldCheck
	} from 'lucide-svelte';

	export let data: PageData;

	// Preview mode (?view=basic|advanced|tech) shows an admin the investor view:
	// hide editing controls there. Real admins keep editing outside preview mode.
	$: isAdmin = data.user?.role === 'admin' && !data.previewRole;

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

	// Figures sourced from the 2026 FLI Sport Technologies investor deck.
	const projections = [
		{ year: '2027', leagues: 2_000,   users: 12_000,   revenue: 0.795,  costOfRevenue: 0.28,  opex: 1.0,  ebitda: -0.485, margin: -61 },
		{ year: '2028', leagues: 10_000,  users: 60_000,   revenue: 3.75,   costOfRevenue: 1.2,   opex: 2.0,  ebitda: 0.55,   margin: 15 },
		{ year: '2029', leagues: 30_000,  users: 180_000,  revenue: 10.825, costOfRevenue: 3.0,   opex: 4.5,  ebitda: 3.325,  margin: 31 },
		{ year: '2030', leagues: 60_000,  users: 360_000,  revenue: 22.15,  costOfRevenue: 5.8,   opex: 8.5,  ebitda: 7.85,   margin: 35 },
		{ year: '2031', leagues: 150_000, users: 900_000,  revenue: 50.0,   costOfRevenue: 7.5,   opex: 9.5,  ebitda: 33.0,   margin: 66 }
	];

	// Match the deck's accounting format: negatives render in parentheses.
	const fmtUSD = (millions: number): string => {
		const abs = `$${(Math.abs(millions) * 1_000_000).toLocaleString('en-US')}`;
		return millions < 0 ? `(${abs})` : abs;
	};
	const fmtPct = (pct: number): string => (pct < 0 ? `(${Math.abs(pct)}%)` : `${pct}%`);

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

	onMount(() => {
		buildChart();
		// Scopes the print/export rules in app.css to this deck page.
		document.body.classList.add('printing-fg-deck');
		return () => document.body.classList.remove('printing-fg-deck');
	});

	const marketGroups = [
		{
			icon: Users,
			title: 'Youth Sports',
			stats: [
				{ value: '27.3M', label: 'U.S. youth in organized sports' },
				{ value: '55.4%', label: 'of youth ages 6–17 participated' },
				{ value: '$1,016', label: 'average family spend in 2024' },
				{ value: '+46%', label: 'spending growth since 2019' }
			]
		},
		{
			icon: GraduationCap,
			title: 'College Sports',
			stats: [
				{ value: '554,298', label: 'NCAA student-athletes' },
				{ value: '+15,368', label: 'athletes added in one year' },
				{ value: '19,928', label: 'NCAA championship teams' },
				{ value: '+62', label: 'teams added year over year' }
			]
		},
		{
			icon: Rocket,
			title: 'Emerging Sports',
			stats: [
				{ value: '24.3M', label: 'U.S. pickleball participants' },
				{ value: '+22.7%', label: 'pickleball growth in 2025' },
				{ value: 'LA28', label: 'flag football Olympic debut' },
				{ value: '80%', label: 'of Americans were active in 2024' }
			]
		}
	];

	const disconnectedTools = [
		{ title: 'Registration', body: 'Forms and payments' },
		{ title: 'Competition', body: 'Schedules and scoring' },
		{ title: 'Athlete Record', body: 'Profiles and rankings' },
		{ title: 'Communication', body: 'Teams and families' },
		{ title: 'Content', body: 'Video and highlights' }
	];

	const problemAudiences = [
		{ title: 'Operators', body: 'Manual reconciliation and limited visibility' },
		{ title: 'Athletes', body: 'Fragmented records and missed exposure' },
		{ title: 'Partners', body: 'Inconsistent reporting and activation data' }
	];

	const hubModules = [
		{ title: 'League Management', body: 'Registration, rosters, scheduling and communication' },
		{ title: 'Athlete Profiles', body: 'Identity, achievements, video and development' },
		{ title: 'Training & Credentials', body: 'Courses, certifications and compliance' },
		{ title: 'Competition Data', body: 'Scoring, results, rankings and records' },
		{ title: 'Media Library', body: 'Highlights, live content and sponsor inventory' },
		{ title: 'Analytics', body: 'Participation, retention and partner reporting' }
	];

	const fantasyGaps = [
		{ title: 'Short Attention Window', body: 'Interest peaks around the event schedule' },
		{ title: 'Limited Fan Data', body: 'Properties learn little about individual preferences' },
		{ title: 'Fewer Touchpoints', body: 'Sponsors have fewer reasons to engage fans repeatedly' },
		{ title: 'Weak Retention', body: 'Fans lack a structured reason to return between events' }
	];

	const fantasyMarket = [
		{ value: '85M', label: 'fantasy sports players represented by FSGA in the U.S. and Canada' },
		{ value: '11.5M', label: '2024–25 Fantasy Premier League participants' },
		{ value: '$27.8B', label: 'estimated global fantasy sports market in 2025' },
		{ value: '$75.1B', label: 'projected global market in 2033' },
		{ value: '13.3%', label: 'projected CAGR, 2026–2033' }
	];

	const fantasySteps = [
		{ title: 'Create', body: 'The organization configures scoring and league rules.' },
		{ title: 'Draft', body: 'Fans form private leagues and select real athletes.' },
		{ title: 'Score', body: 'Official results update standings and leaderboards.' },
		{ title: 'Return', body: 'Content and challenges sustain season-long activity.' }
	];

	const sharedIntelligence = [
		{ icon: Wrench,      title: 'Operations',     body: 'Schedule conflicts, communication and workflow alerts.' },
		{ icon: Video,       title: 'Content',        body: 'Automated summaries, highlights and personalized feeds.' },
		{ icon: Bot,         title: 'Fantasy',        body: 'Recommendations, insights and scoring explanations.' },
		{ icon: ShieldCheck, title: 'Risk and Trust', body: 'Anomaly detection, permissions and security monitoring.' }
	];

	const execs = [
		{
			name: 'Andrew Panza', role: 'CEO & Co-Creator', tags: '$25M sales | 250+ employees | 3 TV shows',
			bio: 'Experienced operator and entrepreneur. Led $25M in annual retail sales and managed 250+ employees before age 30. CEO of Sunsteps Entertainment Group with three reality TV shows in production.',
			image: 'fg-team-andrew-panza'
		},
		{
			name: 'Mark Coleman', role: 'Director of Media & Production', tags: '13x Emmy winner | 30+ years broadcasting',
			bio: 'Sports broadcasting executive with senior roles at Spectrum Networks, NBC Universal/Comcast, Fox Sports Net and The Golf Channel. Designed broadcast facilities for the Lakers and Dodgers.',
			image: 'fg-team-mark-coleman'
		},
		{
			name: 'Ina Masten', role: 'Chief Financial Officer', tags: '35+ years finance | Fractional CFO',
			bio: 'Finance leader with experience in accounting, FP&A and CFO roles across manufacturing, healthcare, consulting and telecom. Founder of Masten Solutions.',
			image: 'fg-team-ina-masten'
		},
		{
			name: 'Gary G. Santos', role: 'Tribal & Gaming Lead', tags: '23 years tribal government | IGA Board 10+ years',
			bio: 'Former Tule River Tribal Council member, Vice Chairman, Treasurer and Gaming Commissioner. Chaired a $47M tribal budget and casino relocation project.',
			image: 'fg-team-gary-santos'
		}
	];

	const advisors = [
		{
			name: 'Stephen Crystal', role: 'Gaming Strategy Advisor', tags: '30+ years gaming | SCCG Founder & CEO',
			bio: 'Founder and CEO of SCCG Management, a global consultancy specializing in sports betting, iGaming, esports and emerging gaming technologies.',
			image: 'fg-advisor-stephen-crystal'
		},
		{
			name: 'Ricky Wysocki', role: 'Pro Athlete Advisor', tags: '2x World Champion | 4x PDGA Player of the Year | 132 wins',
			bio: 'Four-time PDGA Player of the Year and two-time World Champion. Brings global recognition, player credibility and a large fan following.',
			image: 'fg-advisor-ricky-wysocki'
		},
		{
			name: 'Ohn Scoggins', role: 'Pro Athlete Advisor', tags: '2025 FPO World Champion | 5x Masters Champion',
			bio: 'The 2025 PDGA FPO World Champion and oldest player to claim the title. Anchors the gender-equal brand with elite credibility.',
			image: 'fg-advisor-ohn-scoggins'
		}
	];

	const financing = [
		{ amount: '$425K', label: 'Product & Engineering',  body: 'Platform development, integrations, testing and launch preparation.' },
		{ amount: '$150K', label: 'Security & Compliance',  body: 'Security controls, privacy, testing and compliance readiness.' },
		{ amount: '$645K', label: 'Marketing & Promotion',  body: 'Market activation, user acquisition, PR and partner promotion.' },
		{ amount: '$75K',  label: 'Cloud, Software & Data', body: 'Hosting, software access, monitoring and data services.' },
		{ amount: '$205K', label: 'Working Capital',        body: 'Operating flexibility through launch and early growth.' }
	];
</script>

<svelte:head>
	<title>FLI Sport Technologies — Investor Presentation</title>
</svelte:head>

<!-- Scoped light "investor deck" theme — does not affect the rest of the Data Room -->
<div class="-m-8 min-h-screen bg-fg-cream text-fg-ink">
	<!-- Context bar: this section intentionally uses a distinct brand/theme -->
	<div class="fg-deck-chrome max-w-5xl mx-auto px-6 pt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-fg-ink/50">
		<a href="/dashboard" class="hover:text-fg-ink/80 transition-colors">← Back to FLI Golf League Data Room</a>
		<span>A connected but distinct investment: FLI Sport Technologies</span>
	</div>

	<div class="max-w-5xl mx-auto px-6 pb-14 pt-8 space-y-24">

		<!-- Hero -->
		<section id="overview" class="rounded-3xl border border-fg-ink/25 bg-fg-cream3 p-8 md:p-10 space-y-6">
			<span class="inline-flex items-center gap-2 rounded-full bg-fg-green-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-fg-green-800">
				<Lock class="h-3.5 w-3.5" /> Confidential Investor Presentation · 2026
			</span>
			<div class="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
				<div class="space-y-6">
					<h1 class="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight text-fg-green-900">
						The operating and engagement layer for modern sports
					</h1>
					<p class="max-w-2xl text-lg text-fg-ink/70 leading-relaxed">
						<strong>FLIHub</strong> + <strong>FLI Fantasy Gaming</strong> — two connected platforms support
						youth, college, professional and emerging sports organizations.
					</p>
					<div class="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-widest text-fg-ink/50">
						<span class="rounded-full border border-fg-ink/15 bg-white/60 px-3 py-1">Youth</span>
						<span class="rounded-full border border-fg-ink/15 bg-white/60 px-3 py-1">College</span>
						<span class="rounded-full border border-fg-ink/15 bg-white/60 px-3 py-1">Professional</span>
						<span class="rounded-full border border-fg-ink/15 bg-white/60 px-3 py-1">Emerging Sports</span>
						<span class="rounded-full border border-fg-gold/40 bg-fg-gold/15 px-3 py-1 normal-case tracking-normal text-fg-ink/60">Examples: Soccer • Flag football • Stadium disc golf</span>
					</div>
				</div>
				<AdminDeckImageSlot
					src={mediaUrl('fg-cover-hero-image')}
					alt={mediaAlt('fg-cover-hero-image', 'FLI Sport Technologies cover hero image')}
					name="fg-cover-hero-image"
					{isAdmin}
					label="FLI Sport Technologies cover hero image"
					prompt="Cinematic night shot of a futuristic disc golf stadium, glowing holographic player analytics screens in the background, an athlete mid-throw in dark gear with neon-green accents, 'FLI GOLF LEAGUE' signage lit up, teal and gold stadium lighting, ultra-realistic, dramatic wide-angle, 8k."
					containerClass="rounded-2xl border border-fg-ink/10 bg-white/60 p-3"
					imageClass="w-full max-h-[360px] object-cover rounded-xl"
					placeholderClass="h-72"
				/>
			</div>
		</section>

		<!-- Important information — wording preserved from the 2026 deck, page 2 -->
		<section id="important" aria-labelledby="important-heading" class="rounded-3xl border border-fg-ink/25 bg-fg-cream3 p-8 md:p-10 space-y-6">
			<div class="flex items-center gap-2 text-fg-green-800">
				<ShieldCheck class="h-5 w-5" />
				<h2 id="important-heading" class="text-sm font-bold uppercase tracking-widest">Important Information</h2>
			</div>
			<div class="grid md:grid-cols-2 gap-6">
				<div class="rounded-2xl border border-fg-ink/10 bg-white/60 p-6 space-y-3">
					<h3 class="text-sm font-bold uppercase tracking-widest text-fg-green-900">FINRA / SEC Disclaimer</h3>
					<p class="text-xs text-fg-ink/70 leading-relaxed">
						This Presentation contains sensitive business and financial information. It is being delivered on behalf of the Company by Young America Capital, LLC (YAC). Its sole purpose is to assist the recipient in deciding whether to proceed with a further inquiry of the Company. This Presentation does not purport to be all-inclusive or to contain all information a prospective investor may desire. By accepting it, the recipient agrees to keep confidential the information contained herein or made available in connection with any further inquiry. It may not be photocopied, reproduced or distributed without YAC's prior written consent.
					</p>
					<p class="text-xs text-fg-ink/70 leading-relaxed">
						Neither the Company nor YAC makes any express or implied representation or warranty as to the accuracy or completeness of the information. Each expressly disclaims liability based on such information, errors or omissions. A recipient may rely solely on representations and warranties in a definitive agreement and on the recipient's own due diligence. Neither the Company nor YAC undertakes any obligation to provide additional information. This Presentation does not constitute an offer to sell or a solicitation of an offer to buy securities where unlawful. Private placements may be illiquid and highly speculative, and an investor may lose the entire investment.
					</p>
				</div>
				<div class="rounded-2xl border border-fg-ink/10 bg-white/60 p-6 space-y-3">
					<h3 class="text-sm font-bold uppercase tracking-widest text-fg-green-900">Forward-Looking Statements</h3>
					<p class="text-xs text-fg-ink/70 leading-relaxed">
						This Presentation includes statements, estimates and projections concerning anticipated future performance. They depend on significant assumptions and subjective judgments and remain subject to risks, variability and contingencies, many beyond the Company's control. Actual results likely will vary, potentially materially.
					</p>
					<p class="text-xs text-fg-ink/70 leading-relaxed">
						Forward-looking statements relate to future events or performance, including financial projections, growth, business prospects and opportunities. Terms such as may, should, expects, anticipates, estimates, believes, plans, projected, predicts, potential and similar expressions may identify such statements. Factors that may cause actual results to differ include the Company's ability to change direction, keep pace with technology and market needs, compete effectively, protect information systems and privacy, enforce intellectual property, expand sales and customer support, secure financing and achieve sufficient revenue to sustain profitability. The Company has no obligation to update forward-looking statements.
					</p>
					<p class="text-xs text-fg-ink/70 leading-relaxed">
						All inquiries concerning the Company or this Presentation should be directed to a representative of Young America Capital, LLC. Company personnel may not be contacted directly unless YAC expressly permits it.
					</p>
				</div>
			</div>
			<p class="rounded-xl border border-fg-gold/50 bg-fg-gold/25 p-4 text-center text-sm font-bold text-fg-ink">
				Investments are speculative, illiquid and involve a risk of total loss.
			</p>
		</section>

		<!-- Market opportunity -->
		<section id="market" class="rounded-3xl border border-fg-teal/60 bg-fg-teal/35 p-8 md:p-10 space-y-6">
			<div class="flex items-center gap-2 text-fg-green-800">
				<Globe2 class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Market Opportunity</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">Participation spans youth, college and rapidly growing emerging sports</h3>
			<p class="text-sm text-fg-ink/60">Large audiences and rising participation create demand for modern operating and engagement infrastructure.</p>
			<div class="grid md:grid-cols-3 gap-4">
				{#each marketGroups as group}
					<div class="rounded-2xl border border-fg-ink/10 bg-white/60 p-5 space-y-1">
						<div class="flex items-center gap-2 text-fg-green-800 pb-2">
							<svelte:component this={group.icon} class="h-4 w-4" />
							<div class="text-xs font-bold uppercase tracking-widest">{group.title}</div>
						</div>
						{#each group.stats as stat}
							<div class="border-t border-fg-ink/10 pt-2 pb-1">
								<div class="text-2xl font-black text-fg-green-700">{stat.value}</div>
								<div class="text-xs text-fg-ink/60">{stat.label}</div>
							</div>
						{/each}
					</div>
				{/each}
			</div>
			<div class="rounded-xl bg-fg-gold/25 border border-fg-gold/50 p-5">
				<span class="text-xs font-bold uppercase tracking-widest text-fg-ink/70">The technology gap</span>
				<p class="mt-1 text-sm font-semibold text-fg-ink">Organizations still rely on disconnected systems for operations, athlete identity, content and fan engagement.</p>
			</div>
		</section>

		<!-- Company overview -->
		<section id="company" class="rounded-3xl border border-fg-green-800 bg-fg-green-900 text-fg-cream p-8 md:p-10 space-y-6">
			<div class="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
				<div class="space-y-6">
					<div class="flex items-center gap-2 text-fg-mint">
						<Building2 class="h-5 w-5" />
						<h2 class="text-sm font-bold uppercase tracking-widest">Company Overview</h2>
					</div>
					<h3 class="text-3xl font-black leading-tight">Two platforms. One shared sports data foundation.</h3>
					<p class="text-sm text-fg-cream/70">FLIHub runs the sport. FLI Fantasy Gaming turns real competition into recurring digital engagement.</p>
					<div class="grid md:grid-cols-2 gap-6">
						<div class="border-t-2 border-fg-cyan pt-3">
							<div class="text-xs font-bold uppercase tracking-widest text-fg-cream/50">01</div>
							<div class="font-bold text-fg-cyan">FLIHub</div>
							<p class="mt-1 text-sm text-fg-cream/80">League operations, athlete identity, competition data and digital content in one platform.</p>
						</div>
						<div class="border-t-2 border-fg-gold pt-3">
							<div class="text-xs font-bold uppercase tracking-widest text-fg-cream/50">02</div>
							<div class="font-bold text-fg-gold">FLI Fantasy Gaming</div>
							<p class="mt-1 text-sm text-fg-cream/80">Configurable fantasy leagues that convert verified competition data into paid fan participation.</p>
						</div>
					</div>
					<p class="text-sm font-semibold text-fg-mint">
						Shared foundation — Profiles • schedules • results • rankings • media • analytics
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

		<!-- Platform One: Problem -->
		<section id="p1-problem" class="rounded-3xl border border-fg-ink/25 bg-fg-cream3 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<AlertTriangle class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Platform One · The Problem</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">League operators still manage one season across many disconnected tools</h3>
			<p class="text-sm text-fg-ink/60">The friction grows as participation, content and compliance requirements increase.</p>
			<div class="grid grid-cols-2 md:grid-cols-5 gap-4">
				{#each disconnectedTools as tool, i}
					<div class="rounded-xl bg-white/60 border border-fg-ink/10 p-4">
						<div class="text-xs font-black text-fg-teal">0{i + 1}</div>
						<div class="mt-1 text-sm font-bold uppercase tracking-wide text-fg-ink">{tool.title}</div>
						<p class="mt-1 text-xs text-fg-ink/60">{tool.body}</p>
					</div>
				{/each}
			</div>
			<p class="text-center text-sm font-semibold text-fg-ink/70">Each handoff creates duplicate work and weakens the data trail.</p>
			<div class="grid md:grid-cols-3 gap-4">
				{#each problemAudiences as audience}
					<div class="rounded-xl border-t-2 border-fg-gold bg-white/60 p-4">
						<div class="text-xs font-bold uppercase tracking-widest text-fg-green-800">{audience.title}</div>
						<p class="mt-1 text-sm text-fg-ink/70">{audience.body}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Platform One: Solution -->
		<section id="platforms" class="rounded-3xl border border-fg-mint/60 bg-fg-mint/35 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<Cpu class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Platform One · The Solution</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">FLIHub becomes the operating system for the sport</h3>
			<p class="text-sm text-fg-ink/60">A configurable platform for leagues, clubs, tournaments and athlete development programs.</p>
			<div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
				{#each hubModules as m}
					<div class="rounded-xl border-t-2 border-fg-green-600 bg-white/60 p-4">
						<div class="font-bold text-fg-ink">{m.title}</div>
						<p class="mt-1 text-xs text-fg-ink/60">{m.body}</p>
					</div>
				{/each}
			</div>
			<p class="text-sm font-semibold text-fg-ink/70">Built for youth programs, college athletics, professional leagues and emerging sports organizations.</p>
		</section>

		<!-- Platform Two: Problem -->
		<section id="p2-problem" class="rounded-3xl border border-fg-ink/25 bg-fg-cream3 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<AlertTriangle class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Platform Two · The Problem</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">Most competitions generate attention, then lose it when the event ends</h3>
			<p class="text-sm text-fg-ink/60">Smaller and emerging sports need a repeatable engagement product that does not require building a custom game.</p>
			<div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
				{#each fantasyGaps as gap, i}
					<div class="rounded-xl bg-white/60 border border-fg-ink/10 p-4">
						<div class="text-xs font-black text-fg-teal">0{i + 1}</div>
						<div class="mt-1 text-sm font-bold uppercase tracking-wide text-fg-ink">{gap.title}</div>
						<p class="mt-1 text-xs text-fg-ink/60">{gap.body}</p>
					</div>
				{/each}
			</div>
			<div class="rounded-xl bg-fg-gold/25 border border-fg-gold/50 p-5">
				<span class="text-xs font-bold uppercase tracking-widest text-fg-ink/70">Market need</span>
				<p class="mt-1 text-sm font-semibold text-fg-ink">A configurable fantasy product using official results, private leagues and sport-specific rules.</p>
			</div>
		</section>

		<!-- Platform Two: Market -->
		<section id="fantasy-market" class="rounded-3xl border border-fg-teal/60 bg-fg-teal/35 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<Globe2 class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Platform Two · The Market</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">Fantasy sports is a large, established digital engagement category</h3>
			<p class="text-sm text-fg-ink/60">Participation, market value and global league adoption demonstrate familiar consumer behavior.</p>
			<div class="rounded-2xl border border-fg-ink/10 bg-white/60 p-8 grid md:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
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
				<div class="space-y-2 text-sm">
					{#each fantasyMarket as stat}
						<div class="flex justify-between gap-4 border-b border-fg-ink/10 pb-2 last:border-0">
							<span class="shrink-0 font-black text-fg-green-700 text-xl">{stat.value}</span>
							<span class="text-fg-ink/60 self-center text-right">{stat.label}</span>
						</div>
					{/each}
				</div>
			</div>
			<p class="text-xs text-fg-ink/50">The category already operates at global scale across major leagues, sports and digital platforms.</p>
		</section>

		<!-- Platform Two: Solution -->
		<section id="p2-solution" class="rounded-3xl border border-fg-mint/60 bg-fg-mint/35 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<Trophy class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Platform Two · The Solution</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">Fantasy makes every real result matter to a digital league</h3>
			<p class="text-sm text-fg-ink/60">Participants draft real athletes. Verified performance produces points. Private leagues compete across a season or event.</p>
			<div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
				{#each fantasySteps as step, i}
					<div class="rounded-xl bg-white/60 border border-fg-ink/10 p-4">
						<div class="text-3xl font-black text-fg-gold">{i + 1}</div>
						<div class="mt-1 text-sm font-bold uppercase tracking-wide text-fg-ink">{step.title}</div>
						<p class="mt-1 text-xs text-fg-ink/60">{step.body}</p>
					</div>
				{/each}
			</div>
			<p class="text-sm font-semibold text-fg-ink/70">Sport-neutral rules engine • verified data • private leagues</p>
		</section>

		<!-- Shared technology -->
		<section id="ai" class="rounded-3xl border border-fg-cyan/60 bg-fg-cyan/35 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<Sparkles class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Shared Technology</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">Embedded intelligence improves the experience across both platforms</h3>
			<p class="text-sm text-fg-ink/60">Automation supports operators and participants while keeping official data at the center.</p>
			<div class="grid md:grid-cols-2 gap-4">
				{#each sharedIntelligence as f}
					<div class="rounded-xl border-t-2 border-fg-teal bg-white/60 p-5 flex gap-3">
						<svelte:component this={f.icon} class="h-5 w-5 text-fg-teal shrink-0 mt-0.5" />
						<div>
							<div class="font-bold text-fg-ink">{f.title}</div>
							<p class="mt-1 text-sm text-fg-ink/70">{f.body}</p>
						</div>
					</div>
				{/each}
			</div>
			<div class="rounded-xl border border-fg-ink/10 bg-white/60 p-5">
				<span class="text-xs font-bold uppercase tracking-widest text-fg-green-800">Design principle</span>
				<p class="mt-1 text-sm font-semibold text-fg-ink/80">Intelligence assists decisions while official rules, permissions and verified results remain authoritative.</p>
			</div>
		</section>

		<!-- Leadership -->
		<section id="leadership" class="rounded-3xl border border-fg-ink/25 bg-fg-cream3 p-8 md:p-10 space-y-6">
			<div class="flex items-center gap-2 text-fg-green-800">
				<Users2 class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Leadership</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">The people behind the platforms</h3>
			<p class="text-sm text-fg-ink/60">Executive leadership and advisors aligned with the current FLI Golf League master deck.</p>
			<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{#each execs as person}
					<div class="rounded-2xl border border-fg-ink/10 bg-white/60 p-5 space-y-3">
						<AdminDeckImageSlot
							src={mediaUrl(person.image)}
							alt={mediaAlt(person.image, person.name + ' headshot')}
							name={person.image}
							tag="team"
							{isAdmin}
							label={person.name + ' headshot'}
							containerClass="rounded-xl border border-fg-ink/10 bg-fg-cream2 p-2"
							imageClass="w-full h-32 object-cover rounded-lg"
							placeholderClass="h-32"
						/>
						<div>
							<div class="font-bold text-fg-ink">{person.name}</div>
							<div class="text-xs text-fg-ink/50">{person.role}</div>
							<div class="mt-1 text-xs font-bold text-fg-teal">{person.tags}</div>
							<p class="mt-2 text-xs leading-relaxed text-fg-ink/70">{person.bio}</p>
						</div>
					</div>
				{/each}
			</div>
			<div class="text-xs font-bold uppercase tracking-widest text-fg-green-800">Advisory Board</div>
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each advisors as person}
					<div class="rounded-2xl border border-fg-ink/10 bg-white/60 p-5 space-y-3">
						<AdminDeckImageSlot
							src={mediaUrl(person.image)}
							alt={mediaAlt(person.image, person.name + ' headshot')}
							name={person.image}
							tag="team"
							{isAdmin}
							label={person.name + ' headshot'}
							containerClass="rounded-xl border border-fg-ink/10 bg-fg-cream2 p-2"
							imageClass="w-full h-32 object-cover rounded-lg"
							placeholderClass="h-32"
						/>
						<div>
							<div class="font-bold text-fg-ink">{person.name}</div>
							<div class="text-xs text-fg-ink/50">{person.role}</div>
							<div class="mt-1 text-xs font-bold text-fg-teal">{person.tags}</div>
							<p class="mt-2 text-xs leading-relaxed text-fg-ink/70">{person.bio}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Development partner -->
		<section id="partner" class="rounded-3xl border border-fg-gold/60 bg-fg-gold/35 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<Users2 class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Development Partner</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">Coughlin Technology Group brings enterprise and gaming experience</h3>
			<div class="rounded-2xl border border-fg-ink/10 bg-white/60 p-8 grid md:grid-cols-[auto_1fr_1fr] gap-8">
				<AdminDeckImageSlot
					src={mediaUrl('fg-partner-headshot')}
					alt={mediaAlt('fg-partner-headshot', 'Kevin Coughlin headshot')}
					name="fg-partner-headshot"
					tag="team"
					{isAdmin}
					label="Kevin Coughlin headshot"
					containerClass="rounded-xl border border-fg-ink/10 bg-fg-cream2 p-2 w-32"
					imageClass="w-28 h-28 object-cover rounded-lg"
					placeholderClass="h-28 w-28"
				/>
				<div>
					<div class="font-bold text-fg-ink">Kevin Coughlin</div>
					<div class="text-xs text-fg-ink/50">Chief Executive Officer</div>
					<div class="mt-3 text-xs font-bold uppercase tracking-widest text-fg-green-800">Role in the Platform</div>
					<p class="mt-1 text-sm text-fg-ink/70 leading-relaxed">
						Production engineering, integrations, testing and launch preparation for FLIHub and FLI Fantasy Gaming.
					</p>
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
				Final scope and deliverables remain subject to Coughlin Technology Group confirmation and executed contracts.
			</p>
		</section>

		<!-- Financial projections -->
		<section id="projections" class="rounded-3xl border border-fg-mint/60 bg-fg-mint/35 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<TrendingUp class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Five-Year Outlook</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">The base case reaches $50 million in 2031 revenue with a 66% EBITDA margin</h3>
			<p class="text-sm text-fg-ink/60">Management projection for FLI Sport Technologies only, 2027–2031. Figures in U.S. dollars.</p>

			<div class="rounded-xl bg-fg-green-900 text-fg-cream p-6 flex flex-wrap gap-8">
				<div><div class="text-2xl font-black text-fg-gold">$50.0M</div><div class="text-xs uppercase tracking-widest text-fg-cream/60">2031 Revenue</div></div>
				<div><div class="text-2xl font-black text-fg-mint">$33.0M</div><div class="text-xs uppercase tracking-widest text-fg-cream/60">2031 EBITDA</div></div>
				<div><div class="text-2xl font-black text-fg-cyan">66%</div><div class="text-xs uppercase tracking-widest text-fg-cream/60">2031 Margin</div></div>
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
						<tr><td class="px-4 py-2 text-fg-ink/60">Paid leagues</td>{#each projections as row}<td class="px-4 py-2 text-right">{row.leagues.toLocaleString('en-US')}</td>{/each}</tr>
						<tr><td class="px-4 py-2 text-fg-ink/60">Paid users</td>{#each projections as row}<td class="px-4 py-2 text-right">{row.users.toLocaleString('en-US')}</td>{/each}</tr>
						<tr class="font-bold bg-fg-cream2"><td class="px-4 py-2">Total Revenue</td>{#each projections as row}<td class="px-4 py-2 text-right">${(row.revenue * 1_000_000).toLocaleString()}</td>{/each}</tr>
						<tr><td class="px-4 py-2 text-fg-ink/60">Cost of revenue</td>{#each projections as row}<td class="px-4 py-2 text-right text-fg-ink/60">(${(row.costOfRevenue * 1_000_000).toLocaleString()})</td>{/each}</tr>
						<tr class="font-bold bg-fg-cream2"><td class="px-4 py-2">Total Operating Expenses</td>{#each projections as row}<td class="px-4 py-2 text-right">(${(row.opex * 1_000_000).toLocaleString()})</td>{/each}</tr>
						<tr class="font-bold bg-fg-gold/25"><td class="px-4 py-2">EBITDA / Margin</td>{#each projections as row}<td class="px-4 py-2 text-right">{fmtUSD(row.ebitda)} / {fmtPct(row.margin)}</td>{/each}</tr>
					</tbody>
				</table>
			</div>

			<div class="grid md:grid-cols-3 gap-4 text-sm">
				<div class="rounded-xl border-t-2 border-fg-green-600 bg-white/60 p-4">
					<div class="font-bold text-fg-ink">Revenue</div>
					<p class="mt-1 text-fg-ink/70">FLI Fantasy Gaming paid leagues, enterprise licenses and other platform revenue.</p>
				</div>
				<div class="rounded-xl border-t-2 border-fg-cyan bg-white/60 p-4">
					<div class="font-bold text-fg-ink">Cost of Revenue</div>
					<p class="mt-1 text-fg-ink/70">Prizes, fulfillment, processing and variable platform delivery.</p>
				</div>
				<div class="rounded-xl border-t-2 border-fg-gold bg-white/60 p-4">
					<div class="font-bold text-fg-ink">Operating Expenses</div>
					<p class="mt-1 text-fg-ink/70">Product, cloud, security, compliance, sales, support and administration.</p>
				</div>
			</div>
		</section>

		<!-- Financing request -->
		<section id="financing" class="rounded-3xl border border-fg-ink/25 bg-fg-cream3 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<DollarSign class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Financing Request</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">$1.5 million SAFE funds production completion and commercial launch</h3>
			<p class="text-sm text-fg-ink/60">Capital is concentrated on platform development, market activation and operating readiness.</p>

			<div class="rounded-2xl border border-fg-gold/40 bg-fg-gold/10 p-8 flex flex-wrap items-center gap-x-10 gap-y-4">
				<div>
					<div class="text-4xl font-black text-fg-green-900">$1,500,000</div>
					<div class="text-xs font-bold uppercase tracking-widest text-fg-ink/60 mt-1">SAFE · Simple Agreement for Future Equity</div>
				</div>
				<div class="rounded-xl border border-fg-mint/50 bg-fg-mint/15 px-4 py-3 max-w-md">
					<div class="text-xs font-bold uppercase tracking-widest text-fg-green-800">Milestone</div>
					<p class="mt-1 text-sm font-semibold text-fg-ink/80">Production-ready platforms with launch operations, security controls and an enterprise sales motion.</p>
				</div>
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
				SAFE terms, valuation cap, discount and conversion mechanics remain subject to definitive documentation.
			</p>
		</section>

		<!-- Contact -->
		<section id="contact" class="rounded-3xl border border-fg-teal/60 bg-fg-teal/35 p-8 md:p-10 space-y-4">
			<div class="flex items-center gap-2 text-fg-green-800">
				<Mail class="h-5 w-5" />
				<h2 class="text-sm font-bold uppercase tracking-widest">Investor Contact</h2>
			</div>
			<h3 class="text-2xl font-black text-fg-green-900">Investor inquiries — FLI Sport Technologies</h3>
			<p class="text-fg-teal font-semibold">
				Two connected platforms. Embedded intelligence. A shared data foundation for youth, college, professional and emerging sports.
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
