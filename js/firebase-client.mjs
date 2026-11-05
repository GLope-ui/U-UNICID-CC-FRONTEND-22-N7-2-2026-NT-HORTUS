import { firebaseConfig, isFirebaseConfigured } from './firebase-config.mjs';

const [appSdk, authSdk, firestoreSdk] = isFirebaseConfigured
  ? await Promise.all([
      import('https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js'),
    ])
  : [{}, {}, {}];

const { initializeApp } = appSdk;
const {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  reload,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} = authSdk;
const {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} = firestoreSdk;

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export { isFirebaseConfigured };

export function watchAuth(callback) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

function requireFirebase() {
  if (!auth || !db) throw new Error('firebase-not-configured');
}

export async function createAccount({ name, email, password }) {
  requireFirebase();
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName: name });
  let verificationSent = false;
  try {
    await sendEmailVerification(credential.user);
    verificationSent = true;
  } catch (error) {
    console.warn('Email verification could not be sent.', error.code);
  }
  return { user: credential.user, verificationSent };
}

export async function signIn(email, password) {
  requireFirebase();
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle() {
  requireFirebase();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  return signInWithPopup(auth, provider);
}

export async function sendPasswordReset(email) {
  requireFirebase();
  return sendPasswordResetEmail(auth, email);
}

export async function resendVerification(user) {
  requireFirebase();
  return sendEmailVerification(user);
}

export async function refreshUser(user) {
  requireFirebase();
  await reload(user);
  await getIdToken(user, true);
  return user;
}

export async function logOut() {
  if (auth) await signOut(auth);
}

function toGarden(snapshot) {
  return { id: snapshot.id, ...snapshot.data() };
}

export async function findGardens() {
  requireFirebase();
  const result = await getDocs(query(
    collection(db, 'gardens'),
    where('status', '==', 'published'),
    limit(200),
  ));
  return result.docs.map(toGarden).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}

export async function findPlantingAnnouncements() {
  requireFirebase();
  const result = await getDocs(query(
    collection(db, 'plantingAnnouncements'),
    where('status', '==', 'published'),
    limit(200),
  ));
  return result.docs.map(toGarden).sort((a, b) => (a.expectedHarvest || '9999-99').localeCompare(b.expectedHarvest || '9999-99'));
}

export async function findMyPlantings(user) {
  requireFirebase();
  const result = await getDocs(query(
    collection(db, 'plantingAnnouncements'),
    where('ownerId', '==', user.uid),
    limit(100),
  ));
  return result.docs.map(toGarden).sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
}

export async function findPendingPlantings() {
  requireFirebase();
  const result = await getDocs(query(
    collection(db, 'plantingAnnouncements'),
    where('status', '==', 'pending'),
    limit(100),
  ));
  return result.docs.map(toGarden);
}

export async function submitPlanting(user, planting) {
  requireFirebase();
  if (!user?.emailVerified) throw new Error('email-not-verified');
  const gardenSnapshot = await getDoc(doc(db, 'gardens', planting.gardenId));
  if (!gardenSnapshot.exists() || gardenSnapshot.data().ownerId !== user.uid || gardenSnapshot.data().status !== 'published') {
    throw new Error('garden-not-owned-or-published');
  }
  return addDoc(collection(db, 'plantingAnnouncements'), {
    gardenId: planting.gardenId,
    crop: planting.crop.trim(),
    stage: planting.stage,
    expectedHarvest: planting.expectedHarvest || '',
    notes: planting.notes.trim(),
    ownerId: user.uid,
    status: 'pending',
    createdAt: serverTimestamp(),
  });
}

export async function cancelPlanting(user, announcementId) {
  requireFirebase();
  await deleteDoc(doc(db, 'plantingAnnouncements', announcementId));
}

export async function reviewPlanting(user, announcementId, status) {
  requireFirebase();
  if (!['published', 'rejected'].includes(status)) throw new Error('invalid-review-status');
  await updateDoc(doc(db, 'plantingAnnouncements', announcementId), {
    status,
    reviewedAt: serverTimestamp(),
    reviewedBy: user.uid,
  });
}

export async function submitGarden(user, garden) {
  requireFirebase();
  if (!user?.emailVerified) throw new Error('email-not-verified');
  return addDoc(collection(db, 'gardens'), {
    name: garden.name.trim(),
    city: garden.city.trim(),
    state: garden.state,
    neighborhood: garden.neighborhood.trim(),
    description: garden.description.trim(),
    activities: garden.activities,
    accessibility: garden.accessibility.trim(),
    contactUrl: garden.contactUrl.trim(),
    ownerId: user.uid,
    status: 'pending',
    createdAt: serverTimestamp(),
  });
}

export async function findMyGardens(user) {
  requireFirebase();
  const result = await getDocs(query(
    collection(db, 'gardens'),
    where('ownerId', '==', user.uid),
    limit(50),
  ));
  return result.docs.map(toGarden).sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
}

export async function cancelGarden(user, gardenId) {
  requireFirebase();
  await deleteDoc(doc(db, 'gardens', gardenId));
}

export async function checkAdmin(user) {
  requireFirebase();
  const result = await getDoc(doc(db, 'admins', user.uid));
  return result.exists();
}

export async function findPendingGardens() {
  requireFirebase();
  const result = await getDocs(query(
    collection(db, 'gardens'),
    where('status', '==', 'pending'),
    limit(50),
  ));
  return result.docs.map(toGarden);
}

export async function reviewGarden(user, gardenId, status) {
  requireFirebase();
  if (!['published', 'rejected'].includes(status)) throw new Error('invalid-review-status');
  await updateDoc(doc(db, 'gardens', gardenId), {
    status,
    reviewedAt: serverTimestamp(),
    reviewedBy: user.uid,
  });
}

export async function sendMessage(user, { subject, message }) {
  requireFirebase();
  if (!user?.emailVerified) throw new Error('email-not-verified');
  return addDoc(collection(db, 'contactMessages'), {
    userId: user.uid,
    senderName: user.displayName || 'Participante',
    senderEmail: user.email,
    subject: subject.trim(),
    message: message.trim(),
    status: 'new',
    createdAt: serverTimestamp(),
  });
}

export async function findNewMessages() {
  requireFirebase();
  const result = await getDocs(query(
    collection(db, 'contactMessages'),
    where('status', '==', 'new'),
    limit(50),
  ));
  return result.docs.map(toGarden);
}

export async function closeMessage(user, messageId) {
  requireFirebase();
  await updateDoc(doc(db, 'contactMessages', messageId), {
    status: 'closed',
    handledAt: serverTimestamp(),
    handledBy: user.uid,
  });
}
