# Textos Para Portfolio

Textos prontos para site pessoal, GitHub, curriculo, LinkedIn ou candidatura. A narrativa abaixo descreve o que existe hoje e separa claramente melhorias futuras.

Links:

- Demo: [chamadafacil.vercel.app](https://chamadafacil.vercel.app)
- GitHub: [github.com/bps2414/chamadafacil](https://github.com/bps2414/chamadafacil)

Assets:

- `public/portfolio/chamadafacil-card-light.png`
- `public/portfolio/chamadafacil-card-dark.png`
- `public/portfolio/chamadafacil-card-square.png`

## PT-BR

### Titulo

ChamadaFacil

### Subtitulo

Sistema web de chamados para pequenos negocios.

### Descricao curta

Help desk full-stack com abertura publica de chamados, consulta por codigo/e-mail e painel admin autenticado com busca, filtros, ordenacao, status, urgencia e respostas.

### Descricao media

ChamadaFacil e um sistema web de chamados para pequenos negocios que precisam organizar solicitacoes de suporte sem depender de planilhas ou conversas espalhadas. Solicitantes abrem e consultam chamados sem criar conta, enquanto operadores autenticados gerenciam uma fila operacional em painel protegido.

### Descricao longa

O ChamadaFacil foi desenvolvido como um MVP single-company de help desk para demonstrar fundamentos praticos de desenvolvimento full-stack. O produto cobre o fluxo essencial de suporte: abertura publica, geracao de codigo, consulta por codigo e e-mail, login administrativo, busca e filtros na fila, ordenacao, destaque de chamados urgentes/sem resposta, detalhe do chamado, atualizacao de status/urgencia e respostas publicas ao solicitante.

A implementacao usa Next.js App Router, TypeScript, Tailwind CSS, Supabase Auth e PostgreSQL. O projeto inclui Server Actions, validacao server-side, Row Level Security, protecao de rotas administrativas, uso server-only da service role key, rate limit basico para formularios publicos e testes unitarios com Vitest. O escopo e honesto: nao ha multiempresa, RBAC completo, anexos, e-mail automatico, SLA ou base de conhecimento no MVP atual.

### Funcionalidades

- Landing page em PT-BR.
- Abertura publica de chamados sem cadastro.
- Codigo de chamado gerado e copiavel.
- Consulta publica por codigo/e-mail.
- Login administrativo com Supabase Auth.
- Dashboard protegido para operadores.
- Busca por numero, assunto e solicitante.
- Filtros por status, urgencia e resposta.
- Ordenacao por atualizacao, criacao e urgencia.
- Destaque para chamados urgentes e sem resposta.
- Detalhe com historico, dados do solicitante e painel de gerenciamento.
- Respostas publicas do operador.
- Estados de loading, erro, vazio e sucesso.
- Dados ficticios para desenvolvimento local.

### Tecnologias

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase PostgreSQL
- Row Level Security
- Server Actions
- Vitest
- Vercel

### O que eu fiz

- Defini um escopo de MVP realista para um fluxo de suporte.
- Modelei tickets, respostas e eventos de rate limit.
- Implementei rotas publicas para abertura e consulta.
- Implementei login e painel admin protegido.
- Criei fila admin operacional com busca, filtros e ordenacao.
- Configurei RLS, headers de seguranca e service role server-only.
- Adicionei validacoes server-side e testes unitarios para regras puras.
- Preparei README, case study, checklist de screenshots e textos de portfolio.

### Bullets tecnicos

- Next.js App Router com Server Components e Server Actions.
- Supabase Auth para painel administrativo protegido.
- PostgreSQL com migrations, constraints e RLS.
- Validacao server-side para formularios publicos e admin.
- Rate limit basico com hash de IP/e-mail.
- Fila admin com busca, filtros e ordenacao persistidos na URL.
- Testes unitarios para validacoes, normalizacao, filtros e regras puras.

### Limitações conscientes

- Nao ha RBAC.
- Nao ha multiempresa.
- Nao ha conta publica para solicitante.
- Nao ha anexos.
- Nao ha e-mail automatico.
- Nao ha SLA.
- Nao ha base de conhecimento.
- Nao ha auditoria avancada.

### Melhorias futuras

- RBAC com papeis.
- Multiempresa com isolamento por tenant.
- E-mail transacional.
- Upload de anexos.
- SLA e indicadores de atraso.
- Exportacao CSV.
- Base de conhecimento.
- Notas internas.
- Testes de integracao/e2e.

### CTA

- Ver demo do ChamadaFacil
- Ver codigo no GitHub

## EN

### Title

ChamadaFacil

### Subtitle

Web-based support ticket system for small businesses.

### Short description

Full-stack help desk with public ticket creation, code/e-mail lookup, and authenticated admin dashboard with search, filters, sorting, status, urgency, and responses.

### Medium description

ChamadaFacil is a web-based ticket system for small businesses that need to organize support requests without relying on spreadsheets or scattered conversations. Requesters create and track tickets without accounts, while authenticated operators manage an operational queue in a protected admin panel.

### Long description

ChamadaFacil was built as a single-company help desk MVP to demonstrate practical full-stack development fundamentals. The product covers the essential support workflow: public ticket creation, ticket code generation, lookup by code and e-mail, admin login, queue search and filters, sorting, urgent/unanswered highlights, ticket detail, status/urgency updates, and public operator responses.

The implementation uses Next.js App Router, TypeScript, Tailwind CSS, Supabase Auth, and PostgreSQL. It includes Server Actions, server-side validation, Row Level Security, protected admin routes, server-only service role usage, basic rate limiting for public forms, and Vitest unit tests. The scope is honest: the current MVP does not include multi-company support, full RBAC, attachments, automated e-mail, SLA tracking, or a knowledge base.

### Features

- Brazilian Portuguese landing page.
- Public ticket creation without accounts.
- Generated and copyable ticket code.
- Public lookup by code/e-mail.
- Admin login with Supabase Auth.
- Protected operator dashboard.
- Search by number, subject, and requester.
- Filters by status, urgency, and response state.
- Sorting by update date, creation date, and urgency.
- Highlights for urgent and unanswered tickets.
- Detail page with history, requester data, and management panel.
- Public operator responses.
- Loading, error, empty, and success states.
- Fictional local development data.

### Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase PostgreSQL
- Row Level Security
- Server Actions
- Vitest
- Vercel

### What I built

- Defined a realistic MVP scope for a support workflow.
- Modeled tickets, responses, and rate-limit events.
- Implemented public routes for creation and lookup.
- Implemented protected admin login and dashboard.
- Created an operational admin queue with search, filters, and sorting.
- Configured RLS, security headers, and server-only service role usage.
- Added server-side validation and unit tests for pure rules.
- Prepared README, case study, screenshot checklist, and portfolio copy.

### Technical bullets

- Next.js App Router with Server Components and Server Actions.
- Supabase Auth for the protected admin panel.
- PostgreSQL with migrations, constraints, and RLS.
- Server-side validation for public and admin forms.
- Basic rate limiting with hashed IP/e-mail subjects.
- Admin queue search, filters, and sorting persisted in the URL.
- Unit tests for validation, normalization, filters, and pure workflow rules.

### Conscious limitations

- No RBAC.
- No multi-company support.
- No public requester accounts.
- No attachments.
- No automated e-mail.
- No SLA tracking.
- No knowledge base.
- No advanced audit trail.

### Future improvements

- RBAC with roles.
- Multi-company tenant isolation.
- Transactional e-mail.
- File uploads.
- SLA and overdue indicators.
- CSV export.
- Knowledge base.
- Internal notes.
- Integration/e2e tests.

### CTA

- View ChamadaFacil demo
- View code on GitHub
