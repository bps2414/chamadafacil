# Admin And Auth Review

## Current Model

ChamadaFacil uses Supabase Auth with e-mail/password for administrative access.

- Login happens at `/admin/login` through `signInAdminAction`.
- Logout happens through `signOutAdminAction`.
- Admin pages under `/admin` are protected by Next.js Proxy and server-side checks.
- Admin Server Actions call `supabase.auth.getUser()` inside the action before mutating data.

## Single-Company Tradeoff

There is no custom admin role table in this MVP. Any authenticated Supabase user is treated as an admin/operator. This is an intentional single-company tradeoff and is acceptable only if production public signups are disabled and admin users are created manually.

## Hardening Notes

- Public ticket creation and lookup now pass through server-side validation, same-origin checks, and database-backed rate limits.
- Anonymous clients do not receive direct table grants for ticket data.
- Authenticated users can update only ticket workflow fields needed by the MVP: status, urgency, and resolved timestamp.
- User-generated content is rendered as text, not HTML.
- The service role key is server-only and must never be exposed in client code.

For the full production checklist, see `docs/SECURITY.md`.
