/* ============================================================
   script.js — نقل عفش الكويت
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile menu toggle ---------- */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  function openMenu() {
    mobileMenu.removeAttribute('hidden');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileMenu.setAttribute('hidden', '');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    /* Close menu when a mobile link is tapped */
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    /* Close menu on outside click */
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id], header[id]');
  const navLinks  = document.querySelectorAll('.nav-desktop a');

  if (navLinks.length && sections.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              const href = link.getAttribute('href');
              const matches = href === '#' + entry.target.id
                || (href === '#top' && entry.target.id === 'top');
              link.classList.toggle('active', matches);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Google Ads Conversion Event Tracking ---------- */
  document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion();
      } else if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-18496565583',
          'event_category': 'Phone Call',
          'event_label': link.getAttribute('href')
        });
      }
    });
  });

  document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion();
      } else if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-18496565583',
          'event_category': 'WhatsApp',
          'event_label': link.getAttribute('href')
        });
      }
    });
  });

})();

