<script lang="ts">
	import { LineChart, AlertTriangle, CheckCircle2, XCircle, Target, ShieldCheck, ClipboardList, Megaphone, Flag } from 'lucide-svelte';

	const keyStats = [
		{ value: '$209M',   label: 'IPL revenue, Season 2 (2009)' },
		{ value: '€133.4M', label: 'Formula E revenue, 2018 (year 4)' },
		{ value: '$182.7M', label: 'FGL management-projected 2031 revenue' },
		{ value: '5 yrs',   label: 'Precedent window to cross $100M+' },
	];

	const precedentTable = [
		{ property: 'IPL', launch: '2008', milestone: '$209M in Season 2', accel: 'Condensed TV format; huge existing cricket audience; media rights; franchises; sponsors; stars' },
		{ property: 'Formula E', launch: '2014–15', milestone: '€133.44M in 2018; €161.53M in 2019', accel: 'EV/sustainability thesis; city races; manufacturers; sponsorship; promotion/licensing; capital' },
		{ property: 'FGL', launch: 'Build 2026; first season 2027', milestone: '$182.7M projected for 2031', accel: 'Stadium format; gender-equal teams; media; sponsorship; licensing; fantasy/gaming; technology' },
	];

	const ipl = [
		{ source: 'TV, mobile and digital rights', amount: '$100M', meaning: 'Audience proof rapidly repriced the media property' },
		{ source: 'League sponsorships', amount: '$40M', meaning: 'Central inventory captured national brand demand' },
		{ source: 'Collective team sponsorships', amount: '$60M', meaning: 'Franchises multiplied inventory and local identity' },
		{ source: 'Total estimated revenue', amount: '$209M', meaning: 'Commercial ecosystem mattered more than gate' },
	];

	const formulaE = [
		{ year: '2014', revenue: '€1.43M', loss: '€6.78M', comment: 'Pre-launch / launch-stage revenue' },
		{ year: '2015', revenue: '€20.99M', loss: '€62.18M', comment: 'First-season scale and major startup costs' },
		{ year: '2016', revenue: '€56.60M', loss: '€35.29M', comment: 'Commercial acceleration' },
		{ year: '2017', revenue: '€94.47M', loss: '€20.79M', comment: 'Sponsorship reached major scale' },
		{ year: '2018', revenue: '€133.44M', loss: '€26.41M', comment: 'Crossed €100M; ABB title sponsorship' },
		{ year: '2019', revenue: '€161.53M', loss: '€10.56M', comment: 'Continued growth; later reporting cited first underlying profit' },
	];

	const catalysts = [
		'Redesign an existing sport into a commercial product',
		'Use reach first, then reprice media',
		'Sell a strategic story, not only signage',
		'Create multiple inventories',
		'Use stars and strategic partners to accelerate trust',
		'Invest ahead of profitability',
		'Build an event people want to watch',
	];

	const architecture = [
		{ layer: 'Sponsorship', concept: 'Tournament naming rights, presenting partner, category partners, on-site inventory', evidence: 'Signed contracts; renewal rate; category exclusivity; fulfillment capacity; sponsor ROI reporting' },
		{ layer: 'Media / streaming', concept: 'Broad early distribution, then paid rights and potential exclusivity', evidence: 'Verified unique viewers, watch time, geography, retention, production quality and bidder interest' },
		{ layer: 'Ticketing / hospitality', concept: 'GA, Highflyer, meet-and-greet, rooftop lounge, media day, premium tables', evidence: 'Paid attendance, yield, capacity, acquisition cost, repeat purchase and per-cap spending' },
		{ layer: 'Licensing / merchandise', concept: 'Discs, bags, jerseys, trading cards and team products', evidence: 'Executed license terms, minimum guarantees, unit economics, sell-through and returns' },
		{ layer: 'Fantasy / gaming', concept: 'Premium fantasy, microtransactions and later betting-related economics', evidence: 'Active users, conversion, retention, ARPU, regulatory approvals and responsible-gaming controls' },
		{ layer: 'Subscriptions / community', concept: 'Low-cost consumer subscription and Discord-led engagement', evidence: 'Paid conversion, churn, engagement, acquisition cost and lifetime value' },
		{ layer: 'Technology / FLIHub', concept: 'Proprietary league operations, youth/program management, media asset management', evidence: 'Working product, security, adoption, renewal, support cost, IP ownership' },
		{ layer: 'Teams / future expansion', concept: 'Team brands and possible future franchise or participation economics', evidence: 'Governance, scarcity, stable league economics, owner demand and legal structure' },
	];

	const projections = [
		{ year: '2026', revenue: '$2.82M', note: 'Approx. -$1.79M; build year' },
		{ year: '2027', revenue: '$21.39M', note: 'Approx. +$1.08M; first six-event season' },
		{ year: '2028', revenue: '$29.97M', note: 'Approx. +$5.18M' },
		{ year: '2031', revenue: '$182.7M', note: 'Approx. +$85.5M; full international scale target' },
	];

	const phases = [
		{ phase: '2026 — Build', objective: 'Convert concept into launch-ready assets', proof: 'Capital closed; venue and production readiness; governing documents; core contracts; technology roadmap; sponsor pipeline; content and launch calendar' },
		{ phase: '2027 — First season', objective: 'Prove the event and audience product', proof: 'Six events delivered; verified attendance and viewership; sponsor fulfillment; safety and integrity record; fan data; unit economics; renewal conversations' },
		{ phase: '2028 — Monetization', objective: 'Convert proof into repeatable revenue', proof: 'Renewals and upsells; media revenue; licensing sell-through; fantasy adoption; repeat attendance; improved contribution margin' },
		{ phase: '2029–2030 — Expansion', objective: 'Replicate beyond inaugural configuration', proof: 'New venues/markets; standardized build; repeatable production; team value evidence; international and regulatory readiness' },
		{ phase: '2031 — Scale', objective: 'Support nine-figure revenue with durable operations', proof: 'Diversified contracted revenue; material media economics; global sponsors; scalable technology; capital discipline; mature governance and controls' },
	];

	const risks = [
		{ risk: 'Underlying audience gap', why: 'IPL began with a mass national sport; FGL begins with a smaller category', mitigation: 'Conservative audience assumptions; paid acquisition tests; verified watch-time and conversion data' },
		{ risk: 'Institutional leverage', why: 'IPL had BCCI backing; Formula E had FIA status and manufacturer alignment', mitigation: 'Binding partner agreements; recognized rules/governance; athlete participation; credible advisory and production teams' },
		{ risk: 'Media-rights uncertainty', why: 'Future rights value cannot be assumed from reach alone', mitigation: 'Distribution strategy, data ownership, measurement standards and documented buyer conversations' },
		{ risk: 'Sponsorship concentration', why: 'Large early deals may dominate results and create renewal risk', mitigation: 'Category diversification, credit review, payment security and renewal pipeline' },
		{ risk: 'Execution complexity', why: 'Six stadium-style events require production, safety and venue consistency', mitigation: 'Detailed runbooks, insurance, contingency budgets, qualified vendors and post-event reviews' },
		{ risk: 'Capital shortfall', why: 'Sports properties can fail between milestones despite growing interest', mitigation: 'Runway thresholds, staged commitments, downside case and financing calendar' },
		{ risk: 'Gaming regulation', why: 'Betting economics require approvals, controls and suitable partners', mitigation: 'Legal opinions, jurisdiction roadmap, integrity policy and no gaming revenue before authorization' },
		{ risk: 'Forecast compounding', why: 'Small misses in viewers, conversion, price or renewal compound materially', mitigation: 'Driver-based model, sensitivity tables and quarterly reforecasting' },
	];

	const stageGates = [
		'Gate 1 — Launch readiness: capital, venue, production, insurance, governance and core commercial commitments are sufficient.',
		'Gate 2 — Event replication: the first events meet safety, audience, sponsor and cost thresholds before the remaining calendar scales.',
		'Gate 3 — Media monetization: rights projections increase only after independent audience verification and buyer evidence.',
		'Gate 4 — Expansion: additional markets proceed only after standardized event economics and a funded operating plan.',
		'Gate 5 — Internationalization: country-level legal, tax, logistical and demand diligence is complete.',
	];

	const checklist = {
		'Corporate and governance': ['Formation documents, cap table and all outstanding securities', 'Board composition, reserved matters, conflicts and related-party policy', 'IP assignments, trademarks, player/team rights and material litigation'],
		'Commercial': ['Executed sponsorship, licensing, distribution, venue and vendor agreements', 'Pipeline report that separates signed, verbal, proposal and target', 'Revenue-recognition policies, payment schedules and cancellation rights'],
		'Financial': ['Integrated model and assumption book', 'Bank statements, historical spending and accounts payable', 'Use of funds, financing plan, downside case and monthly cash runway'],
		'Operations and risk': ['Event plan, safety program, insurance and emergency protocols', 'Production budget, vendor bids and contingency plan', 'Gaming integrity, privacy, cybersecurity and youth-safeguarding controls'],
		'Market proof': ['Audience research and acquisition tests', 'Ticket presales and sponsor demand evidence', 'Athlete commitments and fan/community engagement data'],
	};

	const avoidStatements = [
		'“FGL will be the first league ever to reach $100 million within five years.”',
		'“IPL and Formula E prove FGL will achieve its forecast.”',
		'“FGL is directly comparable to IPL or Formula E.”',
		'“Projected revenue is contracted revenue.”',
		'“Revenue growth guarantees profitability or investor returns.”',
	];

	const sources = [
		'[1] Forbes, "The World\'s Hottest Sports League," Aug. 27, 2009.',
		'[2] e-Formula.news, "2022 financial report: Formula E revenue & audience grow again," Aug. 20, 2023.',
		'[3] Formula E, Championship History — fiaformulae.com.',
		'[4] FIA, 2014–2015 Formula E Championship overview.',
		'[5] Forbes, "Why Formula E\'s Profits Have Been Slow To Rev Up," Nov. 24, 2019.',
		'[6] Liberty Global SEC filing, Formula E revenue-recognition disclosures, filed 2026.',
		'[7] Formula E, "Looking back through Formula E\'s key moments."',
		'[8] Financial Times, "Can cricket replicate the success of the Indian Premier League?", Sept. 20, 2024.',
		'[9] Reuters, "Global private equity firms bowled over by Indian cricket league IPL," Feb. 17, 2026.',
	];
</script>

<svelte:head>
	<title>Revenue Precedent Report — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-14">

	<!-- Header -->
	<div>
		<div class="text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-2">Board & Investor Research Report · September 2026</div>
		<h1 class="text-3xl font-black text-white">Can a New Sports Property Reach $100M in Annual Revenue Within Five Years?</h1>
		<p class="mt-2 text-white/50 max-w-3xl leading-relaxed">
			Historical precedents, revenue catalysts and implications for FLI Golf League. Management research report — confidential.
			Not an offering memorandum, fairness opinion, valuation report, audit, legal opinion or assurance engagement.
		</p>
	</div>

	<!-- Key stats -->
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
		{#each keyStats as stat}
			<div class="rounded-xl border border-white/15 bg-navy-700/50 p-4 text-center">
				<div class="text-2xl font-black text-white">{stat.value}</div>
				<div class="text-xs text-white/40 mt-1 leading-snug">{stat.label}</div>
			</div>
		{/each}
	</div>

	<!-- Executive conclusion -->
	<section id="executive-conclusion" class="space-y-4">
		<h2 class="text-lg font-bold text-white">1. Executive Conclusion</h2>
		<div class="rounded-xl border border-brand-500/60 bg-brand-600/10 p-6">
			<div class="flex items-center gap-2 mb-2">
				<CheckCircle2 class="h-4 w-4 text-brand-400" />
				<span class="font-bold text-white">Answer: Yes</span>
			</div>
			<p class="text-sm text-white/70 leading-relaxed">
				At least two prominent modern sports properties crossed the equivalent of $100 million in annual revenue within
				approximately five years of launch: the Indian Premier League (IPL) and Formula E. The growth was exceptional,
				capital-intensive and dependent on powerful catalysts. These examples establish that FGL's ambition is not without
				precedent — they do not establish that the forecast is likely.
			</p>
		</div>

		<div class="overflow-x-auto rounded-xl border border-white/10">
			<table class="w-full text-sm">
				<thead>
					<tr class="bg-white/5 border-b border-white/10">
						<th class="text-left px-4 py-3 font-semibold text-white/60">Property</th>
						<th class="text-left px-4 py-3 font-semibold text-white/60">Launch</th>
						<th class="text-left px-4 py-3 font-semibold text-white/60">Early revenue milestone</th>
						<th class="text-left px-4 py-3 font-semibold text-white/60">Primary early accelerators</th>
					</tr>
				</thead>
				<tbody>
					{#each precedentTable as row, i}
						<tr class="border-b border-white/5 {i % 2 === 0 ? 'bg-white/[0.02]' : ''} {row.property === 'FGL' ? 'bg-brand-600/5' : ''}">
							<td class="px-4 py-3 font-semibold {row.property === 'FGL' ? 'text-brand-400' : 'text-white/80'} align-top">{row.property}</td>
							<td class="px-4 py-3 text-white/60 align-top">{row.launch}</td>
							<td class="px-4 py-3 text-white/80 align-top font-medium">{row.milestone}</td>
							<td class="px-4 py-3 text-white/60 align-top leading-relaxed">{row.accel}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="text-xs text-white/30">Sources: Forbes (IPL); e-Formula.news compilation of Formula E Operations filings. FGL values are management projections.</p>
	</section>

	<!-- IPL case study -->
	<section id="ipl-case-study" class="space-y-4">
		<h2 class="text-lg font-bold text-white">2. Indian Premier League Case Study</h2>
		<p class="text-sm text-white/60 leading-relaxed max-w-3xl">
			The IPL commercialized a condensed version of cricket: Twenty20 compressed a match to about three hours, adding
			privately owned city franchises, a player auction, celebrity involvement, team identities and dense sponsorship
			integration. Forbes estimated $209M in revenue and $89M in aggregate operating profit in its second season.
		</p>
		<div class="overflow-x-auto rounded-xl border border-white/10">
			<table class="w-full text-sm">
				<thead>
					<tr class="bg-white/5 border-b border-white/10">
						<th class="text-left px-4 py-3 font-semibold text-white/60">Season 2 revenue source</th>
						<th class="text-left px-4 py-3 font-semibold text-white/60">Amount</th>
						<th class="text-left px-4 py-3 font-semibold text-white/60">Strategic meaning</th>
					</tr>
				</thead>
				<tbody>
					{#each ipl as row, i}
						<tr class="border-b border-white/5 {i % 2 === 0 ? 'bg-white/[0.02]' : ''} {row.source.startsWith('Total') ? 'bg-white/5 font-semibold' : ''}">
							<td class="px-4 py-3 text-white/80 align-top">{row.source}</td>
							<td class="px-4 py-3 text-white/90 align-top font-medium">{row.amount}</td>
							<td class="px-4 py-3 text-white/60 align-top leading-relaxed">{row.meaning}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="text-xs text-white/30">The IPL launched into a sport with enormous national demand, established infrastructure, major broadcasters, star players and corporate ownership — FGL cannot assume comparable audience depth or institutional leverage. The transferable lesson is the product and revenue architecture, not the absolute speed or scale.</p>
	</section>

	<!-- Formula E case study -->
	<section id="formula-e-case-study" class="space-y-4">
		<h2 class="text-lg font-bold text-white">3. Formula E Case Study</h2>
		<p class="text-sm text-white/60 leading-relaxed max-w-3xl">
			Formula E launched its first championship season in 2014–15 as an all-electric international single-seater series,
			racing in major city centers and positioning itself at the intersection of sport, EV technology, sustainability and
			urban entertainment.
		</p>
		<div class="overflow-x-auto rounded-xl border border-white/10">
			<table class="w-full text-sm">
				<thead>
					<tr class="bg-white/5 border-b border-white/10">
						<th class="text-left px-4 py-3 font-semibold text-white/60">Year</th>
						<th class="text-left px-4 py-3 font-semibold text-white/60">Revenue</th>
						<th class="text-left px-4 py-3 font-semibold text-white/60">Reported loss</th>
						<th class="text-left px-4 py-3 font-semibold text-white/60">Comment</th>
					</tr>
				</thead>
				<tbody>
					{#each formulaE as row, i}
						<tr class="border-b border-white/5 {i % 2 === 0 ? 'bg-white/[0.02]' : ''} {row.year === '2018' ? 'bg-brand-600/5' : ''}">
							<td class="px-4 py-3 font-semibold text-white/80 align-top">{row.year}</td>
							<td class="px-4 py-3 text-white/90 align-top font-medium">{row.revenue}</td>
							<td class="px-4 py-3 text-white/50 align-top">{row.loss}</td>
							<td class="px-4 py-3 text-white/60 align-top leading-relaxed">{row.comment}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5 flex items-start gap-3">
			<AlertTriangle class="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
			<p class="text-xs text-white/60 leading-relaxed">
				<span class="font-semibold text-yellow-400">Capital warning:</span> a league can cross $100 million in revenue and
				remain loss-making. Formula E's revenue growth coexisted with large losses and acute financing risk before its
				first underlying profit, cited in later reporting for 2019.
			</p>
		</div>
	</section>

	<!-- Seven catalysts -->
	<section id="revenue-catalysts" class="space-y-4">
		<h2 class="text-lg font-bold text-white">4. The Seven Revenue Catalysts</h2>
		<div class="grid sm:grid-cols-2 gap-3">
			{#each catalysts as c, i}
				<div class="rounded-lg border border-white/10 bg-navy-700/40 p-4 flex items-start gap-3">
					<span class="h-6 w-6 rounded-full bg-brand-600/20 text-brand-400 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
					<p class="text-sm text-white/70 leading-relaxed">{c}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- FGL revenue architecture -->
	<section id="fgl-architecture" class="space-y-4">
		<h2 class="text-lg font-bold text-white">5. FGL Revenue Architecture & Growth Logic</h2>
		<p class="text-sm text-white/60 leading-relaxed max-w-3xl">
			FGL's planning model is a layered sports-and-entertainment platform, not a ticket-only thesis. Each layer carries a
			specific proof requirement and a conservative ramp tied to actual contracts and adoption data.
		</p>
		<div class="overflow-x-auto rounded-xl border border-white/10">
			<table class="w-full text-sm">
				<thead>
					<tr class="bg-white/5 border-b border-white/10">
						<th class="text-left px-4 py-3 font-semibold text-white/60">Revenue layer</th>
						<th class="text-left px-4 py-3 font-semibold text-white/60">FGL concept</th>
						<th class="text-left px-4 py-3 font-semibold text-white/60">Required evidence before scale assumption</th>
					</tr>
				</thead>
				<tbody>
					{#each architecture as row, i}
						<tr class="border-b border-white/5 {i % 2 === 0 ? 'bg-white/[0.02]' : ''}">
							<td class="px-4 py-3 font-semibold text-white/80 align-top">{row.layer}</td>
							<td class="px-4 py-3 text-white/60 align-top leading-relaxed">{row.concept}</td>
							<td class="px-4 py-3 text-white/60 align-top leading-relaxed">{row.evidence}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
			{#each projections as p}
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-4 text-center">
					<div class="text-xs text-white/40">{p.year}</div>
					<div class="text-xl font-black text-white mt-1">{p.revenue}</div>
					<div class="text-xs text-white/40 mt-1 leading-snug">{p.note}</div>
				</div>
			{/each}
		</div>
		<p class="text-xs text-white/30">Source: current FGL management planning figures. The complete annual model, including 2029–2030, controls and should be attached separately in the data room.</p>
	</section>

	<!-- Phases -->
	<section id="proof-by-phase" class="space-y-4">
		<h2 class="text-lg font-bold text-white">6. What Must Be Proven by Phase</h2>
		<div class="space-y-3">
			{#each phases as p}
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5">
					<div class="flex items-center gap-2 mb-2">
						<Flag class="h-4 w-4 text-brand-400 shrink-0" />
						<span class="font-bold text-white text-sm">{p.phase}</span>
						<span class="text-xs text-white/40">— {p.objective}</span>
					</div>
					<p class="text-xs text-white/50 leading-relaxed">{p.proof}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Risks -->
	<section id="risks-failure-modes" class="space-y-4">
		<h2 class="text-lg font-bold text-white">7. Material Differences, Risks & Failure Modes</h2>
		<div class="overflow-x-auto rounded-xl border border-white/10">
			<table class="w-full text-sm">
				<thead>
					<tr class="bg-white/5 border-b border-white/10">
						<th class="text-left px-4 py-3 font-semibold text-white/60 w-48">Risk / difference</th>
						<th class="text-left px-4 py-3 font-semibold text-white/60">Why it matters</th>
						<th class="text-left px-4 py-3 font-semibold text-white/60">Mitigation / diligence evidence</th>
					</tr>
				</thead>
				<tbody>
					{#each risks as row, i}
						<tr class="border-b border-white/5 {i % 2 === 0 ? 'bg-white/[0.02]' : ''}">
							<td class="px-4 py-3 font-semibold text-yellow-400/90 align-top">{row.risk}</td>
							<td class="px-4 py-3 text-white/60 align-top leading-relaxed">{row.why}</td>
							<td class="px-4 py-3 text-white/60 align-top leading-relaxed">{row.mitigation}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- Board oversight -->
	<section id="board-oversight" class="space-y-4">
		<h2 class="text-lg font-bold text-white">8. Board Oversight Framework</h2>
		<p class="text-sm text-white/60 leading-relaxed max-w-3xl">
			The Board should evaluate the $100 million-plus plan as a staged portfolio of hypotheses rather than one indivisible
			forecast, distinguishing contracted, probable, pipeline and conceptual revenue.
		</p>
		<div class="space-y-2">
			{#each stageGates as gate}
				<div class="flex items-start gap-3 rounded-lg border border-white/10 bg-navy-700/40 p-3">
					<ShieldCheck class="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
					<p class="text-xs text-white/60 leading-relaxed">{gate}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Diligence checklist -->
	<section id="diligence-checklist" class="space-y-4">
		<h2 class="text-lg font-bold text-white">9. Investor Diligence Checklist</h2>
		<div class="grid sm:grid-cols-2 gap-4">
			{#each Object.entries(checklist) as [group, items]}
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5">
					<div class="flex items-center gap-2 mb-3">
						<ClipboardList class="h-4 w-4 text-brand-400 shrink-0" />
						<span class="font-bold text-white text-sm">{group}</span>
					</div>
					<ul class="space-y-1.5">
						{#each items as item}
							<li class="text-xs text-white/60 leading-relaxed flex items-start gap-2">
								<span class="h-1 w-1 rounded-full bg-white/30 mt-1.5 shrink-0"></span>
								{item}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>

	<!-- Positioning -->
	<section id="external-positioning" class="space-y-4">
		<h2 class="text-lg font-bold text-white">10. Recommended External Positioning</h2>
		<div class="rounded-xl border border-brand-500/60 bg-brand-600/10 p-6">
			<div class="flex items-center gap-2 mb-2">
				<Megaphone class="h-4 w-4 text-brand-400" />
				<span class="font-bold text-white">Defensible statement</span>
			</div>
			<p class="text-sm text-white/70 leading-relaxed">
				While rare, sports properties have demonstrated that a newly launched league can scale to more than $100 million
				in annual revenue within five years. Formula E grew from approximately €1.4 million in 2014 to €133.4 million in
				2018, while Forbes estimated the IPL generated $209 million in its second season. FGL's plan therefore follows a
				historically demonstrated — but exceptional — growth trajectory. Execution, capitalization and market adoption
				remain decisive.
			</p>
		</div>
		<div class="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
			<div class="flex items-center gap-2 mb-2">
				<XCircle class="h-4 w-4 text-red-400" />
				<span class="font-bold text-white text-sm">Statements to avoid</span>
			</div>
			<ul class="space-y-1.5">
				{#each avoidStatements as s}
					<li class="text-xs text-white/50 leading-relaxed italic">{s}</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- Conclusion -->
	<section id="conclusion" class="space-y-4">
		<h2 class="text-lg font-bold text-white">11. Conclusion</h2>
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
			<div class="flex items-center gap-2 mb-2">
				<Target class="h-4 w-4 text-brand-400" />
				<span class="font-bold text-white">Final Board and investor conclusion</span>
			</div>
			<p class="text-sm text-white/70 leading-relaxed">
				FGL's 2031 revenue ambition is not historically unprecedented. It is, however, an exceptional outcome that should
				be underwritten only through staged proof, conservative modeling, strong governance, adequate capital and
				transparent reporting.
			</p>
		</div>
	</section>

	<!-- Sources -->
	<section id="sources" class="space-y-3">
		<h2 class="text-lg font-bold text-white">Sources & Research Notes</h2>
		<ul class="space-y-1">
			{#each sources as s}
				<li class="text-xs text-white/30 leading-relaxed">{s}</li>
			{/each}
		</ul>
		<p class="text-xs text-white/20 pt-2 border-t border-white/10">
			Some early league figures are journalistic estimates rather than audited public financial statements. Revenue
			definitions vary between league, operating company, teams and consolidated ecosystems. This report should be
			refreshed before any financing or major data-room update.
		</p>
	</section>

</div>
