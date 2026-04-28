<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Request Access — FLI Golf Data Room</title>
</svelte:head>

<div class="relative flex min-h-screen items-center justify-center bg-navy-900 px-4 py-12 overflow-hidden">
	<!-- Background -->
	<div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
	<div class="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-3xl" />

	<div class="relative w-full max-w-md space-y-8">
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
			<h1 class="text-xl font-bold text-white">Request Investor Access</h1>
			<p class="mt-1 text-sm text-white/50">Create an account to access the data room</p>
		</div>

		<form method="POST" use:enhance class="space-y-4 rounded-xl border border-white/15 bg-white/8 backdrop-blur-sm p-8">
			{#if form?.error}
				<div class="rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
					{form.error}
				</div>
			{/if}

			<div class="space-y-1">
				<label for="name" class="block text-sm font-medium text-white/80">Full Name</label>
				<input
					id="name"
					name="name"
					type="text"
					required
					autocomplete="name"
					class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50"
					placeholder="Jane Smith"
				/>
			</div>

			<div class="space-y-1">
				<label for="email" class="block text-sm font-medium text-white/80">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					autocomplete="email"
					class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50"
					placeholder="you@example.com"
				/>
			</div>

			<div class="space-y-1">
				<label for="password" class="block text-sm font-medium text-white/80">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					autocomplete="new-password"
					class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50"
					placeholder="••••••••"
				/>
			</div>

			<div class="space-y-1">
				<label for="passwordConfirm" class="block text-sm font-medium text-white/80">
					Confirm Password
				</label>
				<input
					id="passwordConfirm"
					name="passwordConfirm"
					type="password"
					required
					autocomplete="new-password"
					class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50"
					placeholder="••••••••"
				/>
			</div>

			<button
				type="submit"
				class="w-full rounded-md bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-colors"
			>
				Create Account
			</button>

			<p class="text-center text-sm text-white/40">
				Already have an account?
				<a href="/login" class="font-medium text-brand-600 hover:text-brand-300 transition-colors">Sign in</a>
			</p>
		</form>
	</div>
</div>
