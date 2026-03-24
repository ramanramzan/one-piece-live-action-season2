/* =========================================
   ون بيس لايف اكشن — الموسم الثاني
   script.js — Interactivity & Animations
   ========================================= */

'use strict';

// ===========================
// SEARCH DATA
// ===========================
const searchData = [
  { title: 'الحلقة الأولى — بداية جديدة', url: 'episodes.html', type: 'حلقة' },
  { title: 'الحلقة الثانية', url: 'episodes.html', type: 'حلقة' },
  { title: 'Netflix تؤكد رسمياً إنتاج الموسم الثاني', url: 'news.html', type: 'خبر' },
  { title: 'إعلان قائمة الممثلين الجدد', url: 'news.html', type: 'خبر' },
  { title: 'بدء تصوير الموسم الثاني في جنوب أفريقيا', url: 'news.html', type: 'خبر' },
  { title: 'أودا يكشف عن إشراكه الشخصي في كتابة السيناريو', url: 'news.html', type: 'خبر' },
  { title: 'عودة الطاقم الأصلي كاملاً للموسم الثاني', url: 'news.html', type: 'خبر' },
  { title: 'كشف عن المؤثرات البصرية الجديدة', url: 'news.html', type: 'خبر' },
];

// ===========================
// DOM READY
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeader();
  initSearch();
  initHamburger();
  initScrollAnimations();
  initParticles();
  initFilterBtns();
});

// ===========================
// THEME TOGGLE (Dark / Light)
// ===========================
function initTheme() {
  const body = document.getElementById('body');
  const toggle = document.getElementById('themeToggle');

  // Load saved preference
  const saved = localStorage.getItem('op-theme') || 'dark-mode';
  body.className = saved;

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-mode');
    body.className = isDark ? 'light-mode' : 'dark-mode';
    localStorage.setItem('op-theme', body.className);
  });
}

// ===========================
// HEADER SCROLL EFFECT
// ===========================
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

// ===========================
// HAMBURGER MENU
// ===========================
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  });

  // Close on nav link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
    }
  });
}

// ===========================
// SEARCH
// ===========================
function initSearch() {
  const input = document.getElementById('searchInput');
  const btn = document.getElementById('searchBtn');
  const results = document.getElementById('searchResults');
  if (!input || !results) return;

  function performSearch() {
    const query = input.value.trim().toLowerCase();
    if (query.length < 2) {
      results.style.display = 'none';
      results.innerHTML = '';
      return;
    }

    const matches = searchData.filter(item =>
      item.title.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      results.innerHTML = '<div class="search-result-item" style="opacity:0.5">لا توجد نتائج</div>';
    } else {
      results.innerHTML = matches.map(item =>
        `<div class="search-result-item">
          <a href="${item.url}">
            <span style="color:var(--red);font-size:11px;font-weight:700;margin-left:6px">${item.type}</span>
            ${item.title}
          </a>
        </div>`
      ).join('');
    }

    results.style.display = 'block';
  }

  input.addEventListener('input', performSearch);
  if (btn) btn.addEventListener('click', performSearch);

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.style.display = 'none';
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      results.style.display = 'none';
      input.blur();
    }
  });
}

// ===========================
// SCROLL ANIMATIONS (Intersection Observer)
// ===========================
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ===========================
// PARTICLES (Hero)
// ===========================
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 8 : 16;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = Math.random() * 10 + 8;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -10px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(particle);
  }
}

// ===========================
// FILTER BUTTONS
// ===========================
function initFilterBtns() {
  const filterBars = document.querySelectorAll('.filter-bar');

  filterBars.forEach(bar => {
    const btns = bar.querySelectorAll('.filter-btn');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        const grid = bar.nextElementSibling;
        if (!grid) return;

        const items = grid.querySelectorAll('[data-status], [data-category]');
        items.forEach(item => {
          const status = item.getAttribute('data-status') || item.getAttribute('data-category');
          if (filter === 'all' || status === filter) {
            item.style.display = '';
            // Re-trigger animation
            item.classList.remove('visible');
            setTimeout(() => item.classList.add('visible'), 50);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });
}

// ===========================
// ACTIVE NAV LINK
// ===========================
(function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
})();

// ===========================
// SMOOTH SCROLL FOR ANCHORS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
