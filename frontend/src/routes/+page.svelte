<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>FLI Golf League — Investor Data Room</title>
</svelte:head>

<!-- Hero -->
<div class="relative min-h-screen bg-navy-900 text-white overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 pointer-events-none" />
	<div class="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />
	<div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fli-blue-800/10 rounded-full blur-3xl pointer-events-none" />

	<!-- Nav -->
	<nav class="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
		<div class="flex items-center gap-1.5">
			<span class="text-xl font-black tracking-tight text-white">FLI</span>
			<span class="text-xl font-black tracking-tight text-white">GOLF</span>
			<span class="text-xs font-semibold text-white/40 uppercase tracking-widest ml-1">League</span>
		</div>
		<div class="flex items-center gap-3">
			{#if data.user}
				<a href="/dashboard" class="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 transition-colors">
					Enter Data Room
				</a>
			{:else}
				<a href="/login" class="text-sm font-medium text-white/60 hover:text-white transition-colors">Sign In</a>
				<a href="/register" class="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 transition-colors">
					Request Access
				</a>
			{/if}
		</div>
	</nav>

	<!-- Hero content -->
	<div class="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-12">
		<div class="flex flex-col lg:flex-row items-center gap-10">
			<!-- Left: text -->
			<div class="flex-1 text-center lg:text-left">
				<div class="flex items-center justify-center lg:justify-start gap-5 mb-6">
					<img
						src="https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/1zf32ato6zddp24/fgl_logo_cmyk_01_7s51ljmqp7.png"
						alt="FLI Shield Logo"
						class="h-28 w-auto"
					/>
					<div class="inline-flex items-center rounded-full border border-yellow-500/40 bg-yellow-500/10 px-5 py-2 text-lg font-bold text-yellow-400 uppercase tracking-widest">
						$7.5M Seed · Q2 2026
					</div>
				</div>
				<h1 class="text-5xl sm:text-6xl font-black tracking-tight leading-none mb-4">
					Stadium-Style<br />
					<span class="text-brand-500">Professional</span><br />
					Disc Golf
				</h1>
				<p class="text-base text-white/60 max-w-lg mb-6 leading-relaxed">
					FLI Golf League is creating the world's first stadium-engineered professional disc golf
					league — built for media, betting, and franchise scale from Day 1.
				</p>
				<div class="flex flex-wrap justify-center lg:justify-start gap-3">
					{#if data.user}
						<a href="/dashboard" class="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-500 transition-colors">
							Enter Data Room →
						</a>
					{:else}
						<a href="/register" class="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-500 transition-colors">
							Request Investor Access →
						</a>
						<a href="/login" class="rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/80 hover:border-white/40 hover:text-white transition-colors">
							Sign In
						</a>
					{/if}
				</div>
			</div>
			<!-- Right: image -->
			<div class="flex-1 flex justify-center lg:justify-end">
				<img
					src="https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/e5oi8tsz3hbiybc/p_1_npi4rqaaon.png"
					alt="FLI Golf League"
					class="w-full max-w-lg rounded-2xl shadow-2xl"
				/>
			</div>
		</div>
	</div>

	<!-- Stats bar -->
	<div class="relative z-10 border-t border-white/15 bg-navy-950/60 backdrop-blur-sm">
		<div class="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
			{#each [
				{ value: '$18B+', label: 'Addressable SAM by 2030' },
				{ value: '20M+', label: 'Global Active Players' },
				{ value: '86%', label: 'Participation Growth Since 2020' },
				{ value: '500B+', label: 'TikTok #discgolf Views' }
			] as stat}
				<div class="text-center">
					<div class="text-3xl font-black text-brand-600">{stat.value}</div>
					<div class="text-xs text-white/50 mt-1 uppercase tracking-wide">{stat.label}</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<!-- Why Now -->
<div class="bg-navy-950 text-white py-24 px-6">
	<div class="max-w-7xl mx-auto">
		<h2 class="text-3xl font-black text-center mb-4">Why Disc Golf. Why Now.</h2>
		<p class="text-center text-white/50 mb-16 max-w-xl mx-auto">
			One category. Zero competition. FLI Golf League is first to formalize what the market has been building for years.
		</p>
		<div class="grid sm:grid-cols-3 gap-8">
			{#each [
				{ stat: '500B+', label: 'Digital Demand Signal', body: 'TikTok #discgolf has 500B+ global views. JomezPro: 441K subscribers, 237M+ YouTube views — before FGL entertainment features.' },
				{ stat: '$2.5B',  label: 'Core Market by 2030',  body: 'Core product market grows from $1.2B in 2025 to $2.5B by 2030 at 15% CAGR. New FGL revenue streams expand the ceiling further.' },
				{ stat: '18–34', label: 'Young, Digital-Native Demo', body: "Disc golf's dominant demographic is 18–34 and spending-ready — the most valuable audience in sports." }
			] as item}
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-8">
					<div class="text-4xl font-black text-brand-600 mb-2">{item.stat}</div>
					<div class="text-sm font-semibold text-white mb-3 uppercase tracking-wide">{item.label}</div>
					<p class="text-sm text-white/50 leading-relaxed">{item.body}</p>
				</div>
			{/each}
		</div>
	</div>
</div>

<!-- FGL Built Different -->
<div class="bg-navy-900 text-white py-24 px-6">
	<div class="max-w-7xl mx-auto">
		<h2 class="text-3xl font-black text-center mb-4">FGL Is Built Different</h2>
		<p class="text-center text-white/50 mb-16 max-w-xl mx-auto">
			Every structural problem in disc golf — solved and contracted before Season 1.
		</p>
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each [
				{ title: 'Stadium-Engineered Course', body: 'Custom par-3 stadium — front-row seating, controlled lighting, optimal camera angles.' },
				{ title: 'Emmy-Winning Broadcast', body: 'GK Productions secured. 13-time Emmy winner Mark Coleman leads production.' },
				{ title: '100% Gender-Equal Payout', body: 'First disc golf league with identical male/female prize pools — total parity.' },
				{ title: '1st Franchisable DG League', body: 'Contracted teams with ownership stakes and growing global fan bases.' },
				{ title: 'Tribal Gaming Network', body: 'Gary Santos: 23 yrs tribal governance; IGA Board 10+ years; sportsbook pipeline built.' },
				{ title: 'Fantasy Platform Ready', body: 'Digital player assets, fantasy leagues, skill-based contests — activates at launch.' }
			] as item}
				<div class="rounded-xl border border-brand-600/25 bg-brand-600/8 p-6">
					<div class="flex items-center gap-2 mb-3">
						<span class="text-brand-600 text-lg font-black">✓</span>
						<span class="font-semibold text-white text-sm">{item.title}</span>
					</div>
					<p class="text-sm text-white/50 leading-relaxed">{item.body}</p>
				</div>
			{/each}
		</div>
	</div>
</div>

<!-- CTA -->
<div class="bg-brand-700 text-white py-20 px-6 text-center">
	<h2 class="text-3xl font-black mb-4">Ready to Review the Full Opportunity?</h2>
	<p class="text-white/80 mb-8 max-w-md mx-auto">
		Access the complete pitch deck, financials, and supporting documents in the investor data room.
	</p>
	{#if data.user}
		<a href="/dashboard" class="inline-block rounded-md bg-white px-8 py-3 text-sm font-semibold text-brand-700 hover:bg-white/90 transition-colors">
			Enter Data Room →
		</a>
	{:else}
		<a href="/register" class="inline-block rounded-md bg-white px-8 py-3 text-sm font-semibold text-brand-700 hover:bg-white/90 transition-colors">
			Request Investor Access →
		</a>
	{/if}
</div>

<!-- Footer -->
<footer class="bg-navy-950 text-white/30 py-8 px-6 text-center text-xs border-t border-white/5">
	<p>© 2026 FLI Golf League. All rights reserved. Presented by Young America Capital, LLC — SEC Registered Broker Dealer | FINRA, SIPC.</p>
	<p class="mt-2">This is not an offer to sell securities. For accredited investors only. Past performance is not indicative of future results.</p>
</footer>
