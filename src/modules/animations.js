// --- ANIMATION MODULE ---

export function initAnimations() {
    setupScrollObserver();
    initPremiumAnimations(); // Existing hover effects
    setupScrollObserver();
    initPremiumAnimations(); // Existing hover effects
    setupSplitText();        // Typography
}

function setupScrollObserver() {
    const observerOptions = { threshold: 0.15 };

    // Observer for staggered text (Hero)
    const heroElements = document.querySelectorAll('#statement .reveal-text');
    const heroObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroElements.forEach(el => {
                    const delay = parseFloat(el.getAttribute('data-delay') || '0');
                    el.style.transitionDelay = `${delay}s`;
                    el.classList.add('visible');
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statementEl = document.getElementById('statement');
    if (statementEl) {
        heroObserver.observe(statementEl);
    }

    // Observer for Dynamic Entry (List Projects, Leadership, Skills, Education)
    const dynamicObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (!entry.target.hasAttribute('data-delay')) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.dynamic-entry, .reveal-text:not([data-delay])').forEach(el => dynamicObserver.observe(el));
}

function initPremiumAnimations() {
    // Magnetic Buttons
    const buttons = document.querySelectorAll('.magnetic-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // Custom Cursor (Optional - preserved if needed later)
}

function setupNetworkAnimation() {
    const canvas = document.getElementById('matrix-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    // Configuration - "Tidak pusingin & tidak lebay"
    const config = {
        particleCount: Math.min(window.innerWidth / 15, 100),
        connectionDistance: 120,
        mouseDistance: 180,
        particleSpeed: 0.4,
        color: 'rgba(120, 120, 120, 0.15)'
    };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * config.particleSpeed;
            this.vy = (Math.random() - 0.5) * config.particleSpeed;
            this.size = Math.random() * 1.5 + 0.5;
        }

        update(mouse) {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse interaction
            if (mouse.x != null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < config.mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (config.mouseDistance - distance) / config.mouseDistance;
                    const repulsion = force * 0.05;
                    this.vx -= forceDirectionX * repulsion;
                    this.vy -= forceDirectionY * repulsion;
                }
            }
        }

        draw() {
            ctx.fillStyle = '#a3a3a3';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.min(window.innerWidth / 10, 80);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update(mouse);
            particles[i].draw();
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.connectionDistance) {
                    ctx.beginPath();
                    const opacity = 1 - (distance / config.connectionDistance);
                    ctx.strokeStyle = `rgba(100, 100, 100, ${opacity * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();
}

// --- SPLIT TEXT ---
function setupSplitText() {
    const targets = document.querySelectorAll('p, li, h3, h4, .animate-text, .detail-text');

    targets.forEach(el => {
        if (el.innerText.trim().length === 0 || el.classList.contains('split-text-processed')) return;

        // Skip complex structures if they aren't explicitly tagged
        if (el.children.length > 0 && !el.classList.contains('animate-text')) {
            // Basic check to minimize breaking
        }

        // Skip elements that contain children (like links <a>) to prevent breaking them
        // unless they are explicitly marked with 'allow-split'
        if (el.children.length > 0 && !el.classList.contains('allow-split')) {
            return;
        }

        el.classList.add('split-text-container');
        el.classList.add('split-text-processed');

        const originalText = el.innerText;
        el.innerHTML = '';

        const parts = originalText.split(/(\s+)/);
        let wordIndex = 0;

        parts.forEach(part => {
            if (part.match(/\s+/)) {
                el.appendChild(document.createTextNode(part));
            } else {
                const span = document.createElement('span');
                span.innerText = part;
                span.className = 'split-word';
                span.style.transitionDelay = `${wordIndex * 0.015}s`;
                el.appendChild(span);
                wordIndex++;
            }
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 50);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(el);
    });

    document.querySelectorAll('h2').forEach(h2 => {
        h2.classList.add('reveal-heading');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        observer.observe(h2);
    });
}
