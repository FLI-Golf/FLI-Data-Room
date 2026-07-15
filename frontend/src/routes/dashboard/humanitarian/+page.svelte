<script lang="ts">
	import {
		Heart, Users, Accessibility, Leaf, Globe, Zap, TrendingUp,
		HandHeart, Building2, Shield, Star, CheckCircle2
	} from 'lucide-svelte';

	const pillars = [
		{
			icon: Users,
			color: 'text-brand-400',
			border: 'border-brand-500/40',
			bg: 'bg-brand-600/8',
			title: 'Equality & Representation',
			body: 'The first professional sports league designed from inception for gender equality. Equal contracts, prize pools, and sponsorship exposure for male and female athletes. International recruitment amplifies diverse voices on a world stage.'
		},
		{
			icon: Accessibility,
			color: 'text-fli-blue-400',
			border: 'border-fli-blue-500/40',
			bg: 'bg-fli-blue-800/10',
			title: 'Disability Accessibility',
			body: 'Fully ADA-compliant stadium-style par-3 courses with wheelchair-accessible paths and seating. Adaptive programming, sensory-friendly spectator zones, and youth programs — the first pro sport designed from inception with the disabled community in mind.'
		},
		{
			icon: Heart,
			color: 'text-red-400',
			border: 'border-red-500/40',
			bg: 'bg-red-500/8',
			title: 'Health & Wellness',
			body: "Disc golf promotes cardiovascular health, coordination, and low-impact activity for all ages. Equipment starts at $20 — the lowest entry point in recreational sports globally — ensuring affordability for families across all income levels."
		},
		{
			icon: Zap,
			color: 'text-yellow-400',
			border: 'border-yellow-500/40',
			bg: 'bg-yellow-500/8',
			title: 'Economic & Job Creation',
			body: 'Every event creates hundreds of jobs: camera crews, production staff, concessions, security, and operations. Local businesses benefit directly from vendor booths, food trucks, and sponsorship opportunities built into the fan experience.'
		},
		{
			icon: Building2,
			color: 'text-orange-400',
			border: 'border-orange-500/40',
			bg: 'bg-orange-500/8',
			title: 'Native American Partnership',
			body: 'Tribally owned casinos serve as anchor tour locations. The league will sell its 12 teams to pre-vetted tribally owned casinos for $10M each over three seasons — directing franchise wealth directly into Native communities and creating generational wealth.'
		},
		{
			icon: Leaf,
			color: 'text-green-400',
			border: 'border-green-500/40',
			bg: 'bg-green-500/8',
			title: 'Environmental Impact',
			body: 'No heavy irrigation, chemical fertilizers, or permanent land alteration. Temporary courses inside existing venues minimize disruption. Eco-friendly fan engagement through recycling programs, reusable merchandise, and sustainable vendor practices.'
		},
		{
			icon: Star,
			color: 'text-purple-400',
			border: 'border-purple-500/40',
			bg: 'bg-purple-500/8',
			title: 'Youth & Community',
			body: "Youth clinics, adaptive camps, and school programs at every stop to introduce the sport to underserved communities. Disc golf's affordability makes it easy to integrate into physical education programs worldwide."
		},
		{
			icon: Globe,
			color: 'text-cyan-400',
			border: 'border-cyan-500/40',
			bg: 'bg-cyan-500/8',
			title: 'Global Reach',
			body: 'Over 20 million players worldwide with exponential growth. Cultural icons including Jimmy Fallon, Brad Pitt, and Bill Nye have highlighted the sport. International streaming ensures the league reaches fans across borders.'
		}
	];

	const partners = [
		{ num: 1, name: 'Operation Support Our Veterans (OSOV)', category: 'Veterans', desc: 'Direct services to veterans in healthcare, housing, food security, and reintegration into civilian life.' },
		{ num: 2, name: 'Fisher House Foundation', category: 'Veterans', desc: '"Homes away from home" near hospitals, allowing military families to stay together and heal together.' },
		{ num: 3, name: 'Move United', category: 'Adaptive Sports', desc: 'National leader in adaptive sports connecting athletes with physical disabilities to inclusive competitive opportunities.' },
		{ num: 4, name: 'Challenged Athletes Foundation', category: 'Adaptive Sports', desc: 'Helps individuals with physical challenges afford adaptive gear, training, and competition entry fees.' },
		{ num: 5, name: 'National Alliance on Mental Illness (NAMI)', category: 'Mental Health', desc: 'Education, advocacy, and peer-support programs promoting mental health awareness.' },
		{ num: 6, name: 'American Foundation for Suicide Prevention (AFSP)', category: 'Mental Health', desc: 'Research, awareness, and community programs to prevent suicide and reduce stigma.' },
		{ num: 7, name: 'Easterseals', category: 'Disability', desc: 'Therapy, education, and workforce programs for children and adults with disabilities.' },
		{ num: 8, name: 'Twila True / True Sioux Hope Foundation', category: 'Native American', desc: 'Aid, education, and empowerment for Native Americans, especially in Pine Ridge.' },
		{ num: 9, name: 'Native American Rights Fund (NARF)', category: 'Native American', desc: 'Legal advocacy for tribes and Native individuals, protecting sovereignty and civil rights.' },
		{ num: 10, name: 'Boys & Girls Clubs of America', category: 'Youth', desc: 'Safe after-school spaces with mentorship, sports, and educational opportunities for millions of youth.' },
		{ num: 11, name: 'Girls Who Code', category: 'Youth', desc: 'Coding, STEM training, and confidence-building programs giving girls access to compete globally.' },
		{ num: 12, name: 'Habitat for Humanity', category: 'Housing', desc: 'Affordable housing build projects giving families safe places to live.' },
		{ num: 13, name: 'Feeding America', category: 'Hunger Relief', desc: 'Nationwide food bank network fighting hunger in the cities the league tours.' },
		{ num: 14, name: 'International Rescue Committee (IRC)', category: 'Global Relief', desc: 'Crisis relief to refugees and families displaced by conflict and disasters worldwide.' },
		{ num: 15, name: 'Direct Relief', category: 'Global Relief', desc: 'Medical aid and disaster response globally, mobilizing supplies for frontline workers.' },
		{ num: 16, name: 'The Nature Conservancy', category: 'Environment', desc: 'Protecting land, water, and biodiversity for future generations.' },
		{ num: 17, name: 'Doctors Without Borders (MSF)', category: 'Global Relief', desc: 'Emergency medical care where it is needed most, spotlighted through campaigns and donations.' },
		{ num: 18, name: 'Shatterproof', category: 'Recovery', desc: 'Fights addiction stigma while expanding access to treatment and recovery programs.' },
		{ num: 19, name: 'National Council on Problem Gambling (NCPG)', category: 'Recovery', desc: 'Prevention, education, and treatment programs supporting responsible gambling — integral for casino-hosted events.' },
		{ num: 20, name: 'The Trevor Project', category: 'LGBTQ+', desc: '24/7 crisis support for LGBTQ+ youth — the leading suicide-prevention organization for this community.' },
		{ num: 21, name: "Women's Sports Foundation", category: 'Gender Equity', desc: 'Founded by Billie Jean King. Funds grants and advocates for equal opportunity in sports for women and girls.' },
		{ num: 22, name: 'Year Up', category: 'Youth', desc: 'Training and corporate internships for young adults, with pathways into sports media, event management, and tech.' },
		{ num: 23, name: 'Homeboy Industries', category: 'Re-Entry', desc: 'Re-entry, rehabilitation, and workforce development for formerly incarcerated individuals.' },
		{ num: 24, name: 'American Association of People with Disabilities (AAPD)', category: 'Disability', desc: 'National disability-led advocacy for civil rights and accessibility, making disc golf the most accessible pro sport.' }
	];

	const categoryColors: Record<string, string> = {
		'Veterans':      'bg-blue-500/20 text-blue-300',
		'Adaptive Sports': 'bg-purple-500/20 text-purple-300',
		'Mental Health': 'bg-pink-500/20 text-pink-300',
		'Disability':    'bg-cyan-500/20 text-cyan-300',
		'Native American': 'bg-orange-500/20 text-orange-300',
		'Youth':         'bg-yellow-500/20 text-yellow-300',
		'Housing':       'bg-amber-500/20 text-amber-300',
		'Hunger Relief': 'bg-red-500/20 text-red-300',
		'Global Relief': 'bg-teal-500/20 text-teal-300',
		'Environment':   'bg-green-500/20 text-green-300',
		'Recovery':      'bg-violet-500/20 text-violet-300',
		'LGBTQ+':        'bg-rose-500/20 text-rose-300',
		'Gender Equity': 'bg-fuchsia-500/20 text-fuchsia-300',
		'Re-Entry':      'bg-slate-500/20 text-slate-300'
	};
</script>

<svelte:head>
	<title>Humanitarian Prospectus — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-12">

	<!-- Header -->
	<div id="overview">
		<div class="flex items-center gap-3 mb-3">
			<HandHeart class="h-7 w-7 text-brand-400 shrink-0" />
			<h1 class="text-3xl font-black text-white">Humanitarian Prospectus</h1>
		</div>
		<p class="text-white/40 text-sm mb-4 italic">Prepared by FGL Executive Staff</p>
		<p class="text-white/60 leading-relaxed max-w-3xl">
			The FLI Golf League is more than a sports league — it is a global humanitarian project designed
			to transform professional sports into a platform of equality, accessibility, and opportunity.
			By creating the first professional disc golf league that pays men and women equally, embraces
			full accessibility for disabled communities, and partners with Native American nations as hosts
			and franchise owners, the league sets a new standard for what sports can achieve socially,
			economically, and culturally.
		</p>
		<div class="mt-6 grid grid-cols-3 gap-4">
			<div class="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
				<div class="text-2xl font-black text-brand-400">20M+</div>
				<div class="text-xs text-white/50 mt-1">Disc golf players worldwide</div>
			</div>
			<div class="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
				<div class="text-2xl font-black text-fli-blue-400">24</div>
				<div class="text-xs text-white/50 mt-1">Humanitarian partner organizations</div>
			</div>
			<div class="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
				<div class="text-2xl font-black text-green-400">$20</div>
				<div class="text-xs text-white/50 mt-1">Lowest entry cost in pro sports</div>
			</div>
		</div>
	</div>

	<!-- 8 Pillars -->
	<div id="pillars">
		<h2 class="text-lg font-bold text-white mb-5">Eight Pillars of Impact</h2>
		<div class="grid sm:grid-cols-2 gap-5">
			{#each pillars as p}
				<div class="rounded-xl border {p.border} {p.bg} p-6">
					<div class="flex items-center gap-3 mb-3">
						<svelte:component this={p.icon} class="h-5 w-5 {p.color} shrink-0" />
						<span class="font-bold text-white">{p.title}</span>
					</div>
					<p class="text-sm text-white/60 leading-relaxed">{p.body}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Player-Driven Giving Program -->
	<div id="giving-program" class="rounded-xl border border-brand-500/30 bg-brand-600/5 p-8">
		<div class="flex items-center gap-3 mb-4">
			<Heart class="h-6 w-6 text-brand-400 shrink-0" />
			<h2 class="text-xl font-bold text-white">Player-Driven Humanitarian Giving Program</h2>
		</div>
		<div class="space-y-4 text-sm text-white/65 leading-relaxed">
			<p>
				Each of FLI's <strong class="text-white">24 professional players</strong> selects one of
				the 24 humanitarian partner organizations for every tournament of the season. A designated
				portion of their tournament winnings is donated directly to their chosen nonprofit — ensuring
				every competition carries direct and measurable impact beyond the course.
			</p>
			<p>
				Before and during each event, players publicly share which organization they chose and why
				it matters to them personally. Through live broadcasts, social media, tournament interviews,
				and in-arena promotions, fans connect with players on a deeper human level — learning about
				the causes that move them.
			</p>
			<p>
				Sponsors and fans are encouraged to <strong class="text-white">match player donations</strong>,
				creating a multiplying effect. Over a full season this could result in <strong class="text-white">millions of dollars</strong> directed
				to 24 diverse humanitarian efforts — veterans' care, Native American rights, addiction recovery,
				suicide prevention, housing, hunger relief, and more.
			</p>
		</div>
		<div class="mt-6 grid grid-cols-3 gap-4">
			<div class="rounded-lg bg-white/5 p-4 text-center">
				<div class="text-xl font-black text-brand-400">24</div>
				<div class="text-xs text-white/50 mt-1">Players × 24 Partners</div>
			</div>
			<div class="rounded-lg bg-white/5 p-4 text-center">
				<div class="text-xl font-black text-green-400">Match</div>
				<div class="text-xs text-white/50 mt-1">Sponsor matching program</div>
			</div>
			<div class="rounded-lg bg-white/5 p-4 text-center">
				<div class="text-xl font-black text-fli-blue-400">Every</div>
				<div class="text-xs text-white/50 mt-1">Tournament is a fundraiser</div>
			</div>
		</div>
	</div>

	<!-- 24 Partner Organizations -->
	<div id="partners">
		<h2 class="text-lg font-bold text-white mb-2">24 Target Humanitarian Partners</h2>
		<p class="text-sm text-white/40 mb-5">Each player selects one partner per tournament. Every partner receives direct donations, visibility, and platform amplification.</p>
		<div class="grid sm:grid-cols-2 gap-3">
			{#each partners as p}
				<div class="rounded-xl border border-white/8 bg-white/[0.03] p-4 flex gap-4">
					<div class="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/50">
						{p.num}
					</div>
					<div>
						<div class="flex items-center gap-2 flex-wrap mb-1">
							<span class="text-sm font-semibold text-white">{p.name}</span>
							<span class="text-xs px-2 py-0.5 rounded-full {categoryColors[p.category] ?? 'bg-white/10 text-white/50'}">{p.category}</span>
						</div>
						<p class="text-xs text-white/50 leading-relaxed">{p.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Closing Statement -->
	<div id="closing" class="rounded-xl border border-white/10 bg-white/[0.02] p-8">
		<div class="flex items-center gap-3 mb-4">
			<TrendingUp class="h-5 w-5 text-brand-400 shrink-0" />
			<h2 class="text-lg font-bold text-white">Long-Term Global Impact</h2>
		</div>
		<p class="text-sm text-white/65 leading-relaxed mb-4">
			The FLI Golf League is more than a sports organization — it is a movement designed to reshape
			what professional sports can achieve. By combining gender equality, accessibility for disabled
			communities, partnerships with Native American nations, sustainability, and affordable global
			participation, the league creates a legacy of humanitarian impact.
		</p>
		<p class="text-sm text-white/65 leading-relaxed mb-6">
			Its model demonstrates that sports can be both profitable and socially transformative, setting
			a precedent for other leagues and industries. With team sales to tribal nations ensuring investor
			returns and a league sale or IPO creating long-term upside, the FLI Golf League is poised to
			become one of the most impactful and culturally significant sports organizations in modern history.
		</p>
		<div class="flex items-start gap-3 p-4 rounded-lg bg-brand-600/10 border border-brand-500/30">
			<CheckCircle2 class="h-5 w-5 text-brand-400 shrink-0 mt-0.5" />
			<p class="text-sm text-white/70 leading-relaxed">
				<strong class="text-white">Investor alignment:</strong> By securing majority ownership
				and supporting this project, investors not only achieve a clear financial exit through
				team sales and a league sale/IPO — they play a defining role in launching a
				humanitarian-driven league that celebrities, athletes, and millions of fans will want to be part of.
			</p>
		</div>
	</div>

	<p class="text-xs text-white/25">FLI Golf League — Humanitarian Prospectus. Prepared by FGL Executive Staff, 2025–2026.</p>
</div>
