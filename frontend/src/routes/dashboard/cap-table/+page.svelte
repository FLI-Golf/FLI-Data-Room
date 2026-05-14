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

	{#if !hasData}
	<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 flex items-start gap-3">
		<Upload class="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
		<p class="text-xs text-white/50 leading-relaxed">
			Cap table not yet entered. Go to <a href="/admin/content/cap-table" class="text-yellow-400 hover:text-yellow-300 underline">Admin → Content Editor → Cap Table</a> to add equity holders, loans, and seed round details.
		</p>
	</div>
	{/if}

	<!-- Confidentiality warning -->
	<div class="rounded-xl border border-brand-600/30 bg-brand-600/10 p-4 flex items-start gap-3">
		<AlertTriangle class="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
		<p class="text-xs text-white/60 leading-relaxed">
			The cap table is highly sensitive. This page is restricted to <span class="text-white/80 font-semibold">advanced</span> role investors only. Do not share or screenshot. All access is logged.
		</p>
	</div>

	<!-- Upload notice -->
	<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5 flex items-start gap-3">
		<Upload class="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
		<div>
			<div class="text-sm font-semibold text-yellow-400 mb-1">Update Cap Table — Action Required</div>
			<p class="text-xs text-white/50 leading-relaxed">
				Replace all placeholder rows below with actual investor names, share counts, amounts invested, and percentages.
				Also upload the full cap table as a PDF or Excel file via
				<a href="/admin/documents" class="text-yellow-400 hover:text-yellow-300 underline">Admin → Documents</a>
				with required role set to <span class="text-white/70">advanced</span>.
				Include all equity holders, convertible notes, SAFEs, and outstanding loans.
			</p>
		</div>
	</div>

	<!-- Q2 2026 Seed Round summary -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
			<PieChart class="h-5 w-5 text-brand-400" />
			Q2 2026 Seed Round
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

	<!-- Equity holders -->
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
							<td class="py-2.5 pr-4 font-medium {hasData ? 'text-white' : 'text-white/40 italic'}">{holder.name}</td>
							<td class="py-2.5 px-4">
								<span class="rounded-full bg-white/8 px-2 py-0.5 text-xs text-white/40">{holder.type}</span>
							</td>
							<td class="py-2.5 px-4 text-right font-mono">{holder.shares || '—'}</td>
							<td class="py-2.5 px-4 text-right font-mono">{holder.amount ? fmt(holder.amount) : '—'}</td>
							<td class="py-2.5 px-4 text-right">{holder.date || '—'}</td>
							<td class="py-2.5 pl-4 text-right font-mono">{holder.pct ? holder.pct + '%' : '—'}</td>
						</tr>
					{/each}
					<!-- Totals row -->
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
							<td class="py-2.5 pr-4 font-medium {hasData ? 'text-white' : 'text-white/40 italic'}">{loan.lender}</td>
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

	<!-- Dilution note -->
	<div class="rounded-xl border border-white/10 bg-white/3 p-4 flex items-start gap-3">
		<Info class="h-4 w-4 text-white/30 shrink-0 mt-0.5" />
		<p class="text-xs text-white/40 leading-relaxed">
			Post-money ownership percentages will be updated following close of the Q2 2026 seed round. Any convertible instruments (SAFEs, convertible notes) will convert at the terms specified in their respective agreements. Consult legal counsel for dilution modeling.
		</p>
	</div>

	<p class="text-xs text-white/20">Cap table information is strictly confidential and subject to the NDA you accepted. Unauthorized disclosure is prohibited.</p>
</div>
