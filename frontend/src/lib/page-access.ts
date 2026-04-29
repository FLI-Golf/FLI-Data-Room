import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';
import type { User } from './types';

// Fallback roles if PocketBase is unreachable
const DEFAULTS: Record<string, 'basic' | 'advanced' | 'admin'> = {
	'dashboard':          'basic',
	'pitch-deck':         'basic',
	'the-sport':          'basic',
	'market-opportunity': 'basic',
	'why-fli-wins':       'basic',
	'celebrity-network':  'basic',
	'design':             'basic',
	'legal':              'basic',
	'investment':         'advanced',
	'talent':             'advanced',
	'investment-thesis':  'advanced',
	'proceeds':           'advanced',
};

const ROLE_RANK: Record<string, number> = { basic: 0, advanced: 1, admin: 2 };

async function getSuperuserToken(): Promise<string> {
	const res = await fetch(
		`${PUBLIC_POCKETBASE_URL}/api/collections/_superusers/auth-with-password`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ identity: POCKETBASE_ADMIN_EMAIL, password: POCKETBASE_ADMIN_PASSWORD })
		}
	);
	if (!res.ok) throw new Error(`Superuser auth failed: ${res.status}`);
	return (await res.json()).token as string;
}

export async function requirePageAccess(slug: string, locals: App.Locals): Promise<void> {
	// Auth checks first
	if (!locals.user) redirect(303, '/login');
	if (!locals.user.ndaAccepted) redirect(303, '/nda');

	// Fetch required role from PocketBase, fall back to defaults
	let required: 'basic' | 'advanced' | 'admin' = DEFAULTS[slug] ?? 'basic';
	try {
		const token = await getSuperuserToken();
		const res = await fetch(
			`${PUBLIC_POCKETBASE_URL}/api/collections/page_access/records?filter=(slug="${slug}")&perPage=1`,
			{ headers: { Authorization: token } }
		);
		if (res.ok) {
			const json = await res.json();
			if (json.items?.[0]?.role) required = json.items[0].role;
		}
	} catch {
		// Use fallback silently
	}

	const userRank = ROLE_RANK[locals.user.role] ?? 0;
	const requiredRank = ROLE_RANK[required] ?? 0;

	if (userRank < requiredRank) {
		error(403, `This page requires ${required} access.`);
	}
}
