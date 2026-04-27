<script lang="ts">
	import type { PageData } from './$types';
	import { Youtube, Twitch, Twitter, Instagram, Users, Trophy, Star, TrendingUp, Shield, Zap, Globe, Tv, Music, Award, Crown, Rocket, Target, Flame, CheckCircle2, Film } from 'lucide-svelte';
	export let data: PageData;

	const categories = [
		{ label: 'Streaming / Creator', color: 'purple' },
		{ label: 'Comedy', color: 'yellow' },
		{ label: 'MLB', color: 'blue' },
		{ label: 'NFL', color: 'green' },
		{ label: 'MMA / UFC', color: 'red' },
		{ label: 'TV / Film', color: 'pink' },
		{ label: 'NHL / Olympics', color: 'cyan' },
		{ label: 'Music', color: 'orange' },
		{ label: 'Ent. Sports', color: 'brand' }
	];

	const roster = [
		// Streaming / Creator
		{ name: 'Kai Cenat', detail: '20M Twitch', category: 'Streaming / Creator' },
		{ name: 'Dude Perfect', detail: '62M YouTube', category: 'Streaming / Creator' },
		// Comedy
		{ name: 'Bert Kreischer', detail: '13.4M total', category: 'Comedy' },
		{ name: 'Tom Segura', detail: '~8M total', category: 'Comedy' },
		// MLB
		{ name: 'Dylan Cease', detail: 'MLB Blue Jays', category: 'MLB' },
		{ name: 'Seth Lugo', detail: 'MLB Royals', category: 'MLB' },
		{ name: 'Steven Matz', detail: 'MLB Pitcher', category: 'MLB' },
		{ name: 'Alan Busenitz', detail: 'MLB Pitcher', category: 'MLB' },
		// NFL
		{ name: 'Tedy Bruschi', detail: 'ESPN / Patriots', category: 'NFL' },
		{ name: 'Ryan Rehkow', detail: 'Bengals Punter', category: 'NFL' },
		{ name: "Jake Moody", detail: '49ers Kicker', category: 'NFL' },
		{ name: 'Jeff Ogden', detail: 'Former NFL WR', category: 'NFL' },
		{ name: "De'Anthony Thomas", detail: 'Former NFL WR', category: 'NFL' },
		{ name: 'George Kittle', detail: '49ers All-Pro · 3.2M followers', category: 'NFL' },
		// MMA / UFC
		{ name: 'Ben Askren', detail: 'UFC / Olympic', category: 'MMA / UFC' },
		{ name: 'Stephen Thompson', detail: 'UFC Welterweight', category: 'MMA / UFC' },
		// TV / Film
		{ name: 'Kristofer Hivju', detail: '3M Instagram', category: 'TV / Film' },
		{ name: 'Bill Nye', detail: 'Science Guy', category: 'TV / Film' },
		{ name: 'Andrew Zimmern', detail: 'Bizarre Foods', category: 'TV / Film' },
		{ name: 'Kurt Yaeger', detail: 'Sons of Anarchy', category: 'TV / Film' },
		{ name: 'Brad Pitt', detail: 'Tonight Show bit · Global megastar', category: 'TV / Film' },
		// NHL / Olympics
		{ name: 'M. Eyssimont', detail: 'Bruins NHL', category: 'NHL / Olympics' },
		{ name: 'Oskar Eriksson', detail: 'Olympic Gold', category: 'NHL / Olympics' },
		// Music
		{ name: 'Dennis Lyxzen', detail: 'Refused', category: 'Music' },
		{ name: 'Eric Friedman', detail: 'Creed / Tremonti', category: 'Music' },
		{ name: 'Scott Hansen', detail: 'Tycho', category: 'Music' },
		// Ent. Sports
		{ name: 'Brodie Smith', detail: '4M+ total', category: 'Ent. Sports' },
		{ name: 'Paul McBeth', detail: '6× World Champ', category: 'Ent. Sports' },
		{ name: "Dan 'Big Cat' Katz", detail: 'Barstool Sports', category: 'Ent. Sports' },
		{ name: 'Bubba Watson', detail: '2× Masters · PDGA #44745 · 3.8M followers', category: 'Ent. Sports' },
		{ name: 'Hafþór Björnsson', detail: 'The Mountain · Team Innova Iceland · 8.6M followers', category: 'Ent. Sports' },
		{ name: 'Jesse Cole', detail: 'Savannah Bananas', category: 'Ent. Sports' },
		{ name: 'Savannah Bananas', detail: '35M org. followers', category: 'Ent. Sports' },
		{ name: 'Jimmy Fallon', detail: 'Tonight Show · 100M+ reach', category: 'Ent. Sports' },
		{ name: 'Jason Day*', detail: 'PGA Tour', category: 'Ent. Sports' }
	];

	const colorMap: Record<string, string> = {
		purple: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
		yellow: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300',
		blue: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
		green: 'border-green-500/30 bg-green-500/10 text-green-300',
		red: 'border-red-500/30 bg-red-500/10 text-red-300',
		pink: 'border-pink-500/30 bg-pink-500/10 text-pink-300',
		cyan: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
		orange: 'border-orange-500/30 bg-orange-500/10 text-orange-300',
		brand: 'border-brand-500/30 bg-brand-500/10 text-brand-300'
	};

	function getCategoryColor(cat: string) {
		const found = categories.find((c) => c.label === cat);
		return found ? colorMap[found.color] : colorMap['brand'];
	}

	const activations = [
		{
			num: '01', icon: Trophy,
			title: 'Celebrity Pro-Am Events',
			body: 'Ben Askren already runs one annually. FLI creates the official branded structure: celebrity divisions, PDGA-sanctioned brackets, broadcast segments. Every celeb appearance becomes a media moment with a scoreboard.'
		},
		{
			num: '02', icon: Rocket,
			title: 'Banana Ball Blueprint',
			body: "Jesse Cole proved entertainment-first sports builds a $1B brand with 35M followers and $100M revenue. FLI applies the same model to disc golf — the sport already has the DNA. The celebrity network is the proof."
		},
		{
			num: '03', icon: Star,
			title: 'Signature Disc Lines & Merch',
			body: 'Bert Kreischer already has a Discraft deal. Bubba Watson built a course. FLI creates official league-licensed celebrity disc lines — each with a built-in social audience ready to buy.'
		},
		{
			num: '04', icon: Tv,
			title: 'Stadium Event Celebrity Cameos',
			body: "Kittle played disc golf in a Nashville auditorium. Brad Pitt did trick shots on NBC. FLI's stadium format is built exactly for this. Every event weekend has a celebrity exhibition round — broadcast and viral content gold."
		},
		{
			num: '05', icon: Film,
			title: 'Tonight Show / NBC Moments',
			body: "Jimmy Fallon's disc golf segment with Brad Pitt reached tens of millions on NBC primetime. FLI creates the recurring programming hook: a league that celebrities want to play in and shows want to feature."
		},
		{
			num: '06', icon: Target,
			title: 'Cross-Sport Fan Acquisition',
			body: "Kittle's 3M NFL fans don't know disc golf exists. Bubba's 3.8M golf fans don't either. Bananas' 35M followers have never seen a DGPT event. Each FLI activation is a zero-cost acquisition funnel into tickets, merchandise, and media rights."
		}
	];

	const spotlights = [
		{
			name: 'Bubba Watson',
			sub: '2× Masters · LIV Golf · Blue Wahoos owner',
			reach: '~3.8M followers · PDGA #44745',
			bullets: [
				'Active PDGA member — one of the only PGA Tour pros with a PDGA number',
				'Built the first disc golf course inside a pro baseball stadium (2020)',
				'"I\'m a bit of a disc golf nut" — named Jason Day as a fellow DG player',
				'Designed his stadium course with his kids — family sport connection'
			]
		},
		{
			name: 'Hafþór Björnsson',
			sub: "World's Strongest Man · 'The Mountain' GOT",
			reach: '~8.6M followers · Team Innova Iceland',
			bullets: [
				'Officially signed to Team Innova Iceland — largest disc golf ambassador ever',
				'Has been playing since 2014 — photographed with discs in Reykjavík',
				'GoT + strongman fanbases = two of the largest cult audiences on earth',
				'Ultiworld Disc Golf profiled him in a full feature interview'
			]
		},
		{
			name: 'George Kittle',
			sub: 'NFL All-Pro TE · 49ers · Tight End University',
			reach: '~3.2M followers · On-camera DGPT 2024',
			bullets: [
				'Played urban disc golf with 4 DGPT pros in Nashville (June 2024)',
				'168K+ YouTube views on the disc golf video — filmed during TEU week',
				'TEU brings 70–80 NFL players to Nashville annually (DGPT territory)',
				'Co-founded TEU with Travis Kelce — built-in NFL network amplifier'
			]
		},
		{
			name: 'Brad Pitt',
			sub: 'Oscar winner · F1 Movie · Global megastar',
			reach: 'NBC Tonight Show bit',
			bullets: [
				"Filmed 'Frisbee Trick Shots with Brad Pitt' with Jimmy Fallon — June 2025",
				'Shot in Central Park in matching tie-dye outfits throwing into disc golf baskets',
				"Fallon's line: 'Same rules as always?' — implies recurring familiarity",
				'Segment aired NBC primetime + Peacock + went viral across social platforms'
			]
		},
		{
			name: 'Jimmy Fallon',
			sub: 'The Tonight Show · NBC · 100M+ reach',
			reach: '~100M+ followers · 9.2B views / 12 months',
			bullets: [
				'Played disc golf trick shots with Brad Pitt on The Tonight Show (June 2025)',
				'#1 most-followed late night show on all social platforms',
				'9.2 billion social views in 12 months — +55% year over year',
				'33M YouTube subscribers, 43M Twitter, 29M personal Instagram'
			]
		},
		{
			name: 'Jesse Cole + Savannah Bananas',
			sub: "Banana Ball · $1B valuation · 'Greatest Show in Sports'",
			reach: '35M org. followers · Recently Played Live',
			bullets: [
				'35M+ total social followers reported Jan 2026 — more than any MLB team',
				"11.3M TikTok followers — surpasses MLB's official account and every team",
				'$100M+ revenue, $1B valuation — refused acquisition offers',
				'ESPN, CW, HBO Max, Disney+ broadcast deals — 500K+ average TV viewers',
				'81,000 fans at a single game (Clemson 2025). FLI IS the disc golf version of this'
			]
		}
	];
</script>

<svelte:head>
	<title>Celebrity Network — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-10">
	<!-- Header -->
	<div class="flex items-start gap-6">
		<img
			src="https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/bztj3sjzfkb0vbo/fli_golf_rwb_01_cmsf5n2rxd.png"
			alt="Red - White & Blue Logo"
			class="h-20 w-auto shrink-0"
		/>
		<div>
			<div class="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400 uppercase tracking-widest mb-3">
				Advanced Access · Confidential
			</div>
			<h1 class="text-3xl font-black text-white">Celebrity Network</h1>
			<p class="mt-1 text-white/50">FLI Golf League · April 2026 · Young America Capital / Elevation Energy</p>
		</div>
	</div>

	{#if !data.hasAccess}
		<!-- Locked state for basic users -->
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-12 text-center space-y-4">
			<div class="text-4xl">🔒</div>
			<h2 class="text-xl font-bold text-white">Advanced Access Required</h2>
			<p class="text-white/50 max-w-md mx-auto text-sm leading-relaxed">
				The Celebrity Network deck covers FLI's 35 confirmed celebrity connections, 500M+ combined social reach, and activation strategy. This section is available to Advanced investors.
			</p>
			<p class="text-sm text-white/40">
				Contact <a href="mailto:investors@fligolf.com" class="text-brand-600 hover:text-brand-300 underline">investors@fligolf.com</a> to request Advanced access.
			</p>
		</div>
	{:else}
		<!-- Reach summary -->
		<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
			{#each [
				{ value: '500M+', label: 'Combined Reach',          icon: Globe },
				{ value: '35',    label: 'Verified Celebrities',    icon: Star },
				{ value: '10+',   label: 'Industries',              icon: Trophy },
				{ value: '$1B+',  label: 'Bananas Valuation Alone', icon: Crown }
			] as stat}
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5 text-center">
					<svelte:component this={stat.icon} class="h-5 w-5 text-yellow-400 mx-auto mb-2" />
					<div class="text-2xl font-black text-white">{stat.value}</div>
					<div class="text-xs text-white/40 mt-1 uppercase tracking-wide">{stat.label}</div>
				</div>
			{/each}
		</div>

		<!-- The opportunity -->
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6 space-y-4">
			<h2 class="text-lg font-bold text-white">The Opportunity</h2>
			<div class="grid sm:grid-cols-3 gap-4">
				{#each [
					{
						title: 'They Already Play',
						body: '35 confirmed celebrities, athletes, musicians and creators — not paid to talk about disc golf, but genuinely playing it. Organic. Authentic. Documented on video, in PDGA records, and in broadcast segments.'
					},
					{
						title: 'They Have the Audience',
						body: "500M+ combined reach. The Savannah Bananas alone have 35M followers and $100M revenue. Jimmy Fallon's Tonight Show: 9.2 billion social views in 12 months. Brad Pitt: most famous human on earth."
					},
					{
						title: 'The Bananas Prove the Model',
						body: 'Jesse Cole turned an exhibition baseball team into a $1B brand through entertainment-first sports. Disc golf has the same untapped energy. FLI is the Banana Ball of disc golf — and these 35 celebrities are the proof.'
					}
				] as item}
					<div class="rounded-lg border border-brand-500/20 bg-brand-500/5 p-5">
						<div class="text-sm font-semibold text-brand-300 mb-2">{item.title}</div>
						<p class="text-xs text-white/60 leading-relaxed">{item.body}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Social reach breakdown -->
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
			<div class="flex items-center gap-2 mb-5">
				<TrendingUp class="h-5 w-5 text-yellow-400" />
				<h2 class="text-lg font-bold text-white">Combined Social Media Reach</h2>
			</div>
			<div class="grid sm:grid-cols-4 gap-4 mb-6">
				<div class="rounded-lg bg-navy-800/50 border border-white/15 p-4">
					<div class="flex items-center gap-2 mb-2">
						<Youtube class="h-5 w-5 text-red-500 shrink-0" />
						<div class="text-xs font-semibold text-white">YouTube / Twitch</div>
					</div>
					<div class="text-2xl font-black text-white mb-1">~195M</div>
					<p class="text-xs text-white/40 leading-snug">Dude Perfect 62M + Kai 21M + Tonight Show 33M + Bananas + others</p>
				</div>
				<div class="rounded-lg bg-navy-800/50 border border-white/15 p-4">
					<div class="flex items-center gap-2 mb-2">
						<Music class="h-5 w-5 text-white shrink-0" />
						<div class="text-xs font-semibold text-white">TikTok</div>
					</div>
					<div class="text-2xl font-black text-white mb-1">~55M</div>
					<p class="text-xs text-white/40 leading-snug">Bananas 11.3M + Tom Segura 2.3M + Bert 2.5M + Brodie 1.7M + others</p>
				</div>
				<div class="rounded-lg bg-navy-800/50 border border-white/15 p-4">
					<div class="flex items-center gap-2 mb-2">
						<Instagram class="h-5 w-5 text-pink-500 shrink-0" />
						<div class="text-xs font-semibold text-white">Instagram</div>
					</div>
					<div class="text-2xl font-black text-white mb-1">~80M</div>
					<p class="text-xs text-white/40 leading-snug">Fallon 29M + Hivju 3M + Bert 4M + Bananas 4M + 31 others</p>
				</div>
				<div class="rounded-lg bg-navy-800/50 border border-white/15 p-4">
					<div class="flex items-center gap-2 mb-2">
						<Twitter class="h-5 w-5 text-yellow-400 shrink-0" />
						<div class="text-xs font-semibold text-white">Twitter / X</div>
					</div>
					<div class="text-2xl font-black text-white mb-1">~78M</div>
					<p class="text-xs text-white/40 leading-snug">Fallon 43M + Bill Nye 6M + Bubba 2.8M + Bert 900K + others</p>
				</div>
			</div>
			<div class="rounded-lg bg-yellow-500/5 border border-yellow-500/20 p-4 space-y-2">
				<div class="flex items-center gap-2 mb-3">
					<Zap class="h-4 w-4 text-yellow-400" />
					<div class="text-xs font-semibold text-yellow-400 uppercase tracking-wide">Context</div>
				</div>
				{#each [
					'500M > NBA + NFL + MLB + NHL YouTube channels combined',
					'Savannah Bananas: 35M followers, $100M revenue, $1B valuation — no stadium',
					'Tonight Show alone: 9.2B social views in 12 months (+55% YoY)',
					'Brad Pitt + Fallon disc golf segment reached millions on NBC prime time',
					"Dude Perfect's 62M subs = more than every major US sports league combined"
				] as point}
					<div class="flex items-start gap-2 text-xs text-white/60">
						<TrendingUp class="h-3.5 w-3.5 text-yellow-400 mt-0.5 shrink-0" />
						<span>{point}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Full roster -->
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
			<h2 class="text-lg font-bold text-white mb-2">Complete Celebrity Roster</h2>
			<p class="text-sm text-white/40 mb-5">35 verified connections — all with documented disc golf or entertainment-sports ties</p>

			<!-- Category legend -->
			<div class="flex flex-wrap gap-2 mb-5">
				{#each categories as cat}
					<span class="rounded-full border px-2.5 py-0.5 text-xs font-medium {colorMap[cat.color]}">{cat.label}</span>
				{/each}
			</div>

			<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
				{#each roster as person}
					<div class="rounded-lg border border-white/15 bg-navy-700/50 p-3">
						<div class="text-sm font-semibold text-white leading-tight">{person.name}</div>
						<div class="text-xs text-white/40 mt-0.5 mb-2 leading-snug">{person.detail}</div>
						<span class="rounded-full border px-2 py-0.5 text-xs {getCategoryColor(person.category)}">{person.category}</span>
					</div>
				{/each}
			</div>
			<p class="text-xs text-white/30 mt-4">*Jason Day confirmed by Bubba Watson as a fellow disc golfer on PGA Tour road trips</p>
		</div>

		<!-- Six powerhouse spotlights -->
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
			<div class="flex items-center gap-2 mb-2"><Award class="h-5 w-5 text-yellow-400" /><h2 class="text-lg font-bold text-white">Six Powerhouse Additions</h2></div>
			<p class="text-sm text-white/40 mb-6">Each with deep documented ties to disc golf or entertainment-first sports — and massive mainstream reach.</p>
			<div class="grid sm:grid-cols-2 gap-5">
				{#each spotlights as s}
					<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
						<div class="font-bold text-white text-base">{s.name}</div>
						<div class="text-xs text-yellow-400 mb-1">{s.sub}</div>
						<div class="text-xs text-white/40 mb-3">{s.reach}</div>
						<ul class="space-y-1.5">
							{#each s.bullets as b}
								<li class="flex items-start gap-2 text-xs text-white/60">
									<CheckCircle2 class="h-3.5 w-3.5 text-yellow-400 shrink-0 mt-0.5" />
									<span>{b}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>

		<!-- Activation strategy -->
		<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
			<div class="flex items-center gap-2 mb-6"><Rocket class="h-5 w-5 text-yellow-400" /><h2 class="text-lg font-bold text-white">How FLI Activates the Celebrity Network</h2></div>
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
				{#each activations as a}
					<div class="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-5">
						<div class="flex items-center gap-3 mb-3">
							<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/15 shrink-0">
								<svelte:component this={a.icon} class="h-4 w-4 text-yellow-400" />
							</div>
							<div class="text-sm font-semibold text-white">{a.title}</div>
						</div>
						<p class="text-xs text-white/50 leading-relaxed">{a.body}</p>
					</div>
				{/each}
			</div>
		</div>

		<p class="text-xs text-white/20">Gary E. Hearl · Young America Capital / Elevation Energy · April 2026 · Confidential</p>
	{/if}
</div>
