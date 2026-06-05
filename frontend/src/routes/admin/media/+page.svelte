<script lang="ts">
	import { enhance } from '$app/forms';
	import { Upload, Trash2, Image, Tag, FileImage, Pencil, X, CheckCircle2, CircleDashed } from 'lucide-svelte';
	import DeckImageSlot from '$lib/components/DeckImageSlot.svelte';
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

	const deckImagePlaceholders = [
		{ name: 'deck-cover-hero-image', tag: 'background', note: 'Cover slide hero/stadium visual' },
		{ name: 'deck-opportunity-market-growth-graphic', tag: 'background', note: 'Market growth visual for opportunity section' },
		{ name: 'deck-why-now-social-proof-collage', tag: 'background', note: 'Social proof collage (TikTok/YouTube/player momentum)' },
		{ name: 'deck-problem-limitations-visual', tag: 'background', note: 'Visual showing limitations of current disc golf format' },
		{ name: 'deck-solution-stadium-render', tag: 'background', note: 'Stadium-engineered course render' },
		{ name: 'deck-solution-broadcast-team-photo', tag: 'team', note: 'Broadcast/production partner photo' },
		{ name: 'deck-tech-platform-stack-diagram', tag: 'misc', note: '5-platform ecosystem diagram' },
		{ name: 'deck-gaming-tribal-map', tag: 'background', note: 'Tribal region or gaming footprint map' },
		{ name: 'deck-gary-santos-headshot', tag: 'team', note: 'Gary Santos profile image' },
		{ name: 'deck-competitive-landscape-graphic', tag: 'misc', note: 'Competitive comparison visual' },
		{ name: 'deck-roster-athlete-collage', tag: 'team', note: 'Top player collage' },
		{ name: 'deck-roster-highlight-image', tag: 'team', note: 'Signature roster moment still image' },
		{ name: 'deck-financials-growth-chart-image', tag: 'misc', note: 'Financial trajectory chart image' },
		{ name: 'deck-contact-yac-logo', tag: 'logo', note: 'Young America Capital logo asset' }
	] as const;

	function fileUrl(record: { collectionId: string; id: string; file: string }) {
		return `${data.pbUrl}/api/files/${record.collectionId}/${record.id}/${record.file}`;
	}

	let selectedTag = 'all';
	$: sorted = [...data.media].sort((a, b) => (b.created ?? '').localeCompare(a.created ?? ''));
	$: filtered = selectedTag === 'all'
		? sorted
		: sorted.filter((m) => m.tag === selectedTag);
	$: mediaByName = new Map(data.media.map((m) => [m.name.trim().toLowerCase(), m]));
	$: existingNames = new Set(data.media.map((m) => m.name.trim().toLowerCase()));
	$: placeholdersDone = deckImagePlaceholders.filter((item) => existingNames.has(item.name.toLowerCase())).length;

	// Edit modal state
	let editRecord: typeof data.media[0] | null = null;
	function openEdit(record: typeof data.media[0]) { editRecord = { ...record }; }
	function closeEdit() { editRecord = null; }

	// Placeholder upload modal state
	let uploadPlaceholder: (typeof deckImagePlaceholders)[number] | null = null;
	let isUploadingPlaceholder = false;
	function openPlaceholderUpload(item: (typeof deckImagePlaceholders)[number]) {
		uploadPlaceholder = item;
	}
	function closePlaceholderUpload() {
		if (isUploadingPlaceholder) return;
		uploadPlaceholder = null;
	}

	function handlePlaceholderUpload() {
		isUploadingPlaceholder = true;
		return async ({ result, update }: { result: { type: string }; update: () => Promise<void> }) => {
			await update();
			isUploadingPlaceholder = false;
			if (result.type === 'success') closePlaceholderUpload();
		};
	}
</script>

<svelte:head>
	<title>Media — FLI Admin</title>
</svelte:head>

<div class="max-w-5xl space-y-8">
	<div>
		<h1 class="text-3xl font-black text-white">Media</h1>
		<p class="mt-1 text-white/50">Upload and manage logos, team images, backgrounds, and more.</p>
	</div>

	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6 space-y-4">
		<div class="flex items-start justify-between gap-4">
			<div>
				<h2 class="text-base font-bold text-white">Pitch Deck Image Placeholders</h2>
				<p class="mt-1 text-sm text-white/50">Use these exact names when uploading so the deck image mapping stays consistent. Missing assets render a "Replace image" preview box.</p>
			</div>
			<div class="rounded-full border border-white/20 bg-navy-900/70 px-3 py-1 text-xs text-white/80">
				{placeholdersDone}/{deckImagePlaceholders.length} uploaded
			</div>
		</div>

		<div class="grid sm:grid-cols-2 gap-3">
			{#each deckImagePlaceholders as item}
				{@const exists = existingNames.has(item.name.toLowerCase())}
				{@const record = mediaByName.get(item.name.toLowerCase())}
				<div class="rounded-lg border px-3 py-3 {exists ? 'border-green-500/30 bg-green-500/10' : 'border-white/10 bg-navy-900/40'}">
					<div class="flex items-start justify-between gap-2 mb-3">
						<div class="min-w-0">
							<div class="text-xs font-semibold text-white">{item.name}</div>
							<div class="mt-1 text-xs text-white/45">{item.note}</div>
							<div class="mt-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs capitalize {tagColors[item.tag] ?? tagColors.misc}">
								<Tag class="h-3 w-3" />
								{item.tag}
							</div>
						</div>
						<div class="shrink-0 pt-0.5">
							{#if exists}
								<div class="space-y-2">
									<div class="inline-flex items-center gap-1 rounded-full border border-green-500/30 bg-green-500/15 px-2 py-0.5 text-xs font-medium text-green-300">
										<CheckCircle2 class="h-3.5 w-3.5" />
										Uploaded
									</div>
									{#if record}
										<form method="POST" action="?/delete" use:enhance>
											<input type="hidden" name="id" value={record.id} />
											<button
												type="submit"
												class="w-full rounded-md border border-brand-500/40 bg-brand-600/20 px-2.5 py-1.5 text-xs font-semibold text-brand-300 hover:bg-brand-600/30 transition-colors"
												on:click|preventDefault={(e) => { if (confirm(`Remove ${item.name}?`)) (e.currentTarget.closest('form') as HTMLFormElement).submit(); }}
											>
												Remove
											</button>
										</form>
									{/if}
								</div>
							{:else}
								<div class="space-y-2">
									<div class="inline-flex items-center gap-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2 py-0.5 text-xs font-medium text-yellow-300">
										<CircleDashed class="h-3.5 w-3.5" />
										Missing
									</div>
									<button
										type="button"
										on:click={() => openPlaceholderUpload(item)}
										class="w-full rounded-md border border-brand-500/40 bg-brand-600/20 px-2.5 py-1.5 text-xs font-semibold text-brand-300 hover:bg-brand-600/30 transition-colors"
									>
										Upload
									</button>
								</div>
							{/if}
						</div>
					</div>
					<DeckImageSlot
						src={record ? fileUrl(record) : null}
						alt={record?.alt || item.name}
						label={item.name}
						containerClass="rounded-md border border-white/10 bg-navy-950/30 p-2"
						imageClass="h-28 w-full object-cover rounded"
						placeholderClass="h-28"
					/>
				</div>
			{/each}
		</div>
	</div>

	<!-- Upload form -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
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
						class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-600"
						placeholder="e.g. FLI Shield Logo"
					/>
				</div>
				<div class="space-y-1">
					<label for="tag" class="block text-xs font-medium text-white/60">Tag</label>
					<select
						id="tag"
						name="tag"
						required
						class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-600"
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
					class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-600"
					placeholder="Describe the image for accessibility"
				/>
			</div>

			<div class="space-y-1">
				<label for="notes" class="block text-xs font-medium text-white/60">Notes <span class="text-white/30">(optional)</span></label>
				<input
					id="notes"
					name="notes"
					type="text"
					class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-600"
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
					class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white/70
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
						{selectedTag === 'all' ? 'border-white/40 bg-white/10 text-white' : 'border-white/15 text-white/40 hover:text-white/70'}"
				>
					All
				</button>
				{#each tags as t}
					<button
						on:click={() => selectedTag = t}
						class="rounded-full border px-3 py-0.5 text-xs font-medium capitalize transition-colors
							{selectedTag === t ? tagColors[t] : 'border-white/15 text-white/40 hover:text-white/70'}"
					>
						{t}
					</button>
				{/each}
			</div>
		</div>

		{#if filtered.length === 0}
			<div class="rounded-xl border border-white/15 bg-navy-700/50 p-12 text-center">
				<FileImage class="h-8 w-8 text-white/20 mx-auto mb-3" />
				<div class="text-sm text-white/30">No media{selectedTag !== 'all' ? ` tagged "${selectedTag}"` : ''} yet.</div>
			</div>
		{:else}
			<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each filtered as record}
					<div class="group rounded-xl border border-white/15 bg-navy-700/50 overflow-hidden">
						<!-- Preview -->
						<div class="relative aspect-square bg-navy-950/60 flex items-center justify-center p-4">
							<img
								src={fileUrl(record)}
								alt={record.alt || record.name}
								class="max-h-full max-w-full object-contain"
							/>
							<!-- Hover overlay: Edit + Delete -->
							<div class="absolute inset-0 flex items-center justify-center gap-2 bg-navy-950/80 opacity-0 group-hover:opacity-100 transition-opacity">
								<button
									type="button"
									on:click={() => openEdit(record)}
									class="flex items-center gap-1.5 rounded-md bg-fli-blue-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-fli-blue-600 transition-colors"
								>
									<Pencil class="h-3.5 w-3.5" />
									Edit
								</button>
								<form method="POST" action="?/delete" use:enhance>
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
						</div>

						<!-- Meta -->
						<div class="px-3 py-2.5 border-t border-white/15">
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

<!-- Placeholder upload modal -->
{#if uploadPlaceholder}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
		<div class="w-full max-w-lg rounded-xl border border-white/15 bg-navy-800 p-6 shadow-2xl">
			<div class="flex items-center justify-between mb-5">
				<h2 class="text-base font-bold text-white">Upload Placeholder Image</h2>
				<button type="button" on:click={closePlaceholderUpload} class="text-white/40 hover:text-white transition-colors">
					<X class="h-5 w-5" />
				</button>
			</div>

			<div class="mb-4 rounded-md border border-white/15 bg-navy-900/50 px-3 py-2">
				<p class="text-xs text-white/50">Placeholder</p>
				<p class="text-sm font-semibold text-white">{uploadPlaceholder.name}</p>
				<p class="mt-1 text-xs text-white/45">{uploadPlaceholder.note}</p>
			</div>

			<form
				method="POST"
				action="?/upload"
				enctype="multipart/form-data"
				use:enhance={handlePlaceholderUpload}
				class="space-y-4"
			>
				<input type="hidden" name="name" value={uploadPlaceholder.name} />
				<input type="hidden" name="tag" value={uploadPlaceholder.tag} />

				<div class="grid sm:grid-cols-2 gap-4">
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Name</label>
						<input
							type="text"
							value={uploadPlaceholder.name}
							readonly
							class="w-full rounded-md border border-white/15 bg-navy-900/70 px-3 py-2 text-sm text-white/80"
						/>
					</div>
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Tag</label>
						<input
							type="text"
							value={uploadPlaceholder.tag}
							readonly
							class="w-full rounded-md border border-white/15 bg-navy-900/70 px-3 py-2 text-sm text-white/80 capitalize"
						/>
					</div>
				</div>

				<div class="space-y-1">
					<label for="placeholder-alt" class="block text-xs font-medium text-white/60">Alt Text <span class="text-white/30">(optional)</span></label>
					<input
						id="placeholder-alt"
						name="alt"
						type="text"
						placeholder={uploadPlaceholder.note}
						class="w-full rounded-md border border-white/15 bg-navy-900/50 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-600"
					/>
				</div>

				<div class="space-y-1">
					<label for="placeholder-notes" class="block text-xs font-medium text-white/60">Notes <span class="text-white/30">(optional)</span></label>
					<input
						id="placeholder-notes"
						name="notes"
						type="text"
						placeholder="Internal notes"
						class="w-full rounded-md border border-white/15 bg-navy-900/50 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-600"
					/>
				</div>

				<div class="space-y-1">
					<label for="placeholder-file" class="block text-xs font-medium text-white/60">Image File <span class="text-white/30">JPEG · PNG · SVG · GIF · WebP · max 10MB</span></label>
					<input
						id="placeholder-file"
						name="file"
						type="file"
						accept="image/jpeg,image/png,image/svg+xml,image/gif,image/webp"
						required
						disabled={isUploadingPlaceholder}
						class="w-full rounded-md border border-white/15 bg-navy-900/50 px-3 py-2 text-sm text-white/70 file:mr-3 file:rounded file:border-0 file:bg-brand-600 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-white hover:file:bg-brand-500 focus:outline-none"
					/>
				</div>

				{#if isUploadingPlaceholder}
					<div class="space-y-2">
						<div class="h-2 w-full overflow-hidden rounded-full bg-white/10">
							<div class="h-full w-1/3 animate-pulse rounded-full bg-brand-500"></div>
						</div>
						<p class="text-xs text-white/60">Uploading image and refreshing preview…</p>
					</div>
				{/if}

				<div class="flex items-center justify-end gap-2 pt-1">
					<button
						type="button"
						on:click={closePlaceholderUpload}
						disabled={isUploadingPlaceholder}
						class="rounded-md border border-white/20 px-3 py-2 text-xs font-semibold text-white/70 hover:bg-white/5 transition-colors"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={isUploadingPlaceholder}
						class="inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-500 transition-colors"
					>
						<Upload class="h-3.5 w-3.5" />
						{isUploadingPlaceholder ? 'Uploading…' : 'Upload Image'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Edit modal -->
{#if editRecord}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
		<div class="w-full max-w-md rounded-xl border border-white/15 bg-navy-800 p-6 shadow-2xl">
			<div class="flex items-center justify-between mb-5">
				<h2 class="text-base font-bold text-white">Edit Media</h2>
				<button type="button" on:click={closeEdit} class="text-white/40 hover:text-white transition-colors">
					<X class="h-5 w-5" />
				</button>
			</div>
			<form
				method="POST"
				action="?/update"
				use:enhance={() => {
					return async ({ result, update }: { result: { type: string }; update: () => Promise<void> }) => {
						await update();
						if (result.type === 'success') closeEdit();
					};
				}}
				class="space-y-4"
			>
				<input type="hidden" name="id" value={editRecord.id} />
				<div class="space-y-1">
					<label class="block text-xs font-medium text-white/60">Name</label>
					<input
						name="name"
						type="text"
						required
						bind:value={editRecord.name}
						class="w-full rounded-md border border-white/15 bg-navy-900/50 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-600"
					/>
				</div>
				<div class="space-y-1">
					<label class="block text-xs font-medium text-white/60">Tag</label>
					<select
						name="tag"
						bind:value={editRecord.tag}
						class="w-full rounded-md border border-white/15 bg-navy-900/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-600"
					>
						{#each tags as t}
							<option value={t} class="capitalize">{t}</option>
						{/each}
					</select>
				</div>
				<div class="space-y-1">
					<label class="block text-xs font-medium text-white/60">Alt Text <span class="text-white/30">(optional)</span></label>
					<input
						name="alt"
						type="text"
						bind:value={editRecord.alt}
						class="w-full rounded-md border border-white/15 bg-navy-900/50 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-600"
					/>
				</div>
				<div class="space-y-1">
					<label class="block text-xs font-medium text-white/60">Notes <span class="text-white/30">(optional)</span></label>
					<input
						name="notes"
						type="text"
						bind:value={editRecord.notes}
						class="w-full rounded-md border border-white/15 bg-navy-900/50 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-600"
					/>
				</div>
				<div class="flex justify-end gap-3 pt-2">
					<button type="button" on:click={closeEdit} class="rounded-md border border-white/15 px-4 py-2 text-sm text-white/60 hover:text-white transition-colors">
						Cancel
					</button>
					<button type="submit" class="flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 transition-colors">
						<Pencil class="h-3.5 w-3.5" />
						Save Changes
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
