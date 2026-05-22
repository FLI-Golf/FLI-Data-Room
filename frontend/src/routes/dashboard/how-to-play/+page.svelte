<script lang="ts">
	import { PlayCircle, Disc, Target, Trophy, Flag, Upload, CheckCircle2 } from 'lucide-svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	const steps = [
		{
			number: 1,
			title: 'The Objective',
			icon: Target,
			color: 'text-brand-400',
			bg: 'bg-brand-600/20',
			border: 'border-brand-600/30',
			description: 'Complete each hole in as few throws as possible. The player with the lowest total score at the end of the round wins. Just like ball golf — but with a flying disc.',
		},
		{
			number: 2,
			title: 'The Tee',
			icon: Flag,
			color: 'text-fli-blue-300',
			bg: 'bg-fli-blue-800/20',
			border: 'border-fli-blue-700/30',
			description: 'Each hole begins at a designated tee pad. Players throw from behind the tee line. The order of play is determined by score — lowest score from the previous hole throws last (the "honor").',
		},
		{
			number: 3,
			title: 'The Throw',
			icon: Disc,
			color: 'text-green-400',
			bg: 'bg-green-500/10',
			border: 'border-green-500/20',
			description: 'After the tee shot, each subsequent throw is made from a stance behind where the disc landed. Players must maintain balance and not step past their lie until the disc is released.',
		},
		{
			number: 4,
			title: 'The Basket',
			icon: Target,
			color: 'text-yellow-400',
			bg: 'bg-yellow-500/10',
			border: 'border-yellow-500/20',
			description: 'The target is a metal basket with hanging chains. A hole is completed when the disc comes to rest in the basket or the chains. The number of throws taken is recorded as the score for that hole.',
		},
		{
			number: 5,
			title: 'Scoring',
			icon: Trophy,
			color: 'text-white',
			bg: 'bg-white/8',
			border: 'border-white/15',
			description: 'Par is the expected number of throws for a hole. Scores are named like ball golf: Ace (hole-in-one), Eagle (2 under par), Birdie (1 under), Par, Bogey (1 over). Lowest cumulative score wins.',
		},
	];

	const DEFAULT_DIFF = [
		{ label: 'Stadium Format',         description: 'FLI Golf is played in a purpose-built stadium venue — not a traditional wooded course. Spectators watch every shot from stands, creating a live event atmosphere comparable to arena sports.' },
		{ label: 'Elite 24-Player Field',  description: 'Each FLI event features exactly 24 of the world\'s top professional disc golfers, selected by world ranking and invitation.' },
		{ label: 'Broadcast-First Design', description: 'Every hole is designed for camera coverage. Sight lines, lighting, and course layout are optimized for television and streaming production.' },
		{ label: 'Scoring & Leaderboard',  description: 'Real-time scoring is displayed on stadium screens and broadcast overlays. Fantasy sports and sports betting integrations use live shot-by-shot data feeds.' },
		{ label: 'Celebrity Pro-Am',       description: 'FLI events include a celebrity pro-am component, pairing professional players with celebrity participants from FLI\'s 35+ celebrity network.' },
	];

	const DEFAULT_RESOURCES = [
		{ label: 'PDGA Official Rules of Disc Golf', url: 'https://www.pdga.com/rules' },
		{ label: 'PDGA — What is Disc Golf?',        url: 'https://www.pdga.com/intro' },
		{ label: 'Disc Golf Network (streaming)',    url: 'https://www.discgolfnetwork.com' },
	];

	$: videoUrl   = (data.content?.videoUrl   as string) || 'https://drive.google.com/file/d/1C895DZEMAJ4vuY77iiRkc-ikS8p5hHeM/preview';
	$: videoTitle = (data.content?.videoTitle as string) ?? 'FLI Golf — How to Play';
	$: fliDifference = ((data.content?.fliDifference as typeof DEFAULT_DIFF) ?? []).filter(d => d.label).length > 0
		? (data.content?.fliDifference as typeof DEFAULT_DIFF).filter(d => d.label)
		: DEFAULT_DIFF;
	$: resources = ((data.content?.resources as typeof DEFAULT_RESOURCES) ?? []).filter(r => r.label).length > 0
		? (data.content?.resources as typeof DEFAULT_RESOURCES).filter(r => r.label)
		: DEFAULT_RESOURCES;
</script>

<svelte:head>
	<title>How to Play — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-4xl space-y-12">
	<div>
		<h1 class="text-3xl font-black text-white">How to Play Disc Golf</h1>
		<p class="mt-1 text-white/50">A primer on disc golf rules and how FLI Golf's stadium format elevates the sport for investors and fans unfamiliar with the game.</p>
	</div>

	<!-- Video -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 overflow-hidden">
		{#if videoUrl}
			<div class="aspect-video">
				<iframe
					src={videoUrl}
					title={videoTitle}
					class="w-full h-full"
					frameborder="0"
					allow="autoplay"
					allowfullscreen
				></iframe>
			</div>
			{#if videoTitle}
				<div class="px-4 py-3 border-t border-white/10 text-xs text-white/50">{videoTitle}</div>
			{/if}
		{:else}
			<div class="aspect-video flex flex-col items-center justify-center gap-4 bg-navy-900/60">
				<div class="h-16 w-16 rounded-full bg-brand-600/20 border border-brand-500/30 flex items-center justify-center">
					<PlayCircle class="h-8 w-8 text-brand-400" />
				</div>
				<div class="text-center">
					<div class="text-sm font-semibold text-white">Intro Video — Coming Soon</div>
					<div class="text-xs text-white/40 mt-1">Add a video URL via Admin → Content Editor → How to Play</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Step-by-step rules -->
	<section>
		<h2 class="text-xl font-bold text-white mb-6">The Rules — In Plain English</h2>
		<div class="space-y-4">
			{#each steps as step}
				<div class="rounded-xl border {step.border} {step.bg} p-5 flex items-start gap-4">
					<div class="h-10 w-10 rounded-lg bg-navy-900/60 border border-white/10 flex items-center justify-center shrink-0 text-base font-black text-white/30">
						{step.number}
					</div>
					<div>
						<div class="flex items-center gap-2 mb-1.5">
							<svelte:component this={step.icon} class="h-4 w-4 {step.color}" />
							<h3 class="text-sm font-bold text-white">{step.title}</h3>
						</div>
						<p class="text-sm text-white/55 leading-relaxed">{step.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Scoring reference -->
	<section>
		<h2 class="text-xl font-bold text-white mb-4">Scoring Reference</h2>
		<div class="rounded-xl border border-white/15 bg-navy-700/50 overflow-hidden">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/15 text-white/40 text-xs uppercase tracking-wide">
						<th class="text-left px-5 py-3">Score Name</th>
						<th class="text-left px-5 py-3">Throws vs. Par</th>
						<th class="text-left px-5 py-3">Example (Par 3)</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5 text-xs">
					{#each [
						{ name: 'Ace',    rel: 'Hole-in-one',  ex: '1 throw',  color: 'text-yellow-400' },
						{ name: 'Condor', rel: '4 under par',  ex: 'N/A on 3', color: 'text-yellow-400' },
						{ name: 'Albatross', rel: '3 under par', ex: 'N/A on 3', color: 'text-yellow-400' },
						{ name: 'Eagle',  rel: '2 under par',  ex: '1 throw',  color: 'text-green-400' },
						{ name: 'Birdie', rel: '1 under par',  ex: '2 throws', color: 'text-green-400' },
						{ name: 'Par',    rel: 'Even',         ex: '3 throws', color: 'text-white' },
						{ name: 'Bogey',  rel: '1 over par',   ex: '4 throws', color: 'text-white/50' },
						{ name: 'Double Bogey', rel: '2 over par', ex: '5 throws', color: 'text-brand-400' },
					] as row}
						<tr>
							<td class="px-5 py-2.5 font-semibold {row.color}">{row.name}</td>
							<td class="px-5 py-2.5 text-white/50">{row.rel}</td>
							<td class="px-5 py-2.5 text-white/40">{row.ex}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- The FLI difference -->
	<section>
		<h2 class="text-xl font-bold text-white mb-2">The FLI Difference</h2>
		<p class="text-sm text-white/50 mb-5">How FLI Golf's stadium format transforms disc golf into a spectator and broadcast sport.</p>
		<div class="grid sm:grid-cols-2 gap-4">
			{#each fliDifference as item}
				<div class="rounded-xl border border-white/15 bg-navy-700/50 p-5">
					<div class="flex items-start gap-2 mb-2">
						<CheckCircle2 class="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
						<h3 class="text-sm font-bold text-white">{item.label}</h3>
					</div>
					<p class="text-xs text-white/50 leading-relaxed pl-6">{item.description}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- External resources -->
	<section>
		<h2 class="text-base font-bold text-white mb-3">Further Reading</h2>
		<div class="space-y-2">
			{#each resources as link}
				<a
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center justify-between rounded-lg border border-white/10 bg-navy-800/50 px-4 py-3 text-sm text-white/50 hover:text-white hover:border-white/20 transition-colors group"
				>
					{link.label}
					<PlayCircle class="h-3.5 w-3.5 text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
				</a>
			{/each}
		</div>
	</section>
</div>
