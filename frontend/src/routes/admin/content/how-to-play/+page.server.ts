import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getContentData, upsertContentData } from '$lib/content-data';

export const load: PageServerLoad = async ({ locals }) => {
	const data = await getContentData(locals.pb, 'how-to-play');
	return { saved: data ?? {} };
};

export const actions: Actions = {
	save: async ({ locals, request }) => {
		const fd = await request.formData();

		const videoUrl   = fd.get('videoUrl')?.toString().trim() ?? '';
		const videoTitle = fd.get('videoTitle')?.toString().trim() ?? '';

		const fliDifference = [];
		let i = 0;
		while (fd.get(`diff_${i}_label`) !== null) {
			fliDifference.push({
				label:       fd.get(`diff_${i}_label`)?.toString().trim() ?? '',
				description: fd.get(`diff_${i}_description`)?.toString().trim() ?? '',
			});
			i++;
		}

		const resources = [];
		let j = 0;
		while (fd.get(`res_${j}_label`) !== null) {
			resources.push({
				label: fd.get(`res_${j}_label`)?.toString().trim() ?? '',
				url:   fd.get(`res_${j}_url`)?.toString().trim() ?? '',
			});
			j++;
		}

		try {
			await upsertContentData(locals.pb, 'how-to-play', { videoUrl, videoTitle, fliDifference, resources });
		} catch {
			return fail(500, { error: 'Save failed.' });
		}
		redirect(303, '/admin/content');
	}
};
