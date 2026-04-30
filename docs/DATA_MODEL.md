# Data Model: ChamadaFácil

## Tables

## `tickets`

Stores support requests opened by public users.

Columns:

- `id`: UUID primary key.
- `ticket_number`: text, unique, required.
- `requester_name`: text, required.
- `requester_email`: text, required.
- `requester_phone`: text, optional.
- `subject`: text, required.
- `description`: text, required.
- `status`: ticket status enum, required, default `open`.
- `is_urgent`: boolean, required, default `false`.
- `created_at`: timestamp with time zone, required.
- `updated_at`: timestamp with time zone, required.
- `resolved_at`: timestamp with time zone, optional.

## `ticket_responses`

Stores admin responses shown on ticket lookup.

Columns:

- `id`: UUID primary key.
- `ticket_id`: UUID, references `tickets.id`, required.
- `body`: text, required.
- `created_at`: timestamp with time zone, required.

## `public_rate_limits`

Stores hashed abuse-control events for public forms. It is accessed only from server-side code with the Supabase service role key.

Columns:

- `id`: UUID primary key.
- `event_type`: text, required. Allowed values are `ticket_create_email`, `ticket_create_ip`, `ticket_lookup_email`, and `ticket_lookup_ip`.
- `subject_hash`: SHA-256 hash of the normalized IP address or e-mail.
- `created_at`: timestamp with time zone, required.

## Relationships

- One `tickets` row has many `ticket_responses`.
- One `ticket_responses` row belongs to one `tickets` row.

## Status Enum

Recommended database enum name: `ticket_status`.

Values:

- `open`
- `in_progress`
- `resolved`

## Basic RLS And Security Strategy

Enable Row Level Security on all public tables.

### `tickets`

- Anonymous users cannot select, insert, update, or delete tickets directly.
- Public ticket creation happens through a Server Action that validates input, checks request origin, applies rate limiting, and inserts a fixed safe payload with the service role key.
- Anonymous users cannot list or select arbitrary tickets.
- Ticket lookup should happen through server-side data access that requires both `ticket_number` and `requester_email`.
- Authenticated admins can read all tickets.
- Authenticated admins can update only workflow fields needed by the MVP: `status`, `is_urgent`, and `resolved_at`.

### `ticket_responses`

- Anonymous users cannot list all responses.
- Public lookup can return responses only for the matched ticket.
- Authenticated admins can read and insert responses.

### `public_rate_limits`

- RLS is enabled.
- Anonymous and authenticated clients receive no table grants or policies.
- The table is intended for service-role-only writes and cleanup from Server Actions.

## Seed And Demo Data Plan

Seed data should make the project easy to review without creating fake enterprise complexity.

Recommended seed records:

- One manually created Supabase Auth admin user documented in setup notes.
- Six demo tickets with varied statuses and urgency values.
- Four demo ticket responses.
