# Segurança

Este documento descreve o modelo de autenticação, autorização e proteção de dados do ChamadaFácil.

O projeto é um MVP single-company/single-tenant: uma única empresa usa a ferramenta internamente para receber e gerenciar chamados. Ele não é um SaaS multiempresa no escopo atual.

## Modelo de Segurança

O ChamadaFácil tem dois contextos principais:

| Contexto | Acesso | Descrição |
| --- | --- | --- |
| Público | Sem login | Usuários podem abrir chamados e consultar um chamado específico usando código e e-mail. |
| Administrativo | Com login | Operadores autenticados no Supabase gerenciam chamados, status, urgência e respostas. |

No MVP, qualquer usuário autenticado no Supabase é tratado como operador/admin. Essa é uma decisão consciente para uma ferramenta interna de empresa única.

Condição obrigatória para produção:

- O cadastro público deve ficar desativado no Supabase Auth.
- Admins/operadores devem ser criados manualmente por uma pessoa responsável.
- A lista de usuários em Supabase Auth deve conter apenas pessoas autorizadas.

Essa abordagem não deve ser tratada como autorização completa para um produto maior. Se o sistema crescer, a próxima evolução natural é implementar RBAC e permissões por papel.

## Autenticação

A autenticação administrativa usa Supabase Auth com e-mail e senha.

Fluxo atual:

1. O operador acessa `/admin/login`.
2. O formulário chama uma Server Action.
3. A Server Action usa Supabase Auth para validar e-mail e senha.
4. Em caso de sucesso, o usuário é redirecionado para `/admin`.
5. Em caso de falha, a interface mostra uma mensagem genérica de credenciais inválidas.

Arquivos principais:

- `src/app/(admin)/admin/login/page.tsx`
- `src/components/admin/admin-login-form.tsx`
- `src/lib/data/admin-auth-actions.ts`
- `src/lib/supabase/server.ts`

## Proteção de Rotas Administrativas

As rotas `/admin` são protegidas em duas camadas:

1. `src/proxy.ts` verifica sessão e redireciona usuários não autenticados para `/admin/login`.
2. As páginas administrativas também chamam `getAuthenticatedAdminUser()` no servidor.

Rotas protegidas:

- `/admin`
- `/admin/tickets/[id]`
- `/admin/tickets`, que redireciona para `/admin`

As Server Actions administrativas também revalidam o usuário com `supabase.auth.getUser()` antes de qualquer mutação. A proteção de página é tratada como controle de navegação e experiência; a autorização real das mutações é conferida novamente no servidor.

## Acesso Público a Chamados

Usuários públicos não fazem login e não recebem acesso direto para listar chamados.

Fluxos públicos:

- Criar chamado em `/tickets/new`.
- Consultar chamado em `/tickets/lookup`.

A consulta pública exige:

- número do chamado;
- e-mail usado na abertura.

O resultado retorna apenas o chamado que combina com os dois valores. Não há endpoint público para listar todos os chamados.

## RLS e Banco de Dados

RLS está habilitado em:

- `tickets`
- `ticket_responses`
- `public_rate_limits`

### `tickets`

No estado final das migrations:

- clientes anônimos não têm grants diretos para selecionar, inserir, atualizar ou deletar tickets;
- criação pública passa por Server Action com validação, same-origin guard e rate limit;
- usuários autenticados podem ler tickets;
- usuários autenticados podem atualizar apenas campos de fluxo necessários ao MVP: `status`, `is_urgent` e `resolved_at`.

### `ticket_responses`

- clientes anônimos não têm acesso direto;
- consulta pública retorna respostas apenas do chamado encontrado por código e e-mail;
- usuários autenticados podem ler e criar respostas públicas.

### `public_rate_limits`

- usada para controle de abuso em formulários públicos;
- armazena `event_type`, `subject_hash` e `created_at`;
- não possui policies para acesso anônimo ou autenticado;
- é acessada apenas por código server-side com service role key.

## Service Role Key

`SUPABASE_SERVICE_ROLE_KEY` é uma chave sensível e server-only.

Ela é usada no projeto para:

- criar chamado público após validação;
- consultar chamado público após validação;
- registrar e consultar eventos de rate limit.

Regras:

- nunca usar prefixo `NEXT_PUBLIC_` nessa variável;
- nunca expor em Client Components;
- nunca publicar em screenshots, logs, issues ou documentação pública;
- rotacionar imediatamente se houver suspeita de vazamento.

## Variáveis de Ambiente

Obrigatórias:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

| Variável | Exposição | Observação |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Pública | URL do projeto Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Pública | Chave pública usada com RLS. |
| `SUPABASE_SERVICE_ROLE_KEY` | Servidor | Chave sensível para fluxos server-side controlados. |

Variáveis com `NEXT_PUBLIC_` podem ser incluídas no bundle do navegador. Apenas valores intencionalmente públicos devem usar esse prefixo.

## Validação Server-Side

Formulários públicos e administrativos são validados no servidor.

Validações implementadas:

- nome do solicitante entre 2 e 80 caracteres;
- e-mail obrigatório, formato válido e máximo de 160 caracteres;
- telefone opcional com limite e caracteres permitidos;
- assunto entre 5 e 120 caracteres;
- descrição entre 20 e 2000 caracteres;
- número do chamado no formato `CF-YYYY-00000`;
- status limitado a `open`, `in_progress` e `resolved`;
- resposta do operador entre 2 e 2000 caracteres;
- rejeição de caracteres de controle inseguros.

Arquivos:

- `src/lib/validation/tickets.ts`
- `src/lib/validation/admin-auth.ts`
- `src/lib/validation/admin-tickets.ts`

## Same-Origin Guard e CSRF

As ações públicas executam uma verificação de mesma origem antes de processar dados.

Arquivo:

- `src/lib/security/request-guards.ts`

Decisão atual:

- Não há token CSRF customizado.
- Next.js Server Actions já aplicam validação de `Origin`/`Host`.
- O projeto adiciona guarda explícita nos fluxos públicos.
- Mutations administrativas revalidam Supabase Auth dentro da Action.

Se o app for colocado atrás de proxy reverso ou domínio customizado, valide os headers de host/origin no ambiente final.

## Rate Limiting

O projeto implementa rate limit básico com a tabela `public_rate_limits`.

Os sujeitos são armazenados como SHA-256, não como IP/e-mail em texto puro.

Limites atuais:

| Evento | Limite |
| --- | --- |
| Abertura por IP | 5 tentativas por 15 minutos |
| Abertura por e-mail | 3 tentativas por 1 hora |
| Consulta por IP | 30 tentativas por 10 minutos |
| Consulta por e-mail | 12 tentativas por 10 minutos |

Arquivo:

- `src/lib/security/rate-limit.ts`

Para tráfego real mais alto, adicione uma camada edge/WAF, como Vercel Firewall, Cloudflare WAF ou um rate limiter externo.

## Headers de Segurança

`next.config.ts` configura headers globais:

- `Content-Security-Policy`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`

Esses headers reduzem riscos comuns de execução indevida de conteúdo, embedding por terceiros, exposição excessiva de referrer e permissões de navegador desnecessárias.

## Checklist de Produção

Antes de publicar:

- Desativar public signups no Supabase Auth.
- Criar admin/operador manualmente no Supabase Dashboard.
- Confirmar que apenas usuários autorizados existem em Auth.
- Configurar variáveis de ambiente no provedor de deploy.
- Aplicar migrations no Supabase remoto.
- Verificar RLS em `tickets`, `ticket_responses` e `public_rate_limits`.
- Confirmar que clientes anônimos não listam tickets nem respostas.
- Testar criação pública de chamado.
- Testar consulta correta e consulta com dados errados.
- Testar rate limit com repetição de envios.
- Testar login e logout admin.
- Testar redirecionamento de `/admin` sem sessão.
- Testar atualização de status, urgência e resposta.
- Garantir que a service role key não aparece no bundle, logs ou screenshots.
- Rodar `npm test`.
- Rodar `npm run lint`.
- Rodar `npm run typecheck`.
- Rodar `npm run build`.

## Limitações Conscientes

- Não há RBAC no MVP.
- Não há permissões por papel.
- Não há auditoria avançada de alterações.
- Não há separação multiempresa.
- Não há CAPTCHA.
- Não há camada WAF configurada no repositório.
- Não há testes de integração/e2e ou testes automatizados de policies RLS no momento.

Essas limitações são aceitáveis para o escopo atual desde que o sistema seja operado como ferramenta interna de uma única empresa e com criação manual de operadores.

## Melhorias Futuras

- RBAC com papéis `admin`, `operator` e `viewer`.
- Permissões por ação.
- Auditoria de alteração de status, urgência e respostas.
- Logs defensivos para falhas de login e ações sensíveis.
- Rate limit em edge/WAF.
- CAPTCHA adaptativo para abuso em formulários públicos.
- Políticas multiempresa caso o produto evolua para SaaS.
- Testes automatizados de autorização e políticas RLS.
