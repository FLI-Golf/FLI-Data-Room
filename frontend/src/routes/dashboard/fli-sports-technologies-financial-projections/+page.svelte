<script lang="ts">
	import type { PageData } from './$types';
	import SportsProjections from '$lib/components/SportsProjections.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>FLI Sports Technologies Financial Projections | Investor Data Room</title>
</svelte:head>

<div class="max-w-6xl min-w-0 lg:ml-8 xl:ml-16 2xl:ml-24">
	{#key data.sportsProjections?.fetchedAt}
		<SportsProjections projections={data.sportsProjections} sourceUrl={data.sportsProjectionsSource} />
	{/key}
</div>