<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import * as LucideIcons from 'lucide-svelte';
	import { ICON_CATEGORIES, ICON_LIST } from '$lib/icons';
	import { Search, X } from 'lucide-svelte';

	export let value: string = '';        // currently selected icon name
	export let name: string = 'icon';     // hidden input name

	const dispatch = createEventDispatcher<{ change: string }>();

	let query = '';
	let activeCategory = 'All';

	$: categories = ['All', ...ICON_CATEGORIES.map(c => c.label)];

	$: filtered = (() => {
		let pool: string[];
		if (activeCategory === 'All') {
			pool = ICON_LIST;
		} else {
			pool = ICON_CATEGORIES.find(c => c.label === activeCategory)?.icons ?? [];
		}
		if (!query.trim()) return pool;
		const q = query.toLowerCase().replace(/\s+/g, '');
		return pool.filter(name =>
			name.toLowerCase().replace(/\s+/g, '').includes(q)
		);
	})();

	function select(icon: string) {
		value = icon;
		dispatch('change', icon);
	}

	function clear() {
		value = '';
		dispatch('change', '');
	}

	function getIcon(name: string) {
		return (LucideIcons as Record<string, unknown>)[name] as typeof LucideIcons.Star | undefined;
	}
</script>

<div class="space-y-3">
	<!-- Hidden input for form submission -->
	<input type="hidden" {name} value={value} />

	<!-- Selected preview -->
	{#if value}
		<div class="flex items-center gap-3 rounded-lg border border-yellow-500/25 bg-yellow-500/8 px-3 py-2.5">
			<div class="h-8 w-8 rounded-lg bg-yellow-500/15 flex items-center justify-center shrink-0">
				{#if getIcon(value)}
					<svelte:component this={getIcon(value)} class="h-4 w-4 text-yellow-400" />
				{/if}
			</div>
			<div class="flex-1 min-w-0">
				<div class="text-sm font-semibold text-white">{value}</div>
				<div class="text-xs text-white/40">Selected icon</div>
			</div>
			<button type="button" on:click={clear} class="text-white/30 hover:text-white transition-colors">
				<X class="h-4 w-4" />
			</button>
		</div>
	{:else}
		<div class="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/30">
			No icon selected — choose one below or leave blank
		</div>
	{/if}

	<!-- Search -->
	<div class="relative">
		<Search class="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30 pointer-events-none" />
		<input
			type="text"
			bind:value={query}
			placeholder="Search icons…"
			class="w-full rounded-md border border-white/15 bg-navy-800/60 pl-8 pr-3 py-2 text-sm text-white
				placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
		/>
		{#if query}
			<button type="button" on:click={() => query = ''} class="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
				<X class="h-3.5 w-3.5" />
			</button>
		{/if}
	</div>

	<!-- Category filter -->
	{#if !query}
		<div class="flex flex-wrap gap-1.5">
			{#each categories as cat}
				<button
					type="button"
					on:click={() => activeCategory = cat}
					class="rounded-full px-2.5 py-1 text-xs font-medium transition-colors
						{activeCategory === cat
							? 'bg-yellow-500 text-navy-950'
							: 'bg-white/8 text-white/50 hover:bg-white/12 hover:text-white'}"
				>
					{cat}
				</button>
			{/each}
		</div>
	{/if}

	<!-- Icon grid -->
	<div class="rounded-lg border border-white/10 bg-navy-800/40 p-2 max-h-56 overflow-y-auto">
		{#if filtered.length === 0}
			<div class="py-8 text-center text-sm text-white/25">No icons match "{query}"</div>
		{:else}
			<div class="grid grid-cols-8 sm:grid-cols-10 gap-1">
				{#each filtered as iconName}
					{@const icon = getIcon(iconName)}
					{#if icon}
						<button
							type="button"
							on:click={() => select(iconName)}
							title={iconName}
							class="group relative flex items-center justify-center rounded-lg p-2 transition-colors
								{value === iconName
									? 'bg-yellow-500/20 border border-yellow-500/40'
									: 'hover:bg-white/8 border border-transparent'}"
						>
							<svelte:component this={icon} class="h-4 w-4 {value === iconName ? 'text-yellow-400' : 'text-white/50 group-hover:text-white'}" />
							<!-- Tooltip -->
							<div class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50
								whitespace-nowrap rounded-md border border-white/15 bg-navy-950/95 px-2 py-1
								text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
								{iconName}
							</div>
						</button>
					{/if}
				{/each}
			</div>
		{/if}
	</div>

	<div class="text-xs text-white/25">{filtered.length} icon{filtered.length !== 1 ? 's' : ''}{query ? ` matching "${query}"` : activeCategory !== 'All' ? ` in ${activeCategory}` : ' available'}</div>
</div>
