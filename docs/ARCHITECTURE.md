# Architecture: ChamadaFácil

## Folder Structure

Recommended structure:

```text
src/
  app/
    (public)/
      page.tsx
      tickets/
        new/
          page.tsx
        lookup/
          page.tsx
    (admin)/
      admin/
        login/
          page.tsx
        page.tsx
        tickets/
          [id]/
            page.tsx
    layout.tsx
    globals.css
  components/
    admin/
    tickets/
    ui/
  lib/
    data/
    formatters/
    supabase/
    validation/
supabase/
  migrations/
  seed.sql
docs/
```

## Frontend And Backend Boundaries

- Use Server Components for page-level data reads by default.
- Use Client Components only for interactive UI that requires browser state.
- Use Server Actions for form submissions and mutations.
- Keep Supabase queries in `src/lib/data` or `src/lib/supabase`, not scattered across components.
- Keep validation schemas in `src/lib/validation`.
- Keep display formatting helpers in `src/lib/formatters`.

## Supabase Integration Strategy

- Use Supabase PostgreSQL for application data.
- Use Supabase Auth for admin authentication.
- Use `@supabase/ssr` for cookie-based auth in the Next.js App Router.
- Create separate Supabase helpers for browser, server component, server action, and Next.js Proxy contexts as needed.
- Use the anonymous key for normal client/server SSR access under RLS.
- Keep the service role key server-only. It is used only inside Server Actions for constrained public ticket creation, public lookup, and abuse-rate tracking.
- Do not expose direct anonymous table inserts for public tickets in production. Public creation must pass through server-side validation, same-origin checks, rate limiting, and a fixed insert payload.

## Authentication Strategy

- The MVP has admin authentication only.
- Requesters do not create accounts.
- Admin users are created manually in Supabase or through controlled setup instructions.
- Public signups must remain disabled in production.
- Any authenticated Supabase user is intentionally treated as an admin/operator for this single-company MVP. This is only acceptable when the Supabase Auth user list is controlled manually.
- Protected admin pages use server-side auth checks.
- Authorization decisions should verify the user with Supabase Auth `getUser()`, not rely only on an unverified session payload.
- Unauthenticated users visiting `/admin` routes should be redirected to `/admin/login`.

## Server Actions And Data Access Approach

Recommended data operations:

- `createTicket`: verifies request origin, validates public ticket form, rate-limits by IP and e-mail, and inserts a safe ticket payload.
- `lookupTicket`: verifies request origin, validates ticket number and email, rate-limits lookup attempts, then returns only the matching ticket and visible responses.
- `signInAdmin`: authenticates admin login.
- `signOutAdmin`: ends the admin session.
- `listAdminTickets`: reads tickets for the admin dashboard.
- `updateTicketStatus`: updates status and derived timestamps.
- `updateTicketUrgency`: marks or unmarks a ticket as urgent.
- `createTicketResponse`: inserts an admin response.

Keep mutation results explicit: success, validation error, unauthorized, or unexpected failure.

## Environment Variables

Required:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Recommended local file:

- `.env.local`

Rules:

- Never expose `SUPABASE_SERVICE_ROLE_KEY` in client components.
- Use `NEXT_PUBLIC_` only for values safe to expose in the browser.
- Document all required variables in `.env.example` during implementation.

## Security Headers And CSRF Model

- Security headers are applied globally in `next.config.ts`.
- Server Actions rely on Next.js same-origin `Origin`/`Host` validation. Public forms also perform an explicit same-origin guard before rate-limited actions.
- Admin mutations re-check Supabase Auth inside each Server Action. Page-level route protection is treated as a UX boundary, not the only security boundary.
- No custom CSRF token is used because the state-changing entry points are Server Actions with same-origin enforcement and server-side authentication checks.

## Deployment Notes

### Vercel

Vercel is the primary deployment target for the MVP because it supports Next.js App Router with minimal configuration.

Deployment flow:

- Push the repository to GitHub.
- Import the project into Vercel.
- Add Supabase environment variables in Vercel project settings.
- Run the production build.
- Confirm public routes, admin auth, and Supabase connectivity.

Cloudflare Pages is intentionally postponed because it can require extra Next.js adapter/runtime configuration. Keep Vercel as the only MVP deployment target.
