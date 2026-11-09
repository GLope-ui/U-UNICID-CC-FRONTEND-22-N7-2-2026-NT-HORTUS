# Evolução do MVP para a versão atual

## Base da comparação

O MVP usado como referência é o commit [`d49e03c`](https://github.com/GLope-ui/U-UNICID-CC-FRONTEND-22-N7-2-2026-NT-HORTUS/commit/d49e03c), de 05/10/2026. Ele adicionou dez páginas HTML e um arquivo `style.css`. Não havia JavaScript, configuração Supabase ou migrações de banco nesse commit.

**Limite importante:** o parecer ou a rubrica comentada pelo professor sobre o MVP não foi fornecido para este registro. Portanto, a tabela abaixo compara fatos observáveis entre o commit e o site atual; não atribui essas mudanças a feedback oficial do professor nem inventa usuários, depoimentos ou testes.

## Comparação verificável

| No MVP (`d49e03c`) | Versão atual | Evidência no projeto |
|---|---|---|
| Site institucional com páginas de início, contato, galeria, impacto, mídia, notícias, orçamento, projetos e acessibilidade. | Diretório de hortas com dez páginas: início, busca, cadastro, gestão da horta, sobre, contato, acessibilidade, privacidade, como funciona e para hortas. | Arquivos do commit inicial comparados aos dez HTML da raiz atual. |
| Dez páginas HTML e uma folha de estilos; sem arquivos JavaScript no commit inicial. | JavaScript nativo para validação de formulários, interações, busca, filtros, ordenação e paginação. | `assets/js/site.js`; `buscar.html`; `cadastrar.html`. |
| O commit inicial não contém configuração de banco de dados ou operações de cadastro persistente. | Cadastro, edição, recuperação e exclusão de hortas integrados ao Supabase, com migrações SQL versionadas. | `assets/js/supabase-config.js`; `gerenciar.html`; `supabase/migrations/`. |
| Não havia página dedicada à gestão de uma horta cadastrada. | A área “Minha Horta” permite acesso por código e senha, edição do cadastro, recuperação por seis palavras e exclusão protegida. | `gerenciar.html`; `assets/js/site.js`; migrações Supabase. |
| As páginas e estilos do MVP tinham uma identidade visual anterior. | O site atual usa a marca Hortus enviada pela equipe, tema escuro verde/lima e tipografia Impact nos títulos, com regras responsivas. | `assets/css/site.css`; imagens em `assets/img/`; arquivos HTML atuais. |

## Correções solicitadas durante o desenvolvimento

Os itens abaixo resumem observações reais feitas pelo solicitante durante a revisão do site. São feedback de uso da equipe, não comentários atribuídos ao professor.

| Observação relatada | Ajuste presente na versão atual | Evidência |
|---|---|---|
| O código da horta podia falhar por espaços ou diferença entre maiúsculas e minúsculas; o formato das seis palavras de recuperação não estava claro. | O código é normalizado; as palavras de recuperação aceitam separação por vírgulas ou espaços e não diferenciam maiúsculas de minúsculas. | `assets/js/site.js`; `supabase/migrations/202611060002_normalize_garden_access_inputs.sql`. |
| Checkboxes e setas de seleção estavam desalinhados; o campo de confirmação de senha tinha dimensão diferente. | Os controles receberam dimensões, alinhamento e estilos consistentes. | `assets/css/site.css`, regras de `.check-row`, checkboxes e campos de formulário. |
| O painel de filtros deveria acompanhar a rolagem no desktop, e os cultivos precisavam de navegação por carrossel e busca melhor ordenada. | O painel de filtros fica fixo durante a rolagem em telas largas; o seletor de cultivos tem controles de navegação e prioriza correspondências que começam com o texto digitado. | `assets/css/site.css`; `assets/js/site.js`; `buscar.html`; `cadastrar.html`. |
| A lista de resultados não deveria exibir todas as hortas em uma única página. | A busca pagina os resultados, exibindo dez por página. | `buscar.html`; `assets/js/site.js`. |

## Evidências de comparação

- MVP: [commit `d49e03c`](https://github.com/GLope-ui/U-UNICID-CC-FRONTEND-22-N7-2-2026-NT-HORTUS/commit/d49e03c).
- Versão publicada: [site Hortus no GitHub Pages](https://glope-ui.github.io/U-UNICID-CC-FRONTEND-22-N7-2-2026-NT-HORTUS/).
- As capturas em `entrega/capturas/` mostram a homepage atual em desktop e celular. Elas não são apresentadas como capturas “antes e depois” do MVP.

Se a equipe tiver o feedback original do professor ou capturas autênticas do MVP, pode acrescentá-los como evidências separadas, mantendo a distinção entre avaliação oficial e comentários de uso durante o desenvolvimento.
