
    // Accordion toggle
    function toggleHobby(id) {
      const el = document.getElementById(id);
      const isOpen = el.classList.contains('open');
      // Close all first
      document.querySelectorAll('.hobby').forEach(h => h.classList.remove('open'));
      // Open clicked one if it wasn't already open
      if (!isOpen) el.classList.add('open');
    }

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lbImg    = document.getElementById('lb-img');
    const lbClose  = document.getElementById('lb-close');
    const lbPrev   = document.getElementById('lb-prev');
    const lbNext   = document.getElementById('lb-next');

    let currentImages = [];
    let currentIndex  = 0;

    function openLightbox(imgs, index) {
      currentImages = imgs;
      currentIndex  = index;
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
      if (e.key === 'ArrowLeft')  showPrev();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'Escape')     closeLightbox();
    });
  

  // Scroll reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => {
    // If already in viewport on load (e.g. anchor link jump), show immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      revealObserver.observe(el);
    }
  });


  // Contact form — Formspree
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      try {
        const response = await fetch('https://formspree.io/f/mbdqzdbb', {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          contactForm.reset();
          btn.style.display = 'none';
          document.getElementById('form-success').style.display = 'block';
        } else {
          btn.textContent = 'Send Message';
          btn.disabled = false;
          alert('Something went wrong. Please email me directly at luttonjackson@gmail.com');
        }
      } catch {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        alert('Something went wrong. Please email me directly at luttonjackson@gmail.com');
      }
    });
  }


  // Hamburger menu
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
