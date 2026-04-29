import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

interface Section {
	id: string;
	name: string;
	slug: string;
	description: string;
	role: 'basic' | 'advanced' | 'admin';
	published: boolean;
	sort_order: number;
	created: string;
}

function toSlug(name: string) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const sections = await locals.pb
			.collection('sections')
			.getFullList<Section>({ sort: 'sort_order,created' });
		return { sections };
	} catch {
		return { sections: [] as Section[] };
	}
};

export const actions: Actions = {
	create: async ({ locals, request }) => {
		const data = await request.formData();
		const name        = data.get('name')?.toString().trim();
		const description = data.get('description')?.toString().trim() ?? '';
		const role        = data.get('role')?.toString() ?? 'basic';
		const icon        = data.get('icon')?.toString().trim() ?? '';

		if (!name) return fail(400, { error: 'Name is required.' });

		const slug = toSlug(name);

		try {
			const section = await locals.pb.collection('sections').create({
				name, slug, description, role, icon, published: false, sort_order: 99
			});
			redirect(303, `/admin/sections/${section.id}`);
		} catch {
			return fail(500, { error: 'Failed to create section.' });
		}
	},

	delete: async ({ locals, request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		if (!id) return fail(400, { error: 'Missing ID.' });
		try {
			await locals.pb.collection('sections').delete(id);
		} catch {
			return fail(500, { error: 'Delete failed.' });
		}
	},

	togglePublish: async ({ locals, request }) => {
		const data      = await request.formData();
		const id        = data.get('id')?.toString();
		const published = data.get('published') === 'true';
		if (!id) return fail(400, { error: 'Missing ID.' });
		try {
			await locals.pb.collection('sections').update(id, { published: !published });
		} catch {
			return fail(500, { error: 'Update failed.' });
		}
	}
};
