import { portfolioData } from './data/portfolioData.js';
import { renderContent } from './modules/renderer.js';
import { initAnimations } from './modules/animations.js';

// Global Scroll Utility (exposed to window for HTML onclicks)
window.scrollToSection = function (id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
};

function initNavigation() {
    const btn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('mobile-menu-close'); // New close button
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    if (!btn || !menu) return;

    const openMenu = () => {
        btn.classList.add('active');
        menu.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
        menu.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');

        const resumeBtn = menu.querySelector('.show-on-open');
        if (resumeBtn) {
            setTimeout(() => {
                resumeBtn.classList.remove('opacity-0', 'translate-y-4');
            }, 100);
        }
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        btn.classList.remove('active');
        menu.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
        menu.classList.add('opacity-0', 'pointer-events-none', 'scale-95');

        const resumeBtn = menu.querySelector('.show-on-open');
        if (resumeBtn) {
            resumeBtn.classList.add('opacity-0', 'translate-y-4');
        }
        document.body.style.overflow = '';
    };

    // Toggle
    btn.addEventListener('click', () => {
        if (menu.classList.contains('opacity-100')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Explicit Close Button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    // Links
    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Initializing Portfolio...");

    // 1. Render Content
    renderContent(portfolioData);

    // 2. Start Animations
    // (Must run after render so elements exist)
    // 2. Start Animations
    // (Must run after render so elements exist)
    initAnimations();

    // 3. Init Navigation
    initNavigation();

    console.log("Portfolio Initialized.");
});
