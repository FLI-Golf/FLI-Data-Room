<script lang="ts">
	import { enhance } from '$app/forms';
	import { Plus, Trash2, Info } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	type Row = { year: string; revenue: string; cogs: string; grossProfit: string; opex: string; ebitda: string; netIncome: string; margin: string; notes: string };
	type Stream = { stream: string; pct2026: string; pct2031: string };

	const savedProj = (data.saved?.projections as Row[]) ?? [];
	const years = data.years as string[];

	let projections: Row[] = years.map((year, i) => savedProj[i] ?? {
		year, revenue: '', cogs: '', grossProfit: '', opex: '', ebitda: '', netIncome: '', margin: '', notes: ''
	});

	let revenueStreams: Stream[] = (data.saved?.revenueStreams as Stream[]) ?? [
		{ stream: 'Event Ticket Sales', pct2026: '', pct2031: '' },
		{ stream: 'Sponsorship & Naming Rights', pct2026: '', pct2031: '' },
		{ stream: 'Media Rights & Streaming', pct2026: '', pct2031: '' },
		{ stream: 'Sports Betting (B2B)', pct2026: '', pct2031: '' },
		{ stream: 'Fantasy Sports & Gaming', pct2026: '', pct2031: '' },
		{ stream: 'Tribal Gaming Partnerships', pct2026: '', pct2031: '' },
		{ stream: 'Merchandise & Licensing', pct2026: '', pct2031: '' },
	];

	let excelDocId: string = (data.saved?.excelDocId as string) ?? '';

	let step = 0;
	const steps = ['P&L Figures', 'Revenue Mix', 'Excel Upload', 'Review'];

	function addStream() { revenueStreams = [...revenueStreams, { stream: '', pct2026: '', pct2031: '' }]; }
	function removeStream(i: number) { revenueStreams = revenueStreams.filter((_, idx) => idx !== i); }

	const inputClass = 'w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50';
	const numClass   = 'w-full rounded-md border border-white/15 bg-navy-800/50 px-2 py-1.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 font-mono text-right';
</script>

<svelte:head><title>Financial Projections — Content Editor</title></svelte:head>

<div class="max-w-4xl space-y-6">
	<div>
		<a href="/admin/content" class="text-xs text-white/30 hover:text-white/60 transition-colors">← Content Editor</a>
		<h1 class="text-2xl font-black text-white mt-1">Financial Projections</h1>
		<p class="text-sm text-white/50 mt-1">Enter the actual P&L figures from your financial model. All values in USD millions (e.g. enter <code class="text-xs bg-white/8 px-1 rounded">2.8</code> for $2.8M).</p>
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

		<!-- Step 1: P&L -->
		{#if step === 0}
			<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/15 p-4 flex items-start gap-3">
				<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
				<p class="text-xs text-white/55 leading-relaxed">
					Enter all figures in <strong class="text-white/70">USD millions</strong>. Use negative numbers for losses (e.g. <code class="bg-white/8 px-1 rounded">-1.8</code>). Leave blank if unknown — the dashboard will show the existing placeholder values. <strong class="text-white/70">Gross Profit</strong> = Revenue − COGS. <strong class="text-white/70">EBITDA</strong> = Gross Profit − OpEx.
				</p>
			</div>

			<div class="overflow-x-auto rounded-xl border border-white/15 bg-navy-700/50">
				<table class="w-full text-xs">
					<thead>
						<tr class="border-b border-white/15 text-white/40 uppercase tracking-wide">
							<th class="text-left px-4 py-3 min-w-[130px]">Line Item</th>
							{#each years as year}
								<th class="text-right px-2 py-3 min-w-[80px]">{year}</th>
							{/each}
						</tr>
					</thead>
					<tbody class="divide-y divide-white/5">
						{#each [
							{ key: 'revenue',     label: 'Revenue ($M)',      bold: true },
							{ key: 'cogs',        label: 'COGS ($M)',         bold: false },
							{ key: 'grossProfit', label: 'Gross Profit ($M)', bold: true },
							{ key: 'opex',        label: 'OpEx ($M)',         bold: false },
							{ key: 'ebitda',      label: 'EBITDA ($M)',       bold: true },
							{ key: 'netIncome',   label: 'Net Income ($M)',   bold: true },
							{ key: 'margin',      label: 'Net Margin (%)',    bold: false },
						] as row}
							<tr class="{row.bold ? 'bg-white/3' : ''}">
								<td class="px-4 py-2 {row.bold ? 'font-semibold text-white' : 'text-white/50'}">{row.label}</td>
								{#each projections as proj}

									<td class="px-2 py-1.5">
										<input
											name="{proj.year}_{row.key}"
											bind:value={(proj as Record<string, string>)[row.key]}
											type="text"
											placeholder="—"
											class={numClass}
										/>
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Year notes -->
			<div class="space-y-3">
				<h3 class="text-sm font-semibold text-white">Year-by-Year Assumption Notes</h3>
				{#each projections as proj}
					<div class="flex items-start gap-3">
						<span class="text-xs font-bold text-white/50 w-10 shrink-0 pt-2">{proj.year}</span>
						<input name="{proj.year}_notes" bind:value={proj.notes} type="text"
							placeholder="e.g. Inaugural season. Single event. Seed capital deployed."
							class={inputClass} />
					</div>
				{/each}
			</div>

		<!-- Step 2: Revenue Mix -->
		{:else if step === 1}
			<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/15 p-4 flex items-start gap-3">
				<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
				<p class="text-xs text-white/55 leading-relaxed">
					Enter the percentage mix of each revenue stream in 2026 (launch year) and 2031 (maturity). Values should add up to 100% for each year. This shows investors how the revenue mix evolves as the business scales.
				</p>
			</div>

			<div class="rounded-xl border border-white/15 bg-navy-700/50 overflow-hidden">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-white/15 text-white/40 text-xs uppercase tracking-wide">
							<th class="text-left px-4 py-3">Revenue Stream</th>
							<th class="text-right px-4 py-3 w-24">2026 %</th>
							<th class="text-right px-4 py-3 w-24">2031 %</th>
							<th class="px-3 py-3 w-10"></th>
						</tr>
					</thead>
					<tbody class="divide-y divide-white/5">
						{#each revenueStreams as stream, i}
							<tr>
								<td class="px-4 py-2">
									<input name="stream_{i}_name" bind:value={stream.stream} type="text"
										placeholder="Revenue stream name"
										class="w-full bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none border-b border-transparent focus:border-white/20" />
								</td>
								<td class="px-4 py-2">
									<input name="stream_{i}_pct2026" bind:value={stream.pct2026} type="text"
										placeholder="0"
										class="w-full bg-transparent text-sm text-white text-right placeholder:text-white/25 focus:outline-none border-b border-transparent focus:border-white/20 font-mono" />
								</td>
								<td class="px-4 py-2">
									<input name="stream_{i}_pct2031" bind:value={stream.pct2031} type="text"
										placeholder="0"
										class="w-full bg-transparent text-sm text-white text-right placeholder:text-white/25 focus:outline-none border-b border-transparent focus:border-white/20 font-mono" />
								</td>
								<td class="px-3 py-2 text-right">
									{#if revenueStreams.length > 1}
										<button type="button" on:click={() => removeStream(i)} class="text-white/20 hover:text-brand-400 transition-colors">
											<Trash2 class="h-3.5 w-3.5" />
										</button>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<button type="button" on:click={addStream}
				class="flex items-center gap-2 rounded-md border border-dashed border-white/20 px-4 py-2 text-sm text-white/40 hover:text-white hover:border-white/40 transition-colors">
				<Plus class="h-4 w-4" /> Add Revenue Stream
			</button>

		<!-- Step 3: Excel Upload -->
		{:else if step === 2}
			<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/15 p-4 flex items-start gap-3">
				<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
				<p class="text-xs text-white/55 leading-relaxed">
					Upload your Excel financial model via <a href="/admin/documents" target="_blank" class="text-yellow-400 hover:text-yellow-300 underline">Admin → Documents</a> with required role set to <strong class="text-white/70">advanced</strong>. Then paste the PocketBase record ID below. Investors will see a "Download Excel Model" button on the projections page.
				</p>
			</div>
			<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-3">
				<label class="block text-sm font-semibold text-white">Excel Model Doc ID</label>
				<input name="excelDocId" bind:value={excelDocId} type="text"
					placeholder="Paste PocketBase record ID from Admin → Documents"
					class={inputClass} />
				<p class="text-xs text-white/35">The record ID is the alphanumeric string in the URL when you view the document in PocketBase admin, e.g. <code class="bg-white/8 px-1 rounded">abc123xyz</code>.</p>
			</div>

		<!-- Step 4: Review -->
		{:else}
			<div class="space-y-4">
				<div class="rounded-xl border border-white/15 bg-navy-700/50 overflow-hidden">
					<table class="w-full text-xs">
						<thead>
							<tr class="border-b border-white/15 text-white/40 uppercase tracking-wide">
								<th class="text-left px-4 py-2">Year</th>
								<th class="text-right px-3 py-2">Revenue</th>
								<th class="text-right px-3 py-2">Net Income</th>
								<th class="text-right px-3 py-2">Margin</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-white/5">
							{#each projections as p}
								<tr>
									<td class="px-4 py-2 font-bold text-white">{p.year}</td>
									<td class="px-3 py-2 text-right text-white/60">{p.revenue ? '$' + p.revenue + 'M' : '—'}</td>
									<td class="px-3 py-2 text-right {p.netIncome && parseFloat(p.netIncome) < 0 ? 'text-brand-400' : 'text-green-400'}">{p.netIncome ? '$' + p.netIncome + 'M' : '—'}</td>
									<td class="px-3 py-2 text-right text-white/40">{p.margin ? p.margin + '%' : '—'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				{#if excelDocId}
					<p class="text-xs text-green-400">✓ Excel model linked (Doc ID: {excelDocId})</p>
				{:else}
					<p class="text-xs text-white/30">No Excel model linked yet — investors will see a placeholder download button.</p>
				{/if}
				<p class="text-xs text-white/30">Saving will immediately update the Financial Projections page visible to investors.</p>
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
