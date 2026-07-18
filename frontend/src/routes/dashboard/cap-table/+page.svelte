<script lang="ts">
	import { PieChart, Upload, Info, AlertTriangle } from 'lucide-svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	type Holder = { name: string; type: string; shares: string; amount: string; pct: string; date: string };
	type Loan   = { lender: string; amount: string; rate: string; maturity: string; status: string };
	type Seed   = { target: string; raised: string; pricePerUnit: string; minInvestment: string; broker: string };

	const PLACEHOLDER_HOLDERS: Holder[] = [
		{ name: 'Founder / Management',   type: 'Common',    shares: '', amount: '', pct: '', date: '' },
		{ name: 'Investor — Placeholder', type: 'Preferred', shares: '', amount: '', pct: '', date: '' },
		{ name: 'Option Pool (Reserved)', type: 'Options',   shares: '', amount: '', pct: '', date: '' },
	];
	const PLACEHOLDER_LOANS: Loan[] = [
		{ lender: 'Lender — Placeholder', amount: '', rate: '', maturity: '', status: '' },
	];

	$: savedSeed    = (data.content?.seedRound    as Seed)     ?? null;
	$: savedHolders = (data.content?.equityHolders as Holder[]) ?? [];
	$: savedLoans   = (data.content?.loans         as Loan[])   ?? [];

	$: hasData = savedHolders.some(h => h.name);

	$: seedRound = savedSeed ?? { target: '$7,500,000', raised: '$0', pricePerUnit: 'TBD', minInvestment: 'TBD', broker: 'Young America Capital, LLC' };
	$: equityHolders = hasData ? savedHolders : PLACEHOLDER_HOLDERS;
	$: loans         = savedLoans.length > 0 ? savedLoans : PLACEHOLDER_LOANS;

	// Compute remaining from target and raised
	$: remaining = (() => {
		if (!seedRound.target || !seedRound.raised) return 'TBD';
		const t = parseFloat(seedRound.target.replace(/[^0-9.]/g, ''));
		const r = parseFloat(seedRound.raised.replace(/[^0-9.]/g, ''));
		if (isNaN(t) || isNaN(r)) return 'TBD';
		return '$' + (t - r).toLocaleString();
	})();

	function fmt(v: string | null) {
		if (!v || v === '') return '—';
		return v.startsWith('$') ? v : '$' + v;
	}
</script>

<svelte:head>
	<title>Cap Table — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-10">
	<div>
		<h1 class="text-3xl font-black text-white">Capitalization Table</h1>
		<p class="mt-1 text-white/50">Current ownership structure, all investors, and outstanding loans.</p>
	</div>

	<!-- Confidentiality warning -->
	<div class="rounded-xl border border-brand-600/30 bg-brand-600/10 p-4 flex items-start gap-3">
		<AlertTriangle class="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
		<p class="text-xs text-white/60 leading-relaxed">
			The cap table is highly sensitive. Do not share or screenshot. All access is logged.
		</p>
	</div>

	{#if !hasData}
	<!-- Pending state -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-8 text-center space-y-4">
		<div class="h-14 w-14 rounded-full bg-brand-600/15 border border-brand-500/30 flex items-center justify-center mx-auto">
			<PieChart class="h-7 w-7 text-brand-400" />
		</div>
		<div>
			<div class="text-lg font-bold text-white">Cap Table Pending Seed Close</div>
			<p class="text-sm text-white/45 mt-1 max-w-md mx-auto">Equity structure and ownership percentages will be finalized upon close of the Q3 2026 seed round. The structure, broker, and terms are confirmed below.</p>
		</div>
		<div class="grid sm:grid-cols-3 gap-3 max-w-xl mx-auto text-left mt-2">
			{#each [
				{ label: 'Structure',      value: 'Equity / SAFE',              color: 'text-white' },
				{ label: 'Round Target',   value: '$7,500,000',                  color: 'text-brand-400' },
				{ label: 'Placement Agent',value: 'Young America Capital, LLC',  color: 'text-fli-blue-300' },
				{ label: 'Broker Status',  value: 'SEC Registered · FINRA, SIPC',color: 'text-white' },
				{ label: 'Timeline',       value: 'Q3 2026',                     color: 'text-yellow-400' },
				{ label: 'Price Per Unit', value: 'TBD at close',                color: 'text-white/50' },
			] as item}
				<div class="rounded-lg border border-white/8 bg-white/3 p-3">
					<div class="text-xs text-white/30 uppercase tracking-widest mb-1">{item.label}</div>
					<div class="text-sm font-bold {item.color}">{item.value}</div>
				</div>
			{/each}
		</div>
	</div>
	{/if}

	<!-- Q3 2026 Seed Round summary -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
			<PieChart class="h-5 w-5 text-brand-400" />
			Q3 2026 Seed Round
		</h2>
		<div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
			{#each [
				{ label: 'Round Target',    value: seedRound.target       || 'TBD', color: 'text-brand-400' },
				{ label: 'Raised to Date',  value: seedRound.raised       || 'TBD', color: 'text-white' },
				{ label: 'Remaining',       value: remaining,                        color: 'text-yellow-400' },
				{ label: 'Price Per Unit',  value: seedRound.pricePerUnit || 'TBD', color: 'text-white' },
				{ label: 'Min. Investment', value: seedRound.minInvestment || 'TBD', color: 'text-white' },
				{ label: 'Placement Agent', value: seedRound.broker       || 'TBD', color: 'text-fli-blue-300' },
			] as item}
				<div class="rounded-lg bg-navy-900/60 border border-white/8 p-3">
					<div class="text-xs text-white/30 uppercase tracking-wide mb-1">{item.label}</div>
					<div class="text-sm font-bold {item.color}">{item.value}</div>
				</div>
			{/each}
		</div>
	</div>

	{#if hasData}
	<!-- Equity holders — only shown when real data is entered -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<h2 class="text-base font-bold text-white mb-4">Equity Holders</h2>
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/15 text-white/40 text-xs uppercase tracking-wide">
						<th class="text-left py-2 pr-4">Name / Entity</th>
						<th class="text-left py-2 px-4">Security Type</th>
						<th class="text-right py-2 px-4">Shares</th>
						<th class="text-right py-2 px-4">Amount Invested</th>
						<th class="text-right py-2 px-4">Date</th>
						<th class="text-right py-2 pl-4">Ownership %</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 text-xs">
					{#each equityHolders as holder}
						<tr class="text-white/50">
							<td class="py-2.5 pr-4 font-medium text-white">{holder.name}</td>
							<td class="py-2.5 px-4">
								<span class="rounded-full bg-white/8 px-2 py-0.5 text-xs text-white/40">{holder.type}</span>
							</td>
							<td class="py-2.5 px-4 text-right font-mono">{holder.shares || '—'}</td>
							<td class="py-2.5 px-4 text-right font-mono">{holder.amount ? fmt(holder.amount) : '—'}</td>
							<td class="py-2.5 px-4 text-right">{holder.date || '—'}</td>
							<td class="py-2.5 pl-4 text-right font-mono">{holder.pct ? holder.pct + '%' : '—'}</td>
						</tr>
					{/each}
					<tr class="border-t border-white/15 bg-white/3 font-bold text-xs">
						<td class="py-2.5 pr-4 text-white">Total</td>
						<td class="py-2.5 px-4"></td>
						<td class="py-2.5 px-4 text-right font-mono text-white">—</td>
						<td class="py-2.5 px-4 text-right font-mono text-white">—</td>
						<td class="py-2.5 px-4"></td>
						<td class="py-2.5 pl-4 text-right font-mono text-white">100%</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<!-- Outstanding loans -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<h2 class="text-base font-bold text-white mb-4">Outstanding Loans & Notes Payable</h2>
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/15 text-white/40 text-xs uppercase tracking-wide">
						<th class="text-left py-2 pr-4">Lender</th>
						<th class="text-right py-2 px-4">Principal</th>
						<th class="text-right py-2 px-4">Interest Rate</th>
						<th class="text-right py-2 px-4">Maturity</th>
						<th class="text-right py-2 pl-4">Status</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 text-xs">
					{#each loans as loan}
						<tr class="text-white/50">
							<td class="py-2.5 pr-4 font-medium text-white">{loan.lender}</td>
							<td class="py-2.5 px-4 text-right font-mono">{loan.amount ? fmt(loan.amount) : '—'}</td>
							<td class="py-2.5 px-4 text-right">{loan.rate || '—'}</td>
							<td class="py-2.5 px-4 text-right">{loan.maturity || '—'}</td>
							<td class="py-2.5 pl-4 text-right">{loan.status || '—'}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
	{:else}
	<!-- Anticipated structure — shown pre-close -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<div class="flex items-center gap-2 mb-4">
			<Info class="h-5 w-5 text-white/40" />
			<h2 class="text-base font-bold text-white">Anticipated Equity Structure</h2>
			<span class="ml-auto rounded-full bg-yellow-500/15 px-2.5 py-0.5 text-xs font-semibold text-yellow-400">Pre-Close</span>
		</div>
		<p class="text-sm text-white/50 mb-5 leading-relaxed">The full cap table — including founder equity, investor allocations, and any option pool — will be published here upon close of the Q3 2026 seed round. The anticipated structure is outlined below.</p>
		<div class="space-y-3">
			{#each [
				{ label: 'Founder / Management Equity', detail: 'Retained common shares — percentage TBD at close', badge: 'Common', color: 'text-brand-400' },
				{ label: 'Seed Round Investors',        detail: '$7.5M raise · Equity or SAFE · Q3 2026 close', badge: 'Preferred / SAFE', color: 'text-fli-blue-300' },
				{ label: 'Option Pool',                 detail: 'Reserved for future employees and advisors — size TBD', badge: 'Options', color: 'text-yellow-400' },
				{ label: 'Outstanding Loans',           detail: 'No outstanding debt obligations at this time', badge: 'Clean', color: 'text-green-400' },
			] as row}
				<div class="flex items-center gap-4 rounded-lg border border-white/8 bg-white/3 px-4 py-3">
					<div class="flex-1 min-w-0">
						<div class="text-sm font-semibold text-white">{row.label}</div>
						<div class="text-xs text-white/40 mt-0.5">{row.detail}</div>
					</div>
					<span class="rounded-full bg-white/8 px-2.5 py-0.5 text-xs font-medium {row.color} shrink-0">{row.badge}</span>
				</div>
			{/each}
		</div>
	</div>
	{/if}

	<!-- Dilution note -->
	<div class="rounded-xl border border-white/10 bg-white/3 p-4 flex items-start gap-3">
		<Info class="h-4 w-4 text-white/30 shrink-0 mt-0.5" />
		<p class="text-xs text-white/40 leading-relaxed">
			Post-money ownership percentages will be updated following close of the Q3 2026 seed round. Any convertible instruments (SAFEs, convertible notes) will convert at the terms specified in their respective agreements. Consult legal counsel for dilution modeling.
		</p>
	</div>

	<p class="text-xs text-white/20">Cap table information is strictly confidential and subject to the NDA you accepted. Unauthorized disclosure is prohibited.</p>
</div>
