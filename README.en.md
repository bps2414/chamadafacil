# ChamadaFacil

A web-based support ticket system for small businesses in Brazil, with public ticket creation, ticket lookup by code/e-mail, and a protected admin panel for operating the support queue.

> Status: functional portfolio MVP. This project demonstrates a realistic single-company help desk workflow without claiming multi-tenancy, full RBAC, attachments, automated e-mail, or enterprise SaaS scope.

## Quick Review Path

1. Open the demo: [chamadafacil.vercel.app](https://chamadafacil.vercel.app/).
2. Review the public flow at `/tickets/new`: create a ticket and copy the generated code.
3. Track the ticket at `/tickets/lookup` using code and e-mail.
4. Review the admin panel in the README/case study and, locally, sign in at `/admin/login` with the development seed account.
5. Check the technical highlights: Server Actions, Supabase Auth, PostgreSQL/RLS, server-side validation, basic rate limiting, and unit tests.

Useful links:

| Resource | Link |
| --- | --- |
| Demo | [chamadafacil.vercel.app](https://chamadafacil.vercel.app/) |
| Repository | [github.com/bps2414/chamadafacil](https://github.com/bps2414/chamadafacil) |
| Case study | [docs/CASE_STUDY.en.md](./docs/CASE_STUDY.en.md) |
| Security notes | [docs/SECURITY.md](./docs/SECURITY.md) |
| Deployment | [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) |
| Portfolio copy | [docs/PORTFOLIO_COPY.md](./docs/PORTFOLIO_COPY.md) |
| Portuguese README | [README.md](./README.md) |

## What This Project Is

ChamadaFacil addresses a common small-business problem: support requests scattered across WhatsApp, e-mail, phone calls, and spreadsheets. The product keeps the essential workflow organized:

- A requester creates a ticket without an account.
- The system generates a unique ticket code.
- The requester tracks progress with code and e-mail.
- An authenticated operator manages queue, status, urgency, and responses.

The current scope is single-company/single-tenant. This keeps the MVP small, reviewable, and honest for portfolio evaluation.

## Screenshots

Screenshots use fictional data and must not expose environment variables, tokens, cookies, or real credentials.

| Screen | Preview |
| --- | --- |
| Landing page | ![ChamadaFacil landing page](./public/screenshots/landing-desktop.png) |
| Ticket creation | ![Ticket creation form](./public/screenshots/ticket-new-form.png) |
| Ticket lookup | ![Ticket lookup screen](./public/screenshots/ticket-lookup-form.png) |
| Admin login | ![Admin login](./public/screenshots/admin-login.png) |
| Admin dashboard | ![Admin dashboard](./public/screenshots/admin-dashboard.png) |
| Admin ticket detail | ![Admin ticket detail](./public/screenshots/admin-ticket-detail.png) |

Full checklist: [docs/SCREENSHOTS_CHECKLIST.md](./docs/SCREENSHOTS_CHECKLIST.md).

## Implemented Features

### Public Flow

- Brazilian Portuguese landing page.
- Public ticket creation without requester accounts.
- Server-side validation for name, e-mail, phone, subject, and description.
- Automatic ticket number generation in the `CF-YYYY-00000` format.
- Success state with highlighted ticket code, copy button, and lookup CTA.
- Ticket lookup by ticket number and e-mail.
- Result screen with status, urgency, original description, and public responses.
- Neutral not-found copy when the code/e-mail combination does not match a ticket.

### Admin Panel

- Admin login with Supabase Auth.
- `/admin` routes protected by Proxy and server-side checks.
- Dashboard with compact stats.
- Responsive list: table on desktop and cards on mobile.
- Filters by status, urgency, and response state.
- Search by ticket number, subject, and requester.
- Sorting by update date, creation date, and urgency.
- Highlights for urgent and unanswered tickets.
- Ticket detail with requester data and timeline.
- Status, urgency, and public response management.

### Quality and Security

- PostgreSQL migrations and constraints.
- Row Level Security on app tables.
- Server Actions for creation, lookup, and admin mutations.
- Server-side validation for public and admin forms.
- Same-origin guard for public workflows.
- Basic IP/e-mail rate limiting with hashed subjects.
- `SUPABASE_SERVICE_ROLE_KEY` used only in server-side code.
- Security headers in `next.config.ts`.
- Vitest unit tests for validation, filters, and pure workflow rules.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js App Router |
| UI | React, TypeScript, and Tailwind CSS |
| Auth | Supabase Auth |
| Database | Supabase PostgreSQL |
| Data security | Supabase RLS |
| Mutations | Server Actions |
| Tests | Vitest |
| Deployment target | Vercel |

Main versions are listed in [`package.json`](./package.json).

## Technical Decisions

- App Router separates public and admin areas.
- Server Actions centralize validation, authorization, and mutations.
- RLS prevents improper direct table access.
- Public lookup requires both ticket code and e-mail to reduce ticket exposure.
- Admin is modeled as an internal tool: users are created manually in Supabase.
- Admin filters live in the URL so the queue state can be refreshed or shared.
- Pure rules and validation helpers are isolated for tests that do not require the database.

## Local Development

Requirements:

- Node.js `20.9.0` or newer.
- npm.
- Supabase CLI.
- Docker Desktop, if running Supabase locally.

Install dependencies:

```bash
npm install
```

Create the local environment file:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Fill the variables in `.env.local`.

Start local Supabase and apply migrations/seed:

```bash
npm run supabase:start
npm run supabase:db:reset
```

Run the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

Local seed admin:

```text
E-mail: admin@chamadafacil.com.br
Password: admin123
```

This account is for local development only. Do not publish it as a production demo login.

Local ticket lookup sample after seed:

```text
Ticket: CF-2026-00001
E-mail: juliana.martins@padariabona.com.br
```

Seed data is fictional.

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SITE_URL=https://chamadafacil.vercel.app
```

| Variable | Exposure | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public/browser-safe | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public/browser-safe | Public anon key used with RLS. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Controlled public workflows and rate limiting. |
| `SITE_URL` | Public/canonical | Canonical, Open Graph, robots, and sitemap. |

Never prefix the service role key with `NEXT_PUBLIC_`, and never place real secrets in README files, screenshots, logs, or public issues.

## Commands

```bash
npm run dev
npm test
npm run lint
npm run typecheck
npm run build
npm run supabase:start
npm run supabase:stop
npm run supabase:status
npm run supabase:db:reset
npm run supabase:link
```

Recommended final checks before publishing:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

## Deployment

The documented target is Vercel with hosted Supabase.

Production checklist:

1. Configure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `SITE_URL` in the provider.
2. Apply migrations to the remote Supabase project.
3. Disable public signups in Supabase Auth.
4. Manually create operators in Authentication > Users.
5. Do not apply the local seed in production.
6. Smoke test public and private routes.

Full guide: [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md).

## Conscious Limitations

- No RBAC; every authenticated Supabase user is an operator/admin.
- No multi-company or multi-tenant support.
- No public requester accounts.
- No attachments/uploads.
- No transactional e-mail.
- No SLA, due dates, or overdue indicators.
- No knowledge base.
- No internal operator notes.
- No advanced audit trail.

These items are possible future work, not completed features.

## Possible Roadmap

- RBAC with admin, operator, and viewer roles.
- Company/tenant isolation.
- E-mail notifications.
- Attachments.
- SLA and overdue indicators.
- CSV export.
- More detailed audit trail.
- Knowledge base.
- Internal notes.

## Portfolio Summary

ChamadaFacil is a full-stack help desk for small businesses, with public ticket creation, code/e-mail lookup, an authenticated admin panel, an operational queue with search/filters/sorting, public responses, and documentation ready for technical review. It demonstrates Next.js, TypeScript, Supabase Auth, PostgreSQL/RLS, Server Actions, server-side validation, basic rate limiting, and tests within an honest MVP scope.
