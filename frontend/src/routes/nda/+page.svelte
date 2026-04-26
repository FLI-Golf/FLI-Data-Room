<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let agreed = false;
</script>

<svelte:head>
	<title>Non-Disclosure Agreement — FLI Golf Data Room</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-background px-4 py-12">
	<div class="w-full max-w-2xl space-y-8">
		<div class="text-center">
			<h1 class="text-3xl font-bold tracking-tight text-foreground">Non-Disclosure Agreement</h1>
			<p class="mt-2 text-sm text-muted-foreground">
				You must accept the NDA before accessing the FLI Golf investor data room.
			</p>
		</div>

		<div class="rounded-xl border border-border bg-card p-8 shadow-sm">
			<div class="prose prose-sm max-h-72 overflow-y-auto rounded-md border border-border bg-muted/40 p-4 text-sm text-foreground">
				<h2 class="text-base font-semibold">Confidentiality Agreement</h2>
				<p>
					By accessing the FLI Golf investor data room, you ("Recipient") agree to keep all
					information, documents, financial data, business plans, and materials (collectively,
					"Confidential Information") strictly confidential.
				</p>
				<p>Recipient agrees to:</p>
				<ul>
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
				<p class="font-medium">
					This NDA is effective upon your acceptance and remains in force indefinitely.
				</p>
			</div>

			{#if form?.error}
				<div class="mt-4 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
					{form.error}
				</div>
			{/if}

			<form method="POST" action="?/accept" use:enhance class="mt-6 space-y-4">
				<label class="flex cursor-pointer items-start gap-3">
					<input
						type="checkbox"
						bind:checked={agreed}
						class="mt-0.5 h-4 w-4 rounded border-input accent-primary"
					/>
					<span class="text-sm text-foreground">
						I have read and agree to the Non-Disclosure Agreement above. I understand that
						accessing this data room constitutes acceptance of these terms.
					</span>
				</label>

				<button
					type="submit"
					disabled={!agreed}
					class="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
				>
					Accept &amp; Enter Data Room
				</button>
			</form>
		</div>

		<p class="text-center text-xs text-muted-foreground">
			Questions? Contact
			<a href="mailto:investors@fligolf.com" class="underline hover:text-foreground">
				investors@fligolf.com
			</a>
		</p>
	</div>
</div>
