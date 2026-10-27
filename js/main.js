// Pizzeria Le QG · maquette : menu ☰ et onglets de la carte
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

// Menu ☰ (téléphone)
const burger = $('.burger');
const nav = $('#nav');
function setMenu(open) {
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  nav.classList.toggle('open', open);
}
burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('click', (e) => {
  if (nav.classList.contains('open') && !e.target.closest('#nav, .burger')) setMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); burger.focus(); }
});
// Au clavier, sortir du menu le referme (sinon le focus suivant serait caché dessous)
nav.addEventListener('focusout', (e) => {
  if (nav.classList.contains('open') && !nav.contains(e.relatedTarget) && e.relatedTarget !== burger) setMenu(false);
});

// Onglets de la carte (sans JS, toutes les rubriques restent affichées les unes sous les autres)
const tabs = $$('[role="tab"]');
function select(tab, focus) {
  tabs.forEach(t => {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    $('#' + t.getAttribute('aria-controls')).hidden = !on;
  });
  if (focus) tab.focus();
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => select(tab));
  tab.addEventListener('keydown', (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (step) { e.preventDefault(); select(tabs[(i + step + tabs.length) % tabs.length], true); }
    if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); }
    if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1], true); }
  });
});
select(tabs[0]);
