<script lang="ts">
	import type { LayoutData } from './$types';
	export let data: LayoutData;
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
					<span class="text-lg font-black text-brand-500">GOLF</span>
				</div>
				<div class="text-xs text-white/40">Admin Panel</div>
			</div>

			<nav class="flex-1 px-3 py-4 space-y-1">
				<a href="/admin" class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/8 hover:text-white transition-colors">
					Users
				</a>
				<a href="/admin/documents" class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/8 hover:text-white transition-colors">
					Documents
				</a>
				<a href="/admin/media" class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/8 hover:text-white transition-colors">
					Media
				</a>
				<a href="/admin/sections" class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/8 hover:text-white transition-colors">
					Sections
				</a>
				<a href="/admin/access" class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/8 hover:text-white transition-colors">
					Page Access
				</a>
				<div class="pt-4 mt-4 border-t border-white/15">
					<a href="/dashboard" class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/8 hover:text-white transition-colors">
						← Data Room
					</a>
				</div>
			</nav>

			<div class="px-3 py-4 border-t border-white/15">
				<div class="px-3 py-2 mb-2">
					<div class="text-xs font-medium text-white truncate">{data.user?.name}</div>
					<div class="inline-flex items-center rounded-full bg-brand-500/20 px-2 py-0.5 text-xs font-medium text-brand-600 mt-1">
						Admin
					</div>
				</div>
				<form method="POST" action="/logout">
					<button type="submit" class="w-full rounded-md px-3 py-2 text-left text-sm text-white/40 hover:bg-white/8 hover:text-white transition-colors">
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
