// ===================== NAVBAR SCROLL =====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===================== HAMBURGER =====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===================== TYPED TEXT =====================
const phrases = [
  'stunning websites.',
  'AI-powered apps.',
  'full-stack solutions.',
  'smart automations.',
  'digital experiences.'
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
  }
  let speed = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length + 1) {
    speed = 1800; isDeleting = true;
  } else if (isDeleting && charIndex === -1) {
    isDeleting = false; charIndex = 0;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }
  setTimeout(type, speed);
}
type();

// ===================== SCROLL REVEAL =====================
const reveals = document.querySelectorAll(
  'section, .skill-card, .project-card, .timeline-item, .cert-card, .about-grid, .contact-grid'
);
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars when skills section is visible
      if (entry.target.id === 'skills' || entry.target.closest('#skills')) {
        animateBars();
      }
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// ===================== SKILL BARS =====================
let barsAnimated = false;
function animateBars() {
  if (barsAnimated) return;
  barsAnimated = true;
  document.querySelectorAll('.bar-fill').forEach(bar => {
    const target = bar.dataset.width;
    setTimeout(() => { bar.style.width = target + '%'; }, 200);
  });
}

// Also observe skills section separately for bars
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const barObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) animateBars();
  }, { threshold: 0.3 });
  barObserver.observe(skillsSection);
}

// ===================== CONTACT FORM =====================
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const success = document.getElementById('form-success');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Message 🚀';
    btn.disabled = false;
    success.style.display = 'block';
    e.target.reset();
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }, 1500);
}

// ===================== ACTIVE NAV LINK =====================
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = 'var(--accent)';
    }
  });
});

// ===================== SMOOTH PROJECT CARD HOVER =====================
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = (y - cy) / cy * 4;
    const ry = (cx - x) / cx * 4;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

console.log('%c👋 Hey! Built by Arunkumar S 🚀', 'color: #6366f1; font-size: 16px; font-weight: bold;');
