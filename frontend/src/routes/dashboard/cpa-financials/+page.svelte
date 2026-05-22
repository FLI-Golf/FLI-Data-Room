<script lang="ts">
	import { DollarSign, TrendingUp, TrendingDown, BarChart2, ArrowRight, CheckCircle2, AlertTriangle, Layers, Repeat2, Activity, Rocket, Calendar, Users, Tv, ShoppingBag, Gamepad2, Radio, CreditCard, Package, FileText, Shuffle, Globe } from 'lucide-svelte';

	const years = ['2026','2027','2028','2029','2030','2031'];

	const pl = {
		sales:        [2.82,  21.39, 29.97, 62.78,  113.18, 188.98],
		cogs:         [1.80,  11.77, 14.76, 23.51,   38.27,  54.96],
		grossProfit:  [1.02,   9.63, 15.21, 39.27,   74.91, 134.02],
		grossMargin:  [36.26, 45.00, 50.75, 62.55,   66.19,  70.92],
		salesMkt:     [0.709,  3.08,  3.84, 10.38,   19.25,  24.52],
		labor:        [0.804,  1.83,  2.16,  2.95,    4.27,   6.20],
		gna:          [1.30,   3.63,  4.02,  4.76,    7.40,  11.52],
		totalExp:     [4.61,  20.31, 24.78, 41.59,   69.18,  97.21],
		netProfit:    [-1.79,  1.09,  5.19, 21.19,   44.00,  91.77],
		netMargin:    [-63.35, 5.08, 17.30, 33.75,   38.87,  48.56],
	};

	const cumulative = [-1.79, -0.703, 4.48, 25.67, 69.67, 161.44];

	const revenueStreams = [
		{ label: 'Ticket Revenue',          icon: Calendar,   vals: [0,    3.00,  3.45,  5.17,  6.90,  8.63] },
		{ label: 'Sponsorship — Tier 1',    icon: DollarSign, vals: [0,    1.60,  1.84,  2.08,  2.40,  2.75] },
		{ label: 'Sponsorship — Tier 2',    icon: DollarSign, vals: [0,    3.00,  3.45,  4.68,  6.75,  9.45] },
		{ label: 'Sponsorship — Tier 3',    icon: DollarSign, vals: [0,    1.40,  1.61,  2.73,  4.20,  6.50] },
		{ label: 'Sponsorship — Tier 4',    icon: DollarSign, vals: [0,    0.150, 0.173, 0.293, 0.450, 0.638] },
		{ label: 'Presenting Partner',      icon: DollarSign, vals: [0,    0.125, 0.500, 1.00,  5.00, 10.00] },
		{ label: 'Premium Subscriptions',   icon: CreditCard, vals: [0.238,0.955, 1.39,  3.78,  7.36, 10.94] },
		{ label: 'Sports Apparel',          icon: ShoppingBag,vals: [1.02, 3.06,  3.59,  6.12,  8.16, 10.20] },
		{ label: 'Team Jerseys',            icon: Users,      vals: [1.03, 3.10,  4.20, 10.34, 15.51, 23.27] },
		{ label: 'Bags',                    icon: Package,    vals: [0.052,0.104, 0.156, 0.260, 0.325, 0.341] },
		{ label: 'Discs',                   icon: Globe,      vals: [0.030,0.090, 0.150, 0.300, 0.450, 0.600] },
		{ label: 'Fantasy League Fees',     icon: Gamepad2,   vals: [0,    0.356, 1.10,  3.64,  9.38, 19.13] },
		{ label: 'Gambling / Sports Betting',icon: Shuffle,   vals: [0,    2.00,  3.46,  8.64, 17.28, 28.80] },
		{ label: 'Broadcasting / Streaming',icon: Tv,         vals: [0,    0.500, 1.00,  3.00, 10.00, 25.00] },
		{ label: 'Trading Cards (Brixton)', icon: FileText,   vals: [0.250,1.00,  1.90,  4.15,  5.02,  7.27] },
		{ label: 'General Licensing',       icon: Repeat2,    vals: [0,    0.300, 1.00,  5.00, 12.00, 23.00] },
		{ label: 'Disc License',            icon: Globe,      vals: [0.100,0.350, 0.500, 0.800, 1.00,  1.20] },
		{ label: 'Bag License',             icon: Package,    vals: [0.100,0.300, 0.500, 0.800, 1.00,  1.00] },
	];

	const sensitivity = [
		{ label: 'Bear (−30%)',  value: 45.86, color: 'text-red-400',   bar: 'bg-red-500',    pct: 30 },
		{ label: 'Base (plan)',  value: 91.77, color: 'text-white',     bar: 'bg-brand-500',  pct: 60 },
		{ label: 'Bull (+20%)', value: 122.38, color: 'text-green-400', bar: 'bg-green-500',  pct: 80 },
		{ label: 'Bull+ (+40%)',value: 153.00, color: 'text-green-300', bar: 'bg-green-400',  pct: 100 },
	];

	const assumptions = [
		{ label: 'Seed Raise',          value: '$7.5M — June 2026',          risk: 'low' },
		{ label: 'Break-even Year',     value: '2027 ($1.09M net)',           risk: 'medium' },
		{ label: 'Sponsorship Ramp',    value: 'Tier 1–4 + Presenting',       risk: 'medium' },
		{ label: 'Fantasy / Gambling',  value: 'Live 2027, scale 2028+',      risk: 'high' },
		{ label: 'Broadcasting Deal',   value: '$10M by 2030, $25M 2031',     risk: 'high' },
		{ label: 'Gross Margin Target', value: '45–55% from 2027 onward',     risk: 'low' },
		{ label: 'No Second Raise',     value: 'Self-funded post-2026',       risk: 'low' },
		{ label: 'Trading Cards',       value: 'Rev-share licensing model',   risk: 'medium' },
	];

	const departments = [
		{ code: 'MEDIA',   name: 'Content & Media',                    actual: 0,     budget: 875000 },
		{ code: 'EVN',     name: 'Event Production & Technology',       actual: 0,     budget: 20000 },
		{ code: 'EXEC',    name: 'Executive',                           actual: 0,     budget: 1200000 },
		{ code: 'FIN',     name: 'Finance & Administration',            actual: 0,     budget: 750000 },
		{ code: 'LEGAL',   name: 'Legal & Compliance',                  actual: 0,     budget: 200000 },
		{ code: 'MKT',     name: 'Marketing',                           actual: 0,     budget: 1941600 },
		{ code: 'RESERVE', name: 'Marketing, Working Capital & Reserve',actual: 0,     budget: 1500000 },
		{ code: 'OPS',     name: 'Operations',                          actual: 0,     budget: 762000 },
		{ code: 'PLAYER',  name: 'Player Development',                  actual: 0,     budget: 600000 },
		{ code: 'REIMB',   name: 'Tax-Exempt Reimbursements',           actual: 6635,  budget: 100000 },
		{ code: 'TECH',    name: 'Technology',                          actual: 0,     budget: 200000 },
	];

	function fmt(v: number, decimals = 2) {
		if (v === 0) return '—';
		return `$${Math.abs(v).toFixed(decimals)}M`;
	}
	function fmtK(v: number) {
		if (v === 0) return '—';
		return `$${v.toLocaleString()}`;
	}
	function pct(actual: number, budget: number) {
		if (budget === 0) return 0;
		return Math.round((actual / budget) * 100);
	}
</script>

<svelte:head>
	<title>CPA Financial Statements — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-10" id="top">
	<!-- HEADER -->
	<div id="header">
		<div class="flex items-center gap-2 mb-2">
			<FileText class="h-4 w-4 text-brand-400" />
			<div class="text-xs font-semibold text-brand-400 uppercase tracking-widest">CPA Financial Data · Confidential</div>
		</div>
		<h1 class="text-3xl font-black text-white">FLI Golf P&L · FY 2026–2031</h1>
		<p class="mt-1 text-white/50">Funded June 15, 2025 · Prepared by CPA · Seed raise covers operations, technology, and infrastructure build-out.</p>
		<div class="mt-5 grid sm:grid-cols-3 gap-4">
			<div class="rounded-xl border border-brand-500/60 bg-brand-600/8 p-5 text-center">
				<DollarSign class="h-5 w-5 text-brand-400 mx-auto mb-1" />
				<div class="text-2xl font-black text-white">$7.5M</div>
				<div class="text-xs text-white/50 mt-1">Seed Raise · June 2025</div>
			</div>
			<div class="rounded-xl border border-red-500/40 bg-red-500/5 p-5 text-center">
				<TrendingDown class="h-5 w-5 text-red-400 mx-auto mb-1" />
				<div class="text-2xl font-black text-white">−$1.79M</div>
				<div class="text-xs text-white/50 mt-1">Net 2026 · Investment year</div>
			</div>
			<div class="rounded-xl border border-green-500/40 bg-green-500/5 p-5 text-center">
				<TrendingUp class="h-5 w-5 text-green-400 mx-auto mb-1" />
				<div class="text-2xl font-black text-white">$91.77M</div>
				<div class="text-xs text-white/50 mt-1">Net 2031 · 48.56% margin</div>
			</div>
		</div>
	</div>
	<!-- PHASE OVERVIEW -->
	<div id="phases" class="grid sm:grid-cols-2 gap-5">
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
			<div class="flex items-center gap-3 mb-3">
				<div class="h-8 w-8 rounded-full bg-brand-600/20 border border-brand-500/40 flex items-center justify-center text-sm font-black text-brand-400">1</div>
				<div>
					<div class="text-sm font-bold text-white">Phase 1 — Pre-Tournaments</div>
					<div class="text-xs text-white/40">Funded June 15, 2025</div>
				</div>
			</div>
			<p class="text-sm text-white/55 leading-relaxed">$7.5M seed raise covers operations, technology, and infrastructure build-out. Spending is entirely pre-revenue — no tournament payouts, no franchise cuts. Investment year with expected net loss.</p>
			<div class="mt-4 flex gap-4 text-xs">
				<div><span class="text-white/35">Raised</span> <span class="font-bold text-white ml-1">$7.5M</span></div>
				<div><span class="text-white/35">Net 2026</span> <span class="font-bold text-red-400 ml-1">−$1.79M</span></div>
			</div>
		</div>
		<div class="rounded-xl border border-green-500/30 bg-green-500/5 p-6">
			<div class="flex items-center gap-3 mb-3">
				<div class="h-8 w-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-sm font-black text-green-400">2</div>
				<div>
					<div class="text-sm font-bold text-white">Phase 2 — Tournaments Live</div>
					<div class="text-xs text-white/40">Revenue Positive 2027</div>
				</div>
			</div>
			<p class="text-sm text-white/55 leading-relaxed">First tournament Jan 31, 2027. Prize pools, pro payouts, and franchise cuts all activate. League revenue covers operations by 2027. No second raise needed — growth is self-funded.</p>
			<div class="mt-4 flex gap-4 text-xs">
				<div><span class="text-white/35">Net '27</span> <span class="font-bold text-green-400 ml-1">$1.09M</span></div>
				<div><span class="text-white/35">Net '31</span> <span class="font-bold text-green-400 ml-1">$91.77M</span></div>
			</div>
		</div>
	</div>
	<!-- FULL PL TABLE -->
	<div id="pl-table" class="rounded-xl border border-white/15 bg-navy-700/50 overflow-hidden">
		<div class="px-6 py-4 border-b border-white/8 flex items-center gap-2">
			<BarChart2 class="h-5 w-5 text-white/40" />
			<h2 class="text-lg font-bold text-white">Full P&L Summary</h2>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/10">
						<th class="text-left px-5 py-3 text-xs font-semibold text-white/30 uppercase tracking-widest min-w-[180px]">Line Item</th>
						{#each years as y}
							<th class="text-right px-4 py-3 text-xs font-semibold text-white/30 uppercase tracking-widest">{y}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					<tr class="border-b border-white/6 bg-white/3">
						<td class="px-5 py-3 font-bold text-white">Sales</td>
						{#each pl.sales as v}
							<td class="px-4 py-3 text-right font-bold text-white">{fmt(v)}</td>
						{/each}
					</tr>
					<tr class="border-b border-white/6">
						<td class="px-5 py-3 text-white/50">COGS</td>
						{#each pl.cogs as v}
							<td class="px-4 py-3 text-right text-white/50">(${v.toFixed(2)}M)</td>
						{/each}
					</tr>
					<tr class="border-b border-white/10 bg-white/3">
						<td class="px-5 py-3 font-bold text-fli-blue-300">Gross Profit</td>
						{#each pl.grossProfit as v}
							<td class="px-4 py-3 text-right font-bold text-fli-blue-300">{fmt(v)}</td>
						{/each}
					</tr>
					<tr class="border-b border-white/6">
						<td class="px-5 py-3 text-white/35 text-xs pl-7">Gross Margin %</td>
						{#each pl.grossMargin as v}
							<td class="px-4 py-3 text-right text-xs text-white/35">{v.toFixed(2)}%</td>
						{/each}
					</tr>
					<tr class="border-b border-white/6">
						<td class="px-5 py-3 text-white/50 text-xs font-semibold uppercase tracking-widest" colspan={years.length + 1}>Operating Expenses</td>
					</tr>
					<tr class="border-b border-white/6">
						<td class="px-5 py-3 text-white/50 pl-7">Sales & Marketing</td>
						{#each pl.salesMkt as v}
							<td class="px-4 py-3 text-right text-white/50">(${v.toFixed(2)}M)</td>
						{/each}
					</tr>
					<tr class="border-b border-white/6">
						<td class="px-5 py-3 text-white/50 pl-7">Labor</td>
						{#each pl.labor as v}
							<td class="px-4 py-3 text-right text-white/50">(${v.toFixed(2)}M)</td>
						{/each}
					</tr>
					<tr class="border-b border-white/6">
						<td class="px-5 py-3 text-white/50 pl-7">General & Administrative</td>
						{#each pl.gna as v}
							<td class="px-4 py-3 text-right text-white/50">(${v.toFixed(2)}M)</td>
						{/each}
					</tr>
					<tr class="border-b border-white/10 bg-white/3">
						<td class="px-5 py-3 font-bold text-white/70">Total Expenses</td>
						{#each pl.totalExp as v}
							<td class="px-4 py-3 text-right font-bold text-white/70">(${v.toFixed(2)}M)</td>
						{/each}
					</tr>
					<tr class="border-b border-white/10 bg-white/5">
						<td class="px-5 py-3 font-black text-white">Net Profit</td>
						{#each pl.netProfit as v}
							<td class="px-4 py-3 text-right font-black {v < 0 ? 'text-red-400' : 'text-green-400'}">
								{v < 0 ? `(${fmt(Math.abs(v))})` : fmt(v)}
							</td>
						{/each}
					</tr>
					<tr>
						<td class="px-5 py-3 text-white/35 text-xs pl-7">Net Margin %</td>
						{#each pl.netMargin as v}
							<td class="px-4 py-3 text-right text-xs {v < 0 ? 'text-red-400/60' : 'text-green-400/60'}">{v.toFixed(2)}%</td>
						{/each}
					</tr>
				</tbody>
			</table>
		</div>
		<div class="px-5 py-3 border-t border-white/8">
			<p class="text-xs text-white/25">Figures in USD millions. Parentheses indicate losses or costs.</p>
		</div>
	</div>
	<!-- REVENUE BY PRODUCT -->
	<div id="revenue-product" class="rounded-xl border border-white/15 bg-navy-700/50 overflow-hidden">
		<div class="px-6 py-4 border-b border-white/8 flex items-center gap-2">
			<Layers class="h-5 w-5 text-white/40" />
			<h2 class="text-lg font-bold text-white">Projected Sales by Product</h2>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/10">
						<th class="text-left px-5 py-3 text-xs font-semibold text-white/30 uppercase tracking-widest min-w-[200px]">Product</th>
						{#each years as y}
							<th class="text-right px-4 py-3 text-xs font-semibold text-white/30 uppercase tracking-widest">{y}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each revenueStreams as s}
						<tr class="border-b border-white/6 hover:bg-white/3 transition-colors">
							<td class="px-5 py-2.5">
								<div class="flex items-center gap-2">
									<svelte:component this={s.icon} class="h-3.5 w-3.5 text-white/25 shrink-0" />
									<span class="text-white/70">{s.label}</span>
								</div>
							</td>
							{#each s.vals as v}
								<td class="px-4 py-2.5 text-right text-white/60 font-mono text-xs">
									{v === 0 ? '—' : `$${v >= 1 ? v.toFixed(2) + 'M' : (v * 1000).toFixed(0) + 'K'}`}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr class="bg-white/5 border-t border-white/10">
						<td class="px-5 py-3 font-black text-white">Total Revenue</td>
						{#each pl.sales as v}
							<td class="px-4 py-3 text-right font-black text-brand-400">{fmt(v)}</td>
						{/each}
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
	<!-- SENSITIVITY -->
	<div id="sensitivity" class="grid sm:grid-cols-2 gap-5">
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
			<div class="flex items-center gap-2 mb-4">
				<Activity class="h-5 w-5 text-white/40" />
				<h2 class="text-lg font-bold text-white">Sensitivity Analysis</h2>
			</div>
			<p class="text-xs text-white/40 mb-5">2031 Net Profit impact by scenario</p>
			<div class="space-y-4">
				{#each sensitivity as s}
					<div>
						<div class="flex items-center justify-between mb-1.5">
							<span class="text-sm font-semibold {s.color}">{s.label}</span>
							<span class="text-sm font-black {s.color}">${s.value.toFixed(2)}M</span>
						</div>
						<div class="h-2 rounded-full bg-white/8">
							<div class="h-full rounded-full {s.bar}" style="width: {s.pct}%"></div>
						</div>
					</div>
				{/each}
			</div>
			<p class="text-xs text-white/25 mt-4">Bear assumes 30% revenue shortfall with partial cost reduction. Bull scenarios assume proportional opex scaling.</p>
		</div>
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
			<div class="flex items-center gap-2 mb-4">
				<AlertTriangle class="h-5 w-5 text-white/40" />
				<h2 class="text-lg font-bold text-white">Key Assumptions & Drivers</h2>
			</div>
			<div class="space-y-2.5">
				{#each assumptions as a}
					<div class="flex items-start justify-between gap-3 border-b border-white/6 pb-2.5">
						<span class="text-sm text-white/60">{a.label}</span>
						<div class="flex items-center gap-2 shrink-0">
							<span class="text-xs text-white/50 text-right">{a.value}</span>
							<span class="rounded-full px-1.5 py-0.5 text-xs font-semibold {a.risk === 'high' ? 'bg-red-500/15 text-red-400' : a.risk === 'medium' ? 'bg-yellow-500/15 text-yellow-400' : 'bg-green-500/15 text-green-400'}">{a.risk}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<!-- CASH FLOW FLYWHEEL -->
	<div id="flywheel" class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<div class="flex items-center gap-2 mb-1">
			<Repeat2 class="h-5 w-5 text-white/40" />
			<h2 class="text-lg font-bold text-white">Cash Flow Flywheel</h2>
		</div>
		<p class="text-sm text-white/40 mb-6">How one raise funds everything</p>
		<div class="grid sm:grid-cols-2 gap-6 mb-6">
			<div class="space-y-3">
				{#each [
					{ num: '1', title: 'Phase 1 — Pre-Tournaments', period: '2025–2026', items: [['Funded', 'June 15, 2025'], ['Capital raised', '$7.5M seed round'], ['Net position', '−$1.79M'], ['Spend profile', 'Ops, tech, hiring — no payouts']], color: 'border-brand-500/40 bg-brand-600/6' },
					{ num: '2', title: 'Phase 2 — Tournaments Live', period: '2026 onward', items: [['Revenue positive', '2027 — $1.09M'], ['New spend', 'Prize pools, pro & franchise payouts'], ['Self-funded from', '2027 — no further raise'], ['2031 net profit', '$91.77M']], color: 'border-green-500/30 bg-green-500/5' },
				] as phase}
					<div class="rounded-lg border {phase.color} p-4">
						<div class="flex items-center gap-2 mb-3">
							<div class="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-black text-white">{phase.num}</div>
							<div>
								<div class="text-sm font-bold text-white">{phase.title}</div>
								<div class="text-xs text-white/35">{phase.period}</div>
							</div>
						</div>
						<div class="space-y-1.5">
							{#each phase.items as [k, v]}
								<div class="flex justify-between text-xs">
									<span class="text-white/40">{k}</span>
									<span class="text-white/70 font-medium">{v}</span>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
			<div>
				<div class="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Cumulative Net Profit Trajectory</div>
				<div class="space-y-2">
					{#each years as y, i}
						<div class="flex items-center gap-3">
							<span class="text-xs text-white/40 w-10 shrink-0">{y}</span>
							<div class="flex-1 h-6 rounded bg-white/5 relative overflow-hidden">
								{#if cumulative[i] >= 0}
									<div class="absolute left-0 top-0 h-full rounded bg-green-500/40" style="width: {Math.min((cumulative[i] / 161.44) * 100, 100)}%"></div>
								{:else}
									<div class="absolute left-0 top-0 h-full rounded bg-red-500/40" style="width: {Math.min((Math.abs(cumulative[i]) / 10) * 100, 30)}%"></div>
								{/if}
							</div>
							<span class="text-xs font-bold w-16 text-right {cumulative[i] < 0 ? 'text-red-400' : 'text-green-400'}">
								{cumulative[i] < 0 ? `(${fmt(Math.abs(cumulative[i]))})` : fmt(cumulative[i])}
							</span>
						</div>
					{/each}
				</div>
				<div class="mt-4 rounded-lg border border-white/8 bg-white/3 p-3">
					<p class="text-xs text-white/50 leading-relaxed">2026 revenue ($2.8M) plus seed capital covers all launch costs. By mid-2027, league operations generate positive cash flow, eliminating the need for a Series A.</p>
				</div>
			</div>
		</div>
		<div class="rounded-lg border border-white/8 bg-white/3 p-4">
			<div class="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Revenue Streams Active by Year</div>
			<div class="grid grid-cols-3 gap-3 text-center">
				{#each [['2026', '6 streams'], ['2027', '14 streams'], ['2028+', '18 streams']] as [y, s]}
					<div class="rounded-lg border border-white/8 bg-white/3 p-3">
						<div class="text-xs text-white/35 mb-1">{y}</div>
						<div class="text-sm font-black text-brand-400">{s}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<!-- LIVE PROGRESS -->
	<div id="live-progress" class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<div class="flex items-center gap-2 mb-1">
			<Activity class="h-5 w-5 text-white/40" />
			<h2 class="text-lg font-bold text-white">Live Progress vs Plan</h2>
		</div>
		<p class="text-xs text-white/40 mb-5">Pulled from departments · projects · sponsors</p>
		<div class="grid sm:grid-cols-4 gap-4 mb-6">
			{#each [
				{ label: 'Budgeted Spend',        value: '$8,148,600', sub: 'across 14 departments',  color: 'text-white' },
				{ label: 'Actual Spend',           value: '$6,635',     sub: '0.2% of 2026 plan',      color: 'text-yellow-400' },
				{ label: 'Sponsor Revenue',        value: '$0',         sub: '0.0% of 2026 plan',      color: 'text-white/40' },
				{ label: 'Contracted Revenue',     value: '$20,000,000',sub: '6 active sponsors',      color: 'text-green-400' },
			] as stat}
				<div class="rounded-lg border border-white/8 bg-white/3 p-4 text-center">
					<div class="text-lg font-black {stat.color}">{stat.value}</div>
					<div class="text-xs text-white/40 mt-1">{stat.label}</div>
					<div class="text-xs text-white/25 mt-0.5">{stat.sub}</div>
				</div>
			{/each}
		</div>
		<div class="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Department Spend vs Budget</div>
		<div class="space-y-2.5">
			{#each departments as d}
				{@const p = pct(d.actual, d.budget)}
				<div class="flex items-center gap-3">
					<span class="text-xs font-mono text-white/30 w-16 shrink-0">{d.code}</span>
					<span class="text-xs text-white/55 flex-1 min-w-0 truncate">{d.name}</span>
					<div class="w-24 h-1.5 rounded-full bg-white/8 shrink-0">
						<div class="h-full rounded-full {p > 0 ? 'bg-brand-500' : 'bg-white/10'}" style="width: {Math.max(p, p > 0 ? 3 : 0)}%"></div>
					</div>
					<span class="text-xs text-white/40 w-28 text-right shrink-0">{fmtK(d.actual)} / ${(d.budget/1000).toFixed(0)}K</span>
					<span class="text-xs font-bold w-8 text-right shrink-0 {p > 0 ? 'text-brand-400' : 'text-white/20'}">{p}%</span>
				</div>
			{/each}
		</div>
		<div class="mt-4 rounded-lg border border-white/8 bg-white/3 p-3">
			<div class="grid grid-cols-3 gap-3 text-center text-xs">
				<div><span class="font-black text-white">32</span> <span class="text-white/35">total projects</span></div>
				<div><span class="font-black text-yellow-400">10</span> <span class="text-white/35">in progress</span></div>
				<div><span class="font-black text-white/40">22</span> <span class="text-white/35">planned</span></div>
			</div>
		</div>
	</div>
	<!-- INVESTOR SUMMARY -->
	<div id="investor-summary" class="grid sm:grid-cols-2 gap-5">
		<div class="rounded-xl border border-brand-500/40 bg-brand-600/6 p-6">
			<div class="flex items-center gap-2 mb-4">
				<Rocket class="h-5 w-5 text-brand-400" />
				<h2 class="text-lg font-bold text-white">Investor Summary</h2>
			</div>
			<div class="space-y-3">
				{#each [
					['Ask',            '$7,500,000'],
					['Structure',      'Equity / SAFE'],
					['Use of funds',   'Ops + Season 1'],
					['Break-even',     '2027'],
					['5-yr net profit','$161.44M'],
					['2031 revenue',   '$188.98M'],
					['2031 net margin','48.56%'],
				] as [k, v]}
					<div class="flex justify-between items-center border-b border-white/6 pb-3">
						<span class="text-sm text-white/50">{k}</span>
						<span class="text-sm font-bold text-white">{v}</span>
					</div>
				{/each}
			</div>
		</div>
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
			<div class="flex items-center gap-2 mb-4">
				<CheckCircle2 class="h-5 w-5 text-green-400" />
				<h2 class="text-lg font-bold text-white">Why One Raise Is Sufficient</h2>
			</div>
			<div class="space-y-3">
				{#each [
					'2026 revenue ($2.8M) plus seed capital covers all launch costs.',
					'By mid-2027, league operations generate positive cash flow — no Series A needed.',
					'Revenue diversification across 18 streams reduces single-stream concentration risk.',
					'Sponsorship, media rights, fantasy, gambling, merchandise, and licensing all active by 2028.',
				] as point}
					<div class="flex items-start gap-3">
						<CheckCircle2 class="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
						<span class="text-sm text-white/60 leading-relaxed">{point}</span>
					</div>
				{/each}
			</div>
			<div class="mt-5">
				<a href="/dashboard/financial-projections" class="flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 transition-colors w-fit">
					Full Projections Model <ArrowRight class="h-4 w-4" />
				</a>
			</div>
		</div>
	</div>
	<!-- DISCLAIMER -->
	<p class="text-xs text-white/20">Forward-looking statements involve risk and uncertainty. All figures are confidential and subject to the NDA you accepted.</p>
</div>
