'use strict';

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

window.addEventListener('load', () => {
  document.querySelectorAll('.hero-content .reveal-up').forEach(el => el.classList.add('visible'));
});

// Sticky header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
navToggle.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  mobileNav.setAttribute('aria-hidden', !isOpen);
});
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  });
});

// FormSubmit.co AJAX
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
if (contactForm) {
  if (window.location.search.includes('sent=true')) {
    contactForm.style.display = 'none';
    formSuccess.classList.add('visible');
    formSuccess.removeAttribute('aria-hidden');
  }
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        contactForm.style.display = 'none';
        formSuccess.classList.add('visible');
        formSuccess.removeAttribute('aria-hidden');
      } else {
        btn.textContent = 'Request Appointment';
        btn.disabled = false;
        alert('Something went wrong. Please call (714) 744-8995 or email info@VetOPC.com.');
      }
    } catch {
      btn.textContent = 'Request Appointment';
      btn.disabled = false;
      alert('Something went wrong. Please call (714) 744-8995 or email info@VetOPC.com.');
    }
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' }); }
  });
});
