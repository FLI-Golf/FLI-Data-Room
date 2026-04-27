<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	const coreNav = [
		{ href: '/dashboard',                        label: 'Overview' },
		{ href: '/dashboard/pitch-deck',             label: 'Pitch Deck' },
		{ href: '/dashboard/the-sport',              label: 'The Sport' },
		{ href: '/dashboard/market-opportunity',     label: 'Market Opportunity' },
		{ href: '/dashboard/why-fli-wins',           label: 'Why FLI Wins' },
		{ href: '/dashboard/investment-thesis',      label: 'Investment Thesis' },
		{ href: '/dashboard/celebrity-network',      label: 'Celebrity Network' }
	];
</script>

<div class="min-h-screen bg-navy-900 text-white">
	<div class="flex">
		<aside class="w-60 min-h-screen border-r border-white/15 bg-navy-950 flex flex-col">
			<div class="px-6 py-5 border-b border-white/15 flex flex-col items-center text-center">
				<img
					src="https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/1zf32ato6zddp24/fgl_logo_cmyk_01_7s51ljmqp7.png"
					alt="FLI Shield Logo"
					class="h-14 w-auto mb-2"
				/>
				<div class="flex items-center gap-1">
					<span class="text-lg font-black text-white">FLI</span>
					<span class="text-lg font-black text-white">GOLF</span>
				</div>
				<div class="text-xs text-white/40">Investor Data Room</div>
			</div>

			<nav class="flex-1 px-3 py-4 space-y-1">
				<!-- Core pages -->
				{#each coreNav as item}
					<a
						href={item.href}
						class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors
							{$page.url.pathname === item.href
								? 'bg-white/10 text-white'
								: 'text-white/60 hover:bg-white/8 hover:text-white'}"
					>
						{item.label}
					</a>
				{/each}

				<!-- Dynamic sections -->
				{#if data.sections?.length > 0}
					<div class="pt-3 mt-3 border-t border-white/15 space-y-1">
						{#each data.sections as section}
							<a
								href="/dashboard/{section.slug}"
								class="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors
									{$page.url.pathname === `/dashboard/${section.slug}`
										? 'bg-white/10 text-white'
										: 'text-white/60 hover:bg-white/8 hover:text-white'}"
							>
								<span>{section.name}</span>
								{#if section.role === 'advanced'}
									<span class="text-xs text-yellow-400/70">Adv</span>
								{/if}
							</a>
						{/each}
					</div>
				{/if}

				<!-- Admin-only -->
				{#if data.user?.role === 'admin'}
					<div class="pt-3 mt-3 border-t border-white/15 space-y-1">
						<a href="/dashboard/documents"
							class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/8 hover:text-white transition-colors">
							Documents
						</a>
						<a href="/admin"
							class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/8 hover:text-white transition-colors">
							Admin
						</a>
					</div>
				{/if}
			</nav>

			<div class="px-3 py-4 border-t border-white/15">
				<div class="px-3 py-2 mb-2">
					<div class="text-xs font-medium text-white truncate">{data.user?.name}</div>
					<div class="text-xs text-white/40 truncate">{data.user?.email}</div>
					<div class="mt-1 inline-flex items-center rounded-full bg-yellow-500/15 px-2 py-0.5 text-xs font-medium text-yellow-400 capitalize">
						{data.user?.role}
					</div>
				</div>
				<form method="POST" action="/logout">
					<button
						type="submit"
						class="w-full rounded-md px-3 py-2 text-left text-sm text-white/40 hover:bg-white/8 hover:text-white transition-colors"
					>
						Sign Out
					</button>
				</form>
			</div>
		</aside>

		<main class="flex-1 p-8">
			<slot />
		</main>
	</div>
</div>
