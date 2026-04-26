<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>Dashboard — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-10">
	<div>
		<h1 class="text-3xl font-black text-white">Welcome, {data.user?.name?.split(' ')[0]}.</h1>
		<p class="mt-1 text-white/50">FLI Golf League · Investor Data Room · Q2 2026 Seed Round</p>
	</div>

	<!-- Raise summary -->
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
		{#each [
			{ value: '$7.5M', label: 'Seed Round' },
			{ value: '$18B+', label: 'SAM by 2030' },
			{ value: '20M+', label: 'Global Players' },
			{ value: '86%', label: 'Growth Since 2020' }
		] as stat}
			<div class="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
				<div class="text-2xl font-black text-brand-400">{stat.value}</div>
				<div class="text-xs text-white/40 mt-1 uppercase tracking-wide">{stat.label}</div>
			</div>
		{/each}
	</div>

	<!-- Use of proceeds -->
	<div class="rounded-xl border border-white/10 bg-white/5 p-6">
		<h2 class="text-lg font-bold text-white mb-4">Use of Proceeds</h2>
		<div class="grid sm:grid-cols-4 gap-4">
			{#each [
				{ pct: '35%', label: 'Event Production & Technology' },
				{ pct: '25%', label: 'League Operations & Team Development' },
				{ pct: '20%', label: 'Media & Content Buildout' },
				{ pct: '20%', label: 'Marketing, Working Capital & Reserve' }
			] as item}
				<div class="rounded-lg bg-white/5 border border-white/10 p-4 text-center">
					<div class="text-2xl font-black text-brand-400">{item.pct}</div>
					<div class="text-xs text-white/50 mt-1 leading-snug">{item.label}</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Financial forecast -->
	<div class="rounded-xl border border-white/10 bg-white/5 p-6">
		<h2 class="text-lg font-bold text-white mb-4">Financial Forecast</h2>
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/10 text-white/40 text-xs uppercase tracking-wide">
						<th class="text-left py-2 pr-4">Year</th>
						<th class="text-right py-2 px-4">Revenue</th>
						<th class="text-right py-2 px-4">Net Profit</th>
						<th class="text-right py-2 pl-4">Margin</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5">
					{#each [
						{ year: '2026', revenue: '$2.8M', profit: '–$1.8M', margin: '—' },
						{ year: '2027', revenue: '$21.4M', profit: '$1.1M', margin: '5.1%' },
						{ year: '2028', revenue: '$30.0M', profit: '$5.2M', margin: '17.3%' },
						{ year: '2029', revenue: '$62.8M', profit: '$21.2M', margin: '33.8%' },
						{ year: '2030', revenue: '$113.2M', profit: '$44.0M', margin: '38.9%' },
						{ year: '2031', revenue: '$182.7M', profit: '$85.5M', margin: '46.8%' }
					] as row}
						<tr class="text-white/70">
							<td class="py-2.5 pr-4 font-medium text-white">{row.year}</td>
							<td class="py-2.5 px-4 text-right">{row.revenue}</td>
							<td class="py-2.5 px-4 text-right {row.profit.startsWith('–') ? 'text-red-400' : 'text-green-400'}">{row.profit}</td>
							<td class="py-2.5 pl-4 text-right">{row.margin}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="text-xs text-white/30 mt-4">Past performance is not indicative of future results. Forward-looking statements involve risk and uncertainty.</p>
	</div>

	<!-- Quick links -->
	<div class="grid sm:grid-cols-2 gap-4">
		<a
			href="/dashboard/pitch-deck"
			class="rounded-xl border border-brand-500/30 bg-brand-500/10 p-6 hover:bg-brand-500/20 transition-colors group"
		>
			<div class="text-brand-400 font-semibold mb-1 group-hover:text-brand-300">Pitch Deck →</div>
			<div class="text-sm text-white/50">Full investor presentation</div>
		</a>
		<a
			href="/dashboard/documents"
			class="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors group"
		>
			<div class="text-white font-semibold mb-1">Supporting Documents →</div>
			<div class="text-sm text-white/50">Financials, legal, and supplemental materials</div>
		</a>
	</div>
</div>
