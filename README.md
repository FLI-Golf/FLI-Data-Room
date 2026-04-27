# FLI Data Room

A SvelteKit + PocketBase application for FLI Golf's internal data room.

**Stack:** SvelteKit · TailwindCSS · PocketBase · Netlify (frontend) · Railway (backend)

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

Copy the example env file and fill in the PocketBase URL:

```bash
cp .env.example frontend/.env
```

Edit `frontend/.env`:

```
PUBLIC_POCKETBASE_URL=https://your-pocketbase-url.up.railway.app
```

> Ask a maintainer for the Railway PocketBase URL if you don't have it.

### 4. Start the dev servers

**Frontend (SvelteKit):**

```bash
cd frontend && npm run dev
```

**PocketBase** — connect to the shared Railway instance via `PUBLIC_POCKETBASE_URL`, or run a local instance:

```bash
# Pull and run PocketBase locally (optional)
docker compose up
```

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

## Project structure

```
.
├── frontend/          # SvelteKit app (deployed to Netlify)
│   ├── src/
│   ├── package.json
│   └── .env.example   # copy to frontend/.env for local dev
├── pocketbase/
│   └── pb_migrations/ # schema migrations — always commit these
└── .devcontainer/     # Ona / VS Code dev container config
```

## Environment variables

| Variable | Where | Description |
|---|---|---|
| `PUBLIC_POCKETBASE_URL` | `frontend/.env` | PocketBase instance URL (Railway) |

Production variables are set in the Netlify dashboard.

## PocketBase migrations

Schema changes made in the PocketBase admin UI generate migration files in `pocketbase/pb_migrations/`. Always commit these files so any environment can replay the schema to match production. See [`pocketbase/pb_migrations/README.md`](pocketbase/pb_migrations/README.md) for export instructions.
