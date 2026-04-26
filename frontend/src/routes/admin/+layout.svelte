<script lang="ts">
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<div class="min-h-screen bg-[#0a0f1e] text-white">
	<div class="flex">
		<aside class="w-60 min-h-screen border-r border-white/10 bg-[#080d1a] flex flex-col">
			<div class="px-6 py-5 border-b border-white/10">
				<div class="flex items-center gap-1">
					<span class="text-xl font-black text-white">FLI</span>
					<span class="text-xl font-black text-brand-500">GOLF</span>
				</div>
				<div class="text-xs text-white/40 mt-0.5">Admin Panel</div>
			</div>

			<nav class="flex-1 px-3 py-4 space-y-1">
				<a href="/admin" class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-colors">
					Users
				</a>
				<a href="/admin/documents" class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-colors">
					Documents
				</a>
				<div class="pt-4 mt-4 border-t border-white/10">
					<a href="/dashboard" class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-colors">
						← Data Room
					</a>
				</div>
			</nav>

			<div class="px-3 py-4 border-t border-white/10">
				<div class="px-3 py-2 mb-2">
					<div class="text-xs font-medium text-white truncate">{data.user?.name}</div>
					<div class="inline-flex items-center rounded-full bg-brand-500/20 px-2 py-0.5 text-xs font-medium text-brand-400 mt-1">
						Admin
					</div>
				</div>
				<form method="POST" action="/logout">
					<button type="submit" class="w-full rounded-md px-3 py-2 text-left text-sm text-white/40 hover:bg-white/5 hover:text-white transition-colors">
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
