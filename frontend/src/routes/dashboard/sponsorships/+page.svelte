<script lang="ts">
	import { Handshake, Upload, ExternalLink, CheckCircle2, Clock } from 'lucide-svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	type Sponsor = { name: string; tier?: string; category: string; value: string; loiStatus: string; docId: string; notes: string };

	const PLACEHOLDER_SPONSORS: Sponsor[] = [
		{ name: 'Sponsor — Placeholder', category: 'TBD', value: 'TBD', loiStatus: 'pending', docId: '', notes: 'Enter sponsor details via Admin → Content Editor → Sponsorships.' },
		{ name: 'Sponsor — Placeholder', category: 'TBD', value: 'TBD', loiStatus: 'pending', docId: '', notes: '' },
		{ name: 'Sponsor — Placeholder', category: 'TBD', value: 'TBD', loiStatus: 'pending', docId: '', notes: '' },
	];

	$: sponsors = ((data.content?.sponsors as Sponsor[]) ?? []).length > 0
		? (data.content?.sponsors as Sponsor[])
		: PLACEHOLDER_SPONSORS;

	$: hasData = ((data.content?.sponsors as Sponsor[]) ?? []).length > 0;
</script>

<svelte:head>
	<title>Sponsorships — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-4xl space-y-10">
	<div>
		<h1 class="text-3xl font-black text-white">Sponsorships</h1>
		<p class="mt-1 text-white/50">Current sponsor list, LOI status, and supporting documents for the FLI Golf League.</p>
	</div>

	{#if !hasData}
	<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5 flex items-start gap-3">
		<Upload class="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
		<div>
			<div class="text-sm font-semibold text-yellow-400 mb-1">Sponsors Not Yet Entered</div>
			<p class="text-xs text-white/50 leading-relaxed">
				Go to <a href="/admin/content/sponsorships" class="text-yellow-400 hover:text-yellow-300 underline">Admin → Content Editor → Sponsorships</a> to add sponsor details and LOI status.
			</p>
		</div>
	</div>
	{/if}

	<!-- Sponsor LOI list -->
	<div class="space-y-3">
		<h2 class="text-lg font-bold text-white">Sponsor LOIs</h2>
		{#each sponsors as sponsor}
			<div class="rounded-xl border {!hasData ? 'border-white/10 border-dashed' : 'border-white/15'} bg-navy-700/50 p-5">
				<div class="flex items-start justify-between gap-4">
					<div class="flex items-start gap-3">
						<div class="h-10 w-10 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
							<Handshake class="h-5 w-5 {hasData ? 'text-white/50' : 'text-white/25'}" />
						</div>
						<div>
							<div class="text-sm font-bold {hasData ? 'text-white' : 'text-white/40'}">{sponsor.name}</div>
							<div class="flex items-center gap-2 mt-1">
								{#if sponsor.category}<span class="text-xs text-white/40">{sponsor.category}</span>{/if}
								{#if sponsor.value && sponsor.value !== 'TBD'}<span class="text-white/20">·</span><span class="text-xs text-white/50 font-medium">{sponsor.value}</span>{/if}
							</div>
							{#if sponsor.notes}<p class="text-xs text-white/40 mt-2 leading-relaxed">{sponsor.notes}</p>{/if}
						</div>
					</div>
					<div class="shrink-0 flex items-center gap-2">
						{#if sponsor.loiStatus === 'signed'}
							<span class="flex items-center gap-1 rounded-full bg-green-500/15 px-2.5 py-1 text-xs font-medium text-green-400">
								<CheckCircle2 class="h-3 w-3" /> LOI Signed
							</span>
							{#if sponsor.docId}
								<a href="/api/documents/{sponsor.docId}" target="_blank" class="flex items-center gap-1.5 rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-500 transition-colors">
									<ExternalLink class="h-3 w-3" /> View LOI
								</a>
							{/if}
						{:else}
							<span class="flex items-center gap-1 rounded-full bg-white/8 px-2.5 py-1 text-xs font-medium text-white/30">
								<Clock class="h-3 w-3" /> {sponsor.loiStatus === 'in-negotiation' ? 'In Negotiation' : 'Pending'}
							</span>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>

	<p class="text-xs text-white/20">All LOIs and sponsor agreements are confidential and subject to the NDA you accepted.</p>
</div>
