<script lang="ts">
	import { enhance } from '$app/forms';
	import { CheckCircle2 } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	const STAFF = [
		{ name: 'Andrew Panza',             title: 'Chief Executive Officer' },
		{ name: 'Corey La Russo',           title: 'Chief Marketing Officer' },
		{ name: 'Dustin Dinsmore',          title: 'Chief Technical Officer' },
		{ name: 'Mark Colman',              title: 'Network / Channel Director' },
		{ name: 'Jim Neely',                title: 'Production Director' },
		{ name: 'Ina Masten',               title: 'Director of Finance' },
		{ name: 'Gary Santos',              title: 'Director of Tribal & Gaming Relations' },
		{ name: 'Stephen A. Crystal, ESQ.', title: 'Gaming & Legal Advisor' },
	];

	type PhotoEntry = { name: string; photoUrl: string };
	const saved = (data.saved?.photos as PhotoEntry[]) ?? [];

	let photos: PhotoEntry[] = STAFF.map(s => {
		const match = saved.find(p => p.name === s.name);
		return { name: s.name, photoUrl: match?.photoUrl ?? '' };
	});

	const ic = 'w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50';
</script>

<svelte:head><title>Management Photos — Content Editor</title></svelte:head>

<div class="max-w-2xl space-y-6">
	<div>
		<a href="/admin/content" class="text-xs text-white/30 hover:text-white/60 transition-colors">← Content Editor</a>
		<h1 class="text-2xl font-black text-white mt-1">Management & Team — Photos</h1>
		<p class="text-sm text-white/50 mt-1">Paste a direct image URL for each person. All other details (bio, title, email) are hardcoded.</p>
	</div>

	{#if form?.success}
		<div class="rounded-md bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400 flex items-center gap-2">
			<CheckCircle2 class="h-4 w-4 shrink-0" /> Photos saved successfully.
		</div>
	{/if}
	{#if form?.error}
		<div class="rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">{form.error}</div>
	{/if}

	<form method="POST" action="?/save" use:enhance class="space-y-3">
		{#each photos as entry, i}
			<div class="rounded-xl border border-white/10 bg-navy-700/50 p-4">
				<div class="flex items-center gap-3 mb-3">
					{#if entry.photoUrl}
						<img src={entry.photoUrl} alt={entry.name} class="h-10 w-10 rounded-full object-cover border border-white/20 shrink-0" />
					{:else}
						<div class="h-10 w-10 rounded-full bg-white/8 border border-dashed border-white/15 flex items-center justify-center text-sm font-black text-white/30 shrink-0">
							{entry.name.charAt(0)}
						</div>
					{/if}
					<div>
						<div class="text-sm font-semibold text-white">{entry.name}</div>
						<div class="text-xs text-white/35">{STAFF[i].title}</div>
					</div>
				</div>
				<input type="hidden" name="name_{i}" value={entry.name} />
				<input name="photoUrl_{i}" bind:value={entry.photoUrl} type="url"
					placeholder="https://…/photo.jpg"
					class={ic} />
			</div>
		{/each}

		<div class="pt-2">
			<button type="submit" class="rounded-md bg-yellow-500 px-5 py-2 text-sm font-semibold text-navy-950 hover:bg-yellow-400 transition-colors">
				Save Photos
			</button>
		</div>
	</form>
</div>
