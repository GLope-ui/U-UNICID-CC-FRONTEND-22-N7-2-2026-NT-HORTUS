# Hortus

**Cultive junto. Colha comunidade.**

Hortus é um diretório digital de hortas comunitárias. A plataforma conecta pessoas que desejam encontrar hortas locais a iniciativas que querem apresentar seus espaços, cultivos e formas de participação.

**Site:** [Hortus no GitHub Pages](https://glope-ui.github.io/U-UNICID-CC-FRONTEND-22-N7-2-2026-NT-HORTUS/)

**Repositório:** [GLope-ui/U-UNICID-CC-FRONTEND-22-N7-2-2026-NT-HORTUS](https://github.com/GLope-ui/U-UNICID-CC-FRONTEND-22-N7-2-2026-NT-HORTUS)

## Páginas

| Página | Arquivo | Descrição |
|---|---|---|
| Início | `index.html` | Apresentação do Hortus e acesso à busca de hortas. |
| Buscar hortas | `buscar.html` | Pesquisa e exploração do diretório. |
| Cadastrar horta | `cadastrar.html` | Formulário para incluir uma horta no diretório. |
| Minha horta | `gerenciar.html` | Acesso para editar, recuperar ou excluir o cadastro de uma horta. |
| Sobre | `sobre.html` | História, propósito e contexto do projeto. |
| Contato | `contato.html` | Informações de contato e formulário demonstrativo. |
| Acessibilidade | `acessibilidade.html` | Recursos de acessibilidade do site. |
| Privacidade | `privacidade.html` | Informações sobre os dados apresentados e as credenciais de acesso. |
| Como funciona | `como-funciona.html` | Orientações sobre busca, cadastro e participação. |
| Para hortas | `para-hortas.html` | Informações para responsáveis por hortas. |

## Funcionalidades

- Busca por nome, localização e cultivo.
- Filtros combináveis por país, região, estado ou província, cidade, categoria, cultivos, participantes e forma de visita.
- Ordenação dos resultados e paginação de dez hortas por página.
- Cadastro de hortas com informações de localização, cultivos, participação, visita e fotografia.
- Área de gestão com código da horta e senha, edição do cadastro, recuperação por seis palavras e exclusão com confirmação.
- Dados demonstrativos identificados no diretório.

## Dados e segurança

O Supabase armazena os cadastros das hortas. O projeto inclui a configuração do cliente em `assets/js/supabase-config.js` e as migrações do banco em `supabase/migrations/`. As credenciais de acesso são processadas por funções do banco; o frontend usa somente a chave publicável do Supabase.

O cadastro apresenta ao responsável um código e seis palavras de recuperação. As palavras permitem redefinir a senha e são exibidas no momento da criação do cadastro.

## Tecnologias e identidade visual

O frontend é construído com HTML, CSS e JavaScript. O site usa layout responsivo, tema escuro em tons de verde e lima, marca Hortus e tipografia Impact nos títulos.

## Estrutura

```text
hortus/
├── index.html
├── buscar.html
├── cadastrar.html
├── gerenciar.html
├── sobre.html
├── contato.html
├── acessibilidade.html
├── privacidade.html
├── como-funciona.html
├── para-hortas.html
├── assets/
│   ├── css/site.css
│   ├── data/bip39-english.txt
│   ├── img/
│   └── js/
├── supabase/migrations/
├── docs/
└── entrega/capturas/
```

## Executar localmente no Windows

1. Abra o PowerShell na pasta do projeto.
2. Inicie um servidor HTTP local:

   ```powershell
   py -m http.server 8000
   ```

3. Acesse `http://localhost:8000` no navegador.

O frontend deve ser servido por HTTP. Os recursos de cadastro e gestão usam a conexão configurada com o Supabase.

## Documentação do projeto

Os materiais de apoio estão em `docs/`, incluindo escopo, orçamento, diário de bordo, evolução do MVP, acessibilidade, evidências de testes e registro de uso de IA. As capturas de tela estão em `entrega/capturas/`.
