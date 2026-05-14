<script lang="ts">
	import { Briefcase, Mail, Linkedin, Upload } from 'lucide-svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	type Person = { name: string; title: string; bio: string; email?: string; linkedin?: string; photoUrl?: string; docId?: string; placeholder?: boolean };

	const PLACEHOLDER_LEADERSHIP: (Person & { placeholder: boolean })[] = [
		{ name: 'CEO / Founder — Name TBD', title: 'Chief Executive Officer & Founder', bio: 'Detailed resume coming soon. Visit Admin → Content Editor → Management & Team to add this person\'s bio.', placeholder: true },
		{ name: 'COO — Name TBD', title: 'Chief Operating Officer', bio: 'Detailed resume coming soon.', placeholder: true },
	];
	const PLACEHOLDER_ADVISORS: (Person & { placeholder: boolean })[] = [
		{ name: 'Advisor — Name TBD', title: 'Strategic Advisor', bio: 'Bio coming soon.', placeholder: true },
	];
	const PLACEHOLDER_DIRECTORS: (Person & { placeholder: boolean })[] = [
		{ name: 'Director — Name TBD', title: 'Independent Director', bio: 'Bio coming soon.', placeholder: true },
	];

	$: rawLeadership = (data.content?.leadership as Person[]) ?? [];
	$: rawAdvisors   = (data.content?.advisors   as Person[]) ?? [];
	$: rawDirectors  = (data.content?.directors  as Person[]) ?? [];

	$: leadership = rawLeadership.length > 0
		? rawLeadership.map(p => ({ ...p, placeholder: false }))
		: PLACEHOLDER_LEADERSHIP;
	$: advisors = rawAdvisors.length > 0
		? rawAdvisors.map(p => ({ ...p, placeholder: false }))
		: PLACEHOLDER_ADVISORS;
	$: directors = rawDirectors.length > 0
		? rawDirectors.map(p => ({ ...p, placeholder: false }))
		: PLACEHOLDER_DIRECTORS;

	$: hasData = rawLeadership.length > 0;
</script>

<svelte:head>
	<title>Management & Team — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-4xl space-y-12">
	<div>
		<h1 class="text-3xl font-black text-white">Management & Team</h1>
		<p class="mt-1 text-white/50">Detailed resumes and bios for FLI Golf's leadership, advisors, and board of directors.</p>
	</div>

	{#if !hasData}
	<!-- Admin upload notice — only shown when no data entered yet -->
	<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5 flex items-start gap-3">
		<Upload class="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
		<div>
			<div class="text-sm font-semibold text-yellow-400 mb-1">Content Not Yet Entered</div>
			<p class="text-xs text-white/50 leading-relaxed">
				Go to <a href="/admin/content/management" class="text-yellow-400 hover:text-yellow-300 underline">Admin → Content Editor → Management & Team</a>
				to enter leadership bios, advisor profiles, and board member details.
			</p>
		</div>
	</div>
	{/if}

	<!-- Leadership -->
	<section id="leadership">
		<h2 class="text-xl font-bold text-white mb-5 flex items-center gap-2">
			<Briefcase class="h-5 w-5 text-brand-400" />
			Leadership Team
		</h2>
		<div class="space-y-4">
			{#each leadership as person}
				<div class="rounded-xl border {person.placeholder ? 'border-white/10 border-dashed' : 'border-white/15'} bg-navy-700/50 p-6">
					<div class="flex items-start justify-between gap-4 mb-3">
						<div>
							<div class="flex items-center gap-2">
								{#if person.photoUrl && !person.placeholder}
									<img src={person.photoUrl} alt={person.name} class="h-10 w-10 rounded-full object-cover border border-white/20 shrink-0" />
								{:else}
									<div class="h-10 w-10 rounded-full bg-brand-600/30 border border-brand-500/40 flex items-center justify-center text-sm font-black text-brand-400 shrink-0">
										{person.placeholder ? '?' : person.name.charAt(0)}
									</div>
								{/if}
								<div>
									<div class="text-base font-bold text-white {person.placeholder ? 'opacity-40' : ''}">{person.name}</div>
									<div class="text-xs text-white/40">{person.title}</div>
								</div>
							</div>
						</div>
						{#if !person.placeholder}
							<div class="flex items-center gap-2 shrink-0">
								<button class="rounded-md border border-white/15 p-1.5 text-white/40 hover:text-white hover:border-white/30 transition-colors">
									<Mail class="h-3.5 w-3.5" />
								</button>
								<button class="rounded-md border border-white/15 p-1.5 text-white/40 hover:text-white hover:border-white/30 transition-colors">
									<Linkedin class="h-3.5 w-3.5" />
								</button>
							</div>
						{/if}
					</div>
					<p class="text-sm text-white/50 leading-relaxed {person.placeholder ? 'italic' : ''}">{person.bio}</p>
					{#if !person.placeholder}
						<div class="mt-4 pt-4 border-t border-white/10">
							<a href="#" class="text-xs text-brand-400 hover:text-brand-300 font-medium transition-colors">
								View Full Resume / CV →
							</a>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- Advisors -->
	<section id="advisors">
		<h2 class="text-xl font-bold text-white mb-5">Advisory Board</h2>
		<div class="grid sm:grid-cols-2 gap-4">
			{#each advisors as person}
				<div class="rounded-xl border {person.placeholder ? 'border-white/10 border-dashed' : 'border-white/15'} bg-navy-700/50 p-5">
					<div class="flex items-center gap-3 mb-3">
						{#if person.photoUrl && !person.placeholder}
							<img src={person.photoUrl} alt={person.name} class="h-9 w-9 rounded-full object-cover border border-white/20 shrink-0" />
						{:else}
							<div class="h-9 w-9 rounded-full bg-fli-blue-700/30 border border-fli-blue-600/30 flex items-center justify-center text-xs font-black text-fli-blue-300 shrink-0">
								{person.placeholder ? '?' : person.name.charAt(0)}
							</div>
						{/if}
						<div>
							<div class="text-sm font-bold text-white {person.placeholder ? 'opacity-40' : ''}">{person.name}</div>
							<div class="text-xs text-white/40">{person.title}</div>
						</div>
					</div>
					<p class="text-xs text-white/50 leading-relaxed {person.placeholder ? 'italic' : ''}">{person.bio}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Directors -->
	<section id="directors">
		<h2 class="text-xl font-bold text-white mb-5">Board of Directors</h2>
		<div class="space-y-4">
			{#each directors as person}
				<div class="rounded-xl border {person.placeholder ? 'border-white/10 border-dashed' : 'border-white/15'} bg-navy-700/50 p-5">
					<div class="flex items-center gap-3 mb-3">
						{#if person.photoUrl && !person.placeholder}
							<img src={person.photoUrl} alt={person.name} class="h-9 w-9 rounded-full object-cover border border-white/20 shrink-0" />
						{:else}
							<div class="h-9 w-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs font-black text-white/50 shrink-0">
								{person.placeholder ? '?' : person.name.charAt(0)}
							</div>
						{/if}
						<div>
							<div class="text-sm font-bold text-white {person.placeholder ? 'opacity-40' : ''}">{person.name}</div>
							<div class="text-xs text-white/40">{person.title}</div>
						</div>
					</div>
					<p class="text-xs text-white/50 leading-relaxed {person.placeholder ? 'italic' : ''}">{person.bio}</p>
				</div>
			{/each}
		</div>
	</section>

	<p class="text-xs text-white/20">All biographical information is confidential and subject to the NDA you accepted.</p>
</div>
