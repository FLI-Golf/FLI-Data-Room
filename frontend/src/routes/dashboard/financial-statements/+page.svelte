<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	$: src = (data.content?.embedUrl as string) || 'https://fli-financials.netlify.app/';
</script>

<svelte:head>
	<title>Financial Statements — FLI Golf Data Room</title>
</svelte:head>

<div class="flex flex-col" style="height: calc(100vh - 4rem);">
	<div class="mb-4 shrink-0">
		<h1 class="text-3xl font-black text-white">Company Financial Statements</h1>
		<p class="mt-1 text-white/50">Income statement and balance sheet through FY 2025 and Q1 2026.</p>
	</div>

	<div class="flex-1 rounded-xl border border-white/15 overflow-hidden min-h-0">
		<iframe
			{src}
			title="FLI Golf Financial Statements"
			class="w-full h-full"
			frameborder="0"
		></iframe>
	</div>

	<p class="text-xs text-white/20 mt-3 shrink-0">All financial statements are confidential and subject to the NDA you accepted.</p>
</div>
