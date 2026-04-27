import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

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
	upload: async ({ locals, request }) => {
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
			const formData = new FormData();
			formData.append('name', name);
			formData.append('tag', tag);
			formData.append('alt', alt);
			formData.append('notes', notes);
			formData.append('file', file);
			await locals.pb.collection('media').create(formData);
		} catch {
			return fail(500, { error: 'Upload failed.' });
		}
	},

	delete: async ({ locals, request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		if (!id) return fail(400, { error: 'Missing record ID.' });

		try {
			await locals.pb.collection('media').delete(id);
		} catch {
			return fail(500, { error: 'Delete failed.' });
		}
	}
};
