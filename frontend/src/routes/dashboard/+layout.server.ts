import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { ACCESS_PAGES, canUserAccessRole, getPageAccessMap, getRoleRank } from '$lib/page-access';

interface Section {
	id: string;
	name: string;
	slug: string;
	role: 'basic' | 'advanced' | 'admin';
	sort_order: number;
}

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (!locals.user) redirect(303, '/login');
	if (!locals.user.ndaAccepted) redirect(303, '/nda');

	const previewView = url.searchParams.get('view');
	const previewRole =
		locals.user.role === 'admin' && (previewView === 'basic' || previewView === 'advanced')
			? previewView
			: null;
	const effectiveRole = previewRole ?? locals.user.role;

	const accessMap = await getPageAccessMap();
	const visibleSlugs = ACCESS_PAGES
		.filter((page) => canUserAccessRole(effectiveRole, accessMap[page.slug] ?? page.defaultRole))
		.map((page) => page.slug);

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

	sections = sections.filter((section) => getRoleRank(effectiveRole) >= getRoleRank(section.role));

	return { user: locals.user, sections, visibleSlugs, previewRole };
};
