import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getContentData, upsertContentData } from '$lib/content-data';

export const load: PageServerLoad = async ({ locals }) => {
	const data = await getContentData(locals.pb, 'cap-table');
	return { saved: data ?? {} };
};

export const actions: Actions = {
	save: async ({ locals, request }) => {
		const fd = await request.formData();

		const seedRound = {
			target:       fd.get('seed_target')?.toString().trim() ?? '',
			raised:       fd.get('seed_raised')?.toString().trim() ?? '',
			pricePerUnit: fd.get('seed_pricePerUnit')?.toString().trim() ?? '',
			minInvestment:fd.get('seed_minInvestment')?.toString().trim() ?? '',
			broker:       fd.get('seed_broker')?.toString().trim() ?? '',
		};

		const equityHolders = [];
		let i = 0;
		while (fd.get(`eq_${i}_name`) !== null) {
			equityHolders.push({
				name:   fd.get(`eq_${i}_name`)?.toString().trim() ?? '',
				type:   fd.get(`eq_${i}_type`)?.toString().trim() ?? '',
				shares: fd.get(`eq_${i}_shares`)?.toString().trim() ?? '',
				amount: fd.get(`eq_${i}_amount`)?.toString().trim() ?? '',
				pct:    fd.get(`eq_${i}_pct`)?.toString().trim() ?? '',
				date:   fd.get(`eq_${i}_date`)?.toString().trim() ?? '',
			});
			i++;
		}

		const loans = [];
		let j = 0;
		while (fd.get(`loan_${j}_lender`) !== null) {
			loans.push({
				lender:   fd.get(`loan_${j}_lender`)?.toString().trim() ?? '',
				amount:   fd.get(`loan_${j}_amount`)?.toString().trim() ?? '',
				rate:     fd.get(`loan_${j}_rate`)?.toString().trim() ?? '',
				maturity: fd.get(`loan_${j}_maturity`)?.toString().trim() ?? '',
				status:   fd.get(`loan_${j}_status`)?.toString().trim() ?? '',
			});
			j++;
		}

		try {
			await upsertContentData(locals.pb, 'cap-table', { seedRound, equityHolders, loans });
		} catch {
			return fail(500, { error: 'Save failed.' });
		}
		redirect(303, '/admin/content');
	}
};
