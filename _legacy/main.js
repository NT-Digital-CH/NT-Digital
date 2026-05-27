/* ============================================================
   NT Digital – main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. Scroll Progress Bar ──────────────────────────────── */
  const progressBar = document.getElementById('scroll-progress');

  function updateProgress() {
    if (!progressBar) return;
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }

  /* ── 2. Navbar scroll effect ─────────────────────────────── */
  const nav = document.querySelector('.nav');

  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  /* ── 3. Hamburger + Mobile Menu ──────────────────────────── */
  const hamburger   = document.querySelector('.hamburger');
  const navMobile   = document.querySelector('.nav-mobile');
  const navLogo     = document.querySelector('.nav-logo');
  const mobileLinks = document.querySelectorAll('.nav-mobile a');

  function openMenu() {
    hamburger.classList.add('open');
    navMobile.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (navLogo) navLogo.style.opacity = '0';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    navMobile.classList.remove('open');
    document.body.style.overflow = '';
    if (navLogo) navLogo.style.opacity = '1';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && navMobile) {
    hamburger.addEventListener('click', function () {
      if (hamburger.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMobile.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* ── 4. Active Nav Link via data-page ────────────────────── */
  const currentPage = document.body.getAttribute('data-page');

  function setActiveLink() {
    if (!currentPage) return;

    const allLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');
    allLinks.forEach(function (link) {
      const page = link.getAttribute('data-nav');
      if (page === currentPage) {
        link.classList.add('active');
      }
    });
  }

  /* ── 5. Intersection Observer for .reveal ────────────────── */
  function initReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── 6. Contact Form ─────────────────────────────────────── */
  function initContactForm() {
    const form    = document.getElementById('contact-form');
    const success = document.getElementById('form-success');

    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'Wird gesendet…';
      btn.disabled    = true;

      setTimeout(function () {
        form.reset();
        btn.textContent = 'Nachricht senden →';
        btn.disabled    = false;
        if (success) {
          success.classList.add('show');
          setTimeout(function () {
            success.classList.remove('show');
          }, 5000);
        }
      }, 1200);
    });
  }

  /* ── Scroll handler (debounced) ──────────────────────────── */
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateProgress();
        updateNav();
        ticking = false;
      });
      ticking = true;
    }
  }

  /* ── Init ────────────────────────────────────────────────── */
  window.addEventListener('scroll', onScroll, { passive: true });
  updateProgress();
  updateNav();
  setActiveLink();
  initReveal();
  initContactForm();
})();
