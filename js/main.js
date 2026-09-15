// jacksonlutton.com — shared behavior (nav toggle, current-page highlight,
// hobby accordion, lightbox). Loaded on every page.

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  highlightCurrentNavLink();
  initScrollReveal();
  initContactForm();
  initHobbyAccordion();
  initLightbox();
});

// SCROLL REVEAL
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add('visible');
    else observer.observe(el);
  });
}

// CONTACT FORM (Formspree)
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const btn = form.querySelector('button[type="submit"]');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    btn.textContent = 'Sending...';
    btn.disabled = true;
    status.className = 'form-status';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      btn.style.display = 'none';
      status.textContent = "✓ Message sent — I'll get back to you soon!";
      status.classList.add('success');
    } catch {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      status.textContent = 'Something went wrong — please email me directly at luttonjackson@gmail.com.';
      status.classList.add('error');
    }
  });
}

// NAV TOGGLE (mobile hamburger)
function initNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// CURRENT PAGE NAV HIGHLIGHT
function highlightCurrentNavLink() {
  const links = document.querySelectorAll('.nav-links a[href]');
  const current = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
  links.forEach(a => {
    const href = a.getAttribute('href').replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
    if (href === current) a.setAttribute('aria-current', 'page');
  });
}

// HOBBY ACCORDION (about page)
function initHobbyAccordion() {
  const headers = document.querySelectorAll('.hobby-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const hobby = header.closest('.hobby');
      const isOpen = hobby.classList.contains('open');
      document.querySelectorAll('.hobby').forEach(h => h.classList.remove('open'));
      headers.forEach(h => h.setAttribute('aria-expanded', 'false'));
      if (!isOpen) {
        hobby.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// LIGHTBOX
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImg = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  const lbPrev = document.getElementById('lb-prev');
  const lbNext = document.getElementById('lb-next');

  let currentImages = [];
  let currentIndex = 0;

  function openLightbox(imgs, index) {
    currentImages = imgs;
    currentIndex = index;
    lbImg.src = currentImages[currentIndex].src;
    lightbox.classList.add('open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lbImg.src = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    lbImg.src = currentImages[currentIndex].src;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    lbImg.src = currentImages[currentIndex].src;
  }

  document.querySelectorAll('.photo-strip').forEach(strip => {
    const imgs = Array.from(strip.querySelectorAll('img'));
    imgs.forEach((img, i) => {
      img.addEventListener('click', () => openLightbox(imgs, i));
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', e => { e.stopPropagation(); showPrev(); });
  lbNext.addEventListener('click', e => { e.stopPropagation(); showNext(); });
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'Escape') closeLightbox();
  });
}
