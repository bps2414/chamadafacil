# Estudo de Caso: ChamadaFacil

## 1. Visao Geral

ChamadaFacil e um sistema web de chamados para pequenos negocios no Brasil. O produto permite abertura publica de solicitacoes sem conta, consulta por codigo/e-mail e operacao da fila por um painel admin protegido.

Foi construido como projeto full-stack de portfolio: pequeno o bastante para ser avaliado rapidamente, mas com fundamentos reais de produto, dados, seguranca basica, testes e documentacao.

Links:

- Demo: [chamadafacil.vercel.app](https://chamadafacil.vercel.app)
- GitHub: [github.com/bps2414/chamadafacil](https://github.com/bps2414/chamadafacil)

## 2. Problema

Pequenos negocios costumam receber pedidos por canais espalhados: WhatsApp, e-mail, ligacoes, mensagens informais e planilhas. Isso dificulta priorizacao, acompanhamento, historico de respostas e clareza para quem pediu ajuda.

O desafio foi criar um fluxo simples de help desk sem transformar o MVP em um SaaS grande ou em um CRUD generico.

## 3. Solucao

O fluxo implementado cobre o essencial:

1. Solicitante abre chamado publico.
2. Sistema gera codigo unico do chamado.
3. Solicitante consulta andamento com codigo e e-mail.
4. Operador entra no painel protegido.
5. Operador busca, filtra, ordena, atualiza status/urgencia e publica respostas.

O modelo e single-company/single-tenant. Uma empresa usa a ferramenta internamente; multiempresa e RBAC ficam fora do MVP atual.

## 4. Meu Papel

- Defini o escopo funcional e as limitacoes conscientes.
- Modelei tickets, respostas e eventos de rate limit.
- Implementei as rotas publicas e administrativas.
- Configurei Supabase Auth, RLS e migrations.
- Criei validacoes server-side e regras puras testaveis.
- Preparei documentacao de setup, deploy, seguranca e portfolio.

## 5. Funcionalidades Implementadas

Publico:

- Landing page em PT-BR.
- Abertura de chamado sem cadastro.
- Codigo gerado automaticamente e copiavel no sucesso.
- CTA para consulta apos abertura.
- Consulta por codigo/e-mail com resultado, timeline e mensagens neutras de nao encontrado.

Admin:

- Login com Supabase Auth.
- Dashboard protegido.
- Estatisticas resumidas.
- Busca por numero, assunto e solicitante.
- Filtros por status, urgencia e resposta.
- Ordenacao por atualizacao, criacao e urgencia.
- Destaque para chamados urgentes e sem resposta.
- Lista responsiva em tabela/cards.
- Detalhe do chamado com dados, historico, status, urgencia e resposta publica.

Tecnico:

- PostgreSQL com migrations.
- RLS nas tabelas principais.
- Server Actions para fluxos publicos e admin.
- Validacao server-side.
- Same-origin guard.
- Rate limit basico com hashes.
- Testes unitarios com Vitest.

## 6. Decisoes Tecnicas

| Decisao | Motivo |
| --- | --- |
| Next.js App Router | Separar rotas publicas/admin e usar Server Components/Actions. |
| Supabase Auth | Evitar auth manual no painel admin. |
| PostgreSQL/RLS | Ter banco relacional real e protecao no nivel de dados. |
| Server Actions | Processar formularios no servidor com validacao e autorizacao. |
| Consulta por codigo + e-mail | Evitar listagem publica e reduzir exposicao de chamados. |
| Filtros na URL | Tornar a fila admin recarregavel e compartilhavel. |
| Testes em regras puras | Validar comportamento sem depender de Supabase local. |
| Single-company MVP | Manter o escopo honesto e demonstravel. |

## 7. Arquitetura

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
    formatters/
    security/
    supabase/
    validation/
supabase/
  migrations/
  seed.sql
docs/
```

Responsabilidades:

- `app`: rotas, layouts e composicao.
- `components`: UI publica, admin e componentes compartilhados.
- `lib/data`: consultas, mutations e regras de fluxo.
- `lib/validation`: validacoes de entrada.
- `lib/security`: same-origin guard e rate limit.
- `lib/formatters`: formatacao de datas.
- `supabase/migrations`: schema, grants e policies.

## 8. Banco de Dados

Tabelas principais:

- `tickets`: solicitante, assunto, descricao, status, urgencia e timestamps.
- `ticket_responses`: respostas publicas de operadores.
- `public_rate_limits`: eventos de controle de abuso com `subject_hash`.
- `auth.users`: usuarios Supabase usados como operadores/admins no MVP.

Status:

- `open`
- `in_progress`
- `resolved`

O seed local cria dados ficticios e um admin apenas para desenvolvimento. Ele nao deve ser usado em producao.

## 9. Seguranca

Medidas implementadas:

- Supabase Auth no painel admin.
- Rotas `/admin` protegidas por Proxy.
- Server Actions admin revalidam usuario autenticado.
- RLS em `tickets`, `ticket_responses` e `public_rate_limits`.
- Sem listagem publica de tickets.
- Criacao/consulta publica mediadas por Server Actions.
- Validacao server-side.
- Same-origin guard nos fluxos publicos.
- Rate limit basico por IP/e-mail com hashes.
- Service role key usada apenas no servidor.
- Headers de seguranca em `next.config.ts`.

Limite consciente: todo usuario autenticado no Supabase e tratado como operador/admin. Em producao, public signups devem ficar desativados e operadores devem ser criados manualmente.

## 10. UX

O objetivo de UX foi comunicar uma ferramenta operacional, nao uma landing page decorativa:

- CTAs claros para abrir e consultar chamado.
- Formulario publico com campos objetivos.
- Sucesso com codigo copiavel e proximo passo visivel.
- Consulta com status, urgencia, historico e orientacao de acompanhamento.
- Admin com fila densa, filtros e sinais operacionais.
- Mobile com cards e controles empilhados.
- Estados de loading, vazio, erro e sucesso.

## 11. Testes

O projeto usa Vitest para cobrir pontos de menor dependencia externa:

- Validacoes publicas.
- Validacoes admin.
- Normalizacao de numero de chamado.
- Parser de filtros admin.
- Regra pura de `resolved_at`.
- Formatacao relativa de datas.

Comando:

```bash
npm test
```

## 12. Limitacoes Conscientes

- Nao ha RBAC.
- Nao ha multiempresa.
- Nao ha contas publicas para solicitantes.
- Nao ha anexos.
- Nao ha notificacoes por e-mail.
- Nao ha SLA ou vencimentos.
- Nao ha base de conhecimento.
- Nao ha notas internas.
- Nao ha auditoria avancada.

Essas limitacoes foram mantidas para preservar um MVP coerente e avaliavel.

## 13. Melhorias Futuras

- RBAC com papeis.
- Multiempresa com isolamento por tenant.
- E-mail transacional.
- Upload de anexos.
- SLA e indicadores de atraso.
- Auditoria detalhada.
- Exportacao CSV.
- Base de conhecimento.
- Notas internas.
- Testes de integracao/e2e.

## 14. Explicacao Curta Para Entrevista

"Eu quis fugir de um CRUD generico. Modelei um fluxo realista de suporte: abertura publica sem conta, consulta por codigo/e-mail e painel admin protegido. Usei Next.js com Server Actions, Supabase Auth, PostgreSQL com RLS, validacao server-side, rate limit basico e testes unitarios. Mantive o escopo honesto: e um MVP single-company, nao um SaaS enterprise."

## 15. Bullets Para Curriculo

- Desenvolvi um help desk full-stack com abertura publica, consulta por codigo/e-mail e painel admin autenticado.
- Modelei tickets, respostas e eventos de rate limit em PostgreSQL com migrations e RLS.
- Implementei Server Actions com validacao server-side, protecao de rotas admin e uso server-only da service role key.
- Criei fila admin operacional com busca, filtros, ordenacao, destaque de urgencia/sem resposta e layout responsivo.
- Adicionei testes unitarios para validacoes, filtros e regras puras do fluxo de chamados.
