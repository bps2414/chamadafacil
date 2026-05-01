# Case Study: ChamadaFacil

## 1. Overview

ChamadaFacil is a web-based support ticket system for small businesses in Brazil. It supports public ticket creation without accounts, ticket lookup by code/e-mail, and a protected admin panel for operating the support queue.

It was built as a full-stack portfolio project: small enough to review quickly, but grounded in real product, data, basic security, tests, and documentation decisions.

Links:

- Demo: [chamadafacil.vercel.app](https://chamadafacil.vercel.app)
- GitHub: [github.com/bps2414/chamadafacil](https://github.com/bps2414/chamadafacil)

## 2. Problem

Small businesses often receive support requests through scattered channels: WhatsApp, e-mail, phone calls, informal messages, and spreadsheets. This makes prioritization, follow-up, response history, and requester clarity harder.

The challenge was to create a simple help desk workflow without turning the MVP into a large SaaS platform or a generic CRUD.

## 3. Solution

The implemented workflow covers the essentials:

1. A requester creates a public ticket.
2. The system generates a unique ticket code.
3. The requester tracks progress with code and e-mail.
4. An operator signs into a protected panel.
5. The operator searches, filters, sorts, updates status/urgency, and publishes responses.

The model is single-company/single-tenant. One company uses the tool internally; multi-company support and RBAC are outside the current MVP.

## 4. My Role

- Defined functional scope and conscious limitations.
- Modeled tickets, responses, and rate-limit events.
- Implemented public and admin routes.
- Configured Supabase Auth, RLS, and migrations.
- Created server-side validation and testable pure rules.
- Prepared setup, deployment, security, and portfolio documentation.

## 5. Implemented Features

Public:

- Brazilian Portuguese landing page.
- Public ticket creation without accounts.
- Automatically generated and copyable ticket code.
- Lookup CTA after ticket creation.
- Lookup by code/e-mail with result screen, timeline, and neutral not-found copy.

Admin:

- Supabase Auth login.
- Protected dashboard.
- Compact stats.
- Search by number, subject, and requester.
- Filters by status, urgency, and response state.
- Sorting by update date, creation date, and urgency.
- Highlights for urgent and unanswered tickets.
- Responsive list using table/cards.
- Ticket detail with requester data, history, status, urgency, and public response form.

Technical:

- PostgreSQL migrations.
- RLS on core tables.
- Server Actions for public and admin workflows.
- Server-side validation.
- Same-origin guard.
- Basic rate limiting with hashes.
- Vitest unit tests.

## 6. Technical Decisions

| Decision | Reason |
| --- | --- |
| Next.js App Router | Separates public/admin routes and supports Server Components/Actions. |
| Supabase Auth | Avoids custom authentication for the admin panel. |
| PostgreSQL/RLS | Provides a real relational database and data-level protection. |
| Server Actions | Processes forms on the server with validation and authorization. |
| Code + e-mail lookup | Prevents public listing and reduces ticket exposure. |
| URL-based filters | Makes the admin queue refreshable and shareable. |
| Tests for pure rules | Validates behavior without requiring local Supabase. |
| Single-company MVP | Keeps the scope honest and demonstrable. |

## 7. Architecture

```text
src/
  app/
    (public)/
      page.tsx
      tickets/new/page.tsx
      tickets/lookup/page.tsx
    (admin)/
      admin/login/page.tsx
      admin/page.tsx
      admin/tickets/[id]/page.tsx
  components/
    admin/
    tickets/
    ui/
  lib/
    data/
    formatters/
    security/
    supabase/
    validation/
supabase/
  migrations/
  seed.sql
docs/
```

Responsibilities:

- `app`: routes, layouts, and composition.
- `components`: public UI, admin UI, and shared components.
- `lib/data`: queries, mutations, and workflow rules.
- `lib/validation`: input validation.
- `lib/security`: same-origin guard and rate limiting.
- `lib/formatters`: date formatting.
- `supabase/migrations`: schema, grants, and policies.

## 8. Database

Main tables:

- `tickets`: requester, subject, description, status, urgency, and timestamps.
- `ticket_responses`: public operator responses.
- `public_rate_limits`: abuse-control events with `subject_hash`.
- `auth.users`: Supabase users treated as operators/admins in the MVP.

Statuses:

- `open`
- `in_progress`
- `resolved`

The local seed creates fictional data and a development-only admin account. It should not be used in production.

## 9. Security

Implemented measures:

- Supabase Auth for the admin panel.
- `/admin` routes protected by Proxy.
- Admin Server Actions re-check the authenticated user.
- RLS on `tickets`, `ticket_responses`, and `public_rate_limits`.
- No public ticket listing.
- Public creation/lookup mediated by Server Actions.
- Server-side validation.
- Same-origin guard for public flows.
- Basic IP/e-mail rate limiting with hashes.
- Service role key used only on the server.
- Security headers in `next.config.ts`.

Conscious limit: every authenticated Supabase user is treated as an operator/admin. In production, public signups must be disabled and operators must be created manually.

## 10. UX

The UX goal was to communicate an operational tool, not a decorative landing page:

- Clear CTAs for creating and tracking tickets.
- Direct public form.
- Success state with copyable code and visible next step.
- Lookup result with status, urgency, history, and follow-up guidance.
- Admin queue with dense filters and operational signals.
- Mobile cards and stacked controls.
- Loading, empty, error, and success states.

## 11. Tests

The project uses Vitest for lower-dependency checks:

- Public validations.
- Admin validations.
- Ticket number normalization.
- Admin filter parser.
- Pure `resolved_at` rule.
- Relative date formatting.

Command:

```bash
npm test
```

## 12. Conscious Limitations

- No RBAC.
- No multi-company support.
- No public requester accounts.
- No attachments.
- No e-mail notifications.
- No SLA or due dates.
- No knowledge base.
- No internal notes.
- No advanced audit trail.

These limitations keep the MVP coherent and reviewable.

## 13. Future Improvements

- RBAC with roles.
- Multi-company tenant isolation.
- Transactional e-mail.
- File uploads.
- SLA and overdue indicators.
- Detailed audit trail.
- CSV export.
- Knowledge base.
- Internal notes.
- Integration/e2e tests.

## 14. Interview Summary

"I wanted to avoid a generic CRUD. I modeled a realistic support workflow: public ticket creation without accounts, lookup by code/e-mail, and a protected admin panel. I used Next.js with Server Actions, Supabase Auth, PostgreSQL with RLS, server-side validation, basic rate limiting, and unit tests. I kept the scope honest: it is a single-company MVP, not an enterprise SaaS."

## 15. Resume Bullets

- Built a full-stack help desk with public ticket creation, code/e-mail lookup, and authenticated admin panel.
- Modeled tickets, responses, and rate-limit events in PostgreSQL with migrations and RLS.
- Implemented Server Actions with server-side validation, admin route protection, and server-only service role usage.
- Created an operational admin queue with search, filters, sorting, urgency/unanswered highlights, and responsive layout.
- Added unit tests for validations, filters, and pure ticket workflow rules.
