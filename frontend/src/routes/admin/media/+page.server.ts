import { fail } from '@sveltejs/kit';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } from '$env/static/private';
import type { PageServerLoad, Actions } from './$types';

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

interface MediaRecord {
	id: string;
	name: string;
	file: string;
	tag: string;
	alt: string;
	notes: string;
	created: string;
	collectionId: string;
}

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const media = await locals.pb
			.collection('media')
			.getFullList<MediaRecord>({ sort: '-created' });
		return { media };
	} catch {
		return { media: [] as MediaRecord[] };
	}
};

export const actions: Actions = {
	upload: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString();
		const tag = data.get('tag')?.toString();
		const alt = data.get('alt')?.toString() ?? '';
		const notes = data.get('notes')?.toString() ?? '';
		const file = data.get('file') as File | null;

		if (!name || !tag || !file || file.size === 0) {
			return fail(400, { error: 'Name, tag, and file are required.' });
		}

		const allowed = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp'];
		if (!allowed.includes(file.type)) {
			return fail(400, { error: 'Only JPEG, PNG, SVG, GIF, and WebP files are allowed.' });
		}

		try {
			const token = await getSuperuserToken();
			const formData = new FormData();
			formData.append('name', name);
			formData.append('tag', tag);
			formData.append('alt', alt);
			formData.append('notes', notes);
			formData.append('file', file, file.name);
			const res = await fetch(`${PUBLIC_POCKETBASE_URL}/api/collections/media/records`, {
				method: 'POST',
				headers: { Authorization: token },
				body: formData
			});
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				console.error('Media upload error:', res.status, err);
				return fail(500, { error: `Upload failed: ${JSON.stringify(err)}` });
			}
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : JSON.stringify(err);
			console.error('Media upload error:', msg);
			return fail(500, { error: `Upload failed: ${msg}` });
		}
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		if (!id) return fail(400, { error: 'Missing record ID.' });

		try {
			const token = await getSuperuserToken();
			const res = await fetch(`${PUBLIC_POCKETBASE_URL}/api/collections/media/records/${id}`, {
				method: 'DELETE',
				headers: { Authorization: token }
			});
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				console.error('Media delete error:', res.status, err);
				return fail(500, { error: 'Delete failed.' });
			}
		} catch (err) {
			console.error('Media delete error:', err);
			return fail(500, { error: 'Delete failed.' });
		}
	}
};
