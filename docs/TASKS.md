# Implementation Tasks: ChamadaFácil

## UI Reference Requirement

Before starting any task that creates or changes UI, open `docs/VISUAL_REFERENCE.md` and inspect the route-specific image in `docs/visual-reference/screens/`.

Acceptance criteria for UI phases must include alignment with the saved visual references: clean small-business support tool, restrained marketing, practical admin density, accessible colors, and no out-of-scope navigation such as pricing, knowledge base, chat, analytics, or attachments.

## Phase 0: Project Setup

### Goal

Create the base Next.js project structure and development foundation without building product features yet.

### Files Likely To Be Touched

- `package.json`
- `next.config.ts`
- `tsconfig.json`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `.env.example`
- `supabase/migrations/*`
- `supabase/seed.sql`

### Tasks

- Initialize Next.js with App Router, TypeScript, and Tailwind CSS.
- Create the recommended `src/` folder structure.
- Add base metadata and global styles.
- Add Supabase dependencies.
- Add Supabase environment variable example.
- Create initial database migration plan.
- Add seed file placeholder.

### Acceptance Criteria

- The app starts locally.
- TypeScript is enabled.
- Tailwind styles are available.
- The project has a clear folder structure.
- Required environment variables are documented.

### What NOT To Do In This Phase

- Do not build ticket forms.
- Do not build admin workflows.
- Do not add knowledge base pages.
- Do not overconfigure tooling beyond the MVP needs.

## Phase 1: Landing Page And Visual Foundation

### Goal

Build the public visual foundation and home page in Brazilian Portuguese.

### Files Likely To Be Touched

- `src/app/(public)/page.tsx`
- `src/components/ui/*`
- `src/components/tickets/*`
- `src/app/globals.css`

### Tasks

- Create the public home page.
- Add primary CTAs for opening and checking tickets.
- Create shared button, input, badge, and layout primitives.
- Establish responsive spacing, typography, and colors.

### Acceptance Criteria

- Home page works on mobile and desktop.
- Public CTAs are clear and visible.
- UI copy is in Brazilian Portuguese.
- The visual direction matches the design document.
- Basic accessibility requirements are met.

### What NOT To Do In This Phase

- Do not connect forms to Supabase.
- Do not create admin pages.
- Do not add dashboard metrics.
- Do not introduce a component library unless clearly needed.

## Phase 2: Ticket Creation And Lookup

### Goal

Allow public users to create tickets and look up ticket status.

### Files Likely To Be Touched

- `src/app/(public)/tickets/new/page.tsx`
- `src/app/(public)/tickets/lookup/page.tsx`
- `src/components/tickets/*`
- `src/lib/data/tickets.ts`
- `src/lib/validation/tickets.ts`
- `src/lib/supabase/*`
- `supabase/migrations/*`

### Tasks

- Create the `tickets` table migration.
- Add ticket status enum and urgent flag.
- Implement ticket creation validation.
- Implement ticket number generation.
- Build the new ticket form.
- Show ticket creation success with ticket number.
- Implement ticket lookup by ticket number and requester email.
- Display ticket status, urgency, request details, and admin responses.

### Acceptance Criteria

- A public user can create a ticket without an account.
- Invalid form data returns clear field-level errors.
- A created ticket receives a unique ticket number.
- Lookup works only with the correct ticket number and email.
- Anonymous users cannot browse all tickets.

### What NOT To Do In This Phase

- Do not create admin ticket editing.
- Do not add email notifications.
- Do not add file uploads.
- Do not add requester accounts.

## Phase 3: Admin Authentication And Dashboard

### Goal

Create protected admin access and a useful ticket dashboard.

### Files Likely To Be Touched

- `src/app/(admin)/admin/login/page.tsx`
- `src/app/(admin)/admin/page.tsx`
- `src/components/admin/*`
- `src/lib/data/admin-tickets.ts`
- `src/lib/supabase/*`
- `middleware.ts`
- `supabase/migrations/*`

### Tasks

- Configure Supabase SSR auth helpers.
- Create admin login flow.
- Protect `/admin` routes.
- Create admin dashboard ticket list.
- Add status and urgency filters.
- Add responsive mobile ticket list behavior.
- Add empty states for no tickets and no filter results.

### Acceptance Criteria

- Unauthenticated users are redirected away from admin pages.
- Admin login succeeds with valid Supabase credentials.
- Admin dashboard lists tickets.
- Filters update the ticket list.
- Dashboard is usable on mobile.

### What NOT To Do In This Phase

- Do not build full ticket response workflow.
- Do not add complex roles.
- Do not create public signup.
- Do not add analytics charts.

## Phase 4: Ticket Management

### Goal

Allow admins to manage a ticket lifecycle and write requester-visible responses.

### Files Likely To Be Touched

- `src/app/(admin)/admin/tickets/[id]/page.tsx`
- `src/components/admin/*`
- `src/components/tickets/*`
- `src/lib/data/admin-tickets.ts`
- `src/lib/validation/admin-tickets.ts`
- `supabase/migrations/*`

### Tasks

- Create the ticket detail page.
- Display requester information and ticket description.
- Display the ticket response timeline.
- Allow status updates.
- Allow urgency updates.
- Create admin response form.
- Store public responses in `ticket_responses`.
- Set `resolved_at` when relevant.

### Acceptance Criteria

- Admin can open a ticket from the dashboard.
- Admin can update status.
- Admin can mark or unmark a ticket as urgent.
- Admin can add a public response.
- Public lookup shows responses for the matched ticket.

### What NOT To Do In This Phase

- Do not add real-time chat.
- Do not add internal notes unless future scope is approved.
- Do not add email automation.
- Do not add attachments.

## Phase 5: MVP Integration And Security Pass

### Goal

Tighten the finished ticket workflow before adding any second-version feature.

### Files Likely To Be Touched

- `src/app/(public)/**/*`
- `src/app/(admin)/**/*`
- `src/components/**/*`
- `src/lib/data/**/*`
- `supabase/migrations/*`
- `supabase/seed.sql`

### Tasks

- Review public ticket lookup so it cannot list or expose unrelated tickets.
- Review admin route protection.
- Seed a small realistic demo dataset.
- Verify empty, loading, error, and success states across the ticket flow.
- Verify mobile layouts for public forms, dashboard, and ticket detail.
- Remove any unused routes, components, or schema ideas from the MVP.

### Acceptance Criteria

- Public lookup requires both ticket number and requester email.
- Anonymous users cannot browse tickets or responses.
- Admin pages require authentication.
- Demo data makes the project easy to review.
- The whole MVP remains usable on mobile.

### What NOT To Do In This Phase

- Do not add knowledge base pages.
- Do not add search.
- Do not add analytics.
- Do not add extra schema tables.

## Phase 6: Polish, Testing, Deploy, README

### Goal

Finish the MVP into a stable, presentable, deploy-ready project.

### Files Likely To Be Touched

- `README.md`
- `docs/*`
- `.env.example`
- `src/**/*`
- `supabase/**/*`

### Tasks

- Review UI copy for Brazilian Portuguese consistency.
- Test all public flows.
- Test all admin flows.
- Verify mobile layouts.
- Run accessibility checks for labels, focus states, and contrast.
- Run lint and production build.
- Update README with setup, environment variables, and deployment steps.
- Add screenshots if available.
- Deploy to Vercel or document final deployment steps.

### Acceptance Criteria

- Ticket creation works.
- Ticket lookup works.
- Admin login works.
- Admin dashboard works.
- Ticket management works.
- Mobile UI is usable.
- Production build succeeds.
- README explains the project clearly for portfolio review.

### What NOT To Do In This Phase

- Do not add new MVP features during polish.
- Do not introduce chat, payments, or multi-tenant functionality.
- Do not rewrite the design direction.
- Do not leave setup instructions incomplete.
