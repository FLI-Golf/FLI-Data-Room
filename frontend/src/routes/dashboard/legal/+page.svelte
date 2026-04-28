<svelte:head>
	<title>Legal — FINRA / SEC Disclaimer — FLI Golf Data Room</title>
</svelte:head>

<div class="max-w-4xl space-y-8">
	<div>
		<h1 class="text-3xl font-black text-white">FINRA / SEC Disclaimer</h1>
		<p class="mt-1 text-white/50">Legal disclosures and cautionary statements</p>
	</div>

	<!-- Disclaimers -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6 space-y-4">
		<h2 class="text-base font-bold text-white">Disclaimers</h2>
		<div class="space-y-3 text-sm text-white/60 leading-relaxed">
			<p>This Presentation (the "Presentation") contains sensitive business and financial information. It is being delivered on behalf of the Company by Young America Capital, LLC ("YAC"). The sole purpose of this Presentation is to assist the recipient in deciding whether to proceed with a further inquiry of the Company. This Presentation does not purport to be all-inclusive or to necessarily contain all the information that a prospective investor may desire in evaluating a possible business transaction with the Company.</p>
			<p>By accepting this Presentation, the recipient agrees to keep confidential the information contained herein or made available in connection with any further inquiry of the Company. This Presentation may not be photocopied, reproduced, or distributed to others at any time without the prior written consent of Young America Capital, LLC. Upon request, the recipient will promptly return all materials received from the Company or YAC (including this Presentation) without retaining any copies thereof, all in accordance with the Confidentiality Agreement.</p>
			<p>This Presentation has been prepared for informational purposes relating to this transaction only and upon the express understanding that it will be used only for the purposes set forth above. Neither the Company nor YAC makes any express or implied representation or warranty as to the accuracy or completeness of the information contained herein or made available in connection with any further investigation of the Company. Each of the Company and YAC expressly disclaims any and all liability which may be based on such information, errors therein or omissions therefrom.</p>
			<p>The recipient shall be entitled to rely solely on the representations and warranties made to it in any definitive agreement and the due diligence that recipient conducts. In furnishing this Presentation, neither the Company nor YAC undertakes any obligation to provide the recipient with access to any additional information. This Presentation shall neither be deemed an indication of the state of affairs of the Company nor constitute an indication that there has not been any change in the Company or affairs of the Company since the date hereof, nor an indication that YAC has performed any due diligence on the Company or its affairs.</p>
			<p>This Presentation does not constitute an offer to sell or solicitation of an offer to buy securities in any jurisdiction where, or to any person to whom, it is unlawful to make such offer or solicitation in such jurisdiction. Investments in private placements may be illiquid, highly speculative and you may lose your entire investment.</p>
			<p>This Presentation includes certain statements, estimates and projections with respect to the anticipated future performance of the Company. Such statements, estimates and projections are based on significant assumptions and subjective judgment concerning anticipated results. These assumptions and judgments are inherently subject to risks, variability, and contingencies, many of which are beyond the Company's control. These assumptions and judgments may or may not prove to be correct and there can be no assurance that any projected results are obtainable or will be realized. Actual results likely will vary from those projected, and such variations may be material.</p>
			<p>In addition, this Presentation does not describe certain risks associated with the Company's business. All communications or inquiries relating to the Company or this Presentation should be directed to the representative of Young America Capital, LLC. No personnel at the Company may be contacted directly unless expressly permitted by YAC.</p>
			<p class="text-white/30">© 2021 All rights reserved.</p>
		</div>
	</div>

	<!-- Forward Looking Statements -->
	<div class="rounded-xl border border-white/15 bg-navy-700/50 p-6 space-y-4">
		<h2 class="text-base font-bold text-white">Cautionary Statement Concerning Forward-Looking Statements</h2>
		<div class="space-y-3 text-sm text-white/60 leading-relaxed">
			<p>This document contains forward-looking statements. In addition, from time to time, we or our representatives may make forward-looking statements orally or in writing. We base these forward-looking statements on our expectations and projections about future events, which we derive from the information currently available to us. Such forward-looking statements relate to future events or our future performance, including: our financial performance and projections; our growth in revenue and earnings; and our business prospects and opportunities.</p>
			<p>You can identify forward-looking statements by those that are not historical in nature, particularly those that use terminology such as "may," "should," "expects," "anticipates," "contemplates," "estimates," "believes," "plans," "projected," "predicts," "potential," or "hopes" or the negative of these or similar terms.</p>
			<p>In evaluating these forward-looking statements, you should consider various factors, including: our ability to change the direction of the Company; our ability to keep pace with new technology and changing market needs; and the competitive environment of our business. These and other factors may cause our actual results to differ materially from any forward-looking statement.</p>
			<p>Forward-looking statements are only predictions. The forward-looking events discussed in this document and other statements made from time to time by us or our representatives, may not occur, and actual events and results may differ materially and are subject to risks, uncertainties, and assumptions about us. We are not obligated to publicly update or revise any forward-looking statement, whether as a result of uncertainties and assumptions, the forward-looking events discussed in this document and other statements made from time to time by us or our representatives might not occur.</p>
		</div>

		<!-- Risk bullets -->
		<div class="mt-4 space-y-2">
			{#each [
				'If we experience significant disruptions in our information technology systems, our business may be adversely affected.',
				'Security and privacy breaches may expose us to liability and harm our reputation and business.',
				'We may be unable to enforce our intellectual property rights throughout the world.',
				'If we are unable to successfully expand our sales and customer support team and address our customers\' needs, it could negatively impact sales and market acceptance of our products and we may never generate sufficient revenues to achieve or sustain profitability.',
				'The trademarked logos in the player images are for example and placeholding only. They DO NOT represent current league sponsors or advertising partners.'
			] as risk}
				<div class="flex items-start gap-2.5 rounded-lg bg-navy-800/50 border border-white/10 px-4 py-3">
					<span class="text-white/30 shrink-0 mt-0.5">•</span>
					<p class="text-xs text-white/50 leading-relaxed">{risk}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- YAC branding -->
	<div class="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5 flex items-center justify-between gap-4">
		<div>
			<div class="text-sm font-bold text-white">Young America Capital, LLC</div>
			<div class="text-xs text-white/40 mt-0.5">Placement Agent · FINRA Member</div>
		</div>
		<div class="text-xs text-white/30 text-right">
			All inquiries must be directed through YAC.<br/>
			No direct contact with Company personnel without YAC authorization.
		</div>
	</div>
</div>
