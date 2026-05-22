import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

interface Section {
	id: string;
	name: string;
	slug: string;
	role: 'basic' | 'advanced' | 'admin';
	sort_order: number;
}

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/login');
	if (!locals.user.ndaAccepted) redirect(303, '/nda');

	let sections: Section[] = [];
	try {
		sections = await locals.pb.collection('sections').getFullList<Section>({
			filter: 'published = true',
			sort:   'sort_order,name',
			fields: 'id,name,slug,role,sort_order'
		});
	} catch {
		sections = [];
	}

	return { user: locals.user, sections };
};
