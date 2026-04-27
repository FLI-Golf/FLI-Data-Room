import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Document } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/login');
	if (!locals.user.ndaAccepted) redirect(303, '/nda');
	if (locals.user.role !== 'admin') redirect(303, '/dashboard');

	let documents: Document[] = [];

	try {
		const result = await locals.pb.collection('documents').getFullList<Document>({
			sort: '-created'
		});
		documents = result;
	} catch {
		documents = [];
	}

	return { documents, user: locals.user };
};
