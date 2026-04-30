create extension if not exists pgcrypto with schema extensions;

do $$
begin
  create type public.ticket_status as enum ('open', 'in_progress', 'resolved');
exception
  when duplicate_object then null;
end $$;

create sequence if not exists public.ticket_number_seq
  as integer
  start with 1
  increment by 1
  minvalue 1
  no maxvalue
  cache 1;

create or replace function public.generate_ticket_number()
returns text
language sql
security definer
set search_path = public
as $$
  select 'CF-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('public.ticket_number_seq')::text, 5, '0');
$$;

create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  ticket_number text not null unique default public.generate_ticket_number(),
  requester_name text not null,
  requester_email text not null,
  requester_phone text,
  subject text not null,
  description text not null,
  status public.ticket_status not null default 'open',
  is_urgent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  resolved_at timestamptz,
  constraint tickets_requester_name_length check (char_length(requester_name) between 2 and 80),
  constraint tickets_requester_email_length check (char_length(requester_email) between 1 and 160),
  constraint tickets_requester_phone_length check (requester_phone is null or char_length(requester_phone) <= 30),
  constraint tickets_subject_length check (char_length(subject) between 5 and 120),
  constraint tickets_description_length check (char_length(description) between 20 and 2000),
  constraint tickets_open_defaults check (
    status <> 'open'
    or (resolved_at is null)
  )
);

create index if not exists tickets_lookup_idx
  on public.tickets (ticket_number, requester_email);

create index if not exists tickets_created_at_idx
  on public.tickets (created_at desc);

create table if not exists public.ticket_responses (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  constraint ticket_responses_body_length check (char_length(body) between 2 and 2000)
);

create index if not exists ticket_responses_ticket_id_created_at_idx
  on public.ticket_responses (ticket_id, created_at asc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tickets_set_updated_at on public.tickets;
create trigger tickets_set_updated_at
  before update on public.tickets
  for each row
  execute function public.set_updated_at();

alter table public.tickets enable row level security;
alter table public.ticket_responses enable row level security;

drop policy if exists "Public can create tickets" on public.tickets;
create policy "Public can create tickets"
  on public.tickets
  for insert
  to anon
  with check (
    status = 'open'
    and is_urgent = false
    and resolved_at is null
  );

drop policy if exists "Authenticated users can read tickets" on public.tickets;
create policy "Authenticated users can read tickets"
  on public.tickets
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can update tickets" on public.tickets;
create policy "Authenticated users can update tickets"
  on public.tickets
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can read ticket responses" on public.ticket_responses;
create policy "Authenticated users can read ticket responses"
  on public.ticket_responses
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can create ticket responses" on public.ticket_responses;
create policy "Authenticated users can create ticket responses"
  on public.ticket_responses
  for insert
  to authenticated
  with check (true);
