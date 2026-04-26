import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import type { Document } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
	const documents = await locals.pb.collection('documents').getFullList<Document>({ sort: '-created' });
	return { documents };
};

export const actions: Actions = {
	upload: async ({ locals, request }) => {
		const data = await request.formData();
		const title = data.get('title')?.toString();
		const description = data.get('description')?.toString() ?? '';
		const requiredRole = data.get('requiredRole')?.toString();
		const file = data.get('file') as File | null;

		if (!title || !requiredRole || !file || file.size === 0) {
			return fail(400, { error: 'Title, role, and file are required.' });
		}

		try {
			const formData = new FormData();
			formData.append('title', title);
			formData.append('description', description);
			formData.append('requiredRole', requiredRole);
			formData.append('file', file);

			await locals.pb.collection('documents').create(formData);
		} catch {
			return fail(500, { error: 'Upload failed. Check PocketBase collection config.' });
		}
	},

	delete: async ({ locals, request }) => {
		const data = await request.formData();
		const docId = data.get('docId')?.toString();
		if (!docId) return fail(400, { error: 'Missing document ID.' });

		try {
			await locals.pb.collection('documents').delete(docId);
		} catch {
			return fail(500, { error: 'Delete failed.' });
		}
	}
};
