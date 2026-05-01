# ChamadaFacil Portfolio Upgrade Plan

## 1. Objetivo do projeto

ChamadaFacil e um projeto full-stack de portfolio que simula um sistema realista de chamados para pequenos negocios. O produto permite que usuarios publicos abram chamados sem conta, consultem o andamento por codigo/e-mail e que operadores autenticados gerenciem a fila pelo painel admin.

O objetivo deste plano nao e transformar o projeto em um SaaS grande. O objetivo e aumentar o valor tecnico, de produto e de portfolio antes da publicacao final, demonstrando maturidade em UX, frontend, validacao, organizacao de codigo, regras de negocio, seguranca basica, testes, documentacao e deploy.

## 2. Diagnostico atual

### O que o projeto ja tem

- Rotas publicas:
  - `/`
  - `/tickets/new`
  - `/tickets/lookup`
  - redirects: `/abrir-chamado` para `/tickets/new`, `/consultar-chamado` para `/tickets/lookup`
- Rotas admin:
  - `/admin/login`
  - `/admin`
  - `/admin/tickets/[id]`
  - redirect: `/admin/tickets` para `/admin`
- Fluxo publico:
  - abertura de chamado sem cadastro
  - geracao automatica de codigo de chamado
  - consulta por numero do chamado e e-mail
  - exibicao de status, urgencia, descricao e respostas publicas
- Fluxo admin:
  - login com Supabase Auth
  - dashboard protegido
  - filtros por status e urgencia
  - listagem responsiva
  - detalhe de chamado
  - atualizacao de status e urgencia
  - resposta publica ao solicitante
- Componentes principais:
  - `src/components/tickets/ticket-form.tsx`
  - `src/components/tickets/ticket-lookup-form.tsx`
  - `src/components/tickets/ticket-summary.tsx`
  - `src/components/tickets/ticket-timeline.tsx`
  - `src/components/admin/admin-ticket-filters.tsx`
  - `src/components/admin/admin-ticket-list.tsx`
  - `src/components/admin/admin-ticket-detail.tsx`
  - `src/components/admin/admin-ticket-management-panel.tsx`
  - `src/components/admin/admin-login-form.tsx`
  - `src/components/ui/*`
- Camada de dados:
  - `src/lib/data/tickets.ts`: Server Actions publicas, criacao, consulta, same-origin guard, rate limit e service role.
  - `src/lib/data/admin-tickets.ts`: usuario admin autenticado, listagem, stats, filtros, detalhe, update de status/urgencia e resposta.
  - `src/lib/data/admin-auth-actions.ts`: login/logout admin.
- Validacoes:
  - `src/lib/validation/tickets.ts`
  - `src/lib/validation/admin-tickets.ts`
  - `src/lib/validation/admin-auth.ts`
- Seguranca:
  - Supabase Auth para admin.
  - `src/proxy.ts` protegendo rotas `/admin`.
  - Server Actions revalidam autenticacao.
  - RLS e grants em `supabase/migrations/*`.
  - `public_rate_limits` com hash para controle basico de abuso.
  - headers de seguranca em `next.config.ts`.
- SEO/documentacao:
  - `src/app/sitemap.ts`
  - `src/app/robots.ts`
  - `src/lib/seo.ts`
  - `README.md`
  - `README.en.md`
  - `docs/ARCHITECTURE.md`
  - `docs/SECURITY.md`
  - `docs/DEPLOYMENT.md`
  - `docs/CASE_STUDY.md`
  - `docs/PORTFOLIO_COPY.md`
  - `docs/SCREENSHOTS_CHECKLIST.md`
  - `docs/FINAL_PORTFOLIO_CHECKLIST.md`

### Scripts atuais

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run typecheck`
- scripts Supabase: `supabase:start`, `supabase:stop`, `supabase:status`, `supabase:db:reset`, `supabase:link`

Nao existe script de teste automatizado no estado atual. A primeira melhoria tecnica deve adicionar um harness simples de testes.

### Diagnostico de portfolio

O projeto ja esta acima de um CRUD generico porque tem produto, banco real, autenticacao, RLS, validacao, fluxos publicos/admin e documentacao. O ponto fraco principal e que a fila admin ainda comunica pouca operacao real alem de listar e filtrar chamados. Falta tambem uma rede minima de testes automatizados.

O foco recomendado e:

1. criar testes minimos;
2. fortalecer o fluxo publico pos-abertura;
3. transformar o dashboard admin em uma fila operacional;
4. revisar mobile e documentacao final.

## 3. O que NAO fazer agora

Nao implementar nesta rodada:

- multiempresa ou multi-tenant;
- RBAC completo;
- anexos/upload;
- e-mail transacional;
- chat;
- base de conhecimento;
- SLA completo;
- graficos analiticos grandes;
- integracao WhatsApp;
- painel publico de usuario;
- reescrita completa da UI;
- nova arquitetura de design system;
- notificacoes em tempo real;
- busca global complexa;
- auditoria avancada com muitas tabelas;
- qualquer feature que aumente muito o escopo sem melhorar a primeira impressao do portfolio.

Se uma ideia exigir muitas migrations, provedores externos, credenciais adicionais ou revisao profunda de autorizacao, ela deve ficar fora desta fase.

## 4. Mapa de impacto

| Melhoria | Problema que resolve | Impacto portfolio | Dificuldade | Risco escopo | Arquivos provaveis | Dependencias | Como validar |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Adicionar Vitest e `npm test` | Ausencia de prova automatizada | Alto | Media | Baixo | `package.json`, `package-lock.json`, testes em `src/lib/**` | `vitest` dev dependency | `npm test`, `npm run lint`, `npm run typecheck` |
| Testar validacoes publicas | Garante qualidade dos formularios | Alto | Baixa | Baixo | `src/lib/validation/tickets.ts` | Harness de teste | Casos validos/invalidos |
| Testar validacoes admin | Garante regras de status/resposta | Alto | Baixa | Baixo | `src/lib/validation/admin-tickets.ts` | Harness de teste | Status, UUID e body invalidos |
| Extrair regras puras de status | Evita testar action com Supabase | Medio/Alto | Baixa/Media | Baixo | `src/lib/data/admin-tickets.ts` ou novo helper | Nenhuma | Testar `resolved_at` |
| Busca admin por texto | Fila deixa de parecer lista simples | Alto | Media | Baixo | `admin-tickets.ts`, `admin-ticket-filters.tsx`, `admin/page.tsx` | Supabase query | Buscar por ticket, assunto, solicitante |
| Ordenacao admin | Fila ganha criterio operacional | Alto | Media | Medio | Mesmos arquivos da busca | Definir opcoes fixas | Ordem por recente, antigo, urgente |
| Destaque de urgentes | Prioridade fica visualmente clara | Medio/Alto | Baixa | Baixo | `admin-ticket-list.tsx` | Nenhuma | Conferir badge/linha/card |
| Destaque de sem resposta | Mostra maturidade de fluxo de suporte | Alto | Media | Medio | `admin-tickets.ts`, `admin-ticket-list.tsx` | Saber count de respostas | Filtrar e destacar sem resposta |
| Idade do chamado | Mostra tempo parado | Alto | Baixa/Media | Baixo | `formatters/date.ts`, `admin-ticket-list.tsx` | Helper de data | Ver "aberto ha X" |
| Ultima atualizacao mais clara | Ajuda operador a decidir | Medio | Baixa | Baixo | `admin-ticket-list.tsx` | Ja existe `updated_at` | Ver desktop/mobile |
| Sucesso pos-abertura com copiar codigo | Melhora UX e screenshot | Alto | Baixa | Baixo | `ticket-form.tsx` | Clipboard API | Criar chamado e copiar codigo |
| CTA para consulta | Fecha jornada publica | Alto | Baixa | Baixo | `ticket-form.tsx`, `ticket-lookup-form.tsx` | Query param opcional | Abrir consulta pre-preenchida |
| Consulta publica mais clara | Resultado fica mais convincente | Medio/Alto | Baixa/Media | Baixo | `ticket-summary.tsx`, `ticket-timeline.tsx`, `ticket-lookup-form.tsx` | Nenhuma | Consultar existente/inexistente |
| Polish mobile | Evita primeira impressao amadora | Alto | Media | Baixo | componentes publicos/admin | Browser manual | 375px, 768px, desktop |
| README caminho rapido | Recrutador entende em 30s | Alto | Baixa | Baixo | `README.md`, `README.en.md` | Nenhuma | Ler topo do README |
| Checklist screenshots | Garante material final | Medio | Baixa | Baixo | `docs/SCREENSHOTS_CHECKLIST.md` | Screenshots novos | Conferir lista final |

## 5. Plano recomendado por fases

### Fase 1 - Base tecnica e testes minimos

Objetivo: criar uma rede de seguranca antes de mexer nos fluxos principais.

#### Tarefa 1 - Adicionar harness de teste simples

- Objetivo: adicionar `npm test` usando Vitest.
- Por que isso importa: testes automatizados sao a maior lacuna tecnica objetiva do projeto.
- Arquivos provaveis:
  - `package.json`
  - `package-lock.json`
  - novos arquivos `*.test.ts`
- O que alterar:
  - instalar `vitest` como dev dependency;
  - adicionar script `"test": "vitest run"`;
  - opcionalmente adicionar `"test:watch": "vitest"`.
- Criterios de pronto:
  - `npm test` roda sem depender de Supabase;
  - nenhum teste acessa rede ou banco;
  - `npm run lint` e `npm run typecheck` continuam passando.
- Como testar manualmente:
  - rodar `npm test`.
- Como testar automaticamente:
  - o proprio `npm test`.
- Riscos:
  - configurar teste de UI cedo demais.
- Como evitar overengineering:
  - testar apenas funcoes puras e validacoes nesta fase.

#### Tarefa 2 - Testar validacoes publicas

- Objetivo: cobrir validacao de criacao, consulta e normalizacao de ticket.
- Por que isso importa: demonstra cuidado com dados e UX de formulario.
- Arquivos provaveis:
  - `src/lib/validation/tickets.ts`
  - `src/lib/validation/tickets.test.ts`
- O que alterar:
  - adicionar testes para nome curto, e-mail invalido, telefone invalido, assunto curto, descricao curta, caracteres de controle, ticket lowercase normalizado e ticket fora do formato.
- Criterios de pronto:
  - entradas validas passam;
  - entradas invalidas retornam erro no campo correto;
  - `normalizeTicketNumber` normaliza trim/uppercase.
- Como testar manualmente:
  - preencher `/tickets/new` e `/tickets/lookup` com dados invalidos.
- Como testar automaticamente:
  - `npm test`.
- Riscos:
  - testes fragilizados por texto exato.
- Como evitar overengineering:
  - validar campo com erro e sucesso/falha, nao snapshot de mensagens inteiras.

#### Tarefa 3 - Testar validacoes admin e regra de `resolved_at`

- Objetivo: cobrir status, UUID, resposta admin e comportamento de resolucao.
- Por que isso importa: mostra regra de negocio alem da UI.
- Arquivos provaveis:
  - `src/lib/validation/admin-tickets.ts`
  - `src/lib/validation/admin-tickets.test.ts`
  - possivel novo helper puro para workflow de ticket.
- O que alterar:
  - testar UUID invalido;
  - testar status invalido;
  - testar resposta curta/longa;
  - extrair helper puro para calcular `resolved_at`:
    - se status novo for `resolved`, usar `currentResolvedAt` se existir ou `now`;
    - se status novo nao for `resolved`, retornar `null`.
- Criterios de pronto:
  - regra de resolucao testada sem Supabase;
  - action admin continua com mesmo comportamento.
- Como testar manualmente:
  - mudar chamado para resolvido e depois reabrir.
- Como testar automaticamente:
  - `npm test`.
- Riscos:
  - usar `new Date()` real nos testes.
- Como evitar overengineering:
  - injetar `now` no helper.

#### Tarefa 4 - Preparar filtros admin testaveis

- Objetivo: ampliar parsing de filtros antes de mexer na UI.
- Por que isso importa: busca e ordenacao devem ter defaults previsiveis.
- Arquivos provaveis:
  - `src/lib/data/admin-tickets.ts`
  - ou novo `src/lib/data/admin-ticket-filters.ts`
- O que alterar:
  - ampliar `AdminTicketFilters` com:
    - `query: string`
    - `sort: "updated_desc" | "created_desc" | "created_asc" | "urgent_first"`
    - `response: "all" | "answered" | "unanswered"`
  - manter defaults:
    - `status: "all"`
    - `urgency: "all"`
    - `query: ""`
    - `sort: "updated_desc"`
    - `response: "all"`
- Criterios de pronto:
  - filtros invalidos na URL caem em defaults;
  - query e trimada;
  - query muito longa deve ser truncada ou rejeitada para um limite simples, como 80 caracteres.
- Como testar manualmente:
  - editar URL com filtros invalidos e ver dashboard sem quebrar.
- Como testar automaticamente:
  - `npm test` para parser.
- Riscos:
  - criar DSL de filtros.
- Como evitar overengineering:
  - suportar apenas os filtros listados acima.

### Fase 2 - Fluxo publico mais forte

Objetivo: melhorar abertura de chamado, sucesso e consulta publica.

#### Tarefa 5 - Melhorar estado de sucesso da abertura

- Objetivo: transformar o sucesso em um estado forte para usuario e portfolio.
- Por que isso importa: este estado prova o fluxo end-to-end e gera screenshot valioso.
- Arquivos provaveis:
  - `src/components/tickets/ticket-form.tsx`
  - possivelmente `src/components/ui/button.tsx` ou `src/components/ui/icons.tsx`
- O que alterar:
  - destacar codigo do chamado em bloco proprio;
  - adicionar botao "Copiar codigo";
  - mostrar feedback "Codigo copiado";
  - adicionar CTA "Consultar chamado";
  - explicar claramente: "Use este codigo e o e-mail informado para acompanhar o atendimento";
  - manter acessibilidade com `aria-live` para feedback de copia.
- Criterios de pronto:
  - sucesso comunica o proximo passo;
  - codigo fica facil de copiar;
  - CTA leva para consulta;
  - layout funciona em mobile.
- Como testar manualmente:
  - criar chamado;
  - copiar codigo;
  - clicar em consultar;
  - testar largura mobile.
- Como testar automaticamente:
  - nao obrigatorio; se extrair helper de URL, testar helper.
- Riscos:
  - transformar em modal ou fluxo novo desnecessario.
- Como evitar overengineering:
  - manter dentro do componente atual e sem nova rota.

#### Tarefa 6 - Preencher consulta com codigo pela URL

- Objetivo: permitir `/tickets/lookup?ticket_number=CF-2026-00001`.
- Por que isso importa: fecha a jornada pos-abertura sem colocar e-mail na URL.
- Arquivos provaveis:
  - `src/app/(public)/tickets/lookup/page.tsx`
  - `src/components/tickets/ticket-lookup-form.tsx`
- O que alterar:
  - pagina le `searchParams.ticket_number`;
  - normaliza o valor;
  - passa valor inicial para o form;
  - form usa esse valor como `defaultValue` quando nao houver estado anterior.
- Criterios de pronto:
  - campo "Numero do chamado" abre preenchido;
  - e-mail nunca vai para URL;
  - consulta manual continua funcionando.
- Como testar manualmente:
  - abrir `/tickets/lookup?ticket_number=cf-2026-00001`.
- Como testar automaticamente:
  - validacao/normalizacao ja coberta em teste.
- Riscos:
  - vazar e-mail por conveniencia.
- Como evitar overengineering:
  - aceitar apenas ticket number no query param.

#### Tarefa 7 - Melhorar resultado da consulta publica

- Objetivo: deixar status, urgencia, historico e proximos passos mais claros.
- Por que isso importa: a consulta mostra o valor do produto para o solicitante.
- Arquivos provaveis:
  - `src/components/tickets/ticket-summary.tsx`
  - `src/components/tickets/ticket-timeline.tsx`
  - `src/components/tickets/ticket-lookup-form.tsx`
- O que alterar:
  - reforcar bloco de status atual;
  - mostrar urgencia com texto, nao so cor;
  - destacar "ultima resposta" quando houver;
  - manter empty state para "aguardando resposta";
  - adicionar proximo passo claro:
    - se sem resposta: "Volte mais tarde com este codigo";
    - se resolvido: "Se precisar de outro assunto, abra novo chamado";
    - se em andamento: "Acompanhe por esta pagina".
- Criterios de pronto:
  - avaliador entende o estado do chamado em ate 10 segundos;
  - sem duplicacao visual pesada;
  - mobile sem overflow.
- Como testar manualmente:
  - consultar ticket com resposta;
  - consultar ticket sem resposta;
  - consultar ticket resolvido;
  - consultar ticket inexistente.
- Como testar automaticamente:
  - nao obrigatorio.
- Riscos:
  - poluir a tela com textos longos.
- Como evitar overengineering:
  - usar microcopy curta e componentes existentes.

#### Tarefa 8 - Refinar not-found e erro tecnico

- Objetivo: diferenciar "nao encontrado" de falha tecnica sem vazar informacao.
- Por que isso importa: aumenta confianca e preserva privacidade.
- Arquivos provaveis:
  - `src/components/tickets/ticket-lookup-form.tsx`
  - `src/components/ui/empty-state.tsx`, se necessario
- O que alterar:
  - not-found deve sugerir conferir codigo e e-mail;
  - erro tecnico deve sugerir tentar novamente;
  - nao dizer se o ticket existe com outro e-mail.
- Criterios de pronto:
  - mensagens ajudam o usuario;
  - mensagens nao permitem enumeracao de chamados.
- Como testar manualmente:
  - buscar codigo errado;
  - buscar e-mail errado;
  - testar ambiente sem Supabase configurado.
- Como testar automaticamente:
  - validacoes de entrada ja cobertas.
- Riscos:
  - mensagem revelar demais.
- Como evitar overengineering:
  - manter copy neutra.

### Fase 3 - Fila admin operacional

Objetivo: transformar dashboard/lista admin em ferramenta de trabalho real.

#### Tarefa 9 - Ampliar filtros preservados na URL

- Objetivo: adicionar busca, resposta e ordenacao mantendo estado na URL.
- Por que isso importa: operador pode recarregar, voltar e compartilhar o estado da fila.
- Arquivos provaveis:
  - `src/app/(admin)/admin/page.tsx`
  - `src/lib/data/admin-tickets.ts`
  - `src/components/admin/admin-ticket-filters.tsx`
- O que alterar:
  - search params aceitos:
    - `status`
    - `urgency`
    - `response`
    - `sort`
    - `query`
  - UI de filtros deve ter:
    - input de busca;
    - select status;
    - select urgencia;
    - select resposta: todos, sem resposta, respondidos;
    - select ordenacao;
    - botao limpar.
- Criterios de pronto:
  - filtros aparecem na URL;
  - limpar volta para `/admin`;
  - filtros invalidos nao quebram dashboard;
  - layout mobile empilha controles.
- Como testar manualmente:
  - alterar cada filtro;
  - recarregar pagina;
  - usar botao limpar;
  - testar URL invalida.
- Como testar automaticamente:
  - testes do parser de filtros.
- Riscos:
  - formulario ficar grande e pesado.
- Como evitar overengineering:
  - sem date range, sem owner, sem tags, sem paginação nesta fase.

#### Tarefa 10 - Implementar busca admin

- Objetivo: buscar por numero, assunto e solicitante.
- Por que isso importa: a fila passa a ser util em volume maior de chamados.
- Arquivos provaveis:
  - `src/lib/data/admin-tickets.ts`
- O que alterar:
  - aplicar busca simples com `ilike` em:
    - `ticket_number`
    - `subject`
    - `requester_name`
  - preservar filtros de status/urgencia/resposta.
- Criterios de pronto:
  - buscar por `CF-2026`, nome e palavra do assunto retorna resultados esperados;
  - busca vazia equivale a sem busca;
  - busca sem resultado mostra empty state adequado.
- Como testar manualmente:
  - buscar `Juliana`;
  - buscar `CF-2026`;
  - buscar termo inexistente.
- Como testar automaticamente:
  - parser/normalizacao de query.
- Riscos:
  - query Supabase muito complexa.
- Como evitar overengineering:
  - manter `limit(50)` e busca simples.

#### Tarefa 11 - Implementar ordenacao util

- Objetivo: permitir ordenar fila por criterios operacionais.
- Por que isso importa: mostra produto pensado para trabalho real.
- Arquivos provaveis:
  - `src/lib/data/admin-tickets.ts`
  - `src/components/admin/admin-ticket-filters.tsx`
- O que alterar:
  - opcoes:
    - `updated_desc`: atualizados recentemente primeiro;
    - `created_desc`: mais novos primeiro;
    - `created_asc`: mais antigos primeiro;
    - `urgent_first`: urgentes primeiro, depois atualizacao recente.
- Criterios de pronto:
  - cada sort altera a ordem corretamente;
  - default continua `updated_desc`.
- Como testar manualmente:
  - trocar sort e conferir ordem com seed.
- Como testar automaticamente:
  - parser de sort invalido/default.
- Riscos:
  - tentar criar ranking complexo.
- Como evitar overengineering:
  - usar apenas ordenacao SQL simples.

#### Tarefa 12 - Destacar e filtrar chamados sem resposta

- Objetivo: identificar chamados que ainda nao receberam resposta da equipe.
- Por que isso importa: "sem resposta" e uma regra operacional real de suporte.
- Arquivos provaveis:
  - `src/lib/data/admin-tickets.ts`
  - `src/components/admin/admin-ticket-list.tsx`
- O que alterar:
  - adicionar ao tipo de lista uma informacao como `response_count` ou `has_response`;
  - se select relacional/count ficar fragil, fazer segunda query em `ticket_responses` filtrando pelos ids retornados e mapear em memoria;
  - adicionar filtro `response=unanswered|answered`;
  - adicionar badge discreto "Sem resposta" em desktop e mobile.
- Criterios de pronto:
  - tickets sem resposta aparecem destacados;
  - filtro `Sem resposta` funciona;
  - filtro `Respondidos` funciona;
  - nao muda consulta publica.
- Como testar manualmente:
  - usar seed, que tem chamados com e sem resposta;
  - adicionar resposta admin e ver ticket mudar de estado apos refresh.
- Como testar automaticamente:
  - helper de classificacao se for extraido.
- Riscos:
  - criar migration desnecessaria.
- Como evitar overengineering:
  - nao criar coluna nova; derivar de `ticket_responses`.

#### Tarefa 13 - Mostrar idade e ultima atualizacao

- Objetivo: mostrar quanto tempo o chamado esta aberto e quando foi atualizado.
- Por que isso importa: operador entende prioridade temporal.
- Arquivos provaveis:
  - `src/lib/formatters/date.ts`
  - `src/components/admin/admin-ticket-list.tsx`
- O que alterar:
  - adicionar helper `formatRelativeAge(date, now?)` em PT-BR;
  - desktop: coluna ou linha secundaria com "Aberto ha X" e "Atualizado em...";
  - mobile: mostrar os dois em area compacta.
- Criterios de pronto:
  - datas absolutas e relativas sao legiveis;
  - mobile nao quebra;
  - testes cobrem helper com `now` fixo.
- Como testar manualmente:
  - verificar tickets do seed;
  - ajustar viewport 375px.
- Como testar automaticamente:
  - teste unitario do helper.
- Riscos:
  - teste instavel por data atual.
- Como evitar overengineering:
  - helper recebe `now` opcional.

#### Tarefa 14 - Polir responsividade da fila admin

- Objetivo: garantir que dashboard funcione bem no celular.
- Por que isso importa: responsividade e parte forte do portfolio.
- Arquivos provaveis:
  - `src/components/admin/admin-ticket-filters.tsx`
  - `src/components/admin/admin-ticket-list.tsx`
  - `src/app/globals.css`, somente se necessario
- O que alterar:
  - filtros empilhados no mobile;
  - input de busca sem overflow;
  - cards mobile com ticket number, assunto, solicitante, status, urgencia, resposta, idade e botao abrir;
  - tabela desktop continua densa.
- Criterios de pronto:
  - sem scroll horizontal em 375px;
  - controles com alvo de toque confortavel;
  - textos longos quebram corretamente.
- Como testar manualmente:
  - viewport 375px, 768px e desktop;
  - testar dark/light mode se existente.
- Como testar automaticamente:
  - nao obrigatorio.
- Riscos:
  - redesenhar dashboard inteiro.
- Como evitar overengineering:
  - preservar layout atual, apenas adaptar conteudo novo.

### Fase 4 - Documentacao e portfolio

Objetivo: preparar o projeto para avaliacao em GitHub e portfolio.

#### Tarefa 15 - Atualizar README com caminho rapido

- Objetivo: deixar o projeto avaliavel em 30 segundos.
- Por que isso importa: recrutador geralmente olha README antes de rodar.
- Arquivos provaveis:
  - `README.md`
  - `README.en.md`
- O que alterar:
  - adicionar secao "Caminho rapido para avaliar";
  - adicionar "Por que esse projeto existe";
  - adicionar "O que demonstra tecnicamente";
  - atualizar comandos com `npm test`;
  - manter limitacoes conscientes;
  - destacar Supabase, RLS, Server Actions, validacao server-side, rate limit, deploy e testes.
- Criterios de pronto:
  - README nao promete feature inexistente;
  - demo, repo, setup e comandos estao claros;
  - topo comunica produto e valor tecnico.
- Como testar manualmente:
  - ler README do topo ate comandos como se fosse avaliador.
- Como testar automaticamente:
  - nao aplicavel.
- Riscos:
  - README ficar longo demais.
- Como evitar overengineering:
  - topo curto, detalhes linkados em `docs/`.

#### Tarefa 16 - Atualizar screenshots e checklist

- Objetivo: alinhar imagens finais ao produto melhorado.
- Por que isso importa: screenshots vendem o projeto antes do codigo.
- Arquivos provaveis:
  - `docs/SCREENSHOTS_CHECKLIST.md`
  - `public/screenshots/*`
  - `docs/portfolio-assets/*`
  - `public/portfolio/*`
- O que alterar:
  - incluir screenshots obrigatorios:
    - landing desktop;
    - abertura de chamado;
    - sucesso com codigo copiavel;
    - consulta com resultado;
    - consulta nao encontrada;
    - dashboard admin operacional;
    - dashboard admin mobile;
    - detalhe admin com resposta;
    - README preview.
- Criterios de pronto:
  - screenshots usam dados ficticios;
  - nenhuma chave/token/cookie aparece;
  - README aponta para imagens existentes.
- Como testar manualmente:
  - abrir imagens e conferir conteudo;
  - conferir render no README.
- Como testar automaticamente:
  - nao aplicavel.
- Riscos:
  - print com credencial ou dado real.
- Como evitar overengineering:
  - usar seed ficticio e esconder console/devtools.

#### Tarefa 17 - Atualizar case study e textos de portfolio

- Objetivo: alinhar a narrativa ao estado final.
- Por que isso importa: portfolio precisa explicar decisoes, nao so listar stack.
- Arquivos provaveis:
  - `docs/CASE_STUDY.md`
  - `docs/CASE_STUDY.en.md`
  - `docs/PORTFOLIO_COPY.md`
  - `docs/RESUME_BULLETS.md`
- O que alterar:
  - incluir fila admin operacional;
  - incluir testes automatizados;
  - explicar limitacoes conscientes;
  - reforcar que nao ha multiempresa/RBAC/anexos/e-mail no MVP.
- Criterios de pronto:
  - textos batem com features implementadas;
  - nao ha exagero de maturidade enterprise;
  - bullets sao bons para entrevista/curriculo.
- Como testar manualmente:
  - comparar texto com UI e codigo.
- Como testar automaticamente:
  - nao aplicavel.
- Riscos:
  - documentar futuro como pronto.
- Como evitar overengineering:
  - separar "implementado" de "melhorias futuras".

#### Tarefa 18 - Revisao final de seguranca e apresentacao

- Objetivo: garantir que nada sensivel esteja exposto e que o deploy esteja seguro para demo.
- Por que isso importa: seguranca basica tambem e avaliada.
- Arquivos provaveis:
  - `.env.example`
  - `.gitignore`
  - README/docs
  - screenshots
- O que alterar:
  - somente se encontrar problema.
- Criterios de pronto:
  - `.env` nao versionado;
  - service role nao aparece em docs/screenshots/logs;
  - admin de seed esta marcado como local;
  - deploy nao usa usuario/senha fraca publicada;
  - public signup do Supabase production desativado.
- Como testar manualmente:
  - `git ls-files .env`;
  - busca por `SUPABASE_SERVICE_ROLE_KEY`, tokens e chaves reais;
  - revisar screenshots.
- Como testar automaticamente:
  - comandos de busca por padroes sensiveis.
- Riscos:
  - confundir credencial local de seed com demo production.
- Como evitar overengineering:
  - documentar claramente; nao implementar RBAC agora.

## 6. Ordem ideal de execucao

1. Criar checkpoint/commit das mudancas atuais se elas forem intencionais.
2. Adicionar Vitest e script `npm test`.
3. Testar validacoes publicas.
4. Extrair/testar helper de `resolved_at`.
5. Extrair/testar parser de filtros admin.
6. Melhorar sucesso pos-abertura.
7. Adicionar pre-preenchimento de consulta por `ticket_number`.
8. Melhorar resultado e mensagens da consulta publica.
9. Ampliar filtros admin no tipo/parser/UI.
10. Implementar busca admin.
11. Implementar ordenacao admin.
12. Implementar filtro/destaque de chamados sem resposta.
13. Adicionar idade e ultima atualizacao.
14. Polir responsividade do dashboard.
15. Rodar `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
16. Atualizar README e docs.
17. Tirar screenshots finais.
18. Fazer smoke test do deploy.

Essa ordem permite parar no meio sem deixar o projeto quebrado. Depois da fase 2, o fluxo publico ja fica mais forte. Depois da fase 3, o dashboard vira diferencial de portfolio.

## 7. Estrategia de commits

Commits pequenos e profissionais sugeridos:

- `test: add core validation coverage`
- `test: cover admin ticket workflow helpers`
- `feat: improve ticket creation success state`
- `feat: prefill ticket lookup from created ticket`
- `feat: clarify public ticket lookup results`
- `feat: add operational admin ticket filters`
- `feat: highlight urgent and unanswered tickets`
- `feat: show ticket age in admin queue`
- `style: polish admin queue mobile layout`
- `docs: improve portfolio review path`
- `docs: update screenshot and portfolio checklist`

Evitar commits grandes misturando teste, UI, dados e documentacao.

## 8. Criterios finais de pronto

O projeto pode ser considerado pronto para portfolio quando:

- [ ] `npm run lint` passa.
- [ ] `npm run typecheck` passa.
- [ ] `npm test` passa.
- [ ] `npm run build` passa.
- [ ] Fluxo publico de abertura foi testado.
- [ ] Estado de sucesso com codigo copiavel foi testado.
- [ ] CTA de consulta foi testado.
- [ ] Consulta publica foi testada com chamado existente.
- [ ] Consulta publica foi testada com chamado inexistente.
- [ ] Login admin foi testado.
- [ ] Logout admin foi testado.
- [ ] Dashboard admin foi testado com busca, filtros, sort e limpar.
- [ ] Detalhe admin foi testado com status, urgencia e resposta.
- [ ] Mobile foi revisado em abertura, consulta, dashboard e detalhe admin.
- [ ] Empty/loading/error states foram revisados.
- [ ] README PT e EN foram revisados.
- [ ] Checklist de screenshots foi atualizado.
- [ ] Screenshots finais foram tirados.
- [ ] Nenhuma credencial sensivel esta versionada.
- [ ] Nenhuma service role key aparece em docs, screenshots ou logs.
- [ ] Usuario admin de seed esta documentado como local/dev.
- [ ] Deploy nao usa usuario/admin de teste perigoso.
- [ ] Supabase Auth production esta com public signup desativado.
- [ ] Sitemap e robots foram revisados.
- [ ] Deploy esta funcionando.
- [ ] Preview do README no GitHub foi conferido.

## 9. Destaques finais para portfolio

### Descricao em 2 linhas

ChamadaFacil e um sistema full-stack de chamados para pequenos negocios, com abertura publica, consulta por codigo/e-mail e painel admin protegido. O projeto demonstra fluxo real de suporte com Next.js, Supabase Auth, PostgreSQL/RLS, Server Actions, validacao server-side, rate limit e testes.

### Descricao para card

Help desk full-stack com fluxo publico sem cadastro, consulta segura por codigo/e-mail, fila admin operacional, filtros, status, urgencia, respostas publicas e documentacao pronta para avaliacao tecnica.

### Bullets tecnicos para README

- Next.js App Router com Server Components e Server Actions.
- Supabase Auth para painel administrativo protegido.
- PostgreSQL com migrations, constraints e RLS.
- Validacao server-side para formularios publicos e admin.
- Rate limit basico com hash de IP/e-mail.
- Filtros, busca e ordenacao de fila admin preservados na URL.
- Testes unitarios para validacoes, normalizacao e regras puras.

### Bullets de produto/UX

- Fluxo publico sem conta para reduzir atrito.
- Codigo de chamado gerado e copiavel.
- Consulta com status, urgencia e historico de respostas.
- Dashboard admin focado em operacao, nao em graficos decorativos.
- Destaque para chamados urgentes e sem resposta.
- Estados de sucesso, erro, vazio e loading pensados para demo real.

### Screenshots recomendados

- Landing desktop.
- Abertura de chamado.
- Sucesso com codigo copiavel.
- Consulta com resultado.
- Consulta nao encontrada.
- Dashboard admin operacional.
- Dashboard admin mobile.
- Detalhe admin com resposta.
- README GitHub preview.

### Explicacao curta para entrevista

"Eu queria fugir de um CRUD generico. Modelei um fluxo realista de suporte, separei area publica e admin, protegi dados com RLS, usei Server Actions para validacao e mutations, adicionei rate limit e mantive o escopo honesto para um MVP de portfolio sem virar SaaS enterprise."

## 10. Recomendacao final

Se fosse fazer apenas uma coisa antes de colocar no portfolio, a prioridade seria tornar a fila admin mais operacional com busca, filtros por URL, destaque de urgentes/sem resposta e idade do chamado.

Motivo: essa melhoria diferencia o projeto de um CRUD bonito. Ela mostra pensamento de produto, regra de negocio, dominio de frontend com dados, organizacao de estado via URL, responsividade e maturidade operacional sem exigir multiempresa, RBAC, e-mail, anexos ou qualquer feature grande demais.
