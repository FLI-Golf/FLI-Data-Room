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

		const photos = [];
		let i = 0;
		while (fd.has(`name_${i}`)) {
			photos.push({
				name:     fd.get(`name_${i}`)?.toString()     ?? '',
				photoUrl: fd.get(`photoUrl_${i}`)?.toString().trim() ?? '',
			});
			i++;
		}

		try {
			await upsertContentData(locals.pb, 'management', { photos });
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e);
			return fail(500, { error: `Save failed: ${msg}` });
		}

		return { success: true };
	}
};
