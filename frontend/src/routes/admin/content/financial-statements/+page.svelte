<script lang="ts">
	import { enhance } from '$app/forms';
	import { Info } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	const periods = data.periods as string[];

	type Grid = Record<string, Record<string, string>>;

	function initGrid(keys: string[], saved: Grid): Grid {
		const g: Grid = {};
		for (const k of keys) {
			g[k] = {};
			for (const p of periods) g[k][p] = saved?.[k]?.[p] ?? '';
		}
		return g;
	}

	const savedIS = (data.saved?.incomeStatement as Grid) ?? {};
	const savedBS = data.saved?.balanceSheet as { assets?: Grid; liabilities?: Grid; equity?: Grid } ?? {};

	const IS_ROWS = [
		{ key: 'revenue',         label: 'Revenue',                  bold: true,  indent: false },
		{ key: 'cogs',            label: 'Cost of Revenue',          bold: false, indent: true  },
		{ key: 'grossProfit',     label: 'Gross Profit',             bold: true,  indent: false },
		{ key: 'ga',              label: 'General & Administrative', bold: false, indent: true  },
		{ key: 'salesMarketing',  label: 'Sales & Marketing',        bold: false, indent: true  },
		{ key: 'rd',              label: 'Research & Development',   bold: false, indent: true  },
		{ key: 'totalOpex',       label: 'Total Operating Expenses', bold: true,  indent: false },
		{ key: 'operatingIncome', label: 'Operating Income (Loss)',  bold: true,  indent: false },
		{ key: 'interestExpense', label: 'Interest Expense',         bold: false, indent: true  },
		{ key: 'netIncome',       label: 'Net Income (Loss)',        bold: true,  indent: false },
	];

	const BS_ASSETS  = [
		{ key: 'cash',                label: 'Cash & Equivalents',       subtotal: false },
		{ key: 'accountsReceivable',  label: 'Accounts Receivable',      subtotal: false },
		{ key: 'prepaidOther',        label: 'Prepaid & Other Current',   subtotal: false },
		{ key: 'totalCurrentAssets',  label: 'Total Current Assets',     subtotal: true  },
		{ key: 'ppe',                 label: 'Property & Equipment, Net', subtotal: false },
		{ key: 'intangibles',         label: 'Intangible Assets',        subtotal: false },
		{ key: 'totalAssets',         label: 'Total Assets',             subtotal: true  },
	];
	const BS_LIAB = [
		{ key: 'accountsPayable',          label: 'Accounts Payable',          subtotal: false },
		{ key: 'accruedLiabilities',       label: 'Accrued Liabilities',       subtotal: false },
		{ key: 'notesPayableCurrent',      label: 'Notes Payable (Current)',    subtotal: false },
		{ key: 'totalCurrentLiabilities',  label: 'Total Current Liabilities', subtotal: true  },
		{ key: 'longTermDebt',             label: 'Long-Term Debt',            subtotal: false },
		{ key: 'totalLiabilities',         label: 'Total Liabilities',         subtotal: true  },
	];
	const BS_EQUITY = [
		{ key: 'paidInCapital',    label: "Common Stock / Paid-In Capital", subtotal: false },
		{ key: 'retainedEarnings', label: 'Retained Earnings (Deficit)',    subtotal: false },
		{ key: 'totalEquity',      label: "Total Stockholders' Equity",     subtotal: true  },
	];

	let isGrid  = initGrid(IS_ROWS.map(r => r.key),  savedIS);
	let assetG  = initGrid(BS_ASSETS.map(r => r.key), savedBS.assets ?? {});
	let liabG   = initGrid(BS_LIAB.map(r => r.key),   savedBS.liabilities ?? {});
	let equityG = initGrid(BS_EQUITY.map(r => r.key), savedBS.equity ?? {});

	let isDocId: string = (data.saved?.isDocId as string) ?? '';
	let bsDocId: string = (data.saved?.bsDocId as string) ?? '';

	let step = 0;
	const steps = ['Income Statement', 'Balance Sheet', 'PDF Links', 'Review'];

	const numClass = 'w-full bg-transparent text-xs text-white text-right placeholder:text-white/20 focus:outline-none border-b border-transparent focus:border-white/20 font-mono py-0.5';
	const inputClass = 'w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50';
</script>

<svelte:head><title>Financial Statements — Content Editor</title></svelte:head>

<div class="max-w-4xl space-y-6">
	<div>
		<a href="/admin/content" class="text-xs text-white/30 hover:text-white/60 transition-colors">← Content Editor</a>
		<h1 class="text-2xl font-black text-white mt-1">Financial Statements</h1>
		<p class="text-sm text-white/50 mt-1">Enter actual figures prepared by your accountant. All dollar values in USD (not millions). Use negative numbers for losses/deficits.</p>
	</div>

	{#if form?.error}
		<div class="rounded-md bg-brand-600/10 border border-brand-600/20 px-4 py-3 text-sm text-brand-400">{form.error}</div>
	{/if}

	<div class="flex gap-1 border-b border-white/10 overflow-x-auto">
		{#each steps as label, i}
			<button type="button" on:click={() => step = i}
				class="px-4 py-2 text-sm font-medium rounded-t-md whitespace-nowrap transition-colors {step === i ? 'bg-navy-700/80 text-white border border-b-0 border-white/15' : 'text-white/40 hover:text-white/70'}">
				{i + 1}. {label}
			</button>
		{/each}
	</div>

	<form method="POST" action="?/save" use:enhance class="space-y-6">

		{#if step === 0}
			<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/15 p-4 flex items-start gap-3">
				<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
				<p class="text-xs text-white/55 leading-relaxed">
					Enter figures in <strong class="text-white/70">actual USD</strong> (e.g. <code class="bg-white/8 px-1 rounded">-45000</code> for a $45K loss). Leave blank for any line not applicable. As a pre-revenue company, Revenue and COGS will likely be $0 — enter <code class="bg-white/8 px-1 rounded">0</code> explicitly to confirm. These figures should come from your accountant (Ina).
				</p>
			</div>
			<div class="overflow-x-auto rounded-xl border border-white/15 bg-navy-700/50">
				<table class="w-full text-xs">
					<thead>
						<tr class="border-b border-white/15 text-white/40 uppercase tracking-wide">
							<th class="text-left px-4 py-3 min-w-[200px]">Line Item</th>
							{#each periods as p}
								<th class="text-right px-3 py-3 min-w-[100px]">{p}</th>
							{/each}
						</tr>
					</thead>
					<tbody class="divide-y divide-white/5">
						{#each IS_ROWS as row}
							<tr class="{row.bold ? 'bg-white/3' : ''}">
								<td class="px-4 py-2 {row.bold ? 'font-semibold text-white' : 'text-white/50'} {row.indent ? 'pl-8' : ''}">{row.label}</td>
								{#each periods as p}
									<td class="px-3 py-1.5">
										<input name="is_{row.key}_{p}" bind:value={isGrid[row.key][p]} type="text" placeholder="—" class={numClass} />
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

		{:else if step === 1}
			<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/15 p-4 flex items-start gap-3">
				<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
				<p class="text-xs text-white/55 leading-relaxed">
					Enter the balance sheet as of each period end. Assets must equal Liabilities + Equity. Enter <code class="bg-white/8 px-1 rounded">0</code> for zero-balance lines rather than leaving blank, so investors can see the full picture.
				</p>
			</div>

			{#each [
				{ title: 'Assets', rows: BS_ASSETS, grid: assetG, prefix: 'bs_assets' },
				{ title: 'Liabilities', rows: BS_LIAB, grid: liabG, prefix: 'bs_liab' },
				{ title: "Stockholders' Equity", rows: BS_EQUITY, grid: equityG, prefix: 'bs_equity' },
			] as section}
				<div class="overflow-x-auto rounded-xl border border-white/15 bg-navy-700/50">
					<table class="w-full text-xs">
						<thead>
							<tr class="border-b border-white/15 text-white/40 uppercase tracking-wide">
								<th class="text-left px-4 py-3 min-w-[200px]">{section.title}</th>
								{#each periods as p}
									<th class="text-right px-3 py-3 min-w-[100px]">{p}</th>
								{/each}
							</tr>
						</thead>
						<tbody class="divide-y divide-white/5">
							{#each section.rows as row}
								<tr class="{row.subtotal ? 'bg-white/3' : ''}">
									<td class="px-4 py-2 {row.subtotal ? 'font-semibold text-white' : 'text-white/50 pl-8'}">{row.label}</td>
									{#each periods as p}
										<td class="px-3 py-1.5">
											<input name="{section.prefix}_{row.key}_{p}" bind:value={section.grid[row.key][p]} type="text" placeholder="—" class={numClass} />
										</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/each}

		{:else if step === 2}
			<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/15 p-4 flex items-start gap-3">
				<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
				<p class="text-xs text-white/55 leading-relaxed">
					Upload the finalized PDF statements via <a href="/admin/documents" target="_blank" class="text-yellow-400 hover:text-yellow-300 underline">Admin → Documents</a> with required role <strong class="text-white/70">advanced</strong>. Paste the PocketBase record IDs below to link "View PDF" buttons on the investor page.
				</p>
			</div>
			<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-4">
				<div class="space-y-1">
					<label class="block text-sm font-semibold text-white">Income Statement PDF Doc ID</label>
					<input name="isDocId" bind:value={isDocId} type="text" placeholder="PocketBase record ID" class={inputClass} />
				</div>
				<div class="space-y-1">
					<label class="block text-sm font-semibold text-white">Balance Sheet PDF Doc ID</label>
					<input name="bsDocId" bind:value={bsDocId} type="text" placeholder="PocketBase record ID" class={inputClass} />
				</div>
			</div>

		{:else}
			<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-3">
				<h3 class="text-sm font-bold text-white">Summary</h3>
				<div class="grid sm:grid-cols-3 gap-3">
					{#each periods as p}
						<div class="rounded-lg bg-navy-900/60 border border-white/8 p-3">
							<div class="text-xs text-white/40 mb-2">{p}</div>
							<div class="text-xs space-y-1">
								<div class="flex justify-between"><span class="text-white/50">Revenue</span><span class="text-white font-mono">{isGrid.revenue[p] || '—'}</span></div>
								<div class="flex justify-between"><span class="text-white/50">Net Income</span><span class="font-mono {isGrid.netIncome[p] && parseFloat(isGrid.netIncome[p]) < 0 ? 'text-brand-400' : 'text-green-400'}">{isGrid.netIncome[p] || '—'}</span></div>
								<div class="flex justify-between"><span class="text-white/50">Total Assets</span><span class="text-white font-mono">{assetG.totalAssets[p] || '—'}</span></div>
							</div>
						</div>
					{/each}
				</div>
				{#if isDocId || bsDocId}
					<p class="text-xs text-green-400">✓ PDF statements linked</p>
				{:else}
					<p class="text-xs text-white/30">No PDF statements linked yet.</p>
				{/if}
				<p class="text-xs text-white/30">Saving will immediately update the Financial Statements page visible to investors.</p>
			</div>
		{/if}

		<div class="flex items-center justify-between pt-4 border-t border-white/10">
			<button type="button" on:click={() => step = Math.max(0, step - 1)} disabled={step === 0}
				class="rounded-md border border-white/15 px-4 py-2 text-sm text-white/50 hover:text-white hover:border-white/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">← Previous</button>
			<span class="text-xs text-white/25">Step {step + 1} of {steps.length}</span>
			{#if step < steps.length - 1}
				<button type="button" on:click={() => step = step + 1} class="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition-colors">Next →</button>
			{:else}
				<button type="submit" class="rounded-md bg-yellow-500 px-5 py-2 text-sm font-semibold text-navy-950 hover:bg-yellow-400 transition-colors">Save & Publish</button>
			{/if}
		</div>
	</form>
</div>
