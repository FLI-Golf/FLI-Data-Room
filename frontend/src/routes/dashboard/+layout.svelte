<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import {
		LayoutDashboard, FileText, Disc, Globe, Trophy,
		TrendingUp, Star, Settings, Users, Image, Hash, Scale
	} from 'lucide-svelte';
	export let data: LayoutData;

	const nav = [
		{ href: '/dashboard',                        label: 'Dashboard',           icon: LayoutDashboard, children: [] },
		{ href: '/dashboard/pitch-deck',             label: 'Pitch Deck',          icon: FileText, children: [
			{ id: 'overview',       label: 'Overview' },
			{ id: 'limitations',    label: 'Limitations & Fix' },
			{ id: 'built-different', label: 'Built Different' },
			{ id: 'why-now',        label: 'Why Disc Golf. Why Now.' },
			{ id: 'roster',         label: 'Elite Roster' },
			{ id: 'the-team',       label: 'The Team' },
			{ id: 'advisory-board', label: 'Advisory Board' },
			{ id: 'gaming-tribal',  label: 'Gaming & Tribal' },
			{ id: 'broadcast',      label: 'Broadcast Scale' },
			{ id: 'proceeds',       label: 'Use of Proceeds' },
			{ id: 'contact',        label: 'Contact / YAC' },
		]},
		{ href: '/dashboard/the-sport',              label: 'The Sport',           icon: Disc,        children: [] },
		{ href: '/dashboard/market-opportunity',     label: 'Market Opportunity',  icon: Globe,       children: [] },
		{ href: '/dashboard/why-fli-wins',           label: 'Why FLI Wins',        icon: Trophy,      children: [] },
		{ href: '/dashboard/investment-thesis',      label: 'Investment Thesis',   icon: TrendingUp,  children: [] },
		{ href: '/dashboard/design',                 label: 'Design',              icon: Image,       children: [] },
		{ href: '/dashboard/celebrity-network',      label: 'Celebrity Network',   icon: Star,        children: [
			{ id: 'opportunity', label: 'The Opportunity' },
			{ id: 'reach',       label: 'Social Media Reach' },
			{ id: 'roster',      label: 'Celebrity Roster' },
			{ id: 'powerhouse',  label: 'Powerhouse Additions' },
			{ id: 'activation',  label: 'Network Activation' },
		]},
		{ href: '/dashboard/legal',                  label: 'Legal / Disclaimers', icon: Scale,        children: [] },
	];

	$: activePath = $page.url.pathname;
	$: activeHash = $page.url.hash;

	import { onMount } from 'svelte';

	let activeSection = '';

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) activeSection = entry.target.id;
				}
			},
			{ rootMargin: '-20% 0px -60% 0px', threshold: 0 }
		);

		const observe = () => {
			document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
		};

		observe();
		// Re-observe on navigation
		const interval = setInterval(observe, 1000);
		return () => { observer.disconnect(); clearInterval(interval); };
	});
</script>

<div class="min-h-screen bg-navy-900 text-white">
	<div class="flex">
		<aside class="w-64 min-h-screen border-r border-white/10 bg-navy-950 flex flex-col">

			<!-- Logo -->
			<a href="/dashboard" class="px-5 py-4 border-b border-white/10 flex items-center gap-3 hover:bg-white/5 transition-colors">
				<img
					src="https://pocketbase-rxik-production.up.railway.app/api/files/pbc_2708086759/1zf32ato6zddp24/fgl_logo_cmyk_01_7s51ljmqp7.png"
					alt="FLI Shield Logo"
					class="h-10 w-auto shrink-0"
				/>
				<div>
					<div class="text-sm font-black text-white leading-tight">FLI GOLF</div>
					<div class="text-xs text-white/35 leading-tight">Investor Data Room</div>
				</div>
			</a>

			<nav class="flex-1 px-2 py-3 overflow-y-auto">

				<div class="space-y-0.5">
					{#each nav as item}
						{@const active = activePath === item.href}
						<a
							href={item.href}
							class="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors relative
								{active ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/6 hover:text-white'}"
						>
							{#if active}
								<span class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-brand-500 rounded-r"></span>
							{/if}
							<svelte:component this={item.icon} class="h-4 w-4 shrink-0 {active ? 'text-brand-400' : 'text-white/25'}" />
							{item.label}
						</a>

						<!-- Sub-nav: only show when this page is active and has children -->
						{#if active && item.children.length > 0}
							<div class="ml-4 pl-3 border-l border-white/10 space-y-0.5 mb-1">
								{#each item.children as child}
									{@const subActive = activeSection === child.id}
									<a
										href="{item.href}#{child.id}"
										class="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors
											{subActive ? 'text-white bg-white/8' : 'text-white/40 hover:text-white hover:bg-white/6'}"
									>
										<Hash class="h-3 w-3 shrink-0 {subActive ? 'text-brand-400' : 'text-white/20'}" />
										{child.label}
									</a>
								{/each}
							</div>
						{/if}
					{/each}
				</div>

				<!-- Dynamic sections -->
				{#if data.sections?.length > 0}
					<div class="mt-3 pt-3 border-t border-white/10">
						<div class="px-3 mb-1 text-xs font-semibold text-white/25 uppercase tracking-widest">Sections</div>
						<div class="space-y-0.5">
							{#each data.sections as section}
								{@const active = activePath === `/dashboard/${section.slug}`}
								<a
									href="/dashboard/{section.slug}"
									class="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors relative
										{active ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/6 hover:text-white'}"
								>
									{#if active}
										<span class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-brand-500 rounded-r"></span>
									{/if}
									<span class="flex items-center gap-2.5">
										<FileText class="h-4 w-4 shrink-0 {active ? 'text-brand-400' : 'text-white/25'}" />
										{section.name}
									</span>
									{#if section.role === 'advanced'}
										<span class="text-xs font-semibold text-yellow-400/70 bg-yellow-500/10 rounded px-1.5 py-0.5 shrink-0">Adv</span>
									{/if}
								</a>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Admin -->
				{#if data.user?.role === 'admin'}
					<div class="mt-3 pt-3 border-t border-white/10 space-y-0.5">
						<div class="px-3 mb-1 text-xs font-semibold text-white/25 uppercase tracking-widest">Admin</div>
						<a href="/dashboard/documents"
							class="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-white/50 hover:bg-white/6 hover:text-white transition-colors">
							<FileText class="h-4 w-4 shrink-0 text-white/25" />
							Documents
						</a>
						<a href="/admin"
							class="flex items-center justify-center gap-2 rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-navy-950 hover:bg-yellow-400 transition-colors mt-1">
							<Settings class="h-4 w-4" />
							Admin Panel
						</a>
					</div>
				{/if}
			</nav>

			<!-- User footer -->
			<div class="px-3 py-3 border-t border-white/10">
				<div class="flex items-center gap-2.5 px-2 py-2 mb-1 rounded-lg bg-white/5">
					<div class="h-7 w-7 rounded-full bg-brand-600/30 border border-brand-500/40 flex items-center justify-center text-xs font-black text-brand-400 shrink-0">
						{data.user?.name?.charAt(0) ?? '?'}
					</div>
					<div class="min-w-0 flex-1">
						<div class="text-xs font-semibold text-white truncate">{data.user?.name}</div>
						<div class="text-xs text-white/35 truncate">{data.user?.email}</div>
					</div>
					<span class="shrink-0 rounded-full bg-yellow-500/15 px-1.5 py-0.5 text-xs font-medium text-yellow-400 capitalize">{data.user?.role}</span>
				</div>
				<form method="POST" action="/logout">
					<button type="submit" class="w-full rounded-md px-3 py-1.5 text-left text-sm text-white/35 hover:bg-white/6 hover:text-white transition-colors">
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
