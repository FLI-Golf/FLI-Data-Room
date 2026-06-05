<script lang="ts">
	export let src: string | null | undefined = null;
	export let alt = 'Deck image';
	export let label = 'Replace image';
	export let containerClass = 'rounded-xl border border-white/10 bg-navy-900/40 p-3';
	export let imageClass = 'w-full max-h-[320px] object-cover rounded-lg';
	export let placeholderClass = 'h-64';
</script>

<div class={containerClass}>
	{#if src}
		<img src={src} alt={alt} class={imageClass} />
	{:else}
		<div class={`w-full ${placeholderClass} rounded-lg border-2 border-dashed border-white/20 bg-navy-950/40 px-4 text-center flex items-center justify-center`}>
			<div>
				<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">Replace image</p>
				<p class="mt-1 text-xs text-white/35">{label}</p>
			</div>
		</div>
	{/if}
</div>
