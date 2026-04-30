# Functional Specification: ChamadaFácil

## Routes And Pages

### Public Routes

- `/`: home page with a concise product explanation and primary actions.
- `/tickets/new`: ticket creation page.
- `/tickets/lookup`: ticket lookup page.

### Admin Routes

- `/admin/login`: admin login page.
- `/admin`: protected ticket dashboard.
- `/admin/tickets/[id]`: protected ticket detail and management page.

## Main Components

- `PublicHeader`: navigation for public pages.
- `AdminHeader`: navigation for admin pages.
- `TicketForm`: public ticket creation form.
- `TicketLookupForm`: ticket number and email lookup form.
- `TicketSummary`: public ticket result view.
- `TicketStatusBadge`: visual label for ticket status.
- `TicketUrgencyBadge`: visual label for urgent tickets.
- `TicketTimeline`: chronological ticket description and responses.
- `AdminTicketFilters`: status and urgency filter controls.
- `AdminTicketList`: responsive ticket list/table.
- `AdminTicketDetail`: ticket management panel.
- `AdminResponseForm`: response creation form.
- `EmptyState`: shared empty-state component.
- `FormError`: shared form-level error component.

## Forms

### New Ticket Form

Fields:

- `requester_name`
- `requester_email`
- `requester_phone`
- `subject`
- `description`

Behavior:

- Creates a new ticket with status `open`.
- Creates a generated `ticket_number`.
- Shows a success state with the ticket number.
- Does not require requester account creation.

### Ticket Lookup Form

Fields:

- `ticket_number`
- `requester_email`

Behavior:

- Returns only tickets matching both values.
- Shows the ticket status, urgency, original request, and admin responses.
- Shows a neutral not-found message if there is no match.

### Admin Login Form

Fields:

- `email`
- `password`

Behavior:

- Authenticates through Supabase Auth.
- Redirects authenticated users to `/admin`.
- Shows a generic authentication error on failure.

### Admin Ticket Management Form

Fields:

- `status`
- `is_urgent`
- `response_body`

Behavior:

- Allows admins to update ticket status.
- Allows admins to mark or unmark a ticket as urgent.
- Allows admins to create public responses for requesters.
- Disables response submission while saving.

## Validation Rules

- `requester_name`: required, 2 to 80 characters.
- `requester_email`: required, valid email format, max 160 characters.
- `requester_phone`: optional, max 30 characters.
- `subject`: required, 5 to 120 characters.
- `description`: required, 20 to 2000 characters.
- `ticket_number`: required, normalized uppercase, expected generated format.
- `response_body`: required for admin responses, 2 to 2000 characters.
- `status`: required, must match allowed status enum.
- `is_urgent`: boolean.

## Ticket Status Rules

Allowed statuses:

- `open`: ticket was created and has not been started.
- `in_progress`: admin is actively working on the ticket.
- `resolved`: admin believes the issue is solved.

Rules:

- New tickets always start as `open`.
- Admins may move tickets between active statuses.
- Setting a ticket to `resolved` should set `resolved_at`.
- Public users cannot change status or urgency.

## Urgency Rules

Rules:

- New tickets default to `is_urgent = false`.
- Admins can mark or unmark a ticket as urgent.
- Urgent tickets should use a strong but accessible visual treatment.

## Admin Workflows

### Review Incoming Tickets

1. Admin logs in.
2. Admin opens `/admin`.
3. Dashboard lists recent tickets first.
4. Admin filters by status or urgency.
5. Admin opens a ticket detail page.

### Handle A Ticket

1. Admin reviews requester details and problem description.
2. Admin changes status to `in_progress`.
3. Admin marks the ticket urgent if needed.
4. Admin writes a visible response.
5. Admin sets status to `resolved` when the issue is handled.

## Empty States

- No tickets in dashboard: explain that no support tickets exist yet.
- No matching filtered tickets: suggest clearing filters.
- No lookup result: say no ticket was found for that number and email.
- No responses: show that no admin response has been added yet.

## Error States

- Ticket creation failed: show a clear retry message.
- Ticket lookup failed: show a clear retry message.
- Admin login failed: show a generic invalid credentials message.
- Unauthorized admin access: redirect to login.
- Ticket update failed: preserve form state and show retry message.

## Loading States

- Submit buttons show a saving state and are disabled during submission.
- Dashboard uses a compact loading skeleton.
- Ticket detail uses a loading skeleton for the main content.
- Lookup results show loading feedback after submit.
- Admin filters keep the current selected values visible while loading.
