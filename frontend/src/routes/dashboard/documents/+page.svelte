<script lang="ts">
	import type { PageData } from './$types';
	import { Info, Upload, Shield, Users, Lock } from 'lucide-svelte';
	export let data: PageData;
</script>

<svelte:head>
	<title>Documents — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-4xl space-y-8">
	<div>
		<h1 class="text-3xl font-black text-white">Documents</h1>
		<p class="mt-1 text-white/50">Supporting materials for the FLI Golf League investment opportunity.</p>
	</div>

	{#if data.user?.role === 'admin'}
		<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6 space-y-5">
			<div class="flex items-center gap-2">
				<Info class="h-4 w-4 text-yellow-400 shrink-0" />
				<h2 class="text-sm font-bold text-yellow-400 uppercase tracking-wide">Admin — How Documents Work</h2>
			</div>

			<div class="grid sm:grid-cols-3 gap-4">
				<div class="rounded-lg border border-white/10 bg-navy-900/60 p-4">
					<div class="flex items-center gap-2 mb-2">
						<Upload class="h-4 w-4 text-yellow-400 shrink-0" />
						<div class="text-xs font-semibold text-white">1. Upload in Admin</div>
					</div>
					<p class="text-xs text-white/50 leading-relaxed">
						Go to <a href="/admin/documents" class="text-yellow-400 hover:text-yellow-300 underline">Admin → Documents</a> to upload a PDF or file. Set a title, description, and the required role to view it.
					</p>
				</div>
				<div class="rounded-lg border border-white/10 bg-navy-900/60 p-4">
					<div class="flex items-center gap-2 mb-2">
						<Shield class="h-4 w-4 text-yellow-400 shrink-0" />
						<div class="text-xs font-semibold text-white">2. Set Access Level</div>
					</div>
					<p class="text-xs text-white/50 leading-relaxed">
						Each document has a <span class="text-white/70">Required Role</span> — <span class="text-white/70">basic</span> (all signed-in users), <span class="text-white/70">advanced</span> (advanced + admin only), or <span class="text-white/70">admin</span> (you only). Users only see documents their role permits.
					</p>
				</div>
				<div class="rounded-lg border border-white/10 bg-navy-900/60 p-4">
					<div class="flex items-center gap-2 mb-2">
						<Users class="h-4 w-4 text-yellow-400 shrink-0" />
						<div class="text-xs font-semibold text-white">3. Grant User Roles</div>
					</div>
					<p class="text-xs text-white/50 leading-relaxed">
						Go to <a href="/admin" class="text-yellow-400 hover:text-yellow-300 underline">Admin → Users</a> to upgrade a user from <span class="text-white/70">basic</span> to <span class="text-white/70">advanced</span>. They will immediately see any advanced documents on their next visit.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-2 rounded-lg border border-white/10 bg-navy-900/60 p-3">
				<Lock class="h-3.5 w-3.5 text-white/30 shrink-0 mt-0.5" />
				<p class="text-xs text-white/40 leading-relaxed">
					Documents are served directly from PocketBase. Only authenticated users whose role meets the required level can access the file URL. Links cannot be shared externally.
				</p>
			</div>
		</div>
	{/if}

	{#if data.documents.length === 0}
		<div class="rounded-xl border border-white/10 bg-navy-800/60 p-12 text-center">
			<div class="text-white/30 text-sm">No documents have been uploaded yet.</div>
			<div class="text-white/20 text-xs mt-1">Check back soon or contact your representative.</div>
		</div>
	{:else}
		<div class="space-y-3">
			{#each data.documents as doc}
				<div class="flex items-center justify-between rounded-xl border border-white/10 bg-navy-800/60 px-5 py-4 hover:bg-navy-700/60 transition-colors">
					<div class="flex items-center gap-4">
						<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/20 text-brand-600">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
								<polyline points="14 2 14 8 20 8" />
							</svg>
						</div>
						<div>
							<div class="text-sm font-semibold text-white">{doc.title}</div>
							{#if doc.description}
								<div class="text-xs text-white/40 mt-0.5">{doc.description}</div>
							{/if}
						</div>
					</div>
					<div class="flex items-center gap-3">
						<span class="rounded-full bg-navy-700/60 px-2.5 py-0.5 text-xs font-medium text-white/50 capitalize">
							{doc.requiredRole}
						</span>
						<a
							href={`${import.meta.env.PUBLIC_POCKETBASE_URL}/api/files/documents/${doc.id}/${doc.file}`}
							target="_blank"
							rel="noopener noreferrer"
							class="rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-500 transition-colors"
						>
							View PDF
						</a>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<p class="text-xs text-white/20">
		All documents are confidential and subject to the NDA you accepted. Do not distribute.
	</p>
</div>
