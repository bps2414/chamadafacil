# Checklist Final de Publicacao

Use este checklist antes de colocar o ChamadaFacil oficialmente no GitHub/portfolio.

## Produto e Demo

- [ ] Deploy funcionando em `https://chamadafacil.vercel.app`.
- [x] Link da demo no README.
- [x] Link da demo no case study.
- [ ] Fluxo publico de abertura testado.
- [ ] Sucesso com codigo copiavel testado.
- [ ] Consulta publica com chamado existente testada.
- [ ] Consulta publica nao encontrada testada.
- [ ] Login admin testado.
- [ ] Logout admin testado.
- [ ] Dashboard admin testado com busca, filtros, sort e limpar.
- [ ] Detalhe admin testado com status, urgencia e resposta.
- [ ] Mobile revisado em abertura, consulta, dashboard e detalhe.
- [ ] Console do navegador sem erros relevantes.

## GitHub e Documentacao

- [ ] GitHub publico revisado.
- [x] README PT-BR atualizado.
- [x] README EN atualizado.
- [x] Case study PT-BR atualizado.
- [x] Case study EN atualizado.
- [x] Textos de portfolio atualizados.
- [x] Bullets tecnicos/curriculo atualizados.
- [x] Checklist de screenshots atualizado.
- [x] Limitacoes conscientes documentadas.
- [x] Comandos incluem `npm test`.
- [ ] README preview conferido no GitHub.
- [x] Links relativos principais revisados.
- [ ] Screenshots faltantes capturados.

## Supabase e Seguranca

- [x] `.env` ignorado pelo Git.
- [x] `.env.example` versionado sem valores reais.
- [x] Admin de seed documentado como local/dev.
- [x] Deploy nao recomenda publicar usuario/senha de demo perigoso.
- [ ] Variaveis corretas no provedor de deploy.
- [ ] Public signups desativado em producao.
- [ ] Operadores criados manualmente em producao.
- [ ] Seed local nao aplicado em producao.
- [ ] RLS verificado em `tickets`.
- [ ] RLS verificado em `ticket_responses`.
- [ ] RLS verificado em `public_rate_limits`.
- [x] Service role key real ausente de docs versionados e codigo client-side.
- [x] Busca por tokens/chaves reais revisada.

## Qualidade Tecnica

- [x] `npm test` passando.
- [x] `npm run lint` passando.
- [x] `npm run typecheck` passando.
- [x] `npm run build` passando.
- [ ] Rotas publicas testadas: `/`, `/tickets/new`, `/tickets/lookup`.
- [ ] Redirecionamentos testados: `/abrir-chamado`, `/consultar-chamado`, `/admin/tickets`.
- [ ] Rotas privadas testadas: `/admin`, `/admin/tickets/[id]`.
- [ ] Estado vazio testado no dashboard.
- [ ] Estado de erro revisado sem detalhes sensiveis.

## Portfolio e Curriculo

- [x] Card de portfolio atualizado.
- [x] Descricao curta revisada.
- [x] Descricao media/case revisada.
- [x] Link do GitHub incluido nos materiais.
- [x] Link da demo incluido nos materiais.
- [x] Versao em ingles revisada.
- [ ] Curriculo/LinkedIn atualizados fora do repositorio, se aplicavel.

## Pendencias Antes da Publicacao Final

- Capturar os screenshots marcados como pendentes em `docs/SCREENSHOTS_CHECKLIST.md`.
- Conferir README renderizado no GitHub.
- Executar smoke test no deploy real.
- Confirmar configuracoes finais do Supabase production.
