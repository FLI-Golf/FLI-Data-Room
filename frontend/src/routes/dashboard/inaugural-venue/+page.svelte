<script lang="ts">
	import { MapPin, Users, Calendar, DollarSign, CheckCircle2, Upload } from 'lucide-svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	type Venue = { name: string; location: string; capacity: string; ownership: string; availability: string; estimatedCost: string; status: string; pros: string[]; cons: string[]; photoUrl: string; docId: string };

	const PLACEHOLDER_VENUES = [
		{ rank: 1, name: 'Venue Option A — Name TBD', location: 'City, State TBD', capacity: 'TBD', ownership: 'TBD', availability: 'TBD', estimatedCost: 'TBD', pros: ['Replace with actual venue advantage'], cons: ['Replace with actual venue consideration'], status: 'Under evaluation', preferred: true, photoUrl: '', docId: '' },
		{ rank: 2, name: 'Venue Option B — Name TBD', location: 'City, State TBD', capacity: 'TBD', ownership: 'TBD', availability: 'TBD', estimatedCost: 'TBD', pros: ['Replace with actual venue advantage'], cons: ['Replace with actual venue consideration'], status: 'Under evaluation', preferred: false, photoUrl: '', docId: '' },
	];

	const savedVenues = (data.content?.venues as Venue[]) ?? [];
	$: hasData = savedVenues.some(v => v.name);

	$: venues = savedVenues.length > 0
		? savedVenues.map((v, i) => ({ ...v, rank: i + 1, preferred: i === 0 }))
		: PLACEHOLDER_VENUES;

	const criteria = [
		{ label: 'Spectator Capacity', description: 'Minimum 5,000 seated + standing room for broadcast atmosphere' },
		{ label: 'Course Buildout Feasibility', description: 'Sufficient open space for a stadium-format disc golf layout' },
		{ label: 'Broadcast Infrastructure', description: 'Existing or buildable camera positions, lighting, and production facilities' },
		{ label: 'Market Demographics', description: 'Located in a metro with strong disc golf participation and sports betting access' },
		{ label: 'Tribal / Gaming Proximity', description: 'Proximity to tribal gaming partners for integrated sponsorship and activation' },
		{ label: 'Accessibility & Lodging', description: 'Airport access, hotel inventory, and sports tourism infrastructure' },
	];
</script>

<svelte:head>
	<title>Inaugural Venue — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-4xl space-y-10">
	<div>
		<h1 class="text-3xl font-black text-white">Planned Inaugural Venue</h1>
		<p class="mt-1 text-white/50">Top two forecasted venue options for FLI Golf's inaugural stadium-format event.</p>
	</div>

	{#if !hasData}
	<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5 flex items-start gap-3">
		<Upload class="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
		<div>
			<div class="text-sm font-semibold text-yellow-400 mb-1">Venue Details Not Yet Entered</div>
			<p class="text-xs text-white/50 leading-relaxed">
				Go to <a href="/admin/content/inaugural-venue" class="text-yellow-400 hover:text-yellow-300 underline">Admin → Content Editor → Inaugural Venue</a> to enter the top two venue candidates.
			</p>
		</div>
	</div>
	{/if}

	<!-- Venue cards -->
	<div class="space-y-6">
		{#each venues as venue}
			<div class="rounded-xl border {venue.preferred ? 'border-brand-500/40 bg-brand-600/10' : 'border-white/15 bg-navy-700/50'} overflow-hidden">
				{#if venue.photoUrl}
					<img src={venue.photoUrl} alt={venue.name} class="w-full h-48 object-cover" />
				{/if}
				<div class="p-6 space-y-5">
				<!-- Header -->
				<div class="flex items-start justify-between gap-4">
					<div class="flex items-start gap-3">
						<div class="h-10 w-10 rounded-lg {venue.preferred ? 'bg-brand-600/30' : 'bg-white/8'} flex items-center justify-center shrink-0 text-lg font-black {venue.preferred ? 'text-brand-400' : 'text-white/30'}">
							{venue.rank}
						</div>
						<div>
							<div class="flex items-center gap-2">
								<h2 class="text-lg font-bold text-white">{venue.name}</h2>
								{#if venue.preferred}
									<span class="rounded-full bg-brand-600/30 px-2.5 py-0.5 text-xs font-semibold text-brand-400">Preferred</span>
								{/if}
							</div>
							<div class="flex items-center gap-1.5 mt-1 text-white/40 text-xs">
								<MapPin class="h-3 w-3" />
								{venue.location}
							</div>
						</div>
					</div>
					<div class="flex items-center gap-2 shrink-0">
						<span class="rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-white/40">{venue.status}</span>
						{#if venue.docId}
							<a href="/api/documents/{venue.docId}" target="_blank" class="rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-500 transition-colors">View Proposal</a>
						{/if}
					</div>
				</div>

				<!-- Stats row -->
				<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
					{#each [
						{ icon: Users, label: 'Capacity', value: venue.capacity },
						{ icon: DollarSign, label: 'Est. Event Cost', value: venue.estimatedCost },
						{ icon: Calendar, label: 'Availability', value: venue.availability },
						{ icon: MapPin, label: 'Ownership', value: venue.ownership },
					] as stat}
						<div class="rounded-lg bg-navy-900/60 border border-white/8 p-3">
							<div class="flex items-center gap-1.5 mb-1">
								<svelte:component this={stat.icon} class="h-3 w-3 text-white/30" />
								<span class="text-xs text-white/30 uppercase tracking-wide">{stat.label}</span>
							</div>
							<div class="text-sm font-semibold text-white/60">{stat.value}</div>
						</div>
					{/each}
				</div>

				<!-- Pros / Cons -->
				<div class="grid sm:grid-cols-2 gap-4">
					<div>
						<div class="text-xs font-semibold text-green-400 uppercase tracking-wide mb-2">Advantages</div>
						<ul class="space-y-1.5">
							{#each venue.pros as pro}
								<li class="flex items-start gap-2 text-xs text-white/50">
									<CheckCircle2 class="h-3.5 w-3.5 text-green-500/60 shrink-0 mt-0.5" />
									{pro}
								</li>
							{/each}
						</ul>
					</div>
					<div>
						<div class="text-xs font-semibold text-white/30 uppercase tracking-wide mb-2">Considerations</div>
						<ul class="space-y-1.5">
							{#each venue.cons as con}
								<li class="flex items-start gap-2 text-xs text-white/50">
									<span class="h-3.5 w-3.5 rounded-full border border-white/20 shrink-0 mt-0.5 flex items-center justify-center text-white/30 text-[8px]">–</span>
									{con}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div><!-- end p-6 -->
			</div><!-- end card -->
		{/each}
	</div>

	<!-- Selection criteria -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6 space-y-4">
		<h2 class="text-lg font-bold text-white">Venue Selection Criteria</h2>
		<div class="grid sm:grid-cols-2 gap-3">
			{#each criteria as c}
				<div class="rounded-lg bg-navy-900/60 border border-white/8 p-3">
					<div class="text-xs font-semibold text-white mb-1">{c.label}</div>
					<div class="text-xs text-white/40 leading-relaxed">{c.description}</div>
				</div>
			{/each}
		</div>
	</div>

	<p class="text-xs text-white/20">Venue information is confidential and subject to the NDA you accepted.</p>
</div>
