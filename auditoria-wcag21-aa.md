# Auditoria de acessibilidade — WCAG 2.1 AA

**Data:** 06/11/2026  
**Versão avaliada:** prévia local do Hortus em `http://localhost:4174/`  
**Escopo automatizado:** 10 páginas HTML; regras axe-core marcadas para WCAG 2.0 A/AA e WCAG 2.1 A/AA.  
**Ferramenta:** axe-core 4.10.3 via axe CLI.  
**Resultado automatizado:** 0 violações reportadas nas 10 páginas. O registro JSON integral está em `work/a11y-audit/hortus-10-pages.json`, fora da pasta do site.

## Revisões manuais desta rodada

- Em viewport desktop de 1440 × 900 e na janela dividida da captura (876 × 892), o painel de filtros da busca permanece visível durante a rolagem, fica limitado à altura disponível e para no fim da coluna de resultados. O efeito se aplica quando o layout mantém duas colunas (a partir de 681 px); permanece desativado no layout móvel de uma coluna.
- A paginação foi conferida com 11 hortas: exibe 10 na primeira página e 1 na segunda, atualiza o anúncio de resultados e os estados dos botões anterior/próxima.
- As setas do carrossel de cultivos ficam centralizadas nos círculos (diferença observada: 0 px no centro horizontal e vertical). Os checkboxes dos cultivos e da autorização têm 18 × 18 px e alinhamento vertical com seus rótulos.
- A paleta dos cultivos selecionados foi corrigida para fundo verde-lima e texto escuro; a relação de contraste calculada é 9,95:1. A seta dos campos passou a usar cinza-claro com 9,43:1 contra o fundo do controle.
- Corrigi a repetição visual das setas nos campos: uma regra posterior de fundo estava anulando o tamanho, a posição e o `no-repeat` do ícone. A largura de 876 px agora mostra uma única seta por campo.
- Combinações de cores de texto usadas no tema também foram calculadas: texto principal sobre o canvas 16,59:1; texto secundário sobre canvas 9,91:1; texto principal sobre superfície 14,84:1. São relações entre cores nominais, não cobrem texto sobre fotografia, estados de foco/erro nem todo conteúdo dinâmico.
- O recurso de exclusão aparece na área autenticada de edição e solicita a senha atual em confirmação própria. A função `public.garden_delete(text,text)` foi criada pela migração `supabase/migrations/202611070001_garden_delete.sql` e aplicada ao projeto Supabase com autorização do usuário. Nenhum cadastro foi excluído nem se tentou exercitar uma exclusão real.

## Resultado específico de contraste

Executei também somente a regra `color-contrast` do axe-core nas dez páginas. O scanner não reportou falhas definitivas. Marcou 23 elementos em sete páginas como **incompletos**, principalmente texto sobre gradientes/fotos, controles com ícone de seta como imagem de fundo, conteúdo sobreposto e ícones decorativos. “Incompleto” significa que a ferramenta não conseguiu determinar o fundo ou que o conteúdo é não textual; não equivale a aprovação nem a falha confirmada. Essa execução usou a janela headless 764 × 372.

Nos pares sólidos de cores do tema, calculei: texto principal `#F1F4E8` sobre canvas `#10150F` = 16,59:1; texto secundário `#B5C2AA` sobre canvas = 9,91:1; texto principal sobre superfície `#182118` = 14,84:1; texto escuro `#172013` sobre verde-lima `#B7D42A` = 9,95:1; seta `#B5C2AA` sobre o campo `#131B13` = 9,43:1. Esses números cobrem as combinações de cores indicadas, não os elementos incompletos sobre imagens/gradientes nem todos os estados interativos.

## Limites e trabalho restante

O resultado automatizado não demonstra conformidade integral. O axe informa que só encontra automaticamente parte das barreiras; além disso, a varredura headless foi executada em viewport reportado de 784 × 384, enquanto as medições manuais de rolagem foram feitas em 1440 × 900. Não houve nesta rodada navegação completa por teclado, teste com leitor de tela, teste de alto contraste, nem validação visual e funcional de todas as páginas e estados.

A documentação do projeto já registra verificações responsivas anteriores em páginas selecionadas, mas isso não cobre todos os critérios de Reflow (1.4.10) e Resize Text (1.4.4) nas dez páginas. A validação móvel completa foi deixada para a próxima etapa, como solicitado. Portanto, **não afirmar ainda que o Hortus está certificado ou plenamente conforme à WCAG 2.1 AA**.

Próxima revisão: percorrer as dez páginas por teclado e leitor de tela; verificar foco, zoom e reflow nas larguras relevantes; testar erros, sucesso, diálogo e conteúdo com imagem; repetir axe na URL publicada e validar o HTML no W3C. Corrigir e registrar cada achado antes de declarar conformidade.

## Critérios de referência

- W3C, [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
- W3C, [Contrast (Minimum), critério 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- W3C, [Reflow, critério 1.4.10](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html)
- W3C, [Status Messages, critério 4.1.3](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html)
