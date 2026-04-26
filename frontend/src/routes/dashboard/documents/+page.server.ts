import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Document } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/login');
	if (!locals.user.ndaAccepted) redirect(303, '/nda');

	const role = locals.user.role;

	let documents: Document[] = [];

	try {
		// Fetch documents the user's role is allowed to see
		const filter =
			role === 'admin'
				? ''
				: role === 'advanced'
					? `requiredRole = "basic" || requiredRole = "advanced"`
					: `requiredRole = "basic"`;

		const result = await locals.pb.collection('documents').getFullList<Document>({
			filter,
			sort: '-created'
		});
		documents = result;
	} catch {
		// Collection may not exist yet — return empty list gracefully
		documents = [];
	}

	return { documents, user: locals.user };
};
