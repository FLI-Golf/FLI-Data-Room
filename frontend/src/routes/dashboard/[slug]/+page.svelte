<script lang="ts">
	import { Shield, Users, Lock } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const pb_url = import.meta.env.PUBLIC_POCKETBASE_URL;

	function mediaUrl(m: { collectionId: string; id: string; file: string }) {
		return `${pb_url}/api/files/${m.collectionId}/${m.id}/${m.file}`;
	}

	const roleLabel: Record<string, string> = {
		basic:    'All Members',
		advanced: 'Advanced Access',
		admin:    'Admin Only'
	};
	const roleStyle: Record<string, string> = {
		basic:    'border-white/20 bg-white/5 text-white/50',
		advanced: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
		admin:    'border-brand-600/30 bg-brand-600/10 text-brand-500'
	};
	const roleIcon: Record<string, typeof Users> = {
		basic: Users, advanced: Shield, admin: Lock
	};
</script>

<svelte:head>
	<title>{data.section.name} — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-3xl space-y-8">
	<!-- Header -->
	<div>
		<div class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest mb-4 {roleStyle[data.section.role]}">
			<svelte:component this={roleIcon[data.section.role]} class="h-3 w-3" />
			{roleLabel[data.section.role]}
		</div>
		<h1 class="text-3xl font-black text-white">{data.section.name}</h1>
		{#if data.section.description}
			<p class="mt-1 text-white/50">{data.section.description}</p>
		{/if}
	</div>

	{#if data.blocks.length === 0}
		<div class="rounded-xl border border-white/10 bg-navy-800/60 p-12 text-center text-sm text-white/30">
			No content has been added to this section yet.
		</div>
	{:else}
		<div class="space-y-6">
			{#each data.blocks as block}
				{#if block.type === 'text'}
					<div class="rounded-xl border border-white/10 bg-navy-800/60 p-6">
						{#if block.heading}
							<h2 class="text-lg font-bold text-white mb-3">{block.heading}</h2>
						{/if}
						{#if block.body}
							<div class="prose prose-invert prose-sm max-w-none text-white/70 leading-relaxed whitespace-pre-wrap">{block.body}</div>
						{/if}
					</div>
				{:else if block.type === 'media' && block.expand?.media}
					<div class="rounded-xl border border-white/10 bg-navy-800/60 p-6">
						{#if block.heading}
							<p class="text-sm text-white/50 mb-3">{block.heading}</p>
						{/if}
						<img
							src={mediaUrl(block.expand.media)}
							alt={block.expand.media.alt || block.expand.media.name}
							class="max-w-full rounded-lg object-contain"
						/>
					</div>
				{/if}
			{/each}
		</div>
	{/if}

	{#if data.user?.role === 'admin'}
		<a href="/admin/sections/{data.section.id}" class="inline-flex items-center gap-1.5 text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
			Edit this section →
		</a>
	{/if}
</div>
