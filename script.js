const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
const isHidden = mobileMenu.classList.toggle('hidden');
menuToggle.setAttribute('aria-expanded', !isHidden);
mobileMenu.setAttribute('aria-hidden', isHidden);
});

mobileMenu.querySelectorAll('a').forEach(link => {
link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', false);
    mobileMenu.setAttribute('aria-hidden', true);
});
});

document.addEventListener('keydown', (e) => {
if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;

const map = {
    'a': '#about',
    'e': '#education',
    's': '#skills',
    'p': '#projects',
    'c': '#contact'
};
const targetId = map[e.key.toLowerCase()];
if (targetId) {
    e.preventDefault();
    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });

    // Corrected selector here:
    const keyButton = document.querySelector(`a.key.clickable[href="${targetId}"]`);
    if (keyButton) {
    keyButton.classList.add('active-key');
    setTimeout(() => keyButton.classList.remove('active-key'), 300);
    }
}
});

function animateBars() {
  const bars = document.querySelectorAll("[data-width]");
  bars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      !bar.classList.contains("animated")
    ) {
      bar.style.transition = "width 1.5s ease-out";
      bar.style.width = bar.getAttribute("data-width");
      bar.classList.add("animated");
    }
  });
}

function checkSkillsSection() {
  const skillsSection = document.getElementById("skills");
  if (!skillsSection) return;

  const rect = skillsSection.getBoundingClientRect();

  if (rect.top < window.innerHeight && rect.bottom > 0) {
    animateBars();
  }
}

// Attach listener ONCE and leave it active in case someone scrolls back up
window.addEventListener("scroll", checkSkillsSection);
window.addEventListener("load", () => {
  setTimeout(checkSkillsSection, 500); // allow layout paint
});


function fadeInOnScroll() {
const elements = document.querySelectorAll('.fade-in');
elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
    el.classList.remove('opacity-0', 'translate-y-10');
    }
});
}

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);


const roles = ["Data Scientist","Frontend Developer", "UI/UX Designer", "Machine Learning Enthusiast"];
let part = "";
let i = 0;
let j = 0;
let currentRole = "";
let isDeleting = false;
let speed = 100;

function typeEffect() {
  currentRole = roles[i];
  
  if (!isDeleting) {
    part = currentRole.substring(0, j++);
  } else {
    part = currentRole.substring(0, j--);
  }

  document.querySelector(".typewriter").textContent = part;

  if (!isDeleting && part === currentRole) {
    isDeleting = true;
    speed = 6000; 
  } else if (isDeleting && part === "") {
    isDeleting = false;
    i = (i + 1) % roles.length;
    speed = 500;
  } else {
    speed = isDeleting ? 80 : 100;
  }

  setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", typeEffect);
