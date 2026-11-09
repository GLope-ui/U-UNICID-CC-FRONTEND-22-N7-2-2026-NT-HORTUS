# Evidências e testes do Hortus

## Recursos observados na prévia local

- Busca por nome, bairro, cidade, estado, país, região, categoria, descrição e cultivos.
- Filtros combináveis por país, região, cultivo, categoria, faixa de participantes e modo de visita; ordenação por atualização, nome e participantes.
- Paginação: em um conjunto observado de 11 registros, a primeira página mostrou 10 e a segunda, 1.
- Cadastro conectado ao Supabase com código da horta, senha e seis palavras de recuperação; edição, recuperação e exclusão protegida do próprio registro.
- Formulário de contato valida os campos e informa que não envia mensagem.
- Navegação móvel por botão, `lang="pt-BR"`, rótulos, link para pular ao conteúdo e estados de foco.
- Registros de demonstração identificados como fictícios.

## Verificações locais registradas (06/11/2026)

| Verificação | Resultado observado | Limite |
|---|---|---|
| axe-core 4.10.3 em dez páginas, regras WCAG 2.0/2.1 A/AA | Zero violações automatizadas reportadas | Não certifica conformidade; elementos em imagem/gradiente tiveram verificações incompletas |
| Contraste de pares sólidos principais | Pares calculados do tema acima dos mínimos AA; relatório detalhado em `auditoria-wcag21-aa.md` | Não cobre todos os estados, conteúdo dinâmico, imagens e gradientes |
| Teclado e Narrador | Usuário informou que Tab, Shift+Tab, Enter, checkboxes e Narrador funcionaram no trecho percorrido | Não é um percurso completo em todas as páginas |
| Busca e paginação | 11 resultados: 10 na página 1 e 1 na página 2 | Dataset observado na prévia local |
| Filtros fixos na rolagem | Painel acompanha a rolagem em desktop e para no fim da lista | Ativo a partir de 681 px; não aplicável ao layout de uma coluna |
| Formulários e controles | Cadastro, recuperação, setas do carrossel e alinhamento foram verificados em fluxos locais | Não representa teste exaustivo de todos os dispositivos |
| Exclusão de horta | Função protegida disponível; exige senha e confirmação | Nenhum registro real foi excluído durante a verificação |

## Capturas locais disponíveis

Em 06/11/2026, foram capturadas a homepage da versão visual atual em viewport desktop (1440 × 900) e mobile (390 × 844), em `entrega/capturas/hortus-home-desktop.png` e `entrega/capturas/hortus-home-mobile.png`. São imagens da prévia local `localhost:4174`, não da versão publicada. Depois da ativação do GitHub Pages, capturar novamente a homepage na URL HTTPS.

Para a comparação do MVP na apresentação, o pacote complementar também reúne capturas autênticas do único commit disponível no checkout `security-check` (`ede2a249...`, homepage em `localhost:4173`) e as capturas da versão local atual em `localhost:4174`. São dois estados de trabalho distintos; a versão atual de dez páginas com Supabase ainda não foi integrada à branch remota.

## Pendências de verificação da entrega

| Item | Estado | Evidência necessária |
|---|---|---|
| W3C Validator nas dez páginas finais | Pendente | URL e resultado de cada página |
| Conferência da publicação HTTPS | Pendente; frontend ainda sem URL pública | Testar as dez páginas, links, CSS, imagens e recursos do Supabase |
| Responsividade em todas as páginas | Parcial; páginas selecionadas foram medidas em larguras de celular | Reflow e zoom nas dez páginas, registrar resultados |
| Teclado e leitor de tela | Parcial; trecho percorrido pelo usuário | Percurso das dez páginas, foco, diálogos, erros e mensagens |
| Capturas atuais da prévia | Feito | Home desktop e celular em `entrega/capturas/`; ainda falta captura após a publicação |
| `localStorage` de rascunho/preferência | Requisito do roteiro; conferir aderência da versão final | Registrar o fluxo observado, sem alegar que o banco Supabase o substitui |

Não declarar conformidade total WCAG 2.1 AA nem aprovação W3C antes de completar as verificações pendentes.
