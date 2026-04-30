create table if not exists public.public_rate_limits (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  subject_hash text not null,
  created_at timestamptz not null default now(),
  constraint public_rate_limits_event_type_check check (
    event_type in (
      'ticket_create_email',
      'ticket_create_ip',
      'ticket_lookup_email',
      'ticket_lookup_ip'
    )
  ),
  constraint public_rate_limits_subject_hash_length check (char_length(subject_hash) = 64)
);

create index if not exists public_rate_limits_lookup_idx
  on public.public_rate_limits (event_type, subject_hash, created_at desc);

alter table public.public_rate_limits enable row level security;

revoke all on public.public_rate_limits from anon;
revoke all on public.public_rate_limits from authenticated;

drop policy if exists "Public can create tickets" on public.tickets;

revoke select, insert, update, delete on public.tickets from anon;
revoke select, insert, update, delete on public.ticket_responses from anon;

revoke insert, update, delete on public.tickets from authenticated;
revoke insert, update, delete on public.ticket_responses from authenticated;

grant select on public.tickets to authenticated;
grant update (status, is_urgent, resolved_at) on public.tickets to authenticated;
grant select on public.ticket_responses to authenticated;
grant insert (ticket_id, body) on public.ticket_responses to authenticated;

drop policy if exists "Authenticated users can update tickets" on public.tickets;
create policy "Authenticated users can update ticket workflow fields"
  on public.tickets
  for update
  to authenticated
  using (true)
  with check (
    status in ('open', 'in_progress', 'resolved')
    and (
      status <> 'resolved'
      or resolved_at is not null
    )
    and (
      status <> 'open'
      or resolved_at is null
    )
  );
