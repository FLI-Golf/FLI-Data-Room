<script lang="ts">
	import { Tv, Users, Image, Megaphone, CheckCircle2, DollarSign } from 'lucide-svelte';

	const allocations = [
		{
			pct: '35%', n: 35,
			label: 'Event Production & Technology',
			icon: Tv, color: 'text-brand-400', border: 'border-brand-600/30', bg: 'bg-brand-600/10', bar: 'bg-brand-500',
			points: [
				'Venue setup, course design, and obstacle fabrication for stadium-format events',
				'Live streaming infrastructure and broadcast production crew',
				'Scoring technology and real-time data feeds for betting integrations',
				'Mobile app and fan-facing digital experience',
			],
			detail: [
				{ label: 'Venue & Course Build', value: '~$1.3M' },
				{ label: 'Broadcast Infrastructure', value: '~$1.0M' },
				{ label: 'Tech & Data Platform', value: '~$0.3M' },
			]
		},
		{
			pct: '25%', n: 25,
			label: 'League Operations & Team Development',
			icon: Users, color: 'text-fli-blue-300', border: 'border-fli-blue-700/30', bg: 'bg-fli-blue-800/10', bar: 'bg-fli-blue-500',
			points: [
				'Player contracts, travel, and competition logistics for 20+ committed pros',
				'Team franchise development and owner onboarding process',
				'League office staffing — commissioner, ops, legal, and compliance',
				'Rulebook, officiating standards, and competitive format development',
			],
			detail: [
				{ label: 'Player Contracts & Travel', value: '~$1.0M' },
				{ label: 'League Office & Staff', value: '~$0.6M' },
				{ label: 'Franchise Dev & Legal', value: '~$0.3M' },
			]
		},
		{
			pct: '20%', n: 20,
			label: 'Media & Content Buildout',
			icon: Image, color: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-500/8', bar: 'bg-yellow-500',
			points: [
				'Documentary and behind-the-scenes content for streaming platforms',
				'Trading card, gaming, and licensing asset production',
				'Social media content team and athlete storytelling campaigns',
				'Broadcast rights packaging for domestic and international distribution',
			],
			detail: [
				{ label: 'Documentary & Streaming', value: '~$0.6M' },
				{ label: 'Social & Athlete Content', value: '~$0.4M' },
				{ label: 'Licensing & Trading Cards', value: '~$0.5M' },
			]
		},
		{
			pct: '20%', n: 20,
			label: 'Marketing, Working Capital & Reserve',
			icon: Megaphone, color: 'text-green-400', border: 'border-green-500/30', bg: 'bg-green-500/8', bar: 'bg-green-500',
			points: [
				'Launch campaign targeting disc golf, sports betting, and fantasy audiences',
				'Sponsor acquisition and brand partnership outreach',
				'Operating reserve to cover 6+ months of runway post-launch',
				'Contingency buffer for venue, regulatory, or scheduling changes',
			],
			detail: [
				{ label: 'Launch Marketing', value: '~$0.6M' },
				{ label: 'Sponsor Outreach', value: '~$0.3M' },
				{ label: 'Operating Reserve', value: '~$0.6M' },
			]
		},
	];
</script>

<svelte:head>
	<title>Use of Proceeds — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-10">

	<!-- Header -->
	<div>
		<h1 class="text-3xl font-black text-white">Use of Proceeds</h1>
		<p class="mt-1 text-white/50">How the $7.5M seed round is deployed across four operational pillars.</p>
	</div>

	<!-- Summary bar -->
	<div class="rounded-xl border border-white/10 bg-navy-700/40 p-6">
		<div class="flex items-center gap-3 mb-4">
			<DollarSign class="h-4 w-4 text-yellow-400" />
			<span class="text-sm font-bold text-white">$7.5M Seed Round — Allocation Overview</span>
		</div>
		<div class="flex h-4 rounded-full overflow-hidden gap-0.5">
			{#each allocations as a}
				<div class="h-full {a.bar} transition-all" style="width: {a.n}%"></div>
			{/each}
		</div>
		<div class="flex flex-wrap gap-4 mt-3">
			{#each allocations as a}
				<div class="flex items-center gap-1.5">
					<div class="h-2.5 w-2.5 rounded-sm {a.bar}"></div>
					<span class="text-xs text-white/50">{a.pct} {a.label}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Allocation cards -->
	<div class="space-y-6">
		{#each allocations as a}
			<div class="rounded-xl border {a.border} {a.bg} p-6">
				<div class="flex items-start gap-4 mb-5">
					<div class="h-10 w-10 rounded-xl {a.bg} border {a.border} flex items-center justify-center shrink-0">
						<svelte:component this={a.icon} class="h-5 w-5 {a.color}" />
					</div>
					<div class="flex-1 min-w-0">
						<div class="flex items-center gap-3 flex-wrap">
							<span class="text-2xl font-black text-white">{a.pct}</span>
							<span class="text-base font-bold text-white/80">{a.label}</span>
							<span class="text-sm font-semibold {a.color}">${(7.5 * a.n / 100).toFixed(2)}M</span>
						</div>
						<!-- Progress bar -->
						<div class="mt-2 h-1.5 rounded-full bg-white/8 w-full">
							<div class="h-full rounded-full {a.bar}" style="width: {a.n}%"></div>
						</div>
					</div>
				</div>

				<div class="grid sm:grid-cols-2 gap-6">
					<!-- Bullet points -->
					<div class="space-y-2">
						<div class="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2">What it covers</div>
						{#each a.points as point}
							<div class="flex items-start gap-2">
								<CheckCircle2 class="h-3.5 w-3.5 {a.color} shrink-0 mt-0.5" />
								<span class="text-sm text-white/60 leading-snug">{point}</span>
							</div>
						{/each}
					</div>
					<!-- Breakdown -->
					<div class="space-y-2">
						<div class="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2">Indicative breakdown</div>
						{#each a.detail as row}
							<div class="flex items-center justify-between border-b border-white/6 pb-2">
								<span class="text-sm text-white/55">{row.label}</span>
								<span class="text-sm font-semibold text-white">{row.value}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Disclaimer -->
	<p class="text-xs text-white/25 leading-relaxed">
		Indicative allocations only. Actual deployment may vary based on operational needs, venue negotiations, and market conditions. Forward-looking statements involve risk and uncertainty.
	</p>

</div>
