(() => {
  const doc = document.documentElement;
  doc.classList.add('js');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* En-tête : fond au défilement + barre mobile */
  const header = document.querySelector('[data-header]');
  const mobileBar = document.querySelector('[data-mobile-bar]');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    if (mobileBar) mobileBar.classList.toggle('is-visible', y > window.innerHeight * 0.6);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Menu mobile */
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    menu.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    header.classList.toggle('is-scrolled', open || window.scrollY > 24);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); } });

  /* Vidéo du hero : image fixe si mouvement réduit ou échec */
  const video = document.querySelector('[data-video]');
  if (video) {
    const fallback = () => doc.classList.add('no-video');
    const saveData = navigator.connection && navigator.connection.saveData;
    if (reduceMotion || saveData) { video.removeAttribute('autoplay'); video.preload = 'none'; video.pause(); fallback(); }
    video.addEventListener('error', fallback, true);
    const p = video.play && video.play();
    if (p && p.catch) p.catch(fallback);
  }

  /* Apparition au défilement */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* Onglets de la carte des soins (clavier : flèches, Début, Fin) */
  document.querySelectorAll('[data-tabs]').forEach((root) => {
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));

    const select = (i, focus, init) => {
      tabs.forEach((t, j) => {
        const on = i === j;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
        panels[j].classList.toggle('is-entering', on && !init);
      });
      if (init) return;
      if (focus) tabs[i].focus();
      /* Sur mobile, la liste d'onglets défile : on centre l'onglet choisi sans bouger la page */
      const list = tabs[i].parentElement;
      if (list.scrollWidth > list.clientWidth) {
        list.scrollTo({ left: tabs[i].offsetLeft - (list.clientWidth - tabs[i].offsetWidth) / 2, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    };

    select(0, false, true);

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', (e) => {
        const map = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
        if (!(e.key in map)) return;
        e.preventDefault();
        select((map[e.key] + tabs.length) % tabs.length, true);
      });
    });
  });

  /* Étagère produits */
  const shelf = document.querySelector('[data-shelf]');
  if (shelf) {
    const prev = document.querySelector('[data-shelf-prev]');
    const next = document.querySelector('[data-shelf-next]');
    const step = () => shelf.querySelector('.product').getBoundingClientRect().width + 24;
    const update = () => {
      prev.disabled = shelf.scrollLeft < 8;
      next.disabled = shelf.scrollLeft + shelf.clientWidth > shelf.scrollWidth - 8;
    };
    prev.addEventListener('click', () => shelf.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => shelf.scrollBy({ left: step(), behavior: 'smooth' }));
    shelf.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* Lien actif dans la navigation */
  const links = [...document.querySelectorAll('.nav a[href^="#"]')];
  if ('IntersectionObserver' in window && links.length) {
    const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = byId.get(entry.target.id);
        if (link && entry.isIntersecting) {
          links.forEach((a) => a.removeAttribute('aria-current'));
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    byId.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
