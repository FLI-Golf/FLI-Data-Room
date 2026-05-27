<script lang="ts">
	import { MapPin, Users, Tv, Music, Utensils, Baby, Star, Flag, CheckCircle2, Upload, X } from 'lucide-svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	type VenueZone = {
		label: string;
		description: string;
		icon: typeof MapPin;
		color: string;
		border: string;
		bg: string;
		before: string | null;
		after: string | null;
		note?: string;
	};

	const PB = 'https://pocketbase-rxik-production.up.railway.app/api/files/media';

	const zones: VenueZone[] = [
		{
			label: 'Entryway',
			description: 'Main entrance and arrival experience for fans and VIP guests.',
			icon: Star, color: 'text-yellow-400', border: 'border-yellow-500/20', bg: 'bg-yellow-500/8',
			before: `${PB}/isnfzc8gpar4ul5/entryway_before_lk2lai9gsz.png`,
			after:  `${PB}/q4lp54rlddbcj8x/entryway_after_efb7z5zj9a.png`,
		},
		{
			label: "Children's Zone #1",
			description: 'First dedicated youth activity area with supervised programming.',
			icon: Baby, color: 'text-pink-400', border: 'border-pink-500/20', bg: 'bg-pink-500/8',
			before: `${PB}/7szqqgnhbobsryc/childrens_zone1_before_b61j7gxkk6.png`,
			after:  `${PB}/rh3ig0r146pluwq/childrens_zone1_after_h9ijpsc5tl.png`,
		},
		{
			label: "Children's Zone #2",
			description: 'Second youth zone expanding capacity for family attendance.',
			icon: Baby, color: 'text-pink-400', border: 'border-pink-500/20', bg: 'bg-pink-500/8',
			before: `${PB}/lrheb7kyvmaz9m8/childrens_zone2_before_f1ns37o3q0.png`,
			after:  `${PB}/972kkn8kvm11yuy/childrens_zone2_after_make3nmz2c.png`,
		},
		{
			label: 'Player Practice Area / Media Area',
			description: 'Warm-up space for competitors and dedicated broadcast media setup.',
			icon: Tv, color: 'text-fli-blue-400', border: 'border-fli-blue-700/20', bg: 'bg-fli-blue-800/10',
			before: `${PB}/0cb7u3lsbmlnagq/practice_media_before_dztnf2ppzg.png`,
			after:  `${PB}/0xuivzcn81f8f3n/practice_media_after_lh8905o5a9.png`,
		},
		{
			label: '2nd Floor Terrace / Parents Area #1',
			description: 'Elevated viewing terrace for parents of children in the youth zones.',
			icon: Users, color: 'text-brand-400', border: 'border-brand-600/20', bg: 'bg-brand-600/8',
			before: `${PB}/8rrywqgrhsmt7c3/terrace_parents_before_2sslmv18m6.png`,
			after:  `${PB}/tow3qlot2vyuxap/terrace_parents_after_dy8orbixbh.png`,
		},
		{
			label: 'Main Vending / Food & Beverage Terrace',
			description: 'Primary concessions hub serving the main spectator areas.',
			icon: Utensils, color: 'text-orange-400', border: 'border-orange-500/20', bg: 'bg-orange-500/8',
			before: `${PB}/b02yzsrao8jxzr7/fb_terrace_before_9p5e1u0va6.png`,
			after:  `${PB}/8y3s8hwtbqc7w77/fb_terrace_after_snxcdqpehg.png`,
		},
		{
			label: 'Holes #1, #2 & #3',
			description: 'Opening three-hole stretch setting the competitive tone of the round.',
			icon: Flag, color: 'text-green-400', border: 'border-green-500/20', bg: 'bg-green-500/8',
			before: `${PB}/ji3gwwv1oxlq3xe/holes123_before_oi4yalvm3d.png`,
			after:  `${PB}/qpah6n6meykr1cf/holes123_after_tdunjgksqp.png`,
		},
		{
			label: 'Holes #4, #5 & #6',
			description: 'Mid-course holes designed for spectator sightlines and strategic play.',
			icon: Flag, color: 'text-green-400', border: 'border-green-500/20', bg: 'bg-green-500/8',
			before: `${PB}/lqjzr85t44714s0/holes456_before_qztg9f40pc.png`,
			after:  `${PB}/ysoglhtohmb7haw/holes456_after_y20kha8v2b.png`,
		},
		{
			label: 'Hole #7 & On-Course F&B Tent',
			description: 'Signature hole paired with an on-course food and drink tent; hazard area fenced off for safety.',
			icon: Utensils, color: 'text-orange-400', border: 'border-orange-500/20', bg: 'bg-orange-500/8',
			before: `${PB}/jw1iog2upz48lfp/hole7_fb_before_tw3vru1z6e.png`,
			after:  `${PB}/00b6axq8nlgtrjb/hole7_fb_after_hfqjoqfzv2.png`,
		},
		{
			label: 'Holes #8 & #9',
			description: 'Closing two holes delivering the finishing drama of the stadium round.',
			icon: Flag, color: 'text-green-400', border: 'border-green-500/20', bg: 'bg-green-500/8',
			before: null,
			after:  `${PB}/eubk6dvqiwyvash/holes89_after_0vtwprxjqx.png`,
			note: 'No before picture available for this zone.',
		},
		{
			label: 'Stage Field',
			description: 'Main entertainment stage for pre/post-event performances and ceremonies.',
			icon: Music, color: 'text-purple-400', border: 'border-purple-500/20', bg: 'bg-purple-500/8',
			before: `${PB}/syxorw158jhmwsc/stage_before_2lwh43lgyx.png`,
			after:  `${PB}/fr7tecb2lthoxj8/stage_after_0ilu5011aw.png`,
		},
		{
			label: 'Rooftop Terrace',
			description: 'Premium elevated viewing area with panoramic course views.',
			icon: Star, color: 'text-yellow-400', border: 'border-yellow-500/20', bg: 'bg-yellow-500/8',
			before: `${PB}/waa3uijju50zs3e/rooftop_before_c0avzybjpu.png`,
			after:  `${PB}/iu556tybwxq2lsa/rooftop_after_ow0ffbrqin.png`,
		},
	];

	type VenueData = { name: string; location: string; capacity: string; ownership: string; availability: string; estimatedCost: string; status: string; pros: string[]; cons: string[]; photoUrl: string; docId: string };

	const saved = (data.content?.venues as VenueData[]) ?? [];
	const venue = saved[0] ?? null;

	const displayName         = venue?.name         || 'Turf Paradise';
	const displayLocation     = venue?.location      || 'Phoenix, AZ';
	const displayCapacity     = venue?.capacity      || 'TBD';
	const displayOwnership    = venue?.ownership     || 'Private';
	const displayAvailability = venue?.availability  || 'TBD';
	const displayCost         = venue?.estimatedCost || 'TBD';
	const displayStatus       = venue?.status        || 'Confirmed Inaugural Venue';
	const displayPros         = venue?.pros?.length  ? venue.pros : [];
	const displayCons         = venue?.cons?.length  ? venue.cons : [];
	const displayPhotoUrl     = venue?.photoUrl      || '';
	const displayDocId        = venue?.docId         || '';

	$: hasAdminData = !!saved[0]?.name;

	// Modal state
	let activeZone: VenueZone | null = null;
	let activeTab: 'before' | 'after' = 'after';

	function openZone(zone: VenueZone) {
		activeZone = zone;
		activeTab = zone.after ? 'after' : 'before';
	}

	function closeModal() {
		activeZone = null;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeModal();
	}

	function navigateZone(dir: 1 | -1) {
		if (!activeZone) return;
		const idx = zones.indexOf(activeZone);
		const next = zones[(idx + dir + zones.length) % zones.length];
		activeZone = next;
		activeTab = next.after ? 'after' : 'before';
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<svelte:head>
	<title>Inaugural Venue — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-10">

	<!-- Header -->
	<div>
		<h1 class="text-3xl font-black text-white">Planned Inaugural Venue</h1>
		<p class="mt-1 text-white/50">FGL @ Turf Paradise — a full venue breakdown of the confirmed inaugural event site.</p>
	</div>

	{#if !hasAdminData}
		<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5 flex items-start gap-3">
			<Upload class="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
			<div>
				<div class="text-sm font-semibold text-yellow-400 mb-1">Venue Details Not Yet Entered</div>
				<p class="text-xs text-white/50 leading-relaxed">
					Go to <a href="/admin/content/inaugural-venue" class="text-yellow-400 hover:text-yellow-300 underline">Admin → Content Editor → Inaugural Venue</a> to enter venue details. The zone breakdown below is pre-populated.
				</p>
			</div>
		</div>
	{/if}

	<!-- Venue hero card -->
	<div class="rounded-xl border border-brand-500/40 bg-brand-600/10 overflow-hidden">
		{#if displayPhotoUrl}
			<img src={displayPhotoUrl} alt={displayName} class="w-full h-56 object-cover" />
		{/if}
		<div class="p-6 space-y-5">
			<!-- Name + status -->
			<div class="flex items-start justify-between gap-4 flex-wrap">
				<div>
					<div class="flex items-center gap-2 flex-wrap">
						<h2 class="text-2xl font-black text-white">{displayName}</h2>
						<span class="rounded-full bg-brand-600/30 px-2.5 py-0.5 text-xs font-semibold text-brand-400">Preferred</span>
					</div>
					<div class="flex items-center gap-1.5 mt-1 text-white/40 text-sm">
						<MapPin class="h-3.5 w-3.5" />
						{displayLocation}
					</div>
				</div>
				<div class="flex items-center gap-2 flex-wrap">
					<span class="rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-white/50">{displayStatus}</span>
					{#if displayDocId}
						<a href="/api/documents/{displayDocId}" target="_blank"
							class="rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-500 transition-colors">
							View Proposal
						</a>
					{/if}
				</div>
			</div>

			<!-- Stats row -->
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
				{#each [
					{ icon: Users,   label: 'Capacity',        value: displayCapacity },
					{ icon: MapPin,  label: 'Ownership',       value: displayOwnership },
					{ icon: MapPin,  label: 'Availability',    value: displayAvailability },
					{ icon: MapPin,  label: 'Est. Event Cost', value: displayCost },
				] as stat}
					<div class="rounded-lg bg-navy-900/60 border border-white/8 p-3">
						<div class="flex items-center gap-1.5 mb-1">
							<svelte:component this={stat.icon} class="h-3 w-3 text-white/30" />
							<span class="text-xs text-white/30 uppercase tracking-wide">{stat.label}</span>
						</div>
						<div class="text-sm font-semibold text-white/70">{stat.value}</div>
					</div>
				{/each}
			</div>

			<!-- Pros / Cons (only shown when admin data exists) -->
			{#if displayPros.length > 0 || displayCons.length > 0}
				<div class="grid sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
					{#if displayPros.length > 0}
						<div>
							<div class="text-xs font-semibold text-green-400 uppercase tracking-wide mb-2">Advantages</div>
							<ul class="space-y-1.5">
								{#each displayPros as pro}
									<li class="flex items-start gap-2 text-xs text-white/50">
										<CheckCircle2 class="h-3.5 w-3.5 text-green-500/60 shrink-0 mt-0.5" />
										{pro}
									</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if displayCons.length > 0}
						<div>
							<div class="text-xs font-semibold text-white/30 uppercase tracking-wide mb-2">Considerations</div>
							<ul class="space-y-1.5">
								{#each displayCons as con}
									<li class="flex items-start gap-2 text-xs text-white/50">
										<span class="h-3.5 w-3.5 rounded-full border border-white/20 shrink-0 mt-0.5 flex items-center justify-center text-white/30 text-[8px]">–</span>
										{con}
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<!-- Zone breakdown -->
	<div>
		<h2 class="text-lg font-bold text-white mb-1">Venue Zone Breakdown</h2>
		<p class="text-sm text-white/40 mb-5">Click any zone to see before &amp; after photos from the site.</p>
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each zones as zone}
				<button
					type="button"
					on:click={() => openZone(zone)}
					class="rounded-xl border {zone.border} {zone.bg} p-4 flex items-start gap-3 text-left w-full transition-all hover:brightness-125 hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
				>
					<div class="h-8 w-8 rounded-lg bg-navy-900/40 flex items-center justify-center shrink-0">
						<svelte:component this={zone.icon} class="h-4 w-4 {zone.color}" />
					</div>
					<div class="min-w-0">
						<div class="text-sm font-semibold text-white leading-snug">{zone.label}</div>
						<div class="text-xs text-white/40 mt-1 leading-relaxed">{zone.description}</div>
					</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- Course layout callout -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6 space-y-4">
		<h2 class="text-lg font-bold text-white">9-Hole Stadium Course</h2>
		<div class="grid sm:grid-cols-3 gap-4">
			{#each [
				{ label: 'Holes',        value: '9',   sub: 'Stadium format' },
				{ label: 'Course Zones', value: '12',  sub: 'Mapped & photographed' },
				{ label: 'Fan Areas',    value: '5+',  sub: 'Terraces, stage & F&B' },
			] as stat}
				<div class="rounded-lg bg-navy-900/60 border border-white/8 p-4 text-center">
					<div class="text-3xl font-black text-white">{stat.value}</div>
					<div class="text-xs font-semibold text-white/60 mt-1">{stat.label}</div>
					<div class="text-xs text-white/30 mt-0.5">{stat.sub}</div>
				</div>
			{/each}
		</div>
		<p class="text-xs text-white/40 leading-relaxed">
			The course is built within the existing Turf Paradise footprint. Each hole is positioned for maximum spectator sightlines, with the Stage Field and Rooftop Terrace providing premium viewing experiences above the action.
		</p>
	</div>

	<p class="text-xs text-white/20">Venue information is confidential and subject to the NDA you accepted.</p>
</div>

<!-- Zone modal -->
{#if activeZone}
	<!-- Backdrop -->
	<button
		type="button"
		class="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
		on:click={closeModal}
		aria-label="Close"
	></button>

	<!-- Panel -->
	<div
		class="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-3xl mx-auto rounded-2xl border border-white/15 bg-navy-900 shadow-2xl overflow-hidden"
		role="dialog"
		aria-modal="true"
		aria-label={activeZone.label}
	>
		<!-- Modal header -->
		<div class="flex items-center justify-between px-5 py-4 border-b border-white/10">
			<div class="flex items-center gap-3">
				<div class="h-8 w-8 rounded-lg bg-navy-800 flex items-center justify-center shrink-0">
					<svelte:component this={activeZone.icon} class="h-4 w-4 {activeZone.color}" />
				</div>
				<div>
					<div class="text-sm font-bold text-white">{activeZone.label}</div>
					<div class="text-xs text-white/40">{activeZone.description}</div>
				</div>
			</div>
			<button type="button" on:click={closeModal} class="rounded-md p-1.5 text-white/40 hover:text-white hover:bg-white/8 transition-colors">
				<X class="h-4 w-4" />
			</button>
		</div>

		<!-- Before / After tabs -->
		{#if activeZone.before || activeZone.after}
			<div class="flex gap-1 px-5 pt-4">
				{#if activeZone.before}
					<button
						type="button"
						on:click={() => activeTab = 'before'}
						class="px-4 py-1.5 rounded-full text-xs font-semibold transition-colors {activeTab === 'before' ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'}"
					>
						Current Property
					</button>
				{/if}
				{#if activeZone.after}
					<button
						type="button"
						on:click={() => activeTab = 'after'}
						class="px-4 py-1.5 rounded-full text-xs font-semibold transition-colors {activeTab === 'after' ? 'bg-brand-600/40 text-brand-300' : 'text-white/40 hover:text-white/70'}"
					>
						FGL Design
					</button>
				{/if}
			</div>

			<div class="px-5 pt-3 pb-5">
				{#if activeTab === 'before' && activeZone.before}
					<img
						src={activeZone.before}
						alt="Current property — {activeZone.label}"
						class="w-full rounded-xl object-cover max-h-[55vh]"
					/>
				{:else if activeTab === 'after' && activeZone.after}
					<img
						src={activeZone.after}
						alt="FGL design — {activeZone.label}"
						class="w-full rounded-xl object-cover max-h-[55vh]"
					/>
				{/if}
				{#if activeZone.note}
					<p class="mt-2 text-xs text-white/30 italic">{activeZone.note}</p>
				{/if}
			</div>
		{/if}

		<!-- Prev / Next navigation -->
		<div class="flex items-center justify-between px-5 py-3 border-t border-white/10">
			<button
				type="button"
				on:click={() => navigateZone(-1)}
				class="text-xs text-white/40 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-white/8"
			>
				← Previous
			</button>
			<span class="text-xs text-white/20">
				{zones.indexOf(activeZone) + 1} / {zones.length}
			</span>
			<button
				type="button"
				on:click={() => navigateZone(1)}
				class="text-xs text-white/40 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-white/8"
			>
				Next →
			</button>
		</div>
	</div>
{/if}
