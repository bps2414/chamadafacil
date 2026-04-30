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
- Create separate Supabase helpers for browser, server component, server action, and middleware contexts as needed.
- Use the anonymous key for normal client/server SSR access under RLS.
- Keep the service role key server-only and use it only for the constrained public lookup operation if RLS cannot safely express exact ticket-number-and-email access.

## Authentication Strategy

- The MVP has admin authentication only.
- Requesters do not create accounts.
- Admin users are created manually in Supabase or through controlled setup instructions.
- Protected admin pages use server-side auth checks.
- Authorization decisions should verify the user with Supabase Auth `getUser()`, not rely only on an unverified session payload.
- Unauthenticated users visiting `/admin` routes should be redirected to `/admin/login`.

## Server Actions And Data Access Approach

Recommended data operations:

- `createTicket`: validates public ticket form and inserts a ticket.
- `lookupTicket`: validates ticket number and email, then returns only the matching ticket and visible responses.
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
