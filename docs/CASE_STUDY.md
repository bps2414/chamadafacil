# Estudo de Caso: ChamadaFácil

## 1. Visão Geral

ChamadaFácil é um sistema web de chamados/help desk para pequenos negócios no Brasil. O projeto permite que usuários públicos abram solicitações de suporte, consultem o andamento por código e e-mail, e que operadores autenticados gerenciem a fila de atendimento por um painel administrativo.

O projeto foi desenvolvido como peça de portfólio full-stack, com foco em escopo realista, documentação clara, segurança proporcional ao MVP e experiência de uso profissional.

## 2. Problema

Pequenos negócios frequentemente recebem pedidos de suporte por canais espalhados: WhatsApp, e-mail, ligações, mensagens informais ou planilhas. Isso gera perda de contexto, dificuldade para priorizar solicitações e falta de clareza para quem pediu ajuda.

O problema central era criar uma forma simples de registrar, acompanhar e responder chamados sem transformar o MVP em uma plataforma complexa.

## 3. Público-Alvo

- Pequenas empresas que precisam organizar solicitações internas ou externas de suporte.
- Solicitantes que querem acompanhar um pedido sem criar uma conta.
- Operadores ou administradores que precisam visualizar, filtrar e responder chamados.
- Recrutadores e avaliadores técnicos que buscam evidências de fundamentos full-stack.

## 4. Solução

O ChamadaFácil propõe um fluxo direto:

1. O solicitante abre um chamado público.
2. O sistema gera um código único.
3. O solicitante consulta o andamento com código e e-mail.
4. O operador acessa um painel protegido.
5. O operador filtra, atualiza status, marca urgência e publica respostas.

O modelo é single-company/single-tenant. O sistema foi pensado como ferramenta interna de uma empresa única, não como SaaS multiempresa no MVP.

## 5. Meu Papel no Projeto

Atuei de ponta a ponta na definição e implementação do MVP:

- Estruturei o escopo funcional e as limitações conscientes.
- Modelei o banco de dados para tickets, respostas e rate limit.
- Implementei as telas públicas e administrativas.
- Configurei autenticação com Supabase Auth.
- Apliquei RLS e regras de acesso no PostgreSQL.
- Criei validações server-side para os formulários.
- Preparei documentação de setup, segurança, deploy e portfólio.

## 6. Principais Funcionalidades

Implementado:

- Landing page em português brasileiro.
- Abertura pública de chamados sem cadastro.
- Geração automática de número do chamado.
- Consulta de chamado por código e e-mail.
- Login administrativo com Supabase Auth.
- Dashboard protegido.
- Lista responsiva de chamados.
- Filtros por status e urgência.
- Tela de detalhe do chamado.
- Atualização de status.
- Marcação e remoção de urgência.
- Respostas públicas do operador.
- Estados de loading, erro, vazio e sucesso.
- Seed local com dados de demonstração.

Não implementado no MVP:

- Base de conhecimento.
- Anexos.
- Notificações por e-mail.
- Contas públicas para solicitantes.
- Multiempresa.
- SLA.
- Exportação CSV.

## 7. Decisões Técnicas

| Decisão | Motivo |
| --- | --- |
| Next.js App Router | Organizar rotas públicas e privadas com Server Components e Server Actions. |
| TypeScript | Reduzir erros em contratos de dados, estados de formulário e modelos. |
| Tailwind CSS | Criar uma interface responsiva com velocidade e consistência visual. |
| Supabase Auth | Evitar criar autenticação manual para o painel administrativo. |
| Supabase PostgreSQL | Usar banco relacional real com migrations e constraints. |
| RLS | Proteger acesso direto às tabelas e deixar regras de dados próximas do banco. |
| Server Actions | Processar formulários no servidor, com validação e controle de acesso. |
| Single-company MVP | Manter escopo realista e evitar complexidade de multiempresa antes da necessidade. |

## 8. Arquitetura

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
```

Separação aplicada:

- `app`: rotas e composição de páginas.
- `components`: UI pública, UI administrativa e componentes compartilhados.
- `lib/data`: consultas, mutations e regras de fluxo.
- `lib/validation`: validações de formulário.
- `lib/security`: same-origin guard e rate limit.
- `lib/supabase`: criação dos clients Supabase.
- `supabase/migrations`: schema e políticas do banco.

## 9. Banco de Dados

Tabelas principais:

- `tickets`: chamado, solicitante, assunto, descrição, status, urgência e timestamps.
- `ticket_responses`: respostas públicas relacionadas a um chamado.
- `public_rate_limits`: eventos de rate limit para formulários públicos, com hash do sujeito.

Status:

- `open`
- `in_progress`
- `resolved`

Relacionamento:

- Um chamado possui várias respostas.
- Uma resposta pertence a um chamado.

O seed local cria chamados de demonstração e um usuário admin apenas para desenvolvimento.

Os nomes, e-mails e empresas usados no seed são fictícios e servem apenas para avaliação local do fluxo. Eles não representam empresas atendidas pelo projeto.

## 10. Autenticação e Segurança

O painel administrativo usa Supabase Auth com login por e-mail e senha.

O modelo atual é intencionalmente simples: qualquer usuário autenticado no Supabase é tratado como operador/admin. Essa escolha é consciente para um MVP de empresa única e depende de uma condição importante: em produção, o cadastro público deve ficar desativado no Supabase e os usuários devem ser criados manualmente.

Medidas implementadas:

- Rotas administrativas protegidas por Next.js Proxy.
- Checagem server-side de usuário autenticado nas páginas admin.
- Checagem de autenticação dentro das Server Actions administrativas.
- RLS em tabelas públicas.
- Revogação de acesso direto anônimo a tickets e respostas.
- Criação e consulta pública via Server Actions controladas.
- Validação server-side de campos.
- Rate limit por IP e e-mail usando hashes.
- Service role key somente no servidor.
- Headers de segurança globais.

Melhorias futuras:

- RBAC.
- Permissões por papel.
- Auditoria de alterações.
- Logs defensivos de eventos administrativos.
- Rate limiting em edge/WAF.

## 11. UI/UX

A interface foi pensada para ser clara, objetiva e adequada a pequenos negócios. A prioridade foi evitar uma aparência genérica de dashboard vazio e construir um fluxo compreensível para quem abre chamado e para quem gerencia suporte.

Pontos de UI/UX:

- Página inicial com ações principais visíveis.
- Formulário público dividido por informações do solicitante e detalhes do chamado.
- Código do chamado destacado após criação.
- Consulta simples com código e e-mail.
- Dashboard administrativo com métricas resumidas e filtros.
- Lista responsiva em cards no mobile e tabela no desktop.
- Detalhe do chamado com dados do solicitante, histórico e painel de gerenciamento.
- Feedback visual para sucesso, erro, carregamento e estado vazio.

## 12. Responsividade

O projeto inclui adaptação para mobile e desktop:

- Navegação pública com menu mobile.
- Formulários com grid responsivo.
- Dashboard com cards em telas menores.
- Lista administrativa em formato de cards no mobile.
- Detalhe do chamado com painel lateral no desktop e fluxo empilhado no mobile.

## 13. Desafios

Principais desafios técnicos:

- Equilibrar fluxo público sem conta com privacidade mínima dos chamados.
- Evitar listagem pública de tickets.
- Manter o painel admin simples sem deixar o projeto superficial.
- Documentar com honestidade as limitações do MVP.
- Usar service role somente em pontos server-side controlados.
- Definir uma regra de autenticação viável para single-company sem implementar RBAC cedo demais.

## 14. Aprendizados

O projeto reforçou aprendizados em:

- Modelagem de dados relacional.
- Migrations PostgreSQL.
- Supabase Auth.
- Row Level Security.
- Server Actions no Next.js App Router.
- Validação server-side.
- Estados de formulário.
- Proteção básica contra abuso.
- Organização de rotas públicas e privadas.
- Escrita de documentação técnica para portfólio.

## 15. Limitações Conscientes do MVP

- Não há cadastro público de solicitantes.
- Não há RBAC; todo usuário autenticado no Supabase é operador/admin.
- Não há multiempresa.
- Não há anexos.
- Não há notificações por e-mail.
- Não há SLA.
- Não há base de conhecimento.
- Não há testes automatizados no momento.

Essas limitações foram mantidas para preservar um MVP enxuto, demonstrável e coerente com o objetivo de portfólio.

## 16. Melhorias Futuras

- RBAC com papéis de admin, operador e visualizador.
- Multiempresa com isolamento por tenant.
- Notificações por e-mail ao abrir ou responder chamados.
- Upload de anexos.
- Histórico e auditoria de mudanças.
- SLA e indicadores de atraso.
- Dashboard com métricas de volume e tempo de resolução.
- Exportação CSV.
- Base de conhecimento.
- Notas internas para operadores.
- Testes automatizados.

## 17. Bullets para Currículo

- Desenvolvi uma aplicação web full-stack para abertura, acompanhamento e gerenciamento de chamados técnicos.
- Implementei painel administrativo autenticado com filtros, status, urgência e respostas públicas ao solicitante.
- Modelei a estrutura de dados para tickets, respostas e fluxo de atendimento usando PostgreSQL.
- Configurei autenticação, políticas de acesso com RLS, validação server-side e estrutura de deploy para ambiente web.
- Criei uma interface responsiva em Next.js, TypeScript e Tailwind CSS com estados de loading, erro, vazio e sucesso.

## 18. Texto Curto para Card de Portfólio

ChamadaFácil é um sistema web de chamados para pequenos negócios, com abertura pública de solicitações, consulta por código e e-mail, painel administrativo autenticado, filtros, status, urgência e respostas do operador. O projeto demonstra desenvolvimento full-stack com Next.js, TypeScript, Tailwind CSS, Supabase Auth, PostgreSQL e RLS em um escopo de MVP realista.
