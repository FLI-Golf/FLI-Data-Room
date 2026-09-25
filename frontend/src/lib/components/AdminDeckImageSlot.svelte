<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Upload, Copy, Check, Sparkles, AlertCircle } from 'lucide-svelte';
	import DeckImageSlot from './DeckImageSlot.svelte';

	export let src: string | null | undefined = null;
	export let alt = 'Deck image';
	export let name: string;
	export let prompt = '';
	export let isAdmin = false;
	export let tag: 'logo' | 'team' | 'background' | 'celebrity' | 'sponsor' | 'misc' = 'background';
	export let label = 'Replace image';
	export let containerClass = 'rounded-xl border border-white/10 bg-navy-900/40 p-3';
	export let imageClass = 'w-full max-h-[320px] object-cover rounded-lg';
	export let placeholderClass = 'h-64';

	let showUploadForm = false;
	let copied = false;
	let uploading = false;
	let uploadError: string | null = null;

	function copyPrompt() {
		navigator.clipboard.writeText(prompt).then(() => {
			copied = true;
			setTimeout(() => (copied = false), 1500);
		});
	}
</script>

<div class="space-y-2">
	{#if isAdmin}
		<button
			type="button"
			on:click={() => (showUploadForm = !showUploadForm)}
			class="relative block w-full text-left group cursor-pointer"
			aria-label={src ? 'Click to replace this image' : 'Click to upload an image'}
		>
			<DeckImageSlot
				{src}
				{alt}
				label={src ? 'Click to replace this image' : label}
				title={src ? 'Replace image' : 'Upload image'}
				{containerClass}
				{imageClass}
				{placeholderClass}
			/>
			{#if src}
				<span class="absolute inset-3 rounded-xl bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
					<span class="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-fg-ink shadow">
						<Upload class="h-3 w-3" /> Replace image
					</span>
				</span>
			{/if}
		</button>
	{:else}
		<DeckImageSlot {src} {alt} {label} {containerClass} {imageClass} {placeholderClass} />
	{/if}

	{#if isAdmin}
		<div class="space-y-2">
			{#if showUploadForm}
				<form
					method="POST"
					action="/admin/media?/upload"
					enctype="multipart/form-data"
					use:enhance={() => {
						uploading = true;
						uploadError = null;
						return async ({ result }) => {
							uploading = false;
							if (result.type === 'success') {
								showUploadForm = false;
								await invalidateAll();
							} else if (result.type === 'failure') {
								uploadError = (result.data?.error as string) ?? 'Upload failed. Please try again.';
							} else if (result.type === 'error') {
								uploadError = result.error?.message ?? 'Upload failed. Please try again.';
							}
						};
					}}
					class="flex flex-wrap items-center gap-2 rounded-lg border border-fg-ink/15 bg-white/70 p-3"
				>
					<input type="hidden" name="name" value={name} />
					<input type="hidden" name="tag" value={tag} />
					<input type="hidden" name="alt" value={alt} />
					<input
						type="file"
						name="file"
						accept="image/jpeg,image/png,image/webp"
						required
						class="text-xs text-fg-ink/70 file:mr-2 file:rounded-md file:border-0 file:bg-fg-green-900 file:px-2.5 file:py-1.5 file:text-xs file:font-semibold file:text-fg-cream"
					/>
					<button
						type="submit"
						disabled={uploading}
						class="rounded-md bg-fg-green-900 px-3 py-1.5 text-xs font-semibold text-fg-cream hover:bg-fg-green-800 transition-colors disabled:opacity-50"
					>
						{uploading ? 'Uploading…' : 'Save'}
					</button>
				</form>
				{#if uploadError}
					<div class="flex items-center gap-1.5 rounded-md border border-red-400/40 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700">
						<AlertCircle class="h-3.5 w-3.5 shrink-0" />
						{uploadError}
					</div>
				{/if}
			{/if}

			{#if !src && prompt}
				<div class="rounded-lg border border-fg-gold/40 bg-fg-gold/10 p-3 space-y-1.5">
					<div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-fg-ink/60">
						<Sparkles class="h-3.5 w-3.5 text-fg-gold" /> Sample AI Image Prompt
					</div>
					<p class="text-xs text-fg-ink/70 leading-relaxed">{prompt}</p>
					<button
						type="button"
						on:click={copyPrompt}
						class="inline-flex items-center gap-1.5 rounded-md border border-fg-ink/15 bg-white px-2 py-1 text-xs font-semibold text-fg-ink/70 hover:bg-fg-cream2 transition-colors"
					>
						{#if copied}
							<Check class="h-3 w-3 text-fg-green-700" /> Copied
						{:else}
							<Copy class="h-3 w-3" /> Copy prompt
						{/if}
					</button>
				</div>
			{/if}
		</div>
	{/if}
</div>
