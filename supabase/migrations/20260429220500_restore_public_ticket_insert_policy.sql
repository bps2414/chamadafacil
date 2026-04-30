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
