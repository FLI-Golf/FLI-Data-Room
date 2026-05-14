<script lang="ts">
	import { enhance } from '$app/forms';
	import { Info, CheckCircle2 } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	type Player = {
		division: string; ranking: string; name: string; country: string;
		sponsor: string; pdgaRating: string; loiStatus: string;
		photoUrl: string; docId: string; bioDocId: string;
	};

	const DEFAULTS: Player[] = [
		{ division: 'MPO', ranking: '#1',  name: 'Gannon Buhr',     country: 'USA',     sponsor: 'Discmania',      pdgaRating: '1061', loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'MPO', ranking: '#2',  name: 'Ricky Wysocki',   country: 'USA',     sponsor: 'Dynamic Discs',  pdgaRating: '1050', loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'MPO', ranking: '#3',  name: 'Calvin Heimburg', country: 'USA',     sponsor: 'Innova',         pdgaRating: '1049', loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'MPO', ranking: '#4',  name: 'Isaac Robinson',  country: 'USA',     sponsor: 'Prodigy',        pdgaRating: '1048', loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'MPO', ranking: '#7',  name: 'Matthew Orum',    country: 'USA',     sponsor: 'Westside Discs', pdgaRating: '1030', loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'MPO', ranking: '#9',  name: 'Niklas Anttila',  country: 'Finland', sponsor: 'Discmania',      pdgaRating: '1047', loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'MPO', ranking: '#10', name: 'Chris Dickerson', country: 'USA',     sponsor: 'Discraft',       pdgaRating: '1038', loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'MPO', ranking: '#12', name: 'Ezra Robinson',   country: 'USA',     sponsor: 'Prodigy',        pdgaRating: '1036', loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'FPO', ranking: '#1',  name: 'Kristin Tattar',  country: 'Estonia', sponsor: 'Latitude 64°',   pdgaRating: '1000', loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'FPO', ranking: '#2',  name: 'Evelina Salonen', country: 'Finland', sponsor: 'Innova',         pdgaRating: '981',  loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'FPO', ranking: '#3',  name: 'Ohn Scoggins',    country: 'USA',     sponsor: 'Innova',         pdgaRating: '986',  loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'FPO', ranking: '#4',  name: 'Missy Gannon',    country: 'USA',     sponsor: 'Discraft',       pdgaRating: '987',  loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'FPO', ranking: '#5',  name: 'Holyn Handley',   country: 'USA',     sponsor: 'Discraft',       pdgaRating: '987',  loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'FPO', ranking: '#6',  name: 'Kat Mertsch',     country: 'USA',     sponsor: 'Innova',         pdgaRating: '966',  loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'FPO', ranking: '#8',  name: 'Ella Hansen',     country: 'Denmark', sponsor: 'Discmania',      pdgaRating: '970',  loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'FPO', ranking: '#9',  name: 'Hailey King',     country: 'USA',     sponsor: 'Innova',         pdgaRating: '975',  loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'FPO', ranking: '#10', name: 'Heidi Laine',     country: 'Finland', sponsor: 'Clash Discs',    pdgaRating: '959',  loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'FPO', ranking: '#11', name: 'Paige Pierce',    country: 'USA',     sponsor: 'Discraft',       pdgaRating: '972',  loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'FPO', ranking: '#12', name: 'Natalie Ryan',    country: 'USA',     sponsor: 'Neptune Discs',  pdgaRating: '960',  loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
		{ division: 'FPO', ranking: '#13', name: 'Henna Blomroos',  country: 'Finland', sponsor: 'Innova',         pdgaRating: '975',  loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' },
	];

	const saved = (data.saved?.players as Player[]) ?? [];
	let players: Player[] = DEFAULTS.map(d => {
		const s = saved.find(p => p.division === d.division && p.ranking === d.ranking);
		return s ? { ...d, ...s } : { ...d };
	});

	const steps = ['MPO (8 players)', 'FPO (12 players)', 'Review'];
	let step = 0;

	$: signed = players.filter(p => p.loiStatus === 'signed').length;
	$: withPhoto = players.filter(p => p.photoUrl).length;

	const inputClass = 'w-full rounded-md border border-white/15 bg-navy-800/50 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50';
</script>

<svelte:head><title>Player Commitments — Content Editor</title></svelte:head>

<div class="max-w-3xl space-y-6">
	<div>
		<a href="/admin/content" class="text-xs text-white/30 hover:text-white/60 transition-colors">← Content Editor</a>
		<h1 class="text-2xl font-black text-white mt-1">Player Commitments</h1>
		<p class="text-sm text-white/50 mt-1">All 20 players are pre-populated. Add photo URLs and LOI doc IDs as they become available.</p>
	</div>

	{#if form?.success}
		<div class="rounded-md bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400 flex items-center gap-2">
			<CheckCircle2 class="h-4 w-4 shrink-0" /> Saved successfully.
		</div>
	{/if}
	{#if form?.error}
		<div class="rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">{form.error}</div>
	{/if}

	<div class="flex items-center gap-6 rounded-xl border border-white/10 bg-navy-800/40 px-5 py-3">
		<div class="text-center">
			<div class="text-xl font-black text-white">20</div>
			<div class="text-xs text-white/30">Total</div>
		</div>
		<div class="h-8 w-px bg-white/10"></div>
		<div class="text-center">
			<div class="text-xl font-black text-green-400">{signed}</div>
			<div class="text-xs text-white/30">LOI Signed</div>
		</div>
		<div class="h-8 w-px bg-white/10"></div>
		<div class="text-center">
			<div class="text-xl font-black text-yellow-400">{withPhoto}</div>
			<div class="text-xs text-white/30">Photos Added</div>
		</div>
		<div class="h-8 w-px bg-white/10"></div>
		<div class="text-center">
			<div class="text-xl font-black text-white/30">{20 - withPhoto}</div>
			<div class="text-xs text-white/30">Photos Needed</div>
		</div>
	</div>

	<div class="flex gap-1 border-b border-white/10">
		{#each steps as label, i}
			<button type="button" on:click={() => step = i}
				class="px-4 py-2 text-sm font-medium rounded-t-md transition-colors {step === i ? 'bg-navy-700/80 text-white border border-b-0 border-white/15' : 'text-white/40 hover:text-white/70'}">
				{i + 1}. {label}
			</button>
		{/each}
	</div>

	<form method="POST" action="?/save" use:enhance class="space-y-4">

		{#each players as player, i}
			{#if (step === 0 && player.division !== 'MPO') || (step === 1 && player.division !== 'FPO') || step === 2}
				<input type="hidden" name="player_{i}_division"   value={player.division} />
				<input type="hidden" name="player_{i}_ranking"    value={player.ranking} />
				<input type="hidden" name="player_{i}_name"       value={player.name} />
				<input type="hidden" name="player_{i}_country"    value={player.country} />
				<input type="hidden" name="player_{i}_sponsor"    value={player.sponsor} />
				<input type="hidden" name="player_{i}_pdgaRating" value={player.pdgaRating} />
				<input type="hidden" name="player_{i}_loiStatus"  value={player.loiStatus} />
				<input type="hidden" name="player_{i}_photoUrl"   value={player.photoUrl} />
				<input type="hidden" name="player_{i}_docId"      value={player.docId} />
				<input type="hidden" name="player_{i}_bioDocId"   value={player.bioDocId} />
			{/if}
		{/each}

		{#if step === 0 || step === 1}
			{@const divFilter = step === 0 ? 'MPO' : 'FPO'}
			<div class="rounded-xl border border-fli-blue-700/30 bg-fli-blue-900/15 p-4 flex items-start gap-3">
				<Info class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
				<p class="text-xs text-white/55 leading-relaxed">
					Names, countries and sponsors are pre-filled. Paste a <strong class="text-white/70">direct image URL</strong> for the photo — a preview will appear inline. Add the PocketBase document ID for the LOI PDF once uploaded.
				</p>
			</div>

			{#each players as player, i}
				{#if player.division === divFilter}
					<div class="rounded-xl border border-white/10 bg-navy-700/50 p-4 space-y-3">
						<div class="flex items-center gap-2">
							<div class="h-7 w-7 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-xs font-black text-white/50 shrink-0">{player.ranking}</div>
							<span class="text-sm font-semibold text-white">{player.name}</span>
							<span class="text-xs text-white/30">{player.country} · {player.sponsor}</span>
							{#if player.loiStatus === 'signed'}<span class="ml-auto text-xs text-green-400 font-medium">LOI Signed</span>{/if}
						</div>
						<div class="grid grid-cols-2 gap-3">
							<div class="space-y-1 col-span-2">
								<label class="block text-xs font-medium text-white/50">Photo URL <span class="text-white/25 font-normal">(direct image link)</span></label>
								<div class="flex gap-2 items-center">
									<input name="player_{i}_photoUrl" bind:value={player.photoUrl} type="url" placeholder="https://…/photo.jpg" class={inputClass} />
									{#if player.photoUrl}
										<img src={player.photoUrl} alt={player.name} class="h-10 w-10 rounded-full object-cover border border-white/20 shrink-0" />
									{:else}
										<div class="h-10 w-10 rounded-full bg-white/5 border border-dashed border-white/15 shrink-0"></div>
									{/if}
								</div>
							</div>
							<div class="space-y-1">
								<label class="block text-xs font-medium text-white/50">PDGA Rating</label>
								<input name="player_{i}_pdgaRating" bind:value={player.pdgaRating} type="text" placeholder="1050" class={inputClass} />
							</div>
							<div class="space-y-1">
								<label class="block text-xs font-medium text-white/50">LOI Status</label>
								<select name="player_{i}_loiStatus" bind:value={player.loiStatus} class={inputClass}>
									<option value="pending">Pending</option>
									<option value="signed">Signed</option>
								</select>
							</div>
							<div class="space-y-1">
								<label class="block text-xs font-medium text-white/50">LOI Doc ID</label>
								<input name="player_{i}_docId" bind:value={player.docId} type="text" placeholder="PocketBase record ID" class={inputClass} />
							</div>
							<div class="space-y-1">
								<label class="block text-xs font-medium text-white/50">Bio Doc ID</label>
								<input name="player_{i}_bioDocId" bind:value={player.bioDocId} type="text" placeholder="PocketBase record ID" class={inputClass} />
							</div>
						</div>
						<input type="hidden" name="player_{i}_division" value={player.division} />
						<input type="hidden" name="player_{i}_ranking"  value={player.ranking} />
						<input type="hidden" name="player_{i}_name"     value={player.name} />
						<input type="hidden" name="player_{i}_country"  value={player.country} />
						<input type="hidden" name="player_{i}_sponsor"  value={player.sponsor} />
					</div>
				{/if}
			{/each}

		{:else}
			<!-- Review -->
			<div class="space-y-4">
				{#each ['MPO', 'FPO'] as div}
					<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5">
						<h3 class="text-sm font-bold text-white mb-3">{div}</h3>
						<div class="space-y-1">
							{#each players.filter(p => p.division === div) as p}
								<div class="flex items-center gap-3 text-xs py-1.5 border-b border-white/5">
									{#if p.photoUrl}
										<img src={p.photoUrl} alt={p.name} class="h-7 w-7 rounded-full object-cover border border-white/20 shrink-0" />
									{:else}
										<div class="h-7 w-7 rounded-full bg-white/8 border border-dashed border-white/15 shrink-0"></div>
									{/if}
									<span class="text-white/40 w-8 shrink-0">{p.ranking}</span>
									<span class="text-white font-medium">{p.name}</span>
									<span class="text-white/30">{p.country}</span>
									<span class="ml-auto flex items-center gap-2">
										{#if p.photoUrl}<span class="text-yellow-400">Photo ✓</span>{:else}<span class="text-white/20">No photo</span>{/if}
										{#if p.loiStatus === 'signed'}<span class="text-green-400">LOI ✓</span>{/if}
									</span>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
			<p class="text-xs text-white/30">Saving will immediately update the Player Commitments page visible to investors.</p>
		{/if}

		<div class="flex items-center justify-between pt-4 border-t border-white/10">
			<button type="button" on:click={() => step = Math.max(0, step - 1)} disabled={step === 0}
				class="rounded-md border border-white/15 px-4 py-2 text-sm text-white/50 hover:text-white hover:border-white/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">← Previous</button>
			<span class="text-xs text-white/25">Step {step + 1} of {steps.length}</span>
			{#if step < steps.length - 1}
				<button type="button" on:click={() => step = step + 1} class="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition-colors">Next →</button>
			{:else}
				<button type="submit" class="rounded-md bg-yellow-500 px-5 py-2 text-sm font-semibold text-navy-950 hover:bg-yellow-400 transition-colors">Save & Publish</button>
			{/if}
		</div>
	</form>
</div>
