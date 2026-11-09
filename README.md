# Hana Chanyalew — Business Analytics Portfolio

A responsive Next.js portfolio with interactive, illustrative analytics case studies and Neon-backed portfolio content and contact inquiries.

## Run locally

1. Install Node.js 20.9 or newer.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env.local` and set `DATABASE_URL` to a Neon pooled connection string.
4. Run `schema.sql` against the Neon database using the Neon SQL Editor or `psql`.
5. Start the development server with `npm run dev`.

Without `DATABASE_URL`, the site uses clearly identified preview content so it can be explored locally. Inquiry submissions require a configured Neon database and are never reported as successful when storage is unavailable.

## Neon content

The `projects`, `skills`, and `experience` tables are the source of listable portfolio content. `schema.sql` creates and seeds those tables with illustrative portfolio examples. All case-study metrics and dashboard figures use synthetic demonstration data and must not be interpreted as Hana's verified professional outcomes. Edit the seed rows or insert new records to manage the portfolio.

Contact submissions are validated on the server and stored in `contact_inquiries`. Keep `DATABASE_URL` server-side; do not expose it through a `NEXT_PUBLIC_` variable. Restrict database access and apply your organization's retention policy before using this form in production.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
