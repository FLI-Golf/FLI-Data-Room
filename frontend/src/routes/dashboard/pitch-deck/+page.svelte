<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	const forecast = [
		{ year: '2026', sales: '$2,824,000',   cogs: '$1,800,000',  expenses: '$2,813,129',  profit: '—',           margin: '—' },
		{ year: '2027', sales: '$21,392,200',  cogs: '$11,765,000', expenses: '$8,540,608',  profit: '$1,086,592',  margin: '5.08%' },
		{ year: '2028', sales: '$29,970,500',  cogs: '$14,760,000', expenses: '$10,024,314', profit: '$5,186,187',  margin: '17.30%' },
		{ year: '2029', sales: '$62,783,500',  cogs: '$23,511,018', expenses: '$18,082,705', profit: '$21,189,778', margin: '33.75%' },
		{ year: '2030', sales: '$113,180,050', cogs: '$38,271,105', expenses: '$30,913,706', profit: '$43,995,239', margin: '38.87%' },
		{ year: '2031', sales: '$182,733,473', cogs: '$54,961,398', expenses: '$42,247,747', profit: '$85,524,327', margin: '46.80%' },
	];

	const platforms = [
		{ name: 'Fantasy App',         stage1: '$500K–$1.5M',  stage2: '$2M–$8M',   full: '$10M–$50M+',  status: 'BUILT' },
		{ name: 'Discord Community',   stage1: '$100K–$500K',  stage2: '$500K–$2M', full: '$2M–$10M+',   status: 'LIVE' },
		{ name: 'FLIHUB League OS',    stage1: '$250K–$750K',  stage2: '$1M–$3M',   full: '$5M–$15M+',   status: 'ACTIVE' },
		{ name: 'AI Draft System',     stage1: '$250K–$750K',  stage2: '$1M–$5M',   full: '$5M–$25M+',   status: 'ACTIVE' },
		{ name: 'AI Production Infra', stage1: '$500K–$2M',    stage2: '$3M–$10M',  full: '$10M–$50M+',  status: 'SECURED' },
	];

</script>
<svelte:head><title>Pitch Deck — FLI Golf League</title></svelte:head>
<div class="space-y-16 max-w-5xl">
<!-- COVER -->
<section id="overview" class="rounded-2xl border border-white/10 bg-navy-800/60 p-10 text-center space-y-6">
	<div class="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-600/10 px-4 py-1.5 text-xs font-semibold text-white uppercase tracking-widest">
		Confidential · Presented by Young America Capital
	</div>
	<div>
		<h1 class="text-4xl font-black text-white tracking-tight leading-tight">FLI GOLF LEAGUE</h1>
		<p class="mt-2 text-lg font-bold text-white uppercase tracking-widest">Stadium-Style Professional Disc Golf</p>
		<p class="mt-3 text-white text-sm max-w-xl mx-auto">Engineered for Media, Betting &amp; Franchise Scale · Building the Operating System for the Future of Sports</p>
	</div>
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
		{#each [
			{ stat: '$18B+',  label: 'Addressable SAM by 2030' },
			{ stat: '20M+',   label: 'Global Players' },
			{ stat: '86%',    label: 'Growth Since 2020' },
			{ stat: '5',      label: 'Proprietary Tech Platforms' },
		] as item}
			<div class="rounded-xl border border-white/10 bg-navy-950/60 p-4">
				<div class="text-2xl font-black text-brand-400">{item.stat}</div>
				<div class="text-xs text-white mt-1">{item.label}</div>
			</div>
		{/each}
	</div>
	<div class="pt-2 space-y-1">
		<p class="text-white font-black text-lg tracking-widest">FAIRWAYS. GREENS. LEGENDS.</p>
		<p class="text-white text-xs">5 Proprietary Tech Platforms · $150M+ Combined Value Potential</p>
		<p class="text-white text-xs">Fantasy App · Discord Community · FLIHUB OS · AI Draft System · AI Production</p>
	</div>
</section>
<!-- DISCLAIMER -->
<section id="disclaimer" class="rounded-xl border border-white/10 bg-navy-950/80 p-8 space-y-6">
	<div class="flex items-center gap-3 border-b border-white/10 pb-4">
		<span class="rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-bold text-yellow-400 uppercase tracking-widest">Legal &amp; Compliance</span>
		<span class="text-xs text-white">FINRA / SEC Disclaimer</span>
	</div>
	<div class="space-y-4 text-xs text-white leading-relaxed">
		<p>This Presentation (the "Presentation") contains sensitive business and financial information. It is being delivered on behalf of the Company by Young America Capital, LLC ("YAC"). The sole purpose of this Presentation is to assist the recipient in deciding whether to proceed with a further inquiry of the Company. This Presentation does not purport to be all-inclusive or to necessarily contain all the information that a prospective investor may desire in evaluating a possible business transaction with the Company. By accepting this Presentation, the recipient agrees to keep confidential the information contained herein or made available in connection with any further inquiry of the Company. This Presentation may not be photocopied, reproduced, or distributed to others at any time without the prior written consent of Young America Capital, LLC.</p>
		<p>Neither the Company nor YAC makes any express or implied representation or warranty as to the accuracy or completeness of the information contained herein. The recipient shall be entitled to rely solely on the representations and warranties made to it in any definitive agreement and the due diligence that recipient conducts. This Presentation does not constitute an offer to sell or solicitation of an offer to buy securities in any jurisdiction where, or to any person to whom, it is unlawful to make such offer or solicitation. Investments in private placements may be illiquid, highly speculative and you may lose your entire investment.</p>
		<div class="border-t border-white/10 pt-4">
			<p class="font-semibold text-white mb-2">Cautionary Statement Concerning Forward Looking Statements</p>
			<p>This document contains forward-looking statements. We base these forward-looking statements on our expectations and projections about future events, which we derive from the information currently available to us. Such forward-looking statements relate to future events or our future performance, including: our financial performance and projections; our growth in revenue and earnings; and our business prospects and opportunities. Forward-looking statements are only predictions. Actual events and results may differ materially and are subject to risks, uncertainties, and assumptions about us. We are not obligated to publicly update or revise any forward-looking statement.</p>
		</div>
		<ul class="list-disc list-inside space-y-1 pt-2">
			<li>If we experience significant disruptions in our information technology systems, our business may be adversely affected.</li>
			<li>Security and privacy breaches may expose us to liability and harm our reputation and business.</li>
			<li>We may be unable to enforce our intellectual property rights throughout the world.</li>
			<li>If we are unable to successfully expand our sales and customer support team, it could negatively impact sales and market acceptance of our products.</li>
			<li>The trademarked logos in player images are for example and placeholding only. They DO NOT represent current league sponsors or advertising partners.</li>
		</ul>
	</div>
</section>
<!-- OPPORTUNITY -->
<section id="the-opportunity" class="space-y-6">
	<div>
		<p class="text-xs font-semibold text-white uppercase tracking-widest mb-1">The Opportunity</p>
		<h2 class="text-2xl font-black text-white">One Category. Zero Competition.</h2>
		<p class="mt-2 text-white/50 text-sm max-w-2xl">FLI Golf League is creating the world's first stadium-style professional disc golf league — engineered for media, betting, and franchise scale from Day 1. Built on 5 proprietary technology platforms, FGL is not just a sports league. It's the operating system for the future of sports entertainment.</p>
	</div>
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
		{#each [
			{ stat: '100+',   label: 'Countries Playing Disc Golf' },
			{ stat: '20M+',   label: 'Active Players Worldwide' },
			{ stat: '17,287', label: 'Courses — 3 Built Every Day' },
			{ stat: '86%',    label: 'Participation Growth Since 2020' },
		] as item}
			<div class="rounded-xl border border-white/10 bg-navy-800/50 p-5 text-center">
				<div class="text-2xl font-black text-brand-400">{item.stat}</div>
				<div class="text-xs text-white mt-1">{item.label}</div>
			</div>
		{/each}
	</div>
	<div class="grid sm:grid-cols-2 gap-4">
		<div class="rounded-xl border border-white/10 bg-navy-800/50 p-6 space-y-3">
			<p class="text-xs font-bold text-white uppercase tracking-widest">The League Advantage</p>
			<p class="text-sm text-white/60 leading-relaxed">No stadium-style disc golf league exists anywhere in the world. No franchise model. No sportsbook integration. No gender-equal payout. No AI-powered broadcast infrastructure. FGL is not entering a market — it is creating one, with every structural advantage locked in before Day 1.</p>
		</div>
		<div class="rounded-xl border border-white/10 bg-navy-800/50 p-6 space-y-3">
			<p class="text-xs font-bold text-white uppercase tracking-widest">The Technology Advantage</p>
			<p class="text-sm text-white/60 leading-relaxed">5 proprietary tech platforms — Fantasy App, Discord Community, FLIHUB League OS, AI Draft System, and AI Production Infrastructure — create compounding defensibility, SaaS licensing upside, and a combined platform value potential that no sports competitor can replicate.</p>
			<div class="grid grid-cols-3 gap-3 pt-2">
				{#each [
					{ stat: '5',      label: 'Proprietary Platforms' },
					{ stat: '$150M+', label: 'Combined Value Potential' },
					{ stat: '$18B+',  label: 'Addressable SAM 2030' },
				] as item}
					<div class="text-center">
						<div class="text-lg font-black text-yellow-400">{item.stat}</div>
						<div class="text-xs text-white">{item.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<p class="text-xs text-white/25 italic">Picture images for illustrative purposes only. Past performance is not indicative of future results. An investment in the Company's securities is speculative, illiquid and there may be a total risk of loss.</p>
</section>
<!-- WHY NOW -->
<section id="why-now" class="space-y-6">
	<div>
		<p class="text-xs font-semibold text-white uppercase tracking-widest mb-1">Why Disc Golf. Why Now.</p>
		<h2 class="text-2xl font-black text-white">The Sport. The Moment. The Technology.</h2>
	</div>
	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each [
			{ stat: '500B+',        label: 'Digital Demand Signal',       body: 'TikTok #discgolf has surpassed 500B global views. JomezPro: 441K subscribers, 237M+ YouTube views. This does not include FGL entertainment features like celebrity appearances and music performances.', arrow: 'Fuels Fantasy App & Discord Growth' },
			{ stat: '20M+',         label: 'Global Participation Base',   body: 'Over 20M active players worldwide. PDGA membership doubled in 4 years. 86% surge in participation since 2020. The audience is already here — FGL gives it a professional home.', arrow: 'Built-In Fan Base for Every Platform' },
			{ stat: '$18B+',        label: 'Growing FGL SAM in 2030',     body: 'New revenue streams introduced by FGL — gaming, franchise, SaaS licensing, AI broadcast — will dramatically increase the revenue and value potential of the sport globally. Core market growing at 15% CAGR since 2019.', arrow: '$150M+ Tech Platform Value on Top' },
			{ stat: '89%',          label: 'Low-Cost, High-Access Sport', body: '89% of 17,287 courses are FREE. 500M people live within 6 miles of a course. The lowest barrier to entry of any professional sport drives mass participation and a massive addressable audience.', arrow: 'Widest Possible Funnel for FGL Platforms' },
			{ stat: '18–34',        label: 'Young, Digital-Native Demo',  body: "Disc golf's dominant demographic is 18–34 and spending-ready — the most valuable audience in sports. Digital-native, betting-engaged, fantasy-active, and perfectly aligned with every FGL technology platform.", arrow: 'Prime Audience for Betting & Fantasy' },
			{ stat: '$1.3B→$2.5B', label: 'Core DG Product Market',      body: 'Core product market growing from $1.3B in 2025 to $2.5B by 2030, continuing at an average 15% CAGR growth rate since 2019. FGL\'s tech and gaming layers stack on top of this baseline growth.', arrow: 'FGL Revenue Streams Are Additive' },
		] as item}
			<div class="rounded-xl border border-white/10 bg-navy-800/50 p-5 space-y-2">
				<div class="text-xl font-black text-brand-400">{item.stat}</div>
				<div class="text-xs font-bold text-white uppercase tracking-wide">{item.label}</div>
				<p class="text-xs text-white leading-relaxed">{item.body}</p>
				<p class="text-xs text-yellow-400/80 font-medium">→ {item.arrow}</p>
			</div>
		{/each}
	</div>
	<p class="text-xs text-white/25 italic">Past performance is not indicative of future results. An investment in the Company's securities is speculative, illiquid and there may be a total risk of loss.</p>
</section>
<!-- PROBLEM -->
<section id="limitations" class="space-y-6">
	<div>
		<p class="text-xs font-semibold text-white uppercase tracking-widest mb-1">The Problem</p>
		<h2 class="text-2xl font-black text-white">The Barriers Holding Disc Golf Back</h2>
		<p class="mt-2 text-white/50 text-sm">Disc golf has the players, the passion, and the growth. What it has never had is the infrastructure to match its potential.</p>
	</div>
	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each [
			{ title: 'Venue Limitations',        impact: 'Zero Live Event Revenue Potential',  body: 'Wooded park courses limit spectator capacity, camera angles, and the live event experience — making it nearly impossible to build a stadium atmosphere or deliver broadcast-quality production.' },
			{ title: 'No Broadcast Engineering', impact: 'No Media Rights Value',              body: 'Current productions suffer from poor lighting, obstructed sightlines, and no live disc tracking technology — leaving the viewing experience far behind every other major professional sport.' },
			{ title: 'No Gender-Equal Payout',   impact: 'Sponsorship Ceiling Remains Low',   body: 'Not a single major disc golf tour offers identical male and female prize pools — leaving the sport behind modern standards and alienating a significant portion of its fanbase and potential sponsors.' },
			{ title: 'No Franchise Model',       impact: 'No Scalable Asset Value',            body: 'Zero team ownership structure exists across any disc golf organization — eliminating the fan loyalty, territorial expansion, and institutional investment that drives every major professional sports league.' },
			{ title: 'No Gaming or Sportsbook',  impact: 'Billions in Revenue Left on Table', body: 'Despite explosive growth in sports betting and fantasy sports, no disc golf tour has formalized a single sportsbook or fantasy platform partnership — leaving billions in revenue completely untapped.' },
		] as item}
			<div class="rounded-xl border border-brand-600/30 bg-brand-600/5 p-5 space-y-2">
				<div class="flex items-start gap-2">
					<span class="text-brand-400 font-black text-lg leading-none mt-0.5">✕</span>
					<div>
						<div class="text-sm font-bold text-white">{item.title}</div>
						<div class="text-xs text-brand-400/80 font-medium mt-0.5">Impact: {item.impact}</div>
					</div>
				</div>
				<p class="text-xs text-white leading-relaxed">{item.body}</p>
			</div>
		{/each}
	</div>
	<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
		<p class="text-sm text-yellow-300 font-medium">Every one of these barriers has been identified, engineered around, and solved by FLI Golf League before the inaugural season begins.</p>
	</div>
</section>
<!-- SOLUTION -->
<section id="built-different" class="space-y-6">
	<div>
		<p class="text-xs font-semibold text-white uppercase tracking-widest mb-1">The Solution</p>
		<h2 class="text-2xl font-black text-white">The FGL Fix — Built Before Day 1</h2>
		<p class="mt-1 text-xs font-bold text-yellow-400 tracking-wide">★ TOP 24 WORLD-RANKED PLAYERS — ALL COMMITTED ★</p>
	</div>
	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each [
			{ title: 'Stadium-Engineered Course',    arrow: 'Engineered for Broadcast & Betting',       body: 'Custom par-3 stadium — front-row seating, controlled lighting, and optimal camera angles. Every hole designed for fans in the stands and viewers at home. The venue limitation is eliminated entirely.' },
			{ title: 'Emmy-Winning Broadcast + AI',  arrow: 'AI Production Infrastructure Active',      body: 'GK Productions secured. 13-time Emmy winner Mark Coleman leads production. Paired with AI-powered autonomous disc tracking delivering real-time flight path overlays live — a first in disc golf broadcast history.' },
			{ title: '100% Gender-Equal Payout',     arrow: 'Expands Sponsor & Media Value',            body: 'The first disc golf league with identical male and female prize pools — total parity from the inaugural season. Unlocks premium sponsorship categories and broadens the addressable fanbase immediately.' },
			{ title: '1st Franchisable DG League',   arrow: 'FLIHUB League OS Powers Expansion',        body: 'Contracted teams with ownership stakes, territorial rights, and growing global fan bases — managed through FLIHUB, FGL\'s proprietary league operating system, built for multi-city expansion from Day 1.' },
			{ title: 'Tribal Gaming + Fantasy',      arrow: 'Fantasy App + AI Draft System Live',       body: 'Gary Santos: 23 years tribal governance, IGA Board 10+ years, sportsbook pipeline built. Combined with a fully built fantasy platform featuring digital player assets, draft leagues, and skill-based contests — activating at Season 1 launch.' },
		] as item}
			<div class="rounded-xl border border-fli-blue-700/40 bg-fli-blue-900/20 p-5 space-y-2">
				<div class="flex items-start gap-2">
					<span class="text-green-400 font-black text-lg leading-none mt-0.5">✓</span>
					<div class="text-sm font-bold text-white">{item.title}</div>
				</div>
				<p class="text-xs text-white/55 leading-relaxed">{item.body}</p>
				<p class="text-xs text-yellow-400/80 font-medium">→ {item.arrow}</p>
			</div>
		{/each}
	</div>
	<div class="rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-center">
		<p class="text-sm text-green-300 font-medium">Every problem from the previous slide has a direct, built, and contracted solution already in place. This is not a roadmap. This is a reality.</p>
	</div>
	<p class="text-xs text-white/25 italic">Past performance is not indicative of future results. An investment in the Company's securities is speculative, illiquid and there may be a total risk of loss.</p>
</section>
<!-- TECH -->
<section id="broadcast" class="space-y-6">
	<div>
		<p class="text-xs font-semibold text-white uppercase tracking-widest mb-1">Tech Infrastructure · Platform 01–05</p>
		<h2 class="text-2xl font-black text-white">Built for Broadcast Scale</h2>
		<p class="mt-2 text-white/50 text-sm max-w-2xl">Five proprietary systems — integrated, owned, and activated at Season 1 launch. No disc golf organization has ever assembled this stack. FGL is not just a sports league — it is a technology company operating through sport.</p>
	</div>
	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each [
			{ badge: 'BUILT',    badgeColor: 'bg-green-500/15 text-green-400',   label: '1st in Disc Golf History',      title: 'Fantasy App & Website',          value: '$500K–$1.5M → $10M–$50M+',  body: 'League-backed fantasy platform with draft leagues, digital player packs, skill-based contests, and live hole-by-hole scoring. Zero integration delay — fully activates at Season 1 launch.' },
			{ badge: 'LIVE',     badgeColor: 'bg-brand-500/15 text-brand-400',   label: 'Live On-Screen Tracking',       title: 'Disc Tracking Live Overlay',     value: 'First in Live Disc Golf Broadcast', body: 'Real-time disc flight path tracking delivered as a live broadcast overlay. Current productions only use disc tracking on replay — FGL brings it live. A first for live disc golf broadcast.' },
			{ badge: 'SECURED',  badgeColor: 'bg-yellow-500/15 text-yellow-400', label: '13× Emmy-Winning Team',         title: 'Streaming Production',           value: '$500K–$2M → $10M–$50M+',    body: 'Stadium-engineered broadcast with multi-camera rigs, controlled lighting, and GK Productions delivering live and on-demand content. Built for global distribution from the first event.' },
			{ badge: 'SCALABLE', badgeColor: 'bg-fli-blue-700/20 text-fli-blue-400', label: 'Global Infrastructure',    title: 'Cloud Storage & Distribution',   value: 'Built for Multi-City Expansion', body: 'Scalable cloud architecture for live event delivery, VOD, and cross-platform fan access across all devices. Designed for multi-city franchise expansion from Day 1.' },
			{ badge: 'ACTIVE',   badgeColor: 'bg-purple-500/15 text-purple-400', label: 'Monetizable Content Library',  title: 'Media Asset Management',         value: 'Every Moment Monetizable',   body: 'Centralized MAM system for tagging, archiving, and licensing all league footage — sponsorship reels, highlight clips, and broadcast rights. Every moment is a monetizable asset.' },
		] as p}
			<div class="rounded-xl border border-white/10 bg-navy-800/50 p-5 space-y-2">
				<div class="flex items-center justify-between">
					<span class="text-xs text-white">{p.label}</span>
					<span class="rounded-full px-2 py-0.5 text-xs font-bold {p.badgeColor}">● {p.badge}</span>
				</div>
				<div class="text-sm font-bold text-white">{p.title}</div>
				<p class="text-xs text-white leading-relaxed">{p.body}</p>
				<p class="text-xs text-yellow-400/70 font-medium">{p.value}</p>
			</div>
		{/each}
	</div>
	<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
		<p class="text-xs text-yellow-300 font-semibold">Combined Full-Scale Ecosystem Value Potential: $150M+ &nbsp;|&nbsp; 5 Proprietary Platforms &nbsp;|&nbsp; Season 1 Full Activation &nbsp;|&nbsp; ∞ SaaS Licensing Opportunity</p>
	</div>

	<!-- Platform Value Table -->
	<div class="space-y-3">
		<h3 class="text-sm font-bold text-white">Digital Asset Stack — Platform Value Progression</h3>
		<div class="rounded-xl border border-white/10 overflow-hidden">
			<table class="w-full text-xs">
				<thead>
					<tr class="border-b border-white/10 bg-navy-950/60">
						<th class="text-left px-4 py-3 text-white/40 font-semibold">Platform</th>
						<th class="text-right px-4 py-3 text-white/40 font-semibold">Stage 1</th>
						<th class="text-right px-4 py-3 text-white/40 font-semibold">Stage 2</th>
						<th class="text-right px-4 py-3 text-white/40 font-semibold">Full Scale</th>
					</tr>
				</thead>
				<tbody>
					{#each platforms as row, i}
						<tr class="border-b border-white/5 {i % 2 === 0 ? 'bg-navy-800/30' : ''}">
							<td class="px-4 py-3 text-white font-medium">{row.name}</td>
							<td class="px-4 py-3 text-right text-white/50">{row.stage1}</td>
							<td class="px-4 py-3 text-right text-white/50">{row.stage2}</td>
							<td class="px-4 py-3 text-right text-yellow-400 font-bold">{row.full}</td>
						</tr>
					{/each}
					<tr class="bg-navy-950/60 border-t border-white/10">
						<td class="px-4 py-3 text-white font-black">Combined Potential</td>
						<td class="px-4 py-3 text-right text-white/30">—</td>
						<td class="px-4 py-3 text-right text-white/30">—</td>
						<td class="px-4 py-3 text-right text-yellow-400 font-black text-sm">$150M+</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<!-- Competitive Moat -->
	<div class="space-y-4">
		<h3 class="text-sm font-bold text-white">Tech Infrastructure · Competitive Moat</h3>
		<div class="grid sm:grid-cols-2 gap-3">
			{#each [
				{ title: 'Proprietary Operational Infrastructure', body: 'Custom-built workflows become embedded IP. Mission-critical systems create switching costs and defensible operational moats that grow stronger with every season operated.' },
				{ title: 'First-Party Data Ownership',             body: 'Fan behavior, fantasy engagement, and sponsor activation data compound in value — owned entirely by FGL, not rented from third-party platforms. Every event makes the data asset more valuable.' },
				{ title: 'Integrity-First Betting Positioning',    body: 'AI-verified draft systems and transparent operations position FGL as the preferred league for regulated sports betting partnerships — a critical advantage as legal sports betting expands state by state.' },
				{ title: 'SaaS & Licensing Revenue Channels',      body: 'FLIHUB, the AI Draft System, and AI Production tech are each independently licensable to other leagues, tournaments, and live entertainment organizations — creating recurring B2B revenue beyond disc golf.' },
				{ title: 'Scalable Without Linear Cost Growth',    body: 'Technology infrastructure means franchise expansion, new markets, and additional leagues do not require proportional increases in operational headcount. The system scales. The costs don\'t.' },
				{ title: 'Audience Ownership vs. Audience Rental', body: 'Discord and the Fantasy App create fully owned fan engagement infrastructure. Zero algorithm dependency. Zero platform risk. Direct fan monetization from Day 1.' },
			] as item}
				<div class="rounded-lg border border-white/8 bg-navy-800/30 p-4 space-y-1">
					<div class="text-xs font-bold text-white">{item.title}</div>
					<p class="text-xs text-white leading-relaxed">{item.body}</p>
				</div>
			{/each}
		</div>
		<blockquote class="border-l-2 border-brand-500 pl-4 text-sm text-white/60 italic leading-relaxed">
			"We are not simply modernizing disc golf. We are building the technological foundation for the future of interactive sports entertainment. Five integrated platforms with independent and combined licensing potential — first-mover advantage in AI-powered disc golf and emerging sports tech."
		</blockquote>
	</div>
</section>
<!-- GAMING -->
<section id="gaming-tribal" class="space-y-6">
	<div>
		<p class="text-xs font-semibold text-white uppercase tracking-widest mb-1">Gaming &amp; Tribal Strategy</p>
		<h2 class="text-2xl font-black text-white">The Untapped Revenue Stream. FGL Is First.</h2>
	</div>
	<div class="grid sm:grid-cols-2 gap-4">
		<div class="space-y-3">
			{#each [
				{ title: 'First Mover Advantage',          body: 'No disc golf tour has formalized a sportsbook partnership. FGL owns this vertical entirely. The opportunity is uncontested and the infrastructure is already built.' },
				{ title: 'Par-3 = Perfect Betting Format', body: 'Fewer shots, faster resolution, and more micro-betting moments per event than any other golf format. Every hole is a betting opportunity. Every throw is a wagerable moment.' },
				{ title: 'In-Play Wagering Designed In',   body: 'Moneyline, per-hole props, over/under — engineered into the format from Day 1. Combined with the AI Draft System\'s on-chain transparency, FGL is the integrity-first league sportsbooks want.' },
				{ title: 'State-by-State Expansion',       body: "Sports betting in tribal jurisdictions growing rapidly across the country. FGL's tribal network provides a built-in regulatory pathway that no other disc golf organization has access to." },
			] as item}
				<div class="rounded-lg border border-white/10 bg-navy-800/40 p-4 space-y-1">
					<div class="text-xs font-bold text-yellow-400">{item.title}</div>
					<p class="text-xs text-white leading-relaxed">{item.body}</p>
				</div>
			{/each}
			<div class="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3 text-xs text-yellow-300 font-medium text-center">
				Fantasy Platform Ready Now — Digital Player Assets · Draft Leagues · Skill-Based Contests · Zero Integration Delay · Activates Season 1
			</div>
		</div>
		<div class="rounded-xl border border-white/10 bg-navy-800/50 p-6 space-y-4">
			<div class="flex items-center gap-3">
				<div class="h-12 w-12 rounded-full bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-lg font-black text-brand-400 shrink-0">GS</div>
				<div>
					<div class="text-sm font-bold text-white">Gary G. Santos</div>
					<div class="text-xs text-white">Tribal &amp; Gaming — Strategic Lead</div>
					<div class="text-xs text-white mt-0.5">23 yrs tribal governance · Tule River Indian Tribe · $47M budget managed · IGA Board 10+ yrs</div>
				</div>
			</div>
			<div class="space-y-2">
				{#each [
					{ label: 'Tribal Venue Hosting',    body: 'Tribal lands as premier FGL event venues with built-in gaming infrastructure already in place.' },
					{ label: 'Sportsbook Partnerships', body: 'Licensed sportsbook integration delivering event betting markets and in-play wagering from tournament open.' },
					{ label: 'Event Betting Markets',   body: 'Per-hole, per-round, and championship-level betting lines — engineered into the format from Day 1.' },
					{ label: 'Digital Fantasy Packs',   body: 'Player digital assets, fantasy unlockables, and skill-based prize contests activating at Season 1 launch.' },
					{ label: 'Regional Expansion',      body: 'Tribal partnerships enable a state-by-state regulatory gaming pathway no competitor can replicate.' },
				] as item}
					<div class="flex gap-2">
						<span class="text-brand-400 font-bold text-xs mt-0.5 shrink-0">▸</span>
						<div>
							<span class="text-xs font-bold text-white">{item.label} — </span>
							<span class="text-xs text-white">{item.body}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<p class="text-xs text-white/25 italic">Past performance is not indicative of future results. An investment in the Company's securities is speculative, illiquid and there may be a total risk of loss.</p>
</section>
<!-- COMPETITIVE -->
<section id="competitive" class="space-y-6">
	<div>
		<p class="text-xs font-semibold text-white uppercase tracking-widest mb-1">Competitive Landscape</p>
		<h2 class="text-2xl font-black text-white">FGL Is Built Different — In Every Dimension</h2>
	</div>
	<div class="rounded-xl border border-white/10 overflow-hidden">
		<table class="w-full text-xs">
			<thead>
				<tr class="border-b border-white/10 bg-navy-950/60">
					<th class="text-left px-4 py-3 text-white/40 font-semibold">Category</th>
					<th class="text-center px-4 py-3 text-brand-400 font-bold">FLI Golf League</th>
					<th class="text-center px-4 py-3 text-white/40 font-semibold">DGPT / PDGA Tour</th>
					<th class="text-center px-4 py-3 text-white/40 font-semibold">Intl Dance League</th>
				</tr>
			</thead>
			<tbody>
				{#each [
					{ cat: 'Stadium Venue',        fgl: '✓ Custom Built',         dgpt: '✕ Park Courses',  idl: '△ Theaters' },
					{ cat: 'Broadcast Design',     fgl: '✓ Emmy Team + AI',       dgpt: '△ Minimal',       idl: '△ High-Prod' },
					{ cat: 'Equal Pay / Gender',   fgl: '✓ 100% Equal',           dgpt: '✕ Unequal',       idl: '△ Mixed' },
					{ cat: 'Franchise Model',      fgl: '✓ 1st in DG',            dgpt: '✕ None',          idl: '✓ 6 Teams' },
					{ cat: 'Gaming / Betting',     fgl: '✓ Tribal + Books',       dgpt: '✕ None',          idl: '✕ None' },
					{ cat: 'Fantasy Platform',     fgl: '✓ Built & Active',       dgpt: '✕ None',          idl: '✕ None' },
					{ cat: 'Hospitality / VIP',    fgl: '✓ Full Tiers',           dgpt: '△ Minimal',       idl: '✓ Yes' },
					{ cat: 'AI Production',        fgl: '✓ Live Disc Tracking',   dgpt: '✕ None',          idl: '✕ None' },
					{ cat: 'Proprietary Tech Stack',fgl: '✓ 5 Platforms',         dgpt: '✕ None',          idl: '✕ None' },
					{ cat: 'SaaS / Licensing',     fgl: '✓ $150M+ Potential',     dgpt: '✕ None',          idl: '✕ None' },
					{ cat: 'Audience Ownership',   fgl: '✓ Discord + App',        dgpt: '✕ None',          idl: '✕ None' },
				] as row, i}
					<tr class="border-b border-white/5 {i % 2 === 0 ? 'bg-navy-800/20' : ''}">
						<td class="px-4 py-2.5 text-white/60 font-medium">{row.cat}</td>
						<td class="px-4 py-2.5 text-center text-green-400 font-semibold">{row.fgl}</td>
						<td class="px-4 py-2.5 text-center text-white/35">{row.dgpt}</td>
						<td class="px-4 py-2.5 text-center text-white/35">{row.idl}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
<!-- TEAM -->
<section id="the-team" class="rounded-xl border border-white/10 bg-navy-800/40 p-6 flex items-center justify-between gap-4">
	<div>
		<p class="text-xs font-semibold text-white uppercase tracking-widest mb-1">Leadership</p>
		<h2 class="text-lg font-black text-white">The People Behind the Platform</h2>
		<p class="text-sm text-white mt-1">Full executive team bios, photos, and advisor profiles are available in the dedicated section.</p>
	</div>
	<a href="/dashboard/management" class="shrink-0 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
		View Management &amp; Team →
	</a>
</section>
<!-- ROSTER -->
<section id="roster" class="space-y-6">
	<div>
		<p class="text-xs font-semibold text-white uppercase tracking-widest mb-1">The Roster</p>
		<h2 class="text-2xl font-black text-white">Elite Athletes. Massive Reach.</h2>
	</div>
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
		{#each [
			{ stat: '1M+',    label: 'Combined Social Followers',    sub: 'Across Instagram, YouTube & TikTok', arrow: 'Organic Engine for Fantasy App & Discord' },
			{ stat: '323M+',  label: 'YouTube Views — Our Players',  sub: 'JomezPro lifetime views featuring FGL roster', arrow: 'Built-In Streaming & Content Audience' },
			{ stat: '225K+',  label: 'ESPN2 Broadcast Viewers',      sub: '#1 rated program that day', arrow: 'Proven Mainstream Media Appeal' },
			{ stat: '50K+',   label: 'Peak Concurrent Live Viewers', sub: 'Disc Golf Network streaming events', arrow: 'Streaming Platform Ready Audience' },
		] as item}
			<div class="rounded-xl border border-white/10 bg-navy-800/50 p-5 space-y-1">
				<div class="text-2xl font-black text-brand-400">{item.stat}</div>
				<div class="text-xs font-bold text-white">{item.label}</div>
				<div class="text-xs text-white">{item.sub}</div>
				<div class="text-xs text-yellow-400/70 font-medium pt-1">→ {item.arrow}</div>
			</div>
		{/each}
	</div>
	<div class="rounded-xl border border-white/10 bg-navy-800/40 p-6 space-y-4">
		<p class="text-xs font-bold text-white/60 uppercase tracking-widest">The Most Accomplished Roster in Disc Golf History</p>
		<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
			{#each [
				{ stat: '15+',   label: 'PDGA World Championship Titles' },
				{ stat: '50+',   label: 'PDGA Major Championship Wins' },
				{ stat: '600+',  label: 'Career Professional Wins' },
				{ stat: '4×',    label: 'PDGA Players of the Year on Roster' },
				{ stat: '2×',    label: 'Grand Slam Completions' },
				{ stat: '#1',    label: 'All-Time FPO Major Win Record — 17 Titles' },
				{ stat: '1st',   label: 'Female Player Rated 1000+ PDGA' },
				{ stat: '#1',    label: 'ESPN SportsCenter Top 10 — "Holy Shot"' },
			] as item}
				<div class="rounded-lg border border-white/8 bg-navy-950/40 p-3 text-center">
					<div class="text-lg font-black text-yellow-400">{item.stat}</div>
					<div class="text-xs text-white mt-0.5 leading-tight">{item.label}</div>
				</div>
			{/each}
		</div>
		<div class="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3 text-center">
			<p class="text-xs text-yellow-300 font-semibold">2025 World Games — Gold Medal Winners Committed &nbsp;|&nbsp; USA &nbsp;|&nbsp; 16 Nations</p>
		</div>
	</div>
	<div class="rounded-lg border border-white/8 bg-navy-800/30 p-4">
		<p class="text-xs text-white leading-relaxed"><span class="text-white font-semibold">The Roster as Technology Multiplier —</span> Every follower is a potential fantasy user. Every viewer is a potential bettor. Every fan is a potential Discord member. The roster is the organic marketing engine that activates every FGL technology platform from Day 1.</p>
	</div>
	<p class="text-xs text-white/25 italic">Past performance is not indicative of future results. An investment in the Company's securities is speculative, illiquid and there may be a total risk of loss.</p>
</section>
<!-- FINANCIALS -->
<section id="financials" class="space-y-6">
	<div>
		<p class="text-xs font-semibold text-white uppercase tracking-widest mb-1">Financial Forecast</p>
		<h2 class="text-2xl font-black text-white">Built to Scale. Engineered to Profit.</h2>
	</div>
	<div class="rounded-xl border border-white/10 overflow-hidden">
		<table class="w-full text-xs">
			<thead>
				<tr class="border-b border-white/10 bg-navy-950/60">
					<th class="text-left px-4 py-3 text-white/40 font-semibold">Year</th>
					<th class="text-right px-4 py-3 text-white/40 font-semibold">Sales</th>
					<th class="text-right px-4 py-3 text-white/40 font-semibold">COGS</th>
					<th class="text-right px-4 py-3 text-white/40 font-semibold">Total Expenses</th>
					<th class="text-right px-4 py-3 text-white/40 font-semibold">Net Profit</th>
					<th class="text-right px-4 py-3 text-white/40 font-semibold">Margin</th>
				</tr>
			</thead>
			<tbody>
				{#each forecast as row, i}
					<tr class="border-b border-white/5 {i % 2 === 0 ? 'bg-navy-800/20' : ''}">
						<td class="px-4 py-3 text-white font-bold">{row.year}</td>
						<td class="px-4 py-3 text-right text-white/70">{row.sales}</td>
						<td class="px-4 py-3 text-right text-white/50">{row.cogs}</td>
						<td class="px-4 py-3 text-right text-white/50">{row.expenses}</td>
						<td class="px-4 py-3 text-right font-semibold {row.profit === '—' ? 'text-white/30' : 'text-green-400'}">{row.profit}</td>
						<td class="px-4 py-3 text-right font-semibold {row.margin === '—' ? 'text-white/30' : 'text-yellow-400'}">{row.margin}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
		{#each [
			{ year: '2026', label: 'Inaugural Season Launch',       body: 'League operations, Season 1 events, fantasy platform activation, tribal gaming pipeline initiated' },
			{ year: '2027', label: 'Technology Revenue Begins',     body: 'Fantasy platform monetization, Discord community growth, FLIHUB fully operational' },
			{ year: '2028', label: 'Full Gaming Expansion',         body: 'Sportsbook partnerships active, in-play wagering live, AI production fully deployed' },
			{ year: '2029', label: 'Additional Tournaments',        body: 'Expanded schedule, franchise territorial expansion, SaaS licensing conversations initiated' },
			{ year: '2030', label: 'International Tournaments',     body: 'Global franchise expansion, international broadcast rights, tribal gaming model exported' },
			{ year: '2031', label: 'Full International Expansion',  body: 'Multi-sport SaaS licensing active, full international tournament schedule, $85M+ net profit' },
		] as item}
			<div class="rounded-lg border border-white/8 bg-navy-800/30 p-3 space-y-1">
				<div class="text-xs font-black text-brand-400">{item.year}</div>
				<div class="text-xs font-bold text-white leading-tight">{item.label}</div>
				<p class="text-xs text-white leading-relaxed">{item.body}</p>
			</div>
		{/each}
	</div>
	<p class="text-xs text-white/25 italic">Past performance is not indicative of future results. An investment in the Company's securities is speculative, illiquid and there may be a total risk of loss. There is no guarantee that any specific outcome will be achieved.</p>
</section>
<!-- ASK -->
<section id="proceeds" class="space-y-6">
	<div>
		<p class="text-xs font-semibold text-white uppercase tracking-widest mb-1">The Ask</p>
		<h2 class="text-2xl font-black text-white">The Opportunity to Build the Future of Sports</h2>
	</div>
	<div class="rounded-2xl border border-brand-500/30 bg-brand-600/5 p-8 text-center space-y-3">
		<div class="text-4xl font-black text-white">$7.5M Seed Round</div>
		<div class="text-sm text-white font-semibold uppercase tracking-widest">Inaugural Season Launch Capital · Raising Now · Q2 2026</div>
		<div class="text-xs text-white">Presented by Young America Capital</div>
	</div>
	<div class="rounded-xl border border-white/10 bg-navy-800/40 p-6 space-y-3">
		<p class="text-xs font-bold text-white/60 uppercase tracking-widest">Why Now</p>
		<p class="text-sm text-white/60 leading-relaxed">The sport is ready. The athletes are committed. The technology is built. The gaming infrastructure is in place. The broadcast team is secured. The only thing missing is the capital to launch.</p>
		<p class="text-sm text-white/60 leading-relaxed">This is not a concept. This is not a prototype. This is a fully engineered professional sports league with five proprietary technology platforms, the world's top disc golf athletes, an Emmy-winning production team, and a tribal gaming network — ready to activate at Season 1.</p>
	</div>
	<div class="space-y-3">
		<p class="text-xs font-bold text-white/60 uppercase tracking-widest">What You Are Investing In</p>
		<div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
			{#each [
				{ stat: '$18B+',  label: 'SAM 2030' },
				{ stat: '$150M+', label: 'Tech Value' },
				{ stat: '5',      label: 'Platforms' },
				{ stat: 'Top 24', label: 'Athletes' },
				{ stat: '13×',    label: 'Emmy Team' },
			] as item}
				<div class="rounded-xl border border-white/10 bg-navy-800/50 p-4 text-center">
					<div class="text-xl font-black text-yellow-400">{item.stat}</div>
					<div class="text-xs text-white mt-1">{item.label}</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="space-y-3">
		<p class="text-xs font-bold text-white/60 uppercase tracking-widest">Use of Proceeds</p>
		<div class="grid sm:grid-cols-2 gap-3">
			{#each [
				{ pct: '35%', label: 'Event Production & Technology',      body: 'Stadium course build-out, broadcast infrastructure, AI production deployment, live disc tracking activation' },
				{ pct: '25%', label: 'League Operations & Team Development', body: 'Player contracts, team development, FLIHUB OS operations, franchise development pipeline' },
				{ pct: '20%', label: 'Media & Content Buildout',            body: 'Streaming distribution, content library development, media asset management system, broadcast rights strategy' },
				{ pct: '20%', label: 'Marketing & Working Capital',         body: 'Fan acquisition, Discord community growth, fantasy platform marketing, sponsor outreach' },
			] as item}
				<div class="rounded-xl border border-white/10 bg-navy-800/40 p-5 flex gap-4">
					<div class="text-2xl font-black text-brand-400 shrink-0 w-12 text-center">{item.pct}</div>
					<div>
						<div class="text-xs font-bold text-white">{item.label}</div>
						<p class="text-xs text-white mt-1 leading-relaxed">{item.body}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<p class="text-xs text-white/25 italic">Past performance is not indicative of future results. An investment in the Company's securities is speculative, illiquid and there may be a total risk of loss. There is no guarantee that any specific outcome will be achieved.</p>
</section>
<!-- CONTACT -->
<section id="contact" class="rounded-2xl border border-white/10 bg-navy-800/60 p-10 text-center space-y-8">
	<div>
		<p class="text-xs font-semibold text-white uppercase tracking-widest mb-2">Contact</p>
		<h2 class="text-xl font-black text-white">For More Information About FLI Golf and Its Investment Opportunity</h2>
	</div>

	<!-- YAC Logo box -->
	<div class="flex justify-center">
		<div class="rounded-xl bg-white px-8 py-5 inline-flex items-center justify-center shadow-lg">
			<img
				src="https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/fwn423e3tdwgx2m/yac_logo_9r7f1g6cvl.png"
				alt="Young America Capital"
				class="h-20 w-auto"
			/>
		</div>
	</div>

	<!-- Contact cards -->
	<div class="flex flex-col sm:flex-row justify-center gap-6">
		{#each [
			{ initials: 'GH', name: 'Gary Hearl',     role: 'Sports and Health · Young America Capital', email: 'ghearl@yacapital.com',   phone: '276.964.1612 mobile' },
			{ initials: 'RD', name: 'Robert DeGowin', role: 'Sports and Health · Young America Capital', email: 'rdegowin@yacapital.com', phone: '619.795.6182 mobile' },
		] as person}
			<div class="rounded-xl border border-white/10 bg-navy-950/60 p-6 space-y-3 text-left min-w-[240px]">
				<div class="flex items-center gap-3">
					<div class="h-10 w-10 rounded-full bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-sm font-black text-brand-400 shrink-0">{person.initials}</div>
					<div>
						<div class="text-sm font-bold text-white">{person.name}</div>
						<div class="text-xs text-white">{person.role}</div>
					</div>
				</div>
				<div class="space-y-1">
					<a href="mailto:{person.email}" class="block text-xs text-brand-400 hover:text-yellow-400 transition-colors">{person.email}</a>
					<p class="text-xs text-white">✆ {person.phone}</p>
				</div>
			</div>
		{/each}
	</div>

	<div class="pt-2 space-y-1">
		<p class="text-xs text-white/30 font-semibold">Young America Capital, LLC</p>
		<p class="text-xs text-white/20">SEC Registered Broker Dealer · Member FINRA, SIPC, MSRB</p>
		<p class="text-xs text-white/20">141 East Boston Post Road, Mamaroneck, New York 10543</p>
	</div>
</section>
</div>
