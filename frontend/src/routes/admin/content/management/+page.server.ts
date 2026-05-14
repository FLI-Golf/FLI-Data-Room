import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getContentData, upsertContentData } from '$lib/content-data';

export const load: PageServerLoad = async ({ locals }) => {
	const data = await getContentData(locals.pb, 'management');
	return { saved: data ?? {} };
};

export const actions: Actions = {
	save: async ({ locals, request }) => {
		const fd = await request.formData();

		const leadership = [];
		let i = 0;
		while (fd.has(`leadership_${i}_name`)) {
			leadership.push({
				name:     fd.get(`leadership_${i}_name`)?.toString().trim()     ?? '',
				title:    fd.get(`leadership_${i}_title`)?.toString().trim()    ?? '',
				bio:      fd.get(`leadership_${i}_bio`)?.toString().trim()      ?? '',
				email:    fd.get(`leadership_${i}_email`)?.toString().trim()    ?? '',
				linkedin: fd.get(`leadership_${i}_linkedin`)?.toString().trim() ?? '',
				photoUrl: fd.get(`leadership_${i}_photoUrl`)?.toString().trim() ?? '',
				docId:    fd.get(`leadership_${i}_docId`)?.toString().trim()    ?? '',
			});
			i++;
		}

		const advisors = [];
		let j = 0;
		while (fd.has(`advisor_${j}_name`)) {
			advisors.push({
				name:     fd.get(`advisor_${j}_name`)?.toString().trim()     ?? '',
				title:    fd.get(`advisor_${j}_title`)?.toString().trim()    ?? '',
				bio:      fd.get(`advisor_${j}_bio`)?.toString().trim()      ?? '',
				photoUrl: fd.get(`advisor_${j}_photoUrl`)?.toString().trim() ?? '',
			});
			j++;
		}

		const directors = [];
		let k = 0;
		while (fd.has(`director_${k}_name`)) {
			directors.push({
				name:     fd.get(`director_${k}_name`)?.toString().trim()     ?? '',
				title:    fd.get(`director_${k}_title`)?.toString().trim()    ?? '',
				bio:      fd.get(`director_${k}_bio`)?.toString().trim()      ?? '',
				photoUrl: fd.get(`director_${k}_photoUrl`)?.toString().trim() ?? '',
			});
			k++;
		}

		try {
			await upsertContentData(locals.pb, 'management', { leadership, advisors, directors });
		} catch {
			return fail(500, { error: 'Save failed. Check PocketBase content_data collection.' });
		}

		return { success: true };
	}
};
