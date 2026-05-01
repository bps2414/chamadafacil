# ChamadaFacil

Sistema web de chamados para pequenos negocios no Brasil, com abertura publica sem conta, consulta por codigo/e-mail e painel admin protegido para operar a fila de atendimento.

> Status: MVP funcional de portfolio. O projeto demonstra um fluxo realista de help desk single-company, sem prometer multiempresa, RBAC completo, anexos, e-mail automatico ou SaaS enterprise.

## Caminho Rapido Para Avaliar

1. Abra a demo: [chamadafacil.vercel.app](https://chamadafacil.vercel.app/).
2. Veja o fluxo publico em `/tickets/new`: crie um chamado e copie o codigo gerado.
3. Consulte o chamado em `/tickets/lookup` usando codigo e e-mail.
4. Revise o painel admin no README/case study e, localmente, acesse `/admin/login` com o seed de desenvolvimento.
5. Confira os pontos tecnicos: Server Actions, Supabase Auth, PostgreSQL/RLS, validacao server-side, rate limit basico e testes unitarios.

Links uteis:

| Recurso | Link |
| --- | --- |
| Demo | [chamadafacil.vercel.app](https://chamadafacil.vercel.app/) |
| Repositorio | [github.com/bps2414/chamadafacil](https://github.com/bps2414/chamadafacil) |
| Estudo de caso | [docs/CASE_STUDY.md](./docs/CASE_STUDY.md) |
| Security notes | [docs/SECURITY.md](./docs/SECURITY.md) |
| Deploy | [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) |
| Textos de portfolio | [docs/PORTFOLIO_COPY.md](./docs/PORTFOLIO_COPY.md) |
| English README | [README.en.md](./README.en.md) |

## O Que E o Projeto

O ChamadaFacil foi criado para resolver um problema comum em pequenos negocios: pedidos de suporte espalhados entre WhatsApp, e-mail, ligacoes e planilhas. O produto organiza o essencial:

- Solicitante abre chamado sem criar conta.
- Sistema gera um codigo unico do chamado.
- Solicitante consulta andamento com codigo e e-mail.
- Operador autenticado gerencia fila, status, urgencia e respostas.

O escopo atual e single-company/single-tenant: uma empresa usa a ferramenta internamente. Essa decisao mantem o MVP pequeno, avaliavel e coerente para portfolio.

## Screenshots

Prints usam dados ficticios e nao devem expor variaveis de ambiente, tokens, cookies ou credenciais reais.

| Tela | Preview |
| --- | --- |
| Landing page | ![Landing page do ChamadaFacil](./public/screenshots/landing-desktop.png) |
| Abertura de chamado | ![Formulario de abertura de chamado](./public/screenshots/ticket-new-form.png) |
| Consulta de chamado | ![Tela de consulta de chamado](./public/screenshots/ticket-lookup-form.png) |
| Login admin | ![Login administrativo](./public/screenshots/admin-login.png) |
| Dashboard admin | ![Dashboard administrativo](./public/screenshots/admin-dashboard.png) |
| Detalhe admin | ![Detalhe administrativo do chamado](./public/screenshots/admin-ticket-detail.png) |

Checklist completo em [docs/SCREENSHOTS_CHECKLIST.md](./docs/SCREENSHOTS_CHECKLIST.md).

## Funcionalidades Implementadas

### Fluxo Publico

- Landing page em portugues brasileiro.
- Abertura de chamado sem cadastro.
- Validacao server-side de nome, e-mail, telefone, assunto e descricao.
- Geracao automatica de numero no formato `CF-YYYY-00000`.
- Estado de sucesso com codigo destacado, botao de copiar e CTA para consulta.
- Consulta por numero do chamado e e-mail.
- Resultado com status, urgencia, descricao original e respostas publicas.
- Mensagem neutra quando a combinacao codigo/e-mail nao encontra chamado.

### Painel Admin

- Login administrativo com Supabase Auth.
- Rotas `/admin` protegidas por Proxy e checagens server-side.
- Dashboard com estatisticas resumidas.
- Lista responsiva: tabela no desktop e cards no mobile.
- Filtros por status, urgencia e resposta.
- Busca por numero, assunto e solicitante.
- Ordenacao por atualizacao, criacao e urgencia.
- Destaque para chamados urgentes e sem resposta.
- Detalhe do chamado com dados do solicitante e timeline.
- Atualizacao de status, urgencia e resposta publica ao solicitante.

### Qualidade e Seguranca

- PostgreSQL com migrations e constraints.
- Row Level Security em tabelas do app.
- Server Actions para criacao, consulta e mutacoes admin.
- Validacao server-side para formularios publicos e administrativos.
- Same-origin guard nos fluxos publicos.
- Rate limit basico por IP/e-mail com identificadores em hash.
- `SUPABASE_SERVICE_ROLE_KEY` usada apenas em codigo server-side.
- Headers de seguranca em `next.config.ts`.
- Testes unitarios com Vitest para validacoes, filtros e regras puras.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Next.js App Router |
| UI | React, TypeScript e Tailwind CSS |
| Auth | Supabase Auth |
| Banco | Supabase PostgreSQL |
| Seguranca de dados | Supabase RLS |
| Mutacoes | Server Actions |
| Testes | Vitest |
| Deploy alvo | Vercel |

Versoes principais estao em [`package.json`](./package.json).

## Decisoes Tecnicas

- App Router separa area publica e area admin.
- Server Actions concentram validacao, autorizacao e mutacoes.
- RLS evita acesso direto indevido as tabelas.
- Consulta publica exige codigo e e-mail para reduzir exposicao de chamados.
- Admin e tratado como ferramenta interna: usuarios sao criados manualmente no Supabase.
- Filtros admin ficam na URL para permitir recarregar e compartilhar estado.
- Regras puras e validacoes foram isoladas para testes sem depender do banco.

## Como Rodar Localmente

Requisitos:

- Node.js `20.9.0` ou superior.
- npm.
- Supabase CLI.
- Docker Desktop, se for rodar Supabase local.

Instale dependencias:

```bash
npm install
```

Crie o arquivo local de ambiente:

```bash
cp .env.example .env.local
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Preencha as variaveis em `.env.local`.

Suba o Supabase local e aplique migrations/seed:

```bash
npm run supabase:start
npm run supabase:db:reset
```

Rode a aplicacao:

```bash
npm run dev
```

Acesse `http://localhost:3000`.

Admin local criado pelo seed:

```text
E-mail: admin@chamadafacil.com.br
Senha: admin123
```

Esse usuario e apenas para desenvolvimento local. Nao publique essa credencial como login de demo em producao.

Chamado local para consulta apos o seed:

```text
Ticket: CF-2026-00001
E-mail: juliana.martins@padariabona.com.br
```

Os dados do seed sao ficticios.

## Variaveis de Ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SITE_URL=https://chamadafacil.vercel.app
```

| Variavel | Exposicao | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Publica/browser-safe | URL do projeto Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publica/browser-safe | Chave anon publica usada com RLS. |
| `SUPABASE_SERVICE_ROLE_KEY` | Somente servidor | Fluxos publicos controlados e rate limit. |
| `SITE_URL` | Publica/canonica | Canonical, Open Graph, robots e sitemap. |

Nunca use `NEXT_PUBLIC_` na service role key e nunca coloque segredos reais em README, screenshots, logs ou issues.

## Comandos

```bash
npm run dev
npm test
npm run lint
npm run typecheck
npm run build
npm run supabase:start
npm run supabase:stop
npm run supabase:status
npm run supabase:db:reset
npm run supabase:link
```

Comandos finais recomendados antes de publicar:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

## Deploy

O alvo documentado e Vercel com Supabase hospedado.

Checklist de producao:

1. Configurar `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` e `SITE_URL` no provedor.
2. Aplicar migrations no Supabase remoto.
3. Desativar public signups no Supabase Auth.
4. Criar operadores manualmente em Authentication > Users.
5. Nao aplicar o seed local em producao.
6. Rodar smoke test das rotas publicas e privadas.

Guia completo: [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md).

## Limitacoes Conscientes

- Nao ha RBAC; todo usuario autenticado no Supabase e operador/admin.
- Nao ha multiempresa/multi-tenant.
- Nao ha contas publicas para solicitantes.
- Nao ha anexos/upload.
- Nao ha e-mail transacional.
- Nao ha SLA, vencimentos ou indicadores de atraso.
- Nao ha base de conhecimento.
- Nao ha notas internas para operadores.
- Nao ha auditoria avancada de mudancas.

Esses pontos sao futuros possiveis, nao funcionalidades prontas.

## Roadmap Possivel

- RBAC com papeis de admin, operador e visualizador.
- Isolamento por empresa/tenant.
- Notificacoes por e-mail.
- Anexos.
- SLA e indicadores de atraso.
- Exportacao CSV.
- Auditoria mais detalhada.
- Base de conhecimento.
- Notas internas.

## Resumo Para Portfolio

ChamadaFacil e um help desk full-stack para pequenos negocios, com abertura publica de chamados, consulta por codigo/e-mail, painel admin autenticado, fila operacional com busca/filtros/ordenacao, respostas publicas e documentacao pronta para avaliacao tecnica. O projeto demonstra Next.js, TypeScript, Supabase Auth, PostgreSQL/RLS, Server Actions, validacao server-side, rate limit basico e testes em um escopo MVP honesto.
