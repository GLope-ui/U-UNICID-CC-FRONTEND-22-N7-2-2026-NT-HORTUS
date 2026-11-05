# Conectar o Hortus ao Firebase

O código contém uma base para Firebase Authentication e Cloud Firestore. A configuração deste projeto fica em `js/firebase-config.mjs` e continua vazia. A página Contato valida os campos no navegador, mas ainda não envia mensagens.

## Preparação

1. Crie um projeto no [console do Firebase](https://console.firebase.google.com/) e registre um app Web.
2. Copie `apiKey`, `authDomain`, `projectId` e `appId` para `firebase-config.mjs`.
3. Em Authentication, habilite os métodos **E-mail/senha** e **Google**.
4. Crie o banco Cloud Firestore e publique as regras do arquivo `firestore.rules`.
5. Inclua `localhost` e o domínio de publicação na lista de domínios autorizados do Authentication.
6. Para revisar envios, crie manualmente no Firestore o documento `admins/UID_DA_CONTA` para a conta responsável. O documento deve ser criado pelo console; a aplicação não permite que visitantes concedam esse acesso.

## Como os dados aparecem

- Hortas novas ficam como `pending`; somente após revisão aparecem na busca pública.
- Anúncios de plantio são ligados a uma horta publicada que a pessoa administra. Eles também ficam como `pending` e só aparecem na busca depois da revisão.
- Admins revisam hortas e anúncios no painel. A regra de `plantingAnnouncements` limita a criação ao responsável pela horta e a publicação às contas administradoras.
- As 50 hortas e 100 anúncios demonstrativos ficam no arquivo local `js/demo-gardens.mjs`; não são gravados no Firestore.
- Cada conta pode acompanhar ou cancelar seus próprios envios pendentes.
- A coleção de mensagens e as regras permanecem preparadas para uma etapa futura; o formulário atual não grava nem envia mensagens.
- O link público de contato de uma horta é opcional. Endereço residencial não é solicitado.
- A confirmação de e-mail é necessária para enviar hortas e mensagens.
- A busca pública permite filtrar por alimento, cidade, atividade e etapa do plantio, ordenar resultados e carregar mais itens. As hortas demonstrativas são identificadas e não prometem disponibilidade real.

Para abrir localmente, use `npm run build` e depois `npm run serve`. Para publicar no Firebase Hosting, associe a pasta ao projeto no Firebase CLI e publique Hosting e regras do Firestore. A configuração Web do Firebase identifica o app; as regras em `firestore.rules` controlam quem pode ler e gravar dados.

## Publicar

Depois de instalar o Firebase CLI, use `firebase login`, `firebase use --add` e `firebase deploy --only hosting,firestore:rules`. Confira a prévia e o domínio autorizado antes de divulgar o endereço.

## Fontes oficiais

- [Configuração do Firebase para Web](https://firebase.google.com/docs/web/setup)
- [Acesso com e-mail e senha](https://firebase.google.com/docs/auth/web/password-auth)
- [Regras de segurança do Cloud Firestore](https://firebase.google.com/docs/firestore/security/get-started)
