<svelte:head>
	<title>Design — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-8">
	<div>
		<h1 class="text-3xl font-black text-white">Design</h1>
		<p class="mt-1 text-white/50">FLI Golf League visual assets and format design.</p>
	</div>

	<!-- Hole Breakdown Image -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 overflow-hidden">
		<img
			src="https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/gqo6zce9t5tulwr/p_6_agm7oc1zcx.png"
			alt="FGL Hole Breakdown — Format Design"
			class="w-full h-auto"
		/>
	</div>

	<!-- Info panels below image -->
	<div class="grid sm:grid-cols-3 gap-4">

		<!-- FGL Stadium Format -->
		<div class="rounded-xl border border-fli-blue-600/40 bg-navy-800/50 p-5">
			<h2 class="text-sm font-black text-white uppercase tracking-widest mb-4">FGL Stadium Format</h2>
			<ul class="space-y-2">
				{#each ['9 Holes', 'Par Range: 27–36', 'Distances: 200–400 ft', 'Designed for Viewers', 'Built for Competition'] as item}
					<li class="flex items-center gap-2 text-sm text-white/70">
						<span class="text-brand-400 font-bold">✓</span>
						{item}
					</li>
				{/each}
			</ul>
		</div>

		<!-- What Makes It Unique -->
		<div class="rounded-xl border border-white/15 bg-navy-800/50 p-5">
			<h2 class="text-sm font-black text-white uppercase tracking-widest mb-4">What Makes It Unique</h2>
			<div class="space-y-4">
				{#each [
					{ title: 'Built for Spectacle', body: 'Every hole is designed to be engaging for both fans in the stands and viewers at home.' },
					{ title: 'Strategic Obstacles', body: 'Obstacles create risk/reward decisions and force creative shot-making.' },
					{ title: 'Fast-Paced Action', body: 'Shorter hole lengths and visible baskets keep the energy high and the round moving.' }
				] as item}
					<div>
						<div class="text-xs font-bold text-brand-400 uppercase tracking-wide mb-0.5">{item.title}</div>
						<p class="text-xs text-white/50 leading-relaxed">{item.body}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- The FGL Difference -->
		<div class="rounded-xl border border-yellow-500/40 bg-navy-800/50 p-5 flex flex-col items-center justify-center text-center gap-4">
			<img
				src="https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/1zf32ato6zddp24/fgl_logo_cmyk_01_7s51ljmqp7.png"
				alt="FGL Logo"
				class="h-20 w-auto"
			/>
			<div>
				<h2 class="text-sm font-black text-white uppercase tracking-widest mb-2">The FGL Difference</h2>
				<p class="text-xl font-black text-yellow-400 leading-tight">FAIRWAYS.<br/>GREENS.<br/>LEGENDS.</p>
			</div>
		</div>

	</div>
</div>
