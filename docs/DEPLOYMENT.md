# Deploy

Este guia descreve o caminho recomendado para publicar o ChamadaFácil em produção.

O alvo principal do MVP é Vercel com um projeto Supabase hospedado. Cloudflare Pages não é o alvo principal neste momento porque pode exigir configuração adicional de adapter/runtime para Next.js App Router.

## 1. Pré-Requisitos

- Repositório publicado no GitHub.
- Conta na Vercel.
- Projeto Supabase remoto.
- Node.js `20.9.0` ou superior para validação local.
- Supabase CLI autenticado, caso vá aplicar migrations via terminal.

## 2. Checklist Antes do Deploy

Antes de publicar:

- Confirmar que o build local funciona.
- Confirmar que `.env`, `.env.local` e segredos não foram commitados.
- Confirmar que `.env.example` contém apenas nomes de variáveis, sem segredos.
- Confirmar que o Supabase remoto está separado do Supabase local.
- Confirmar que public signups serão desativados em produção.
- Confirmar que o usuário admin/operador será criado manualmente.
- Confirmar que as migrations foram revisadas.

Comandos recomendados:

```bash
npm run lint
npm run typecheck
npm run build
```

## 3. Variáveis de Ambiente

Configure estas variáveis na Vercel para Production e Preview:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

| Variável | Onde obter | Exposição |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project Settings > API > Project URL | Pública |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Project Settings > API > anon public key | Pública |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Project Settings > API > service_role key | Somente servidor |

Regras:

- `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` são valores públicos, mas ainda dependem de RLS.
- `SUPABASE_SERVICE_ROLE_KEY` é segredo sensível.
- Nunca coloque a service role key com prefixo `NEXT_PUBLIC_`.
- Nunca publique a service role key em README, screenshots, logs ou issues.
- Se a service role key vazar, rotacione no Supabase antes de continuar.

## 4. Preparar Supabase em Produção

1. Crie ou abra o projeto Supabase remoto.
2. Copie URL e chaves para as variáveis de ambiente da Vercel.
3. Revise as migrations em `supabase/migrations/`.
4. Aplique as migrations no projeto remoto.

Fluxo via CLI:

```bash
npm run supabase:link
npx supabase db push
```

Importante:

- Não envie `supabase/seed.sql` para produção por padrão.
- Não use o admin local `admin@chamadafacil.com.br` em produção.
- Não publique credenciais de demo administrativas.

## 5. Configurar Supabase Auth

O ChamadaFácil é single-company/single-tenant no MVP. Qualquer usuário autenticado no Supabase é tratado como operador/admin.

Por isso, em produção:

1. Acesse Supabase Dashboard > Authentication.
2. Desative public signups.
3. Crie ou convide manualmente os operadores em Authentication > Users.
4. Use senhas fortes ou fluxo de convite.
5. Confirme o e-mail do operador se sua configuração exigir confirmação.
6. Revise a lista de usuários e remova qualquer conta não autorizada.

Essa gestão manual de usuários faz parte do limite de segurança do MVP.

## 6. Deploy na Vercel

1. Publique o repositório no GitHub.
2. Acesse a Vercel.
3. Clique em Add New Project.
4. Importe o repositório do ChamadaFácil.
5. Confirme Framework Preset: Next.js.
6. Adicione as variáveis de ambiente.
7. Execute o primeiro deploy.

Configuração esperada:

| Item | Valor |
| --- | --- |
| Framework | Next.js |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output | Padrão da Vercel para Next.js |

## 7. Smoke Test Pós-Deploy

Valide estas rotas:

- `/`
- `/tickets/new`
- `/tickets/lookup`
- `/abrir-chamado`
- `/consultar-chamado`
- `/admin/login`
- `/admin`
- `/admin/tickets`
- `/admin/tickets/[id]`

Comportamentos esperados:

- A página inicial carrega corretamente.
- `/abrir-chamado` redireciona para `/tickets/new`.
- `/consultar-chamado` redireciona para `/tickets/lookup`.
- A criação pública de chamado funciona.
- A consulta só funciona com código e e-mail corretos.
- Consulta com dados errados mostra mensagem neutra.
- `/admin` sem login redireciona para `/admin/login`.
- Login admin funciona com usuário criado manualmente.
- Dashboard carrega a fila de chamados.
- Filtros por status e urgência funcionam.
- Detalhe do chamado abre corretamente.
- Admin consegue atualizar status e urgência.
- Admin consegue publicar resposta pública.
- Service role key não aparece no código client-side nem em logs públicos.

## 8. Estratégia de Demo para Portfólio

Recomendado:

- Usar screenshots finais e/ou vídeo curto de walkthrough.
- Se houver demo interativa, usar um projeto Supabase separado e descartável.
- Não divulgar credenciais administrativas reais.
- Não usar o usuário local do seed como login público.
- Resetar dados de demo periodicamente se a demo for aberta para visitantes.

Quando a demo estiver publicada, adicione a URL final no README, no estudo de caso e no card do portfólio. Antes disso, mantenha a documentação dizendo explicitamente que a demo ainda não foi publicada.

## 9. Checklist de Segurança de Produção

- Public signups desativados no Supabase Auth.
- Admin/operador criado manualmente.
- Apenas usuários autorizados existem em Auth.
- RLS habilitado nas tabelas do app.
- Grants anônimos diretos removidos de tickets e respostas.
- Variáveis de ambiente configuradas corretamente.
- Service role key server-only.
- Migrations aplicadas no banco remoto.
- Seed local não aplicado em produção.
- Rotas admin protegidas.
- Ações admin revalidando usuário autenticado.
- Rate limit básico testado.
- Headers de segurança presentes.

## 10. Rollback

Se o deploy falhar:

1. Verifique o log de build da Vercel.
2. Confirme variáveis de ambiente.
3. Rode `npm run build` localmente.
4. Confirme que as migrations foram aplicadas no Supabase remoto.
5. Se necessário, volte para o deploy anterior na Vercel.

Se uma migration causar problema:

- Pause novos deploys.
- Revise a migration aplicada.
- Use backup/restauração do Supabase se necessário.
- Evite rodar comandos destrutivos em produção sem backup.

## 11. Comandos Úteis

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run supabase:link
npx supabase db push
```

Para desenvolvimento local com Supabase:

```bash
npm run supabase:start
npm run supabase:status
npm run supabase:db:reset
```
