<script lang="ts">
	import { enhance } from '$app/forms';
	import { CheckCircle2, Pencil, X } from 'lucide-svelte';
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

	$: signed    = players.filter(p => p.loiStatus === 'signed').length;
	$: withPhoto = players.filter(p => p.photoUrl).length;

	// Inline edit state
	let editingKey: string | null = null;
	let editDraft: Player = { ...DEFAULTS[0] };

	function editKey(p: Player) { return `${p.division}${p.ranking}`; }

	function openEdit(player: Player) {
		editDraft = { ...player };
		editingKey = editKey(player);
	}
	function closeEdit() { editingKey = null; }

	// Close panel and refresh player list after successful save
	$: if (form?.success && form?.updated) {
		const u = form.updated as Player;
		players = players.map(p =>
			p.division === u.division && p.ranking === u.ranking ? { ...p, ...u } : p
		);
		editingKey = null;
	}

	const ic = 'w-full rounded-md border border-white/15 bg-navy-900/60 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50';
</script>

<svelte:head><title>Player Commitments — Content Editor</title></svelte:head>

<div class="max-w-3xl space-y-6">
	<div>
		<a href="/admin/content" class="text-xs text-white/30 hover:text-white/60 transition-colors">← Content Editor</a>
		<h1 class="text-2xl font-black text-white mt-1">Player Commitments</h1>
		<p class="text-sm text-white/50 mt-1">Click the pencil icon on any player to edit their details inline.</p>
	</div>

	{#if form?.success}
		<div class="rounded-md bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400 flex items-center gap-2">
			<CheckCircle2 class="h-4 w-4 shrink-0" /> Saved successfully.
		</div>
	{/if}
	{#if form?.error}
		<div class="rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">{form.error}</div>
	{/if}

	<!-- Stats bar -->
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

	<!-- MPO -->
	<div class="space-y-2">
		<div class="flex items-center gap-2 mb-3">
			<h2 class="text-sm font-bold text-white">MPO</h2>
			<span class="text-xs text-white/30">Male Professional Open</span>
		</div>
		{#each players.filter(p => p.division === 'MPO') as player}
			{@const isEditing = editingKey === editKey(player)}
			<div class="rounded-xl border {isEditing ? 'border-yellow-500/40' : 'border-white/10'} bg-navy-700/50 overflow-hidden transition-colors">
				<!-- Row -->
				<div class="px-4 py-3 flex items-center gap-3">
					{#if player.photoUrl}
						<img src={player.photoUrl} alt={player.name} class="h-9 w-9 rounded-full object-cover border border-white/20 shrink-0" />
					{:else}
						<div class="h-9 w-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-xs font-black text-white/40 shrink-0">{player.ranking}</div>
					{/if}
					<div class="flex-1 min-w-0">
						<div class="text-sm font-semibold text-white">{player.name}</div>
						<div class="text-xs text-white/35">{player.country} · {player.sponsor} · PDGA {player.pdgaRating}</div>
					</div>
					{#if player.loiStatus === 'signed'}
						<span class="text-xs text-green-400 font-medium shrink-0">LOI ✓</span>
					{/if}
					{#if player.photoUrl}
						<span class="text-xs text-yellow-400 shrink-0">Photo ✓</span>
					{/if}
					<button type="button" on:click={() => isEditing ? closeEdit() : openEdit(player)}
						class="flex items-center justify-center h-7 w-7 rounded-md {isEditing ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/8 text-white/40 hover:text-white hover:bg-white/15'} transition-colors shrink-0"
						title="Edit player">
						{#if isEditing}<X class="h-3.5 w-3.5" />{:else}<Pencil class="h-3.5 w-3.5" />{/if}
					</button>
				</div>

				<!-- Inline edit form -->
				{#if isEditing}
					<form method="POST" action="?/updatePlayer" use:enhance class="border-t border-yellow-500/20 bg-navy-900/40 p-4 space-y-3">
						<input type="hidden" name="division" value={player.division} />
						<input type="hidden" name="ranking"  value={player.ranking} />
						<div class="grid grid-cols-2 gap-3">
							<div class="space-y-1 col-span-2">
								<label class="block text-xs font-medium text-white/50">Name</label>
								<input name="name" bind:value={editDraft.name} type="text" class={ic} />
							</div>
							<div class="space-y-1">
								<label class="block text-xs font-medium text-white/50">Country</label>
								<input name="country" bind:value={editDraft.country} type="text" class={ic} />
							</div>
							<div class="space-y-1">
								<label class="block text-xs font-medium text-white/50">Sponsor</label>
								<input name="sponsor" bind:value={editDraft.sponsor} type="text" class={ic} />
							</div>
							<div class="space-y-1">
								<label class="block text-xs font-medium text-white/50">PDGA Rating</label>
								<input name="pdgaRating" bind:value={editDraft.pdgaRating} type="text" class={ic} />
							</div>
							<div class="space-y-1">
								<label class="block text-xs font-medium text-white/50">LOI Status</label>
								<select name="loiStatus" bind:value={editDraft.loiStatus} class={ic}>
									<option value="signed">Signed</option>
									<option value="pending">Pending</option>
								</select>
							</div>
							<div class="space-y-1 col-span-2">
								<label class="block text-xs font-medium text-white/50">Photo URL <span class="text-white/25 font-normal">(direct image link)</span></label>
								<div class="flex gap-2 items-center">
									<input name="photoUrl" bind:value={editDraft.photoUrl} type="url" placeholder="https://…/photo.jpg" class={ic} />
									{#if editDraft.photoUrl}
										<img src={editDraft.photoUrl} alt="" class="h-9 w-9 rounded-full object-cover border border-white/20 shrink-0" />
									{:else}
										<div class="h-9 w-9 rounded-full bg-white/5 border border-dashed border-white/15 shrink-0"></div>
									{/if}
								</div>
							</div>
							<div class="space-y-1">
								<label class="block text-xs font-medium text-white/50">LOI Doc ID</label>
								<input name="docId" bind:value={editDraft.docId} type="text" placeholder="PocketBase record ID" class={ic} />
							</div>
							<div class="space-y-1">
								<label class="block text-xs font-medium text-white/50">Bio Doc ID</label>
								<input name="bioDocId" bind:value={editDraft.bioDocId} type="text" placeholder="PocketBase record ID" class={ic} />
							</div>
						</div>
						<div class="flex items-center justify-end gap-2 pt-1">
							<button type="button" on:click={closeEdit}
								class="rounded-md border border-white/15 px-3 py-1.5 text-xs text-white/50 hover:text-white transition-colors">
								Cancel
							</button>
							<button type="submit"
								class="rounded-md bg-yellow-500 px-4 py-1.5 text-xs font-semibold text-navy-950 hover:bg-yellow-400 transition-colors">
								Save
							</button>
						</div>
					</form>
				{/if}
			</div>
		{/each}
	</div>

	<!-- FPO -->
	<div class="space-y-2">
		<div class="flex items-center gap-2 mb-3">
			<h2 class="text-sm font-bold text-white">FPO</h2>
			<span class="text-xs text-white/30">Female Professional Open</span>
		</div>
		{#each players.filter(p => p.division === 'FPO') as player}
			{@const isEditing = editingKey === editKey(player)}
			<div class="rounded-xl border {isEditing ? 'border-yellow-500/40' : 'border-white/10'} bg-navy-700/50 overflow-hidden transition-colors">
				<!-- Row -->
				<div class="px-4 py-3 flex items-center gap-3">
					{#if player.photoUrl}
						<img src={player.photoUrl} alt={player.name} class="h-9 w-9 rounded-full object-cover border border-white/20 shrink-0" />
					{:else}
						<div class="h-9 w-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-xs font-black text-white/40 shrink-0">{player.ranking}</div>
					{/if}
					<div class="flex-1 min-w-0">
						<div class="text-sm font-semibold text-white">{player.name}</div>
						<div class="text-xs text-white/35">{player.country} · {player.sponsor} · PDGA {player.pdgaRating}</div>
					</div>
					{#if player.loiStatus === 'signed'}
						<span class="text-xs text-green-400 font-medium shrink-0">LOI ✓</span>
					{/if}
					{#if player.photoUrl}
						<span class="text-xs text-yellow-400 shrink-0">Photo ✓</span>
					{/if}
					<button type="button" on:click={() => isEditing ? closeEdit() : openEdit(player)}
						class="flex items-center justify-center h-7 w-7 rounded-md {isEditing ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/8 text-white/40 hover:text-white hover:bg-white/15'} transition-colors shrink-0"
						title="Edit player">
						{#if isEditing}<X class="h-3.5 w-3.5" />{:else}<Pencil class="h-3.5 w-3.5" />{/if}
					</button>
				</div>

				<!-- Inline edit form -->
				{#if isEditing}
					<form method="POST" action="?/updatePlayer" use:enhance class="border-t border-yellow-500/20 bg-navy-900/40 p-4 space-y-3">
						<input type="hidden" name="division" value={player.division} />
						<input type="hidden" name="ranking"  value={player.ranking} />
						<div class="grid grid-cols-2 gap-3">
							<div class="space-y-1 col-span-2">
								<label class="block text-xs font-medium text-white/50">Name</label>
								<input name="name" bind:value={editDraft.name} type="text" class={ic} />
							</div>
							<div class="space-y-1">
								<label class="block text-xs font-medium text-white/50">Country</label>
								<input name="country" bind:value={editDraft.country} type="text" class={ic} />
							</div>
							<div class="space-y-1">
								<label class="block text-xs font-medium text-white/50">Sponsor</label>
								<input name="sponsor" bind:value={editDraft.sponsor} type="text" class={ic} />
							</div>
							<div class="space-y-1">
								<label class="block text-xs font-medium text-white/50">PDGA Rating</label>
								<input name="pdgaRating" bind:value={editDraft.pdgaRating} type="text" class={ic} />
							</div>
							<div class="space-y-1">
								<label class="block text-xs font-medium text-white/50">LOI Status</label>
								<select name="loiStatus" bind:value={editDraft.loiStatus} class={ic}>
									<option value="signed">Signed</option>
									<option value="pending">Pending</option>
								</select>
							</div>
							<div class="space-y-1 col-span-2">
								<label class="block text-xs font-medium text-white/50">Photo URL <span class="text-white/25 font-normal">(direct image link)</span></label>
								<div class="flex gap-2 items-center">
									<input name="photoUrl" bind:value={editDraft.photoUrl} type="url" placeholder="https://…/photo.jpg" class={ic} />
									{#if editDraft.photoUrl}
										<img src={editDraft.photoUrl} alt="" class="h-9 w-9 rounded-full object-cover border border-white/20 shrink-0" />
									{:else}
										<div class="h-9 w-9 rounded-full bg-white/5 border border-dashed border-white/15 shrink-0"></div>
									{/if}
								</div>
							</div>
							<div class="space-y-1">
								<label class="block text-xs font-medium text-white/50">LOI Doc ID</label>
								<input name="docId" bind:value={editDraft.docId} type="text" placeholder="PocketBase record ID" class={ic} />
							</div>
							<div class="space-y-1">
								<label class="block text-xs font-medium text-white/50">Bio Doc ID</label>
								<input name="bioDocId" bind:value={editDraft.bioDocId} type="text" placeholder="PocketBase record ID" class={ic} />
							</div>
						</div>
						<div class="flex items-center justify-end gap-2 pt-1">
							<button type="button" on:click={closeEdit}
								class="rounded-md border border-white/15 px-3 py-1.5 text-xs text-white/50 hover:text-white transition-colors">
								Cancel
							</button>
							<button type="submit"
								class="rounded-md bg-yellow-500 px-4 py-1.5 text-xs font-semibold text-navy-950 hover:bg-yellow-400 transition-colors">
								Save
							</button>
						</div>
					</form>
				{/if}
			</div>
		{/each}
	</div>
</div>
