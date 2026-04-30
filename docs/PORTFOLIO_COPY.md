# Textos para Portfólio

Este arquivo reúne textos prontos para apresentar o ChamadaFácil em site pessoal, GitHub, currículo ou candidatura. Ajuste apenas os links finais de demo e repositório quando estiverem publicados.

## Versão PT-BR

### Título do projeto

ChamadaFácil

### Subtítulo

Sistema web de chamados para suporte técnico em pequenos negócios.

### Descrição curta para card

Help desk full-stack com abertura pública de chamados, consulta por código e e-mail, painel administrativo autenticado e gerenciamento de status, urgência e respostas.

### Descrição média para página de projeto

ChamadaFácil é um sistema web de chamados pensado para pequenos negócios que precisam organizar solicitações de suporte sem depender de planilhas ou conversas espalhadas. Usuários públicos podem abrir e consultar chamados sem criar conta, enquanto operadores autenticados gerenciam a fila em um painel administrativo protegido.

### Descrição longa/case

O ChamadaFácil foi desenvolvido como um MVP single-company de help desk para demonstrar fundamentos práticos de desenvolvimento web full-stack. O produto cobre o fluxo essencial de suporte: abertura de chamado, geração de código, consulta pública por código e e-mail, login administrativo, listagem de tickets, filtros por status e urgência, detalhe do chamado, atualização de status e respostas visíveis ao solicitante.

O projeto usa Next.js App Router, TypeScript, Tailwind CSS, Supabase Auth e PostgreSQL. A implementação inclui Server Actions, validação server-side, Row Level Security, proteção de rotas administrativas, uso server-only da service role key e rate limit básico para formulários públicos. O escopo foi mantido de forma honesta: não há multiempresa, anexos, e-mail automático, SLA ou base de conhecimento no MVP atual.

### Lista de funcionalidades

- Landing page em português brasileiro.
- Abertura pública de chamados sem cadastro.
- Geração automática de número do chamado.
- Consulta pública por código do chamado e e-mail.
- Login administrativo com Supabase Auth.
- Dashboard protegido para operadores.
- Lista responsiva de chamados.
- Filtros por status e urgência.
- Detalhe do chamado com dados do solicitante.
- Atualização de status e marcação de urgência.
- Respostas públicas do operador.
- Estados de loading, erro, vazio e sucesso.
- Dados locais fictícios para demonstração.

### Lista de tecnologias

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase PostgreSQL
- Row Level Security
- Server Actions
- Vercel como alvo de deploy

### O que eu fiz

- Defini o escopo do MVP e mantive o produto focado em um fluxo realista de help desk.
- Modelei o banco de dados para chamados, respostas e eventos de rate limit.
- Implementei rotas públicas para abertura e consulta de chamados.
- Implementei login e painel administrativo protegido.
- Criei validações server-side e mensagens de erro claras.
- Configurei RLS, headers de segurança, proteção de rotas e uso server-only da service role key.
- Preparei documentação bilíngue, estudo de caso, checklist de deploy e materiais para portfólio.

### Principais aprendizados

- Modelagem de um fluxo essencial de suporte técnico.
- Separação entre área pública e área administrativa no App Router.
- Uso de Server Actions para formulários e mutações.
- Integração de Supabase Auth com sessões no servidor.
- Escrita de políticas RLS proporcionais ao escopo do produto.
- Validação server-side e tratamento de estados de formulário.
- Comunicação técnica honesta para portfólio.

### Limitações do MVP

- Não há multiempresa ou isolamento por tenant.
- Não há RBAC; todo usuário autenticado no Supabase é operador/admin.
- Não há cadastro público de solicitantes.
- Não há notificações por e-mail.
- Não há anexos.
- Não há SLA ou indicadores de atraso.
- Não há base de conhecimento.
- Não há testes automatizados configurados no momento.

### Melhorias futuras

- RBAC com papéis de admin, operador e visualizador.
- Notificações por e-mail ao abrir ou responder chamados.
- Upload de anexos.
- Notas internas para operadores.
- Histórico/auditoria mais detalhado.
- SLA e indicadores de prazo.
- Exportação CSV.
- Base de conhecimento.
- Testes automatizados para fluxos críticos.

### CTA para demo

Ver demo do ChamadaFácil

### CTA para GitHub

Ver código no GitHub

## Versão EN

### Project title

ChamadaFácil

### Subtitle

Web-based support ticket system for small businesses.

### Short card description

Full-stack help desk with public ticket creation, lookup by code and e-mail, authenticated admin dashboard, and status, urgency, and response management.

### Medium project page description

ChamadaFácil is a web-based ticket system designed for small businesses that need a clearer way to organize support requests without relying on spreadsheets or scattered conversations. Public requesters can create and track tickets without an account, while authenticated operators manage the queue through a protected admin dashboard.

### Long case description

ChamadaFácil was built as a single-company help desk MVP to demonstrate practical full-stack web development fundamentals. The product covers the essential support workflow: ticket creation, ticket code generation, public lookup by code and e-mail, admin login, ticket listing, filters by status and urgency, ticket detail view, status updates, and public operator responses.

The project uses Next.js App Router, TypeScript, Tailwind CSS, Supabase Auth, and PostgreSQL. The implementation includes Server Actions, server-side validation, Row Level Security, protected admin routes, server-only use of the service role key, and basic rate limiting for public forms. The scope is intentionally honest: the current MVP does not include multi-company support, attachments, automated e-mail, SLA tracking, or a knowledge base.

### Feature list

- Brazilian Portuguese landing page.
- Public ticket creation without requester accounts.
- Automatic ticket code generation.
- Public ticket lookup by code and e-mail.
- Admin login with Supabase Auth.
- Protected operator dashboard.
- Responsive ticket list.
- Filters by status and urgency.
- Ticket detail view with requester data.
- Status updates and urgency flag.
- Public operator responses.
- Loading, error, empty, and success states.
- Fictional local demo data.

### Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase PostgreSQL
- Row Level Security
- Server Actions
- Vercel as the deployment target

### What I built

- Defined a focused MVP scope around a realistic help desk workflow.
- Modeled the database for tickets, responses, and rate-limit events.
- Implemented public routes for ticket creation and lookup.
- Implemented authenticated admin login and dashboard.
- Created server-side validation and clear error states.
- Configured RLS, security headers, admin route protection, and server-only service role usage.
- Prepared bilingual documentation, a case study, deployment checklist, and portfolio-ready copy.

### Main learnings

- Modeling a core support workflow.
- Separating public and admin areas in the App Router.
- Using Server Actions for forms and mutations.
- Integrating Supabase Auth with server-side sessions.
- Writing RLS policies aligned with the product scope.
- Handling server-side validation and form states.
- Presenting a technical project honestly in a portfolio.

### MVP limitations

- No multi-company or tenant isolation.
- No RBAC; every authenticated Supabase user is an admin/operator.
- No public requester accounts.
- No e-mail notifications.
- No file attachments.
- No SLA or overdue indicators.
- No knowledge base.
- No automated test script yet.

### Future improvements

- RBAC with admin, operator, and viewer roles.
- E-mail notifications when tickets are created or answered.
- File attachments.
- Internal-only operator notes.
- More detailed history/audit trail.
- SLA and due-date indicators.
- CSV export.
- Knowledge base.
- Automated tests for critical flows.

### Live demo CTA

View ChamadaFácil demo

### GitHub CTA

View code on GitHub
