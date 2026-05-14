<script lang="ts">
	import { Receipt, Upload, ExternalLink, Info } from 'lucide-svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	type ISRow  = { key: string; label: string; values: (number|null)[]; section: string };
	type BSRow  = { key: string; label: string; values: (number|null)[]; subtotal?: boolean; total?: boolean };

	const PERIODS = ['FY 2024', 'FY 2025', 'Q1 2026'];

	const incomeStatement = {
		periods: PERIODS,
		rows: [
			{ key: 'revenue',         label: 'Revenue',                  values: [0,    0,    0   ], section: 'revenue'  },
			{ key: 'cogs',            label: 'Cost of Revenue',           values: [0,    0,    0   ], section: 'cogs'     },
			{ key: 'grossProfit',     label: 'Gross Profit',              values: [0,    0,    0   ], section: 'subtotal' },
			{ key: 'ga',              label: 'General & Administrative',  values: [null, null, null], section: 'opex'     },
			{ key: 'salesMarketing',  label: 'Sales & Marketing',         values: [null, null, null], section: 'opex'     },
			{ key: 'rd',              label: 'Research & Development',    values: [null, null, null], section: 'opex'     },
			{ key: 'totalOpex',       label: 'Total Operating Expenses',  values: [null, null, null], section: 'subtotal' },
			{ key: 'operatingIncome', label: 'Operating Income (Loss)',   values: [null, null, null], section: 'subtotal' },
			{ key: 'interestExpense', label: 'Interest Expense',          values: [null, null, null], section: 'other'    },
			{ key: 'netIncome',       label: 'Net Income (Loss)',         values: [null, null, null], section: 'total'    },
		] as ISRow[],
	};

	const balanceSheet = {
		periods: PERIODS,
		assets: [
			{ key: 'cash',               label: 'Cash & Equivalents',        values: [null, null, null] },
			{ key: 'accountsReceivable', label: 'Accounts Receivable',        values: [null, null, null] },
			{ key: 'prepaidOther',       label: 'Prepaid & Other Current',    values: [null, null, null] },
			{ key: 'totalCurrentAssets', label: 'Total Current Assets',       values: [null, null, null], subtotal: true },
			{ key: 'ppe',                label: 'Property & Equipment, Net',  values: [null, null, null] },
			{ key: 'intangibles',        label: 'Intangible Assets',          values: [null, null, null] },
			{ key: 'totalAssets',        label: 'Total Assets',               values: [null, null, null], total: true },
		] as BSRow[],
		liabilities: [
			{ key: 'accountsPayable',         label: 'Accounts Payable',           values: [null, null, null] },
			{ key: 'accruedLiabilities',      label: 'Accrued Liabilities',        values: [null, null, null] },
			{ key: 'notesPayableCurrent',     label: 'Notes Payable (Current)',     values: [null, null, null] },
			{ key: 'totalCurrentLiabilities', label: 'Total Current Liabilities',  values: [null, null, null], subtotal: true },
			{ key: 'longTermDebt',            label: 'Long-Term Debt',             values: [null, null, null] },
			{ key: 'totalLiabilities',        label: 'Total Liabilities',          values: [null, null, null], total: true },
		] as BSRow[],
		equity: [
			{ key: 'paidInCapital',    label: 'Common Stock / Paid-In Capital', values: [null, null, null] },
			{ key: 'retainedEarnings', label: 'Retained Earnings (Deficit)',    values: [null, null, null] },
			{ key: 'totalEquity',      label: "Total Stockholders' Equity",     values: [null, null, null], total: true },
		] as BSRow[],
	};

	type Grid = Record<string, Record<string, string>>;

	const savedIS  = (data.content?.incomeStatement as Grid) ?? {};
	const savedBS  = data.content?.balanceSheet as { assets?: Grid; liabilities?: Grid; equity?: Grid } ?? {};
	const isDocId  = (data.content?.isDocId as string) ?? '';
	const bsDocId  = (data.content?.bsDocId as string) ?? '';

	$: hasData = Object.values(savedIS).some(row => Object.values(row).some(v => v !== ''));

	// Merge saved values into the static row definitions
	function cellVal(grid: Grid, key: string, period: string): string {
		return grid?.[key]?.[period] ?? '';
	}

	function fmt(v: number | null | string): string {
		if (v === null || v === undefined || v === '') return '—';
		const n = typeof v === 'string' ? parseFloat(v) : v;
		if (isNaN(n)) return String(v);
		if (n === 0) return '$0';
		return n < 0 ? `($${Math.abs(n).toLocaleString()})` : `$${n.toLocaleString()}`;
	}
</script>

<svelte:head>
	<title>Financial Statements — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-10">
	<div>
		<h1 class="text-3xl font-black text-white">Company Financial Statements</h1>
		<p class="mt-1 text-white/50">Income statement and balance sheet through FY 2025 and Q1 2026.</p>
	</div>

	{#if !hasData}
	<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5 flex items-start gap-3">
		<Upload class="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
		<div>
			<div class="text-sm font-semibold text-yellow-400 mb-1">Statements Not Yet Entered</div>
			<p class="text-xs text-white/50 leading-relaxed">
				Have your accountant (Ina) prepare the income statement and balance sheet through FY 2025 and Q1 2026, then go to
				<a href="/admin/content/financial-statements" class="text-yellow-400 hover:text-yellow-300 underline">Admin → Content Editor → Financial Statements</a>
				to enter the figures.
			</p>
		</div>
	</div>
	{/if}

	<!-- Pre-revenue note -->
	<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/20 p-4 flex items-start gap-3">
		<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
		<p class="text-xs text-white/50 leading-relaxed">
			FLI Golf is a pre-revenue company. Investors understand this — what matters is accurate accounting of capital raised, expenses incurred, and the current balance sheet position. Transparency here builds credibility.
		</p>
	</div>

	<!-- Income Statement -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<div class="flex items-center justify-between mb-5">
			<h2 class="text-lg font-bold text-white flex items-center gap-2">
				<Receipt class="h-5 w-5 text-white/40" />
				Income Statement
			</h2>
			{#if isDocId}
				<a href="/api/documents/{isDocId}" target="_blank" class="flex items-center gap-1.5 rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-500 transition-colors">
					<ExternalLink class="h-3 w-3" /> View PDF
				</a>
			{/if}
		</div>
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/15 text-white/40 text-xs uppercase tracking-wide">
						<th class="text-left py-2 pr-4 min-w-[200px]">Line Item</th>
						{#each incomeStatement.periods as period}
							<th class="text-right py-2 px-4">{period}</th>
						{/each}
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 text-xs">
					{#each incomeStatement.rows as row}
						<tr class="{row.section === 'subtotal' || row.section === 'total' ? 'bg-white/3' : ''}">
							<td class="py-2.5 pr-4 {row.section === 'total' ? 'font-bold text-white' : row.section === 'subtotal' ? 'font-semibold text-white/80' : 'text-white/50'} {row.section === 'opex' ? 'pl-4' : ''}">
								{row.label}
							</td>
							{#each incomeStatement.periods as period}
								{@const saved = cellVal(savedIS, row.key, period)}
								<td class="py-2.5 px-4 text-right font-mono {row.section === 'total' ? 'font-bold text-white' : 'text-white/40'}">
									{saved !== '' ? fmt(saved) : fmt(row.values[incomeStatement.periods.indexOf(period)])}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Balance Sheet -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6 space-y-6">
		<div class="flex items-center justify-between">
			<h2 class="text-lg font-bold text-white">Balance Sheet</h2>
			{#if bsDocId}
				<a href="/api/documents/{bsDocId}" target="_blank" class="flex items-center gap-1.5 rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-500 transition-colors">
					<ExternalLink class="h-3 w-3" /> View PDF
				</a>
			{/if}
		</div>

		{#each [
			{ title: 'Assets',                rows: balanceSheet.assets,      grid: savedBS.assets      ?? {} },
			{ title: 'Liabilities',           rows: balanceSheet.liabilities, grid: savedBS.liabilities ?? {} },
			{ title: "Stockholders' Equity",  rows: balanceSheet.equity,      grid: savedBS.equity      ?? {} },
		] as section}
			<div>
				<div class="text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">{section.title}</div>
				<table class="w-full text-xs">
					<tbody class="divide-y divide-white/5">
						{#each section.rows as row, ri}
							<tr class="{row.total || row.subtotal ? 'bg-white/3' : ''}">
								<td class="py-2 pr-4 min-w-[200px] {row.total ? 'font-bold text-white' : row.subtotal ? 'font-semibold text-white/70' : 'text-white/50 pl-4'}">
									{row.label}
								</td>
								{#each balanceSheet.periods as period, pi}
									{@const saved = cellVal(section.grid, row.key, period)}
									<td class="py-2 px-4 text-right font-mono {row.total ? 'font-bold text-white' : 'text-white/40'}">
										{saved !== '' ? fmt(saved) : fmt(row.values[pi])}
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/each}
	</div>

	<p class="text-xs text-white/20">All financial statements are confidential and subject to the NDA you accepted. Statements should be reviewed by a qualified accountant before distribution to investors.</p>
</div>
