<script lang="ts">
	import { enhance } from '$app/forms';
	import { Plus, Trash2, Info, AlertTriangle } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	type SeedRound = { target: string; raised: string; pricePerUnit: string; minInvestment: string; broker: string };
	type Holder = { name: string; type: string; shares: string; amount: string; pct: string; date: string };
	type Loan   = { lender: string; amount: string; rate: string; maturity: string; status: string };

	let seedRound: SeedRound = (data.saved?.seedRound as SeedRound) ?? {
		target: '$7,500,000', raised: '', pricePerUnit: '', minInvestment: '', broker: 'Young America Capital, LLC'
	};

	let equityHolders: Holder[] = (data.saved?.equityHolders as Holder[]) ?? [
		{ name: '', type: 'Common', shares: '', amount: '', pct: '', date: '' },
	];

	let loans: Loan[] = (data.saved?.loans as Loan[]) ?? [
		{ lender: '', amount: '', rate: '', maturity: '', status: '' },
	];

	let step = 0;
	const steps = ['Seed Round', 'Equity Holders', 'Loans & Notes', 'Review'];

	function addHolder() { equityHolders = [...equityHolders, { name: '', type: 'Preferred', shares: '', amount: '', pct: '', date: '' }]; }
	function removeHolder(i: number) { equityHolders = equityHolders.filter((_, idx) => idx !== i); }
	function addLoan() { loans = [...loans, { lender: '', amount: '', rate: '', maturity: '', status: '' }]; }
	function removeLoan(i: number) { loans = loans.filter((_, idx) => idx !== i); }

	const inputClass = 'w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50';
</script>

<svelte:head><title>Cap Table — Content Editor</title></svelte:head>

<div class="max-w-3xl space-y-6">
	<div>
		<a href="/admin/content" class="text-xs text-white/30 hover:text-white/60 transition-colors">← Content Editor</a>
		<h1 class="text-2xl font-black text-white mt-1">Cap Table</h1>
		<p class="text-sm text-white/50 mt-1">Enter all equity holders, loans, and seed round details. This is highly sensitive — only advanced-role investors can view it.</p>
	</div>

	<div class="rounded-xl border border-brand-600/30 bg-brand-600/10 p-4 flex items-start gap-3">
		<AlertTriangle class="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
		<p class="text-xs text-white/60 leading-relaxed">Cap table data is restricted to <strong class="text-white/80">advanced</strong> role investors only. Ensure all figures are accurate and reviewed by legal counsel before publishing.</p>
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
				<p class="text-xs text-white/55 leading-relaxed">Enter the Q3 2026 seed round details. <strong class="text-white/70">Raised to Date</strong> should reflect actual capital received, not commitments. Update this as the round closes.</p>
			</div>
			<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-4">
				<div class="grid sm:grid-cols-2 gap-4">
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Round Target</label>
						<input name="seed_target" bind:value={seedRound.target} type="text" placeholder="$7,500,000" class={inputClass} />
					</div>
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Raised to Date</label>
						<input name="seed_raised" bind:value={seedRound.raised} type="text" placeholder="$0" class={inputClass} />
					</div>
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Price Per Unit</label>
						<input name="seed_pricePerUnit" bind:value={seedRound.pricePerUnit} type="text" placeholder="e.g. $50,000 per unit" class={inputClass} />
					</div>
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Minimum Investment</label>
						<input name="seed_minInvestment" bind:value={seedRound.minInvestment} type="text" placeholder="e.g. $25,000" class={inputClass} />
					</div>
					<div class="space-y-1 sm:col-span-2">
						<label class="block text-xs font-medium text-white/60">Placement Agent / Broker</label>
						<input name="seed_broker" bind:value={seedRound.broker} type="text" placeholder="Young America Capital, LLC" class={inputClass} />
					</div>
				</div>
			</div>

		{:else if step === 1}
			<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/15 p-4 flex items-start gap-3">
				<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
				<p class="text-xs text-white/55 leading-relaxed">
					Add every equity holder — founders, investors, and option pool. <strong class="text-white/70">Amount Invested</strong> is in USD. <strong class="text-white/70">Ownership %</strong> is post-money after this round closes. Include SAFEs and convertible notes as separate rows with their type noted.
				</p>
			</div>

			{#each equityHolders as holder, i}
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-4">
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold text-white">Holder {i + 1}</span>
						{#if equityHolders.length > 1}
							<button type="button" on:click={() => removeHolder(i)} class="text-brand-400 hover:text-brand-300"><Trash2 class="h-4 w-4" /></button>
						{/if}
					</div>
					<div class="grid sm:grid-cols-3 gap-3">
						<div class="space-y-1 sm:col-span-2">
							<label class="block text-xs font-medium text-white/60">Name / Entity <span class="text-brand-400">*</span></label>
							<input name="eq_{i}_name" bind:value={holder.name} required type="text" placeholder="e.g. John Smith / FLI Holdings LLC" class={inputClass} />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Security Type</label>
							<select name="eq_{i}_type" bind:value={holder.type} class={inputClass}>
								<option>Common</option>
								<option>Preferred</option>
								<option>Options</option>
								<option>SAFE</option>
								<option>Convertible Note</option>
								<option>Warrant</option>
							</select>
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Shares / Units</label>
							<input name="eq_{i}_shares" bind:value={holder.shares} type="text" placeholder="e.g. 1,000,000" class={inputClass} />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Amount Invested ($)</label>
							<input name="eq_{i}_amount" bind:value={holder.amount} type="text" placeholder="e.g. 500,000" class={inputClass} />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Ownership %</label>
							<input name="eq_{i}_pct" bind:value={holder.pct} type="text" placeholder="e.g. 12.5" class={inputClass} />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Investment Date</label>
							<input name="eq_{i}_date" bind:value={holder.date} type="text" placeholder="e.g. Jan 2025" class={inputClass} />
						</div>
					</div>
				</div>
			{/each}
			<button type="button" on:click={addHolder}
				class="flex items-center gap-2 rounded-md border border-dashed border-white/20 px-4 py-2 text-sm text-white/40 hover:text-white hover:border-white/40 transition-colors">
				<Plus class="h-4 w-4" /> Add Equity Holder
			</button>

		{:else if step === 2}
			<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/15 p-4 flex items-start gap-3">
				<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
				<p class="text-xs text-white/55 leading-relaxed">Add all outstanding loans and notes payable. Include related-party loans, bank debt, and any other obligations. Investors need to see the full debt picture.</p>
			</div>

			{#each loans as loan, i}
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-4">
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold text-white">Loan / Note {i + 1}</span>
						{#if loans.length > 1}
							<button type="button" on:click={() => removeLoan(i)} class="text-brand-400 hover:text-brand-300"><Trash2 class="h-4 w-4" /></button>
						{/if}
					</div>
					<div class="grid sm:grid-cols-2 gap-3">
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Lender <span class="text-brand-400">*</span></label>
							<input name="loan_{i}_lender" bind:value={loan.lender} required type="text" placeholder="e.g. First National Bank" class={inputClass} />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Principal Amount ($)</label>
							<input name="loan_{i}_amount" bind:value={loan.amount} type="text" placeholder="e.g. 250,000" class={inputClass} />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Interest Rate</label>
							<input name="loan_{i}_rate" bind:value={loan.rate} type="text" placeholder="e.g. 8% per annum" class={inputClass} />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Maturity Date</label>
							<input name="loan_{i}_maturity" bind:value={loan.maturity} type="text" placeholder="e.g. Dec 2026" class={inputClass} />
						</div>
						<div class="space-y-1 sm:col-span-2">
							<label class="block text-xs font-medium text-white/60">Status</label>
							<input name="loan_{i}_status" bind:value={loan.status} type="text" placeholder="e.g. Current, In default, Paid off" class={inputClass} />
						</div>
					</div>
				</div>
			{/each}
			<button type="button" on:click={addLoan}
				class="flex items-center gap-2 rounded-md border border-dashed border-white/20 px-4 py-2 text-sm text-white/40 hover:text-white hover:border-white/40 transition-colors">
				<Plus class="h-4 w-4" /> Add Loan / Note
			</button>

		{:else}
			<div class="space-y-4">
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-2">
					<h3 class="text-sm font-bold text-white">Seed Round</h3>
					<div class="text-xs text-white/50">Target: <span class="text-white">{seedRound.target || '—'}</span> · Raised: <span class="text-white">{seedRound.raised || '—'}</span></div>
				</div>
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-2">
					<h3 class="text-sm font-bold text-white">Equity Holders ({equityHolders.filter(h => h.name).length})</h3>
					{#each equityHolders.filter(h => h.name) as h}
						<div class="flex justify-between text-xs py-1 border-b border-white/5 last:border-0">
							<span class="text-white">{h.name}</span>
							<span class="text-white/40">{h.type}{h.pct ? ' · ' + h.pct + '%' : ''}</span>
						</div>
					{/each}
				</div>
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-2">
					<h3 class="text-sm font-bold text-white">Loans ({loans.filter(l => l.lender).length})</h3>
					{#each loans.filter(l => l.lender) as l}
						<div class="flex justify-between text-xs py-1 border-b border-white/5 last:border-0">
							<span class="text-white">{l.lender}</span>
							<span class="text-white/40">{l.amount ? '$' + l.amount : '—'}</span>
						</div>
					{/each}
				</div>
				<p class="text-xs text-white/30">Saving will immediately update the Cap Table page visible to advanced investors.</p>
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
