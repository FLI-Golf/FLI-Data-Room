<script lang="ts">
	import { enhance } from '$app/forms';
	import { Plus, Trash2, Info, CheckCircle2 } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	type Person  = { name: string; title: string; bio: string; email: string; linkedin: string; photoUrl: string; docId: string };
	type Advisor = { name: string; title: string; bio: string; photoUrl: string };

	let leadership: Person[] = (data.saved?.leadership as Person[]) ?? [
		{ name: '', title: 'Chief Executive Officer & Founder', bio: '', email: '', linkedin: '', photoUrl: '', docId: '' },
	];
	let advisors: Advisor[] = (data.saved?.advisors as Advisor[]) ?? [
		{ name: '', title: '', bio: '', photoUrl: '' },
	];
	let directors: Advisor[] = (data.saved?.directors as Advisor[]) ?? [
		{ name: '', title: '', bio: '', photoUrl: '' },
	];

	let step = 0;
	const steps = ['Leadership', 'Advisors', 'Directors', 'Review'];

	function addLeader()   { leadership = [...leadership,  { name: '', title: '', bio: '', email: '', linkedin: '', photoUrl: '', docId: '' }]; }
	function addAdvisor()  { advisors   = [...advisors,    { name: '', title: '', bio: '', photoUrl: '' }]; }
	function addDirector() { directors  = [...directors,   { name: '', title: '', bio: '', photoUrl: '' }]; }

	function removeLeader(i: number)   { leadership = leadership.filter((_, idx) => idx !== i); }
	function removeAdvisor(i: number)  { advisors   = advisors.filter((_, idx) => idx !== i); }
	function removeDirector(i: number) { directors  = directors.filter((_, idx) => idx !== i); }

	const ic = 'w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50';
</script>

<svelte:head><title>Management & Team — Content Editor</title></svelte:head>

<div class="max-w-3xl space-y-6">
	<div>
		<a href="/admin/content" class="text-xs text-white/30 hover:text-white/60 transition-colors">← Content Editor</a>
		<h1 class="text-2xl font-black text-white mt-1">Management & Team</h1>
		<p class="text-sm text-white/50 mt-1">Enter detailed bios for leadership, advisors, and board members. Investors expect full career histories and domain expertise.</p>
	</div>

	{#if form?.success}
		<div class="rounded-md bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400 flex items-center gap-2">
			<CheckCircle2 class="h-4 w-4 shrink-0" /> Saved successfully.
		</div>
	{/if}
	{#if form?.error}
		<div class="rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">{form.error}</div>
	{/if}

	<div class="flex gap-1 border-b border-white/10">
		{#each steps as label, i}
			<button type="button" on:click={() => step = i}
				class="px-4 py-2 text-sm font-medium rounded-t-md transition-colors {step === i ? 'bg-navy-700/80 text-white border border-b-0 border-white/15' : 'text-white/40 hover:text-white/70'}">
				{i + 1}. {label}
			</button>
		{/each}
	</div>

	<form method="POST" action="?/save" use:enhance class="space-y-6">

		<!-- Step 1: Leadership -->
		{#if step === 0}
			<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/15 p-4 flex items-start gap-3">
				<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
				<p class="text-xs text-white/55 leading-relaxed">
					Add one entry per executive. Include a full career bio and a <strong class="text-white/70">Photo URL</strong> (direct image link — a preview appears inline). The <strong class="text-white/70">Resume Doc ID</strong> links to a PDF uploaded via Admin → Documents.
				</p>
			</div>

			{#each leadership as person, i}
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							{#if person.photoUrl}
								<img src={person.photoUrl} alt={person.name} class="h-10 w-10 rounded-full object-cover border border-white/20 shrink-0" />
							{:else}
								<div class="h-10 w-10 rounded-full bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-sm font-black text-brand-400 shrink-0">
									{person.name ? person.name.charAt(0).toUpperCase() : (i + 1)}
								</div>
							{/if}
							<span class="text-sm font-bold text-white">{person.name || `Executive ${i + 1}`}</span>
						</div>
						{#if leadership.length > 1}
							<button type="button" on:click={() => removeLeader(i)} class="text-brand-400 hover:text-brand-300 transition-colors">
								<Trash2 class="h-4 w-4" />
							</button>
						{/if}
					</div>

					<div class="grid sm:grid-cols-2 gap-4">
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Full Name <span class="text-brand-400">*</span></label>
							<input name="leadership_{i}_name" bind:value={person.name} required type="text" placeholder="e.g. John Smith" class={ic} />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Title / Role <span class="text-brand-400">*</span></label>
							<input name="leadership_{i}_title" bind:value={person.title} required type="text" placeholder="e.g. Chief Executive Officer" class={ic} />
						</div>
					</div>

					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/50">Photo URL <span class="text-white/25 font-normal">(direct image link)</span></label>
						<div class="flex gap-2 items-center">
							<input name="leadership_{i}_photoUrl" bind:value={person.photoUrl} type="url" placeholder="https://…/headshot.jpg" class={ic} />
							{#if person.photoUrl}
								<img src={person.photoUrl} alt={person.name} class="h-10 w-10 rounded-full object-cover border border-white/20 shrink-0" />
							{:else}
								<div class="h-10 w-10 rounded-full bg-white/5 border border-dashed border-white/15 shrink-0"></div>
							{/if}
						</div>
					</div>

					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Bio / Career Summary <span class="text-brand-400">*</span></label>
						<p class="text-xs text-white/35">Include past companies, key accomplishments, years of experience, and why they're the right person for this role.</p>
						<textarea name="leadership_{i}_bio" bind:value={person.bio} required rows="5"
							placeholder="e.g. 20+ years in sports media and event production. Previously VP of Operations at XYZ Sports, where he led a $50M venue buildout..."
							class="{ic} resize-y"></textarea>
					</div>

					<div class="grid sm:grid-cols-3 gap-4">
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Email</label>
							<input name="leadership_{i}_email" bind:value={person.email} type="email" placeholder="name@fligolf.com" class={ic} />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">LinkedIn URL</label>
							<input name="leadership_{i}_linkedin" bind:value={person.linkedin} type="url" placeholder="https://linkedin.com/in/..." class={ic} />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Resume Doc ID</label>
							<input name="leadership_{i}_docId" bind:value={person.docId} type="text" placeholder="PocketBase record ID" class={ic} />
						</div>
					</div>
				</div>
			{/each}
			<button type="button" on:click={addLeader}
				class="flex items-center gap-2 rounded-md border border-dashed border-white/20 px-4 py-2 text-sm text-white/40 hover:text-white hover:border-white/40 transition-colors">
				<Plus class="h-4 w-4" /> Add Executive
			</button>

		<!-- Step 2: Advisors -->
		{:else if step === 1}
			<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/15 p-4 flex items-start gap-3">
				<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
				<p class="text-xs text-white/55 leading-relaxed">
					Add each advisor with their industry background, relevant network, and the specific value they bring to FLI. Add a <strong class="text-white/70">Photo URL</strong> for a headshot.
				</p>
			</div>

			{#each advisors as advisor, i}
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							{#if advisor.photoUrl}
								<img src={advisor.photoUrl} alt={advisor.name} class="h-9 w-9 rounded-full object-cover border border-white/20 shrink-0" />
							{:else}
								<div class="h-9 w-9 rounded-full bg-fli-blue-700/30 border border-fli-blue-600/30 flex items-center justify-center text-xs font-black text-fli-blue-300 shrink-0">
									{advisor.name ? advisor.name.charAt(0).toUpperCase() : (i + 1)}
								</div>
							{/if}
							<span class="text-sm font-bold text-white">{advisor.name || `Advisor ${i + 1}`}</span>
						</div>
						{#if advisors.length > 1}
							<button type="button" on:click={() => removeAdvisor(i)} class="text-brand-400 hover:text-brand-300 transition-colors">
								<Trash2 class="h-4 w-4" />
							</button>
						{/if}
					</div>

					<div class="grid sm:grid-cols-2 gap-4">
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Full Name <span class="text-brand-400">*</span></label>
							<input name="advisor_{i}_name" bind:value={advisor.name} required type="text" placeholder="e.g. Jane Doe" class={ic} />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Title / Expertise</label>
							<input name="advisor_{i}_title" bind:value={advisor.title} type="text" placeholder="e.g. Sports Media Advisor" class={ic} />
						</div>
					</div>

					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/50">Photo URL <span class="text-white/25 font-normal">(direct image link)</span></label>
						<div class="flex gap-2 items-center">
							<input name="advisor_{i}_photoUrl" bind:value={advisor.photoUrl} type="url" placeholder="https://…/headshot.jpg" class={ic} />
							{#if advisor.photoUrl}
								<img src={advisor.photoUrl} alt={advisor.name} class="h-10 w-10 rounded-full object-cover border border-white/20 shrink-0" />
							{:else}
								<div class="h-10 w-10 rounded-full bg-white/5 border border-dashed border-white/15 shrink-0"></div>
							{/if}
						</div>
					</div>

					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Bio</label>
						<textarea name="advisor_{i}_bio" bind:value={advisor.bio} rows="3"
							placeholder="Background, relevant experience, and specific value to FLI..."
							class="{ic} resize-y"></textarea>
					</div>
				</div>
			{/each}
			<button type="button" on:click={addAdvisor}
				class="flex items-center gap-2 rounded-md border border-dashed border-white/20 px-4 py-2 text-sm text-white/40 hover:text-white hover:border-white/40 transition-colors">
				<Plus class="h-4 w-4" /> Add Advisor
			</button>

		<!-- Step 3: Directors -->
		{:else if step === 2}
			<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/15 p-4 flex items-start gap-3">
				<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
				<p class="text-xs text-white/55 leading-relaxed">
					Add each board member with their governance experience and industry background. Add a <strong class="text-white/70">Photo URL</strong> for a headshot.
				</p>
			</div>

			{#each directors as director, i}
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 space-y-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							{#if director.photoUrl}
								<img src={director.photoUrl} alt={director.name} class="h-9 w-9 rounded-full object-cover border border-white/20 shrink-0" />
							{:else}
								<div class="h-9 w-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs font-black text-white/50 shrink-0">
									{director.name ? director.name.charAt(0).toUpperCase() : (i + 1)}
								</div>
							{/if}
							<span class="text-sm font-bold text-white">{director.name || `Director ${i + 1}`}</span>
						</div>
						{#if directors.length > 1}
							<button type="button" on:click={() => removeDirector(i)} class="text-brand-400 hover:text-brand-300 transition-colors">
								<Trash2 class="h-4 w-4" />
							</button>
						{/if}
					</div>

					<div class="grid sm:grid-cols-2 gap-4">
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Full Name <span class="text-brand-400">*</span></label>
							<input name="director_{i}_name" bind:value={director.name} required type="text" placeholder="e.g. Robert Johnson" class={ic} />
						</div>
						<div class="space-y-1">
							<label class="block text-xs font-medium text-white/60">Title</label>
							<input name="director_{i}_title" bind:value={director.title} type="text" placeholder="e.g. Independent Director" class={ic} />
						</div>
					</div>

					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/50">Photo URL <span class="text-white/25 font-normal">(direct image link)</span></label>
						<div class="flex gap-2 items-center">
							<input name="director_{i}_photoUrl" bind:value={director.photoUrl} type="url" placeholder="https://…/headshot.jpg" class={ic} />
							{#if director.photoUrl}
								<img src={director.photoUrl} alt={director.name} class="h-10 w-10 rounded-full object-cover border border-white/20 shrink-0" />
							{:else}
								<div class="h-10 w-10 rounded-full bg-white/5 border border-dashed border-white/15 shrink-0"></div>
							{/if}
						</div>
					</div>

					<div class="space-y-1">
						<label class="block text-xs font-medium text-white/60">Bio</label>
						<textarea name="director_{i}_bio" bind:value={director.bio} rows="3"
							placeholder="Governance experience, industry background, committee roles..."
							class="{ic} resize-y"></textarea>
					</div>
				</div>
			{/each}
			<button type="button" on:click={addDirector}
				class="flex items-center gap-2 rounded-md border border-dashed border-white/20 px-4 py-2 text-sm text-white/40 hover:text-white hover:border-white/40 transition-colors">
				<Plus class="h-4 w-4" /> Add Director
			</button>

		<!-- Step 4: Review -->
		{:else}
			<div class="space-y-4">
				{#each [['Leadership', leadership], ['Advisors', advisors], ['Directors', directors]] as [label, list]}
					<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5">
						<h3 class="text-sm font-bold text-white mb-3">{label} ({(list as typeof leadership).filter(p => p.name).length} entered)</h3>
						<div class="space-y-1">
							{#each (list as typeof leadership).filter(p => p.name) as p}
								<div class="flex items-center gap-3 text-xs py-1.5 border-b border-white/5 last:border-0">
									{#if p.photoUrl}
										<img src={p.photoUrl} alt={p.name} class="h-7 w-7 rounded-full object-cover border border-white/20 shrink-0" />
									{:else}
										<div class="h-7 w-7 rounded-full bg-white/8 border border-dashed border-white/15 shrink-0"></div>
									{/if}
									<span class="font-medium text-white">{p.name}</span>
									<span class="text-white/40">{p.title}</span>
									{#if p.photoUrl}<span class="ml-auto text-yellow-400">Photo ✓</span>{:else}<span class="ml-auto text-white/20">No photo</span>{/if}
								</div>
							{/each}
							{#if !(list as typeof leadership).some(p => p.name)}
								<p class="text-xs text-white/30 italic">None entered yet.</p>
							{/if}
						</div>
					</div>
				{/each}
				<p class="text-xs text-white/30">Saving will immediately update the Management & Team page visible to investors.</p>
			</div>
		{/if}

		<!-- Nav -->
		<div class="flex items-center justify-between pt-4 border-t border-white/10">
			<button type="button" on:click={() => step = Math.max(0, step - 1)} disabled={step === 0}
				class="rounded-md border border-white/15 px-4 py-2 text-sm text-white/50 hover:text-white hover:border-white/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
				← Previous
			</button>
			<span class="text-xs text-white/25">Step {step + 1} of {steps.length}</span>
			{#if step < steps.length - 1}
				<button type="button" on:click={() => step = step + 1}
					class="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition-colors">
					Next →
				</button>
			{:else}
				<button type="submit"
					class="rounded-md bg-yellow-500 px-5 py-2 text-sm font-semibold text-navy-950 hover:bg-yellow-400 transition-colors">
					Save & Publish
				</button>
			{/if}
		</div>
	</form>
</div>
