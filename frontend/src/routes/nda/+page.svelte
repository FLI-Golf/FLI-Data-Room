<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let agreed = false;
</script>

<svelte:head>
	<title>Non-Disclosure Agreement — FLI Golf Data Room</title>
</svelte:head>

<div class="relative flex min-h-screen items-center justify-center bg-navy-900 px-4 py-12 overflow-hidden">
	<!-- Background -->
	<div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
	<div class="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-3xl" />

	<div class="relative w-full max-w-2xl space-y-8">
		<!-- Logo -->
		<div class="text-center">
			<div class="flex flex-col items-center mb-3">
				<img
					src="https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/1zf32ato6zddp24/fgl_logo_cmyk_01_7s51ljmqp7.png"
					alt="FLI Shield Logo"
					class="h-16 w-auto mb-2"
				/>
				<div class="flex items-center gap-1">
					<span class="text-2xl font-black text-white">FLI</span>
					<span class="text-2xl font-black text-brand-500">GOLF</span>
				</div>
			</div>
			<h1 class="text-xl font-bold text-white">Non-Disclosure Agreement</h1>
			<p class="mt-1 text-sm text-white/50">
				You must accept the NDA before accessing the FLI Golf investor data room.
			</p>
		</div>

		<div class="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
			<div class="max-h-72 overflow-y-auto rounded-md border border-white/10 bg-white/5 p-4 text-sm text-white/70 space-y-3 leading-relaxed">
				<h2 class="text-base font-semibold text-white">Confidentiality Agreement</h2>
				<p>
					By accessing the FLI Golf investor data room, you ("Recipient") agree to keep all
					information, documents, financial data, business plans, and materials (collectively,
					"Confidential Information") strictly confidential.
				</p>
				<p>Recipient agrees to:</p>
				<ul class="list-disc pl-5 space-y-1">
					<li>Not disclose Confidential Information to any third party without prior written consent from FLI Golf.</li>
					<li>Use Confidential Information solely to evaluate a potential investment in FLI Golf.</li>
					<li>Not copy, reproduce, or distribute any materials from this data room.</li>
					<li>Promptly notify FLI Golf of any unauthorized disclosure or use.</li>
					<li>Return or destroy all Confidential Information upon request.</li>
				</ul>
				<p>
					This agreement is governed by applicable law. Breach may result in irreparable harm for
					which monetary damages would be inadequate, and FLI Golf may seek injunctive relief in
					addition to other remedies.
				</p>
				<p class="font-medium text-white">
					This NDA is effective upon your acceptance and remains in force indefinitely.
				</p>
			</div>

			{#if form?.error}
				<div class="mt-4 rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
					{form.error}
				</div>
			{/if}

			<form method="POST" action="?/accept" use:enhance class="mt-6 space-y-4">
				<label class="flex cursor-pointer items-start gap-3">
					<input
						type="checkbox"
						bind:checked={agreed}
						class="mt-0.5 h-4 w-4 rounded border-white/20 accent-brand-500"
					/>
					<span class="text-sm text-white/70">
						I have read and agree to the Non-Disclosure Agreement above. I understand that
						accessing this data room constitutes acceptance of these terms.
					</span>
				</label>

				<button
					type="submit"
					disabled={!agreed}
					class="w-full rounded-md bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
				>
					Accept &amp; Enter Data Room
				</button>
			</form>
		</div>

		<p class="text-center text-xs text-white/30">
			Questions? Contact
			<a href="mailto:investors@fligolf.com" class="text-brand-600 hover:text-brand-300 transition-colors">
				investors@fligolf.com
			</a>
		</p>
	</div>
</div>
