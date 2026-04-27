import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface Section {
	id: string;
	name: string;
	slug: string;
	description: string;
	role: 'basic' | 'advanced' | 'admin';
	published: boolean;
}

interface ContentBlock {
	id: string;
	type: 'text' | 'media';
	heading: string;
	body: string;
	media: string;
	sort_order: number;
	expand?: { media?: { id: string; name: string; file: string; collectionId: string; alt: string } };
}

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.user) redirect(303, '/login');
	if (!locals.user.ndaAccepted) redirect(303, '/nda');

	// Find the section by slug
	let section: Section;
	try {
		const results = await locals.pb.collection('sections').getFullList<Section>({
			filter: `slug = "${params.slug}" && published = true`
		});
		if (results.length === 0) error(404, 'Section not found');
		section = results[0];
	} catch {
		error(404, 'Section not found');
	}

	// Role check
	const role = locals.user.role;
	if (section.role === 'admin' && role !== 'admin') redirect(303, '/dashboard');
	if (section.role === 'advanced' && role === 'basic') redirect(303, '/dashboard');

	const blocks = await locals.pb.collection('section_content').getFullList<ContentBlock>({
		filter: `section = "${section.id}"`,
		sort:   'sort_order,created',
		expand: 'media'
	});

	return { section, blocks, user: locals.user };
};
