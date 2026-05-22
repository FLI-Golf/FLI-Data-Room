<script lang="ts">
	import { BarChart2, TrendingUp, Upload, ExternalLink, X, ChevronRight } from 'lucide-svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	const keyStats = [
		{ value: '20M+',    label: 'Active disc golfers worldwide (2024)' },
		{ value: '86%',     label: 'Participation growth since 2020' },
		{ value: '17,000+', label: 'Courses across 99 countries' },
		{ value: '$18B+',   label: 'Serviceable addressable market by 2030' },
	];

	type Report = { title: string; source: string; year: string; description: string; url: string; docId: string; proprietary: boolean };

	const PLACEHOLDER_REPORTS: Report[] = [
		{
			title: 'PDGA Growth & Participation Report',
			source: 'Professional Disc Golf Association',
			year: '2024',
			description: 'Annual membership and course registration data showing 86% participation growth since 2020.',
			url: 'https://udisc.com/disc-golf-growth-report',
			docId: '',
			proprietary: false,
		},
		{
			title: 'Global Sports Betting Market Forecast',
			source: 'Industry Research Firm',
			year: '2024–2030',
			description: 'Market sizing for the $187B+ global sports betting industry and addressable segments for emerging sports leagues.',
			url: 'https://fli-bp.netlify.app/global',
			docId: '',
			proprietary: false,
		},
		{
			title: 'FLI Golf — Industry Growth & Dynamics Report',
			source: 'FLI Golf / AI-Assisted Analysis',
			year: '2025',
			description: "Proprietary growth analysis covering disc golf market dynamics, competitive landscape, and FLI's addressable opportunity.",
			url: '',
			docId: '',
			proprietary: true,
		},
	];

	$: reports = ((data.content?.reports as Report[]) ?? []).length > 0
		? (data.content?.reports as Report[])
		: PLACEHOLDER_REPORTS;

	$: hasData = ((data.content?.reports as Report[]) ?? []).length > 0;

	let activeEmbed: Report | null = null;
</script>

<svelte:head>
	<title>Industry Reports — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-4xl space-y-10">
	<div>
		<h1 class="text-3xl font-black text-white">Industry Reports & Analysis</h1>
		<p class="mt-1 text-white/50">Market research, growth data, and industry analysis supporting the FLI investment thesis.</p>
	</div>

	<!-- Key stats -->
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
		{#each keyStats as stat}
			<div class="rounded-xl border border-white/15 bg-navy-700/50 p-4 text-center">
				<div class="text-2xl font-black text-white">{stat.value}</div>
				<div class="text-xs text-white/40 mt-1 leading-snug">{stat.label}</div>
			</div>
		{/each}
	</div>

	{#if !hasData}
	<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5 flex items-start gap-3">
		<Upload class="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
		<div>
			<div class="text-sm font-semibold text-yellow-400 mb-1">Reports Not Yet Entered</div>
			<p class="text-xs text-white/50 leading-relaxed">
				Go to <a href="/admin/content/industry-reports" class="text-yellow-400 hover:text-yellow-300 underline">Admin → Content Editor → Industry Reports</a> to add report details and link uploaded PDFs.
			</p>
		</div>
	</div>
	{/if}

	<!-- Report cards -->
	<div class="space-y-3">
		{#each reports as report}
			<div class="rounded-xl border {report.proprietary ? 'border-brand-600/30 bg-brand-600/10' : 'border-white/15 bg-navy-700/50'} overflow-hidden">
				<div class="p-5 flex items-start justify-between gap-4">
					<div class="flex items-start gap-3 min-w-0">
						<div class="h-9 w-9 rounded-lg {report.proprietary ? 'bg-brand-600/30' : 'bg-white/8'} flex items-center justify-center shrink-0 mt-0.5">
							{#if report.proprietary}
								<TrendingUp class="h-4 w-4 text-brand-400" />
							{:else}
								<BarChart2 class="h-4 w-4 text-white/40" />
							{/if}
						</div>
						<div class="min-w-0">
							<div class="text-sm font-bold text-white leading-snug">{report.title}</div>
							<div class="text-xs text-white/40 mt-0.5">{report.source}{report.year ? ' · ' + report.year : ''}</div>
							{#if report.description}<p class="text-xs text-white/50 mt-2 leading-relaxed">{report.description}</p>{/if}
						</div>
					</div>
					<div class="shrink-0 flex items-center gap-2">
						{#if report.url}
							<button
								on:click={() => activeEmbed = activeEmbed?.url === report.url ? null : report}
								class="flex items-center gap-1.5 rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-500 transition-colors"
							>
								{#if activeEmbed?.url === report.url}
									<X class="h-3 w-3" /> Close
								{:else}
									<ChevronRight class="h-3 w-3" /> View
								{/if}
							</button>
							<a href={report.url} target="_blank" rel="noopener noreferrer"
								class="flex items-center gap-1 rounded-md border border-white/15 px-2.5 py-1.5 text-xs text-white/40 hover:text-white hover:border-white/30 transition-colors"
								title="Open in new tab"
							>
								<ExternalLink class="h-3 w-3" />
							</a>
						{:else if report.docId}
							<a href="/api/documents/{report.docId}" target="_blank" class="flex items-center gap-1.5 rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-500 transition-colors">
								<ExternalLink class="h-3 w-3" /> View PDF
							</a>
						{:else}
							<span class="rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium text-white/25 border-dashed">Pending upload</span>
						{/if}
					</div>
				</div>

				<!-- Inline embed panel -->
				{#if activeEmbed?.url === report.url}
					<div class="border-t border-white/10" style="height:600px">
						<iframe
							src={report.url}
							title={report.title}
							class="w-full h-full"
							frameborder="0"
						></iframe>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<p class="text-xs text-white/20">All reports are confidential and subject to the NDA you accepted. Do not distribute.</p>
</div>
