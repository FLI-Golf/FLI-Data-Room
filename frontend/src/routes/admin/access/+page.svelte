<script lang="ts">
	import { enhance } from '$app/forms';
	import { Users, Shield, Lock, Info } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const roleConfig = {
		basic:    { label: 'Basic',    desc: 'All authenticated users',      icon: Users,  color: 'text-white/60',   bg: 'bg-white/8',         border: 'border-white/15' },
		advanced: { label: 'Advanced', desc: 'Advanced & admin users only',  icon: Shield, color: 'text-yellow-400', bg: 'bg-yellow-500/10',   border: 'border-yellow-500/20' },
		admin:    { label: 'Admin',    desc: 'Admin users only',             icon: Lock,   color: 'text-brand-400',  bg: 'bg-brand-600/10',    border: 'border-brand-600/20' },
	} as const;

	// Group pages by their group field
	$: groups = data.pages.reduce((acc, page) => {
		const g = page.group || 'Other';
		if (!acc[g]) acc[g] = [];
		acc[g].push(page);
		return acc;
	}, {} as Record<string, typeof data.pages>);

	// Track optimistic UI updates
	let saving: Record<string, boolean> = {};
	let saved: Record<string, boolean> = {};

	function handleEnhance(id: string) {
		return ({ submitter }: { submitter: HTMLElement | null }) => {
			saving[id] = true;
			saved[id] = false;
			return async ({ update }: { update: () => Promise<void> }) => {
				await update();
				saving[id] = false;
				saved[id] = true;
				setTimeout(() => { saved[id] = false; }, 2000);
			};
		};
	}
</script>

<svelte:head>
	<title>Page Access — FLI Admin</title>
</svelte:head>

<div class="max-w-4xl space-y-8">

	<div>
		<h1 class="text-3xl font-black text-white">Page Access</h1>
		<p class="mt-1 text-white/50">Control which role is required to view each dashboard page.</p>
	</div>

	<!-- Role legend -->
	<div class="grid sm:grid-cols-3 gap-3">
		{#each Object.entries(roleConfig) as [key, cfg]}
			<div class="rounded-xl border {cfg.border} {cfg.bg} p-4 flex items-start gap-3">
				<svelte:component this={cfg.icon} class="h-4 w-4 {cfg.color} shrink-0 mt-0.5" />
				<div>
					<div class="text-sm font-bold text-white">{cfg.label}</div>
					<div class="text-xs text-white/45 mt-0.5">{cfg.desc}</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Info note -->
	<div class="flex items-start gap-2.5 rounded-lg border border-fli-blue-700/20 bg-fli-blue-800/10 px-4 py-3">
		<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
		<p class="text-xs text-white/55 leading-relaxed">
			Changes take effect immediately. Users currently viewing a page they no longer have access to will be shown a 403 error on their next navigation or page refresh.
		</p>
	</div>

	<!-- Pages by group -->
	{#each Object.entries(groups) as [groupName, pages]}
		<div class="space-y-3">
			<h2 class="text-xs font-semibold text-white/30 uppercase tracking-widest px-1">{groupName}</h2>
			<div class="rounded-xl border border-white/10 bg-navy-700/40 overflow-hidden divide-y divide-white/6">
				{#each pages as page}
					{@const cfg = roleConfig[page.role]}
					<div class="flex items-center gap-4 px-5 py-3.5">
						<!-- Page info -->
						<div class="flex-1 min-w-0">
							<div class="text-sm font-semibold text-white">{page.label}</div>
							<div class="text-xs text-white/35 mt-0.5">/dashboard/{page.slug}</div>
						</div>

						<!-- Current role badge -->
						<span class="hidden sm:inline-flex items-center gap-1.5 rounded-full border {cfg.border} {cfg.bg} px-2.5 py-1 text-xs font-medium {cfg.color} shrink-0">
							<svelte:component this={cfg.icon} class="h-3 w-3" />
							{cfg.label}
						</span>

						<!-- Role selector form -->
						<form
							method="POST"
							action="?/updateRole"
							use:enhance={handleEnhance(page.id)}
							class="flex items-center gap-2 shrink-0"
						>
							<input type="hidden" name="id" value={page.id} />
							<select
								name="role"
								value={page.role}
								on:change={(e) => e.currentTarget.closest('form')?.requestSubmit()}
								class="rounded-md border border-white/15 bg-navy-800/60 px-2.5 py-1.5 text-xs text-white
									focus:outline-none focus:ring-1 focus:ring-yellow-500/50 cursor-pointer"
							>
								<option value="basic">Basic</option>
								<option value="advanced">Advanced</option>
								<option value="admin">Admin</option>
							</select>

							{#if saving[page.id]}
								<span class="text-xs text-white/30 w-12">Saving…</span>
							{:else if saved[page.id]}
								<span class="text-xs text-green-400 w-12">Saved ✓</span>
							{:else}
								<span class="w-12"></span>
							{/if}
						</form>
					</div>
				{/each}
			</div>
		</div>
	{/each}

</div>
