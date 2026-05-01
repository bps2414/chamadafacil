# Checklist de Screenshots

Use este checklist antes de publicar o projeto no portfolio. Todos os prints devem usar dados ficticios e nao podem expor variaveis de ambiente, tokens, cookies, URLs privadas, e-mails pessoais ou credenciais reais.

## Prints Atuais no Repositorio

Arquivos ja existentes em `public/screenshots/`:

- [x] `landing-desktop.png`
- [x] `ticket-new-form.png`
- [x] `ticket-lookup-form.png`
- [x] `admin-login.png`
- [x] `admin-dashboard.png`
- [x] `admin-ticket-detail.png`

Assets de card existem em:

- `public/portfolio/`
- `docs/portfolio-assets/`

## Prints Finais Recomendados

| Status | Print | Nome sugerido | O que deve aparecer |
| --- | --- | --- | --- |
| [x] | Landing desktop | `landing-desktop.png` | Hero, proposta do ChamadaFacil, CTA de abrir chamado e CTA de consultar. |
| [x] | Abertura de chamado | `ticket-new-form.png` | Formulario publico com solicitante, assunto, descricao e envio. |
| [ ] | Sucesso com codigo copiavel | `ticket-created-success.png` | Mensagem de sucesso, codigo destacado, botao de copiar e CTA para consulta. |
| [x] | Consulta inicial | `ticket-lookup-form.png` | Campos de numero do chamado e e-mail. |
| [ ] | Consulta com resultado | `ticket-lookup-result.png` | Status, urgencia, assunto, descricao, timeline e respostas. |
| [ ] | Consulta nao encontrada | `ticket-lookup-not-found.png` | Mensagem neutra pedindo para conferir codigo/e-mail, sem revelar se o ticket existe. |
| [x] | Dashboard admin operacional | `admin-dashboard.png` | Cards de resumo, busca, filtros, ordenacao e lista de chamados. |
| [ ] | Dashboard admin mobile | `admin-dashboard-mobile.png` | Filtros empilhados e cards mobile sem scroll horizontal. |
| [x] | Detalhe admin com resposta | `admin-ticket-detail.png` | Dados do solicitante, timeline, status, urgencia e resposta publica. |
| [ ] | README preview | `github-readme-preview.png` | README renderizado no GitHub com screenshots e links. |

## Criterios de Seguranca dos Prints

- [ ] Sem `.env`, `.env.local` ou painel de variaveis aberto.
- [ ] Sem `SUPABASE_SERVICE_ROLE_KEY`.
- [ ] Sem anon key real em contexto sensivel.
- [ ] Sem cookies, headers, DevTools Network ou console aberto.
- [ ] Sem senha administrativa preenchida.
- [ ] Sem dados de cliente real.
- [ ] Sem URL privada do projeto Supabase se ela nao for intencionalmente publica.
- [ ] Admin de seed aparece apenas como contexto local/dev, nunca como login publico de producao.

## Recomendacoes

- Use o seed local ou dados de demo ficticios.
- Prefira viewport desktop para landing/admin e viewport mobile para pelo menos um print do admin.
- Antes de substituir imagens no README, confirme que os arquivos existem em `public/screenshots/`.
- Se um print mostrar falha, loading infinito ou warning visivel, refaca.
- O README pode apontar apenas para os prints ja capturados; os demais ficam como checklist ate serem gerados.
