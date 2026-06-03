<script lang="ts">
	import '../app.css';
	import 'flag-icons/css/flag-icons.min.css';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import { ArrowUp } from 'lucide-svelte';

	export let data: LayoutData;

	const LOGO_URL = 'https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/och1g39ziqrso2q/fli_logo_fbyrcne7eh.png';

	let visible = false;

	onMount(() => {
		const onScroll = () => { visible = window.scrollY > 300; };
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	function scrollTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<div class="ui-boost">
	<slot />
</div>

<!-- Scroll-to-top FAB -->
{#if visible}
	<button
		on:click={scrollTop}
		aria-label="Scroll to top"
		class="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1
			rounded-xl border border-white/20 bg-navy-900/90 backdrop-blur-sm
			px-3 py-2.5 shadow-lg hover:bg-navy-800 transition-all duration-200
			group"
	>
		<img src={LOGO_URL} alt="FLI Shield" class="h-7 w-auto" />
		<ArrowUp class="h-3.5 w-3.5 text-yellow-400 group-hover:-translate-y-0.5 transition-transform" />
	</button>
{/if}
