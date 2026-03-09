 /* ---- Navbar scroll ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ---- Mobile menu ---- */
  function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const burger = document.getElementById('hamburger');
    menu.classList.toggle('open');
    burger.classList.toggle('open');
  }

  /* ---- Hero bg loaded ---- */
  window.addEventListener('load', () => {
    const bg = document.getElementById('heroBg');
    bg.classList.add('loaded');
  });

  /* ---- Intersection Observer (reveal) with staggered animation ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  let revealDelay = 0;
  const observer = new IntersectionObserver((entries) => {
    const visibleEntries = entries.filter(e => e.isIntersecting);
    visibleEntries.forEach((entry, index) => {
      const delay = index * 120; // stagger each element by 120ms
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));

  /* ---- Counter animation ---- */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        let current = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current);
          if (current >= target) clearInterval(timer);
        }, 35);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  /* ---- Lightbox ---- */
  function openLightbox(item) {
    const src = item.querySelector('img').src;
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---- Contact form ---- */
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    this.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  });

  /* ---- Smooth nav active state ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--yellow)' : '';
    });
  });

  /* ---- Parallax subtle effect on hero ---- */
  window.addEventListener('scroll', () => {
    const hero = document.getElementById('heroBg');
    if (hero) {
      hero.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    }
  });