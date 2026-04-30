-- Demo data for MVP review.
-- Admin auth users can be created manually in Supabase Auth, but for local dev we insert one here.

-- 1. Create a demo admin user (admin@chamadafacil.com.br / admin123)
insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) values (
  '00000000-0000-0000-0000-000000000000',
  '99999999-9999-4999-8999-999999999999',
  'authenticated',
  'authenticated',
  'admin@chamadafacil.com.br',
  extensions.crypt('admin123', extensions.gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '',
  '',
  ''
) on conflict (id) do nothing;

insert into auth.identities (
  id,
  user_id,
  provider_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
) values (
  '99999999-9999-4999-8999-999999999999',
  '99999999-9999-4999-8999-999999999999',
  '99999999-9999-4999-8999-999999999999',
  format('{"sub":"%s","email":"%s"}', '99999999-9999-4999-8999-999999999999', 'admin@chamadafacil.com.br')::jsonb,
  'email',
  now(),
  now(),
  now()
) on conflict (id) do nothing;

delete from public.tickets
where ticket_number in (
  'CF-2026-00001',
  'CF-2026-00002',
  'CF-2026-00003',
  'CF-2026-00004',
  'CF-2026-00005',
  'CF-2026-00006'
);

insert into public.tickets (
  id,
  ticket_number,
  requester_name,
  requester_email,
  requester_phone,
  subject,
  description,
  status,
  is_urgent,
  created_at,
  updated_at,
  resolved_at
)
values
  (
    '11111111-1111-4111-8111-111111111111',
    'CF-2026-00001',
    'Juliana Martins',
    'juliana.martins@padariabona.com.br',
    '(11) 98765-0142',
    'Não consigo acessar o painel administrativo',
    'Olá, equipe. Desde ontem não consigo acessar o painel administrativo da loja. A senha foi redefinida, mas a mensagem de erro continua aparecendo.',
    'in_progress',
    true,
    '2026-04-24 09:18:00-03',
    '2026-04-24 11:42:00-03',
    null
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'CF-2026-00002',
    'Rafael Souza',
    'rafael.souza@tecnilar.com.br',
    '(21) 99841-2308',
    'Erro ao enviar mensagem pelo WhatsApp',
    'As mensagens de atendimento não estão sendo enviadas para alguns clientes. O sistema mostra falha de integração depois que clicamos em responder.',
    'open',
    true,
    '2026-04-24 10:05:00-03',
    '2026-04-24 10:05:00-03',
    null
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    'CF-2026-00003',
    'Camila Ferreira',
    'camila.ferreira@logixmercado.com.br',
    null,
    'Dúvida sobre emissão de segunda via',
    'Preciso orientar um cliente sobre como emitir a segunda via do boleto. Não encontrei essa opção no menu do portal.',
    'resolved',
    false,
    '2026-04-23 15:22:00-03',
    '2026-04-23 16:10:00-03',
    '2026-04-23 16:10:00-03'
  ),
  (
    '44444444-4444-4444-8444-444444444444',
    'CF-2026-00004',
    'Bruno Lima',
    'bruno.lima@clinicasol.com.br',
    '(31) 97630-5519',
    'Relatório mensal não está sendo gerado',
    'Ao clicar em gerar relatório mensal, a tela fica carregando por vários minutos e não baixa nenhum arquivo. O problema começou esta semana.',
    'in_progress',
    false,
    '2026-04-22 13:47:00-03',
    '2026-04-23 09:31:00-03',
    null
  ),
  (
    '55555555-5555-4555-8555-555555555555',
    'CF-2026-00005',
    'Larissa Gonçalves',
    'larissa.goncalves@moveisrio.com.br',
    '(21) 96544-8820',
    'Atualizar telefone cadastrado',
    'Gostaria de atualizar o telefone cadastrado da empresa. O número antigo não recebe mais ligações e precisamos corrigir para os próximos atendimentos.',
    'resolved',
    false,
    '2026-04-21 08:54:00-03',
    '2026-04-21 10:12:00-03',
    '2026-04-21 10:12:00-03'
  ),
  (
    '66666666-6666-4666-8666-666666666666',
    'CF-2026-00006',
    'Thiago Almeida',
    'thiago.almeida@oficinaponto.com.br',
    null,
    'Cadastro de produto duplicado',
    'Um produto aparece duas vezes na lista e não consigo remover a duplicidade pelo painel. Preciso de ajuda para evitar erro no atendimento.',
    'open',
    false,
    '2026-04-20 17:35:00-03',
    '2026-04-20 17:35:00-03',
    null
  )
on conflict (id) do update
set
  ticket_number = excluded.ticket_number,
  requester_name = excluded.requester_name,
  requester_email = excluded.requester_email,
  requester_phone = excluded.requester_phone,
  subject = excluded.subject,
  description = excluded.description,
  status = excluded.status,
  is_urgent = excluded.is_urgent,
  created_at = excluded.created_at,
  updated_at = excluded.updated_at,
  resolved_at = excluded.resolved_at;

insert into public.ticket_responses (
  id,
  ticket_id,
  body,
  created_at
)
values
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
    '11111111-1111-4111-8111-111111111111',
    'Recebemos o chamado e estamos verificando o bloqueio de acesso. Avisaremos por aqui assim que a conta for liberada.',
    '2026-04-24 11:42:00-03'
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2',
    '33333333-3333-4333-8333-333333333333',
    'A segunda via fica disponível em Financeiro > Boletos. Também ajustamos a permissão do seu usuário para esse menu aparecer novamente.',
    '2026-04-23 16:10:00-03'
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
    '44444444-4444-4444-8444-444444444444',
    'Identificamos lentidão na geração do relatório e estamos reprocessando os dados do período solicitado.',
    '2026-04-23 09:31:00-03'
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa4',
    '55555555-5555-4555-8555-555555555555',
    'Telefone atualizado no cadastro. O novo número já aparece nas próximas solicitações.',
    '2026-04-21 10:12:00-03'
  )
on conflict (id) do update
set
  ticket_id = excluded.ticket_id,
  body = excluded.body,
  created_at = excluded.created_at;

select setval('public.ticket_number_seq', 6, true);
