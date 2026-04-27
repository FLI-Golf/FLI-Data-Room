<script lang="ts">
	import { DollarSign, TrendingUp, Tv, Gamepad2, CreditCard, Plane, Trophy, Zap, Target } from 'lucide-svelte';

	const pools = [
		{ market: 'Sports Betting',    size: '$187B', cagr: '11% CAGR', sub: 'by 2030', icon: Trophy,    color: 'text-green-400',  border: 'border-green-500/20',  bg: 'bg-green-500/8' },
		{ market: 'Sponsorship',       size: '$150B', cagr: '8% CAGR',  sub: 'global',  icon: Target,    color: 'text-yellow-400', border: 'border-yellow-500/20', bg: 'bg-yellow-500/8' },
		{ market: 'Sports Tourism',    size: '$1.3T', cagr: 'by 2032',  sub: 'global',  icon: Plane,     color: 'text-fli-blue-400', border: 'border-fli-blue-700/20', bg: 'bg-fli-blue-800/10' },
		{ market: 'Media Rights',      size: '$78B',  cagr: 'by 2030',  sub: 'global',  icon: Tv,        color: 'text-purple-400', border: 'border-purple-500/20', bg: 'bg-purple-500/8' },
		{ market: 'Fantasy Sports',    size: '$65B',  cagr: '15% CAGR', sub: 'global',  icon: Gamepad2,  color: 'text-brand-400',  border: 'border-brand-600/20',  bg: 'bg-brand-600/8' },
		{ market: 'Tribal Gaming (US)',size: '$44B',  cagr: 'Record',   sub: 'GGR 2024',icon: DollarSign,color: 'text-orange-400', border: 'border-orange-500/20', bg: 'bg-orange-500/8' },
		{ market: 'Trading Cards',     size: '$20B',  cagr: '8% CAGR',  sub: 'by 2033', icon: CreditCard,color: 'text-pink-400',   border: 'border-pink-500/20',   bg: 'bg-pink-500/8' },
		{ market: 'Core Disc Golf',    size: '$1.5B', cagr: '17% CAGR', sub: 'by 2030', icon: Zap,       color: 'text-white',      border: 'border-white/15',      bg: 'bg-navy-700/50' },
	];
</script>

<svelte:head>
	<title>Market Opportunity — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-10">
	<div>
		<h1 class="text-3xl font-black text-white">Market Opportunity</h1>
		<p class="mt-1 text-white/50">Nine revenue pools. One integrated league structure unlocks them all.</p>
	</div>

	<!-- TAM callout -->
	<div class="rounded-xl border border-brand-600/30 bg-brand-600/10 p-6 flex flex-col sm:flex-row items-center gap-6">
		<div class="text-center sm:text-left">
			<div class="text-5xl font-black text-brand-500">$18B</div>
			<div class="text-sm font-semibold text-white mt-1">Total Addressable SAM</div>
			<div class="text-xs text-white/50 mt-0.5">FLI-addressable across 9 revenue pools</div>
		</div>
		<div class="h-px sm:h-16 sm:w-px bg-white/10 w-full sm:w-auto"></div>
		<div class="text-sm text-white/60 leading-relaxed max-w-md">
			<span class="text-white font-semibold">The bottom line:</span> 1% capture of FLI-addressable SAM pools = ~$180M annual run-rate revenue. More than the entire current global disc golf market — from streams the sport has never touched.
		</div>
	</div>

	<!-- Revenue pools grid -->
	<div>
		<h2 class="text-lg font-bold text-white mb-4">The 9 Revenue Pools</h2>
		<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
			{#each pools as pool}
				<div class="rounded-xl border {pool.border} {pool.bg} p-5">
					<div class="flex items-center gap-2 mb-3">
						<svelte:component this={pool.icon} class="h-4 w-4 {pool.color} shrink-0" />
						<span class="text-xs font-semibold text-white/70 uppercase tracking-wide">{pool.market}</span>
					</div>
					<div class="text-2xl font-black text-white">{pool.size}</div>
					<div class="text-xs text-white/40 mt-1">{pool.cagr} · {pool.sub}</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- SOM breakdown -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<h2 class="text-lg font-bold text-white mb-5">Serviceable Obtainable Market — 1% Capture Model</h2>
		<div class="space-y-3">
			{#each [
				{ pool: 'Sports Betting',     tam: '$187B', som: '$1.87B', pct: 100 },
				{ pool: 'Sponsorship',        tam: '$150B', som: '$1.50B', pct: 80 },
				{ pool: 'Media Rights',       tam: '$78B',  som: '$780M',  pct: 42 },
				{ pool: 'Tribal Gaming',      tam: '$44B',  som: '$440M',  pct: 24 },
				{ pool: 'Fantasy Sports',     tam: '$65B',  som: '$650M',  pct: 35 },
				{ pool: 'Trading Cards',      tam: '$20B',  som: '$200M',  pct: 11 },
				{ pool: 'Core Disc Golf',     tam: '$1.5B', som: '$15M',   pct: 8 },
			] as row}
				<div class="flex items-center gap-4">
					<div class="w-36 text-xs text-white/60 shrink-0">{row.pool}</div>
					<div class="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
						<div class="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400" style="width: {row.pct}%"></div>
					</div>
					<div class="w-16 text-xs text-white/50 text-right shrink-0">{row.som}</div>
				</div>
			{/each}
		</div>
		<div class="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
			<span class="text-sm text-white/50">Total SOM at 1% capture</span>
			<span class="text-lg font-black text-brand-500">~$180M ARR</span>
		</div>
	</div>
</div>
