<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
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
		<div class="rounded-xl border border-white/10 bg-white/5 p-6">
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
						<div class="text-xl font-black text-brand-400">{s.v}</div>
						<div class="text-xs text-white/40 mt-0.5">{s.l}</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- The Roster -->
		<div class="rounded-xl border border-white/10 bg-white/5 p-6">
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
						<div class="text-xl font-black text-brand-400">{s.v}</div>
						<div class="text-xs text-white/40 mt-0.5">{s.l}</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- The Team -->
		<div class="rounded-xl border border-white/10 bg-white/5 p-6">
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
					<div class="rounded-lg bg-white/5 border border-white/10 p-4">
						<div class="font-semibold text-white text-sm">{member.name}</div>
						<div class="text-xs text-brand-400 mb-2">{member.title}</div>
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
				<div class="h-px flex-1 bg-white/10" />
				<span class="text-xs text-brand-400 font-semibold uppercase tracking-widest">Advanced Access</span>
				<div class="h-px flex-1 bg-white/10" />
			</div>

			<!-- Financial forecast -->
			<div class="rounded-xl border border-white/10 bg-white/5 p-6">
				<h2 class="text-lg font-bold text-white mb-4">Financial Forecast</h2>
				<div class="overflow-x-auto">
					<table class="w-full text-sm">
						<thead>
							<tr class="border-b border-white/10 text-white/40 text-xs uppercase tracking-wide">
								<th class="text-left py-2 pr-4">Year</th>
								<th class="text-right py-2 px-4">Sales</th>
								<th class="text-right py-2 px-4">Net Profit</th>
								<th class="text-right py-2 pl-4">Margin</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-white/5">
							{#each [
								{ year: '2026', sales: '$2,824,000', profit: '–$1,789,129', margin: '—' },
								{ year: '2027', sales: '$21,392,200', profit: '$1,086,592', margin: '5.08%' },
								{ year: '2028', sales: '$29,970,500', profit: '$5,186,187', margin: '17.30%' },
								{ year: '2029', sales: '$62,783,500', profit: '$21,189,778', margin: '33.75%' },
								{ year: '2030', sales: '$113,180,050', profit: '$43,995,239', margin: '38.87%' },
								{ year: '2031', sales: '$182,733,473', profit: '$85,524,327', margin: '46.80%' }
							] as row}
								<tr class="text-white/70">
									<td class="py-2.5 pr-4 font-medium text-white">{row.year}</td>
									<td class="py-2.5 px-4 text-right">{row.sales}</td>
									<td class="py-2.5 px-4 text-right {row.profit.startsWith('–') ? 'text-red-400' : 'text-green-400'}">{row.profit}</td>
									<td class="py-2.5 pl-4 text-right">{row.margin}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				<p class="text-xs text-white/30 mt-4">Forward-looking statements involve risk and uncertainty. Past performance is not indicative of future results.</p>
			</div>

			<!-- Gaming strategy -->
			<div class="rounded-xl border border-white/10 bg-white/5 p-6">
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
						<div class="rounded-lg bg-brand-500/10 border border-brand-500/20 p-4">
							<div class="text-sm font-semibold text-brand-300 mb-1">{item.title}</div>
							<p class="text-xs text-white/50 leading-relaxed">{item.body}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<div class="pt-4">
		<a href="/dashboard/documents" class="text-sm text-brand-400 hover:text-brand-300 transition-colors">
			View supporting documents →
		</a>
	</div>
</div>
