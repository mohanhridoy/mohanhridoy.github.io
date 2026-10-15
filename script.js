(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const progress = document.querySelector('.scroll-progress span');
  const portrait = document.querySelector('.hero-portrait');
  const mobileMeeting = document.querySelector('.mobile-meeting');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  root.classList.add('js');
  themeButton.hidden = false;
  menuButton.hidden = false;

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const isDark = theme === 'dark';
    themeButton.setAttribute('aria-pressed', String(isDark));
    themeButton.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    document.querySelector('meta[name="theme-color"]').content = isDark ? '#11120f' : '#2537ff';
  }

  try {
    applyTheme(localStorage.getItem('ridoy-theme') === 'dark' ? 'dark' : 'light');
  } catch {
    applyTheme('light');
  }

  themeButton.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try { localStorage.setItem('ridoy-theme', theme); } catch { /* Storage is optional. */ }
  });

  function setMenu(open) {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  }

  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });

  const revealItems = [...document.querySelectorAll('.reveal')];
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const countItems = [...document.querySelectorAll('[data-count]')];
  function animateCount(element) {
    const end = Number(element.dataset.count);
    const duration = 1100;
    const startTime = performance.now();
    function frame(now) {
      const progressValue = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progressValue, 3);
      element.textContent = Math.round(end * eased).toLocaleString('en-US');
      if (progressValue < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    countItems.forEach((item) => { item.textContent = Number(item.dataset.count).toLocaleString('en-US'); });
  } else {
    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    countItems.forEach((item) => countObserver.observe(item));
  }

  let scrollQueued = false;
  function updateScrollEffects() {
    const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    progress.style.transform = `scaleX(${Math.min(window.scrollY / scrollable, 1)})`;
    mobileMeeting.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.65);
    if (!reducedMotion.matches && window.innerWidth > 760) {
      const heroShift = Math.min(window.scrollY * 0.055, 24);
      portrait.style.transform = `translateX(-50%) translateY(${heroShift}px)`;
    }
    scrollQueued = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(updateScrollEffects);
    }
  }, { passive: true });
  updateScrollEffects();

  if (!reducedMotion.matches && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.magnetic').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.12;
        button.style.translate = `${x}px ${y}px`;
      });
      button.addEventListener('pointerleave', () => { button.style.translate = ''; });
    });
  }

  document.querySelectorAll('details').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      document.querySelectorAll('details[open]').forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  document.querySelectorAll('[data-track]').forEach((link) => {
    link.addEventListener('click', () => {
      const detail = { event: 'portfolio_cta', action: link.dataset.track, label: link.textContent.trim() };
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(detail);
      window.dispatchEvent(new CustomEvent('portfolio:cta', { detail }));
    });
  });

  document.querySelector('#year').textContent = new Date().getFullYear();
})();
