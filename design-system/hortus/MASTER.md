# Hortus — design system

Versão 2.0 · revisão visual e movimento

## Direção
Hortus combina pôster botânico editorial e energia de cultivo urbano: verde-floresta, papel claro, títulos condensados grandes e ações em verde-vivo. A família visual vem da referência Kikin já aprovada para a marca; a execução não replica a composição de uma página única. Cada aba tem ritmo, estrutura e função próprios.

### Trava de referência
- **Base:** linguagem editorial botânica do Hortus e o contraste de cartaz da referência existente.
- **Preservar:** bloco floresta, papel claro, display Oswald, fotografia/ilustração em slots com proporção definida e verde-meadow reservado a chamadas e ênfases breves.
- **Movimento:** feedback elástico curto em controles e cartões; entrada de conteúdo com deslocamento pequeno; imagem reage ao hover; nenhuma animação bloqueia ação ou esconde conteúdo sem JavaScript.
- **Tom:** acolhedor, urbano, ativo e direto. Conteúdo trata de cultivo, comunidade e uso dos espaços.
- **Rejeitar:** repetir o mesmo hero + parágrafo + três cartões em todas as páginas; títulos comprimidos que cortem cedilha; rolagem controlada, parallax intenso, carrossel automático e movimento contínuo decorativo.

### Composição por página
| Página | Assinatura visual e funcional |
|---|---|
| Início | Cartaz de abertura com fotografia ampla, convite principal e trilha de três etapas. |
| Sobre | Manifesto editorial, princípios numerados e faixa de compromisso comunitário. |
| Projetos | Diretório em primeiro plano, busca central e percurso de participação em linhas numeradas. |
| Impacto | Painel de indicadores com exemplo numérico identificado como demonstração e guia para registrar participação, colheita e reaproveitamento. |
| Acessibilidade | Checklist expansível por tema; cada seção explica o que verificar e o que informar. |
| Galeria | Mosaico de nove imagens autorais ou ilustrativas, com legenda, fonte, filtros e ampliação em diálogo acessível. |
| Mídia | Área de reprodução focada, com vídeo legendado, áudio, mapa de referência e descrição textual. |
| Notícias | Cinco artigos e guias editoriais numerados sobre cultivo e participação. |
| Contato | Próximos passos, equipe Hortus e formulário HTML5 validado com estado claro de que a mensagem não foi enviada. |
| Orçamento | Comparativo de três hospedagens e três domínios, com fontes e data de consulta. |
| Buscar hortas | Diretório com busca textual, filtros combináveis, ordenação e paginação curta; cada anúncio fica ligado à horta e à etapa do plantio. |
| Criar horta | Formulários preparados para cadastrar hortas e anúncios de cultivo com previsão de colheita; os envios dependem da configuração futura do acesso. |

### Tipografia e cedilha
- Escala de display responsiva: hero de `clamp(3rem, 6.4vw, 6.25rem)`, título de seção de `clamp(2.25rem, 4.8vw, 4.5rem)`, corpo de 16–18px e rótulos a partir de 12px.
- Títulos usam line-height mínimo de `1.15`, espaço superior e inferior de segurança e `overflow: visible`; não comprimir linhas para encaixar títulos longos. A altura acomoda tanto a cedilha quanto acentos agudos, circunflexos e til em maiúsculas.
- Quebra natural e `text-wrap: balance` em títulos curtos. Não usar `word-break: break-all` nem travar palavras com espaços inseparáveis.
- A fonte de exibição precisa manter diacríticos do português; manter fallback sans-serif e verificar `Ç`, `Ã`, `Õ` e acentos em maiúsculas.

### Movimento e interação
- Token de chegada: 420ms, easing `cubic-bezier(.2,.8,.2,1)`; saída e feedback de controle são mais rápidos.
- Entrada por rolagem só com `IntersectionObserver`; sem JS, o conteúdo continua visível. Usar opacidade e transform, nunca animar dimensões.
- Stagger curto de 45ms em grupos pequenos. Limitar animações de entrada a elementos principais da seção.
- Pressão de botão: squash de até 6% e stretch cruzado discreto; cartões clicáveis elevam poucos pixels e assentam com spring curto.
- Respeitar `prefers-reduced-motion`: desativar deslocamento, escalonamento e transições não essenciais.
- Toda interação tem alternativa por teclado, foco visível e estado textual; não depender apenas de hover ou cor.

### Referências e síntese
- Refero ao vivo foi consultado nesta revisão, mas retornou `NO_SUBSCRIPTION`; nenhuma referência externa foi inventada.
- O guia local UI UX Pro Max forneceu o padrão de entrada de 8–16px, stagger curto, transform/opacity, escala de pressionamento e preferência por movimento reduzido.
- Tailwind Design System v4 continua como implementação CSS-first: tokens em `@theme`, componentes em `@layer components` e breakpoints consistentes.
- Síntese escolhida: manter a identidade botânica já aprovada, adotar feedback elástico dos controles e a entrada sutil por rolagem, e desenhar layouts dedicados por objetivo de cada aba.
- A busca e o cadastro acrescentam duas páginas de tarefa ao menu; as dez páginas principais continuam preservadas.
- O diretório pode mostrar 50 hortas fictícias em cidades e bairros do estado de São Paulo como demonstração. Cada card e a página identificam claramente esses dados; não devem ser apresentados como iniciativas ou disponibilidade de alimentos reais.

## Tokens
- Forest `#122315`: hero, navegação e rodapé.
- Paper `#f3ede4`: fundo principal.
- Meadow `#55dd4a`: CTA e ênfase curta; nunca como fundo de texto longo.
- River `#73d3eb`, sun `#ffed52`: apenas ilustrações.
- Sage `#566053`: bordas e divisores.
- Oswald: display, com DM Sans e Arial como fallbacks por glifo para cobrir todos os diacríticos do português; DM Sans: texto e interface.
- Cards: raio 20px e sombra discreta; controles: raio 10px; foco visível de 3px.
- Movimento: `--motion-enter: 420ms`, `--motion-control: 180ms`, `--motion-ease: cubic-bezier(.2,.8,.2,1)`.
- Espaço seguro de display: `0.15–0.18em` acima e abaixo dos títulos; line-height de display `1.15–1.18`.

## Padrões
Mobile-first; largura de conteúdo até 1200px; alvos de toque mínimos de 44px; links com foco e hover; respeitar `prefers-reduced-motion`. Imagens responsivas, com dimensões e alt descritivo. Ícones decorativos em SVG, sem emoji. Um h1 por página e headings sem pular nível. Formulário com label visível, validação HTML5 e feedback próximo. Usar uma composição característica por aba e reutilizar tokens e componentes, não a sequência completa da página inicial.

## Build
Editar `src/input.css` e classes dos HTML; compilar com `npm run build`, gerando `css/style.css`.
