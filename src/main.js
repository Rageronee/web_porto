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

document.addEventListener('DOMContentLoaded', () => {
    console.log("Initializing Portfolio...");

    // 1. Render Content
    renderContent(portfolioData);

    // 2. Start Animations
    // (Must run after render so elements exist)
    initAnimations();

    console.log("Portfolio Initialized.");
});
