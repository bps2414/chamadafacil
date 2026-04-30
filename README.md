# ChamadaFácil

<p align="center">
  <strong>Sistema web de chamados para pequenos negócios no Brasil.</strong>
</p>

<p align="center">
  Uma aplicação full-stack para abrir, acompanhar e gerenciar solicitações de suporte em um fluxo simples, seguro e organizado.
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
</p>

<p align="center">
  <a href="#preview-visual">Preview</a>
  ·
  <a href="./docs/CASE_STUDY.md">Estudo de caso</a>
  ·
  <a href="./docs/SECURITY.md">Segurança</a>
  ·
  <a href="./docs/DEPLOYMENT.md">Deploy</a>
  ·
  <a href="./README.en.md">English version</a>
</p>

> Status: MVP funcional de portfólio. O projeto foi construído para demonstrar fundamentos de desenvolvimento web full-stack em um cenário realista de help desk interno, sem prometer escopo além do que está implementado.

## Links

| Recurso | Link |
| --- | --- |
| Demo | Ainda não publicada. Adicione a URL final após o deploy. |
| Repositório | Adicione a URL pública após publicar no GitHub. |
| Estudo de caso | [docs/CASE_STUDY.md](./docs/CASE_STUDY.md) |
| Versão em inglês | [README.en.md](./README.en.md) |
| Guia de deploy | [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) |
| Textos para portfólio | [docs/PORTFOLIO_COPY.md](./docs/PORTFOLIO_COPY.md) |
| Bullets para currículo | [docs/RESUME_BULLETS.md](./docs/RESUME_BULLETS.md) |
| Checklist final | [docs/FINAL_PORTFOLIO_CHECKLIST.md](./docs/FINAL_PORTFOLIO_CHECKLIST.md) |

## Sobre o Projeto

O ChamadaFácil é um sistema web de chamados/help desk pensado para pequenos negócios que precisam organizar pedidos de suporte sem depender de planilhas, conversas perdidas ou processos informais.

O modelo do projeto é single-company/single-tenant: uma empresa usa a ferramenta internamente para receber solicitações públicas e gerenciar o atendimento por um painel administrativo protegido.

O fluxo foi desenhado para dois perfis:

- Usuários públicos, que abrem chamados sem criar conta e consultam o andamento com código do chamado e e-mail.
- Administradores/operadores, que fazem login e gerenciam fila, status, urgência e respostas.

## Screenshots

Os arquivos em `docs/visual-reference/screens/` foram mantidos como referência visual, mas não devem ser tratados como screenshots finais do produto. Antes de publicar o projeto no portfólio, capture novos prints da demo atual seguindo [docs/SCREENSHOTS_CHECKLIST.md](./docs/SCREENSHOTS_CHECKLIST.md).

## Funcionalidades Principais

| Área | Funcionalidade | Status |
| --- | --- | --- |
| Público | Landing page em português brasileiro | Implementado |
| Público | Abertura de chamados sem cadastro | Implementado |
| Público | Geração automática de código do chamado | Implementado |
| Público | Consulta por código do chamado e e-mail | Implementado |
| Público | Visualização de status, urgência, descrição e respostas | Implementado |
| Admin | Login administrativo com Supabase Auth | Implementado |
| Admin | Dashboard protegido | Implementado |
| Admin | Listagem responsiva de chamados | Implementado |
| Admin | Filtros por status e urgência | Implementado |
| Admin | Detalhe do chamado com dados do solicitante | Implementado |
| Admin | Atualização de status e urgência | Implementado |
| Admin | Respostas públicas do operador | Implementado |
| UX | Estados de loading, empty, erro e sucesso | Implementado |
| UX | Interface responsiva/mobile | Implementado |
| Segurança | RLS, validação server-side e rate limit básico | Implementado |
| Produto | Base de conhecimento | Não implementado; melhoria futura |

## Fluxo do Usuário Público

1. Acessa a página inicial.
2. Abre um chamado em `/tickets/new`.
3. Informa nome, e-mail, telefone opcional, assunto e descrição.
4. Recebe um código no formato `CF-2026-00001`.
5. Consulta o andamento em `/tickets/lookup`.
6. Informa código do chamado e e-mail.
7. Visualiza status, urgência, descrição original e respostas da equipe.

## Fluxo do Administrador

1. Acessa `/admin/login`.
2. Entra com uma conta criada manualmente no Supabase Auth.
3. Visualiza o dashboard em `/admin`.
4. Filtra chamados por status e urgência.
5. Abre o detalhe de um chamado.
6. Atualiza status e marca ou remove urgência.
7. Publica uma resposta visível para o solicitante.
8. Define o chamado como resolvido quando o atendimento termina.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework web | Next.js App Router |
| Linguagem | TypeScript |
| UI | React e Tailwind CSS |
| Autenticação | Supabase Auth |
| Banco de dados | Supabase PostgreSQL |
| Segurança de dados | Supabase Row Level Security |
| Data access | Server Components, Server Actions e helpers Supabase |
| Deploy web | Vercel como alvo principal |

Versões principais confirmadas no `package.json`:

- Next.js `^16.2.4`
- React `^19.2.5`
- TypeScript `^6.0.3`
- Tailwind CSS `^4.2.4`
- `@supabase/supabase-js` `^2.105.1`
- `@supabase/ssr` `^0.10.2`

## Arquitetura Resumida

```text
src/
  app/
    (public)/
      page.tsx
      tickets/new/page.tsx
      tickets/lookup/page.tsx
    (admin)/
      admin/login/page.tsx
      admin/page.tsx
      admin/tickets/[id]/page.tsx
  components/
    admin/
    tickets/
    ui/
  lib/
    data/
    security/
    supabase/
    validation/
supabase/
  migrations/
  seed.sql
docs/
```

### Rotas públicas

- `/`
- `/tickets/new`
- `/tickets/lookup`
- `/abrir-chamado`, redireciona para `/tickets/new`
- `/consultar-chamado`, redireciona para `/tickets/lookup`

### Rotas privadas

- `/admin/login`
- `/admin`
- `/admin/tickets/[id]`
- `/admin/tickets`, redireciona para `/admin`

### Como as camadas se conectam

- Páginas do App Router renderizam as telas públicas e privadas.
- Server Actions processam criação, consulta, login, atualização de chamados e respostas.
- `src/lib/validation` concentra validações de formulário.
- `src/lib/data` concentra operações de dados e regras de fluxo.
- `src/lib/security` contém guarda de mesma origem e rate limit.
- Supabase Auth controla sessão administrativa.
- PostgreSQL armazena tickets, respostas e eventos de rate limit.
- RLS protege o acesso direto às tabelas.

## Modelo de Dados

| Tabela | Descrição |
| --- | --- |
| `tickets` | Chamados abertos por usuários públicos. Guarda solicitante, assunto, descrição, status, urgência e datas. |
| `ticket_responses` | Respostas públicas criadas por administradores e exibidas na consulta do chamado. |
| `public_rate_limits` | Eventos de controle de abuso para formulários públicos, com identificadores em hash. |
| `auth.users` | Usuários autenticados do Supabase usados como operadores/admins no MVP. |

Status disponíveis:

- `open`: chamado aberto.
- `in_progress`: chamado em atendimento.
- `resolved`: chamado resolvido.

Prioridade atual:

- `is_urgent = false`: normal.
- `is_urgent = true`: urgente.

Não há tabela de base de conhecimento no MVP atual.

## Segurança

O projeto usa um modelo honesto e proporcional ao escopo de MVP single-company.

Medidas implementadas:

- Autenticação administrativa com Supabase Auth.
- Proteção das rotas `/admin` por Next.js Proxy e checagens server-side.
- Revalidação de usuário autenticado dentro das Server Actions administrativas.
- RLS habilitado em `tickets`, `ticket_responses` e `public_rate_limits`.
- Criação e consulta pública de chamados mediadas por Server Actions.
- Validação server-side dos formulários.
- Verificação de mesma origem em ações públicas.
- Rate limit básico por IP e e-mail, armazenando hashes.
- `SUPABASE_SERVICE_ROLE_KEY` usado apenas no servidor.
- Headers de segurança configurados em `next.config.ts`.

Limitação consciente:

No MVP, qualquer usuário autenticado no Supabase é tratado como operador/admin. Isso é aceitável para uma ferramenta interna de empresa única somente se o cadastro público estiver desativado em produção e os usuários forem criados manualmente.

Melhorias futuras de segurança:

- RBAC com papéis como `admin`, `operator` e `viewer`.
- Permissões por ação.
- Auditoria avançada de mudanças.
- Rate limit em camada edge/WAF.
- Separação multiempresa caso o produto evolua para SaaS.

Leia mais em [docs/SECURITY.md](./docs/SECURITY.md).

## Como Rodar Localmente

Requisitos:

- Node.js `20.9.0` ou superior.
- npm.
- Supabase CLI.
- Docker Desktop, caso queira rodar Supabase local.

Instale as dependências:

```bash
npm install
```

Crie o arquivo de ambiente:

```bash
cp .env.example .env.local
```

No Windows PowerShell, use:

```powershell
Copy-Item .env.example .env.local
```

Preencha as variáveis em `.env.local`.

Para usar Supabase local:

```bash
npm run supabase:start
npm run supabase:status
npm run supabase:db:reset
```

`supabase db reset` aplica as migrations e executa `supabase/seed.sql`.

Rode a aplicação:

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

Login local criado pelo seed:

```text
E-mail: admin@chamadafacil.com.br
Senha: admin123
```

Esse usuário é apenas para desenvolvimento local. Não publique essa credencial como demo de produção.

Chamado local para consulta após o seed:

```text
Ticket: CF-2026-00001
E-mail: juliana.martins@padariabona.com.br
```

Os nomes, e-mails e empresas do seed são dados fictícios de demonstração. Eles não representam empresas atendidas pelo projeto.

## Variáveis de Ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

| Variável | Exposição | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Pública/browser-safe | URL do projeto Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Pública/browser-safe | Chave pública usada com RLS. |
| `SUPABASE_SERVICE_ROLE_KEY` | Somente servidor | Fluxos públicos controlados e rate limit. |

Observações:

- Variáveis com prefixo `NEXT_PUBLIC_` podem ir para o bundle do navegador.
- Nunca use `NEXT_PUBLIC_` na service role key.
- Nunca coloque segredos reais em README, screenshots, logs ou issues públicas.
- Em deploy, configure as variáveis no provedor antes de rodar o build.

## Setup do Supabase

1. Crie um projeto no Supabase.
2. Copie a Project URL e a anon public key para `.env.local`.
3. Copie a service role key apenas para ambiente servidor.
4. Rode as migrations localmente ou aplique no projeto remoto.
5. Em produção, desative cadastro público no Supabase Auth.
6. Crie ou convide operadores manualmente em Authentication > Users.
7. Confirme que apenas pessoas autorizadas existem em `auth.users`.

Fluxo local:

```bash
npm run supabase:start
npm run supabase:db:reset
```

Fluxo remoto:

```bash
npm run supabase:link
npx supabase db push
```

Não envie seed local com credenciais de desenvolvimento para produção.

## Deploy

O alvo principal documentado é Vercel, por ser o caminho mais direto para Next.js App Router neste MVP.

Checklist:

1. Publicar o repositório no GitHub.
2. Importar o projeto na Vercel.
3. Confirmar o preset de framework como Next.js.
4. Configurar `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY`.
5. Aplicar migrations no Supabase remoto.
6. Desativar public signups no Supabase Auth.
7. Criar admin/operador manualmente.
8. Rodar smoke test das rotas públicas e privadas.

Comandos finais de verificação:

```bash
npm run lint
npm run typecheck
npm run build
```

Leia o guia de deploy em [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md).

## Roadmap

Melhorias planejadas, não implementadas no MVP atual:

- RBAC com permissões por papel.
- Multiempresa/multi-tenant.
- Notificações por e-mail.
- Upload de anexos.
- Histórico/auditoria avançada.
- SLA, vencimentos e indicadores de atraso.
- Dashboard com métricas mais completas.
- Exportação CSV.
- Base de conhecimento.
- Notas internas para operadores.

## Aprendizados Demonstrados

- Modelagem de dados para fluxo de atendimento.
- Criação de migrations PostgreSQL.
- Autenticação com Supabase Auth.
- Proteção de dados com RLS.
- Server Actions e data access no Next.js App Router.
- Validação server-side de formulários.
- Proteção básica contra abuso em formulários públicos.
- UX de formulários com estados de sucesso, erro, loading e empty.
- Construção de painel administrativo responsivo.
- Preparação de projeto para deploy web.

## Comandos Disponíveis

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run supabase:start
npm run supabase:stop
npm run supabase:status
npm run supabase:db:reset
npm run supabase:link
```

Não há script de testes automatizados no momento.

## Resumo para Currículo

### Português

- Desenvolvi uma aplicação web full-stack para abertura, acompanhamento e gerenciamento de chamados técnicos.
- Implementei painel administrativo autenticado com filtros, status, urgência e respostas públicas ao solicitante.
- Modelei a estrutura de dados para tickets, respostas e fluxo de atendimento usando PostgreSQL.
- Configurei autenticação, políticas de acesso com RLS, validação server-side e estrutura de deploy para ambiente web.
- Criei uma interface responsiva em Next.js, TypeScript e Tailwind CSS com estados de loading, erro, vazio e sucesso.

### English

- Built a full-stack web application for creating, tracking, and managing technical support tickets.
- Implemented an authenticated admin dashboard with filters, status management, urgency handling, and operator responses.
- Designed the data model for tickets, responses, and support workflows using PostgreSQL.
- Configured authentication, RLS access policies, server-side validation, and deployment-ready project structure.
- Created a responsive interface with Next.js, TypeScript, and Tailwind CSS, including loading, error, empty, and success states.

## Texto Curto para Portfólio

ChamadaFácil é um sistema web de chamados para pequenos negócios, com abertura pública de solicitações, consulta por código e e-mail, painel administrativo autenticado, filtros, status, urgência e respostas do operador. O projeto demonstra desenvolvimento full-stack com Next.js, TypeScript, Tailwind CSS, Supabase Auth, PostgreSQL e RLS em um escopo de MVP realista e apresentável.
