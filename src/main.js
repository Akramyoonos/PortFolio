import './style.css'

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navbarSticky = document.getElementById('navbar-sticky');
const navbar = document.getElementById('navbar');

if (menuToggle && navbarSticky) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navbarSticky.classList.toggle('hidden');
  });
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('#navbar-sticky a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) { // Only on mobile
      navbarSticky.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Navbar Scroll Effect (Glassmorphism intensity change)
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('shadow-lg', 'bg-slate-950/90');
    navbar.classList.remove('bg-slate-950/80');
  } else {
    navbar.classList.remove('shadow-lg', 'bg-slate-950/90');
    navbar.classList.add('bg-slate-950/80');
  }
});

// Scroll Reveal Animation (Simple Intersection Observer)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  section.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out');
  observer.observe(section);
});

// Add the animation class dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in-up {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Contact Form Handler
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const originalText = btn.textContent;

    btn.textContent = 'Message Sent!';
    btn.classList.add('bg-green-600', 'hover:bg-green-700');
    btn.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');

    setTimeout(() => {
      contactForm.reset();
      btn.textContent = originalText;
      btn.classList.remove('bg-green-600', 'hover:bg-green-700');
      btn.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
    }, 3000);
  });
}
