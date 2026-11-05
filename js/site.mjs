import {
  cancelGarden,
  cancelPlanting,
  checkAdmin,
  closeMessage,
  createAccount,
  findGardens,
  findMyGardens,
  findMyPlantings,
  findNewMessages,
  findPendingGardens,
  findPendingPlantings,
  findPlantingAnnouncements,
  isFirebaseConfigured,
  logOut,
  resendVerification,
  refreshUser,
  reviewGarden,
  reviewPlanting,
  sendPasswordReset,
  signIn,
  signInWithGoogle,
  submitGarden,
  submitPlanting,
  watchAuth,
} from './firebase-client.mjs';
import { demoGardens } from './demo-gardens.mjs';

let currentUser = null;
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const hide = (element, value = true) => { if (element) element.hidden = value; };

function setStatus(element, message, state = '') {
  if (!element) return;
  element.textContent = message;
  if (state) element.dataset.state = state;
  else delete element.dataset.state;
}

function friendlyError(error) {
  const code = error?.code || error?.message || '';
  const messages = {
    'firebase-not-configured': 'O acesso está temporariamente indisponível.',
    'email-not-verified': 'Confirme seu e-mail antes de continuar.',
    'auth/invalid-credential': 'E-mail ou senha não conferem.',
    'auth/user-not-found': 'E-mail ou senha não conferem.',
    'auth/wrong-password': 'E-mail ou senha não conferem.',
    'auth/email-already-in-use': 'Este e-mail já tem uma conta. Tente entrar.',
    'auth/weak-password': 'Escolha uma senha com pelo menos 8 caracteres.',
    'auth/invalid-email': 'Confira o formato do e-mail.',
    'auth/too-many-requests': 'Muitas tentativas seguidas. Aguarde um pouco e tente novamente.',
    'auth/popup-closed-by-user': 'A janela de acesso foi fechada antes da conclusão.',
    'auth/popup-blocked': 'Permita a janela de acesso do Google e tente novamente.',
    'auth/operation-not-allowed': 'Este método de acesso ainda não está ativado.',
    'password-mismatch': 'As senhas digitadas não são iguais.',
    'permission-denied': 'Não foi possível concluir. Confira os dados e tente novamente.',
    'garden-not-owned-or-published': 'O anúncio precisa estar ligado a uma horta publicada que você administra.',
  };
  return messages[code] || 'Não foi possível concluir agora. Confira sua conexão e tente novamente.';
}

function updateAccountLinks(user) {
  $$('.account-links[data-auth-guest]').forEach((el) => hide(el, Boolean(user)));
  $$('.account-links[data-auth-user]').forEach((el) => hide(el, !user));
  const label = user?.displayName || user?.email || 'Minha conta';
  $$('[data-user-label]').forEach((el) => { el.textContent = label; });
}

watchAuth((user) => {
  currentUser = user;
  updateAccountLinks(user);
});

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-signout]');
  if (!button) return;
  button.disabled = true;
  try {
    await logOut();
    window.location.href = 'index.html';
  } catch (error) {
    button.disabled = false;
    window.alert(friendlyError(error));
  }
});

function bindSubmit(form, button, status, action, successText) {
  if (!form || !button) return;
  form.addEventListener('submit', (event) => event.preventDefault());
  button.addEventListener('click', async () => {
    if (!form.reportValidity()) return;
    if (!isFirebaseConfigured) {
      setStatus(status, 'O acesso está temporariamente indisponível.', 'error');
      return;
    }
    button.disabled = true;
    const original = button.textContent;
    button.textContent = 'Aguarde…';
    setStatus(status, 'Estamos processando sua solicitação…');
    try {
      await action(new FormData(form));
      if (successText) setStatus(status, successText, 'success');
    } catch (error) {
      setStatus(status, friendlyError(error), 'error');
    } finally {
      button.disabled = false;
      button.textContent = original;
    }
  });
}

const loginForm = $('#login-form');
bindSubmit(loginForm, $('button[data-form-action]', loginForm || document), $('#login-status'), async (data) => {
  await signIn(data.get('email').trim(), data.get('password'));
  window.location.href = 'painel.html';
});

const signupForm = $('#signup-form');
bindSubmit(signupForm, $('button[data-form-action]', signupForm || document), $('#signup-status'), async (data) => {
  const password = data.get('password');
  if (password !== data.get('confirm')) throw new Error('password-mismatch');
  const result = await createAccount({
    name: data.get('name').trim(),
    email: data.get('email').trim(),
    password,
  });
  window.location.href = result.verificationSent ? 'painel.html?confirmar=email' : 'painel.html';
});

$$('[data-google-auth]').forEach((button) => {
  button.addEventListener('click', async () => {
    if (!isFirebaseConfigured) {
      setStatus($('#login-status') || $('#signup-status'), 'O acesso está temporariamente indisponível.', 'error');
      return;
    }
    button.disabled = true;
    try {
      await signInWithGoogle();
      window.location.href = 'painel.html';
    } catch (error) {
      setStatus($('#login-status') || $('#signup-status'), friendlyError(error), 'error');
    } finally {
      button.disabled = false;
    }
  });
});

const resetButton = $('#password-reset');
if (resetButton) {
  resetButton.addEventListener('click', async () => {
    const email = $('#login-email')?.value.trim();
    const status = $('#login-status');
    if (!email) {
      setStatus(status, 'Digite seu e-mail para receber o link de recuperação.', 'error');
      $('#login-email')?.focus();
      return;
    }
    resetButton.disabled = true;
    try {
      await sendPasswordReset(email);
      setStatus(status, 'Se houver uma conta para esse e-mail, enviaremos um link de recuperação.', 'success');
    } catch (error) {
      setStatus(status, friendlyError(error), 'error');
    } finally {
      resetButton.disabled = false;
    }
  });
}

if (!isFirebaseConfigured) {
  hide($('#auth-not-configured'), false);
  setStatus($('#garden-search-status'), 'A busca está temporariamente indisponível. Tente novamente mais tarde.');
  hide($('#contact-unavailable'), false);
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function gardenCard(garden, options = {}) {
  const article = createElement('article', 'garden-card');
  const top = createElement('div', 'garden-card-top');
  const heading = createElement('h3', '', garden.name);
  top.append(heading);
  if (garden.isDemo) top.append(createElement('span', 'demo-badge', 'Demonstração'));
  const location = [garden.neighborhood, garden.city, garden.state].filter(Boolean).join(' · ');
  article.append(top, createElement('p', 'garden-location', location), createElement('p', '', garden.description));
  if (garden.activities?.length) article.append(createElement('p', 'garden-meta', `Atividades: ${garden.activities.join(', ')}`));
  if (garden.accessibility) article.append(createElement('p', 'garden-meta', `Acesso: ${garden.accessibility}`));
  const plantings = options.plantings || garden.plantings || [];
  if (plantings.length) {
    const list = createElement('div', 'planting-list');
    plantings.forEach((planting) => {
      const item = createElement('div', 'planting-item');
      item.append(createElement('strong', '', planting.crop), createElement('span', 'planting-stage', plantingStageLabel(planting.stage)));
      if (planting.expectedHarvest) item.append(createElement('p', '', `Colheita prevista: ${formatHarvest(planting.expectedHarvest)}`));
      if (planting.notes) item.append(createElement('p', '', planting.notes));
      list.append(item);
    });
    article.append(list);
  }
  if (options.status) article.append(createElement('span', `state-badge state-${garden.status}`, options.status));
  if (garden.contactUrl && garden.status === 'published') {
    try {
      const url = new URL(garden.contactUrl);
      if (url.protocol === 'https:') {
        const link = createElement('a', 'garden-link', 'Contato da horta ↗');
        link.href = url.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        article.append(link);
      }
    } catch {}
  }
  if (options.cancel) {
    const cancel = createElement('button', 'text-button', 'Cancelar envio');
    cancel.type = 'button';
    cancel.dataset.cancelGarden = garden.id;
    article.append(cancel);
  }
  if (options.review) {
    const actions = createElement('div', 'card-actions');
    const approve = createElement('button', 'button small-button', 'Publicar');
    approve.type = 'button'; approve.dataset.reviewGarden = garden.id; approve.dataset.status = 'published';
    const reject = createElement('button', 'button button-secondary small-button', 'Recusar');
    reject.type = 'button'; reject.dataset.reviewGarden = garden.id; reject.dataset.status = 'rejected';
    actions.append(approve, reject); article.append(actions);
  }
  return article;
}

function plantingStageLabel(stage) {
  return ({ plantando: 'Plantando', crescendo: 'Crescendo', colheita: 'Em colheita' })[stage] || 'Em cultivo';
}

function formatHarvest(value) {
  const [year, month] = String(value).split('-').map(Number);
  if (!year || !month) return value;
  return new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, 1)));
}

const normalizeText = (value = '') => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
let searchableGardens = [];
let displayedGardenCount = 12;

function fillFilter(select, values, firstLabel) {
  if (!select) return;
  const selected = select.value;
  select.replaceChildren(new Option(firstLabel, ''));
  [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR')).forEach((value) => select.add(new Option(value, value)));
  select.value = [...select.options].some((option) => option.value === selected) ? selected : '';
}

function populateGardenFilters(gardens) {
  fillFilter($('#garden-city-filter'), gardens.map((garden) => garden.city), 'Todas as cidades');
  const crops = gardens.flatMap((garden) => garden.plantings || []).map((planting) => planting.crop);
  fillFilter($('#garden-crop-filter'), crops, 'Todos os alimentos');
}

function filterAndSortGardens() {
  const term = normalizeText($('#garden-query')?.value || '');
  const city = normalizeText($('#garden-city-filter')?.value || '');
  const activity = normalizeText($('#garden-activity-filter')?.value || '');
  const crop = normalizeText($('#garden-crop-filter')?.value || '');
  const stage = $('#garden-stage-filter')?.value || '';
  const access = $('#garden-access-filter')?.value || '';
  const sort = $('#garden-sort')?.value || 'name';
  const matches = searchableGardens.filter((garden) => {
    const plantings = garden.plantings || [];
    const text = normalizeText([
      garden.name, garden.city, garden.state, garden.neighborhood, garden.description,
      ...(garden.activities || []), garden.accessibility || '', ...plantings.map((planting) => `${planting.crop} ${planting.notes || ''}`),
    ].join(' '));
    return (!term || text.includes(term))
      && (!city || normalizeText(garden.city) === city)
      && (!activity || (garden.activities || []).some((item) => normalizeText(item) === activity))
      && (!crop || plantings.some((item) => normalizeText(item.crop) === crop))
      && (!stage || plantings.some((item) => item.stage === stage))
      && (!access || (access === 'confirm'
        ? normalizeText(garden.accessibility).includes('a confirmar')
        : normalizeText(garden.accessibility).includes('descricao ilustrativa')));
  });
  const compareName = (a, b) => a.name.localeCompare(b.name, 'pt-BR');
  matches.sort((a, b) => {
    if (sort === 'city') return a.city.localeCompare(b.city, 'pt-BR') || compareName(a, b);
    if (sort === 'plantings') return (b.plantings?.length || 0) - (a.plantings?.length || 0) || compareName(a, b);
    if (sort === 'harvest') {
      const nextDate = (garden) => (garden.plantings || []).map((item) => item.expectedHarvest).filter(Boolean).sort()[0] || '9999-99';
      return nextDate(a).localeCompare(nextDate(b)) || compareName(a, b);
    }
    return compareName(a, b);
  });
  return matches;
}

function renderGardenResults() {
  const status = $('#garden-search-status');
  const results = $('#garden-results');
  if (!results) return;
  const matches = filterAndSortGardens();
  results.replaceChildren();
  matches.slice(0, displayedGardenCount).forEach((garden) => results.append(gardenCard(garden)));
  const totalAnnouncements = matches.reduce((sum, garden) => sum + (garden.plantings?.length || 0), 0);
  setStatus(status, matches.length
    ? `${matches.length} ${matches.length === 1 ? 'horta encontrada' : 'hortas encontradas'} · ${totalAnnouncements} ${totalAnnouncements === 1 ? 'anúncio de plantio' : 'anúncios de plantio'}. As demonstrações estão identificadas.`
    : 'Nenhum resultado com esses filtros. Tente outra cidade ou alimento, ou cadastre uma horta.');
  const more = $('#load-more-gardens');
  if (more) more.hidden = matches.length <= displayedGardenCount;
  if (!matches.length) {
    const empty = createElement('p', 'empty-state', 'Ajuste ou limpe os filtros para ampliar a busca. Você também pode cadastrar uma horta.');
    results.append(empty);
  }
}

async function loadGardenSearch() {
  if (!$('#garden-results')) return;
  const status = $('#garden-search-status');
  setStatus(status, 'Carregando hortas e anúncios…');
  const gardens = [...demoGardens];
  let liveError = false;
  if (isFirebaseConfigured) {
    try {
      const [liveGardens, livePlantings] = await Promise.all([findGardens(), findPlantingAnnouncements()]);
      const byId = new Map(liveGardens.map((garden) => [garden.id, { ...garden, plantings: [] }]));
      livePlantings.forEach((planting) => byId.get(planting.gardenId)?.plantings.push(planting));
      gardens.push(...byId.values());
    } catch (error) {
      liveError = true;
      console.error('Garden directory could not load live records:', error.code || error.message);
    }
  }
  searchableGardens = gardens;
  populateGardenFilters(searchableGardens);
  displayedGardenCount = 12;
  renderGardenResults();
  if (liveError) setStatus(status, `${demoGardens.length} hortas de demonstração disponíveis. Não foi possível carregar os cadastros publicados agora.`, 'error');
}

const gardenSearchForm = $('#garden-search-form');
if (gardenSearchForm) {
  gardenSearchForm.addEventListener('submit', (event) => { event.preventDefault(); displayedGardenCount = 12; renderGardenResults(); });
  gardenSearchForm.addEventListener('input', () => { displayedGardenCount = 12; renderGardenResults(); });
  gardenSearchForm.addEventListener('change', () => { displayedGardenCount = 12; renderGardenResults(); });
  gardenSearchForm.addEventListener('reset', () => { window.setTimeout(() => { displayedGardenCount = 12; renderGardenResults(); }, 0); });
  $('#load-more-gardens')?.addEventListener('click', () => { displayedGardenCount += 12; renderGardenResults(); });
  loadGardenSearch();
}

const dashboard = $('#dashboard');
const panelUnavailable = $('#panel-unavailable');
const panelLoginRequired = $('#panel-login-required');
const panelContent = $('#panel-content');
const gardenForm = $('#garden-form');

async function loadMyGardenList(user) {
  const list = $('#my-gardens');
  const status = $('#my-gardens-status');
  if (!list) return;
  list.replaceChildren();
  setStatus(status, 'Carregando suas hortas…');
  try {
    const gardens = await findMyGardens(user);
    gardens.forEach((garden) => list.append(gardenCard(garden, {
      status: garden.status === 'pending' ? 'Aguardando revisão' : garden.status === 'published' ? 'Publicada' : 'Não publicada',
      cancel: garden.status === 'pending',
    })));
    setStatus(status, gardens.length ? '' : 'Você ainda não cadastrou uma horta.');
  } catch (error) {
    setStatus(status, friendlyError(error), 'error');
  }
}

function announcementCard(announcement, gardenName = 'Horta', options = {}) {
  const card = createElement('article', 'announcement-card');
  card.append(createElement('h3', '', announcement.crop));
  card.append(createElement('p', 'garden-location', `${gardenName} · ${plantingStageLabel(announcement.stage)}`));
  if (announcement.expectedHarvest) card.append(createElement('p', '', `Colheita prevista: ${formatHarvest(announcement.expectedHarvest)}`));
  if (announcement.notes) card.append(createElement('p', '', announcement.notes));
  const statusLabel = announcement.status === 'pending' ? 'Aguardando revisão' : announcement.status === 'published' ? 'Publicado' : 'Não publicado';
  card.append(createElement('span', `state-badge state-${announcement.status}`, statusLabel));
  if (options.cancel && announcement.status === 'pending') {
    const action = createElement('button', 'text-button', 'Cancelar anúncio');
    action.type = 'button'; action.dataset.cancelPlanting = announcement.id;
    card.append(action);
  }
  return card;
}

async function loadMyPlantingList(user) {
  const list = $('#my-plantings');
  const status = $('#my-plantings-status');
  if (!list) return;
  list.replaceChildren();
  try {
    const [announcements, gardens] = await Promise.all([findMyPlantings(user), findMyGardens(user)]);
    const gardenNames = new Map(gardens.map((garden) => [garden.id, garden.name]));
    announcements.forEach((announcement) => list.append(announcementCard(announcement, gardenNames.get(announcement.gardenId) || 'Horta', { cancel: true })));
    setStatus(status, announcements.length ? `${announcements.length} ${announcements.length === 1 ? 'anúncio' : 'anúncios'}.` : 'Você ainda não criou anúncios de plantio.');
  } catch (error) {
    setStatus(status, friendlyError(error), 'error');
  }
}

async function populateOwnedGardens(user) {
  const select = $('#planting-garden');
  if (!select) return;
  select.replaceChildren(new Option('Carregando suas hortas…', ''));
  try {
    const gardens = (await findMyGardens(user)).filter((garden) => garden.status === 'published');
    select.replaceChildren(new Option(gardens.length ? 'Selecione uma horta' : 'Você ainda não tem hortas publicadas', ''));
    gardens.forEach((garden) => select.add(new Option(`${garden.name} · ${garden.neighborhood ? `${garden.neighborhood}, ` : ''}${garden.city}`, garden.id)));
    select.disabled = !user.emailVerified || !gardens.length;
    const hint = $('#planting-garden-hint');
    if (hint && !gardens.length) hint.textContent = 'Envie uma horta para revisão. Depois da publicação, você poderá anunciar os plantios.';
  } catch (error) {
    select.replaceChildren(new Option('Não foi possível carregar suas hortas', ''));
    setStatus($('#planting-status'), friendlyError(error), 'error');
  }
}

async function loadAdminPanel(user) {
  const section = $('#admin-section');
  if (!section || !isFirebaseConfigured) return;
  try {
    if (!await checkAdmin(user)) return;
    hide(section, false);
    const pending = await findPendingGardens();
    const gardenList = $('#pending-gardens');
    gardenList.replaceChildren();
    pending.forEach((garden) => gardenList.append(gardenCard(garden, { status: 'Aguardando revisão', review: true })));
    if (!pending.length) gardenList.append(createElement('p', 'empty-state', 'Não há hortas aguardando revisão.'));
    const pendingPlantings = await findPendingPlantings();
    const plantingList = $('#pending-plantings');
    if (plantingList) {
      plantingList.replaceChildren();
      const publishedGardens = await findGardens();
      const gardenNames = new Map(publishedGardens.map((garden) => [garden.id, garden.name]));
      pendingPlantings.forEach((planting) => {
        const card = announcementCard(planting, gardenNames.get(planting.gardenId) || 'Horta');
        const actions = createElement('div', 'card-actions');
        const publish = createElement('button', 'button small-button', 'Publicar');
        publish.type = 'button'; publish.dataset.reviewPlanting = planting.id; publish.dataset.status = 'published';
        const reject = createElement('button', 'button button-secondary small-button', 'Recusar');
        reject.type = 'button'; reject.dataset.reviewPlanting = planting.id; reject.dataset.status = 'rejected';
        actions.append(publish, reject); card.append(actions); plantingList.append(card);
      });
      if (!pendingPlantings.length) plantingList.append(createElement('p', 'empty-state', 'Não há anúncios aguardando revisão.'));
    }
    const messages = await findNewMessages();
    const messageList = $('#admin-messages');
    messageList.replaceChildren();
    if (!messages.length) messageList.append(createElement('p', 'empty-state', 'Não há mensagens novas.'));
    messages.forEach((message) => {
      const card = createElement('article', 'message-card');
      card.append(createElement('h3', '', message.subject), createElement('p', 'garden-meta', `${message.senderName} · ${message.senderEmail}`), createElement('p', '', message.message));
      const close = createElement('button', 'text-button', 'Marcar como concluída');
      close.type = 'button'; close.dataset.closeMessage = message.id;
      card.append(close); messageList.append(card);
    });
  } catch (error) {
    console.error('Admin view failed:', error.code || error.message);
  }
}

if (dashboard) {
  if (!isFirebaseConfigured) {
    hide(panelUnavailable, false);
  } else {
    hide(panelLoginRequired, false);
    watchAuth(async (user) => {
      currentUser = user;
      hide(panelLoginRequired, Boolean(user));
      hide(panelContent, !user);
      if (!user) return;
      hide(panelUnavailable, true);
      const name = user.displayName || user.email || 'Participante';
      $('[data-panel-name]').textContent = name;
      const verifyNote = $('#email-verification-note');
      const resend = $('#resend-verification');
      const refresh = $('#refresh-verification');
      hide(verifyNote, Boolean(user.emailVerified));
      hide(resend, Boolean(user.emailVerified));
      hide(refresh, Boolean(user.emailVerified));
      if (!user.emailVerified) setStatus($('#verification-status'), 'Enviamos um link de confirmação para o seu e-mail.');
      if (gardenForm) $$('input,select,textarea,button', gardenForm).forEach((input) => { input.disabled = !user.emailVerified; });
      const params = new URLSearchParams(window.location.search);
      if (params.get('confirmar') === 'email' && user.emailVerified) setStatus($('#verification-status'), 'E-mail confirmado. Você já pode cadastrar uma horta.', 'success');
      await loadMyGardenList(user);
      await loadMyPlantingList(user);
      await loadAdminPanel(user);
    });
  }
}

const gardenCreator = $('#garden-creator');
if (gardenCreator) {
  if (!isFirebaseConfigured) {
    hide($('#creator-unavailable'), false);
  } else {
    watchAuth(async (user) => {
      currentUser = user;
      hide($('#creator-login-required'), Boolean(user));
      hide($('#creator-content'), !user);
      hide($('#creator-unavailable'), true);
      if (!user) return;
      const label = $('[data-panel-name]');
      if (label) label.textContent = user.displayName || user.email || 'Participante';
      hide($('#email-verification-note'), Boolean(user.emailVerified));
      const gardenFormFields = gardenForm ? $$('input,select,textarea,button', gardenForm) : [];
      gardenFormFields.forEach((input) => { input.disabled = !user.emailVerified; });
      const plantingForm = $('#planting-form');
      if (plantingForm) $$('input,select,textarea,button', plantingForm).forEach((input) => { input.disabled = !user.emailVerified; });
      if (!user.emailVerified) setStatus($('#verification-status'), 'Confirme seu e-mail antes de cadastrar uma horta ou anúncio.');
      await populateOwnedGardens(user);
      await loadMyPlantingList(user);
    });
  }
}

if (gardenForm) {
  const submitButton = $('button[data-form-action]', gardenForm);
  gardenForm.addEventListener('submit', (event) => event.preventDefault());
  submitButton?.addEventListener('click', async () => {
    if (!gardenForm.reportValidity()) return;
    const status = $('#garden-status');
    const button = submitButton;
    if (!currentUser) { setStatus(status, 'Entre na sua conta para enviar uma horta.', 'error'); return; }
    if (!currentUser.emailVerified) { setStatus(status, 'Confirme seu e-mail antes de enviar uma horta.', 'error'); return; }
    const data = new FormData(gardenForm);
    const activities = data.getAll('activities');
    if (!activities.length) { setStatus(status, 'Escolha pelo menos uma atividade.', 'error'); return; }
    button.disabled = true;
    const original = button.textContent; button.textContent = 'Enviando…';
    try {
      await submitGarden(currentUser, {
        name: data.get('name'), city: data.get('city'), state: data.get('state'),
        neighborhood: data.get('neighborhood') || '', description: data.get('description'),
        activities, accessibility: data.get('accessibility'), contactUrl: data.get('contactUrl') || '',
      });
      gardenForm.reset();
      setStatus(status, 'Horta enviada. Ela aparecerá na busca depois da revisão.', 'success');
      await loadMyGardenList(currentUser);
      await loadMyPlantingList(currentUser);
      await loadAdminPanel(currentUser);
    } catch (error) {
      setStatus(status, friendlyError(error), 'error');
    } finally {
      button.disabled = false; button.textContent = original;
    }
  });
}

const plantingForm = $('#planting-form');
if (plantingForm) {
  const submitButton = $('button[data-form-action]', plantingForm);
  plantingForm.addEventListener('submit', (event) => event.preventDefault());
  submitButton?.addEventListener('click', async () => {
    if (!plantingForm.reportValidity()) return;
    const status = $('#planting-status');
    const button = submitButton;
    if (!currentUser) { setStatus(status, 'Entre na sua conta para anunciar um plantio.', 'error'); return; }
    if (!currentUser.emailVerified) { setStatus(status, 'Confirme seu e-mail antes de enviar um anúncio.', 'error'); return; }
    const data = new FormData(plantingForm);
    if (!data.get('gardenId')) { setStatus(status, 'Escolha uma horta publicada que você administra.', 'error'); return; }
    button.disabled = true;
    const original = button.textContent; button.textContent = 'Enviando…';
    try {
      await submitPlanting(currentUser, {
        gardenId: data.get('gardenId'), crop: data.get('crop'), stage: data.get('stage'),
        expectedHarvest: data.get('expectedHarvest'), notes: data.get('notes') || '',
      });
      plantingForm.reset();
      await populateOwnedGardens(currentUser);
      setStatus(status, 'Anúncio enviado para revisão. Ele aparecerá na busca após a publicação.', 'success');
      await loadMyPlantingList(currentUser);
    } catch (error) {
      setStatus(status, friendlyError(error), 'error');
    } finally {
      button.disabled = false; button.textContent = original;
    }
  });
}

$('#refresh-verification')?.addEventListener('click', async () => {
  const status = $('#verification-status');
  try {
    currentUser = await refreshUser(currentUser);
    if (currentUser.emailVerified) {
      hide($('#email-verification-note'), true);
      hide($('#resend-verification'), true);
      hide($('#refresh-verification'), true);
      $$('input,select,textarea,button', gardenForm || document).forEach((input) => { input.disabled = false; });
      $$('#planting-form input, #planting-form select, #planting-form textarea, #planting-form button').forEach((input) => { input.disabled = false; });
      await populateOwnedGardens(currentUser);
      setStatus(status, 'E-mail confirmado. Você já pode cadastrar uma horta.', 'success');
    } else setStatus(status, 'Ainda não encontramos a confirmação. Abra o link enviado e tente novamente.');
  } catch (error) { setStatus(status, friendlyError(error), 'error'); }
});

$('#resend-verification')?.addEventListener('click', async () => {
  const status = $('#verification-status');
  try {
    await resendVerification(currentUser);
    setStatus(status, 'Enviamos um novo link de confirmação.', 'success');
  } catch (error) {
    setStatus(status, friendlyError(error), 'error');
  }
});

document.addEventListener('click', async (event) => {
  const cancelPlantingButton = event.target.closest('[data-cancel-planting]');
  if (cancelPlantingButton && currentUser && window.confirm('Cancelar o envio deste anúncio?')) {
    cancelPlantingButton.disabled = true;
    try { await cancelPlanting(currentUser, cancelPlantingButton.dataset.cancelPlanting); await loadMyPlantingList(currentUser); }
    catch (error) { window.alert(friendlyError(error)); cancelPlantingButton.disabled = false; }
  }
  const reviewPlantingButton = event.target.closest('[data-review-planting]');
  if (reviewPlantingButton && currentUser) {
    reviewPlantingButton.disabled = true;
    try { await reviewPlanting(currentUser, reviewPlantingButton.dataset.reviewPlanting, reviewPlantingButton.dataset.status); await loadMyPlantingList(currentUser); await loadAdminPanel(currentUser); }
    catch (error) { window.alert(friendlyError(error)); reviewPlantingButton.disabled = false; }
  }
  const cancel = event.target.closest('[data-cancel-garden]');
  if (cancel && currentUser && window.confirm('Cancelar o envio desta horta?')) {
    cancel.disabled = true;
    try { await cancelGarden(currentUser, cancel.dataset.cancelGarden); await loadMyGardenList(currentUser); }
    catch (error) { window.alert(friendlyError(error)); cancel.disabled = false; }
  }
  const review = event.target.closest('[data-review-garden]');
  if (review && currentUser) {
    review.disabled = true;
    try {
      await reviewGarden(currentUser, review.dataset.reviewGarden, review.dataset.status);
      await loadMyGardenList(currentUser); await loadMyPlantingList(currentUser); await loadAdminPanel(currentUser);
    } catch (error) { window.alert(friendlyError(error)); review.disabled = false; }
  }
  const closeMessage = event.target.closest('[data-close-message]');
  if (closeMessage && currentUser) {
    closeMessage.disabled = true;
    try { await closeMessage(currentUser, closeMessage.dataset.closeMessage); await loadAdminPanel(currentUser); }
    catch (error) { window.alert(friendlyError(error)); closeMessage.disabled = false; }
  }
});

const contactForm = $('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => event.preventDefault());
  $('#contact-check')?.addEventListener('click', () => {
    if (!contactForm.reportValidity()) return;
    const status = $('#contact-status');
    setStatus(status, 'Validação concluída. O envio online ainda não está disponível; sua mensagem não foi enviada.');
  });
}
