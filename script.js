// --- DATA & STATE MANAGEMENT ---
const appState = {
    // Data Proyek Mekatronika & AI
    projects: [
        { id: 1, title: "Konsultansi Website Percetakan (ZonaPrinting)", category: "Full Stack Web Dev", year: "2024", color: "#8B5CF6", shape: "rect", tech: "Next.js/React", domain: "Web App", link: "https://zonaprinting.vercel.app" },
        { id: 2, title: "Robot Line Follower Otonom", category: "Control System & PID", year: "2024", color: "#3B82F6", shape: "tri", tech: "Arduino/ESP32/MQTT/C++/Python", domain: "Robotics", link: "https://github.com/Rageronee/LN_FOLLOWER_ROBOT" },
        { id: 3, title: "Sistem Deteksi Kematangan Pisang", category: "Computer Vision & Web", year: "2024", color: "#EF4444", shape: "circle", tech: "JavaScript, HTML, CSS", domain: "Computer Vision", link: "https://github.com/talhaportofolio/Sistem-Deteksi-Kematangan-Pisang" },
        { id: 4, title: "Monitoring Kematangan Kompos", category: "IoT, ML & Sistem Pakar", year: "2023", color: "#10B981", shape: "rect", tech: "IoT + ML + Expert System", domain: "Smart Farming", link: "https://monitoring-kompos.vercel.app" },
        { id: 5, title: "Kid Curios: Aplikasi Belajar IPA (IMK)", category: "HCI & UI/UX Design", year: "2023", color: "#F59E0B", shape: "arc", tech: "Figma Prototype", domain: "EdTech", link: "https://www.figma.com/proto/l8Wta8jtWyZSKchAWt0WVR/IMK-Kid-Curios?node-id=0-1&t=SosRQk2kVLbcLIJu-1" },
        { id: 6, title: "Sistem Kendali Lengan Robot Sederhana", category: "Kinematics & Microcontroller", year: "2023", color: "#6366F1", shape: "rect", tech: "Dobot Studio, Devices (Conveyor, Suction/Grip)", domain: "Automation" }
    ],
    // Data Organisasi
    leadership: [
        { id: 1, period: "Jan 2025 - Jan 2026", role: "Kepala Departemen Sosial Politik", org: "HIMATRONIKA-AI", desc: "Manajemen Program & Advokasi Isu" },
        { id: 2, period: "Jan 2025 - Jan 2026", role: "Direktur Jenderal DIGITEK", org: "Kementerian Kominfo BEM REMA UPI", desc: "Strategi Komunikasi" },
        { id: 3, period: "Mar 2024 - Mar 2025", role: "Staff Divisi Kominfo", org: "GAPURA UPI", desc: "Desain Komunikasi & Publikasi" },
        { id: 4, period: "Feb 2024 - Nov 2024", role: "Staff Departemen Kominfo", org: "HIMATRONIKA-AI", desc: "Desain Grafis & Konten" }
    ],
    // Data Keahlian (Ditambah Creative Tech & Design Skills)
    skills: [
        { id: 1, focus: "Engineering Software", primary: "Arduino, Proteus, CX Programmer, Fluidsim", secondary: "Dobot, Eagle, TinkerCAD" },
        { id: 2, focus: "Creative & Design", primary: "Adobe Photoshop, Premiere Pro, After Effects, Illustrator", secondary: "Figma, OBS Studio" },
        { id: 3, focus: "Code", primary: "Python, C++, C (Embedded), MATLAB", secondary: "TensorFlow, OpenCV, NumPy" },
        { id: 4, focus: "Systems", primary: "ROS, Arduino/STM32, Raspberry Pi", secondary: "Control Theory, PID, DSP" },
        { id: 5, focus: "Creative Tech", primary: "Garment Design, Fashion Design, Creative Direction", secondary: "Pattern Making, Textile Design, Brand Identity" },
        { id: 6, focus: "Academic Focus", primary: "Mekatronika & Kecerdasan Buatan (UPI)", secondary: "Sarjana Teknik, Semester 5" }
    ],
    // Data Pendidikan
    education: [
        { id: 1, name: "Universitas Pendidikan Indonesia (UPI) Kampus di Purwakarta", degree: "Sarjana Teknik – Mekatronika & Kecerdasan Buatan", period: "Agu 2023 – Sekarang", location: "Purwakarta" },
        { id: 2, name: "SMA Negeri 2 Purwakarta", degree: "MIPA (Matematika dan Ilmu Pengetahuan Alam)", period: "Agu 2020 – Mei 2023", location: "Purwakarta" }
    ]
};

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    renderAllData();
    setupScrollObserver();
    initPremiumAnimations();
});

// --- CONTENT RENDERING (dengan Staggering) ---
function createDynamicEntry(data, type, index) {
    // Delay halus untuk staggering
    const delay = 0.05 * index;
    let htmlContent;

    // Membangun konten HTML
    if (type === 'project') {
        const num = (index + 1).toString().padStart(2, '0');
        htmlContent = `
                    <div class="col-span-1 text-xs text-gray-400 font-mono-custom">/ ${num}</div>
                    <div class="col-span-6 md:col-span-6">
                        <span class="text-xl md:text-3xl font-medium tracking-tight text-gray-900 group-hover:underline underline-offset-4 decoration-1">${data.title}</span>
                         ${data.link ? '<span class="ml-2 inline-block text-xs align-top text-gray-400">↗</span>' : ''}
                    </div>
                    <div class="col-span-3 md:col-span-3 text-right md:text-left text-xs md:text-sm text-gray-500 font-mono-custom uppercase break-words">${data.tech}</div>
                    <div class="col-span-2 text-right text-xs md:text-sm text-gray-400 font-mono-custom">${data.domain}</div>
                `;
    } else if (type === 'leadership' || type === 'skill') {
        htmlContent = `
                    <div class="col-span-3 text-xs text-gray-400 font-mono-custom pt-1">${data.period || data.focus}</div>
                    <div class="col-span-9 md:col-span-5 text-sm font-semibold text-gray-900">${data.role || data.primary}</div>
                    <div class="col-span-9 md:col-span-4 col-start-4 md:col-start-9 text-xs text-gray-500 pt-1 md:pt-0">${data.org || data.secondary || data.desc}</div>
                `;
    } else if (type === 'education') {
        htmlContent = `
                    <h4 class="text-xl font-medium mb-1 text-gray-900">${data.name}</h4>
                    <p class="text-sm font-serif-custom italic mb-3 text-gray-700">${data.degree}</p>
                    <p class="text-xs text-gray-500 font-mono-custom">${data.period} | ${data.location}</p>
                `;
    }

    const isLink = type === 'project' && data.link;
    const wrapper = document.createElement(isLink ? 'a' : 'div');

    if (isLink) {
        wrapper.href = data.link;
        wrapper.target = "_blank";
        wrapper.rel = "noopener noreferrer";
    }

    wrapper.className = type === 'education'
        ? "group cursor-default p-4 border border-gray-100 bg-white hover:shadow-md transition-shadow duration-300 dynamic-entry smooth-entry rounded-lg"
        : "project-item group grid grid-cols-12 py-4 border-b border-gray-100 cursor-pointer relative dynamic-entry smooth-entry text-left";

    wrapper.style.transitionDelay = `${delay}s`;
    wrapper.innerHTML = htmlContent;

    return wrapper;
}

function renderAllData() {
    // Render Projects
    const projectList = document.getElementById('project-list');
    if (projectList) {
        appState.projects.forEach((p, i) => {
            const item = createDynamicEntry(p, 'project', i);
            item.addEventListener('mouseenter', (e) => showPreview(e, p));
            item.addEventListener('mouseleave', hidePreview);
            item.addEventListener('mousemove', movePreview);
            projectList.appendChild(item);
        });
    }

    // Render Leadership Log
    const leadershipLog = document.getElementById('leadership-log');
    if (leadershipLog) {
        appState.leadership.forEach((l, i) => {
            leadershipLog.appendChild(createDynamicEntry(l, 'leadership', i));
        });
    }

    // Render Skills Matrix
    const skillItems = document.getElementById('skill-items');
    if (skillItems) {
        appState.skills.forEach((s, i) => {
            skillItems.appendChild(createDynamicEntry(s, 'skill', i));
        });
    }

    // Render Education
    const educationItems = document.getElementById('education-items');
    if (educationItems) {
        appState.education.forEach((e, i) => {
            educationItems.appendChild(createDynamicEntry(e, 'education', i));
        });
    }
}

// --- PREVIEW CANVAS LOGIC ---
let previewContainer, previewCanvas, pCtx;

function initPreviewCanvas() {
    previewContainer = document.getElementById('preview-container');
    previewCanvas = document.getElementById('preview-canvas');
    if (previewCanvas) {
        pCtx = previewCanvas.getContext('2d');
    }
}

function drawPreview(project) {
    if (!pCtx || !previewCanvas) return;

    const bgColor = '#FAFAFA';
    const textColor = '#171717';

    pCtx.clearRect(0, 0, 300, 200);
    pCtx.fillStyle = bgColor;
    pCtx.fillRect(0, 0, 300, 200);

    // Add gradient background
    const gradient = pCtx.createLinearGradient(0, 0, 300, 200);
    gradient.addColorStop(0, project.color + '20');
    gradient.addColorStop(1, project.color + '05');
    pCtx.fillStyle = gradient;
    pCtx.fillRect(0, 0, 300, 200);

    pCtx.fillStyle = project.color;
    pCtx.save();
    pCtx.translate(150, 100);

    // Add rotation animation
    const time = Date.now() * 0.001;
    pCtx.rotate(Math.sin(time) * 0.1);

    // Simulating a dynamic engineering visual based on domain: 3D-like shapes
    if (project.shape === 'circle') {
        pCtx.beginPath();
        pCtx.arc(0, 0, 60, 0, Math.PI * 2);
        pCtx.fill();
        pCtx.fillStyle = bgColor;
        pCtx.font = 'bold 30px Playfair Display';
        pCtx.textAlign = 'center';
        pCtx.fillText('AI', 0, 10);
    } else if (project.shape === 'rect') {
        pCtx.fillRect(-50, -50, 100, 100);
        // Add inner highlight
        pCtx.fillStyle = project.color + '80';
        pCtx.fillRect(-40, -40, 80, 80);
    } else if (project.shape === 'tri') {
        pCtx.beginPath();
        pCtx.moveTo(0, -70);
        pCtx.lineTo(70, 70);
        pCtx.lineTo(-70, 70);
        pCtx.closePath();
        pCtx.fill();
    } else { // Arc/Data Analytics
        pCtx.beginPath();
        pCtx.arc(0, 0, 60, 0, Math.PI, false);
        pCtx.lineWidth = 15;
        pCtx.strokeStyle = project.color;
        pCtx.stroke();
    }

    pCtx.restore();

    // Overlay Text with better styling
    pCtx.fillStyle = textColor;
    pCtx.font = 'bold 12px Inter';
    pCtx.textAlign = 'center';
    pCtx.fillText(project.category.toUpperCase(), 150, 180);
    pCtx.font = '10px IBM Plex Mono';
    pCtx.fillStyle = '#737373';
    pCtx.fillText(project.tech, 150, 192);
}

function showPreview(e, project) {
    if (!previewContainer) return;
    drawPreview(project);
    previewContainer.classList.add('active');
}

function hidePreview() {
    if (!previewContainer) return;
    previewContainer.classList.remove('active');
}

function movePreview(e) {
    if (!previewContainer) return;
    const x = e.clientX;
    const y = e.clientY;

    previewContainer.style.left = `${x}px`;
    previewContainer.style.top = `${y}px`;
}

// --- ANIMATION & SCROLL LOGIC ---

function setupScrollObserver() {
    const observerOptions = { threshold: 0.15 };

    // Observer untuk staggered text (Hero)
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

    // Observer untuk Dynamic Entry (List Projects, Leadership, Skills, Education)
    const dynamicObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Hanya unobserve jika elemen tidak memiliki delay custom (yaitu elemen list)
                if (!entry.target.hasAttribute('data-delay')) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.1 });

    // Terapkan ke semua elemen dynamic-entry dan reveal-text yang tersisa
    document.querySelectorAll('.dynamic-entry, .reveal-text:not([data-delay])').forEach(el => dynamicObserver.observe(el));
}

// --- SCROLL UTILS ---
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}

// Initialize preview canvas on load
document.addEventListener('DOMContentLoaded', () => {
    initPreviewCanvas();
});

// --- PREMIUM ANIMATIONS ---
function initPremiumAnimations() {
    // Removed parallax to prevent overlapping issues

    // Mouse move parallax for cards
    const cards = document.querySelectorAll('.gradient-card, .project-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Smooth number counter animation (if needed)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Add floating animation to vision cards
    const visionCards = document.querySelectorAll('#vision > div > div');
    visionCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('float-animation');
    });

    // Text reveal with typewriter effect (optional, for quotes)
    const quotes = document.querySelectorAll('.font-serif-custom.italic');
    quotes.forEach(quote => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });
        observer.observe(quote);
    });
}

