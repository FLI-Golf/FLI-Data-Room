import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getContentData, upsertContentData } from '$lib/content-data';

const YEARS = ['2026', '2027', '2028', '2029', '2030', '2031'];

export const load: PageServerLoad = async ({ locals }) => {
	const data = await getContentData(locals.pb, 'financial-projections');
	return { saved: data ?? {}, years: YEARS };
};

export const actions: Actions = {
	save: async ({ locals, request }) => {
		const fd = await request.formData();

		const projections = YEARS.map(year => ({
			year,
			revenue:      fd.get(`${year}_revenue`)?.toString().trim() ?? '',
			cogs:         fd.get(`${year}_cogs`)?.toString().trim() ?? '',
			grossProfit:  fd.get(`${year}_grossProfit`)?.toString().trim() ?? '',
			opex:         fd.get(`${year}_opex`)?.toString().trim() ?? '',
			ebitda:       fd.get(`${year}_ebitda`)?.toString().trim() ?? '',
			netIncome:    fd.get(`${year}_netIncome`)?.toString().trim() ?? '',
			margin:       fd.get(`${year}_margin`)?.toString().trim() ?? '',
			notes:        fd.get(`${year}_notes`)?.toString().trim() ?? '',
		}));

		const revenueStreams = [];
		let i = 0;
		while (fd.get(`stream_${i}_name`) !== null) {
			revenueStreams.push({
				stream:  fd.get(`stream_${i}_name`)?.toString().trim() ?? '',
				pct2026: fd.get(`stream_${i}_pct2026`)?.toString().trim() ?? '',
				pct2031: fd.get(`stream_${i}_pct2031`)?.toString().trim() ?? '',
			});
			i++;
		}

		const excelDocId = fd.get('excelDocId')?.toString().trim() ?? '';

		try {
			await upsertContentData(locals.pb, 'financial-projections', { projections, revenueStreams, excelDocId });
		} catch {
			return fail(500, { error: 'Save failed.' });
		}
		redirect(303, '/admin/content');
	}
};
