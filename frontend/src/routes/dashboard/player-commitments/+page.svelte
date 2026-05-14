<script lang="ts">
	import { enhance } from '$app/forms';
	import { ExternalLink, CheckCircle2, Clock, Globe, Pencil, X } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	const isAdmin = data.user?.role === 'admin';

	// Real player data from the FLI committed roster
	const ROSTER = [
		// MPO
		{ name: 'Gannon Buhr',     division: 'MPO', ranking: '#1',  country: 'USA',     sponsor: 'Discmania',      pdgaRating: '1061', loiStatus: 'signed' },
		{ name: 'Ricky Wysocki',   division: 'MPO', ranking: '#2',  country: 'USA',     sponsor: 'Dynamic Discs',  pdgaRating: '1050', loiStatus: 'signed' },
		{ name: 'Calvin Heimburg', division: 'MPO', ranking: '#3',  country: 'USA',     sponsor: 'Innova',         pdgaRating: '1049', loiStatus: 'signed' },
		{ name: 'Isaac Robinson',  division: 'MPO', ranking: '#4',  country: 'USA',     sponsor: 'Prodigy',        pdgaRating: '1048', loiStatus: 'signed' },
		{ name: 'Matthew Orum',    division: 'MPO', ranking: '#7',  country: 'USA',     sponsor: 'Westside Discs', pdgaRating: '1030', loiStatus: 'signed' },
		{ name: 'Niklas Anttila',  division: 'MPO', ranking: '#9',  country: 'Finland', sponsor: 'Discmania',      pdgaRating: '1047', loiStatus: 'signed' },
		{ name: 'Chris Dickerson', division: 'MPO', ranking: '#10', country: 'USA',     sponsor: 'Discraft',       pdgaRating: '1038', loiStatus: 'signed' },
		{ name: 'Ezra Robinson',   division: 'MPO', ranking: '#12', country: 'USA',     sponsor: 'Prodigy',        pdgaRating: '1036', loiStatus: 'signed' },
		// FPO
		{ name: 'Kristin Tattar',  division: 'FPO', ranking: '#1',  country: 'Estonia', sponsor: 'Latitude 64°',   pdgaRating: '1000', loiStatus: 'signed' },
		{ name: 'Evelina Salonen', division: 'FPO', ranking: '#2',  country: 'Finland', sponsor: 'Innova',         pdgaRating: '981',  loiStatus: 'signed' },
		{ name: 'Ohn Scoggins',    division: 'FPO', ranking: '#3',  country: 'USA',     sponsor: 'Innova',         pdgaRating: '986',  loiStatus: 'signed' },
		{ name: 'Missy Gannon',    division: 'FPO', ranking: '#4',  country: 'USA',     sponsor: 'Discraft',       pdgaRating: '987',  loiStatus: 'signed' },
		{ name: 'Holyn Handley',   division: 'FPO', ranking: '#5',  country: 'USA',     sponsor: 'Discraft',       pdgaRating: '987',  loiStatus: 'signed' },
		{ name: 'Kat Mertsch',     division: 'FPO', ranking: '#6',  country: 'USA',     sponsor: 'Innova',         pdgaRating: '966',  loiStatus: 'signed' },
		{ name: 'Ella Hansen',     division: 'FPO', ranking: '#8',  country: 'Denmark', sponsor: 'Discmania',      pdgaRating: '970',  loiStatus: 'signed' },
		{ name: 'Hailey King',     division: 'FPO', ranking: '#9',  country: 'USA',     sponsor: 'Innova',         pdgaRating: '975',  loiStatus: 'signed' },
		{ name: 'Heidi Laine',     division: 'FPO', ranking: '#10', country: 'Finland', sponsor: 'Clash Discs',    pdgaRating: '959',  loiStatus: 'signed' },
		{ name: 'Paige Pierce',    division: 'FPO', ranking: '#11', country: 'USA',     sponsor: 'Discraft',       pdgaRating: '972',  loiStatus: 'signed' },
		{ name: 'Natalie Ryan',    division: 'FPO', ranking: '#12', country: 'USA',     sponsor: 'Neptune Discs',  pdgaRating: '960',  loiStatus: 'signed' },
		{ name: 'Henna Blomroos',  division: 'FPO', ranking: '#13', country: 'Finland', sponsor: 'Innova',         pdgaRating: '975',  loiStatus: 'signed' },
	];

	type PlayerOverride = { division: string; ranking: string; name: string; country: string; sponsor: string; pdgaRating: string; loiStatus: string; photoUrl: string; docId: string; bioDocId: string };
	const savedPlayers = (data.content?.players as PlayerOverride[]) ?? [];

	$: players = ROSTER.map(r => {
		const override = savedPlayers.find(o => o.division === r.division && o.ranking === r.ranking);
		return {
			...r,
			name:       override?.name       || r.name,
			country:    override?.country    || r.country,
			sponsor:    override?.sponsor    || r.sponsor,
			pdgaRating: override?.pdgaRating || r.pdgaRating,
			loiStatus:  override?.loiStatus  || r.loiStatus,
			photoUrl:   override?.photoUrl   || '',
			docId:      override?.docId      || '',
			bioDocId:   override?.bioDocId   || '',
		};
	});

	$: signed  = players.filter(p => p.loiStatus === 'signed').length;
	$: pending = players.filter(p => p.loiStatus === 'pending').length;

	// Track which card is open for editing (key = division+ranking)
	let editingKey: string | null = null;
	function editKey(p: { division: string; ranking: string }) { return `${p.division}${p.ranking}`; }
	function openEdit(p: { division: string; ranking: string }) { editingKey = editKey(p); }
	function closeEdit() { editingKey = null; }

	// Local edit state — populated when opening a card
	let editDraft = { name: '', country: '', sponsor: '', pdgaRating: '', loiStatus: 'signed', photoUrl: '', docId: '', bioDocId: '' };

	function startEdit(player: typeof players[0]) {
		editDraft = {
			name:       player.name,
			country:    player.country,
			sponsor:    player.sponsor,
			pdgaRating: player.pdgaRating,
			loiStatus:  player.loiStatus,
			photoUrl:   player.photoUrl,
			docId:      player.docId,
			bioDocId:   player.bioDocId,
		};
		openEdit(player);
	}

	// Close edit panel after successful save
	$: if (form?.success) { editingKey = null; }

	const ic = 'w-full rounded-md border border-white/15 bg-navy-900/60 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50';
</script>

<svelte:head><title>Player Commitments — FLI Data Room</title></svelte:head>

<div class="space-y-8">
	<div>
		<h1 class="text-2xl font-black text-white">Committed Pros</h1>
		<p class="mt-1 text-white/50">Letters of Intent and profiles for all 20 committed FLI Golf League players — 8 MPO and 12 FPO.</p>
	</div>

	{#if form?.success}
		<div class="rounded-md bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400 flex items-center gap-2">
			<CheckCircle2 class="h-4 w-4 shrink-0" /> Player updated successfully.
		</div>
	{/if}
	{#if form?.error}
		<div class="rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">{form.error}</div>
	{/if}

	<!-- Summary stats -->
	<div class="grid grid-cols-3 gap-4">
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 text-center">
			<div class="text-3xl font-black text-white">20</div>
			<div class="text-xs text-white/40 mt-1 uppercase tracking-wide">Total Roster</div>
		</div>
		<div class="rounded-xl border border-green-500/20 bg-green-500/5 p-5 text-center">
			<div class="text-3xl font-black text-green-400">{signed}</div>
			<div class="text-xs text-white/40 mt-1 uppercase tracking-wide">LOI Signed</div>
		</div>
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 text-center">
			<div class="text-3xl font-black text-white/30">{pending}</div>
			<div class="text-xs text-white/40 mt-1 uppercase tracking-wide">Pending</div>
		</div>
	</div>

	<!-- Player grid -->
	<div class="space-y-6">
		{#each ['MPO', 'FPO'] as div}
			<div>
				<div class="flex items-center gap-3 mb-3">
					<h2 class="text-lg font-bold text-white">{div}</h2>
					<span class="text-xs text-white/30 uppercase tracking-wide">{div === 'MPO' ? 'Male' : 'Female'} Professional Open</span>
					<span class="ml-auto text-xs text-white/30">{players.filter(p => p.division === div).length} players</span>
				</div>
				<div class="grid sm:grid-cols-2 gap-3">
					{#each players.filter(p => p.division === div) as player}
						{@const isEditing = editingKey === editKey(player)}
						<div class="rounded-xl border {isEditing ? 'border-yellow-500/40 bg-navy-700/80' : 'border-white/10 bg-navy-700/50'} overflow-hidden transition-colors">

							<!-- Card row -->
							<div class="p-4 flex items-center justify-between gap-3">
								<div class="flex items-center gap-3 min-w-0">
									{#if player.photoUrl}
										<img src={player.photoUrl} alt={player.name} class="h-10 w-10 rounded-full object-cover border border-white/20 shrink-0" />
									{:else}
										<div class="h-10 w-10 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-xs font-black text-white/40 shrink-0">
											{player.ranking}
										</div>
									{/if}
									<div class="min-w-0">
										<div class="text-sm font-semibold text-white truncate">{player.name}</div>
										<div class="flex items-center gap-1.5 mt-0.5">
											<Globe class="h-3 w-3 text-white/20" />
											<span class="text-xs text-white/40">{player.country}</span>
											{#if player.pdgaRating}
												<span class="text-white/15">·</span>
												<span class="text-xs text-white/30">PDGA {player.pdgaRating}</span>
											{/if}
										</div>
									</div>
								</div>
								<div class="flex items-center gap-2 shrink-0">
									{#if player.loiStatus === 'signed'}
										<span class="flex items-center gap-1 rounded-full bg-green-500/15 px-2 py-0.5 text-xs font-medium text-green-400">
											<CheckCircle2 class="h-3 w-3" /> LOI
										</span>
										{#if player.bioDocId}
											<a href="/api/documents/{player.bioDocId}" target="_blank" class="flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-xs text-white/60 hover:text-white transition-colors">
												<ExternalLink class="h-3 w-3" /> Bio
											</a>
										{/if}
									{:else}
										<span class="flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/20">
											<Clock class="h-3 w-3" /> Pending
										</span>
									{/if}
									{#if isAdmin}
										<button type="button"
											on:click={() => isEditing ? closeEdit() : startEdit(player)}
											class="flex items-center justify-center h-7 w-7 rounded-md {isEditing ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/8 text-white/40 hover:text-white hover:bg-white/15'} transition-colors"
											title="Edit player">
											{#if isEditing}<X class="h-3.5 w-3.5" />{:else}<Pencil class="h-3.5 w-3.5" />{/if}
										</button>
									{/if}
								</div>
							</div>

							<!-- Inline edit panel -->
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
											<label class="block text-xs font-medium text-white/50">Photo URL</label>
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
		{/each}
	</div>
</div>
