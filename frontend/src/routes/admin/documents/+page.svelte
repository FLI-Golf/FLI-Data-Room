<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	export let data: PageData;
	export let form: ActionData;

	function confirmDelete(event: MouseEvent) {
		if (!confirm('Delete this document?')) {
			event.preventDefault();
		}
	}
</script>

<svelte:head>
	<title>Documents — FLI Admin</title>
</svelte:head>

<div class="max-w-4xl space-y-8">
	<div>
		<h1 class="text-3xl font-black text-white">Documents</h1>
		<p class="mt-1 text-white/50">Upload and manage investor documents.</p>
	</div>

	<!-- Upload form -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<h2 class="text-base font-bold text-white mb-4">Upload Document</h2>

		{#if form?.error}
			<div class="mb-4 rounded-md bg-brand-600/10 border border-brand-600/20 px-4 py-3 text-sm text-brand-600">
				{form.error}
			</div>
		{/if}

		<form method="POST" action="?/upload" enctype="multipart/form-data" use:enhance class="space-y-4">
			<div class="grid sm:grid-cols-2 gap-4">
				<div class="space-y-1">
					<label for="title" class="block text-xs font-medium text-white/60">Title</label>
					<input
						id="title"
						name="title"
						type="text"
						required
						class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-500"
						placeholder="e.g. Financial Model 2026"
					/>
				</div>
				<div class="space-y-1">
					<label for="requiredRole" class="block text-xs font-medium text-white/60">Required Role</label>
					<select
						id="requiredRole"
						name="requiredRole"
						required
						class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
					>
						<option value="basic">Basic</option>
						<option value="advanced">Advanced</option>
						<option value="admin">Admin only</option>
					</select>
				</div>
			</div>

			<div class="space-y-1">
				<label for="description" class="block text-xs font-medium text-white/60">Description (optional)</label>
				<input
					id="description"
					name="description"
					type="text"
					class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-500"
					placeholder="Brief description of the document"
				/>
			</div>

			<div class="space-y-1">
				<label for="file" class="block text-xs font-medium text-white/60">PDF File</label>
				<input
					id="file"
					name="file"
					type="file"
					accept=".pdf"
					required
					class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white/70 file:mr-3 file:rounded file:border-0 file:bg-brand-600 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-white hover:file:bg-brand-500 focus:outline-none"
				/>
			</div>

			<button
				type="submit"
				class="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 transition-colors"
			>
				Upload Document
			</button>
		</form>
	</div>

	<!-- Document list -->
	{#if data.documents.length === 0}
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-10 text-center text-sm text-white/30">
			No documents uploaded yet.
		</div>
	{:else}
		<div class="space-y-3">
			{#each data.documents as doc}
				<div class="flex items-center justify-between rounded-xl border border-white/15 bg-navy-700/50 px-5 py-4">
					<div>
						<div class="text-sm font-semibold text-white">{doc.title}</div>
						{#if doc.description}
							<div class="text-xs text-white/40 mt-0.5">{doc.description}</div>
						{/if}
						<span class="mt-1 inline-flex rounded-full bg-navy-800/50 px-2 py-0.5 text-xs text-white/50 capitalize">
							{doc.requiredRole}
						</span>
					</div>
					<form method="POST" action="?/delete" use:enhance>
						<input type="hidden" name="docId" value={doc.id} />
						<button
							type="submit"
							class="text-xs text-red-500 hover:text-red-300 transition-colors"
							on:click={confirmDelete}
						>
							Delete
						</button>
					</form>
				</div>
			{/each}
		</div>
	{/if}
</div>
