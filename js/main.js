// jacksonlutton.com — shared behavior (nav toggle, current-page highlight,
// hobby accordion, lightbox). Loaded on every page.

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  highlightCurrentNavLink();
  initHobbyAccordion();
  initLightbox();
});

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
