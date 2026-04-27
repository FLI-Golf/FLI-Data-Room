<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>Users — FLI Admin</title>
</svelte:head>

<div class="max-w-5xl space-y-8">
	<div>
		<h1 class="text-3xl font-black text-white">Users</h1>
		<p class="mt-1 text-white/50">{data.users.length} registered user{data.users.length !== 1 ? 's' : ''}</p>
	</div>

	<div class="rounded-xl border border-white/15 bg-white/8 overflow-hidden">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-white/15 text-white/40 text-xs uppercase tracking-wide">
					<th class="text-left px-5 py-3">Name</th>
					<th class="text-left px-5 py-3">Email</th>
					<th class="text-left px-5 py-3">Role</th>
					<th class="text-left px-5 py-3">NDA</th>
					<th class="text-left px-5 py-3">Actions</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-white/5">
				{#each data.users as user}
					<tr class="hover:bg-white/8 transition-colors">
						<td class="px-5 py-3 font-medium text-white">{user.name || '—'}</td>
						<td class="px-5 py-3 text-white/60">{user.email}</td>
						<td class="px-5 py-3">
							<form method="POST" action="?/updateRole" use:enhance class="flex items-center gap-2">
								<input type="hidden" name="userId" value={user.id} />
								<select
									name="role"
									value={user.role}
									class="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
								>
									<option value="basic">Basic</option>
									<option value="advanced">Advanced</option>
									<option value="admin">Admin</option>
								</select>
								<button
									type="submit"
									class="rounded px-2 py-1 text-xs bg-brand-600 text-white hover:bg-brand-500 transition-colors"
								>
									Save
								</button>
							</form>
						</td>
						<td class="px-5 py-3">
							{#if user.ndaAccepted}
								<span class="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-medium text-green-600">
									Accepted
								</span>
							{:else}
								<span class="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/40">
									Pending
								</span>
							{/if}
						</td>
						<td class="px-5 py-3">
							{#if user.ndaAccepted}
								<form method="POST" action="?/revokeAccess" use:enhance>
									<input type="hidden" name="userId" value={user.id} />
									<button
										type="submit"
										class="text-xs text-red-500 hover:text-red-300 transition-colors"
									>
										Revoke NDA
									</button>
								</form>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
