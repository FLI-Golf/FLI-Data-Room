<script lang="ts">
	import { enhance } from '$app/forms';
	import { ArrowLeft, Plus, Trash2, ChevronUp, ChevronDown, Type, Image, Eye, EyeOff } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	const pb_url = import.meta.env.PUBLIC_POCKETBASE_URL;

	function mediaUrl(m: { collectionId: string; id: string; file: string }) {
		return `${pb_url}/api/files/${m.collectionId}/${m.id}/${m.file}`;
	}

	let addingText  = false;
	let addingMedia = false;
</script>

<svelte:head>
	<title>Edit {data.section.name} — FLI Admin</title>
</svelte:head>

<div class="max-w-3xl space-y-8">
	<!-- Back -->
	<a href="/admin/sections" class="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors">
		<ArrowLeft class="h-4 w-4" /> All Sections
	</a>

	<!-- Section settings -->
	<div class="rounded-xl border border-white/10 bg-navy-800/60 p-6">
		<h2 class="text-base font-bold text-white mb-5">Section Settings</h2>

		{#if form?.error}
			<div class="mb-4 rounded-md bg-brand-600/10 border border-brand-600/20 px-4 py-3 text-sm text-brand-500">{form.error}</div>
		{/if}

		<form method="POST" action="?/updateSection" use:enhance class="space-y-4">
			<div class="grid sm:grid-cols-2 gap-4">
				<div class="space-y-1">
					<label for="name" class="block text-xs font-medium text-white/60">Name</label>
					<input id="name" name="name" type="text" required value={data.section.name}
						class="w-full rounded-md border border-white/10 bg-navy-900/60 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500/50" />
				</div>
				<div class="space-y-1">
					<label for="role" class="block text-xs font-medium text-white/60">Access Level</label>
					<select id="role" name="role"
						class="w-full rounded-md border border-white/10 bg-navy-900/60 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500/50">
						<option value="basic"    selected={data.section.role === 'basic'}>Basic — all authenticated users</option>
						<option value="advanced" selected={data.section.role === 'advanced'}>Advanced — advanced + admin only</option>
						<option value="admin"    selected={data.section.role === 'admin'}>Admin — admin only</option>
					</select>
				</div>
			</div>
			<div class="space-y-1">
				<label for="description" class="block text-xs font-medium text-white/60">Description</label>
				<input id="description" name="description" type="text" value={data.section.description ?? ''}
					class="w-full rounded-md border border-white/10 bg-navy-900/60 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
					placeholder="Short description shown in the sidebar" />
			</div>
			<div class="flex items-center justify-between">
				<label class="flex items-center gap-2 cursor-pointer">
					<input type="checkbox" name="published" checked={data.section.published}
						class="h-4 w-4 rounded accent-yellow-500" />
					<span class="text-sm text-white/70">Published <span class="text-white/30 text-xs">(visible to investors)</span></span>
				</label>
				<button type="submit" class="rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-yellow-400 transition-colors">
					Save Settings
				</button>
			</div>
		</form>
	</div>

	<!-- Content blocks -->
	<div class="space-y-4">
		<div class="flex items-center justify-between">
			<h2 class="text-base font-bold text-white">
				Content Blocks <span class="text-sm font-normal text-white/40">({data.blocks.length})</span>
			</h2>
			<div class="flex items-center gap-2">
				<button on:click={() => { addingText = !addingText; addingMedia = false; }}
					class="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors
						{addingText ? 'bg-yellow-500 text-navy-950' : 'bg-white/10 text-white/70 hover:text-white'}">
					<Type class="h-3.5 w-3.5" /> Text Block
				</button>
				<button on:click={() => { addingMedia = !addingMedia; addingText = false; }}
					class="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors
						{addingMedia ? 'bg-yellow-500 text-navy-950' : 'bg-white/10 text-white/70 hover:text-white'}">
					<Image class="h-3.5 w-3.5" /> Media Block
				</button>
			</div>
		</div>

		<!-- Add text block form -->
		{#if addingText}
			<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
				<h3 class="text-sm font-semibold text-yellow-400 mb-4">Add Text Block</h3>
				<form method="POST" action="?/addText" use:enhance on:submit={() => addingText = false} class="space-y-3">
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Heading <span class="text-white/30">(optional)</span></label>
						<input name="heading" type="text"
							class="w-full rounded-md border border-white/10 bg-navy-900/60 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
							placeholder="Section heading" />
					</div>
					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Body</label>
						<textarea name="body" rows="5"
							class="w-full rounded-md border border-white/10 bg-navy-900/60 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 resize-y"
							placeholder="Write your content here..."></textarea>
					</div>
					<div class="flex gap-2">
						<button type="submit" class="rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-yellow-400 transition-colors">Add Block</button>
						<button type="button" on:click={() => addingText = false} class="rounded-md bg-white/10 px-4 py-2 text-sm text-white/60 hover:text-white transition-colors">Cancel</button>
					</div>
				</form>
			</div>
		{/if}

		<!-- Add media block form -->
		{#if addingMedia}
			<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
				<h3 class="text-sm font-semibold text-yellow-400 mb-4">Add Media Block</h3>
				{#if data.mediaLibrary.length === 0}
					<p class="text-sm text-white/40">No media uploaded yet. <a href="/admin/media" class="text-yellow-400 hover:text-yellow-300 underline">Upload media first →</a></p>
				{:else}
					<form method="POST" action="?/addMedia" use:enhance on:submit={() => addingMedia = false} class="space-y-3">
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Caption <span class="text-white/30">(optional)</span></label>
							<input name="heading" type="text"
								class="w-full rounded-md border border-white/10 bg-navy-900/60 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
								placeholder="Image caption" />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Select from Media Library</label>
							<div class="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-56 overflow-y-auto rounded-md border border-white/10 bg-navy-900/60 p-2">
								{#each data.mediaLibrary as m}
									<label class="cursor-pointer group">
										<input type="radio" name="media" value={m.id} required class="sr-only peer" />
										<div class="rounded-lg border border-white/10 bg-navy-800/60 p-2 peer-checked:border-yellow-500 peer-checked:bg-yellow-500/10 transition-colors">
											<img src={mediaUrl(m)} alt={m.alt || m.name} class="h-14 w-full object-contain" />
											<div class="text-xs text-white/50 truncate mt-1 text-center">{m.name}</div>
										</div>
									</label>
								{/each}
							</div>
						</div>
						<div class="flex gap-2">
							<button type="submit" class="rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-yellow-400 transition-colors">Add Block</button>
							<button type="button" on:click={() => addingMedia = false} class="rounded-md bg-white/10 px-4 py-2 text-sm text-white/60 hover:text-white transition-colors">Cancel</button>
						</div>
					</form>
				{/if}
			</div>
		{/if}

		<!-- Existing blocks -->
		{#if data.blocks.length === 0}
			<div class="rounded-xl border border-white/10 bg-navy-800/60 p-10 text-center text-sm text-white/30">
				No content yet. Add a text or media block above.
			</div>
		{:else}
			{#each data.blocks as block, i}
				<div class="rounded-xl border border-white/10 bg-navy-800/60 p-5">
					<div class="flex items-start justify-between gap-4">
						<div class="flex items-center gap-2 shrink-0">
							<!-- Move up/down -->
							<div class="flex flex-col gap-0.5">
								<form method="POST" action="?/moveBlock" use:enhance>
									<input type="hidden" name="id" value={block.id} />
									<input type="hidden" name="direction" value="up" />
									<input type="hidden" name="sort_order" value={block.sort_order} />
									<button type="submit" disabled={i === 0} class="rounded p-0.5 text-white/30 hover:text-white disabled:opacity-20 transition-colors">
										<ChevronUp class="h-4 w-4" />
									</button>
								</form>
								<form method="POST" action="?/moveBlock" use:enhance>
									<input type="hidden" name="id" value={block.id} />
									<input type="hidden" name="direction" value="down" />
									<input type="hidden" name="sort_order" value={block.sort_order} />
									<button type="submit" disabled={i === data.blocks.length - 1} class="rounded p-0.5 text-white/30 hover:text-white disabled:opacity-20 transition-colors">
										<ChevronDown class="h-4 w-4" />
									</button>
								</form>
							</div>
							<!-- Type badge -->
							<span class="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/40 capitalize">
								{block.type}
							</span>
						</div>

						<!-- Content preview -->
						<div class="flex-1 min-w-0">
							{#if block.heading}
								<div class="text-sm font-semibold text-white mb-1">{block.heading}</div>
							{/if}
							{#if block.type === 'text' && block.body}
								<p class="text-xs text-white/50 leading-relaxed line-clamp-3">{block.body}</p>
							{:else if block.type === 'media' && block.expand?.media}
								<img
									src={mediaUrl(block.expand.media)}
									alt={block.expand.media.alt || block.expand.media.name}
									class="h-16 w-auto rounded object-contain"
								/>
							{/if}
						</div>

						<!-- Delete -->
						<form method="POST" action="?/deleteBlock" use:enhance class="shrink-0">
							<input type="hidden" name="id" value={block.id} />
							<button type="submit"
								on:click|preventDefault={(e) => { if (confirm('Delete this block?')) (e.currentTarget.closest('form') as HTMLFormElement).submit(); }}
								class="rounded-md bg-brand-600/15 p-1.5 text-brand-500 hover:bg-brand-600/25 transition-colors">
								<Trash2 class="h-4 w-4" />
							</button>
						</form>
					</div>
				</div>
			{/each}
		{/if}
	</div>

	<!-- Preview link -->
	{#if data.section.published}
		<a href="/dashboard/{data.section.slug}" target="_blank"
			class="inline-flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
			<Eye class="h-4 w-4" /> Preview as investor →
		</a>
	{:else}
		<div class="flex items-center gap-2 text-sm text-white/30">
			<EyeOff class="h-4 w-4" /> Publish the section to make it visible to investors.
		</div>
	{/if}
</div>
