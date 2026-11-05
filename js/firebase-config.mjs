// Copie os valores do app Web criado no console do Firebase.
export const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  appId: '',
};

const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
export const isFirebaseConfigured = requiredFields.every((field) =>
  typeof firebaseConfig[field] === 'string' && firebaseConfig[field].trim().length > 0
);
