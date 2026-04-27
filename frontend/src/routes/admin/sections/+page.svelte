<script lang="ts">
	import { enhance } from '$app/forms';
	import { Plus, Pencil, Trash2, Eye, EyeOff, Shield, Users, Lock } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

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

	<!-- Create form -->
	<div class="rounded-xl border border-white/10 bg-navy-800/60 p-6">
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
						class="w-full rounded-md border border-white/10 bg-navy-900/60 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
						placeholder="e.g. Market Analysis"
					/>
				</div>
				<div class="space-y-1">
					<label for="role" class="block text-xs font-medium text-white/60">Access Level</label>
					<select
						id="role" name="role"
						class="w-full rounded-md border border-white/10 bg-navy-900/60 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
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
					class="w-full rounded-md border border-white/10 bg-navy-900/60 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
					placeholder="Short description shown in the sidebar"
				/>
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
			<div class="rounded-xl border border-white/10 bg-navy-800/60 p-10 text-center text-sm text-white/30">
				No sections yet. Create one above.
			</div>
		{:else}
			{#each data.sections as section}
				<div class="flex items-center justify-between rounded-xl border border-white/10 bg-navy-800/60 px-5 py-4">
					<div class="flex items-center gap-4 min-w-0">
						<!-- Published indicator -->
						<div class="h-2 w-2 rounded-full shrink-0 {section.published ? 'bg-green-500' : 'bg-white/20'}"></div>
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
