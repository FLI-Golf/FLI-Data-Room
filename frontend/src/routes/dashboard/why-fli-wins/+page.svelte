<script lang="ts">
	import { Ticket, Tv, Dices, Building2, TrendingUp, CheckCircle2 } from 'lucide-svelte';

	const pillars = [
		{
			icon: Ticket,
			color: 'text-brand-500',
			border: 'border-brand-500/60',
			bg: 'bg-brand-600/8',
			title: 'Gate Economics',
			body: 'Converts free-to-play outdoor rounds into premium ticketed spectator events. 78% of stadium-goers buy F&B at $32/visit — 90%+ beverage margins.'
		},
		{
			icon: Tv,
			color: 'text-fli-blue-400',
			border: 'border-fli-blue-500/60',
			bg: 'bg-fli-blue-800/10',
			title: 'Broadcast-Ready Format',
			body: 'Tight venues enable PGA-style multi-camera coverage. The product ESPN, Apple, and Amazon will pay rights for. Global media rights hit $78B by 2030.'
		},
		{
			icon: Dices,
			color: 'text-green-400',
			border: 'border-green-500/60',
			bg: 'bg-green-500/8',
			title: 'Fantasy & Betting',
			body: 'Confined play space + shot-clock formats create live in-play wagering markets — following TGL, LIV team formats, and MLP\'s fast-format playbook.'
		},
		{
			icon: Building2,
			color: 'text-yellow-400',
			border: 'border-yellow-500/60',
			bg: 'bg-yellow-500/8',
			title: 'Tribal Land Advantage',
			body: '12–30 acre footprint aligns with tribal gaming properties. $43.9B GGR in 2024. Regulated, cash-rich venue partners seeking youth-skewing properties.'
		}
	];

	const analogs = [
		{
			name: 'TGL',
			metric: '~$12M/team',
			detail: 'Stadium golf. ESPN. 550K avg viewers. $12M/team by Season 3. 12 years younger audience.',
			color: 'text-fli-blue-400'
		},
		{
			name: 'MLP',
			metric: '16× in 4 yrs',
			detail: 'Pickleball franchise values: <$1M (2021) → $16M (2025). LeBron, Mahomes, Durant invested.',
			color: 'text-green-400'
		},
		{
			name: 'LIV Golf',
			metric: '$1B/franchise',
			detail: '$5.3B invested by Saudi PIF. 13 franchises targeting $1B each. $500M in sponsorship.',
			color: 'text-yellow-400'
		},
		{
			name: 'Topps / Fanatics',
			metric: '+40% YoY',
			detail: 'Sports cards revenue: $368M (2020) → $1.6B (2024). +40% YoY. 30% market share.',
			color: 'text-brand-400'
		}
	];
</script>

<svelte:head>
	<title>Why FLI Wins — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-10">
	<div>
		<h1 class="text-3xl font-black text-white">Why FLI Wins</h1>
		<p class="mt-1 text-white/50">The stadium format is the unlock.</p>
	</div>

	<!-- 4 pillars -->
	<div class="grid sm:grid-cols-2 gap-5">
		{#each pillars as p}
			<div class="rounded-xl border {p.border} {p.bg} p-6">
				<div class="flex items-center gap-3 mb-3">
					<svelte:component this={p.icon} class="h-5 w-5 {p.color} shrink-0" />
					<span class="font-bold text-white">{p.title}</span>
				</div>
				<p class="text-sm text-white/60 leading-relaxed">{p.body}</p>
			</div>
		{/each}
	</div>

	<!-- Living analogs -->
	<div>
		<div class="flex items-center gap-2 mb-4">
			<TrendingUp class="h-5 w-5 text-white/40" />
			<h2 class="text-lg font-bold text-white">Living Analogs</h2>
		</div>
		<p class="text-sm text-white/50 mb-5">FLI is not a new idea — it's the next iteration of a proven playbook.</p>
		<div class="grid sm:grid-cols-2 gap-4">
			{#each analogs as a}
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5">
					<div class="flex items-start justify-between mb-2">
						<span class="font-black text-white text-lg">{a.name}</span>
						<span class="text-sm font-bold {a.color}">{a.metric}</span>
					</div>
					<p class="text-sm text-white/55 leading-relaxed">{a.detail}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Structural advantages checklist -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<h2 class="text-lg font-bold text-white mb-4">Structural Advantages — Contracted Before Season 1</h2>
		<div class="grid sm:grid-cols-2 gap-3">
			{#each [
				'Custom par-3 stadium — front-row seating, controlled lighting, optimal camera angles',
				'GK Productions secured — 13-time Emmy winner Mark Coleman leads production',
				'First disc golf league with identical male/female prize pools — total parity',
				'Contracted teams with ownership stakes and growing global fan bases',
				'Gary Santos: 23 yrs tribal governance; IGA Board 10+ years; sportsbook pipeline built',
				'Digital player assets, fantasy leagues, skill-based contests — activates at launch'
			] as item}
				<div class="flex items-start gap-3">
					<CheckCircle2 class="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
					<span class="text-sm text-white/65 leading-snug">{item}</span>
				</div>
			{/each}
		</div>
	</div>
</div>
