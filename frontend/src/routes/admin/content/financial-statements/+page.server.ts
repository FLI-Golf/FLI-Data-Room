import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getContentData, upsertContentData } from '$lib/content-data';

const PERIODS = ['FY 2024', 'FY 2025', 'Q1 2026'];

const IS_ROWS = [
	'revenue', 'cogs', 'grossProfit',
	'ga', 'salesMarketing', 'rd', 'totalOpex',
	'operatingIncome', 'interestExpense', 'netIncome'
];

const BS_ASSETS = ['cash', 'accountsReceivable', 'prepaidOther', 'totalCurrentAssets', 'ppe', 'intangibles', 'totalAssets'];
const BS_LIAB   = ['accountsPayable', 'accruedLiabilities', 'notesPayableCurrent', 'totalCurrentLiabilities', 'longTermDebt', 'totalLiabilities'];
const BS_EQUITY = ['paidInCapital', 'retainedEarnings', 'totalEquity'];

export const load: PageServerLoad = async ({ locals }) => {
	const data = await getContentData(locals.pb, 'financial-statements');
	return { saved: data ?? {}, periods: PERIODS };
};

export const actions: Actions = {
	save: async ({ locals, request }) => {
		const fd = await request.formData();

		const incomeStatement: Record<string, Record<string, string>> = {};
		for (const row of IS_ROWS) {
			incomeStatement[row] = {};
			for (const period of PERIODS) {
				incomeStatement[row][period] = fd.get(`is_${row}_${period}`)?.toString().trim() ?? '';
			}
		}

		const balanceSheet: Record<string, Record<string, Record<string, string>>> = {
			assets: {}, liabilities: {}, equity: {}
		};
		for (const row of BS_ASSETS)  { balanceSheet.assets[row]      = {}; for (const p of PERIODS) balanceSheet.assets[row][p]      = fd.get(`bs_assets_${row}_${p}`)?.toString().trim() ?? ''; }
		for (const row of BS_LIAB)    { balanceSheet.liabilities[row]  = {}; for (const p of PERIODS) balanceSheet.liabilities[row][p]  = fd.get(`bs_liab_${row}_${p}`)?.toString().trim() ?? ''; }
		for (const row of BS_EQUITY)  { balanceSheet.equity[row]       = {}; for (const p of PERIODS) balanceSheet.equity[row][p]       = fd.get(`bs_equity_${row}_${p}`)?.toString().trim() ?? ''; }

		const isDocId = fd.get('isDocId')?.toString().trim() ?? '';
		const bsDocId = fd.get('bsDocId')?.toString().trim() ?? '';

		try {
			await upsertContentData(locals.pb, 'financial-statements', { incomeStatement, balanceSheet, isDocId, bsDocId });
		} catch {
			return fail(500, { error: 'Save failed.' });
		}
		redirect(303, '/admin/content');
	}
};
