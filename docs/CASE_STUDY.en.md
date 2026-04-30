# Case Study: ChamadaFácil

## 1. Overview

ChamadaFácil is a web-based help desk system for small businesses in Brazil. It allows public users to create support tickets, track their status using a ticket code and e-mail, and gives authenticated operators a protected admin interface to manage the support queue.

The project was built as a full-stack portfolio piece, with a realistic MVP scope, clear documentation, proportional security decisions, and a professional user experience.

## 2. Problem

Small businesses often receive support requests through scattered channels such as WhatsApp, e-mail, phone calls, informal messages, or spreadsheets. This makes it easy to lose context, miss requests, duplicate answers, and leave requesters without clear status updates.

The core problem was to create a simple way to register, track, and respond to support tickets without turning the MVP into an overly complex platform.

## 3. Target Audience

- Small businesses that need to organize internal or external support requests.
- Requesters who want to track a ticket without creating an account.
- Operators or admins who need to view, filter, and respond to tickets.
- Recruiters and technical reviewers looking for evidence of full-stack fundamentals.

## 4. Solution

ChamadaFácil provides a direct workflow:

1. A requester creates a public ticket.
2. The system generates a unique ticket code.
3. The requester tracks the ticket with code and e-mail.
4. The operator accesses a protected admin panel.
5. The operator filters, updates status, marks urgency, and publishes responses.

The model is single-company/single-tenant. The system is designed as an internal tool for one company, not as a multi-company SaaS product in the MVP.

## 5. My Role

I worked end-to-end on the MVP definition and implementation:

- Defined the functional scope and conscious limitations.
- Modeled the database for tickets, responses, and rate limiting.
- Implemented the public and admin interfaces.
- Configured authentication with Supabase Auth.
- Applied RLS and database access rules.
- Created server-side validation for forms.
- Prepared setup, security, deployment, and portfolio documentation.

## 6. Core Features

Implemented:

- Brazilian Portuguese landing page.
- Public ticket creation without requester accounts.
- Automatic ticket number generation.
- Ticket lookup by code and e-mail.
- Admin login with Supabase Auth.
- Protected admin dashboard.
- Responsive ticket list.
- Filters by status and urgency.
- Ticket detail screen.
- Status updates.
- Urgency toggle.
- Public operator responses.
- Loading, error, empty, and success states.
- Local seed data for review.

Not implemented in the MVP:

- Knowledge base.
- File attachments.
- E-mail notifications.
- Public requester accounts.
- Multi-company support.
- SLA tracking.
- CSV export.

## 7. Technical Decisions

| Decision | Reason |
| --- | --- |
| Next.js App Router | Organizes public and private routes with Server Components and Server Actions. |
| TypeScript | Reduces errors in data contracts, form states, and models. |
| Tailwind CSS | Enables a responsive interface with speed and visual consistency. |
| Supabase Auth | Avoids building custom authentication for the admin panel. |
| Supabase PostgreSQL | Provides a real relational database with migrations and constraints. |
| RLS | Keeps data access rules close to the database. |
| Server Actions | Processes forms on the server with validation and access control. |
| Single-company MVP | Keeps the scope realistic and avoids multi-tenant complexity before it is needed. |

## 8. Architecture

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
    security/
    supabase/
    validation/
supabase/
  migrations/
  seed.sql
```

Applied separation:

- `app`: routes and page composition.
- `components`: public UI, admin UI, and shared primitives.
- `lib/data`: queries, mutations, and workflow rules.
- `lib/validation`: form validation rules.
- `lib/security`: same-origin guard and rate limiting.
- `lib/supabase`: Supabase client creation.
- `supabase/migrations`: schema and database policies.

## 9. Database

Main tables:

- `tickets`: ticket, requester, subject, description, status, urgency, and timestamps.
- `ticket_responses`: public responses related to a ticket.
- `public_rate_limits`: public form rate-limit events with hashed subjects.

Statuses:

- `open`
- `in_progress`
- `resolved`

Relationship:

- One ticket has many responses.
- One response belongs to one ticket.

The local seed creates demo tickets and a local-only admin user for development.

The names, e-mails, and companies used in the seed are fictional and only support local review of the workflow. They do not represent organizations served by the project.

## 10. Authentication and Security

The admin panel uses Supabase Auth with e-mail and password login.

The current authorization model is intentionally simple: any authenticated Supabase user is treated as an admin/operator. This is a conscious choice for a single-company MVP and depends on an important condition: public signups must be disabled in production, and users must be created manually.

Implemented measures:

- Admin routes protected by Next.js Proxy.
- Server-side authenticated-user checks on admin pages.
- Authentication checks inside admin Server Actions.
- RLS on public tables.
- No direct anonymous access to tickets and responses.
- Public creation and lookup through controlled Server Actions.
- Server-side field validation.
- Rate limiting by IP and e-mail using hashes.
- Service role key used only on the server.
- Global security headers.

Future improvements:

- RBAC.
- Role-based permissions.
- Change audit trail.
- Defensive admin event logging.
- Edge/WAF rate limiting.

## 11. UI/UX

The interface was designed to be clear, direct, and appropriate for small businesses. The priority was to avoid a generic empty dashboard and build a workflow that is understandable both for requesters and support operators.

UI/UX highlights:

- Landing page with visible primary actions.
- Public form split into requester information and ticket details.
- Ticket code highlighted after creation.
- Simple lookup by code and e-mail.
- Admin dashboard with compact stats and filters.
- Responsive list using cards on mobile and a table on desktop.
- Ticket detail with requester data, timeline, and management panel.
- Visual feedback for success, error, loading, and empty states.

## 12. Responsiveness

The project includes mobile and desktop adaptation:

- Public navigation with a mobile menu.
- Responsive form grids.
- Dashboard cards on smaller screens.
- Admin list cards on mobile.
- Ticket detail layout with a side panel on desktop and stacked flow on mobile.

## 13. Challenges

Main technical challenges:

- Balancing public ticket access without requester accounts and without exposing all tickets.
- Preventing public ticket listing.
- Keeping the admin panel simple but still meaningful.
- Documenting MVP limitations honestly.
- Using the service role only in controlled server-side paths.
- Defining a viable single-company authentication model without implementing RBAC too early.

## 14. Learnings

The project reinforced practical experience in:

- Relational data modeling.
- PostgreSQL migrations.
- Supabase Auth.
- Row Level Security.
- Server Actions in the Next.js App Router.
- Server-side validation.
- Form states.
- Basic abuse protection.
- Public/private route organization.
- Technical documentation for portfolio review.

## 15. Conscious MVP Limitations

- No public requester accounts.
- No RBAC; every authenticated Supabase user is an admin/operator.
- No multi-company support.
- No file attachments.
- No e-mail notifications.
- No SLA tracking.
- No knowledge base.
- No automated test script yet.

These limitations were kept intentionally to preserve a focused, demonstrable, and coherent MVP.

## 16. Future Improvements

- RBAC with admin, operator, and viewer roles.
- Multi-company support with tenant isolation.
- E-mail notifications when tickets are created or answered.
- File uploads.
- Change history and audit logs.
- SLA labels and overdue indicators.
- Ticket volume and resolution-time metrics.
- CSV export.
- Knowledge base.
- Internal-only operator notes.
- Automated tests.

## 17. Resume Bullets

- Built a full-stack web application for creating, tracking, and managing technical support tickets.
- Implemented an authenticated admin dashboard with filters, status management, urgency handling, and operator responses.
- Designed the data model for tickets, responses, and support workflows using PostgreSQL.
- Configured authentication, RLS access policies, server-side validation, and deployment-ready project structure.
- Created a responsive interface with Next.js, TypeScript, and Tailwind CSS, including loading, error, empty, and success states.

## 18. Portfolio Card Text

ChamadaFácil is a help desk web application for small businesses, featuring public ticket creation, ticket lookup by code and e-mail, an authenticated admin dashboard, filters, status and urgency management, and operator responses. The project demonstrates full-stack development with Next.js, TypeScript, Tailwind CSS, Supabase Auth, PostgreSQL, and RLS within a realistic MVP scope.
