<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>Documents — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-4xl space-y-8">
	<div>
		<h1 class="text-3xl font-black text-white">Documents</h1>
		<p class="mt-1 text-white/50">Supporting materials for the FLI Golf League investment opportunity.</p>
	</div>

	{#if data.documents.length === 0}
		<div class="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
			<div class="text-white/30 text-sm">No documents have been uploaded yet.</div>
			<div class="text-white/20 text-xs mt-1">Check back soon or contact your representative.</div>
		</div>
	{:else}
		<div class="space-y-3">
			{#each data.documents as doc}
				<div class="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 hover:bg-white/10 transition-colors">
					<div class="flex items-center gap-4">
						<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/20 text-brand-400">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
								<polyline points="14 2 14 8 20 8" />
							</svg>
						</div>
						<div>
							<div class="text-sm font-semibold text-white">{doc.title}</div>
							{#if doc.description}
								<div class="text-xs text-white/40 mt-0.5">{doc.description}</div>
							{/if}
						</div>
					</div>
					<div class="flex items-center gap-3">
						<span class="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/50 capitalize">
							{doc.requiredRole}
						</span>
						<a
							href={`${import.meta.env.PUBLIC_POCKETBASE_URL}/api/files/documents/${doc.id}/${doc.file}`}
							target="_blank"
							rel="noopener noreferrer"
							class="rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-500 transition-colors"
						>
							View PDF
						</a>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<p class="text-xs text-white/20">
		All documents are confidential and subject to the NDA you accepted. Do not distribute.
	</p>
</div>
