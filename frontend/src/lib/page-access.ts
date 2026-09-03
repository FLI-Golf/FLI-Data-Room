import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';

export type AccessRole = 'basic' | 'advanced' | 'admin';

export interface AccessPage {
	slug: string;
	label: string;
	group: string;
	defaultRole: AccessRole;
}

export const ACCESS_PAGES: AccessPage[] = [
	{ slug: 'dashboard',             label: 'Dashboard',             group: 'Core',      defaultRole: 'basic' },
	{ slug: 'pitch-deck',            label: 'Pitch Deck',            group: 'Core',      defaultRole: 'basic' },
	{ slug: 'the-sport',             label: 'The Sport',             group: 'Core',      defaultRole: 'basic' },
	{ slug: 'market-opportunity',    label: 'Market Opportunity',    group: 'Core',      defaultRole: 'basic' },
	{ slug: 'why-fli-wins',          label: 'Why FLI Wins',          group: 'Core',      defaultRole: 'basic' },
	{ slug: 'technology',            label: 'Technology',            group: 'Core',      defaultRole: 'advanced' },
	{ slug: 'investment',            label: 'Investment',            group: 'Core',      defaultRole: 'advanced' },
	{ slug: 'proceeds',              label: 'Use of Proceeds',       group: 'Core',      defaultRole: 'advanced' },
	{ slug: 'investment-thesis',     label: 'Investment Thesis',     group: 'Core',      defaultRole: 'advanced' },
	{ slug: 'design',                label: 'Design',                group: 'Core',      defaultRole: 'basic' },
	{ slug: 'talent',                label: 'Talent Overview',       group: 'Core',      defaultRole: 'advanced' },
	{ slug: 'celebrity-network',     label: 'Celebrity Network',     group: 'Core',      defaultRole: 'basic' },
	{ slug: 'legal',                 label: 'Legal / Disclaimers',   group: 'Core',      defaultRole: 'basic' },
	{ slug: 'management',            label: 'Management & Team',     group: 'Core',      defaultRole: 'advanced' },
	{ slug: 'industry-reports',      label: 'Industry Reports',      group: 'Core',      defaultRole: 'advanced' },
	{ slug: 'revenue-precedent',     label: 'Revenue Precedent Report', group: 'Core',   defaultRole: 'advanced' },
	{ slug: 'sponsorships',          label: 'Sponsorships',          group: 'Core',      defaultRole: 'advanced' },
	{ slug: 'player-commitments',    label: 'Player Commitments',    group: 'Core',      defaultRole: 'advanced' },
	{ slug: 'inaugural-venue',       label: 'Inaugural Venue',       group: 'Core',      defaultRole: 'advanced' },
	{ slug: 'financial-projections', label: 'Financial Projections', group: 'Finance',   defaultRole: 'advanced' },
	{ slug: 'financial-statements',  label: 'Financial Statements',  group: 'Finance',   defaultRole: 'advanced' },
	{ slug: 'cpa-financials',        label: 'CPA Financials',        group: 'Finance',   defaultRole: 'advanced' },
	{ slug: 'cap-table',             label: 'Cap Table',             group: 'Finance',   defaultRole: 'advanced' },
	{ slug: 'how-to-play',           label: 'How to Play',           group: 'Core',      defaultRole: 'basic' },
	{ slug: 'grass-league',          label: 'Grass League',          group: 'Core',      defaultRole: 'advanced' },
	{ slug: 'humanitarian',          label: 'Humanitarian Prospectus', group: 'Core',    defaultRole: 'basic' },
	{ slug: 'documents',             label: 'Documents',             group: 'Admin',     defaultRole: 'admin' }
];

// Fallback roles if PocketBase is unreachable
const DEFAULTS: Record<string, AccessRole> = Object.fromEntries(
	ACCESS_PAGES.map((page) => [page.slug, page.defaultRole])
) as Record<string, AccessRole>;

const ROLE_RANK: Record<string, number> = { basic: 0, advanced: 1, admin: 2 };

export function getRoleRank(role: string | undefined): number {
	return ROLE_RANK[role ?? 'basic'] ?? ROLE_RANK.basic;
}

export function canUserAccessRole(userRole: string | undefined, requiredRole: AccessRole): boolean {
	return getRoleRank(userRole) >= getRoleRank(requiredRole);
}

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

export async function getPageAccessMap(): Promise<Record<string, AccessRole>> {
	const requiredBySlug: Record<string, AccessRole> = { ...DEFAULTS };

	try {
		const token = await getSuperuserToken();
		const res = await fetch(
			`${PUBLIC_POCKETBASE_URL}/api/collections/page_access/records?perPage=300&fields=slug,role`,
			{ headers: { Authorization: token } }
		);
		if (res.ok) {
			const json = await res.json();
			for (const row of (json.items ?? []) as Array<{ slug?: string; role?: AccessRole }>) {
				if (row.slug && row.role) requiredBySlug[row.slug] = row.role;
			}
		}
	} catch {
		// Keep defaults silently
	}

	return requiredBySlug;
}

export async function requirePageAccess(slug: string, locals: App.Locals): Promise<void> {
	// Auth checks first
	if (!locals.user) redirect(303, '/login');
	if (!locals.user.ndaAccepted) redirect(303, '/nda');

	const accessMap = await getPageAccessMap();
	const required: AccessRole = accessMap[slug] ?? 'basic';

	if (!canUserAccessRole(locals.user.role, required)) {
		error(403, 'You do not have access to this page.');
	}
}
