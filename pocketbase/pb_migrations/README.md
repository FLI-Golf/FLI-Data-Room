# PocketBase Migrations

PocketBase auto-generates migration files here when schema changes are made via the admin UI.

**Commit these files.** They allow any PocketBase instance to replay schema changes and reach
the same state as production.

## How to export migrations from Railway

1. Open the Railway PocketBase admin UI
2. Make schema changes (collections, fields, rules)
3. PocketBase writes migration files to `/pb_migrations` inside the container
4. Copy them out:

```bash
railway run cat /pb_migrations/<filename>.js > pocketbase/pb_migrations/<filename>.js
```

Or use the Railway shell to download them manually.
