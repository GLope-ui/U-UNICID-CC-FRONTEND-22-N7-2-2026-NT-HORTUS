const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open', !expanded);
  });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealSelectors = [
  '.hero-copy', '.hero-art', '.home-steps article', '.principles article', '.about-note',
  '.project-paths li', '.program-cards article', '.activity-agenda li', '.impact-columns article', '.access-list details', '.gallery figure',
  '.media-feature', '.audio-feature', '.guide-list article', '.contact-aside', '.contact-panel', '.team-list li', '.budget-comparison', '.budget-recommendation',
];
const revealNodes = [...new Set(revealSelectors.flatMap((selector) => [...document.querySelectorAll(selector)]))];

if (revealNodes.length && !reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('has-motion');
  revealNodes.forEach((node) => node.setAttribute('data-reveal', ''));
  document.querySelectorAll('.home-steps, .principles, .project-paths ol, .program-cards, .activity-agenda ol, .impact-columns, .access-list, .gallery, .guide-list, .team-list').forEach((group) => {
    const children = [...group.querySelectorAll(':scope > article, :scope > li, :scope > details, :scope > figure')];
    children.forEach((child, index) => child.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 45}ms`));
  });
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  revealNodes.forEach((node) => revealObserver.observe(node));
}

const gallery = document.querySelector('.gallery');
if (gallery) {
  const items = [...gallery.querySelectorAll('[data-gallery-item]')];
  const filters = [...document.querySelectorAll('[data-gallery-filter]')];
  filters.forEach((filter) => filter.addEventListener('click', () => {
    filters.forEach((item) => item.setAttribute('aria-pressed', String(item === filter)));
    items.forEach((item) => { item.hidden = filter.dataset.galleryFilter !== 'all' && item.dataset.galleryItem !== filter.dataset.galleryFilter; });
  }));

  const dialog = document.querySelector('#gallery-dialog');
  const dialogImage = dialog?.querySelector('[data-gallery-dialog-image]');
  const dialogCaption = dialog?.querySelector('[data-gallery-dialog-caption]');
  gallery.addEventListener('click', (event) => {
    const trigger = event.target.closest('.gallery-open');
    if (!trigger || !dialog || !dialogImage) return;
    const image = trigger.querySelector('img');
    dialogImage.src = image.src;
    dialogImage.alt = image.alt;
    dialogCaption.textContent = trigger.closest('figure')?.querySelector('figcaption')?.textContent || image.alt;
    dialog.showModal();
  });
  dialog?.querySelector('[data-gallery-close]')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
}

const budgetForm = document.querySelector('#budget-form');
const budgetOutput = document.querySelector('#budget-total');
if (budgetForm && budgetOutput) {
  const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const updateBudget = () => {
    const total = [...budgetForm.querySelectorAll('input[type="number"]')]
      .reduce((sum, input) => sum + Math.max(0, Number(input.value) || 0), 0);
    budgetOutput.value = currency.format(total);
    budgetOutput.textContent = currency.format(total);
  };
  budgetForm.addEventListener('input', updateBudget);
  updateBudget();
}
