<script lang="ts">
	import {
		DollarSign, TrendingUp, Target, CheckCircle2, ArrowRight,
		Building2, Users, Tv, Shield, Globe, Trophy, Zap, Hash
	} from 'lucide-svelte';

	const sections = [
		{ id: 'opportunity',     label: 'Investment Opportunity' },
		{ id: 'vision',          label: 'The Vision' },
		{ id: 'business-model',  label: 'Business Model & Revenue' },
		{ id: 'market',          label: 'Market & Competitor Analysis' },
		{ id: 'growth',          label: 'Growth Plan' },
		{ id: 'exit',            label: 'Exit Strategies & Returns' },
		{ id: 'team',            label: 'Team & Advisory Board' },
		{ id: 'risk',            label: 'Risk Factors' },
		{ id: 'conclusion',      label: 'Conclusion' },
		{ id: 'comparisons',     label: 'Global Comparisons' },
		{ id: 'next-steps',      label: 'Next Steps' },
	];

	const competitors = [
		{ league: 'LIV Golf',   startup: '$2B+',   valuation: '$1.5B+',          revenue: '$500M+ annually' },
		{ league: 'MLS (Early)',startup: '$75M',   valuation: '$11B+',           revenue: '$1B+ annually' },
		{ league: 'UFC (Early)',startup: '$2M',    valuation: '$12B+',           revenue: '$1.5B+ annually' },
		{ league: 'FLI Golf',   startup: '$20M ask',valuation: '$57M–$120M proj',revenue: '$100M+ potential', highlight: true },
	];

	const exitScenarios = [
		{ strategy: 'Franchise Sales (Conservative)', valuation: '$60M',   share: '$31M+' },
		{ strategy: 'Franchise Sales (Expected)',      valuation: '$120M',  share: '$62M+' },
		{ strategy: 'Media / Sponsorship Growth',      valuation: '$30M+',  share: '$16M+' },
		{ strategy: 'Potential IPO / Acquisition',     valuation: '$500M+', share: '$255M+', highlight: true },
	];

	const globalComparisons = [
		{
			league: 'Indian Premier League (IPL)',
			sport: 'Cricket',
			icon: Trophy,
			color: 'text-yellow-400',
			border: 'border-yellow-500/20',
			bg: 'bg-yellow-500/8',
			points: [
				'Launched 2008; grew to a $15B league in just over a decade',
				'Team valuations started at $67M — now worth over $1B each',
				'Fueled by T20 format innovation, broadcasting deals, and high-profile signings',
			]
		},
		{
			league: 'UFC',
			sport: 'MMA',
			icon: Zap,
			color: 'text-brand-400',
			border: 'border-brand-600/20',
			bg: 'bg-brand-600/8',
			points: [
				'Bought for $2M in 2001; sold for $4B in 2016',
				'Built on branding, media deals, and global market expansion',
				'FLI mirrors this with high-stakes, fast-paced competition',
			]
		},
		{
			league: 'Formula 1',
			sport: 'Motorsport',
			icon: Globe,
			color: 'text-fli-blue-300',
			border: 'border-fli-blue-700/20',
			bg: 'bg-fli-blue-800/10',
			points: [
				'Liberty Media acquired F1 for $4.4B in 2017',
				'Expanded viewership through digital media and Netflix\'s "Drive to Survive"',
				'FLI can use similar storytelling to engage new audiences',
			]
		},
		{
			league: 'MLS',
			sport: 'Soccer',
			icon: Target,
			color: 'text-green-400',
			border: 'border-green-500/20',
			bg: 'bg-green-500/8',
			points: [
				'Started 1996 with franchise values under $50M — average now $540M',
				'Secured long-term broadcasting deals and strategic expansion',
				'FLI mirrors this with structured growth and international expansion',
			]
		},
		{
			league: 'NWSL',
			sport: "Women's Soccer",
			icon: Users,
			color: 'text-pink-400',
			border: 'border-pink-500/20',
			bg: 'bg-pink-500/8',
			points: [
				'Expansion teams now selling for $50M+, up from $2M a few years ago',
				'Driven by equal pay movements and increased media coverage',
				"FLI's gender-equal format positions it as a forward-thinking league",
			]
		},
		{
			league: 'eSports Leagues',
			sport: 'Digital / Streaming',
			icon: Tv,
			color: 'text-purple-400',
			border: 'border-purple-500/20',
			bg: 'bg-purple-500/8',
			points: [
				'Overwatch League and CoD League sold franchise slots for $20M+ each',
				'Entirely digital — yet commanded premium franchise valuations',
				'FLI capitalizes on the same booming live-streaming and sports betting sectors',
			]
		},
	];
</script>

<svelte:head>
	<title>Investment Overview — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-14">

	<!-- Header -->
	<div>
		<h1 class="text-3xl font-black text-white">Investment Overview</h1>
		<p class="mt-1 text-white/50">An Exciting New Era in Disc Golf & Sports Entertainment</p>
	</div>

	<!-- Section TOC -->
	<div class="rounded-xl border border-white/10 bg-navy-700/40 p-5">
		<div class="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Contents</div>
		<div class="grid sm:grid-cols-2 gap-x-8 gap-y-1.5">
			{#each sections as s, i}
				<a href="#{s.id}" class="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group">
					<Hash class="h-3 w-3 text-white/20 group-hover:text-brand-400 shrink-0" />
					<span class="text-white/25 tabular-nums w-4 shrink-0">{i + 1}.</span>
					{s.label}
				</a>
			{/each}
		</div>
	</div>

	<!-- 1. Investment Opportunity -->
	<section id="opportunity" class="space-y-5">
		<h2 class="text-xl font-bold text-white border-b border-white/10 pb-3">1. Investment Opportunity</h2>
		<p class="text-white/65 leading-relaxed">
			FLI Golf League is set to revolutionize professional disc golf by introducing a high-stakes, gender-equal league
			featuring the world's top players. Events will be hosted in premium venues — including a $500 million casino resort
			in Jamestown, California — delivering unparalleled excitement, substantial payouts, and a global audience.
		</p>
		<div class="grid sm:grid-cols-2 gap-4">
			<div class="rounded-xl border border-brand-600/30 bg-brand-600/10 p-5">
				<div class="flex items-center gap-2 mb-2">
					<Building2 class="h-4 w-4 text-brand-400" />
					<span class="text-sm font-bold text-white">Franchise Model</span>
				</div>
				<p class="text-sm text-white/60 leading-relaxed">Launching with 12 teams, each projected to sell for <span class="text-white font-semibold">$5M–$10M+</span> within three years.</p>
			</div>
			<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/8 p-5">
				<div class="flex items-center gap-2 mb-2">
					<DollarSign class="h-4 w-4 text-yellow-400" />
					<span class="text-sm font-bold text-white">Diverse Revenue Streams</span>
				</div>
				<p class="text-sm text-white/60 leading-relaxed">Media rights, sponsorships, ticket sales, merchandise, and sports betting partnerships.</p>
			</div>
		</div>
	</section>

	<!-- 2. The Vision -->
	<section id="vision" class="space-y-5">
		<h2 class="text-xl font-bold text-white border-b border-white/10 pb-3">2. The Vision: A Transformational Sports League</h2>
		<div class="grid sm:grid-cols-2 gap-6">
			<div class="space-y-3">
				<div class="text-sm font-semibold text-white/70 uppercase tracking-wide">Why Now?</div>
				{#each [
					'Disc golf is one of the fastest-growing sports worldwide',
					'Traditional golf leagues lack innovation — FLI brings fast-paced, high-stakes action',
					'Sports betting & streaming markets are expanding, creating new monetization opportunities',
				] as point}
					<div class="flex items-start gap-2.5">
						<CheckCircle2 class="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
						<span class="text-sm text-white/60 leading-snug">{point}</span>
					</div>
				{/each}
			</div>
			<div class="space-y-3">
				<div class="text-sm font-semibold text-white/70 uppercase tracking-wide">The FLI Experience</div>
				{#each [
					{ label: 'High-Intensity Format', desc: 'Par 3-style courses designed for exciting shot-making' },
					{ label: 'Big Money Payouts', desc: 'Massive purses attract elite talent and compelling competition' },
					{ label: 'Exclusive Venues', desc: 'Hosted at casinos, racetracks, and high-profile locations' },
					{ label: 'Cutting-Edge Media', desc: 'Live-streamed globally with real-time betting integration' },
				] as item}
					<div class="flex items-start gap-2.5">
						<CheckCircle2 class="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
						<span class="text-sm text-white/60 leading-snug"><span class="text-white font-medium">{item.label}:</span> {item.desc}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- 3. Business Model -->
	<section id="business-model" class="space-y-5">
		<h2 class="text-xl font-bold text-white border-b border-white/10 pb-3">3. Business Model & Revenue Streams</h2>
		<p class="text-white/65 leading-relaxed">FLI Golf League operates on a franchise-based structure, allowing for scalable growth and high long-term valuation.</p>
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
			{#each [
				{ label: 'Franchise Sales',              value: '$60M–$120M total',          icon: Building2,  color: 'text-brand-400',    border: 'border-brand-600/20',    bg: 'bg-brand-600/8' },
				{ label: 'Sponsorships & Media Rights',  value: 'Top brands + streaming',    icon: Tv,         color: 'text-fli-blue-300', border: 'border-fli-blue-700/20', bg: 'bg-fli-blue-800/10' },
				{ label: 'Ticket Sales & VIP Packages',  value: 'Premium venue experiences', icon: Trophy,     color: 'text-yellow-400',   border: 'border-yellow-500/20',   bg: 'bg-yellow-500/8' },
				{ label: 'Merchandise & Apparel',        value: 'Streetwear & performance',  icon: Users,      color: 'text-green-400',    border: 'border-green-500/20',    bg: 'bg-green-500/8' },
				{ label: 'Betting & Gambling',           value: 'Sportsbook integration',    icon: DollarSign, color: 'text-orange-400',   border: 'border-orange-500/20',   bg: 'bg-orange-500/8' },
			] as stream}
				<div class="rounded-xl border {stream.border} {stream.bg} p-4 flex items-start gap-3">
					<svelte:component this={stream.icon} class="h-4 w-4 {stream.color} shrink-0 mt-0.5" />
					<div>
						<div class="text-sm font-semibold text-white">{stream.label}</div>
						<div class="text-xs text-white/45 mt-0.5">{stream.value}</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- 4. Market & Competitor Analysis -->
	<section id="market" class="space-y-5">
		<h2 class="text-xl font-bold text-white border-b border-white/10 pb-3">4. Market & Competitor Analysis</h2>
		<p class="text-white/65 leading-relaxed">FLI Golf League is positioned at the intersection of golf, disc golf, and emerging sports entertainment.</p>
		<div class="rounded-xl border border-white/10 bg-navy-700/40 overflow-hidden">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/10 bg-white/5">
						<th class="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wide">League</th>
						<th class="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wide">Startup Cost</th>
						<th class="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wide">Current Valuation</th>
						<th class="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wide">Revenue Potential</th>
					</tr>
				</thead>
				<tbody>
					{#each competitors as row}
						<tr class="border-b border-white/6 {row.highlight ? 'bg-brand-600/10' : 'hover:bg-white/3'} transition-colors">
							<td class="px-4 py-3 font-semibold {row.highlight ? 'text-brand-400' : 'text-white'}">{row.league}</td>
							<td class="px-4 py-3 text-white/60">{row.startup}</td>
							<td class="px-4 py-3 text-white/60">{row.valuation}</td>
							<td class="px-4 py-3 text-white/60">{row.revenue}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class="space-y-2">
			{#each [
				'Like LIV Golf, FLI disrupts traditional formats with new rules and big payouts',
				'Like UFC, FLI capitalizes on an underserved market with a high-growth trajectory',
				'Like MLS, FLI starts small but has massive long-term expansion potential',
			] as point}
				<div class="flex items-start gap-2.5">
					<ArrowRight class="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
					<span class="text-sm text-white/60">{point}</span>
				</div>
			{/each}
		</div>
	</section>

	<!-- 5. Growth Plan -->
	<section id="growth" class="space-y-5">
		<h2 class="text-xl font-bold text-white border-b border-white/10 pb-3">5. Growth Plan & Expansion Strategy</h2>
		<div class="space-y-4">
			{#each [
				{
					phase: 'Phase 1', years: 'Years 1–2', color: 'text-fli-blue-300', border: 'border-fli-blue-700/30', bg: 'bg-fli-blue-800/10',
					points: [
						'Launch inaugural season, secure major sponsors, grow streaming audience in US and international markets',
						'Launch gambling and fantasy opportunities, disc and bag licensing deals',
						'Line up first 5 casinos to vet for franchise fee deposits',
					]
				},
				{
					phase: 'Phase 2', years: 'Years 3–4', color: 'text-yellow-400', border: 'border-yellow-500/20', bg: 'bg-yellow-500/8',
					points: [
						'Secure market share in international markets and host larger-scale events',
						'Increase media rights revenue and betting partnerships',
						'Secure first 5 franchises at $5M–$10M each and begin vetting remaining 7 casinos',
					]
				},
				{
					phase: 'Phase 3', years: 'Year 5', color: 'text-green-400', border: 'border-green-500/20', bg: 'bg-green-500/8',
					points: [
						'Finalize all franchise sales and prepare for full-scale expansion into a global league format',
						'Potential IPO or major acquisition exit',
					]
				},
			] as phase}
				<div class="rounded-xl border {phase.border} {phase.bg} p-5">
					<div class="flex items-center gap-3 mb-3">
						<span class="text-sm font-black {phase.color}">{phase.phase}</span>
						<span class="text-xs text-white/35 bg-white/8 rounded-full px-2 py-0.5">{phase.years}</span>
					</div>
					<div class="space-y-2">
						{#each phase.points as point}
							<div class="flex items-start gap-2.5">
								<CheckCircle2 class="h-3.5 w-3.5 {phase.color} shrink-0 mt-0.5" />
								<span class="text-sm text-white/60 leading-snug">{point}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- 6. Exit Strategies -->
	<section id="exit" class="space-y-5">
		<h2 class="text-xl font-bold text-white border-b border-white/10 pb-3">6. Investor Exit Strategies & Returns</h2>
		<div class="rounded-xl border border-white/10 bg-navy-700/40 overflow-hidden">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/10 bg-white/5">
						<th class="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wide">Exit Strategy</th>
						<th class="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wide">Valuation Estimate</th>
						<th class="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wide">Investor 51% Share</th>
					</tr>
				</thead>
				<tbody>
					{#each exitScenarios as row}
						<tr class="border-b border-white/6 {row.highlight ? 'bg-yellow-500/8' : 'hover:bg-white/3'} transition-colors">
							<td class="px-4 py-3 font-medium {row.highlight ? 'text-yellow-300' : 'text-white'}">{row.strategy}</td>
							<td class="px-4 py-3 text-white/60">{row.valuation}</td>
							<td class="px-4 py-3 font-semibold {row.highlight ? 'text-yellow-400' : 'text-white/80'}">{row.share}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- 7. Team -->
	<section id="team" class="space-y-5">
		<h2 class="text-xl font-bold text-white border-b border-white/10 pb-3">7. Team & Advisory Board</h2>
		<div class="grid sm:grid-cols-3 gap-4">
			{#each [
				{ title: 'Leadership',          desc: 'Experienced sports execs, media professionals, and business leaders',          icon: Building2, color: 'text-brand-400',    border: 'border-brand-600/20',    bg: 'bg-brand-600/8' },
				{ title: 'Athlete Ambassadors', desc: 'Top-ranked disc golfers and influencers representing the FLI brand',           icon: Trophy,    color: 'text-yellow-400',   border: 'border-yellow-500/20',   bg: 'bg-yellow-500/8' },
				{ title: 'Strategic Advisors',  desc: 'Experts from golf, sports tech, and VC-backed startups',                       icon: Users,     color: 'text-fli-blue-300', border: 'border-fli-blue-700/20', bg: 'bg-fli-blue-800/10' },
			] as card}
				<div class="rounded-xl border {card.border} {card.bg} p-5">
					<svelte:component this={card.icon} class="h-5 w-5 {card.color} mb-3" />
					<div class="text-sm font-bold text-white mb-1">{card.title}</div>
					<div class="text-xs text-white/50 leading-relaxed">{card.desc}</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- 8. Risk Factors -->
	<section id="risk" class="space-y-5">
		<h2 class="text-xl font-bold text-white border-b border-white/10 pb-3">8. Risk Factors & Mitigation Strategies</h2>
		<div class="space-y-3">
			{#each [
				{ risk: 'Adoption & Market Growth',      mitigation: 'Proven demand in disc golf & sports betting ensures traction' },
				{ risk: 'Sponsorship & Revenue Stability', mitigation: 'Early brand partnerships + franchise sales mitigate risk' },
				{ risk: 'Operational Costs',             mitigation: 'Lean startup model with scalable expenses' },
				{ risk: 'Competitive Landscape',         mitigation: 'Unique format + exclusive venues = no direct competitor' },
			] as item}
				<div class="rounded-lg border border-white/8 bg-navy-700/40 p-4 flex items-start gap-4">
					<div class="min-w-0 flex-1">
						<div class="text-sm font-semibold text-white/80">{item.risk}</div>
						<div class="text-sm text-white/45 mt-0.5">{item.mitigation}</div>
					</div>
					<Shield class="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
				</div>
			{/each}
		</div>
	</section>

	<!-- 9. Conclusion -->
	<section id="conclusion" class="space-y-5">
		<h2 class="text-xl font-bold text-white border-b border-white/10 pb-3">9. Conclusion: Why Invest in FLI Golf League?</h2>
		<div class="rounded-xl border border-brand-500/40 bg-brand-600/10 p-6 space-y-4">
			<div class="grid sm:grid-cols-2 gap-3">
				{#each [
					'Ground-Floor Opportunity — first of its kind, with high growth potential',
					'Multi-Billion Dollar Industry — positioned at the intersection of sports, betting, and media',
					'Scalable, Franchise-Based Model — proven success in MLS, UFC, and LIV Golf',
					'Massive ROI Potential — projected valuations of $120M+ within 3 years',
				] as point}
					<div class="flex items-start gap-2.5">
						<CheckCircle2 class="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
						<span class="text-sm text-white/70 leading-snug">{point}</span>
					</div>
				{/each}
			</div>
			<p class="text-sm font-bold text-white pt-2 border-t border-white/10">
				Join Us in Revolutionizing Disc Golf & Sports Entertainment!
			</p>
		</div>
	</section>

	<!-- 10. Global Comparisons -->
	<section id="comparisons" class="space-y-5">
		<h2 class="text-xl font-bold text-white border-b border-white/10 pb-3">10. Additional Global Comparisons: Sports Leagues That Scaled Successfully</h2>
		<div class="grid sm:grid-cols-2 gap-4">
			{#each globalComparisons as comp}
				<div class="rounded-xl border {comp.border} {comp.bg} p-5">
					<div class="flex items-center gap-2 mb-3">
						<svelte:component this={comp.icon} class="h-4 w-4 {comp.color} shrink-0" />
						<div>
							<div class="text-sm font-bold text-white">{comp.league}</div>
							<div class="text-xs text-white/35">{comp.sport}</div>
						</div>
					</div>
					<div class="space-y-1.5">
						{#each comp.points as point}
							<div class="flex items-start gap-2">
								<ArrowRight class="h-3 w-3 {comp.color} shrink-0 mt-0.5" />
								<span class="text-xs text-white/55 leading-snug">{point}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- 11. Next Steps -->
	<section id="next-steps" class="space-y-5">
		<h2 class="text-xl font-bold text-white border-b border-white/10 pb-3">11. Next Steps for Investors & Partners</h2>
		<div class="space-y-2">
			{#each [
				'FLI Golf League follows a proven model used by MLS, UFC, IPL, and F1',
				'Early investors gain significant equity in a first-of-its-kind league with scalable global expansion',
				'Franchise sales, sponsorships, and media deals ensure long-term revenue stability',
				'Gender-equal format aligns with shifting global sports trends toward inclusivity and innovation',
			] as point}
				<div class="flex items-start gap-2.5">
					<CheckCircle2 class="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
					<span class="text-sm text-white/65 leading-snug">{point}</span>
				</div>
			{/each}
		</div>
		<div class="rounded-xl border border-yellow-500/40 bg-yellow-500/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
			<div>
				<div class="text-sm font-bold text-white mb-1">Ready to go deeper?</div>
				<div class="text-sm text-white/50">With the right investment and strategic partnerships, FLI Golf League has the potential to disrupt the disc golf industry and grow into a premier international sports league.</div>
			</div>
			<a href="/dashboard/investment-thesis" class="flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 transition-colors shrink-0">
				Investment Thesis <ArrowRight class="h-4 w-4" />
			</a>
		</div>
	</section>

</div>
