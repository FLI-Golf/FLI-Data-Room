import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getContentData, upsertContentData } from '$lib/content-data';

export const load: PageServerLoad = async ({ locals }) => {
	const data = await getContentData(locals.pb, 'industry-reports');
	return { saved: data ?? {} };
};

export const actions: Actions = {
	save: async ({ locals, request }) => {
		const fd = await request.formData();

		const reports = [];
		let i = 0;
		while (fd.get(`report_${i}_title`) !== null) {
			reports.push({
				title:       fd.get(`report_${i}_title`)?.toString().trim() ?? '',
				source:      fd.get(`report_${i}_source`)?.toString().trim() ?? '',
				year:        fd.get(`report_${i}_year`)?.toString().trim() ?? '',
				description: fd.get(`report_${i}_description`)?.toString().trim() ?? '',
				url:         fd.get(`report_${i}_url`)?.toString().trim() ?? '',
				docId:       fd.get(`report_${i}_docId`)?.toString().trim() ?? '',
				proprietary: fd.get(`report_${i}_proprietary`) === 'on',
			});
			i++;
		}

		try {
			await upsertContentData(locals.pb, 'industry-reports', { reports });
		} catch {
			return fail(500, { error: 'Save failed.' });
		}
		redirect(303, '/admin/content');
	}
};
