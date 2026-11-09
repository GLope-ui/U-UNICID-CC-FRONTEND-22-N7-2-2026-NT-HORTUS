# Registro de uso de inteligência artificial

## Ferramentas

Codex (OpenAI) apoiou planejamento, implementação local, revisão de interface e criação de documentação. A equipe deve conferir o código e explicar as decisões durante a apresentação.

## Natureza dos registros

Os pedidos abaixo são **paráfrases de solicitações reais feitas durante o desenvolvimento**, não transcrições literais. Não foram inventados prompts ou resultados. Como houve muitas iterações, este documento registra exemplos representativos e o que foi conferido na versão local; cada integrante deve acrescentar decisões próprias que não estejam no histórico compartilhado.

## Pedidos usados, em síntese

- Criar o Hortus como diretório de hortas comunitárias, com homepage, busca, filtros, cadastro e área de gerenciamento, além de páginas institucionais para completar o escopo de dez páginas.
- Aplicar a referência visual e os arquivos de marca enviados pelo usuário; trocar a paleta para tema escuro verde/lima e manter a tipografia Impact nos títulos.
- Refinar a busca e o cadastro, incluir localização e cultivos selecionáveis, recuperação por seis palavras, paginação e controles responsivos; revisar acessibilidade e alinhamento.
- Manter separados dados demonstrativos e cadastros persistentes; registrar limitações e requisitos de publicação sem inventar fatos sobre hortas ou tarefas dos integrantes.

## Sugestões aceitas e revisões

- Foram aceitos filtros combináveis, ordenação, paginação, cadastro com código e recuperação por seis palavras, conteúdo institucional e marcação de registros demonstrativos.
- O usuário pediu que credenciais e palavras de recuperação não fossem armazenadas em texto puro. O cadastro remoto foi implementado com funções no Supabase e hashes no esquema privado; migrações estão versionadas na pasta `supabase/migrations/`.
- A logo reimaginada foi rejeitada e substituída pelo arquivo fornecido pelo usuário. A paleta clara anterior foi trocada pelo tema escuro verde/lima.
- Os resultados de axe-core, contraste e revisão manual são limitados; não descrever o site como certificado WCAG 2.1 AA.

## Resultados conferidos na versão local

- A pasta da versão atual contém dez páginas HTML. A busca tem filtros combináveis, ordenação e paginação de dez resultados; os cadastros de horta usam o projeto Supabase e há migrações versionadas.
- As capturas atuais mostram a homepage local em desktop e celular. Elas não demonstram que o site está publicado.
- Axe-core reportou zero violações automatizadas em dez páginas; os testes manuais e de reflow são parciais. Validação W3C e publicação ainda estão pendentes, conforme `docs/evidencias-testes.md`.
- A pessoa usuária rejeitou uma logo reimaginada e uma paleta anterior; a captura atual exibe a marca da pera enviada e o tema escuro verde/lima.

## Responsabilidade da equipe

Os dados de exemplo são fictícios. Não usar dados pessoais sem autorização. Cada integrante deve revisar os arquivos, validar os fatos, compreender o código que apresentar e acrescentar prompts e decisões específicos que tenham usado. A publicação, W3C, testes finais e histórico Git precisam ser concluídos e conferidos pelo grupo.
