<script lang="ts">
	import { CheckCircle2 } from 'lucide-svelte';

	export let steps: string[];
	export let current: number = 0;

	function go(i: number) {
		if (i >= 0 && i < steps.length) current = i;
	}
</script>

<!-- Step indicator -->
<div class="flex items-center gap-0 mb-8 overflow-x-auto pb-1">
	{#each steps as label, i}
		<button
			type="button"
			on:click={() => go(i)}
			class="flex items-center gap-2 shrink-0 group"
		>
			<div class="flex items-center gap-2">
				<div class="h-7 w-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors shrink-0
					{i < current ? 'border-green-500 bg-green-500/20 text-green-400' :
					 i === current ? 'border-yellow-400 bg-yellow-500/15 text-yellow-400' :
					 'border-white/20 bg-white/5 text-white/30'}">
					{#if i < current}
						<CheckCircle2 class="h-3.5 w-3.5" />
					{:else}
						{i + 1}
					{/if}
				</div>
				<span class="text-xs font-medium hidden sm:block
					{i === current ? 'text-white' : i < current ? 'text-white/50' : 'text-white/25'}">
					{label}
				</span>
			</div>
		</button>
		{#if i < steps.length - 1}
			<div class="h-px w-6 mx-1 shrink-0 {i < current ? 'bg-green-500/40' : 'bg-white/10'}"></div>
		{/if}
	{/each}
</div>

<!-- Step content slot -->
<slot {current} {go} />

<!-- Navigation buttons -->
<div class="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
	<button
		type="button"
		on:click={() => go(current - 1)}
		disabled={current === 0}
		class="rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white/50 hover:text-white hover:border-white/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
	>
		← Previous
	</button>
	<span class="text-xs text-white/25">Step {current + 1} of {steps.length}</span>
	{#if current < steps.length - 1}
		<button
			type="button"
			on:click={() => go(current + 1)}
			class="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition-colors"
		>
			Next →
		</button>
	{:else}
		<slot name="submit-button">
			<button
				type="submit"
				class="rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-yellow-400 transition-colors"
			>
				Save All
			</button>
		</slot>
	{/if}
</div>
