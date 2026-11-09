# Hortus

**Cultive junto. Colha comunidade.**

Hortus é um projeto acadêmico de diretório de hortas comunitárias. A proposta é ajudar visitantes a descobrir iniciativas, conhecer o que cada horta oferece e encontrar formas de participar. Responsáveis podem criar e manter o perfil público da própria horta.

> **Site público:** [Hortus no GitHub Pages](https://glope-ui.github.io/U-UNICID-CC-FRONTEND-22-N7-2-2026-NT-HORTUS/). O endereço já responde publicamente; a atualização desta versão depende da conclusão do merge em `main` e do próximo deploy automático do Pages. O projeto não depende de domínio próprio.

**Repositório:** [GLope-ui/U-UNICID-CC-FRONTEND-22-N7-2-2026-NT-HORTUS](https://github.com/GLope-ui/U-UNICID-CC-FRONTEND-22-N7-2-2026-NT-HORTUS)

## Propósito e público

O diretório atende pessoas que procuram uma horta para visitar ou apoiar, responsáveis por hortas comunitárias, educadores e grupos locais. O projeto se relaciona tematicamente com os Objetivos de Desenvolvimento Sustentável 2 (Fome Zero e Agricultura Sustentável), 11 (Cidades e Comunidades Sustentáveis) e 12 (Consumo e Produção Responsáveis). Essa relação descreve o propósito do projeto; não representa impacto quantitativo medido.

## Páginas

O site contém dez páginas HTML:

| Página | Arquivo | Conteúdo |
|---|---|---|
| Início | `index.html` | Apresentação do Hortus e atalhos para explorar e participar |
| Buscar Hortas | `buscar.html` | Busca, filtros combináveis, ordenação e paginação |
| Cadastrar Horta | `cadastrar.html` | Cadastro público da iniciativa, localização, cultivos e foto |
| Minha Horta | `gerenciar.html` | Acesso do responsável, edição, recuperação e exclusão protegida |
| Sobre | `sobre.html` | História, objetivo e limites do projeto |
| Contato | `contato.html` | Informações e formulário demonstrativo |
| Acessibilidade | `acessibilidade.html` | Recursos, verificações realizadas e limites conhecidos |
| Privacidade | `privacidade.html` | Dados tratados e limites do protótipo |
| Como Funciona | `como-funciona.html` | Orientações para visitantes e responsáveis |
| Para Hortas | `para-hortas.html` | Recomendações para manter o perfil público da horta |

## Recursos

- Pesquisa textual por nome, localização e cultivo; filtros combináveis por país, região, estado/província, cidade, categoria, cultivos, participantes e forma de visita.
- Ordenação dos resultados e paginação, com dez hortas por página.
- Cadastro de horta com fotografia e seletores de localização e cultivo.
- Área do responsável com código da horta e senha; recuperação por seis palavras; edição e exclusão do próprio cadastro, com confirmação.
- Cadastros persistidos no projeto Supabase. As tabelas e funções do banco estão documentadas em `supabase/migrations/`.
- Dados de demonstração são fictícios e identificados como demonstração. Não representam hortas reais.
- O formulário de contato valida os campos no navegador, mas não envia mensagens.

## Tecnologias e identidade

O frontend usa HTML semântico, CSS responsivo e JavaScript. O Supabase fornece persistência para os cadastros de hortas. O cliente usa uma chave publicável; nunca inclua chaves secretas ou credenciais administrativas no código do navegador.

A identidade visual usa tema escuro verde, verde-lima e tons neutros, além da marca e das imagens fornecidas para o Hortus. A tipografia de títulos utiliza Impact com alternativas de sistema.

## Estrutura do projeto

```text
hortus/
├── index.html, buscar.html, cadastrar.html, gerenciar.html, ...
├── assets/
│   ├── css/site.css
│   ├── js/site.js
│   └── img/
├── supabase/
│   └── migrations/
├── docs/
│   ├── README.md
│   ├── uso-de-ia.md
│   ├── diario-de-bordo.md
│   ├── escopo-do-projeto.md
│   ├── auditoria-wcag21-aa.md
│   └── evidencias-testes.md
└── entrega/
    └── capturas/
```

## Executar localmente no Windows

1. Instale Python 3, se necessário.
2. Abra o PowerShell nesta pasta do projeto.
3. Execute `py -m http.server 8000`.
4. Acesse `http://localhost:8000`.

Sirva os arquivos por HTTP; não abra com `file://`. As funções de cadastro precisam de conexão com o Supabase configurado para este projeto.

## Publicação

A equipe planeja usar GitHub Pages, com o frontend publicado a partir do repositório. A ativação ainda precisa ser feita pelo administrador do repositório e a URL pública precisa ser testada. O endereço HTTPS gratuito do GitHub Pages atende ao roteiro da atividade; um domínio próprio não é necessário.

O frontend pode ser hospedado como site estático, enquanto os dados continuam no Supabase. Após ativar o Pages, confira as dez páginas, links relativos, imagens, CSS e operações de cadastro antes de divulgar a URL.

## Acessibilidade e verificações

A auditoria axe-core registrou zero violações automatizadas nas dez páginas avaliadas. Houve também verificações manuais parciais de teclado, contraste e comportamento responsivo. Isso **não certifica conformidade completa com WCAG 2.1 AA**. A validação W3C das páginas finais, revisão completa de teclado/leitor de tela, reflow de todas as páginas e conferência na versão publicada ainda precisam ser concluídos. Consulte `docs/auditoria-wcag21-aa.md` e `docs/evidencias-testes.md`.

O roteiro da atividade também pede conferência do uso de `localStorage` para rascunho ou preferência; esse ponto continua listado para confirmação em `docs/README.md`.

## Equipe

Projeto acadêmico da equipe **Raiz Digital**:

- Vinícius Dias Gomes
- Guilherme de Souza Lopes dos Santos
- Valquíria Rodrigues de Macedo
- Pablo Henrique Lourenço Guimarães

As contribuições desta versão devem ser confirmadas pelos commits de cada integrante, sem atribuir trabalho individual sem evidência.

## Documentação e entrega

A pasta `docs/` reúne escopo, orçamento, diário de bordo, melhorias do MVP, evidências, acessibilidade e registro de uso de IA. O registro de IA apresenta paráfrases identificadas de pedidos reais e seus resultados observados; ele não contém prompts ou resultados inventados.

O Blackboard pede, entre outros itens, URL do site, URL do repositório, apresentação, capturas PNG da página inicial em desktop e celular, ZIP do projeto e documentação atualizada. Consulte `docs/README.md` para o checklist e os pendentes. O ZIP de registros e capturas não substitui o ZIP completo do projeto.

---

*README atualizado a partir do README inicial do repositório, no commit [`ede2a24`](https://github.com/GLope-ui/U-UNICID-CC-FRONTEND-22-N7-2-2026-NT-HORTUS/commit/ede2a249647a07d746125bfd75350531ae749b10), para refletir a versão local de dez páginas e o backend Supabase. Revisado em 6 de novembro de 2026.*

