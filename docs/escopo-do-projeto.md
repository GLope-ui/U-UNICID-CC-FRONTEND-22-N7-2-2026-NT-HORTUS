# Escopo do Hortus

## Problema e público

O Hortus organiza informações públicas de hortas comunitárias em um diretório consultável. O público inclui pessoas que procuram uma iniciativa para visitar ou apoiar, responsáveis por hortas, educadores e grupos locais. O projeto se relaciona tematicamente com os ODS 2 (Fome Zero e Agricultura Sustentável), 11 (Cidades e Comunidades Sustentáveis) e 12 (Consumo e Produção Responsáveis), sem afirmar impacto quantitativo já medido.

## Objetivo

Permitir que visitantes encontrem iniciativas por nome, localização, categoria, cultivos, número de participantes e condições de visita. Responsáveis podem cadastrar, atualizar, recuperar acesso e excluir o próprio perfil de horta.

## Páginas

1. Início — apresenta o serviço e direciona à busca.
2. Buscar Hortas — busca, filtros combináveis, ordenação e paginação.
3. Cadastrar Horta — formulário com localização, cultivos e foto.
4. Minha Horta — acesso com código/senha, edição, recuperação e exclusão protegida.
5. Sobre — história e propósito.
6. Contato — formulário demonstrativo, sem envio de mensagem.
7. Acessibilidade — recursos, verificações e limites conhecidos.
8. Privacidade — dados tratados e limites do protótipo.
9. Como Funciona — passos para visitantes e responsáveis.
10. Para Hortas — orientação para cadastrar uma iniciativa.

## Critérios de aceitação do produto

- Dez páginas interligadas com navegação coerente em desktop e celular.
- Busca por texto, filtros combináveis, ordenação e paginação de dez resultados.
- Cadastro público de horta, recebimento de código e seis palavras de recuperação; edição, recuperação e exclusão pelo proprietário.
- Registros de demonstração identificados como fictícios; não afirmar que foram verificados ou que representam uma horta real.
- Senhas e palavras de recuperação são tratadas por funções no Supabase, e o frontend usa apenas a chave publicável.
- Contato informa que não transmite mensagens.

## Limites e itens de entrega ainda pendentes

A URL do GitHub Pages está ativa, mas ainda serve a versão anterior. Falta confirmar a publicação desta release após o merge para `main`. Também faltam completar RAs da equipe, validar as dez páginas no W3C, testar a versão publicada e conferir os commits individuais exigidos. Consulte `README.md` desta pasta para a lista de requisitos acadêmicos e situação.

