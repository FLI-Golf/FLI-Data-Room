<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Sign In — FLI Golf Data Room</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-background px-4">
	<div class="w-full max-w-md space-y-8">
		<div class="text-center">
			<h1 class="text-3xl font-bold tracking-tight text-foreground">FLI Golf</h1>
			<p class="mt-2 text-sm text-muted-foreground">Investor Data Room — Sign in to continue</p>
		</div>

		<form method="POST" use:enhance class="space-y-4 rounded-xl border border-border bg-card p-8 shadow-sm">
			{#if form?.error}
				<div class="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
					{form.error}
				</div>
			{/if}

			<div class="space-y-1">
				<label for="email" class="block text-sm font-medium text-foreground">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					autocomplete="email"
					class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
					placeholder="you@example.com"
				/>
			</div>

			<div class="space-y-1">
				<label for="password" class="block text-sm font-medium text-foreground">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					autocomplete="current-password"
					class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
					placeholder="••••••••"
				/>
			</div>

			<button
				type="submit"
				class="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
			>
				Sign In
			</button>

			<p class="text-center text-sm text-muted-foreground">
				Don't have an account?
				<a href="/register" class="font-medium text-primary hover:underline">Request access</a>
			</p>
		</form>
	</div>
</div>
