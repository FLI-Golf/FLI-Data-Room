<script lang="ts">
	import { enhance } from '$app/forms';
	import { Plus, Trash2, Info } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	type Sponsor = { name: string; tier?: string; category: string; value: string; loiStatus: string; docId: string; notes: string };

	let sponsors: Sponsor[] = (data.saved?.sponsors as Sponsor[]) ?? [
		{ name: '', category: '', value: '', loiStatus: 'pending', docId: '', notes: '' },
	];

	let step = 0;
	const steps = ['Sponsors', 'Review'];

	function add() { sponsors = [...sponsors, { name: '', category: '', value: '', loiStatus: 'pending', docId: '', notes: '' }]; }
	function remove(i: number) { sponsors = sponsors.filter((_, idx) => idx !== i); }

	const inputClass = 'w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50';
</script>

<svelte:head><title>Sponsorships — Content Editor</title></svelte:head>

<div class="max-w-3xl space-y-6">
	<div>
		<a href="/admin/content" class="text-xs text-white/30 hover:text-white/60 transition-colors">← Content Editor</a>
		<h1 class="text-2xl font-black text-white mt-1">Sponsorships</h1>
		<p class="text-sm text-white/50 mt-1">Enter each sponsor and LOI status. Upload the actual LOI PDFs via Admin → Documents.</p>
	</div>

	{#if form?.error}
		<div class="rounded-md bg-brand-600/10 border border-brand-600/20 px-4 py-3 text-sm text-brand-400">{form.error}</div>
	{/if}

	<div class="flex gap-1 border-b border-white/10">
		{#each steps as label, i}
			<button type="button" on:click={() => step = i}
				class="px-4 py-2 text-sm font-medium rounded-t-md transition-colors {step === i ? 'bg-navy-700/80 text-white border border-b-0 border-white/15' : 'text-white/40 hover:text-white/70'}">
				{i + 1}. {label}
			</button>
		{/each}
	</div>

	<form method="POST" action="?/save" use:enhance class="space-y-6">
		{#if step === 0}
			<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/15 p-4 flex items-start gap-3">
				<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
				<p class="text-xs text-white/55 leading-relaxed">
					Add one entry per sponsor. Set <strong class="text-white/70">LOI Status</strong> to <em>Signed</em> only when the LOI has been executed. The <strong class="text-white/70">Doc ID</strong> links to the uploaded LOI PDF — paste the PocketBase record ID from Admin → Documents. <strong class="text-white/70">Value</strong> is optional and can be "TBD".
				</p>
			</div>

			{#each sponsors as sponsor, i}
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-4">
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold text-white">Sponsor {i + 1}</span>
						{#if sponsors.length > 1}
							<button type="button" on:click={() => remove(i)} class="text-brand-400 hover:text-brand-300"><Trash2 class="h-4 w-4" /></button>
						{/if}
					</div>
					<div class="grid sm:grid-cols-2 gap-4">
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Sponsor Name <span class="text-brand-400">*</span></label>
							<input name="sponsor_{i}_name" bind:value={sponsor.name} required type="text" placeholder="e.g. Acme Corporation" class={inputClass} />
						</div>
						<input type="hidden" name="sponsor_{i}_tier" value={sponsor.tier ?? ''} />
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Category / Industry</label>
							<input name="sponsor_{i}_category" bind:value={sponsor.category} type="text" placeholder="e.g. Beverage, Apparel, Technology" class={inputClass} />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Sponsorship Value</label>
							<input name="sponsor_{i}_value" bind:value={sponsor.value} type="text" placeholder="e.g. $500,000 or TBD" class={inputClass} />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">LOI Status</label>
							<select name="sponsor_{i}_loiStatus" bind:value={sponsor.loiStatus} class={inputClass}>
								<option value="pending">Pending</option>
								<option value="signed">Signed</option>
								<option value="in-negotiation">In Negotiation</option>
							</select>
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">LOI Doc ID</label>
							<input name="sponsor_{i}_docId" bind:value={sponsor.docId} type="text" placeholder="PocketBase record ID" class={inputClass} />
						</div>
					</div>
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Notes</label>
						<textarea name="sponsor_{i}_notes" bind:value={sponsor.notes} rows="2"
							placeholder="Any additional context about this sponsorship..."
							class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 resize-y"></textarea>
					</div>
				</div>
			{/each}
			<button type="button" on:click={add}
				class="flex items-center gap-2 rounded-md border border-dashed border-white/20 px-4 py-2 text-sm text-white/40 hover:text-white hover:border-white/40 transition-colors">
				<Plus class="h-4 w-4" /> Add Sponsor
			</button>

		{:else}
			<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-2">
				<h3 class="text-sm font-bold text-white mb-3">{sponsors.filter(s => s.name).length} sponsor(s) to save</h3>
				{#each sponsors.filter(s => s.name) as s}
					<div class="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0">
						<span><span class="font-medium text-white">{s.name}</span></span>
						<span class="{s.loiStatus === 'signed' ? 'text-green-400' : 'text-white/30'} capitalize">{s.loiStatus}</span>
					</div>
				{/each}
				{#if !sponsors.some(s => s.name)}<p class="text-xs text-brand-400">No sponsors entered yet.</p>{/if}
			</div>

			{#each sponsors as sponsor, i}
				<input type="hidden" name="sponsor_{i}_name" value={sponsor.name} />
				<input type="hidden" name="sponsor_{i}_tier" value={sponsor.tier} />
				<input type="hidden" name="sponsor_{i}_category" value={sponsor.category} />
				<input type="hidden" name="sponsor_{i}_value" value={sponsor.value} />
				<input type="hidden" name="sponsor_{i}_loiStatus" value={sponsor.loiStatus} />
				<input type="hidden" name="sponsor_{i}_docId" value={sponsor.docId} />
				<input type="hidden" name="sponsor_{i}_notes" value={sponsor.notes} />
			{/each}

			<p class="text-xs text-white/30">Saving will immediately update the Sponsorships page visible to investors.</p>
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
