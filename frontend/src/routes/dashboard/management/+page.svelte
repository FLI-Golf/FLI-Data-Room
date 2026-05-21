<script lang="ts">
	import { Briefcase, Mail, Linkedin, Upload } from 'lucide-svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	type Person = { name: string; title: string; bio: string; email?: string; linkedin?: string; photoUrl?: string; docId?: string; placeholder?: boolean };

	const PH = 'https://few-likely.pockethost.io/api/files/pbc_2274991674';

	const PLACEHOLDER_LEADERSHIP: (Person & { placeholder: boolean })[] = [
		{
			name: 'Andrew Panza', title: 'Chief Executive Officer', placeholder: false,
			email: 'andrew@fligolf.com',
			photoUrl: `${PH}/2w2p15w6l082ar0/a20hkdek87h2e13`,
			bio: `In the realm of entrepreneurship, Andrew's career has taken him from Buffalo, NY to the Hawaiian Islands. With a relentless dedication to propelling stagnant industries towards new horizons, Andrew is now positioned to assume leadership of the FLI Golf Tour.\n\nAs a professional in retail operations, Andrew has effectively managed an annual sales volume of $25 million and overseen a workforce of more than 250 employees as the Director of Retail Operations, all accomplished before reaching the age of 30. Currently, Andrew serves as the Executive Director of a major telecom company in Carlsbad, California. He also wears the hat of CEO at Sunsteps Entertainment Group, where he has successfully created three reality television shows that are currently in production.\n\nAndrew's business philosophy places a strong emphasis on cultivating mutually advantageous relationships, prioritizing the maximization of value for partners and sponsors. As an athlete, competition has been in Andrew's blood since birth. Playing disc golf growing up, he always felt that there was something missing in the sport — entertainment. By combining his love for thrilling entertainment and sports, Andrew has brought together a team of like-minded individuals to push the sport of Disc Golf to new heights.`,
		},
		{
			name: 'Corey La Russo', title: 'Chief Marketing Officer', placeholder: false,
			email: 'corey@fligolf.com',
			photoUrl: `${PH}/s1346gy1nksd26k/6cqirj5hls1y1b3`,
			bio: `Born in Los Angeles and grew up in Pacific Palisades, California. Son of former NBA All-Star the Late Rudy La Russo (Lakers 1959–1967, Warriors 1967–1970).\n\nCorey's career spans professional golf, sports broadcasting, and investment banking. He played on the South American, Canadian, and Asian Tours and attended PGA Tour qualifying school (1994, '95, '98, '99). He spent over 25 years with Fox Sports 910 and iHeart Radio/Media in Phoenix as Executive Producer and host of "Backspin the Golf Show." From 2000–2006 he served as President of Rudy La Russo and Associates World Basketball Representation, working with NBA GMs and international leagues across Spain and Italy.\n\nEducation: University of Arizona, Bachelor of Fine Arts, Broadcast Journalism '90; Loyola Marymount University, Graduate Broadcasting School '91.`,
		},
		{
			name: 'Dustin Dinsmore', title: 'Chief Technical Officer', placeholder: false,
			email: 'dustin@fligolf.com',
			photoUrl: `${PH}/d02fbv46o1iu34s/408z8ldfw882r2d`,
			bio: `With a driving passion for innovation, Dustin has carved a niche in the automotive industry, particularly in gift and loyalty card services. One of his hallmark contributions has been a transformative software package that ushered over 20 automotive dealerships into the digital age of loaner car monitoring — replacing a manual process with actionable daily insights, significant cost reductions, and streamlined operations.\n\nAs both an entrepreneur and developer, his mantra has always been solution-oriented. For more than a decade he has coded an array of diverse projects. Currently he is at the helm of building Fligolf.com and exploring Web3 technologies and how they can be integrated into existing systems.`,
		},
		{
			name: 'Mark Colman', title: 'Network / Channel Director', placeholder: false,
			email: 'mark@fligolf.com',
			photoUrl: `${PH}/n40892dz6qaz7p5/7ju4lre6232v70u`,
			bio: `With over 30 years of experience building sports networks and relationships with the largest sports broadcasting companies in the world, Mark will ensure FLI's channels and network contracts are created and secured.\n\nMSC Media Consultants, LLC — Principal (2022–Present). Spectrum Networks — VP of Engineering & Operations (2011–2022), managing 200+ staff and overseeing one of the first LEED Certified broadcast facilities supporting 22 digital/linear networks (Lakers, Dodgers, Hawaii Sports, Surf Channel). NBC Universal/Comcast — EVP Engineering & Operations (2005–2011), overseeing 10 regional sports networks, two national sports networks, and five general entertainment networks. Golf Channel — managed two facility expansions and a complete technical facility upgrade. Fox Sports Net/FX — VP of National Technical Operations (1997–2000).`,
		},
		{
			name: 'Jim Neely', title: 'Production Director', placeholder: false,
			email: 'jimn@puremobileproductions.com',
			photoUrl: `${PH}/ly034l10o9s90yw/5ed92w4vv81159j`,
			bio: `As President of Pure Mobile Productions, Jim brings over 30 years of invaluable experience in the television industry. He previously founded and led XXL Sports, packaging live television events for Real Salt Lake, Fox Sports Net, ESPN, and the WAC Conference.\n\nPure Mobile Productions has become a leader in live sports productions with contracts with ESPN, Fox Sports, and FanDuel — over 150 live sporting events annually spanning the NBA, MLS, NWSL, College Sports, Golf Channel, and MMA. Currently filming the AFC and NFC Championships and the Super Bowl.\n\nJim's role in business development and live event packaging positions Pure to secure dedicated broadcast time slots for FLI Golf tournaments on major sports networks.`,
		},
		{
			name: 'Ina Masten', title: 'Director of Finance', placeholder: false,
			email: 'inam@mastensolutions.com',
			photoUrl: `${PH}/2cs0k14sobpv6ra/12om05d3ql9r2gb`,
			bio: `Ina Masten leads Masten Solutions, providing Interim and Fractional CFO services to companies that need financial leadership without the overhead of a full-time hire.\n\nWith over 35 years of experience working for Fortune 500 companies, healthcare organizations, and family-owned businesses, Ina oversees all financial matters — from budgeting and forecasting to investor relation strategies and risk management — ensuring the company's financial health and stability while making strategic decisions to drive growth and profitability.`,
		},
		{
			name: 'Gary Santos', title: 'Director of Tribal & Gaming Relations', placeholder: false,
			email: 'garygsantos1978@gmail.com',
			photoUrl: `${PH}/v4y92n8e857jgz3/8w8md5nn8c0bp41`,
			bio: `Industry leader with more than 23 years of leadership experience. Gary has served the Tule River Indian Tribe of California in multiple roles including Council Member, Vice Chairman, Treasurer, and Gaming Commissioner — overseeing tribal governance, regulatory compliance, and policy development. He helped manage a $47 million tribal budget and chaired the Tribe's casino relocation project. Gary has also served on the board of the Indian Gaming Association for over 10 years, bringing extensive experience in tribal governance, gaming regulation, and strategic partnerships with tribal, local, state, and federal organizations.`,
		},
		{
			name: 'Stephen A. Crystal, ESQ.', title: 'Gaming & Legal Advisor', placeholder: false,
			email: 'Stephen.Crystal@sccgmanagement.com',
			photoUrl: `${PH}/15r1u1462ts14iu/9n843a330dbid2p`,
			bio: `Stephen A. Crystal is a 30-year veteran of the gaming industry. He previously served as president and CEO of multiple casino holding and public gaming technology companies, and worked as an investor and advisor on gaming project finance and merger acquisitions totaling more than $4 billion. He has served as a licensed president, owner, and operator of four casinos in Downtown Las Vegas.\n\nCurrently, Stephen represents, consults with, and invests in gaming clients worldwide — covering casino development, internet gaming, gaming technology, governmental affairs and lobbying, strategic planning, mergers and acquisitions, and capital raising.`,
		},
	];
	const PLACEHOLDER_ADVISORS: (Person & { placeholder: boolean })[] = [];
	const PLACEHOLDER_DIRECTORS: (Person & { placeholder: boolean })[] = [];

	$: rawLeadership = (data.content?.leadership as Person[]) ?? [];
	$: rawAdvisors   = (data.content?.advisors   as Person[]) ?? [];
	$: rawDirectors  = (data.content?.directors  as Person[]) ?? [];

	$: leadership = rawLeadership.length > 0
		? rawLeadership.map(p => ({ ...p, placeholder: false }))
		: PLACEHOLDER_LEADERSHIP;
	$: advisors = rawAdvisors.length > 0
		? rawAdvisors.map(p => ({ ...p, placeholder: false }))
		: PLACEHOLDER_ADVISORS;
	$: directors = rawDirectors.length > 0
		? rawDirectors.map(p => ({ ...p, placeholder: false }))
		: PLACEHOLDER_DIRECTORS;

	$: hasData = true; // Real data is hardcoded above
</script>

<svelte:head>
	<title>Management & Team — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-4xl space-y-12">
	<div>
		<h1 class="text-3xl font-black text-white">Management & Team</h1>
		<p class="mt-1 text-white/50">Detailed resumes and bios for FLI Golf's leadership, advisors, and board of directors.</p>
	</div>

	{#if !hasData}
	<!-- Admin upload notice — only shown when no data entered yet -->
	<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5 flex items-start gap-3">
		<Upload class="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
		<div>
			<div class="text-sm font-semibold text-yellow-400 mb-1">Content Not Yet Entered</div>
			<p class="text-xs text-white/50 leading-relaxed">
				Go to <a href="/admin/content/management" class="text-yellow-400 hover:text-yellow-300 underline">Admin → Content Editor → Management & Team</a>
				to enter leadership bios, advisor profiles, and board member details.
			</p>
		</div>
	</div>
	{/if}

	<!-- Leadership -->
	<section id="leadership">
		<h2 class="text-xl font-bold text-white mb-5 flex items-center gap-2">
			<Briefcase class="h-5 w-5 text-brand-400" />
			Leadership Team
		</h2>
		<div class="space-y-4">
			{#each leadership as person}
				<div class="rounded-xl border {person.placeholder ? 'border-white/10 border-dashed' : 'border-white/15'} bg-navy-700/50 p-6">
					<div class="flex items-start justify-between gap-4 mb-3">
						<div>
							<div class="flex items-center gap-2">
								{#if person.photoUrl && !person.placeholder}
									<img src={person.photoUrl} alt={person.name} class="h-10 w-10 rounded-full object-cover border border-white/20 shrink-0" />
								{:else}
									<div class="h-10 w-10 rounded-full bg-brand-600/30 border border-brand-500/40 flex items-center justify-center text-sm font-black text-brand-400 shrink-0">
										{person.placeholder ? '?' : person.name.charAt(0)}
									</div>
								{/if}
								<div>
									<div class="text-base font-bold text-white {person.placeholder ? 'opacity-40' : ''}">{person.name}</div>
									<div class="text-xs text-white/40">{person.title}</div>
								</div>
							</div>
						</div>
						{#if !person.placeholder}
							<div class="flex items-center gap-2 shrink-0">
								{#if person.email}
									<a href="mailto:{person.email}" class="rounded-md border border-white/15 p-1.5 text-white/40 hover:text-white hover:border-white/30 transition-colors">
										<Mail class="h-3.5 w-3.5" />
									</a>
								{/if}
								{#if person.linkedin}
									<a href={person.linkedin} target="_blank" rel="noopener" class="rounded-md border border-white/15 p-1.5 text-white/40 hover:text-white hover:border-white/30 transition-colors">
										<Linkedin class="h-3.5 w-3.5" />
									</a>
								{/if}
							</div>
						{/if}
					</div>
					<p class="text-sm text-white/50 leading-relaxed whitespace-pre-line {person.placeholder ? 'italic' : ''}">{person.bio}</p>
					{#if !person.placeholder}
						<div class="mt-4 pt-4 border-t border-white/10">
							<a href="#" class="text-xs text-brand-400 hover:text-brand-300 font-medium transition-colors">
								View Full Resume / CV →
							</a>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- Advisors -->
	<section id="advisors">
		<h2 class="text-xl font-bold text-white mb-5">Advisory Board</h2>
		<div class="grid sm:grid-cols-2 gap-4">
			{#each advisors as person}
				<div class="rounded-xl border {person.placeholder ? 'border-white/10 border-dashed' : 'border-white/15'} bg-navy-700/50 p-5">
					<div class="flex items-center gap-3 mb-3">
						{#if person.photoUrl && !person.placeholder}
							<img src={person.photoUrl} alt={person.name} class="h-9 w-9 rounded-full object-cover border border-white/20 shrink-0" />
						{:else}
							<div class="h-9 w-9 rounded-full bg-fli-blue-700/30 border border-fli-blue-600/30 flex items-center justify-center text-xs font-black text-fli-blue-300 shrink-0">
								{person.placeholder ? '?' : person.name.charAt(0)}
							</div>
						{/if}
						<div>
							<div class="text-sm font-bold text-white {person.placeholder ? 'opacity-40' : ''}">{person.name}</div>
							<div class="text-xs text-white/40">{person.title}</div>
						</div>
					</div>
					<p class="text-xs text-white/50 leading-relaxed {person.placeholder ? 'italic' : ''}">{person.bio}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Directors -->
	<section id="directors">
		<h2 class="text-xl font-bold text-white mb-5">Board of Directors</h2>
		<div class="space-y-4">
			{#each directors as person}
				<div class="rounded-xl border {person.placeholder ? 'border-white/10 border-dashed' : 'border-white/15'} bg-navy-700/50 p-5">
					<div class="flex items-center gap-3 mb-3">
						{#if person.photoUrl && !person.placeholder}
							<img src={person.photoUrl} alt={person.name} class="h-9 w-9 rounded-full object-cover border border-white/20 shrink-0" />
						{:else}
							<div class="h-9 w-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs font-black text-white/50 shrink-0">
								{person.placeholder ? '?' : person.name.charAt(0)}
							</div>
						{/if}
						<div>
							<div class="text-sm font-bold text-white {person.placeholder ? 'opacity-40' : ''}">{person.name}</div>
							<div class="text-xs text-white/40">{person.title}</div>
						</div>
					</div>
					<p class="text-xs text-white/50 leading-relaxed {person.placeholder ? 'italic' : ''}">{person.bio}</p>
				</div>
			{/each}
		</div>
	</section>

	<p class="text-xs text-white/20">All biographical information is confidential and subject to the NDA you accepted.</p>
</div>
