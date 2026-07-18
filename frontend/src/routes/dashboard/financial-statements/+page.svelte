<script lang="ts">
	import type { PageData } from './$types';
	import { FileText, TrendingUp, Calendar, CheckCircle2, ArrowRight, Clock } from 'lucide-svelte';
	export let data: PageData;

	$: hasEmbed = !!(data.content?.embedUrl as string);
	$: src = (data.content?.embedUrl as string) || '';
</script>

<svelte:head>
	<title>Financial Statements — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-5xl space-y-8">

	<div>
		<h1 class="text-3xl font-black text-white">Company Financial Statements</h1>
		<p class="mt-1 text-white/50">Income statement and balance sheet · FY 2024 – Q1 2026</p>
	</div>

	{#if hasEmbed}
	<div class="rounded-xl border border-white/15 overflow-hidden" style="height: calc(100vh - 12rem);">
		<iframe {src} title="FLI Golf Financial Statements" class="w-full h-full" frameborder="0"></iframe>
	</div>
	{:else}
	<!-- Pending state -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-10 text-center space-y-4">
		<div class="h-14 w-14 rounded-full bg-brand-600/15 border border-brand-500/30 flex items-center justify-center mx-auto">
			<FileText class="h-7 w-7 text-brand-400" />
		</div>
		<div>
			<div class="text-lg font-bold text-white">Audited Statements Pending</div>
			<p class="text-sm text-white/45 mt-1 max-w-md mx-auto">Historical income statement and balance sheet are being prepared by our accountant. They will be published here upon completion.</p>
		</div>
		<div class="flex items-center justify-center gap-2 text-xs text-yellow-400">
			<Clock class="h-3.5 w-3.5" />
			<span>Expected: Q3 2026 · Prepared by CPA</span>
		</div>
	</div>

	<!-- What will be here -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6">
		<div class="flex items-center gap-2 mb-4">
			<Calendar class="h-5 w-5 text-white/40" />
			<h2 class="text-base font-bold text-white">What Will Be Published Here</h2>
		</div>
		<div class="grid sm:grid-cols-2 gap-3">
			{#each [
				{ title: 'Income Statement',    detail: 'Revenue, COGS, operating expenses, and net income/loss for FY 2024, FY 2025, and Q1 2026' },
				{ title: 'Balance Sheet',       detail: 'Assets, liabilities, and equity position as of the most recent period end' },
				{ title: 'Cash Flow Statement', detail: 'Operating, investing, and financing activities — showing how capital has been deployed' },
				{ title: 'Notes & Disclosures', detail: 'Accounting policies, material commitments, and any contingent liabilities' },
			] as item}
				<div class="flex items-start gap-3 rounded-lg border border-white/8 bg-white/3 p-4">
					<CheckCircle2 class="h-4 w-4 text-white/20 shrink-0 mt-0.5" />
					<div>
						<div class="text-sm font-semibold text-white">{item.title}</div>
						<div class="text-xs text-white/40 mt-0.5 leading-relaxed">{item.detail}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Context for investors -->
	<div class="rounded-xl border border-brand-500/30 bg-brand-600/6 p-6">
		<div class="flex items-center gap-2 mb-3">
			<TrendingUp class="h-5 w-5 text-brand-400" />
			<h2 class="text-base font-bold text-white">Context for Investors</h2>
		</div>
		<div class="space-y-3">
			{#each [
				'FLI Golf League is a pre-revenue company. FY 2024 and FY 2025 reflect formation and pre-launch operating expenses only.',
				'The $7.5M seed round (Q3 2026) is the first institutional capital raise. No prior equity rounds have been completed.',
				'Forward-looking financial projections — including the full 2026–2031 P&L model — are available in the CPA Financials section.',
				'No outstanding debt obligations. The company is debt-free entering the seed round.',
			] as point}
				<div class="flex items-start gap-3">
					<CheckCircle2 class="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
					<span class="text-sm text-white/60 leading-relaxed">{point}</span>
				</div>
			{/each}
		</div>
		<div class="mt-5">
			<a href="/dashboard/cpa-financials" class="flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 transition-colors w-fit">
				View CPA Financial Projections <ArrowRight class="h-4 w-4" />
			</a>
		</div>
	</div>
	{/if}

	<p class="text-xs text-white/20">All financial statements are confidential and subject to the NDA you accepted.</p>
</div>
