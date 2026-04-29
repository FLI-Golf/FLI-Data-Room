<script lang="ts">
	import { enhance } from '$app/forms';
	import { Plus, Pencil, Trash2, Eye, EyeOff, Shield, Users, Lock, ChevronDown, ChevronUp, BookOpen, Type, Image, Settings, ToggleRight } from 'lucide-svelte';
	import * as LucideIcons from 'lucide-svelte';
	import IconPicker from '$lib/components/IconPicker.svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let helpOpen = false;
	let newSectionIcon = '';

	function getIcon(name: string) {
		return (LucideIcons as Record<string, unknown>)[name] as typeof LucideIcons.Star | undefined;
	}

	const roleColors: Record<string, string> = {
		basic:    'bg-white/10 text-white/60 border-white/20',
		advanced: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
		admin:    'bg-brand-600/20 text-brand-500 border-brand-600/30'
	};
	const roleIcons: Record<string, typeof Users> = {
		basic: Users, advanced: Shield, admin: Lock
	};
</script>

<svelte:head>
	<title>Sections — FLI Admin</title>
</svelte:head>

<div class="max-w-4xl space-y-8">
	<div>
		<h1 class="text-3xl font-black text-white">Sections</h1>
		<p class="mt-1 text-white/50">Create custom pages that appear in the investor dashboard sidebar.</p>
	</div>

	<!-- Help guide -->
	<div class="rounded-xl border border-white/10 bg-navy-700/40 overflow-hidden">
		<button
			on:click={() => helpOpen = !helpOpen}
			class="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
		>
			<div class="flex items-center gap-2.5">
				<BookOpen class="h-4 w-4 text-yellow-400 shrink-0" />
				<span class="text-sm font-semibold text-white">How to add & edit sections</span>
			</div>
			{#if helpOpen}
				<ChevronUp class="h-4 w-4 text-white/30 shrink-0" />
			{:else}
				<ChevronDown class="h-4 w-4 text-white/30 shrink-0" />
			{/if}
		</button>

		{#if helpOpen}
			<div class="px-5 pb-6 space-y-6 border-t border-white/8">

				<!-- Step 1 -->
				<div class="pt-5 space-y-3">
					<div class="flex items-center gap-2.5">
						<div class="h-6 w-6 rounded-full bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center shrink-0">
							<span class="text-xs font-black text-yellow-400">1</span>
						</div>
						<div class="flex items-center gap-2">
							<Plus class="h-3.5 w-3.5 text-yellow-400" />
							<span class="text-sm font-bold text-white">Create a section</span>
						</div>
					</div>
					<div class="ml-8 space-y-2 text-sm text-white/60 leading-relaxed">
						<p>Use the <span class="text-white font-medium">New Section</span> form below. Fill in:</p>
						<ul class="space-y-1.5 ml-3">
							<li class="flex items-start gap-2"><span class="text-yellow-400 shrink-0 mt-0.5">·</span><span><span class="text-white font-medium">Section Name</span> — becomes the sidebar label and auto-generates the URL slug (e.g. "Market Deep Dive" → <code class="text-xs bg-white/8 px-1 py-0.5 rounded">/dashboard/market-deep-dive</code>)</span></li>
							<li class="flex items-start gap-2"><span class="text-yellow-400 shrink-0 mt-0.5">·</span><span><span class="text-white font-medium">Access Level</span> — who can see this page (Basic = all investors, Advanced = advanced + admin, Admin = admin only)</span></li>
							<li class="flex items-start gap-2"><span class="text-yellow-400 shrink-0 mt-0.5">·</span><span><span class="text-white font-medium">Description</span> — optional subtitle shown under the page title</span></li>
						</ul>
						<p class="text-white/40 text-xs">New sections are created as <span class="text-white/60">Draft</span> — they won't appear in the investor sidebar until you publish them.</p>
					</div>
				</div>

				<!-- Step 2 -->
				<div class="space-y-3">
					<div class="flex items-center gap-2.5">
						<div class="h-6 w-6 rounded-full bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center shrink-0">
							<span class="text-xs font-black text-yellow-400">2</span>
						</div>
						<div class="flex items-center gap-2">
							<Pencil class="h-3.5 w-3.5 text-yellow-400" />
							<span class="text-sm font-bold text-white">Add content blocks</span>
						</div>
					</div>
					<div class="ml-8 space-y-3 text-sm text-white/60 leading-relaxed">
						<p>Click <span class="text-white font-medium">Edit</span> on any section to open the content editor. Sections are built from ordered blocks — two types are available:</p>
						<div class="grid sm:grid-cols-2 gap-3">
							<div class="rounded-lg border border-white/10 bg-navy-800/50 p-3">
								<div class="flex items-center gap-2 mb-1.5">
									<Type class="h-3.5 w-3.5 text-fli-blue-300 shrink-0" />
									<span class="text-xs font-bold text-white">Text Block</span>
								</div>
								<p class="text-xs text-white/50 leading-relaxed">An optional heading plus a body of plain text. Use for narrative content, bullet points, financial commentary, or any written material. Line breaks are preserved.</p>
							</div>
							<div class="rounded-lg border border-white/10 bg-navy-800/50 p-3">
								<div class="flex items-center gap-2 mb-1.5">
									<Image class="h-3.5 w-3.5 text-green-400 shrink-0" />
									<span class="text-xs font-bold text-white">Media Block</span>
								</div>
								<p class="text-xs text-white/50 leading-relaxed">An image selected from the Media Library with an optional caption. Upload images first via <a href="/admin/media" class="text-yellow-400 hover:text-yellow-300 underline">Admin → Media</a> before adding media blocks.</p>
							</div>
						</div>
						<p>Use the <span class="text-white font-medium">↑ ↓ arrows</span> on each block to reorder them. Delete a block with the trash icon — this is permanent.</p>
					</div>
				</div>

				<!-- Step 3 -->
				<div class="space-y-3">
					<div class="flex items-center gap-2.5">
						<div class="h-6 w-6 rounded-full bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center shrink-0">
							<span class="text-xs font-black text-yellow-400">3</span>
						</div>
						<div class="flex items-center gap-2">
							<Settings class="h-3.5 w-3.5 text-yellow-400" />
							<span class="text-sm font-bold text-white">Update section settings</span>
						</div>
					</div>
					<div class="ml-8 space-y-2 text-sm text-white/60 leading-relaxed">
						<p>At the top of the editor you can update the section's name, description, and access level at any time. Changing the name also updates the URL slug — share the new URL with investors if you do this.</p>
						<p>The <span class="text-white font-medium">Published</span> checkbox controls visibility. Unpublishing a section hides it from the investor sidebar immediately without deleting any content.</p>
					</div>
				</div>

				<!-- Step 4 -->
				<div class="space-y-3">
					<div class="flex items-center gap-2.5">
						<div class="h-6 w-6 rounded-full bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center shrink-0">
							<span class="text-xs font-black text-yellow-400">4</span>
						</div>
						<div class="flex items-center gap-2">
							<ToggleRight class="h-3.5 w-3.5 text-yellow-400" />
							<span class="text-sm font-bold text-white">Publish & preview</span>
						</div>
					</div>
					<div class="ml-8 space-y-2 text-sm text-white/60 leading-relaxed">
						<p>Toggle <span class="text-white font-medium">Live / Draft</span> from the sections list, or check <span class="text-white font-medium">Published</span> in the editor and save. Once live, the section appears in the investor sidebar under the dynamic <span class="text-white/40">Sections</span> group.</p>
						<p>Use the <span class="text-white font-medium">Preview as investor →</span> link at the bottom of the editor to see exactly what investors see, including access restrictions.</p>
					</div>
				</div>

				<!-- Access level note -->
				<div class="rounded-lg border border-fli-blue-700/20 bg-fli-blue-800/10 px-4 py-3 ml-0">
					<p class="text-xs text-white/55 leading-relaxed">
						<span class="text-fli-blue-300 font-semibold">Access levels</span> on dynamic sections work the same way as <a href="/admin/access" class="text-yellow-400 hover:text-yellow-300 underline">Page Access</a> for hardcoded pages — Basic users see a lock icon on restricted items and get a 403 if they navigate directly to the URL.
					</p>
				</div>

			</div>
		{/if}
	</div>

	<!-- Create form -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<div class="flex items-center gap-2 mb-5">
			<Plus class="h-4 w-4 text-yellow-400" />
			<h2 class="text-base font-bold text-white">New Section</h2>
		</div>

		{#if form?.error}
			<div class="mb-4 rounded-md bg-brand-600/10 border border-brand-600/20 px-4 py-3 text-sm text-brand-500">
				{form.error}
			</div>
		{/if}

		<form method="POST" action="?/create" use:enhance class="space-y-4">
			<div class="grid sm:grid-cols-2 gap-4">
				<div class="space-y-1">
					<label for="name" class="block text-xs font-medium text-white/60">Section Name</label>
					<input
						id="name" name="name" type="text" required
						class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
						placeholder="e.g. Market Analysis"
					/>
				</div>
				<div class="space-y-1">
					<label for="role" class="block text-xs font-medium text-white/60">Access Level</label>
					<select
						id="role" name="role"
						class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
					>
						<option value="basic">Basic — all authenticated users</option>
						<option value="advanced">Advanced — advanced + admin only</option>
						<option value="admin">Admin — admin only</option>
					</select>
				</div>
			</div>
			<div class="space-y-1">
				<label for="description" class="block text-xs font-medium text-white/60">Description <span class="text-white/30">(optional)</span></label>
				<input
					id="description" name="description" type="text"
					class="w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
					placeholder="Short description shown in the sidebar"
				/>
			</div>
			<div class="space-y-1">
				<label class="block text-xs font-medium text-white/60">Sidebar Icon <span class="text-white/30">(optional)</span></label>
				<IconPicker name="icon" bind:value={newSectionIcon} />
			</div>
			<button type="submit" class="flex items-center gap-2 rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-yellow-400 transition-colors">
				<Plus class="h-4 w-4" />
				Create Section
			</button>
		</form>
	</div>

	<!-- Sections list -->
	<div class="space-y-3">
		<h2 class="text-base font-bold text-white">
			All Sections <span class="text-sm font-normal text-white/40">({data.sections.length})</span>
		</h2>

		{#if data.sections.length === 0}
			<div class="rounded-xl border border-white/15 bg-navy-700/50 p-10 text-center text-sm text-white/30">
				No sections yet. Create one above.
			</div>
		{:else}
			{#each data.sections as section}
				<div class="flex items-center justify-between rounded-xl border border-white/15 bg-navy-700/50 px-5 py-4">
					<div class="flex items-center gap-4 min-w-0">
						<!-- Published indicator -->
						<div class="h-2 w-2 rounded-full shrink-0 {section.published ? 'bg-green-500' : 'bg-white/20'}"></div>
						<!-- Icon -->
						{#if section.icon && getIcon(section.icon)}
							<div class="h-7 w-7 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
								<svelte:component this={getIcon(section.icon)} class="h-3.5 w-3.5 text-white/60" />
							</div>
						{/if}
						<div class="min-w-0">
							<div class="text-sm font-semibold text-white truncate">{section.name}</div>
							{#if section.description}
								<div class="text-xs text-white/40 truncate mt-0.5">{section.description}</div>
							{/if}
							<div class="text-xs text-white/30 mt-0.5">/dashboard/{section.slug}</div>
						</div>
					</div>

					<div class="flex items-center gap-2 shrink-0 ml-4">
						<!-- Role badge -->
						<span class="hidden sm:inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize {roleColors[section.role]}">
							<svelte:component this={roleIcons[section.role]} class="h-3 w-3" />
							{section.role}
						</span>

						<!-- Toggle publish -->
						<form method="POST" action="?/togglePublish" use:enhance>
							<input type="hidden" name="id" value={section.id} />
							<input type="hidden" name="published" value={section.published} />
							<button type="submit" title="{section.published ? 'Unpublish' : 'Publish'}"
								class="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors
									{section.published ? 'bg-green-500/15 text-green-400 hover:bg-green-500/25' : 'bg-white/10 text-white/40 hover:text-white/70'}">
								{#if section.published}
									<Eye class="h-3.5 w-3.5" /> Live
								{:else}
									<EyeOff class="h-3.5 w-3.5" /> Draft
								{/if}
							</button>
						</form>

						<!-- Edit -->
						<a href="/admin/sections/{section.id}"
							class="flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white/70 hover:text-white hover:bg-white/15 transition-colors">
							<Pencil class="h-3.5 w-3.5" /> Edit
						</a>

						<!-- Delete -->
						<form method="POST" action="?/delete" use:enhance>
							<input type="hidden" name="id" value={section.id} />
							<button type="submit"
								on:click|preventDefault={(e) => { if (confirm(`Delete "${section.name}"? This will also delete all its content.`)) (e.currentTarget.closest('form') as HTMLFormElement).submit(); }}
								class="flex items-center gap-1 rounded-md bg-brand-600/15 px-2.5 py-1.5 text-xs font-medium text-brand-500 hover:bg-brand-600/25 transition-colors">
								<Trash2 class="h-3.5 w-3.5" />
							</button>
						</form>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
