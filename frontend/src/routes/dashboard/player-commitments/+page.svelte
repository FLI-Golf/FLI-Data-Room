<script lang="ts">
	import { ExternalLink, CheckCircle2, Clock, Globe } from 'lucide-svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	// Real player data from the FLI committed roster
	const ROSTER = [
		// MPO (Male Professional Open)
		{ name: 'Gannon Buhr',     division: 'MPO', ranking: '#1',  country: 'USA',     sponsor: 'Discmania',      pdgaRating: '1061', loiStatus: 'signed' },
		{ name: 'Ricky Wysocki',   division: 'MPO', ranking: '#2',  country: 'USA',     sponsor: 'Dynamic Discs',  pdgaRating: '1050', loiStatus: 'signed' },
		{ name: 'Calvin Heimburg', division: 'MPO', ranking: '#3',  country: 'USA',     sponsor: 'Innova',         pdgaRating: '1049', loiStatus: 'signed' },
		{ name: 'Isaac Robinson',  division: 'MPO', ranking: '#4',  country: 'USA',     sponsor: 'Prodigy',        pdgaRating: '1048', loiStatus: 'signed' },
		{ name: 'Matthew Orum',    division: 'MPO', ranking: '#7',  country: 'USA',     sponsor: 'Westside Discs', pdgaRating: '1030', loiStatus: 'signed' },
		{ name: 'Niklas Anttila',  division: 'MPO', ranking: '#9',  country: 'Finland', sponsor: 'Discmania',      pdgaRating: '1047', loiStatus: 'signed' },
		{ name: 'Chris Dickerson', division: 'MPO', ranking: '#10', country: 'USA',     sponsor: 'Discraft',       pdgaRating: '1038', loiStatus: 'signed' },
		{ name: 'Ezra Robinson',   division: 'MPO', ranking: '#12', country: 'USA',     sponsor: 'Prodigy',        pdgaRating: '1036', loiStatus: 'signed' },
		// FPO (Female Professional Open)
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

	// Merge with any admin-entered overrides (keyed by division+ranking)
	type PlayerOverride = { division: string; ranking: string; loiStatus: string; photoUrl: string; docId: string; bioDocId: string };
	const savedPlayers = (data.content?.players as PlayerOverride[]) ?? [];

	$: players = ROSTER.map(r => {
		const override = savedPlayers.find(o => o.division === r.division && o.ranking === r.ranking);
		return {
			...r,
			pdgaRating: override?.pdgaRating || r.pdgaRating,
			loiStatus:  override?.loiStatus  || r.loiStatus,
			photoUrl:   override?.photoUrl   || '',
			docId:      override?.docId      || '',
			bioDocId:   override?.bioDocId   || '',
		};
	});

	$: signed  = players.filter(p => p.loiStatus === 'signed').length;
	$: pending = players.filter(p => p.loiStatus === 'pending').length;
</script>

<svelte:head>
	<title>Player Commitments — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-4xl space-y-10">
	<div>
		<h1 class="text-3xl font-black text-white">Player Commitments</h1>
		<p class="mt-1 text-white/50">Letters of Intent and profiles for all 20 committed FLI Golf League players — 8 MPO and 12 FPO.</p>
	</div>

	<!-- Summary stats -->
	<div class="grid grid-cols-3 gap-4">
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 text-center">
			<div class="text-3xl font-black text-white">20</div>
			<div class="text-xs text-white/40 mt-1 uppercase tracking-wide">Total Roster</div>
		</div>
		<div class="rounded-xl border border-green-500/20 bg-green-500/8 p-5 text-center">
			<div class="text-3xl font-black text-green-400">{signed}</div>
			<div class="text-xs text-white/40 mt-1 uppercase tracking-wide">LOIs Signed</div>
		</div>
		<div class="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
			<div class="text-3xl font-black text-white/40">{pending}</div>
			<div class="text-xs text-white/40 mt-1 uppercase tracking-wide">Pending Upload</div>
		</div>
	</div>

	<!-- Player grid -->
	<div class="space-y-6">
		<!-- MPO -->
		<div>
			<div class="flex items-center gap-3 mb-3">
				<h2 class="text-lg font-bold text-white">MPO</h2>
				<span class="text-xs text-white/30 uppercase tracking-wide">Male Professional Open</span>
				<span class="ml-auto text-xs text-white/30">{players.filter(p => p.division === 'MPO').length} players</span>
			</div>
			<div class="grid sm:grid-cols-2 gap-3">
				{#each players.filter(p => p.division === 'MPO') as player}
					<div class="rounded-xl border border-white/10 bg-navy-700/50 p-4 flex items-center justify-between gap-3">
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
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- FPO -->
		<div>
			<div class="flex items-center gap-3 mb-3">
				<h2 class="text-lg font-bold text-white">FPO</h2>
				<span class="text-xs text-white/30 uppercase tracking-wide">Female Professional Open</span>
				<span class="ml-auto text-xs text-white/30">{players.filter(p => p.division === 'FPO').length} players</span>
			</div>
			<div class="grid sm:grid-cols-2 gap-3">
				{#each players.filter(p => p.division === 'FPO') as player}
					<div class="rounded-xl border border-white/10 bg-navy-700/50 p-4 flex items-center justify-between gap-3">
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
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<p class="text-xs text-white/20">All player LOIs and biographical information are confidential and subject to the NDA you accepted.</p>
</div>
