<script lang="ts">
	import { TrendingUp, DollarSign, Target, CheckCircle2, ArrowRight, Layers, Sprout, Calendar, Building2, Shield, Tv, Users, Image, Megaphone } from 'lucide-svelte';
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
	<div class="rounded-xl border border-brand-500/60 bg-brand-600/10 p-8">
		<p class="text-xl font-bold text-white leading-relaxed mb-4">
			FLI is asking: can a stadium-format league capture single-digit basis points across multi-billion-dollar adjacent markets?
		</p>
		<p class="text-lg text-brand-400 font-black">The comparables already say YES.</p>
	</div>

	<!-- Key metrics -->
	<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
		{#each [
			{ value: '$43.9B', label: 'Tribal Gaming GGR', sub: 'Record FY2024', icon: DollarSign, color: 'text-yellow-400', border: 'border-yellow-500/60', bg: 'bg-yellow-500/8' },
			{ value: '$180M',  label: 'SOM at 1% Capture', sub: 'Across 9 revenue pools', icon: Target, color: 'text-brand-500', border: 'border-brand-500/60', bg: 'bg-brand-600/10' },
			{ value: '86%',    label: 'Participation Growth', sub: 'Since 2020', icon: TrendingUp, color: 'text-green-400', border: 'border-green-500/60', bg: 'bg-green-500/8' }
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
					{ label: 'Round Size',    value: '$7.5M',                       icon: DollarSign,  color: 'text-yellow-400',   bg: 'bg-yellow-500/15' },
					{ label: 'Round Type',    value: 'Seed',                         icon: Sprout,      color: 'text-green-400',    bg: 'bg-green-500/15' },
					{ label: 'Timeline',      value: 'Q2 2026',                      icon: Calendar,    color: 'text-fli-blue-300', bg: 'bg-fli-blue-500/15' },
					{ label: 'Presented By',  value: 'Young America Capital, LLC',   icon: Building2,   color: 'text-brand-400',    bg: 'bg-brand-600/15' },
					{ label: 'Broker Dealer', value: 'SEC Registered · FINRA, SIPC', icon: Shield,      color: 'text-purple-300',   bg: 'bg-purple-500/15' },
				] as row}
					<div class="flex items-center gap-3 border-b border-white/8 pb-3">
						<div class="h-8 w-8 rounded-lg {row.bg} flex items-center justify-center shrink-0">
							<svelte:component this={row.icon} class="h-4 w-4 {row.color}" />
						</div>
						<span class="text-sm text-white/50 flex-1">{row.label}</span>
						<span class="text-sm font-semibold text-white">{row.value}</span>
					</div>
				{/each}
			</div>
			<div class="space-y-3">
				<div class="text-sm font-semibold text-white mb-2">Use of Proceeds</div>
				{#each [
					{ pct: '35%', n: 35, label: 'Event Production & Technology',       icon: Tv,        color: 'text-brand-400',    bg: 'bg-brand-600/15',      bar: 'bg-brand-500' },
					{ pct: '25%', n: 25, label: 'League Operations & Team Development', icon: Users,     color: 'text-fli-blue-300', bg: 'bg-fli-blue-500/15',   bar: 'bg-fli-blue-500' },
					{ pct: '20%', n: 20, label: 'Media & Content Buildout',             icon: Image,     color: 'text-yellow-400',   bg: 'bg-yellow-500/15',     bar: 'bg-yellow-500' },
					{ pct: '20%', n: 20, label: 'Marketing, Working Capital & Reserve', icon: Megaphone, color: 'text-green-400',    bg: 'bg-green-500/15',      bar: 'bg-green-500' },
				] as item}
					<div class="flex items-center gap-3">
						<div class="h-7 w-7 rounded-lg {item.bg} flex items-center justify-center shrink-0">
							<svelte:component this={item.icon} class="h-3.5 w-3.5 {item.color}" />
						</div>
						<div class="flex-1 min-w-0">
							<div class="flex items-center justify-between mb-1">
								<span class="text-xs text-white/60 leading-snug truncate">{item.label}</span>
								<span class="text-xs font-black {item.color} ml-2 shrink-0">{item.pct}</span>
							</div>
							<div class="h-1.5 rounded-full bg-white/8">
								<div class="h-full rounded-full {item.bar}" style="width: {item.pct}"></div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- CTA -->
	<div class="rounded-xl border border-yellow-500/60 bg-yellow-500/5 p-6 flex items-center justify-between gap-4">
		<div>
			<div class="text-sm font-bold text-white mb-1">Ready to go deeper?</div>
			<div class="text-sm text-white/50">Review the full pitch deck, financial model, and supporting documents.</div>
		</div>
		<a href="/dashboard/pitch-deck" class="flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 transition-colors shrink-0">
			Pitch Deck <ArrowRight class="h-4 w-4" />
		</a>
	</div>
</div>
