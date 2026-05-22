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

## Adding a New Dashboard Section

1. Create `frontend/src/routes/dashboard/<slug>/+page.svelte`
2. Add a `+page.server.ts` that calls `requirePageAccess('<slug>', locals)`
3. Add `'<slug>': 'basic' | 'advanced'` to the `DEFAULTS` map in `src/lib/page-access.ts`
4. Add a nav entry to the `nav` array in `src/routes/dashboard/+layout.svelte`
