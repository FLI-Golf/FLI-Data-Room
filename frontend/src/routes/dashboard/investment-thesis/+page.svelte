<script lang="ts">
	import { TrendingUp, DollarSign, Target, CheckCircle2, ArrowRight } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Investment Thesis — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-10">
	<div>
		<h1 class="text-3xl font-black text-white">Investment Thesis</h1>
		<p class="mt-1 text-white/50">FLI is not asking investors to underwrite whether disc golf will grow.</p>
	</div>

	<!-- Core thesis statement -->
	<div class="rounded-xl border border-brand-600/30 bg-brand-600/10 p-8">
		<p class="text-xl font-bold text-white leading-relaxed mb-4">
			FLI is asking: can a stadium-format league capture single-digit basis points across multi-billion-dollar adjacent markets?
		</p>
		<p class="text-lg text-brand-400 font-black">The comparables already say YES.</p>
	</div>

	<!-- Key metrics -->
	<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
		{#each [
			{ value: '$43.9B', label: 'Tribal Gaming GGR', sub: 'Record FY2024', icon: DollarSign, color: 'text-yellow-400', border: 'border-yellow-500/20', bg: 'bg-yellow-500/8' },
			{ value: '$180M',  label: 'SOM at 1% Capture', sub: 'Across 9 revenue pools', icon: Target, color: 'text-brand-500', border: 'border-brand-600/25', bg: 'bg-brand-600/10' },
			{ value: '86%',    label: 'Participation Growth', sub: 'Since 2020', icon: TrendingUp, color: 'text-green-400', border: 'border-green-500/20', bg: 'bg-green-500/8' }
		] as stat}
			<div class="rounded-xl border {stat.border} {stat.bg} p-6 text-center">
				<div class="flex justify-center mb-2">
					<svelte:component this={stat.icon} class="h-5 w-5 {stat.color}" />
				</div>
				<div class="text-3xl font-black text-white">{stat.value}</div>
				<div class="text-sm font-semibold text-white/70 mt-1">{stat.label}</div>
				<div class="text-xs text-white/40 mt-0.5">{stat.sub}</div>
			</div>
		{/each}
	</div>

	<!-- Why now -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6 space-y-4">
		<h2 class="text-lg font-bold text-white">Why Now</h2>
		<div class="space-y-3">
			{#each [
				'Disc golf participation has grown 86% since 2020 — the sport is already at scale',
				'Zero stadium infrastructure exists — FLI is the first mover with no incumbent to displace',
				'Tribal gaming partners are actively seeking youth-skewing, regulated sports properties',
				'Broadcast technology and streaming economics now favor niche sports with passionate audiences',
				'Fantasy and sports betting legalization creates immediate monetization at launch',
				'The TGL, MLP, and LIV playbooks have de-risked the stadium-format league model'
			] as point}
				<div class="flex items-start gap-3">
					<CheckCircle2 class="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
					<span class="text-sm text-white/65 leading-snug">{point}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Raise details -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<h2 class="text-lg font-bold text-white mb-5">The Raise — Q2 2026 Seed Round</h2>
		<div class="grid sm:grid-cols-2 gap-6">
			<div class="space-y-4">
				{#each [
					{ label: 'Round Size', value: '$7.5M' },
					{ label: 'Round Type', value: 'Seed' },
					{ label: 'Timeline', value: 'Q2 2026' },
					{ label: 'Presented By', value: 'Young America Capital, LLC' },
					{ label: 'Broker Dealer', value: 'SEC Registered · FINRA, SIPC' }
				] as row}
					<div class="flex items-center justify-between border-b border-white/8 pb-3">
						<span class="text-sm text-white/50">{row.label}</span>
						<span class="text-sm font-semibold text-white">{row.value}</span>
					</div>
				{/each}
			</div>
			<div class="space-y-3">
				<div class="text-sm font-semibold text-white mb-2">Use of Proceeds</div>
				{#each [
					{ pct: '35%', label: 'Event Production & Technology' },
					{ pct: '25%', label: 'League Operations & Team Development' },
					{ pct: '20%', label: 'Media & Content Buildout' },
					{ pct: '20%', label: 'Marketing, Working Capital & Reserve' }
				] as item}
					<div class="flex items-center gap-3">
						<span class="text-sm font-black text-brand-500 w-10 shrink-0">{item.pct}</span>
						<div class="flex-1 h-1.5 rounded-full bg-white/8">
							<div class="h-full rounded-full bg-brand-600" style="width: {item.pct}"></div>
						</div>
						<span class="text-xs text-white/50 leading-snug">{item.label}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- CTA -->
	<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6 flex items-center justify-between gap-4">
		<div>
			<div class="text-sm font-bold text-white mb-1">Ready to go deeper?</div>
			<div class="text-sm text-white/50">Review the full pitch deck, financial model, and supporting documents.</div>
		</div>
		<a href="/dashboard/pitch-deck" class="flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 transition-colors shrink-0">
			Pitch Deck <ArrowRight class="h-4 w-4" />
		</a>
	</div>
</div>
