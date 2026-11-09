# Diário de bordo

## 06/11/2026 — estrutura e primeira versão

- O escopo foi direcionado ao diretório de hortas comunitárias: busca, cadastro, área da horta e conteúdo institucional.
- A equipe forneceu o logotipo original e definiu Impact e a paleta escura verde/lima. A fotografia demo é identificada como ilustrativa.
- Foram criadas dez páginas, navegação responsiva, filtros, ordenação, cadastro e conteúdo de demonstração.
- A busca ao vivo do Refero não estava disponível; a página Mercury e o material de design enviados foram usados como referências.

## 06/11/2026 — cadastro remoto e revisão

- Cadastro, leitura pública, alteração, recuperação por seis palavras e exclusão protegida foram conectados ao Supabase; migrações estão em `supabase/migrations/`.
- Foram corrigidos a normalização de espaços e maiúsculas no código, a explicação de recuperação, os controles do carrossel, checkboxes e setas.
- Busca recebeu paginação de dez resultados e o painel de filtros acompanha a rolagem apenas no desktop.
- O conteúdo Sobre foi ampliado e o rodapé reduzido às páginas ativas. A acessibilidade recebeu varredura axe-core e revisão manual parcial.
- O usuário relatou ter testado Tab, Shift+Tab, Enter, checkboxes e Narrador. A verificação completa das dez páginas ainda não está registrada.
- A publicação HTTPS, validação W3C, revisão mobile integral e confirmação de commits/PR continuam pendentes.
- O README foi atualizado com base no README do commit inicial `ede2a24`, substituindo as páginas, recursos, armazenamento, hospedagem planejada e limites pelos dados da versão local atual.
- As capturas da homepage desktop e mobile foram renovadas para o tema atual; as imagens continuam sendo da prévia local, não da publicação.

## Observação

As entradas acima resumem o histórico local conhecido; não atribuem tarefas ou commits a integrantes sem confirmação. A equipe deve acrescentar datas, decisões e prompts específicos à medida que revisar e apresentar o trabalho.
