import type { PageServerLoad } from './$types';
import { getContentData } from '$lib/content-data';

const SECTIONS = [
	{ slug: 'management',            label: 'Management & Team',      description: 'Leadership resumes, advisor bios, board of directors' },
	{ slug: 'industry-reports',      label: 'Industry Reports',       description: 'Market research links and report metadata' },
	{ slug: 'sponsorships',          label: 'Sponsorships',           description: 'Sponsor names, tiers, LOI status' },
	{ slug: 'player-commitments',    label: 'Player Commitments',     description: '24-player roster with names, countries, PDGA ratings' },
	{ slug: 'inaugural-venue',       label: 'Inaugural Venue',        description: 'Top 2 venue candidates with details and pros/cons' },
	{ slug: 'financial-projections', label: 'Financial Projections',  description: 'Full P&L figures and revenue stream mix' },
	{ slug: 'financial-statements',  label: 'Financial Statements',   description: 'Income statement and balance sheet figures' },
	{ slug: 'cap-table',             label: 'Cap Table',              description: 'Equity holders, loan details, seed round status' },
	{ slug: 'how-to-play',           label: 'How to Play',            description: 'Video URL and custom rule descriptions' },
];

export const load: PageServerLoad = async ({ locals }) => {
	const statuses = await Promise.all(
		SECTIONS.map(async (s) => {
			const data = await getContentData(locals.pb, s.slug);
			return { ...s, hasData: data !== null };
		})
	);
	return { sections: statuses };
};
