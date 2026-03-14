/* =============================================
   NOIFET NOTARY - Main JavaScript
   ============================================= */

// ── Sticky header shadow on scroll ──────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile hamburger menu ────────────────────────
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close nav when a link is clicked
nav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ── Active nav link based on scroll position ────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let currentId = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) currentId = sec.id;
  });
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle(
      'active',
      href === 'index.html' ? currentId === '' || currentId === 'home' : href === `#${currentId}`
    );
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });

// ── Intersection Observer for fade-in animations ─
const fadeEls = document.querySelectorAll(
  '.service-card, .help-card, .badge, .why-us-text, .why-us-image, .section-header'
);
fadeEls.forEach((el, i) => {
  el.classList.add('fade-in');
  const delay = Math.min(i % 4, 4);
  if (delay) el.classList.add(`fade-in-delay-${delay}`);
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Appointment form submission ──────────────────
const form        = document.getElementById('appointmentForm');
const successMsg  = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('.btn-submit');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    // Simulate async submit (replace with real fetch/API call)
    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.innerHTML = 'Submit <i class="fas fa-paper-plane"></i>';
      successMsg.style.display = 'flex';
      setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
    }, 1200);
  });
}

// ── Smooth-scroll for anchor links ──────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
