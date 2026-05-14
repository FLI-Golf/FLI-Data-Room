<script lang="ts">
	import { enhance } from '$app/forms';
	import { Plus, Trash2, Info } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	type Report = { title: string; source: string; year: string; description: string; url: string; docId: string; proprietary: boolean };

	let reports: Report[] = (data.saved?.reports as Report[]) ?? [
		{ title: '', source: '', year: '', description: '', url: '', docId: '', proprietary: false },
	];

	let step = 0;
	const steps = ['Reports', 'Review'];

	function add() { reports = [...reports, { title: '', source: '', year: '', description: '', url: '', docId: '', proprietary: false }]; }
	function remove(i: number) { reports = reports.filter((_, idx) => idx !== i); }
</script>

<svelte:head><title>Industry Reports — Content Editor</title></svelte:head>

<div class="max-w-3xl space-y-6">
	<div>
		<a href="/admin/content" class="text-xs text-white/30 hover:text-white/60 transition-colors">← Content Editor</a>
		<h1 class="text-2xl font-black text-white mt-1">Industry Reports & Analysis</h1>
		<p class="text-sm text-white/50 mt-1">Add each report with its source, year, and a description. Link to an uploaded PDF or an external URL.</p>
	</div>

	{#if form?.error}
		<div class="rounded-md bg-brand-600/10 border border-brand-600/20 px-4 py-3 text-sm text-brand-400">{form.error}</div>
	{/if}

	<div class="flex gap-1 border-b border-white/10">
		{#each steps as label, i}
			<button type="button" on:click={() => step = i}
				class="px-4 py-2 text-sm font-medium rounded-t-md transition-colors
					{step === i ? 'bg-navy-700/80 text-white border border-b-0 border-white/15' : 'text-white/40 hover:text-white/70'}">
				{i + 1}. {label}
			</button>
		{/each}
	</div>

	<form method="POST" action="?/save" use:enhance class="space-y-6">

		{#if step === 0}
			<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/15 p-4 flex items-start gap-3">
				<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
				<p class="text-xs text-white/55 leading-relaxed">
					Add one entry per report. For PDFs uploaded via Admin → Documents, paste the PocketBase record ID in the <strong class="text-white/70">Doc ID</strong> field. For external reports (PDGA, research firms), paste the URL. Mark FLI-produced reports as <strong class="text-white/70">Proprietary</strong> — they display with a distinct highlight.
				</p>
			</div>

			{#each reports as report, i}
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-4">
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold text-white">Report {i + 1}</span>
						{#if reports.length > 1}
							<button type="button" on:click={() => remove(i)} class="text-brand-400 hover:text-brand-300"><Trash2 class="h-4 w-4" /></button>
						{/if}
					</div>
					<div class="grid sm:grid-cols-2 gap-4">
						<div class="space-y-1 sm:col-span-2">
							<label class="block text-xs font-medium text-white/60">Report Title <span class="text-brand-400">*</span></label>
							<input name="report_{i}_title" bind:value={report.title} required type="text"
								placeholder="e.g. PDGA Growth & Participation Report 2024"
								class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50" />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Source / Publisher</label>
							<input name="report_{i}_source" bind:value={report.source} type="text"
								placeholder="e.g. Professional Disc Golf Association"
								class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50" />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Year / Period</label>
							<input name="report_{i}_year" bind:value={report.year} type="text"
								placeholder="e.g. 2024 or 2024–2030"
								class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50" />
						</div>
					</div>
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Description</label>
						<textarea name="report_{i}_description" bind:value={report.description} rows="2"
							placeholder="What this report covers and why it's relevant to FLI's investment thesis..."
							class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 resize-y"></textarea>
					</div>
					<div class="grid sm:grid-cols-2 gap-4">
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">External URL</label>
							<input name="report_{i}_url" bind:value={report.url} type="url"
								placeholder="https://pdga.com/..."
								class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50" />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Uploaded Doc ID</label>
							<input name="report_{i}_docId" bind:value={report.docId} type="text"
								placeholder="PocketBase record ID"
								class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50" />
						</div>
					</div>
					<label class="flex items-center gap-2 cursor-pointer">
						<input name="report_{i}_proprietary" type="checkbox" bind:checked={report.proprietary}
							class="rounded border-white/20 bg-navy-800 text-yellow-500 focus:ring-yellow-500/50" />
						<span class="text-xs text-white/60">FLI-produced / proprietary report (highlighted differently)</span>
					</label>
				</div>
			{/each}
			<button type="button" on:click={add}
				class="flex items-center gap-2 rounded-md border border-dashed border-white/20 px-4 py-2 text-sm text-white/40 hover:text-white hover:border-white/40 transition-colors">
				<Plus class="h-4 w-4" /> Add Report
			</button>

		{:else}
			<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-2">
				<h3 class="text-sm font-bold text-white mb-3">{reports.filter(r => r.title).length} report(s) to save</h3>
				{#each reports.filter(r => r.title) as r}
					<div class="text-xs text-white/60 py-1.5 border-b border-white/5 last:border-0">
						<span class="font-medium text-white">{r.title}</span>
						{#if r.source}<span class="text-white/40"> · {r.source}</span>{/if}
						{#if r.proprietary}<span class="ml-2 rounded-full bg-brand-600/20 px-1.5 py-0.5 text-brand-400 text-xs">Proprietary</span>{/if}
					</div>
				{/each}
				{#if !reports.some(r => r.title)}<p class="text-xs text-brand-400">No reports entered yet.</p>{/if}
			</div>
			<p class="text-xs text-white/30">Saving will immediately update the Industry Reports page visible to investors.</p>
		{/if}

		<div class="flex items-center justify-between pt-4 border-t border-white/10">
			<button type="button" on:click={() => step = Math.max(0, step - 1)} disabled={step === 0}
				class="rounded-md border border-white/15 px-4 py-2 text-sm text-white/50 hover:text-white hover:border-white/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
				← Previous
			</button>
			<span class="text-xs text-white/25">Step {step + 1} of {steps.length}</span>
			{#if step < steps.length - 1}
				<button type="button" on:click={() => step = step + 1}
					class="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition-colors">Next →</button>
			{:else}
				<button type="submit" class="rounded-md bg-yellow-500 px-5 py-2 text-sm font-semibold text-navy-950 hover:bg-yellow-400 transition-colors">Save & Publish</button>
			{/if}
		</div>
	</form>
</div>
