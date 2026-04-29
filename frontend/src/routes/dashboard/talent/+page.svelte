<script lang="ts">
	import { Trophy, Globe, TrendingUp, Tv, Users, CheckCircle2, Star, Zap, Target, Award } from 'lucide-svelte';

	const pros = [
		{ name: 'Kristin Lätt',      country: 'Estonia',       code: 'ee', bio: 'Multi-time PDGA World Champion and one of the most decorated players in women\'s disc golf history.' },
		{ name: 'Gannon Buhr',       country: 'United States', code: 'us', bio: 'Elite Series standout and one of the most consistent top-10 finishers on the DGPT circuit.' },
		{ name: 'Evelina Salonen',   country: 'Finland',       code: 'fi', bio: 'PDGA World Champion and dominant force in women\'s disc golf with a passionate global following.' },
		{ name: 'Ricky Wysocki',     country: 'United States', code: 'us', bio: '2x PDGA World Champion (born June 5, 1993) and one of the most recognized names in professional disc golf.' },
		{ name: 'Ohn Scoggins',      country: 'United States', code: 'us', bio: '2025 Disc Golf World Champion — one of the sport\'s most exciting rising stars.' },
		{ name: 'Calvin Heimburg',   country: 'United States', code: 'us', bio: 'Grew up with the sport from age 11 and developed into a perennial top-5 world-ranked competitor.' },
		{ name: 'Missy Gannon',      country: 'United States', code: 'us', bio: 'Established professional with a loyal fanbase and consistent Elite Series presence.' },
		{ name: 'Isaac Robinson',    country: 'United States', code: 'us', bio: 'Two-time Major champion with a powerful, aggressive style that translates perfectly to stadium formats.' },
		{ name: 'Holyn Handley',     country: 'United States', code: 'us', bio: 'Breakout talent who announced herself on the national stage with a memorable championship run.' },
		{ name: 'Ella Hansen',       country: 'United States', code: 'us', bio: 'Full-time professional and consistent Elite Series competitor with strong social media presence.' },
		{ name: 'Matthew Orum',      country: 'United States', code: 'us', bio: 'Fan favorite "MattyO" — a loveable personality who brings energy and entertainment to every event.' },
		{ name: 'Hailey King',       country: 'United States', code: 'us', bio: 'Captured the attention and love of the disc golf community with her competitive drive and personality.' },
		{ name: 'Heidi Laine',       country: 'Finland',       code: 'fi', bio: 'Finnish star with major championship moments and a strong Scandinavian market following.' },
		{ name: 'Niklas Anttila',    country: 'Finland',       code: 'fi', bio: 'From Kuopio, Finland — a Scandinavian market anchor with elite-level competitive credentials.' },
		{ name: 'Paige Pierce',      country: 'United States', code: 'us', bio: '5x PDGA World Champion from Plano, Texas — one of the most decorated players in disc golf history.' },
		{ name: 'Chris Dickerson',   country: 'United States', code: 'us', bio: 'Officially signed with FLI — a top-ranked professional with championship pedigree and broad appeal.' },
		{ name: 'Kat Mertsch',       country: 'United States', code: 'us', bio: 'Elite competitor and fan favorite with strong performance at marquee events including Waco.' },
		{ name: 'Ezra Robinson',     country: 'United States', code: 'us', bio: 'Prodigy Disc athlete since 2016 and a consistent presence in the upper tier of professional competition.' },
		{ name: 'Natalie Ryan',      country: 'United States', code: 'us', bio: 'Discovered disc golf and rapidly ascended to professional status, bringing a compelling origin story.' },
		{ name: 'Adam Hammes',       country: 'United States', code: 'us', bio: 'Known for his zone game and represented by the 2023 Tour Series Zone — a versatile elite competitor.' },
	];

	const countries = [
		{ name: 'United States', code: 'us', desc: 'Largest participation and viewership market in professional disc golf' },
		{ name: 'Finland',       code: 'fi', desc: 'Strongest European market with deep competitive heritage' },
		{ name: 'Estonia',       code: 'ee', desc: 'Home of multiple world champions and a passionate fanbase' },
		{ name: 'Laos',          code: 'la', desc: 'Emerging Asian market with growing disc golf participation' },
	];

	const rosterComposition = [
		'Multi-time World Champions',
		'Established Major winners',
		'Elite Series champions',
		'Young breakout talents with long-term ceiling',
		'Stars with 10–15+ years of fan equity',
		'Scandinavian market anchors',
		'Franchise-style personalities',
	];

	const narrativeStrengths = [
		'Head-to-head narrative rivalries',
		'Cross-generational storytelling',
		'Strong betting and analytics integrations',
		'Sustained championship credibility',
	];

	const broadcastStrengths = [
		'Proven closers for playoff drama',
		'Aggressive power throwers for highlight moments',
		'International stars for global streaming expansion',
		'Personalities suitable for documentary, trading cards, gaming, and sponsorship storytelling',
	];

	const investorTakeaways = [
		{ label: 'World Champions',         icon: Trophy, color: 'text-yellow-400', border: 'border-yellow-500/20', bg: 'bg-yellow-500/8' },
		{ label: 'Major Champions',         icon: Award,  color: 'text-brand-400',  border: 'border-brand-600/20',  bg: 'bg-brand-600/8' },
		{ label: 'International Stars',     icon: Globe,  color: 'text-fli-blue-300', border: 'border-fli-blue-700/20', bg: 'bg-fli-blue-800/10' },
		{ label: 'Prime-Age Contenders',    icon: Zap,    color: 'text-green-400',  border: 'border-green-500/20',  bg: 'bg-green-500/8' },
		{ label: 'Marketable Personalities',icon: Star,   color: 'text-purple-400', border: 'border-purple-500/20', bg: 'bg-purple-500/8' },
	];
</script>

<svelte:head>
	<title>Talent Overview — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-12">

	<!-- Header -->
	<div>
		<h1 class="text-3xl font-black text-white">Talent Overview</h1>
		<p class="mt-1 text-white/50">Global Star Power & Championship Density</p>
	</div>

	<!-- Championship Equity -->
	<section id="championship-equity" class="space-y-5">
		<div class="flex items-center gap-3">
			<Trophy class="h-5 w-5 text-yellow-400 shrink-0" />
			<h2 class="text-xl font-bold text-white">Championship Equity Represented</h2>
		</div>
		<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/8 p-6 space-y-3">
			{#each [
				'Multiple 5x, 2x, and 1x PDGA World Champions',
				'Multiple Major Champions (U.S. & International)',
				'Dozens of DGPT Elite Series victories',
				'Consistent multi-year Top 5 – Top 10 world rankings',
				'European, Nordic, Asian, and U.S. championship pedigree',
			] as point}
				<div class="flex items-start gap-2.5">
					<CheckCircle2 class="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
					<span class="text-sm text-white/70 leading-snug">{point}</span>
				</div>
			{/each}
			<p class="text-sm text-white/50 pt-3 border-t border-white/10 leading-relaxed">
				This concentration of titles and podium finishes positions FLI with one of the highest <span class="text-white font-semibold">"championship densities"</span> ever assembled in a single professional disc golf property.
			</p>
		</div>
	</section>

	<!-- Countries -->
	<section id="countries" class="space-y-5">
		<div class="flex items-center gap-3">
			<Globe class="h-5 w-5 text-fli-blue-300 shrink-0" />
			<h2 class="text-xl font-bold text-white">Countries Represented</h2>
		</div>
		<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
			{#each countries as c}
				<div class="rounded-xl border border-white/10 bg-navy-700/40 p-5 text-center">
					<span class="fi fi-{c.code} text-4xl rounded mb-3 inline-block" style="width:2.5rem;height:1.875rem;background-size:cover;"></span>
					<div class="text-sm font-bold text-white mb-1 mt-1">{c.name}</div>
					<div class="text-xs text-white/45 leading-snug">{c.desc}</div>
				</div>
			{/each}
		</div>
		<p class="text-sm text-white/50 leading-relaxed">
			These countries represent the strongest participation and viewership markets in professional disc golf globally, giving FLI immediate international media positioning.
		</p>
	</section>

	<!-- Competitive Structure -->
	<section id="competitive-structure" class="space-y-5">
		<div class="flex items-center gap-3">
			<TrendingUp class="h-5 w-5 text-brand-400 shrink-0" />
			<h2 class="text-xl font-bold text-white">Competitive Structure Balance</h2>
		</div>
		<div class="grid sm:grid-cols-2 gap-6">
			<div class="rounded-xl border border-white/10 bg-navy-700/40 p-5 space-y-3">
				<div class="text-sm font-semibold text-white/60 uppercase tracking-wide mb-1">Roster Composition</div>
				{#each rosterComposition as item}
					<div class="flex items-start gap-2.5">
						<CheckCircle2 class="h-3.5 w-3.5 text-brand-400 shrink-0 mt-0.5" />
						<span class="text-sm text-white/65 leading-snug">{item}</span>
					</div>
				{/each}
			</div>
			<div class="rounded-xl border border-brand-600/20 bg-brand-600/8 p-5 space-y-3">
				<div class="text-sm font-semibold text-white/60 uppercase tracking-wide mb-1">This Creates</div>
				{#each narrativeStrengths as item}
					<div class="flex items-start gap-2.5">
						<CheckCircle2 class="h-3.5 w-3.5 text-green-400 shrink-0 mt-0.5" />
						<span class="text-sm text-white/65 leading-snug">{item}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Broadcast & Media -->
	<section id="broadcast" class="space-y-5">
		<div class="flex items-center gap-3">
			<Tv class="h-5 w-5 text-fli-blue-300 shrink-0" />
			<h2 class="text-xl font-bold text-white">Broadcast & Media Strength</h2>
		</div>
		<div class="rounded-xl border border-fli-blue-700/20 bg-fli-blue-800/10 p-6 space-y-3">
			{#each broadcastStrengths as point}
				<div class="flex items-start gap-2.5">
					<CheckCircle2 class="h-4 w-4 text-fli-blue-300 shrink-0 mt-0.5" />
					<span class="text-sm text-white/70 leading-snug">{point}</span>
				</div>
			{/each}
			<p class="text-sm text-white/50 pt-3 border-t border-white/10 leading-relaxed">
				In FLI's stadium-style, artificial-obstacle format, consistency, composure, and scoring separation are amplified — favoring championship-level athletes and creating predictable broadcast intensity.
			</p>
		</div>
	</section>

	<!-- Committed Pros -->
	<section id="roster" class="space-y-5">
		<div class="flex items-center gap-3">
			<Users class="h-5 w-5 text-green-400 shrink-0" />
			<h2 class="text-xl font-bold text-white">Committed Pros</h2>
			<span class="rounded-full bg-green-500/15 px-2.5 py-0.5 text-xs font-bold text-green-400">{pros.length} professionals</span>
		</div>
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
			{#each pros as pro}
				<div class="rounded-xl border border-white/8 bg-navy-700/40 p-4 hover:bg-navy-700/60 transition-colors">
					<div class="flex items-center gap-2.5 mb-2">
						<span class="fi fi-{pro.code} rounded shrink-0" style="width:1.5rem;height:1.125rem;background-size:cover;display:inline-block;"></span>
						<div>
							<div class="text-sm font-bold text-white leading-tight">{pro.name}</div>
							<div class="text-xs text-white/35">{pro.country}</div>
						</div>
					</div>
					<p class="text-xs text-white/50 leading-relaxed">{pro.bio}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Investor Takeaway -->
	<section id="investor-takeaway" class="space-y-5">
		<div class="flex items-center gap-3">
			<Target class="h-5 w-5 text-brand-400 shrink-0" />
			<h2 class="text-xl font-bold text-white">Investor Takeaway</h2>
		</div>
		<div class="rounded-xl border border-brand-500/40 bg-brand-600/10 p-6 space-y-5">
			<p class="text-sm text-white/70 leading-relaxed">
				The FLI Golf League is not launching with "developing talent." It is launching with proven champions across every category that matters to sponsors, broadcasters, and franchise buyers.
			</p>
			<div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
				{#each investorTakeaways as item}
					<div class="rounded-lg border {item.border} {item.bg} p-3 text-center">
						<svelte:component this={item.icon} class="h-5 w-5 {item.color} mx-auto mb-2" />
						<div class="text-xs font-semibold text-white/80 leading-snug">{item.label}</div>
					</div>
				{/each}
			</div>
			<div class="grid sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
				{#each [
					'Immediate credibility with sponsors and media partners',
					'Sponsorship leverage from day one',
					'Media rights negotiation power',
					'Long-term franchise asset stability',
				] as point}
					<div class="flex items-start gap-2.5">
						<CheckCircle2 class="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
						<span class="text-sm text-white/65 leading-snug">{point}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

</div>
