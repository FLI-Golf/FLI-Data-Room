import { requirePageAccess } from '$lib/page-access';
import { getContentData } from '$lib/content-data';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } from '$env/static/private';
import type { PageServerLoad } from './$types';

interface MediaRecord {
	id: string;
	name: string;
	file: string;
	alt?: string;
	collectionId: string;
}

const venueImageNames = Array.from({ length: 9 }, (_, index) => `fg-aag-hole-${index + 1}`);

async function loadVenueMedia(): Promise<MediaRecord[]> {
	try {
		const auth = await fetch(`${PUBLIC_POCKETBASE_URL}/api/collections/_superusers/auth-with-password`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ identity: POCKETBASE_ADMIN_EMAIL, password: POCKETBASE_ADMIN_PASSWORD })
		});
		if (!auth.ok) return [];
		const { token } = await auth.json();
		const filter = encodeURIComponent(venueImageNames.map((name) => `name="${name}"`).join(' || '));
		const response = await fetch(
			`${PUBLIC_POCKETBASE_URL}/api/collections/media/records?perPage=20&fields=id,name,file,alt,collectionId&filter=${filter}`,
			{ headers: { Authorization: token } }
		);
		if (!response.ok) return [];
		const json = await response.json();
		return (json.items ?? []) as MediaRecord[];
	} catch {
		return [];
	}
}

export const load: PageServerLoad = async ({ locals }) => {
	await requirePageAccess('inaugural-venue', locals);
	const content = await getContentData(locals.pb, 'inaugural-venue');
	const media = await loadVenueMedia();
	return { user: locals.user, content, media, pbUrl: PUBLIC_POCKETBASE_URL };
};
