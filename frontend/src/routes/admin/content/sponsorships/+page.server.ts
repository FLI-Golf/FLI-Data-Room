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
			const name = fd.get(`sponsor_${i}_name`)?.toString().trim() ?? '';
			const category = fd.get(`sponsor_${i}_category`)?.toString().trim() ?? '';
			const value = fd.get(`sponsor_${i}_value`)?.toString().trim() ?? '';
			const docId = fd.get(`sponsor_${i}_docId`)?.toString().trim() ?? '';
			const notes = fd.get(`sponsor_${i}_notes`)?.toString().trim() ?? '';

			// Ignore completely empty rows.
			if (!name && !category && !value && !docId && !notes) {
				i++;
				continue;
			}

			if (!name) {
				return fail(400, { error: `Sponsor ${i + 1} is missing a name.` });
			}

			sponsors.push({
				name,
				tier:       fd.get(`sponsor_${i}_tier`)?.toString().trim() ?? '',
				category,
				value,
				loiStatus:  fd.get(`sponsor_${i}_loiStatus`)?.toString() ?? 'pending',
				docId,
				notes,
			});
			i++;
		}

		if (sponsors.length === 0) {
			return fail(400, { error: 'Please add at least one sponsor before saving.' });
		}

		try {
			await upsertContentData(locals.pb, 'sponsorships', { sponsors });
		} catch {
			return fail(500, { error: 'Save failed.' });
		}
		redirect(303, '/admin/content');
	}
};
