# Documentação e checklist de entrega

Este checklist resume a Atividade 02 — AV A1, roteiro da 2ª entrega de Desenvolvimento Web (PDF, pp. 1–8). As instruções acadêmicas são requisitos da atividade; os estados abaixo registram o que foi verificado no projeto local.

## Requisitos da atividade

- Site final com dez páginas interligadas, JavaScript obrigatório, responsividade, acessibilidade, validação W3C sem erros e publicação em URL HTTPS acessível sem login (pp. 1–3, 7–8).
- JavaScript deve validar formulários, mostrar erros, destacar campos, usar `localStorage` para rascunho ou preferência e incluir interação DOM por evento (p. 2).
- HTML deve usar `lang="pt-BR"`, texto alternativo, contraste AA, navegação por teclado e ARIA quando necessário; CSS deve ter identidade consistente, layout responsivo e foco visível (p. 2).
- Hospedagem pode usar GitHub Pages, Vercel, Netlify ou Railway; justificar a escolha no orçamento (p. 4). Domínio próprio não é listado como requisito.
- Repositório deve mostrar commits identificáveis de todos os integrantes, mensagens descritivas e ao menos uma branch com pull request (p. 4; checklist na p. 8).
- A apresentação deve ter 14 slides na ordem indicada e texto de pelo menos 20 pt (pp. 4–6, 8).
- Envio no Blackboard: equipe `.txt`, URL do site, URL do repositório, slides `.pdf` ou `.pptx`, capturas desktop e celular `.png`, projeto `.zip` e documentação atualizada em `/docs` (p. 2). O prazo é o informado na tarefa do Blackboard (pp. 1 e 8).

## Estado do Hortus

- O diretório local tem dez páginas: início, busca, cadastro, minha horta, sobre, contato, acessibilidade, privacidade, como funciona e para hortas.
- Busca inclui filtros combináveis, ordenação e paginação de dez resultados. Cadastro, edição e recuperação usam o projeto Supabase; veja os detalhes funcionais em `evidencias-testes.md`.
- O endereço público do GitHub Pages está ativo em `entrega/url-site.txt`, mas ainda serve a versão anterior da branch `main`. O site de dez páginas desta release precisa ser integrado e aguardar o próximo deploy do Pages; depois, conferir as dez páginas e o Supabase na URL pública. Domínio próprio não é necessário.
- `entrega/integrantes.txt` ainda tem RAs para preencher. O repositório possui `release/v2.0`; os commits individuais reais dos integrantes e a revisão do pull request ainda precisam ser conferidos antes da entrega.
- A versão descrita aqui contém dez páginas e usa Supabase para os cadastros. A branch `release/v2.0` é a origem desta versão; confirme que o PR para `main` foi mesclado e que o Pages concluiu o deploy antes de tratar a URL pública como a versão final.
- Os arquivos nesta pasta registram o escopo, diário de bordo, orçamento, melhorias do MVP, evidências e uso de IA. Revise conteúdo e data após cada etapa final.
- As capturas desktop e mobile da homepage foram renovadas para o tema atual e estão em `entrega/capturas/`; são da prévia local, não da publicação. A apresentação e o ZIP do projeto devem representar a mesma versão. Depois que o Pages concluir o deploy desta versão, renovar as capturas para registrar a URL HTTPS.

## Itens ainda necessários antes do Blackboard

1. Completar os RAs da equipe.
2. Confirmar o deploy da versão revisada na URL HTTPS registrada.
3. Validar as dez páginas no W3C e registrar resultados; fazer revisão acessível e conferência dos links na publicação.
4. Confirmar que a versão entregue contempla os requisitos da atividade sobre rascunho/preferência com `localStorage`.
5. Cada integrante realizar seus próprios commits; concluir e conferir ao menos um pull request.
6. Atualizar capturas desktop/celular, apresentação e ZIP após conferir a publicação atualizada.
7. Enviar os formatos exigidos à tarefa do Blackboard dentro do prazo registrado nela.

## Acessibilidade

Axe-core 4.10.3 reportou zero violações automatizadas nas dez páginas. Isso não certifica WCAG 2.1 AA: há verificações incompletas sobre imagens/gradientes e ainda faltam alguns testes manuais e de publicação. Consulte `auditoria-wcag21-aa.md` e `evidencias-testes.md`.

