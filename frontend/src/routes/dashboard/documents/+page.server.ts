import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Document } from '$lib/types';
import { requirePageAccess } from '$lib/page-access';

export const load: PageServerLoad = async ({ locals }) => {
	await requirePageAccess('documents', locals);
	if (!locals.user) redirect(303, '/login');
	if (!locals.user.ndaAccepted) redirect(303, '/nda');

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
