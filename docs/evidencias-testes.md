# Evidências de revisão

Consulta atualizada em 27/10/2026.

## Ajustes alinhados ao escopo

- As dez páginas exigidas permanecem no menu: Início, Sobre, Projetos, Impacto, Acessibilidade, Galeria, Mídia, Notícias, Contato e Orçamento.
- Busca e cadastro continuam como páginas complementares, sem substituir as dez páginas principais.
- Sobre agora apresenta história, missão, visão e valores; Projetos reúne quatro frentes e uma agenda de referência; Impacto inclui uma tabela com números explicitamente demonstrativos.
- A Galeria contém nove imagens com texto alternativo, legenda e indicação de origem.
- Mídia inclui vídeo com controles e legendas, áudio com controles e mapa incorporado com atribuição ao OpenStreetMap.
- Contato inclui equipe e formulário HTML5 com nome, e-mail, telefone com padrão, data, número e campos obrigatórios. O formulário valida os dados no navegador e avisa que não envia a mensagem.
- Orçamento compara três opções de hospedagem e três domínios, com preços consultados e links para as fontes oficiais.
- A busca combina texto, cidade, atividade, alimento, etapa e informação demonstrativa de acesso; permite ordenação e carregamento progressivo.
- Os 50 cadastros fictícios ocupam 50 localidades em 39 cidades; os 100 anúncios estão marcados como demonstração e têm previsões a partir de novembro de 2026.
- A navegação interna repetida da página inicial foi removida, e os links de projetos agora apontam para o diretório e para a agenda correspondentes.
- A configuração do Firebase permanece vazia. O SDK só é carregado quando houver configuração; nesta versão não há conexão, envio de formulário nem gravação de dados.

## Validações executadas

- `npm run build`: concluído com Tailwind CSS 4.3.3.
- `node --check`: passou para `server.js`, `js/main.js`, `js/site.mjs`, `js/firebase-client.mjs` e `js/demo-gardens.mjs`.
- Nu Html Checker: 15 páginas HTML conferidas; zero erros ou avisos em cada página.
- Auditoria local: 15 arquivos HTML, um `h1` por página, IDs sem repetição, imagens com `alt`, links locais e fragmentos correspondentes; todos os SVGs passaram na leitura XML.
- Dados demonstrativos: 50 hortas, 39 cidades, 50 localidades e 100 anúncios; nenhuma previsão de colheita anterior a novembro de 2026.
- Servidor local: `npm run serve` respondeu com HTTP 200 para as 15 páginas e para CSS, JavaScript, SVG, vídeo e áudio.
- Firebase: configuração vazia confirmada; inicialização de autenticação retorna sem usuário e sem solicitar o SDK remoto.

## Verificações manuais pendentes

- A inspeção visual por navegador não foi concluída: o Chrome disponível não conseguiu se conectar ao endereço local. O servidor e os arquivos responderam corretamente no teste local, mas ainda falta revisar capturas em desktop e celular.
- Navegação com leitor de tela e teste presencial de teclado ainda precisam ser conferidos manualmente.
- Valores de hospedagem e domínio podem mudar; confirmar as fontes oficiais antes de qualquer contratação.
