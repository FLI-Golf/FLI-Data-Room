<script lang="ts">
	import { enhance } from '$app/forms';
	import { Info } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	type Venue = { name: string; location: string; capacity: string; ownership: string; availability: string; estimatedCost: string; status: string; pros: string[]; cons: string[]; photoUrl: string; docId: string };

	const emptyVenue = (): Venue => ({ name: '', location: '', capacity: '', ownership: '', availability: '', estimatedCost: '', status: 'Under evaluation', pros: [], cons: [], photoUrl: '', docId: '' });

	const saved = (data.saved?.venues as Venue[]) ?? [];
	let venues: Venue[] = [saved[0] ?? emptyVenue(), saved[1] ?? emptyVenue()];

	// Editable as newline-separated text
	let prosText  = venues.map(v => v.pros.join('\n'));
	let consText  = venues.map(v => v.cons.join('\n'));

	let step = 0;
	const steps = ['Venue 1 (Preferred)', 'Venue 2 (Alternate)', 'Review'];

	const inputClass = 'w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50';
</script>

<svelte:head><title>Inaugural Venue — Content Editor</title></svelte:head>

<div class="max-w-3xl space-y-6">
	<div>
		<a href="/admin/content" class="text-xs text-white/30 hover:text-white/60 transition-colors">← Content Editor</a>
		<h1 class="text-2xl font-black text-white mt-1">Planned Inaugural Venue</h1>
		<p class="text-sm text-white/50 mt-1">Enter details for your top two venue candidates. Venue 1 is shown as the preferred option.</p>
	</div>

	{#if form?.success}
		<div class="rounded-md bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400">Saved successfully.</div>
	{/if}
	{#if form?.error}
		<div class="rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">{form.error}</div>
	{/if}

	<div class="flex gap-1 border-b border-white/10">
		{#each steps as label, i}
			<button type="button" on:click={() => step = i}
				class="px-4 py-2 text-sm font-medium rounded-t-md transition-colors {step === i ? 'bg-navy-700/80 text-white border border-b-0 border-white/15' : 'text-white/40 hover:text-white/70'}">
				{i + 1}. {label}
			</button>
		{/each}
	</div>

	<form method="POST" action="?/save" use:enhance class="space-y-5">

		{#if step < 2}
			{@const i = step}
			{@const v = venues[i]}

			<!-- Hidden fields for the other venue -->
			{#each venues as venue, vi}
				{#if vi !== i}
					<input type="hidden" name="venue_{vi}_name"          value={venue.name} />
					<input type="hidden" name="venue_{vi}_location"      value={venue.location} />
					<input type="hidden" name="venue_{vi}_capacity"      value={venue.capacity} />
					<input type="hidden" name="venue_{vi}_ownership"     value={venue.ownership} />
					<input type="hidden" name="venue_{vi}_availability"  value={venue.availability} />
					<input type="hidden" name="venue_{vi}_estimatedCost" value={venue.estimatedCost} />
					<input type="hidden" name="venue_{vi}_status"        value={venue.status} />
					<input type="hidden" name="venue_{vi}_pros"          value={prosText[vi]} />
					<input type="hidden" name="venue_{vi}_cons"          value={consText[vi]} />
					<input type="hidden" name="venue_{vi}_photoUrl"      value={venue.photoUrl} />
					<input type="hidden" name="venue_{vi}_docId"         value={venue.docId} />
				{/if}
			{/each}

			<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/15 p-4 flex items-start gap-3">
				<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
				<p class="text-xs text-white/55 leading-relaxed">
					Enter one advantage per line in <strong class="text-white/70">Advantages</strong> and one consideration per line in <strong class="text-white/70">Considerations</strong>. These display as bullet points to investors. Upload venue proposals or site plans via Admin → Documents and paste the record ID.
				</p>
			</div>

			<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-4">
				<div class="grid sm:grid-cols-2 gap-4">
					<div class="space-y-1 sm:col-span-2">
						<label class="block text-xs font-medium text-white/60">Venue Name <span class="text-brand-400">*</span></label>
						<input name="venue_{i}_name" bind:value={v.name} required type="text" placeholder="e.g. Topgolf Las Vegas" class={inputClass} />
					</div>
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Location</label>
						<input name="venue_{i}_location" bind:value={v.location} type="text" placeholder="City, State" class={inputClass} />
					</div>
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Status</label>
						<input name="venue_{i}_status" bind:value={v.status} type="text" placeholder="e.g. Under evaluation, LOI submitted" class={inputClass} />
					</div>
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Spectator Capacity</label>
						<input name="venue_{i}_capacity" bind:value={v.capacity} type="text" placeholder="e.g. 8,000" class={inputClass} />
					</div>
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Ownership</label>
						<input name="venue_{i}_ownership" bind:value={v.ownership} type="text" placeholder="e.g. Private / Municipal" class={inputClass} />
					</div>
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Availability</label>
						<input name="venue_{i}_availability" bind:value={v.availability} type="text" placeholder="e.g. Q3 2026" class={inputClass} />
					</div>
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Est. Event Cost</label>
						<input name="venue_{i}_estimatedCost" bind:value={v.estimatedCost} type="text" placeholder="e.g. $1.2M" class={inputClass} />
					</div>
				</div>
				<div class="grid sm:grid-cols-2 gap-4">
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Advantages <span class="text-white/30">(one per line)</span></label>
						<textarea name="venue_{i}_pros" bind:value={prosText[i]} rows="4"
							placeholder="Strong broadcast infrastructure&#10;Existing spectator seating&#10;Proximity to tribal gaming partners"
							class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 resize-y"></textarea>
					</div>
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Considerations <span class="text-white/30">(one per line)</span></label>
						<textarea name="venue_{i}_cons" bind:value={consText[i]} rows="4"
							placeholder="Higher venue rental cost&#10;Limited parking"
							class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 resize-y"></textarea>
					</div>
				</div>
				<div class="space-y-1">
					<label class="block text-xs font-medium text-white/60">Venue Proposal Doc ID</label>
					<input name="venue_{i}_docId" bind:value={v.docId} type="text" placeholder="PocketBase record ID" class={inputClass} />
				</div>
			</div>

		{:else}
			<!-- Review -->
			<div class="space-y-4">
				{#each venues as v, i}
					<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5">
						<div class="text-xs text-white/40 mb-1">Venue {i + 1}{i === 0 ? ' — Preferred' : ' — Alternate'}</div>
						<div class="text-sm font-bold text-white">{v.name || 'Not entered'}</div>
						{#if v.location}<div class="text-xs text-white/40 mt-0.5">{v.location}</div>{/if}
					</div>
				{/each}
				<!-- Submit all fields -->
				{#each venues as venue, vi}
					<input type="hidden" name="venue_{vi}_name"          value={venue.name} />
					<input type="hidden" name="venue_{vi}_location"      value={venue.location} />
					<input type="hidden" name="venue_{vi}_capacity"      value={venue.capacity} />
					<input type="hidden" name="venue_{vi}_ownership"     value={venue.ownership} />
					<input type="hidden" name="venue_{vi}_availability"  value={venue.availability} />
					<input type="hidden" name="venue_{vi}_estimatedCost" value={venue.estimatedCost} />
					<input type="hidden" name="venue_{vi}_status"        value={venue.status} />
					<input type="hidden" name="venue_{vi}_pros"          value={prosText[vi]} />
					<input type="hidden" name="venue_{vi}_cons"          value={consText[vi]} />
					<input type="hidden" name="venue_{vi}_photoUrl"      value={venue.photoUrl} />
					<input type="hidden" name="venue_{vi}_docId"         value={venue.docId} />
				{/each}
				<p class="text-xs text-white/30">Saving will immediately update the Inaugural Venue page visible to investors.</p>
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
