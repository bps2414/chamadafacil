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

- Anonymous users can insert tickets.
- Anonymous users cannot list or select arbitrary tickets.
- Ticket lookup should happen through server-side data access that requires both `ticket_number` and `requester_email`.
- Authenticated admins can read all tickets.
- Authenticated admins can update status, urgency, and timestamp fields.

### `ticket_responses`

- Anonymous users cannot list all responses.
- Public lookup can return responses only for the matched ticket.
- Authenticated admins can read and insert responses.

## Seed And Demo Data Plan

Seed data should make the project easy to review without creating fake enterprise complexity.

Recommended seed records:

- One manually created Supabase Auth admin user documented in setup notes.
- Six demo tickets with varied statuses and urgency values.
- Four demo ticket responses.
