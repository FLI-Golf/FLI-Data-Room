<script lang="ts">
	import { CheckCircle2, TrendingUp, Trophy, AlertCircle } from 'lucide-svelte';

	const rows = [
		{
			category: 'Core Sport',
			grassLeague: 'Par-3 traditional golf',
			fli: 'Stadium-style par-3 disc golf'
		},
		{
			category: 'Home Market',
			grassLeague: 'Arizona / Grass Clippings Rolling Hills in Tempe',
			fli: 'Arizona / Turf Paradise Phoenix launch venue'
		},
		{
			category: 'Core Concept',
			grassLeague: 'High-stakes, team-based par-3 golf played under the lights',
			fli: 'Gender-equal, team-based par-3 disc golf in a custom stadium environment'
		},
		{
			category: 'Format Innovation',
			grassLeague: 'Short-course golf, two-person teams, franchise competition, night events',
			fli: '12 teams, male/female captains, all throws count, 9-hole stadium course played twice'
		},
		{
			category: 'League Identity',
			grassLeague: '"World\'s first high-stakes par-3 golf league"',
			fli: '"World\'s first high-stakes par-3 disc golf league"'
		},
		{
			category: 'Franchise Model',
			grassLeague: '11 franchises in 2026; regional/city team structure',
			fli: '12 branded teams with long-term franchise, media, sponsor, apparel, fantasy, and licensing potential'
		},
		{
			category: 'Player Model',
			grassLeague: 'Pro/amateur mix; qualifier and draft pathway; each franchise has a roster of 14 players',
			fli: 'Elite disc golf player model with MPO/FPO representation, starters, bench players, player union, travel, media duties'
		},
		{
			category: 'Event Style',
			grassLeague: 'Night golf, food, beer, hospitality tents, vendors, live music',
			fli: 'Stadium disc golf, concert/stage production, VIP rooftop, sponsor tents, fan zones, youth areas, broadcast production'
		},
		{
			category: 'Venue Strategy',
			grassLeague: 'Built around lighted par-3 golf courses, especially Grass Clippings Rolling Hills in Tempe',
			fli: 'Temporary/custom stadium-style disc golf buildout inside major entertainment venues'
		},
		{
			category: 'Broadcast / Media',
			grassLeague: 'Aired event coverage through Peacock/Golf Channel-related distribution and YouTube-style content',
			fli: 'Plans live event production, documentary content, fantasy content, digital distribution, and long-term streaming rights'
		},
		{
			category: 'Sponsorship Validation',
			grassLeague: 'Gila River Resorts & Casinos expanded its partnership — onsite/digital branding, hospitality, tickets, broadcast commercials, social collaborations',
			fli: 'Can offer similar sponsor categories plus team apparel, course branding, fantasy/app integration, youth/community alignment, and league-wide platform exposure'
		},
		{
			category: 'Capital Raised',
			grassLeague: '$2.75M seed funding to expand events, operations, content, sales, partnerships, and hire a commissioner',
			fli: 'Currently seeking $3M seed investment'
		},
		{
			category: 'Operations Partner',
			grassLeague: 'AZ GOLF extended as official tournament operations partner through December 2027',
			fli: 'Can position its own operations through FliHUB, event staff, production partners, tech partners, and league governance'
		},
		{
			category: 'Expansion Signal',
			grassLeague: 'Regional franchises including Phoenix, Scottsdale, Los Angeles, New York, Dallas, Tampa Bay, Canada, and others',
			fli: 'Starts in Arizona, then scales nationally and internationally with U.S. and European disc golf markets'
		},
		{
			category: 'Fan Experience',
			grassLeague: 'Golf + nightlife + hospitality + music',
			fli: 'Disc golf + stadium seating + music + VIP + youth participation + digital/fantasy/gaming ecosystem'
		}
	];

	const keyDiffs = [
		{
			icon: CheckCircle2,
			color: 'text-green-400',
			border: 'border-green-500/40',
			bg: 'bg-green-500/8',
			title: 'Biggest Similarity',
			body: 'Both modernize golf-style competition into a franchise-driven entertainment product.'
		},
		{
			icon: Trophy,
			color: 'text-brand-400',
			border: 'border-brand-500/40',
			bg: 'bg-brand-600/8',
			title: "Grass League's Edge",
			body: 'First-mover brand recognition in the Arizona market, existing broadcast relationships, and a proven live-event sponsorship model with Gila River Resorts.'
		},
		{
			icon: TrendingUp,
			color: 'text-fli-blue-400',
			border: 'border-fli-blue-500/40',
			bg: 'bg-fli-blue-800/10',
			title: "FLI's Differentiation",
			body: "FGL creates a new stadium disc golf category with equal-gender competition, a proprietary technology platform (FliHUB), and a deeper franchise infrastructure — fantasy, gaming, apparel, and broadcasting rights."
		},
		{
			icon: AlertCircle,
			color: 'text-yellow-400',
			border: 'border-yellow-500/40',
			bg: 'bg-yellow-500/8',
			title: 'Market Validation',
			body: "Grass League raising $2.75M proves investor appetite for short-format, franchise-based live sports. FLI is targeting $3M on a larger addressable market with disc golf's 10M+ player base."
		}
	];
</script>

<svelte:head>
	<title>Grass League Comparison — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-10">

	<!-- Header -->
	<div>
		<h1 class="text-3xl font-black text-white">Grass League: Market Validation</h1>
		<p class="mt-2 text-white/50 max-w-2xl leading-relaxed">
			Grass League is a par-3 golf franchise league operating in the same market as FLI Golf League.
			Their traction — including $2.75M raised, a Gila River casino sponsorship, and Peacock/Golf Channel
			coverage — directly validates the FLI model in the same geography.
		</p>
	</div>

	<!-- Key Takeaways -->
	<div class="grid sm:grid-cols-2 gap-5">
		{#each keyDiffs as kd}
			<div class="rounded-xl border {kd.border} {kd.bg} p-6">
				<div class="flex items-center gap-3 mb-3">
					<svelte:component this={kd.icon} class="h-5 w-5 {kd.color} shrink-0" />
					<span class="font-bold text-white">{kd.title}</span>
				</div>
				<p class="text-sm text-white/60 leading-relaxed">{kd.body}</p>
			</div>
		{/each}
	</div>

	<!-- Comparison Table -->
	<div>
		<h2 class="text-lg font-bold text-white mb-4">FLI vs. Grass League — Strategic Comparison</h2>
		<div class="overflow-x-auto rounded-xl border border-white/10">
			<table class="w-full text-sm">
				<thead>
					<tr class="bg-white/5 border-b border-white/10">
						<th class="text-left px-4 py-3 font-semibold text-white/60 w-40">Category</th>
						<th class="text-left px-4 py-3 font-semibold text-yellow-400">Grass League</th>
						<th class="text-left px-4 py-3 font-semibold text-brand-400">FLI Golf League</th>
					</tr>
				</thead>
				<tbody>
					{#each rows as row, i}
						<tr class="border-b border-white/5 {i % 2 === 0 ? 'bg-white/[0.02]' : ''}">
							<td class="px-4 py-3 text-white/50 font-medium align-top">{row.category}</td>
							<td class="px-4 py-3 text-white/70 align-top leading-relaxed">{row.grassLeague}</td>
							<td class="px-4 py-3 text-white/90 align-top leading-relaxed">{row.fli}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Source note -->
	<p class="text-xs text-white/30">
		Source: Grass League public investor materials and FLI Golf League internal comparisons, 2025–2026.
	</p>

</div>
