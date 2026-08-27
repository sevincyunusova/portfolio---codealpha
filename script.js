// ==========================================================
// Theme Toggle
// ==========================================================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-toggle__icon');

const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
} else {
    document.documentElement.setAttribute('data-theme', 'light');
}

function updateThemeIcon() {
    const currentTheme =
        document.documentElement.getAttribute('data-theme');

    themeIcon.textContent = currentTheme === 'dark' ? '☀' : '☾';
}

updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme =
        document.documentElement.getAttribute('data-theme');

    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);

    localStorage.setItem('portfolio-theme', newTheme);

    updateThemeIcon();
});


// ==========================================================
// Scroll Progress Bar
// ==========================================================

const progressFill = document.getElementById('progressFill');

function updateProgress() {
    const scrollTop = window.scrollY;

    const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress =
        docHeight > 0
            ? (scrollTop / docHeight) * 100
            : 0;

    progressFill.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateProgress);

updateProgress();


// ==========================================================
// Navigation
// ==========================================================

const nav = document.getElementById('nav');
const navLinks = document.getElementById('navLinks');
const navToggle = document.getElementById('navToggle');


// ==========================================================
// Smooth Scroll
// ==========================================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {

        const targetId = link.getAttribute('href');

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const offset = nav.offsetHeight + 12;

        const top =
            target.getBoundingClientRect().top +
            window.scrollY -
            offset;

        window.scrollTo({
            top,
            behavior: 'smooth'
        });

        // Close mobile menu
        navLinks.classList.remove('is-open');
    });
});


// ==========================================================
// Mobile Navigation
// ==========================================================

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('is-open');
});


// ==========================================================
// Scroll Reveal Animation
// ==========================================================

const revealElements =
    document.querySelectorAll('.reveal');

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('is-visible');

                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


// ==========================================================
// Contact Form
// ==========================================================

const form =
    document.getElementById('contactForm');

const status =
    document.getElementById('formStatus');

if (form) {

    form.addEventListener('submit', (event) => {

        event.preventDefault();

        const data = new FormData(form);

        const name = data.get('name')?.trim();

        if (!name) return;

        status.textContent =
            `Thanks, ${name}! Your message has been noted.`;

        form.reset();

        setTimeout(() => {
            status.textContent = '';
        }, 5000);

    });

}