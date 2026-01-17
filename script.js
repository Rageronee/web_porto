// --- DATA & STATE MANAGEMENT ---
const appState = {
    // Data Proyek Mekatronika & AI
    projects: [
        {
            id: 1,
            title: "Grapara Customer Service",
            category: "Full Stack Web App",
            year: "2025",
            color: "#000000",
            shape: "rect",
            tech: "Laravel 11/Tailwind/TiDB/Vercel",
            domain: "Web App",
            link: "https://grapara-cs.vercel.app",
            details: {
                desc: "Aplikasi manajemen antrian dan layanan Customer Service modern dengan sentuhan humor ('Plesetan'), fitur keamanan tingkat lanjut, dan integrasi database serverless TiDB Cloud.",
                features: [
                    "UI Glassmorphism & Parody Branding",
                    "Security: Strict Password Policy & Anti-SQL Injection",
                    "Serverless Infrastructure (TiDB Cloud + Vercel)",
                    "Smart Queue System (Realtime Monitoring)",
                    "Multi-Role Access (Admin, CS, Customer)"
                ]
            }
        },
        {
            id: 2,
            title: "Sistem Deteksi Kematangan Pisang",
            category: "Computer Vision & Web",
            year: "2024",
            color: "#EF4444",
            shape: "circle",
            tech: "JavaScript/HTML/CSS",
            domain: "Computer Vision",
            link: "https://banana-maturity.vercel.app",
            details: {
                desc: "Aplikasi web untuk mendeteksi tingkat kematangan buah pisang secara real-time menggunakan teknik Computer Vision sederhana pada browser.",
                features: [
                    "Deteksi Real-time via Kamera",
                    "Klasifikasi Tingkat Kematangan: Mentah, Matang, Terlalu Matang",
                    "Visualisasi Hasil Deteksi",
                    "Berjalan sepenuhnya di sisi klien (Client-side Processing)"
                ]
            }
        },
        {
            id: 3,
            title: "Konsultansi Website Percetakan (ZonaPrinting)",
            category: "Full Stack Web Dev",
            year: "2024",
            color: "#8B5CF6",
            shape: "rect",
            tech: "Next.js/React",
            domain: "Web App",
            link: "https://zonaprinting.vercel.app",
            details: {
                desc: "Platform katalog produk dan dashboard admin untuk mitra percetakan, menampilkan grafik penjualan terstruktur.",
                features: [
                    "Katalog Produk Interaktif",
                    "Dashboard Admin dengan Visualisasi Data",
                    "Manajemen Pesanan",
                    "Responsive Design"
                ]
            }
        },
        {
            id: 4,
            title: "Robot Line Follower Otonom",
            category: "Control System & PID",
            year: "2024",
            color: "#3B82F6",
            shape: "tri",
            tech: "Arduino/ESP32/MQTT/C++/Python",
            domain: "Robotics",
            link: "https://github.com/Rageronee/LN_FOLLOWER_ROBOT",
            details: {
                desc: "Robot otonom yang mampu mengikuti garis dengan presisi tinggi menggunakan algoritma kontrol PID.",
                features: [
                    "Algoritma Kontrol PID",
                    "Integrasi Sensor Garis & Kecepatan",
                    "Optimasi Jalur",
                    "Hardware: ESP32/Arduino"
                ]
            }
        },
        {
            id: 5,
            title: "Monitoring Kematangan Kompos",
            category: "IoT, ML & Sistem Pakar",
            year: "2023",
            color: "#10B981",
            shape: "rect",
            tech: "IoT + ML + Expert System",
            domain: "Smart Farming",
            link: "https://monitoring-kompos.vercel.app",
            details: {
                desc: "Sistem IoT cerdas untuk memantau proses pengomposan dengan prediksi kematangan berbasis Machine Learning.",
                features: [
                    "Monitoring Suhu & Kelembaban Realtime",
                    "Prediksi Waktu Panen (ML)",
                    "Dashboard Web Interaktif",
                    "Konektivitas IoT Stable"
                ]
            }
        },
        {
            id: 6,
            title: "Kid Curios: Aplikasi Belajar IPA (IMK)",
            category: "HCI & UI/UX Design",
            year: "2023",
            color: "#F59E0B",
            shape: "arc",
            tech: "Figma Prototype",
            domain: "EdTech",
            link: "https://www.figma.com/proto/l8Wta8jtWyZSKchAWt0WVR/IMK-Kid-Curios?node-id=0-1&t=SosRQk2kVLbcLIJu-1",
            details: {
                desc: "Prototipe aplikasi pembelajaran interaktif untuk siswa SD yang dirancang dengan prinsip Human-Computer Interaction.",
                features: [
                    "User-Friendly Interface untuk Anak",
                    "Skenario Pembelajaran Interaktif",
                    "Gamifikasi Materi IPA",
                    "High-Fidelity Prototype"
                ]
            }
        },
        {
            id: 7,
            title: "Sistem Kendali Lengan Robot Sederhana",
            category: "Kinematics & Microcontroller",
            year: "2023",
            color: "#6366F1",
            shape: "rect",
            tech: "Dobot Studio, Devices",
            domain: "Automation",
            details: {
                desc: "Implementasi sistem kendali pada lengan robot Dobot untuk tugas pick-and-place otomatis menggunakan conveyor.",
                features: [
                    "Integrasi Conveyor Belt",
                    "Suction & Grip Mechanism",
                    "Program Automation Logik",
                    "Kalibrasi Posisi Presisi"
                ]
            }
        }
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
    // setupNetworkAnimation(); // DISABLED as per request
    setupSplitText();
});

// --- SPLIT TEXT & KINETIC TYPOGRAPHY (Deep Content) ---
function setupSplitText() {
    // Select all content text that needs animation
    const targets = document.querySelectorAll('p, li, h3, h4, .detail-text');

    targets.forEach(el => {
        // Skip if empty or already processed
        if (el.innerText.trim().length === 0 || el.classList.contains('split-text-processed')) return;

        el.classList.add('split-text-container');
        el.classList.add('split-text-processed');

        const originalText = el.innerText;
        el.innerHTML = '';

        // Split by whitespace but keep delimiters to preserve sentence structure
        const parts = originalText.split(/(\s+)/);

        let wordIndex = 0;
        parts.forEach(part => {
            if (part.match(/\s+/)) {
                el.appendChild(document.createTextNode(part));
            } else {
                const span = document.createElement('span');
                span.innerText = part;
                span.className = 'split-word';
                // Premium Stagger: 0.015s per word for a liquid effect
                span.style.transitionDelay = `${wordIndex * 0.015}s`;
                el.appendChild(span);
                wordIndex++;
            }
        });

        // Robust Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Small delay to ensure layout is stable
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 50);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(el);
    });

    // Expanding Line for Section Headings (h2)
    document.querySelectorAll('h2').forEach(h2 => {
        h2.classList.add('reveal-heading');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(h2);
    });
}



// --- CONTENT RENDERING (dengan Staggering) ---
function createDynamicEntry(data, type, index) {
    // Delay halus untuk staggering
    const delay = 0.05 * index;
    let htmlContent;

    // Membangun konten HTML
    // --- RENDER LOGIC WITH ICONS & BADGES ---
    if (type === 'project') {
        const num = (index + 1).toString().padStart(2, '0');

        // Define domain icons based on project category keywords or specific domains
        let domainIcon = 'ph-code'; // Default
        if (data.domain.includes('Robotics') || data.domain.includes('Automation')) domainIcon = 'ph-robot';
        else if (data.domain.includes('Vision')) domainIcon = 'ph-eye';
        else if (data.domain.includes('Web')) domainIcon = 'ph-globe';
        else if (data.domain.includes('IoT') || data.domain.includes('Farming')) domainIcon = 'ph-plant';
        else if (data.domain.includes('EdTech')) domainIcon = 'ph-student';

        // Tech Stack Badges Logic
        const techStack = data.tech.split(/,|\//).map(t => t.trim());
        const techBadges = techStack.map(t => `<span class="tech-badge">${t}</span>`).join('');

        htmlContent = `
                    <div class="col-span-1 text-xs text-gray-400 font-mono-custom relative z-10 pointer-events-none flex items-center">
                        <span class="mr-2">/ ${num}</span>
                    </div>
                    <div class="col-span-6 md:col-span-6 relative z-10 pointer-events-none flex items-center gap-3">
                         <i class="ph ${domainIcon} text-lg text-gray-400"></i>
                         <!-- Added animate-text to title -->
                        <span class="text-xl md:text-3xl font-medium tracking-tight text-gray-900 group-hover:underline underline-offset-4 decoration-1 animate-text">${data.title}</span>
                         <span class="ml-2 inline-block text-xs align-top text-gray-400 transition-transform duration-300 group-[.expanded]:rotate-180">
                            <i class="ph ph-caret-down"></i>
                         </span>
                    </div>
                    <div class="col-span-3 md:col-span-3 text-right md:text-left text-xs md:text-sm text-gray-500 font-mono-custom uppercase break-words relative z-10 pointer-events-none flex flex-wrap items-center justify-end md:justify-start content-center">
                        ${techBadges}
                    </div>
                    <div class="col-span-2 text-right text-xs md:text-sm text-gray-400 font-mono-custom relative z-10 pointer-events-none flex items-center justify-end animate-text">
                        ${data.domain}
                    </div>
                `;
    } else if (type === 'leadership' || type === 'skill') {
        let iconClass = 'ph-caret-right';
        if (type === 'leadership') iconClass = 'ph-users';
        if (type === 'skill') iconClass = 'ph-lightning';

        htmlContent = `
                    <div class="col-span-3 text-xs text-gray-400 font-mono-custom pt-1 flex items-center gap-2">
                        <i class="ph ${iconClass} text-gray-300"></i>
                        <span class="animate-text">${data.period || data.focus}</span>
                    </div>
                    <div class="col-span-9 md:col-span-5 text-sm font-semibold text-gray-900 flex items-center">
                        <span class="animate-text">${data.role || data.primary}</span>
                    </div>
                    <div class="col-span-9 md:col-span-4 col-start-4 md:col-start-9 text-xs text-gray-500 pt-1 md:pt-0 flex items-center">
                        <span class="animate-text">${data.org || data.secondary || data.desc}</span>
                    </div>
                `;
    } else if (type === 'education') {
        htmlContent = `
                    <h4 class="text-xl font-medium mb-1 text-gray-900 flex items-center gap-2">
                        <i class="ph ph-graduation-cap text-gray-300 text-lg"></i>
                        <span class="animate-text">${data.name}</span>
                    </h4>
                    <p class="text-sm font-serif-custom italic mb-3 text-gray-700 ml-7 animate-text">${data.degree}</p>
                    <p class="text-xs text-gray-500 font-mono-custom ml-7 animate-text">${data.period} | ${data.location}</p>
                `;
    }

    // --- LOGIC BARU UNTUK DROPDOWN PROJECT ---
    if (type === 'project') {
        const container = document.createElement('div');
        // Container utama item
        const header = document.createElement('div');
        header.className = "project-item group grid grid-cols-12 py-4 border-b border-gray-100 cursor-pointer relative dynamic-entry smooth-entry text-left items-start";
        header.style.transitionDelay = `${delay}s`;
        header.innerHTML = htmlContent;

        // Container details
        const details = document.createElement('div');
        details.className = "project-details";

        // Content details
        const featuresList = data.details && data.details.features ?
            data.details.features.map(f => `<li class="mb-1 text-gray-600 animate-text">- ${f}</li>`).join('') : '';

        const linkButton = data.link ?
            `<a href="${data.link}" target="_blank" rel="noopener noreferrer" class="visit-btn">
                Visit Project <span>↗</span>
             </a>` : '';

        details.innerHTML = `
            <div class="project-details-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div class="detail-label">Description</div>
                        <p class="detail-text animate-text">${data.details ? data.details.desc : 'No description available.'}</p>
                        ${linkButton}
                    </div>
                    <div>
                        <div class="detail-label">Key Features</div>
                        <ul class="text-sm font-light list-none">
                            ${featuresList}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // Event Listener Toggle
        header.addEventListener('click', (e) => {
            // Prevent default if clicking actual link button (redundant but safe)
            if (e.target.closest('a')) return;

            const isExpanded = details.classList.contains('expanded');

            // Close all other details
            document.querySelectorAll('.project-details.expanded').forEach(el => {
                if (el !== details) {
                    el.classList.remove('expanded');
                    el.previousElementSibling.classList.remove('active'); // Remove active state from header
                    el.previousElementSibling.classList.remove('expanded'); // Remove expanded state group
                }
            });

            if (isExpanded) {
                details.classList.remove('expanded');
                header.classList.remove('active');
                header.classList.remove('expanded');
            } else {
                details.classList.add('expanded');
                header.classList.add('active');
                header.classList.add('expanded');
            }
        });

        // Combine
        container.appendChild(header);
        container.appendChild(details);
        return container;
    }

    // --- OLD LOGIC UNTUK NON-PROJECT ---
    else {
        const wrapper = document.createElement('div');
        // Non-project items don't have links on the wrapper itself usually in this design, 
        // expect Education which was div.

        wrapper.className = type === 'education'
            ? "group cursor-default p-4 border border-gray-100 bg-white hover:shadow-md transition-shadow duration-300 dynamic-entry smooth-entry rounded-lg"
            : "project-item group grid grid-cols-12 py-4 border-b border-gray-100 cursor-pointer relative dynamic-entry smooth-entry text-left";

        wrapper.style.transitionDelay = `${delay}s`;
        wrapper.innerHTML = htmlContent;
        return wrapper;
    }
}

function renderAllData() {
    // Render Projects
    const projectList = document.getElementById('project-list');
    if (projectList) {
        projectList.innerHTML = ''; // Ensure clean slate
        appState.projects.forEach((p, i) => {
            const item = createDynamicEntry(p, 'project', i);
            // Removed hover preview event listeners as requested
            projectList.appendChild(item);
        });
    }

    // Render Leadership Log
    const leadershipLog = document.getElementById('leadership-log');
    if (leadershipLog) {
        leadershipLog.innerHTML = '';
        appState.leadership.forEach((l, i) => {
            leadershipLog.appendChild(createDynamicEntry(l, 'leadership', i));
        });
    }

    // Render Skills Matrix
    const skillItems = document.getElementById('skill-items');
    if (skillItems) {
        skillItems.innerHTML = '';
        appState.skills.forEach((s, i) => {
            skillItems.appendChild(createDynamicEntry(s, 'skill', i));
        });
    }

    // Render Education
    const educationItems = document.getElementById('education-items');
    if (educationItems) {
        educationItems.innerHTML = '';
        appState.education.forEach((e, i) => {
            educationItems.appendChild(createDynamicEntry(e, 'education', i));
        });
    }
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

// --- PREMIUM ANIMATIONS ---
function initPremiumAnimations() {
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
