# Checklist Final de Publicação

Use este checklist antes de colocar o ChamadaFácil oficialmente no portfólio.

## Produto e Demo

- [ ] Deploy funcionando.
- [ ] Link da demo adicionado no README.
- [ ] Link da demo adicionado no estudo de caso.
- [ ] Fluxo público de abertura de chamado testado.
- [ ] Fluxo público de consulta de chamado testado.
- [ ] Login admin testado.
- [ ] Dashboard admin testado.
- [ ] Detalhe do chamado testado.
- [ ] Atualização de status, urgência e resposta testadas.
- [ ] Mobile testado.
- [ ] Console do navegador sem erros relevantes.

## GitHub e Documentação

- [ ] GitHub público limpo.
- [ ] README.md bonito e atualizado.
- [ ] README.en.md atualizado.
- [ ] Case study em português revisado.
- [ ] Case study em inglês revisado.
- [ ] SECURITY.md claro e sem promessas exageradas.
- [ ] DEPLOYMENT.md com instruções de produção.
- [ ] `.env.example` sem segredos.
- [ ] Screenshots adicionados ou revisados.
- [ ] README preview conferido no GitHub.
- [ ] Links relativos funcionando.
- [ ] Sem pendências visíveis em documentos de apresentação.
- [ ] Sem placeholders de demo/repositório depois da publicação.

## Supabase e Segurança

- [ ] Variáveis de ambiente corretas no provedor de deploy.
- [ ] Supabase production configurado.
- [ ] Migrations aplicadas no banco remoto.
- [ ] Seed local não aplicado em produção.
- [ ] Public signups desativado.
- [ ] Admin criado manualmente.
- [ ] Lista de usuários do Supabase revisada.
- [ ] RLS verificado em `tickets`.
- [ ] RLS verificado em `ticket_responses`.
- [ ] RLS verificado em `public_rate_limits`.
- [ ] Service role key disponível apenas no servidor.
- [ ] Nenhuma credencial real em screenshots, README, logs ou issues.
- [ ] Rate limit básico testado.

## Qualidade Técnica

- [ ] `npm run lint` passando.
- [ ] `npm run typecheck` passando.
- [ ] `npm run build` passando.
- [ ] Rotas públicas testadas: `/`, `/tickets/new`, `/tickets/lookup`.
- [ ] Redirecionamentos testados: `/abrir-chamado`, `/consultar-chamado`, `/admin/tickets`.
- [ ] Rotas privadas testadas: `/admin`, `/admin/tickets/[id]`.
- [ ] Estado vazio testado no dashboard.
- [ ] Estado de erro validado sem expor detalhes sensíveis.

## Portfólio e Currículo

- [ ] Card no portfólio atualizado.
- [ ] Texto curto do projeto revisado.
- [ ] Texto médio/case revisado.
- [ ] Link do GitHub no portfólio.
- [ ] Link da demo no portfólio.
- [ ] Currículo atualizado com bullets do projeto.
- [ ] LinkedIn atualizado, se for usar o projeto lá.
- [ ] Versão em inglês revisada para candidaturas internacionais.
