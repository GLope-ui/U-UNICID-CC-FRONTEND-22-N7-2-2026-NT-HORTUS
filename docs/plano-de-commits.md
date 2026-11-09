# Plano de commits — branch `security-check`

Esta é uma proposta mais equilibrada para importar a versão atual de dez páginas com Supabase. Ela não é prova de autoria: cada integrante deve revisar os arquivos e commitar somente mudanças que realmente fez. O checkout remoto `security-check` ainda contém uma versão anterior; usem o ZIP atual como fonte comum e revisem os arquivos antigos antes de removê-los.

## Vinícius — busca e integração da entrega

- `buscar.html`
- Parte de busca, filtros, ordenação, recomendações e paginação em `assets/js/site.js` (comitar depois da parte de cadastro do Pablo no mesmo arquivo)
- `README.md` e `docs/README.md`
- `docs/melhorias-do-mvp.md` e `docs/plano-contexto.md`
- Consolidar `docs/uso-de-ia.md` com as paráfrases reais fornecidas por cada integrante; cada um deve revisar sua própria parte
- `entrega/repositorio.txt` e `entrega/url-site.txt`; usar a URL pública do Pages e confirmar o deploy desta versão após o merge para `main`

**Mensagem sugerida:** `feat(search): implementa busca e documenta a entrega atual`

## Guilherme — homepage e identidade visual

- `index.html`
- `assets/css/site.css`
- `assets/img/horta-demo.png`, `assets/img/horta-hero.png`, `assets/img/hortus-icon.png` e `assets/img/hortus-logo.png`
- `docs/direcao-visual.md`

**Mensagem sugerida:** `feat(home): aplica identidade visual do Hortus`

## Valquíria — conteúdo e acessibilidade

- `sobre.html`, `acessibilidade.html`, `privacidade.html` e `contato.html`
- `docs/escopo-do-projeto.md`, `docs/auditoria-wcag21-aa.md` e `docs/evidencias-testes.md`, registrando apenas testes que ela realmente fizer
- `docs/diario-de-bordo.md`, reunindo as entradas que cada integrante fornecer
- `entrega/capturas/hortus-home-desktop.png`, `entrega/capturas/hortus-home-mobile.png` e `entrega/capturas/LEIA-ME.txt`, após revisar as imagens

**Mensagem sugerida:** `docs(a11y): atualiza conteúdo e evidências de acessibilidade`

## Pablo — cadastro e persistência

- `cadastrar.html`, `gerenciar.html`, `como-funciona.html` e `para-hortas.html`
- Parte de cadastro, recuperação e gerenciamento de `assets/js/site.js` (comitar antes da parte de busca do Vinícius)
- `assets/js/supabase-config.js` e `assets/data/bip39-english.txt`
- Os três arquivos em `supabase/migrations/`
- `docs/orcamento.md` e este `docs/plano-de-commits.md`

**Mensagem sugerida:** `feat(gardens): integra cadastro e persistência no Supabase`

## Arquivos de equipe

Cada integrante preenche e confere seu próprio RA em `entrega/integrantes.txt`. O valor não deve ser adivinhado nem preenchido por outra pessoa. Cada um também informa ao Vinícius as decisões reais de uso de IA e o que revisou para entrar no diário e no registro de IA.

## Ordem para evitar conflitos

1. Pablo comita primeiro cadastro, gerenciamento e banco; inclui a versão base de `assets/js/site.js`.
2. Guilherme comita homepage, estilos e imagens.
3. Valquíria comita conteúdo institucional, acessibilidade, diário e capturas revisadas.
4. Vinícius atualiza a branch, acrescenta busca/paginação no `site.js` e comita README, checklist e registros de entrega.
5. O grupo revisa o diff completo em `security-check`, confere e remove arquivos da versão antiga somente após confirmar que não são necessários, e abre um PR de `security-check` para `main`.

Façam os commits sequencialmente na mesma branch ou coordenem branches de apoio. Como `assets/js/site.js` é compartilhado, não trabalhem nele ao mesmo tempo. Cada commit deve usar a conta do integrante que fez o trabalho; não simulem autoria.

