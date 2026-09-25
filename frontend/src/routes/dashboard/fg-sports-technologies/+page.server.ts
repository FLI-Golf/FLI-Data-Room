import type { PageServerLoad } from './$types';
import { requirePageAccess } from '$lib/page-access';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } from '$env/static/private';

interface MediaRecord {
	id: string;
	name: string;
	file: string;
	alt: string;
	collectionId: string;
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
	const json = await res.json();
	return json.token as string;
}

// Named media slots admins can upload via /admin/media using these exact names.
const placeholderNames = [
	'fg-cover-hero-image',
	'fg-connected-platform-stadium-image',
	'fg-market-globe-image',
	'fg-partner-headshot',
	'fg-yac-logo'
];

async function loadMediaPlaceholders(): Promise<MediaRecord[]> {
	try {
		const token = await getSuperuserToken();
		const filter = encodeURIComponent(placeholderNames.map((name) => `name="${name}"`).join(' || '));
		const res = await fetch(
			`${PUBLIC_POCKETBASE_URL}/api/collections/media/records?perPage=200&fields=id,name,file,alt,collectionId&filter=${filter}`,
			{ headers: { Authorization: token } }
		);
		if (!res.ok) return [];
		const json = await res.json();
		return (json.items ?? []) as MediaRecord[];
	} catch {
		return [];
	}
}

export const load: PageServerLoad = async ({ locals }) => {
	await requirePageAccess('fg-sports-technologies', locals);

	const media = await loadMediaPlaceholders();

	return { user: locals.user, media, pbUrl: PUBLIC_POCKETBASE_URL };
};
