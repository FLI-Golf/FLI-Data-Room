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
}

interface ContentBlock {
	id: string;
	section: string;
	type: 'text' | 'media';
	heading: string;
	body: string;
	media: string;
	sort_order: number;
	expand?: { media?: { id: string; name: string; file: string; collectionId: string; alt: string } };
}

interface MediaRecord {
	id: string;
	name: string;
	file: string;
	tag: string;
	alt: string;
	collectionId: string;
}

export const load: PageServerLoad = async ({ locals, params }) => {
	try {
		const section = await locals.pb.collection('sections').getOne<Section>(params.id);
		const blocks  = await locals.pb.collection('section_content').getFullList<ContentBlock>({
			filter: `section = "${params.id}"`,
			sort:   'sort_order,created',
			expand: 'media'
		}).catch(() => [] as ContentBlock[]);
		const mediaLibrary = await locals.pb.collection('media').getFullList<MediaRecord>({ sort: 'name' })
			.catch(() => [] as MediaRecord[]);

		return { section, blocks, mediaLibrary };
	} catch {
		redirect(303, '/admin/sections');
	}
};

export const actions: Actions = {
	updateSection: async ({ locals, params, request }) => {
		const data        = await request.formData();
		const name        = data.get('name')?.toString().trim();
		const description = data.get('description')?.toString().trim() ?? '';
		const role        = data.get('role')?.toString() ?? 'basic';
		const published   = data.get('published') === 'on';
		const icon        = data.get('icon')?.toString().trim() ?? '';

		if (!name) return fail(400, { error: 'Name is required.' });

		const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
		try {
			await locals.pb.collection('sections').update(params.id, { name, slug, description, role, published, icon });
		} catch {
			return fail(500, { error: 'Update failed.' });
		}
	},

	addText: async ({ locals, params, request }) => {
		const data    = await request.formData();
		const heading = data.get('heading')?.toString().trim() ?? '';
		const body    = data.get('body')?.toString().trim() ?? '';
		if (!body && !heading) return fail(400, { error: 'Heading or body required.' });
		try {
			await locals.pb.collection('section_content').create({
				section: params.id, type: 'text', heading, body, sort_order: 99
			});
		} catch {
			return fail(500, { error: 'Failed to add block.' });
		}
	},

	addMedia: async ({ locals, params, request }) => {
		const data    = await request.formData();
		const media   = data.get('media')?.toString();
		const heading = data.get('heading')?.toString().trim() ?? '';
		if (!media) return fail(400, { error: 'Select a media item.' });
		try {
			await locals.pb.collection('section_content').create({
				section: params.id, type: 'media', heading, media, sort_order: 99
			});
		} catch {
			return fail(500, { error: 'Failed to add block.' });
		}
	},

	deleteBlock: async ({ locals, request }) => {
		const data = await request.formData();
		const id   = data.get('id')?.toString();
		if (!id) return fail(400, { error: 'Missing ID.' });
		try {
			await locals.pb.collection('section_content').delete(id);
		} catch {
			return fail(500, { error: 'Delete failed.' });
		}
	},

	moveBlock: async ({ locals, request }) => {
		const data      = await request.formData();
		const id        = data.get('id')?.toString();
		const direction = data.get('direction')?.toString();
		const order     = parseInt(data.get('sort_order')?.toString() ?? '0');
		if (!id) return fail(400, { error: 'Missing ID.' });
		const newOrder = direction === 'up' ? order - 1 : order + 1;
		try {
			await locals.pb.collection('section_content').update(id, { sort_order: newOrder });
		} catch {
			return fail(500, { error: 'Move failed.' });
		}
	}
};
