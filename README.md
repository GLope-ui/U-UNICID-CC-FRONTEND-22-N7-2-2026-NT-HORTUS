# Hortus

**Cultive junto. Colha comunidade.**

Plataforma online de criação e gerenciamento de hortas comunitárias, desenvolvida pela equipe **Raiz Digital** como projeto acadêmico (Entrega 01: site completo em HTML + CSS).

> 🔗 Endereço previsto: `hortus.eco.br`

---

## Sobre o projeto

Hortas comunitárias urbanas ajudam o meio ambiente e a vida em comunidade ao mesmo tempo. O problema quase nunca é a terra ou a vontade de participar: é a **gestão**. Em visitas a três hortas da Grande São Paulo, a equipe viu sempre o mesmo cenário: escala de tarefas em caderno, lista de participantes em grupo de mensagens e registro de colheita em folhas soltas.

O Hortus propõe uma interface web que torna **pública e mensurável** a produção de alimento, o desvio de resíduo do aterro e a participação das pessoas.

O projeto dialoga com os Objetivos de Desenvolvimento Sustentável da ONU:

- **ODS 2:** Fome zero e agricultura sustentável
- **ODS 11:** Cidades e comunidades sustentáveis
- **ODS 12:** Consumo e produção responsáveis

## Público-alvo

| Perfil | Necessidade principal |
|---|---|
| Organizadores de horta | Registrar canteiros, escalar mutirões e comprovar resultados |
| Voluntários e vizinhos | Descobrir a horta mais próxima e saber como participar |
| Educadores | Usar a horta como conteúdo de aula |
| Poder público e parceiros | Consultar dados de impacto antes de apoiar |
| Pessoas com deficiência (**público prioritário**) | Acessar o conteúdo sem barreiras e encontrar hortas acessíveis |

## Páginas do site

| # | Página | Função |
|---|---|---|
| 1 | `index.html` | Apresentação, menu principal, vitrine das hortas e resumo do impacto |
| 2 | `sobre.html` | História, missão, visão, valores e como funciona |
| 3 | `projetos.html` | Hortas piloto, quatro programas e agenda de atividades |
| 4 | `impacto.html` | Dados e tabelas de produção, destino da colheita |
| 5 | `acessibilidade.html` | Medidas de inclusão no site e no canteiro |
| 6 | `galeria.html` | Nove ilustrações autorais com legenda e fonte |
| 7 | `midia.html` | Vídeo com legendas, vinheta em áudio e mapa |
| 8 | `noticias.html` | Cinco notícias, boletim e sugestões de leitura |
| 9 | `contato.html` | Formulário validado, contatos, endereços e equipe |
| 10 | `orcamento_hospedagem.html` | Comparativo de 3 hospedagens e 3 domínios |

## Tecnologias

- **HTML5 semântico** (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** em folha única (`css/style.css`), com Grid, Flexbox, variáveis e media queries
- **SVG** para ilustrações, logotipo e favicon
- **Vídeo** MP4 (H.264) com legendas **WebVTT**, **áudio** MP3 e **mapa** do OpenStreetMap (`iframe`)
- **Google Fonts:** Space Grotesk e DM Sans, com alternativas de sistema
- **Sem JavaScript** nesta entrega: a validação do formulário usa apenas HTML5 nativo

### Por que sem JavaScript?

A validação nativa do HTML5 já atende ao formulário e é anunciada corretamente por leitores de tela. Além disso, o site funciona mesmo com scripts desativados e fica mais leve. A pasta `js/` foi mantida na estrutura, com um arquivo registrando essa decisão.

## Estrutura de pastas

```
hortus/
├── index.html
├── sobre.html
├── projetos.html
├── impacto.html
├── acessibilidade.html
├── galeria.html
├── midia.html
├── noticias.html
├── contato.html
├── orcamento_hospedagem.html
├── css/
│   └── style.css
├── js/          # sem scripts nesta entrega
├── img/         # ilustrações e logotipo em SVG
├── assets/      # vídeo, áudio e legendas
└── docs/        # README, diário, orçamento e evidências de testes
```

## Identidade visual

O site segue a estética **neobrutalista**: bordas pretas de 3 px, sombras duras sem desfoque, blocos levemente rotacionados e cores chapadas. É uma escolha funcional, porque limites visuais explícitos e alto contraste ajudam a legibilidade.

| Cor | Hex | Uso |
|---|---|---|
| Verde folha | `#287a4b` | Cor principal e botões |
| Verde escuro | `#17452b` | Caules das ilustrações e apoios |
| Verde broto | `#a9d96c` | Destaques e logotipo |
| Creme | `#f4efdf` | Fundo padrão |
| Creme claro | `#fffaf0` | Cabeçalho e campos |
| Milho | `#f4c542` | Destaques e marcações |
| Laranja colheita | `#e87845` | Etiquetas e blocos de atenção |
| Terracota | `#c9573f` | Foco e sinalização de erro |
| Azul água | `#8fc9c0` | Blocos de água e irrigação |
| Rosa | `#e7a4a7` | Variação de bloco |
| Quase preto | `#171a16` | Texto, bordas e sombras |
| Branco quente | `#fffdf7` | Fundo de cards |

## Acessibilidade

O site segue as **WCAG 2.1 nível AA** desde o início do desenvolvimento:

- `lang="pt-BR"` em todas as páginas
- Link "pular para o conteúdo" como primeiro elemento focável
- Navegação completa por teclado, com foco visível de 4 px
- `alt` descritivo em imagens informativas e `aria-hidden` em ícones decorativos
- `label for` em todos os campos e `aria-describedby` nas dicas de preenchimento
- `caption` e `scope` em todas as tabelas
- Contraste de texto acima de 4,5:1 (mínimo medido: **5,28:1**)
- `prefers-reduced-motion` respeitado
- Testes com leitor de tela **NVDA**

## Responsividade

| Largura | Layout |
|---|---|
| Acima de 950 px | Desktop, grades de 3 e 4 colunas |
| 620 px a 950 px | Tablet, grades de 2 colunas |
| Abaixo de 620 px | Celular, coluna única e sem rolagem horizontal |

## Sustentabilidade e desempenho

- Site abaixo de **1 MB** somando HTML, CSS e imagens
- Imagens em SVG, sem fotografias pesadas
- Folha de estilo única e nenhuma dependência externa de script
- `preload="metadata"` no vídeo, `preload="none"` no áudio e `loading="lazy"` no `iframe`
- Hospedagem prevista em data centers de energia neutra em carbono

## Como executar

Não é preciso instalar nada. É um site estático.

```bash
# 1. Clone o repositório
git clone https://github.com/<usuario>/hortus.git

# 2. Entre na pasta
cd hortus

# 3. Abra o index.html no navegador
```

> A internet só é necessária para o mapa (OpenStreetMap) e para as fontes do Google Fonts. O restante funciona offline.

## Fora do escopo desta entrega

Previstos para as próximas fases: área autenticada, banco de dados, envio real do formulário, mapa editável de canteiros, aplicativo móvel, JavaScript e back-end.

> ⚠️ **Dados fictícios:** hortas, pessoas, endereços, telefones e números de produção foram criados para fins acadêmicos. O formulário de contato valida os campos, mas **não envia** dados.

## Conteúdo e créditos

Todo o conteúdo é autoral: as ilustrações, o logotipo, o vídeo institucional e a vinheta em áudio foram criados pela equipe. O único conteúdo de terceiros é o mapa incorporado do **OpenStreetMap** (licença ODbL), com crédito visível na página `midia.html`.

## Equipe Raiz Digital

| Integrante | RGM | Páginas | Função |
|---|---|---|---|
| Vinícius Dias Gomes | 47441081 | `index`, `projetos` | Arquitetura, HTML semântico e integração final |
| Guilherme de Souza Lopes dos Santos | 47475609 | `sobre`, `galeria` | CSS, identidade visual e responsividade |
| Valquíria Rodrigues de Macedo | 47415061 | `acessibilidade`, `noticias` | Conteúdo, acessibilidade e testes com leitor de tela |
| Pablo Henrique Lourenço Guimarães | 47672285 | `midia`, `contato`, `orcamento_hospedagem` | Mídia, orçamento de hospedagem e documentação |

A página `impacto.html` foi feita em dupla por Vinícius e Valquíria.

## Fluxo de trabalho

- Uma **branch por integrante**, com divisão por página para evitar conflitos
- Revisão antes de integrar na branch principal
- Tarefas organizadas em quadro no Trello (A fazer, Em andamento, Em revisão, Concluído)

## Status da Entrega 01

14 dos 15 critérios de aceitação estão atendidos. O pendente é a **validação oficial no W3C Markup Validation Service**: a verificação interna não encontrou erros, e a validação oficial está prevista antes da entrega final.

Mais detalhes em `docs/evidencias-testes.md`.

---

*Projeto acadêmico desenvolvido pela equipe Raiz Digital. São Paulo, setembro de 2026.*
