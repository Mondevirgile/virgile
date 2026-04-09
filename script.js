/* ============================================================
   MONDE SERVAIS VIRGILE – script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR SCROLL ── */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    const bt = document.querySelector('.back-top');
    if (bt) bt.classList.toggle('visible', window.scrollY > 300);
  });

  /* ── 2. BURGER / MENU MOBILE ── */
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  /* ── 3. RETOUR EN HAUT ── */
  const bt = document.querySelector('.back-top');
  if (bt) bt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── 4. LIEN ACTIF ── */
  const page = window.location.pathname.split('/').pop() || 'accueil.html';
  document.querySelectorAll('.nav-link[href]').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
  document.querySelectorAll('.mobile-menu a[href]').forEach(a => {
    if (a.getAttribute('href') === page) a.style.color = '#ff5e3a';
  });

  /* ── 5. TYPING EFFECT ── */
  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const phrases = [
      'Installation & Maintenance Informatique',
      'Configuration Réseau & Sécurité',
      'Réparation PC & Laptop',
      'Support Technique Professionnel',
    ];
    let pi = 0, ci = 0, del = false;
    function type() {
      const cur = phrases[pi];
      typingEl.textContent = del ? cur.slice(0, ci--) : cur.slice(0, ci++);
      let ms = del ? 38 : 72;
      if (!del && ci === cur.length + 1) { ms = 1800; del = true; }
      else if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; ms = 400; }
      setTimeout(type, ms);
    }
    type();
  }

  /* ── 6. AOS SCROLL REVEAL ── */
  const aosEls = document.querySelectorAll('[data-aos]');
  const aosObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const delay = parseInt(e.target.dataset.aosDelay || 0);
      setTimeout(() => e.target.classList.add('aos-in'), delay);
    });
  }, { threshold: 0.1 });
  aosEls.forEach(el => aosObs.observe(el));

  /* ── 7. COMPTEURS ANIMÉS ── */
  const counters = document.querySelectorAll('.stat-num[data-target]');
  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting || e.target.dataset.done) return;
      e.target.dataset.done = '1';
      const target = parseInt(e.target.dataset.target);
      const suffix = e.target.dataset.suffix || '';
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        e.target.textContent = cur + suffix;
        if (cur >= target) clearInterval(t);
      }, 28);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cntObs.observe(c));

  /* ── 8. BARRES COMPÉTENCES ── */
  const bars = document.querySelectorAll('.skill-bar-fill[data-w]');
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.style.width = e.target.dataset.w;
    });
  }, { threshold: 0.3 });
  bars.forEach(b => barObs.observe(b));

  /* ── 9. FORMULAIRE ── */
  <script>
const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const button = document.getElementById('submit-btn');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Animation bouton
  button.innerHTML = "⏳ Envoi en cours...";
  button.disabled = true;
  button.style.opacity = "0.7";

  const data = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      successMessage.style.display = "block";
      form.reset();

      // Changer texte bouton
      button.innerHTML = "✅ Envoyé !";

      setTimeout(() => {
        window.location.reload();
      }, 3000);

    } else {
      button.innerHTML = "❌ Erreur";
      alert("Erreur lors de l'envoi");
      button.disabled = false;
      button.style.opacity = "1";
      button.innerHTML = "ENVOYER LE MESSAGE →";
    }
  }).catch(() => {
      button.innerHTML = "❌ Erreur réseau";
      button.disabled = false;
      button.style.opacity = "1";
      button.innerHTML = "ENVOYER LE MESSAGE →";
  });
});
</script>

  /* ── 10. FAQ TOGGLE ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q')?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

});
