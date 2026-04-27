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

	const role = locals.user.role;

	// Build role filter — each role sees its own level and below
	const roleFilter =
		role === 'admin'    ? `published = true` :
		role === 'advanced' ? `published = true && (role = "basic" || role = "advanced")` :
		                      `published = true && role = "basic"`;

	let sections: Section[] = [];
	try {
		sections = await locals.pb.collection('sections').getFullList<Section>({
			filter: roleFilter,
			sort:   'sort_order,name',
			fields: 'id,name,slug,role,sort_order'
		});
	} catch {
		sections = [];
	}

	return { user: locals.user, sections };
};
