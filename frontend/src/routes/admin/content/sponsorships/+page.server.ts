import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getContentData, upsertContentData } from '$lib/content-data';

export const load: PageServerLoad = async ({ locals }) => {
	const data = await getContentData(locals.pb, 'sponsorships');
	return { saved: data ?? {} };
};

export const actions: Actions = {
	save: async ({ locals, request }) => {
		const fd = await request.formData();

		const sponsors = [];
		let i = 0;
		while (fd.get(`sponsor_${i}_name`) !== null) {
			sponsors.push({
				name:       fd.get(`sponsor_${i}_name`)?.toString().trim() ?? '',
				tier:       fd.get(`sponsor_${i}_tier`)?.toString().trim() ?? '',
				category:   fd.get(`sponsor_${i}_category`)?.toString().trim() ?? '',
				value:      fd.get(`sponsor_${i}_value`)?.toString().trim() ?? '',
				loiStatus:  fd.get(`sponsor_${i}_loiStatus`)?.toString() ?? 'pending',
				docId:      fd.get(`sponsor_${i}_docId`)?.toString().trim() ?? '',
				notes:      fd.get(`sponsor_${i}_notes`)?.toString().trim() ?? '',
			});
			i++;
		}

		try {
			await upsertContentData(locals.pb, 'sponsorships', { sponsors });
		} catch {
			return fail(500, { error: 'Save failed.' });
		}
		redirect(303, '/admin/content');
	}
};
