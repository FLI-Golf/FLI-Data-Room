<script lang="ts">
	import { enhance } from '$app/forms';
	import { Plus, Trash2, Info } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	type DiffItem = { label: string; description: string };
	type Resource = { label: string; url: string };

	let videoUrl:   string = (data.saved?.videoUrl   as string) ?? '';
	let videoTitle: string = (data.saved?.videoTitle as string) ?? '';

	let fliDifference: DiffItem[] = (data.saved?.fliDifference as DiffItem[]) ?? [
		{ label: 'Stadium Format',         description: '' },
		{ label: 'Elite 24-Player Field',  description: '' },
		{ label: 'Broadcast-First Design', description: '' },
		{ label: 'Scoring & Leaderboard',  description: '' },
		{ label: 'Celebrity Pro-Am',       description: '' },
	];

	let resources: Resource[] = (data.saved?.resources as Resource[]) ?? [
		{ label: 'PDGA Official Rules of Disc Golf', url: 'https://www.pdga.com/rules' },
		{ label: 'PDGA — What is Disc Golf?',        url: 'https://www.pdga.com/intro' },
		{ label: 'Disc Golf Network (streaming)',    url: 'https://www.discgolfnetwork.com' },
	];

	let step = 0;
	const steps = ['Video', 'FLI Difference', 'Resources', 'Review'];

	function addDiff()     { fliDifference = [...fliDifference, { label: '', description: '' }]; }
	function removeDiff(i: number) { fliDifference = fliDifference.filter((_, idx) => idx !== i); }
	function addRes()      { resources = [...resources, { label: '', url: '' }]; }
	function removeRes(i: number)  { resources = resources.filter((_, idx) => idx !== i); }

	const inputClass = 'w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50';
</script>

<svelte:head><title>How to Play — Content Editor</title></svelte:head>

<div class="max-w-3xl space-y-6">
	<div>
		<a href="/admin/content" class="text-xs text-white/30 hover:text-white/60 transition-colors">← Content Editor</a>
		<h1 class="text-2xl font-black text-white mt-1">How to Play</h1>
		<p class="text-sm text-white/50 mt-1">Add a video URL, customize the FLI Difference points, and manage further reading links.</p>
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
					Paste a YouTube or Vimeo embed URL (e.g. <code class="bg-white/8 px-1 rounded">https://www.youtube.com/embed/VIDEO_ID</code>). This will be embedded in an iframe on the How to Play page. Alternatively, link to a video uploaded via Admin → Documents. Leave blank to keep the "Coming Soon" placeholder.
				</p>
			</div>
			<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-4">
				<div class="space-y-1">
					<label class="block text-sm font-semibold text-white">Video Embed URL</label>
					<input name="videoUrl" bind:value={videoUrl} type="url"
						placeholder="https://www.youtube.com/embed/..."
						class={inputClass} />
					<p class="text-xs text-white/30">Use the embed URL, not the watch URL. For YouTube: replace <code class="bg-white/8 px-1 rounded">watch?v=</code> with <code class="bg-white/8 px-1 rounded">embed/</code>.</p>
				</div>
				<div class="space-y-1">
					<label class="block text-sm font-semibold text-white">Video Title / Caption</label>
					<input name="videoTitle" bind:value={videoTitle} type="text"
						placeholder="e.g. FLI Golf — What is Stadium Disc Golf?"
						class={inputClass} />
				</div>
			</div>

		{:else if step === 1}
			<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/15 p-4 flex items-start gap-3">
				<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
				<p class="text-xs text-white/55 leading-relaxed">
					These are the key differentiators that explain how FLI Golf's stadium format is different from traditional disc golf. Edit the descriptions to reflect FLI's actual positioning. These appear as cards on the investor-facing page.
				</p>
			</div>

			{#each fliDifference as item, i}
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-3">
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold text-white">Point {i + 1}</span>
						{#if fliDifference.length > 1}
							<button type="button" on:click={() => removeDiff(i)} class="text-brand-400 hover:text-brand-300"><Trash2 class="h-4 w-4" /></button>
						{/if}
					</div>
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Label / Heading</label>
						<input name="diff_{i}_label" bind:value={item.label} type="text"
							placeholder="e.g. Stadium Format"
							class={inputClass} />
					</div>
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Description</label>
						<textarea name="diff_{i}_description" bind:value={item.description} rows="3"
							placeholder="Explain this differentiator in 1–2 sentences for an investor unfamiliar with disc golf..."
							class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 resize-y"></textarea>
					</div>
				</div>
			{/each}
			<button type="button" on:click={addDiff}
				class="flex items-center gap-2 rounded-md border border-dashed border-white/20 px-4 py-2 text-sm text-white/40 hover:text-white hover:border-white/40 transition-colors">
				<Plus class="h-4 w-4" /> Add Point
			</button>

		{:else if step === 2}
			<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/15 p-4 flex items-start gap-3">
				<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
				<p class="text-xs text-white/55 leading-relaxed">
					Add links to external resources investors can visit to learn more about disc golf. These appear as a "Further Reading" list at the bottom of the page.
				</p>
			</div>

			{#each resources as res, i}
				<div class="flex items-center gap-3">
					<div class="flex-1 grid sm:grid-cols-2 gap-3">
						<input name="res_{i}_label" bind:value={res.label} type="text"
							placeholder="Link label"
							class={inputClass} />
						<input name="res_{i}_url" bind:value={res.url} type="url"
							placeholder="https://..."
							class={inputClass} />
					</div>
					{#if resources.length > 1}
						<button type="button" on:click={() => removeRes(i)} class="text-brand-400 hover:text-brand-300 shrink-0"><Trash2 class="h-4 w-4" /></button>
					{/if}
				</div>
			{/each}
			<button type="button" on:click={addRes}
				class="flex items-center gap-2 rounded-md border border-dashed border-white/20 px-4 py-2 text-sm text-white/40 hover:text-white hover:border-white/40 transition-colors">
				<Plus class="h-4 w-4" /> Add Resource
			</button>

		{:else}
			<div class="space-y-4">
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-2">
					<h3 class="text-sm font-bold text-white">Video</h3>
					{#if videoUrl}
						<p class="text-xs text-green-400">✓ Video URL set: {videoUrl.slice(0, 60)}...</p>
					{:else}
						<p class="text-xs text-white/30">No video URL — "Coming Soon" placeholder will show.</p>
					{/if}
				</div>
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-2">
					<h3 class="text-sm font-bold text-white">FLI Difference ({fliDifference.filter(d => d.label).length} points)</h3>
					{#each fliDifference.filter(d => d.label) as d}
						<div class="text-xs text-white/60 py-1 border-b border-white/5 last:border-0">
							<span class="font-medium text-white">{d.label}</span>
						</div>
					{/each}
				</div>
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-2">
					<h3 class="text-sm font-bold text-white">Resources ({resources.filter(r => r.label).length})</h3>
					{#each resources.filter(r => r.label) as r}
						<div class="text-xs text-white/60 py-1 border-b border-white/5 last:border-0">{r.label}</div>
					{/each}
				</div>
				<p class="text-xs text-white/30">Saving will immediately update the How to Play page visible to all investors.</p>
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
