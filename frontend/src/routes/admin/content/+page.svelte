<script lang="ts">
	import { CheckCircle2, Circle, ArrowRight, Info } from 'lucide-svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	$: filled = data.sections.filter(s => s.hasData).length;
</script>

<svelte:head>
	<title>Content Editor — FLI Admin</title>
</svelte:head>

<div class="max-w-3xl space-y-8">
	<div>
		<h1 class="text-3xl font-black text-white">Content Editor</h1>
		<p class="mt-1 text-white/50">Fill in the real data for each investor-facing section. Each form walks you through what's needed step by step.</p>
	</div>

	<!-- Progress -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5">
		<div class="flex items-center justify-between mb-3">
			<span class="text-sm font-semibold text-white">Sections with data</span>
			<span class="text-sm font-bold text-white">{filled} / {data.sections.length}</span>
		</div>
		<div class="h-2 rounded-full bg-white/10 overflow-hidden">
			<div
				class="h-full rounded-full bg-brand-500 transition-all"
				style="width: {Math.round((filled / data.sections.length) * 100)}%"
			></div>
		</div>
		{#if filled === 0}
			<p class="text-xs text-white/30 mt-2">No sections have been filled in yet. Start with Management & Team.</p>
		{:else if filled < data.sections.length}
			<p class="text-xs text-white/30 mt-2">{data.sections.length - filled} section{data.sections.length - filled !== 1 ? 's' : ''} still showing placeholder content to investors.</p>
		{:else}
			<p class="text-xs text-green-400 mt-2">All sections have data. Review each one to make sure it's accurate.</p>
		{/if}
	</div>

	<!-- How it works -->
	<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/20 p-5 flex items-start gap-3">
		<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
		<div class="space-y-1.5 text-xs text-white/55 leading-relaxed">
			<p><span class="text-white font-semibold">How this works:</span> Each section below has a dedicated multi-step form. Fill in the fields and save — the investor-facing page updates immediately. You can return and edit at any time.</p>
			<p>Sections marked <span class="text-white/70">No data</span> still show placeholder content to investors. Fill them in to replace placeholders with real information.</p>
			<p>File uploads (PDFs, Excel, LOIs) are handled separately via <a href="/admin/documents" class="text-yellow-400 hover:text-yellow-300 underline">Admin → Documents</a>. The forms here handle the structured text content.</p>
		</div>
	</div>

	<!-- Section list -->
	<div class="space-y-2">
		{#each data.sections as section}
			<a
				href="/admin/content/{section.slug}"
				class="flex items-center justify-between rounded-xl border {section.hasData ? 'border-white/15 bg-navy-700/50 hover:bg-navy-700/60' : 'border-white/10 bg-navy-800/40 hover:bg-navy-800/60'} px-5 py-4 transition-colors group"
			>
				<div class="flex items-center gap-3 min-w-0">
					{#if section.hasData}
						<CheckCircle2 class="h-5 w-5 text-green-400 shrink-0" />
					{:else}
						<Circle class="h-5 w-5 text-white/20 shrink-0" />
					{/if}
					<div class="min-w-0">
						<div class="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors">{section.label}</div>
						<div class="text-xs text-white/40 mt-0.5 truncate">{section.description}</div>
					</div>
				</div>
				<div class="flex items-center gap-3 shrink-0 ml-4">
					<span class="text-xs {section.hasData ? 'text-green-400' : 'text-white/25'}">
						{section.hasData ? 'Has data' : 'No data'}
					</span>
					<ArrowRight class="h-4 w-4 text-white/20 group-hover:text-white/60 transition-colors" />
				</div>
			</a>
		{/each}
	</div>
</div>
