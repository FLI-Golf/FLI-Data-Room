<script lang="ts">
	import { enhance } from '$app/forms';
	import { Upload, Trash2, Image, Tag, FileImage } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	const tags = ['logo', 'team', 'background', 'celebrity', 'sponsor', 'misc'];

	const tagColors: Record<string, string> = {
		logo:       'bg-brand-600/20 text-brand-400 border-brand-600/30',
		team:       'bg-fli-blue-800/30 text-fli-blue-400 border-fli-blue-600/30',
		background: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
		celebrity:  'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
		sponsor:    'bg-green-500/20 text-green-300 border-green-500/30',
		misc:       'bg-white/10 text-white/50 border-white/20'
	};

	const pb_url = import.meta.env.PUBLIC_POCKETBASE_URL;

	function fileUrl(record: { collectionId: string; id: string; file: string }) {
		return `${pb_url}/api/files/${record.collectionId}/${record.id}/${record.file}`;
	}

	let selectedTag = 'all';
	$: filtered = selectedTag === 'all'
		? data.media
		: data.media.filter((m) => m.tag === selectedTag);
</script>

<svelte:head>
	<title>Media — FLI Admin</title>
</svelte:head>

<div class="max-w-5xl space-y-8">
	<div>
		<h1 class="text-3xl font-black text-white">Media</h1>
		<p class="mt-1 text-white/50">Upload and manage logos, team images, backgrounds, and more.</p>
	</div>

	<!-- Upload form -->
	<div class="rounded-xl border border-white/10 bg-navy-800/60 p-6">
		<div class="flex items-center gap-2 mb-5">
			<Upload class="h-4 w-4 text-brand-500" />
			<h2 class="text-base font-bold text-white">Upload Asset</h2>
		</div>

		{#if form?.error}
			<div class="mb-4 rounded-md bg-brand-600/10 border border-brand-600/20 px-4 py-3 text-sm text-brand-400">
				{form.error}
			</div>
		{/if}

		<form
			method="POST"
			action="?/upload"
			enctype="multipart/form-data"
			use:enhance
			class="space-y-4"
		>
			<div class="grid sm:grid-cols-2 gap-4">
				<div class="space-y-1">
					<label for="name" class="block text-xs font-medium text-white/60">Name</label>
					<input
						id="name"
						name="name"
						type="text"
						required
						class="w-full rounded-md border border-white/10 bg-navy-900/60 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-600"
						placeholder="e.g. FLI Shield Logo"
					/>
				</div>
				<div class="space-y-1">
					<label for="tag" class="block text-xs font-medium text-white/60">Tag</label>
					<select
						id="tag"
						name="tag"
						required
						class="w-full rounded-md border border-white/10 bg-navy-900/60 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-600"
					>
						{#each tags as t}
							<option value={t} class="capitalize">{t}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="space-y-1">
				<label for="alt" class="block text-xs font-medium text-white/60">Alt Text <span class="text-white/30">(optional)</span></label>
				<input
					id="alt"
					name="alt"
					type="text"
					class="w-full rounded-md border border-white/10 bg-navy-900/60 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-600"
					placeholder="Describe the image for accessibility"
				/>
			</div>

			<div class="space-y-1">
				<label for="notes" class="block text-xs font-medium text-white/60">Notes <span class="text-white/30">(optional)</span></label>
				<input
					id="notes"
					name="notes"
					type="text"
					class="w-full rounded-md border border-white/10 bg-navy-900/60 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-600"
					placeholder="Internal notes"
				/>
			</div>

			<div class="space-y-1">
				<label for="file" class="block text-xs font-medium text-white/60">Image File <span class="text-white/30">JPEG · PNG · SVG · GIF · WebP · max 10MB</span></label>
				<input
					id="file"
					name="file"
					type="file"
					accept="image/jpeg,image/png,image/svg+xml,image/gif,image/webp"
					required
					class="w-full rounded-md border border-white/10 bg-navy-900/60 px-3 py-2 text-sm text-white/70
						file:mr-3 file:rounded file:border-0 file:bg-brand-600 file:px-3 file:py-1
						file:text-xs file:font-semibold file:text-white hover:file:bg-brand-500
						focus:outline-none"
				/>
			</div>

			<button
				type="submit"
				class="flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 transition-colors"
			>
				<Upload class="h-4 w-4" />
				Upload
			</button>
		</form>
	</div>

	<!-- Library -->
	<div class="space-y-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<Image class="h-4 w-4 text-white/50" />
				<h2 class="text-base font-bold text-white">
					Library
					<span class="ml-1 text-sm font-normal text-white/40">({data.media.length})</span>
				</h2>
			</div>

			<!-- Tag filter -->
			<div class="flex items-center gap-2 flex-wrap">
				<button
					on:click={() => selectedTag = 'all'}
					class="rounded-full border px-3 py-0.5 text-xs font-medium transition-colors
						{selectedTag === 'all' ? 'border-white/40 bg-white/10 text-white' : 'border-white/10 text-white/40 hover:text-white/70'}"
				>
					All
				</button>
				{#each tags as t}
					<button
						on:click={() => selectedTag = t}
						class="rounded-full border px-3 py-0.5 text-xs font-medium capitalize transition-colors
							{selectedTag === t ? tagColors[t] : 'border-white/10 text-white/40 hover:text-white/70'}"
					>
						{t}
					</button>
				{/each}
			</div>
		</div>

		{#if filtered.length === 0}
			<div class="rounded-xl border border-white/10 bg-navy-800/60 p-12 text-center">
				<FileImage class="h-8 w-8 text-white/20 mx-auto mb-3" />
				<div class="text-sm text-white/30">No media{selectedTag !== 'all' ? ` tagged "${selectedTag}"` : ''} yet.</div>
			</div>
		{:else}
			<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each filtered as record}
					<div class="group rounded-xl border border-white/10 bg-navy-800/60 overflow-hidden">
						<!-- Preview -->
						<div class="relative aspect-square bg-navy-950/60 flex items-center justify-center p-4">
							<img
								src={fileUrl(record)}
								alt={record.alt || record.name}
								class="max-h-full max-w-full object-contain"
							/>
							<!-- Delete overlay -->
							<form
								method="POST"
								action="?/delete"
								use:enhance
								class="absolute inset-0 flex items-center justify-center bg-navy-950/80 opacity-0 group-hover:opacity-100 transition-opacity"
							>
								<input type="hidden" name="id" value={record.id} />
								<button
									type="submit"
									class="flex items-center gap-1.5 rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-500 transition-colors"
									on:click|preventDefault={(e) => { if (confirm(`Delete ${record.name}?`)) (e.currentTarget.closest('form') as HTMLFormElement).submit(); }}
								>
									<Trash2 class="h-3.5 w-3.5" />
									Delete
								</button>
							</form>
						</div>

						<!-- Meta -->
						<div class="px-3 py-2.5 border-t border-white/10">
							<div class="text-xs font-semibold text-white truncate">{record.name}</div>
							{#if record.alt}
								<div class="text-xs text-white/40 truncate mt-0.5">{record.alt}</div>
							{/if}
							<div class="mt-1.5 flex items-center gap-1.5">
								<Tag class="h-3 w-3 text-white/30 shrink-0" />
								<span class="rounded-full border px-2 py-0.5 text-xs capitalize {tagColors[record.tag] ?? tagColors.misc}">
									{record.tag}
								</span>
							</div>
							<!-- Copy URL -->
							<button
								type="button"
								class="mt-2 w-full rounded text-xs text-white/30 hover:text-white/60 transition-colors text-left truncate"
								on:click={() => navigator.clipboard.writeText(fileUrl(record)).then(() => alert('URL copied'))}
							>
								Copy URL
							</button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
