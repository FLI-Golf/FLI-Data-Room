# FLI Golf League — Investor Data Room

A secure, role-gated investor data room and internal operating platform for FLI Golf League. Built to serve two purposes simultaneously: give investors everything they need to make a funding decision, and serve as the operational blueprint the team will run on post-close.

**Stack:** SvelteKit · TailwindCSS · PocketBase · Netlify (frontend) · Railway (backend)

---

## What This App Does

### Investor-Facing Data Room

Authenticated investors access a structured dashboard covering every dimension of the FLI Golf opportunity:

| Section | What's inside |
|---|---|
| Pitch Deck | Full narrative deck — overview, limitations, built different, why now, roster, team, advisory board, gaming & tribal, broadcast, proceeds, contact |
| The Sport | Disc golf market overview and growth story |
| Market Opportunity | TAM/SAM/SOM, comparable leagues, addressable revenue pools |
| Why FLI Wins | Stadium format, gate economics, broadcast, fantasy & betting, tribal land advantage |
| Technology | All 5 proprietary platforms — Fantasy App, Discord Community, FLIHUB League OS, AI Draft System, AI Production Infrastructure — with platform value table ($150M+ combined) and competitive moat analysis |
| Investment | Full investment opportunity, vision, business model, market analysis, growth plan, exit strategies, risk factors, global comparisons |
| Use of Proceeds | How the $7.5M seed round is deployed |
| Investment Thesis | Core thesis, why now, raise details |
| Design | Brand and visual identity |
| Talent Overview | Championship equity, countries, competitive structure, broadcast strength, committed pros |
| Celebrity Network | Social reach, celebrity roster, network activation |
| Management & Team | Leadership, advisors, board of directors |
| Industry Reports | Third-party market research |
| Sponsorships | Sponsor tiers, LOI status, contracted revenue |
| Player Commitments | 24-player roster with PDGA ratings and countries |
| Inaugural Venue | Top venue candidates with details and pros/cons |
| Financial Projections | 6-year pro forma P&L (2026–2031) with charts |
| CPA Financials | Full CPA-sourced P&L, all 18 revenue streams, sensitivity analysis, cash flow flywheel, live department spend vs budget, investor summary |
| Cap Table | Seed round structure and anticipated equity — full table published at close |
| Financial Statements | Audited statements pending CPA completion — investor context provided |
| Legal / Disclaimers | NDA, regulatory disclosures |
| How to Play | Rules primer, scoring, FLI stadium format |

### Access Tiers

| Role | Access |
|---|---|
| `basic` | Public-facing sections — pitch deck, sport overview, market, design, legal |
| `advanced` | Full data room — financials, cap table, projections, management, sponsorships, talent |
| `admin` | Everything + admin panel for content management |

All users must accept an NDA before accessing any content.

### FLI Sports Technologies Financial Projections

The dashboard's Investment Area 03 card and top navigation open `/dashboard/fli-sports-technologies-financial-projections`, which presents the [published management model](https://docs.google.com/spreadsheets/d/e/2PACX-1vTJZ87mFD_0s9m8L9keQJYAH6HTdUluJCPXo9f0Vk3r2m7UxRwbvOVegsz8kn-nXQ/pubhtml) as native summary cards, a revenue/EBITDA chart and financial schedules. The page shares the existing `fg-sports-technologies` permission and is available in Basic view when that permission allows it. Server-side access checks protect direct visits and browser refreshes; navigation links retain the active preview view.

- **Source:** Google's published `pub?output=xlsx` endpoint exposes all 11 tabs: Summary, Assumptions, League Build, Revenue Build, Cost of Revenue, Operating Expenses, Headcount, Cash Planning, Sensitivity, Audit and Sources. CSV is available, but its default export covers only one tab, so the complete XLSX export is used instead.
- **Maintenance:** The server fetches the published workbook on projections-page load, with a five-minute in-process cache. Subsequent page loads automatically pick up published changes after cache expiry and Google's own publication delay. An already-open page does not poll. There is no manually copied financial dataset. The displayed retrieval time is not the workbook's modification date.
- **Accuracy:** Only cached spreadsheet formula results are read; formulas and new projections are never calculated by the site. Spreadsheet number formats, units, labels, assumptions, notes, sensitivity scenarios and source references are retained. The chart and cards use explicitly labeled Summary metrics, not the rounded source chart labels. Retrieval or validation failures show an unavailable state and retained source attribution, not stale or invented figures. The page credits the published management model without a clickable source link.
- **Schedule charts:** Summary, Assumptions, League Build, Cost of Revenue, Operating Expenses, Headcount and Cash Planning offer Bar chart and Line chart buttons, defaulting to grouped bars. Charts use selected, clearly labeled same-unit source rows: assumptions chart enterprise clients, headcount charts total average paid FTE, and monetary schedules use USD. Exact source formatting is retained in tooltips and accessible tables; missing observations remain gaps, not zeros. The complete schedule tables and notes remain visible. Chart-series selection is defined in `frontend/src/lib/sports-projections-charts.ts`.
- **Table-only schedules:** Revenue Build charts are withheld pending source-label review; Sensitivity is a two-variable scenario grid, Audit contains reconciliation/control checks, and Sources contains reference text. The page explains these choices rather than forcing those schedules into year-based bar/line charts. A source change that makes chart units, labels or periods ambiguous also falls back to tables with an explanation.
- **Dependency security:** ExcelJS 4.4.0 depends on UUID `^8.3.0`; its latest compatible UUID release is 8.3.2. The moderate [GHSA-w5hq-g745-h8pq advisory](https://github.com/advisories/GHSA-w5hq-g745-h8pq) affects the `v3`, `v5` and `v6` APIs with caller-provided output buffers, not `v4`. ExcelJS's only UUID call sites use `v4()` without arguments in conditional-formatting writer code. The site's read-only `workbook.xlsx.load` path does not use those writer operations; an instrumented read of the published workbook invoked no UUID APIs. This advisory is not reachable in the current usage, but the dependency remains flagged by audit. No compatible fixed release is available: the patched UUID 11.1.1 release is outside ExcelJS's supported range, and ExcelJS 4.4.0 is still the latest release. No forced downgrade or dependency override has been applied. Reassess when upstream dependencies or the application's ExcelJS usage changes. The shared `hasown` 2.0.4 resolution is required by the newly added `function.prototype.name` dependency's `^2.0.4` range, so both lockfiles retain it.
- **Review required:** The current Revenue Build tab contains unlabeled numeric rows and labels whose values conflict with identically named Assumptions rows. Its nonzero row labeled `Reconciliation difference` also conflicts with the zero revenue difference on Audit. These are flagged in the section and preserved unchanged; management must resolve them in the source workbook. The model also describes assumption cells as both blue-font and yellow cells; the source governance wording is retained. Cash Planning is illustrative, not a treasury model. The management forecast is not GAAP financial statements and excludes the items listed in its visible limitations.
- **Validation:** Run `npm test` from the frontend directory on Node 22.6 or newer. Tests cover cached formulas (including zero and blank values), source formatting, qualifications, period validation, review flags and chart selection/unit validation. Changes to the workbook layout or Summary labels may require an update to `src/lib/server/sports-projections.ts`.

### Admin Panel (`/admin`)

The admin panel lets the team manage the data room without touching code:

- **Content Editor** — structured forms for management bios, sponsorships, player roster, venue details, financial projections, cap table, and more. Each section has a step-by-step form; saving updates the investor-facing page immediately.
- **Documents** — upload PDFs, Excel models, LOIs, and other files that appear as downloadable links in the data room.
- **Access Control** — manage investor roles (basic / advanced) and NDA acceptance status.
- **Sections** — create custom dynamic sections that appear in the nav automatically.
- **Media** — manage images and assets.

### FLIHUB — League Operating System

Beyond the investor data room, this platform is the operational backbone FLI Golf will run on post-funding. FLIHUB unifies project management, budgets, expenses, sponsors, vendors, people, and league operations into a single business operating system — eliminating the need for disconnected spreadsheets, email threads, and third-party tools.

---

## Contributing

We use **GitHub Issues → Ona environments → PRs** as our development workflow. All work starts with an issue.

### 1. Pick or create an issue

Browse [open issues](../../issues) or create one describing the feature or bug. Issues are tracked in the [GitHub Project board](../../projects).

When creating an issue, include:
- What needs to change and why
- Acceptance criteria (what "done" looks like)

### 2. Launch a dev environment from the issue

We use [Ona (Gitpod Flex)](https://app.gitpod.io) to spin up pre-configured cloud environments directly from GitHub issues.

1. Open the issue on GitHub
2. Click the **Ona** button (or visit [app.gitpod.io](https://app.gitpod.io) → New Environment → paste the issue URL)
3. Ona clones the repo, installs dependencies, and opens VS Code in the browser — ready to code

The environment automatically:
- Installs Node 22 and frontend dependencies (`npm install`)
- Forwards port `5173` (SvelteKit dev server) and `8090` (PocketBase)

### 3. Configure environment variables

Copy the example env file and fill in credentials:

```bash
cp frontend/.env.example frontend/.env
```

Edit `frontend/.env`:

```
POCKETBASE_ADMIN_EMAIL=your-admin@email.com
POCKETBASE_ADMIN_PASSWORD=your-password
PUBLIC_POCKETBASE_URL=https://your-pocketbase-url.up.railway.app
```

> Ask a maintainer for the Railway PocketBase URL and admin credentials if you don't have them.

### 4. Start the dev server

```bash
cd frontend && npm run dev
```

PocketBase runs on the shared Railway instance via `PUBLIC_POCKETBASE_URL`. No local PocketBase needed for most development.

### 5. Make your changes

- Work on a branch named after the issue: `git checkout -b issue-<number>-short-description`
- Keep commits focused and descriptive
- Run lint and type checks before pushing:

```bash
cd frontend
npm run lint
npm run check
```

### 6. Push and open a PR

```bash
git push -u origin issue-<number>-short-description
```

Then open a pull request on GitHub:
- Link the issue in the PR description using `Closes #<issue-number>`
- The PR will appear on the project board automatically
- Request a review from a maintainer

### 7. After merge

The environment can be stopped or deleted from [app.gitpod.io](https://app.gitpod.io). Ona environments are ephemeral — nothing is lost in the repo.

---

## Project Structure

```
.
├── frontend/                  # SvelteKit app (deployed to Netlify)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── +page.svelte           # Landing page
│   │   │   ├── login/                 # Auth
│   │   │   ├── register/              # Investor access request
│   │   │   ├── nda/                   # NDA acceptance gate
│   │   │   ├── dashboard/             # All investor-facing sections
│   │   │   └── admin/                 # Admin panel
│   │   └── lib/
│   │       ├── content-data.ts        # PocketBase content read/write helpers
│   │       ├── page-access.ts         # Role-based access control per route
│   │       ├── pocketbase.ts          # PocketBase client
│   │       └── types.ts               # Shared TypeScript types
│   ├── package.json
│   └── .env.example
├── pocketbase/
│   └── pb_migrations/         # Schema migrations — always commit these
└── .devcontainer/             # Ona / VS Code dev container config
```

## Environment Variables

| Variable | Where | Description |
|---|---|---|
| `PUBLIC_POCKETBASE_URL` | `frontend/.env` | PocketBase instance URL (Railway) |
| `POCKETBASE_ADMIN_EMAIL` | `frontend/.env` | Admin email for server-side auth |
| `POCKETBASE_ADMIN_PASSWORD` | `frontend/.env` | Admin password for server-side auth |

Production variables are set in the Netlify dashboard.

## PocketBase Migrations

Schema changes made in the PocketBase admin UI generate migration files in `pocketbase/pb_migrations/`. Always commit these files so any environment can replay the schema to match production. See [`pocketbase/pb_migrations/README.md`](pocketbase/pb_migrations/README.md) for export instructions.

## Content Redundancy — Known Issues & Cleanup Plan

The data room was built intentionally broad — include more than needed, then remove what's redundant. The following issues have been identified and are candidates for cleanup before the data room is shown to investors at scale.

### 🔴 High Priority — Conflicting or Confusing Data

#### 1. Two financial model pages with different numbers
`financial-projections/` and `cpa-financials/` both show a 2026–2031 P&L, but with slightly different figures (e.g. 2031 revenue: $182.7M vs $188.98M). This creates investor confusion about which is authoritative.

**Plan:** Merge `financial-projections/` into `cpa-financials/` as a tab. Retire the standalone `financial-projections/` page or redirect it.

#### 2. Two player roster pages with identical players
`talent/` and `player-commitments/` both hardcode the same 20 players. A roster change requires updating two separate arrays.

**Plan:** Merge into one page with a "Talent Overview" tab and a "Roster / LOI" tab.

---

### 🟡 Medium Priority — Duplicate Content Across Pages

#### 3. $7.5M seed round details on 7+ pages
The same raise facts — $7.5M, Q3 2026, Young America Capital, SEC/FINRA/SIPC, 4-bucket use of proceeds — appear verbatim on `investment-thesis/`, `proceeds/`, `cap-table/`, `financial-statements/`, `cpa-financials/`, `pitch-deck/`, and the landing page.

**Plan:** Keep `proceeds/` as the canonical detail page. All other pages show a single stat card and link to it.

#### 4. `investment/` is a superset of 3 other pages
`investment/` contains investment opportunity, vision, business model, market analysis, growth plan, exit strategies, and risk factors — overlapping with `investment-thesis/`, `why-fli-wins/`, and `market-opportunity/`. It appears to be an older, more verbose version of content that was later split into dedicated pages.

**Plan:** Audit whether `investment/` is still needed or can be retired in favor of the dedicated pages.

#### 5. Stadium format explained on 3 pages
The FLI stadium concept (par-3 course, spectator seating, broadcast-first design) is covered on `how-to-play/`, `design/`, and `why-fli-wins/`. The `design/` page is the thinnest in the dashboard — essentially a single image and 3 bullets covered more thoroughly elsewhere.

**Plan:** Fold `design/` content into `how-to-play/`. Remove the standalone `design/` page.

---

### 🟢 Low Priority — Repeated Stats (Acceptable for Now)

#### 6. Sport growth stats on 4 pages
86% participation growth, 17,000+ courses, 20M+ players, 99 countries appear on `the-sport/`, `industry-reports/`, `investment-thesis/`, and the landing page. `the-sport/` is the authoritative source.

**Plan:** Centralize into a shared data module (`$lib/sport-stats.ts`) so a single update propagates everywhere.

#### 7. Market opportunity numbers on 4 pages
$18B SAM, $180M at 1% capture, and the 9 revenue pools appear on `market-opportunity/`, `investment-thesis/`, `industry-reports/`, `pitch-deck/`, and the landing page.

**Plan:** Same as above — shared data module.

#### 8. Living analogs (TGL/MLP/LIV) on 3 pages
Covered on `why-fli-wins/`, `investment-thesis/`, and `investment/`.

**Plan:** Keep the full treatment on `why-fli-wins/` only. Replace other instances with a one-liner and a link.

#### 9. Tribal gaming narrative on 4 pages
$43.9B GGR, Gary Santos background, tribal land venue advantage appears on `why-fli-wins/`, `investment-thesis/`, `market-opportunity/`, `pitch-deck/`, and `management/`.

**Plan:** Keep the full treatment on `market-opportunity/` and `management/`. Reduce other instances to a stat + link.

---

### Cleanup Priority Order

| Priority | Action | Pages affected |
|---|---|---|
| 1 | Merge `talent/` + `player-commitments/` | 2 pages → 1 |
| 2 | Merge `financial-projections/` into `cpa-financials/` | 2 pages → 1 |
| 3 | Remove Use of Proceeds block from `investment-thesis/`, link to `proceeds/` | 1 page |
| 4 | Fold `design/` into `how-to-play/` | 2 pages → 1 |
| 5 | Audit and potentially retire `investment/` | 1 page |
| 6 | Centralize sport stats and market numbers into shared data modules | 4+ pages each |
| 7 | Reduce $7.5M seed block to stat card + link on all pages except `proceeds/` | 6 pages |

---

## Adding a New Dashboard Section

1. Create `frontend/src/routes/dashboard/<slug>/+page.svelte`
2. Add a `+page.server.ts` that calls `requirePageAccess('<slug>', locals)`
3. Add `'<slug>': 'basic' | 'advanced'` to the `DEFAULTS` map in `src/lib/page-access.ts`
4. Add a nav entry to the `nav` array in `src/routes/dashboard/+layout.svelte`
