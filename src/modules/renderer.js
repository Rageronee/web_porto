// --- RENDERER MODULE ---

export function renderContent(appState) {
    // Render Projects
    if (document.getElementById('project-list')) {
        renderListWithLimit('project-list', appState.projects, 'project', 5);
    }

    // Render Project Grid (For Projects Page)
    if (document.getElementById('project-grid')) {
        renderProjectGrid('project-grid', appState.projects);
    }

    // Render Leadership Log
    if (document.getElementById('leadership-log')) {
        renderListWithLimit('leadership-log', appState.leadership, 'leadership', 3);
    }

    // Render Committees
    if (document.getElementById('committee-items')) {
        renderListWithLimit('committee-items', appState.committees, 'leadership', 3);
    }

    // Render Skills Matrix
    if (document.getElementById('skill-items')) {
        renderListWithLimit('skill-items', appState.skills, 'skill', 99);
    }

    // Render Education
    if (document.getElementById('education-items')) {
        renderListWithLimit('education-items', appState.education, 'education', 99);
    }
}

function renderListWithLimit(containerId, data, type, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    if (!data || data.length === 0) return;

    // 1. Render Initial Items
    const initialItems = data.slice(0, limit);
    initialItems.forEach((item, i) => {
        container.appendChild(createDynamicEntry(item, type, i));
    });

    // 2. Check if we need a "See More" button
    if (data.length > limit) {
        const remainingItems = data.slice(limit);

        const btnContainer = document.createElement('div');
        // Mobile: Full width. Desktop: Grid aligned.
        btnContainer.className = "mt-12 col-span-12 dynamic-entry smooth-entry";
        btnContainer.style.transitionDelay = `${0.05 * limit}s`;

        if (type === 'project') {
            const viewAllLink = "/projects.html";
            // NEW SWISS BRUTALIST BUTTON (Transparent, Minimal)
            // Removed borders and white backgrounds. Uses pure typography and spacing.
            // NEW SWISS BRUTALIST BUTTON (Simplified, No Cutoff)
            // NEW SWISS BRUTALIST BUTTON (Refined, Proportional)
            btnContainer.className = "mt-12 col-span-12 flex justify-center dynamic-entry smooth-entry";
            btnContainer.innerHTML = `
                <a href="${viewAllLink}" class="group relative overflow-hidden inline-flex items-center gap-3 bg-white text-black border border-black px-8 py-3 text-xs font-bold font-mono-custom uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5">
                    <span class="relative z-10">Explore All Projects</span>
                    <i class="ph-bold ph-arrow-right text-lg relative z-10 group-hover:translate-x-1 transition-transform"></i>
                </a>
             `;
        } else {
            const btn = document.createElement('button');
            btn.className = "group inline-flex items-center gap-2 text-xs font-mono-custom uppercase tracking-widest text-gray-500 hover:text-black transition-colors px-4 py-2 border border-gray-200 hover:border-black rounded-full";
            btn.innerHTML = `<span>View All (${data.length})</span><i class="ph ph-arrow-down group-hover:translate-y-1 transition-transform"></i>`;

            btn.onclick = () => {
                btnContainer.remove();
                remainingItems.forEach((item, i) => {
                    const node = createDynamicEntry(item, type, limit + i);
                    node.style.transitionDelay = `${0.05 * i}s`;
                    container.appendChild(node);
                    setTimeout(() => node.classList.add('visible'), 10);
                });
            };
            btnContainer.appendChild(btn);
        }
        container.appendChild(btnContainer);
    }
}

function createDynamicEntry(data, type, index) {
    const delay = 0.05 * index;
    let htmlContent;

    if (type === 'project') {
        const num = (index + 1).toString().padStart(2, '0');
        let domainIcon = 'ph-code';
        if (data.domain.includes('Robot') || data.domain.includes('Auto')) domainIcon = 'ph-robot';
        else if (data.domain.includes('Vision')) domainIcon = 'ph-eye';

        const techStack = data.tech.split(/[,•]/).map(t => t.trim()).filter(t => t);
        const techBadges = techStack.map(t => `<span class="tech-badge">${t}</span>`).join('');

        // RESPONSIVE LAYOUT FIX:
        // Changed grid layout to be robust on mobile. Used 'min-w-0' to prevent flex blowout.
        // On mobile: Number takes less space (col-span-2), Title takes more (col-span-10).
        // Added 'items-center' to align icon and text vertically.
        htmlContent = `
            <div class="col-span-2 md:col-span-1 text-xs text-gray-400 font-mono-custom relative z-10 pointer-events-none flex items-center">
                <span class="opacity-50">/ ${num}</span>
            </div>
            <div class="col-span-10 md:col-span-6 relative z-10 pointer-events-none flex items-center gap-3 min-w-0">
                 <i class="ph ${domainIcon} text-lg md:text-xl text-gray-300 shrink-0 transition-colors duration-300"></i>
                 <span class="text-lg md:text-2xl font-medium tracking-tight text-gray-900 group-hover:pl-2 transition-all duration-500 animate-text truncate block w-full">${data.title}</span>
            </div>
            <div class="hidden md:flex col-span-5 md:col-span-3 flex-wrap items-center justify-start relative z-10 pointer-events-none pr-4">
                ${techBadges}
            </div>
            <div class="hidden md:flex col-span-2 text-right text-xs text-gray-400 font-mono-custom relative z-10 pointer-events-none items-center justify-end animate-text">
                ${data.domain}
            </div>
        `;
    } else if (type === 'leadership' || type === 'skill') {
        let iconClass = type === 'leadership' ? 'ph-users' : 'ph-lightning';
        htmlContent = `
            <div class="col-span-12 md:col-span-3 text-xs text-gray-400 font-mono-custom pt-1 flex items-center gap-2 mb-1 md:mb-0">
                <i class="ph ${iconClass} text-gray-300"></i>
                <span class="tracking-wide animate-text">${data.period || data.focus}</span>
            </div>
            <div class="col-span-12 md:col-span-5 text-sm font-semibold text-gray-900 flex items-center mb-1 md:mb-0">
                <span class="tracking-tight animate-text">${data.role || data.primary}</span>
            </div>
            <div class="col-span-12 md:col-span-4 md:col-start-9 text-xs text-gray-500 pt-1 md:pt-0 flex items-center italic">
                <span class="animate-text">${data.org || data.secondary || data.desc}</span>
            </div>
        `;
    } else {
        htmlContent = `
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end py-2">
                <div class="flex-1 pr-4 w-full">
                    <h4 class="text-lg font-medium text-gray-900 flex items-center gap-2 group-hover:text-black transition-colors w-full">
                        <span class="animate-text truncate">${data.name}</span>
                    </h4>
                    <p class="text-sm font-serif-custom italic text-gray-600 mt-1 leading-relaxed animate-text">${data.degree}</p>
                </div>
                <div class="w-full md:w-auto text-left md:text-right shrink-0 mt-2 md:mt-0">
                     <div class="border border-gray-200 rounded-lg p-3 bg-white/50 inline-block text-right w-full md:w-auto">
                        <span class="block text-sm font-mono-custom text-gray-600 font-medium mb-1 animate-text">${data.period}</span>
                        <p class="text-xs text-gray-400 animate-text flex items-center justify-end gap-1">
                            <i class="ph-fill ph-map-pin"></i> ${data.location}
                        </p>
                     </div>
                </div>
            </div>
        `;
    }

    if (type === 'project') {
        const container = document.createElement('div');
        const header = document.createElement('div');
        // Added 'gap-4' for mobile spacing comfort
        header.className = "project-item group grid grid-cols-12 gap-y-2 md:gap-y-0 py-6 md:py-8 border-b border-gray-100 cursor-pointer relative transition-all duration-300 hover:border-black items-center dynamic-entry smooth-entry";
        header.innerHTML = htmlContent;

        const details = document.createElement('div');
        details.className = "project-details";

        const featuresHtml = data.details.features.map(f => {
            const parts = f.split(':');
            if (parts.length > 1) {
                const key = parts[0].trim();
                const value = parts.slice(1).join(':').trim();
                return `
                <li class="mb-5 block border-l-2 border-gray-100 pl-4">
                    <div class="mb-1">
                        <strong class="font-mono-custom text-xs uppercase tracking-widest text-gray-800 block">${key}</strong>
                    </div>
                    <div class="text-sm text-gray-600 font-light leading-relaxed animate-text">${value}</div>
                </li>`;
            }
            return `<li class="text-sm text-gray-600 flex items-start leading-relaxed mb-3">
                <span class="mr-3 text-gray-300 mt-1.5 text-[10px]">●</span>
                <span class="animate-text">${f}</span>
            </li>`;
        }).join('');

        details.innerHTML = `
            <div class="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-gray-100">
                <div class="border-r-0 md:border-r border-gray-100 pr-0 md:pr-12">
                    <div class="font-mono-custom text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                        <i class="ph ph-quotes"></i> THE NARRATIVE
                    </div>
                    <p class="text-gray-900 leading-loose font-serif-custom text-lg italic mb-10 animate-text">"${data.details.desc}"</p>
                    ${data.link ? `<a href="${data.link}" target="_blank" rel="noopener noreferrer" class="group/link inline-flex items-center gap-4 bg-black text-white px-6 py-3 rounded-none text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl">Visit Project <i class="ph-bold ph-arrow-right group-hover/link:translate-x-2 transition-transform"></i></a>` : ''}
                </div>
                <div>
                     <div class="font-mono-custom text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                        <i class="ph ph-code"></i> TECHNICAL DEPTH
                    </div>
                    <ul class="block">${featuresHtml}</ul>
                </div>
            </div>
        `;

        header.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            const isOpen = details.classList.contains('expanded');
            document.querySelectorAll('.project-details.expanded').forEach(el => {
                el.classList.remove('expanded');
                el.parentElement.querySelector('.project-item').classList.remove('active-project');
            });
            if (!isOpen) {
                details.classList.add('expanded');
                header.classList.add('active-project');
            }
        });

        container.appendChild(header);
        container.appendChild(details);
        return container;
    } else {
        const wrapper = document.createElement('div');
        wrapper.className = type === 'education'
            ? "py-6 border-b border-gray-100 dynamic-entry smooth-entry hover:bg-gray-50 transition-colors duration-300"
            : "py-5 border-b border-gray-100 group hover:bg-gray-50 transition-colors duration-300 grid grid-cols-12 items-center gap-y-1 md:gap-y-0 dynamic-entry smooth-entry";
        wrapper.innerHTML = htmlContent;
        wrapper.style.transitionDelay = `${delay}s`;
        return wrapper;
    }
}

export function renderProjectGrid(containerId, projects) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    projects.forEach((proj, i) => {
        const delay = i * 0.1;
        const card = document.createElement('div');
        card.className = "group relative flex flex-col gap-4 dynamic-entry smooth-entry cursor-pointer";
        card.style.transitionDelay = `${delay}s`;
        const techBadges = proj.tech.split(/[,•]/).map(t => t.trim()).slice(0, 3)
            .map(t => `<span class="px-2 py-1 border border-gray-200 rounded text-[10px] text-gray-600 bg-gray-50 whitespace-nowrap">${t}</span>`)
            .join('');

        // 16:9 Aspect Ratio (aspect-video)
        card.innerHTML = `
            <div class="block overflow-hidden relative aspect-video bg-gray-100 mb-2">
                <img src="${proj.image}" alt="${proj.title}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy">
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div class="absolute top-0 right-0 bg-white text-black text-xs font-mono-custom px-3 py-1 font-bold border-b border-l border-gray-100">${proj.year}</div>
            </div>
            <div class="flex flex-col gap-1">
                <div class="flex justify-between items-start">
                    <span class="text-[10px] font-mono-custom text-gray-500 uppercase tracking-widest">${proj.category}</span>
                    <span class="text-[10px] font-mono-custom text-gray-400 uppercase tracking-widest text-right">${proj.domain}</span>
                </div>
                <h3 class="text-xl font-medium text-gray-900 group-hover:underline decoration-1 underline-offset-4 leading-tight"><span>${proj.title}</span></h3>
                <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed font-light mt-1">${proj.details.desc}</p>
                <div class="mt-2 pt-3 border-t border-gray-100 flex items-center justify-between">
                     <div class="flex flex-wrap gap-1 max-w-[85%]">${techBadges}</div>
                     <i class="ph ph-arrows-out-simple text-gray-300 group-hover:text-black transition-colors"></i>
                </div>
            </div>
        `;
        card.addEventListener('click', () => openProjectModal(i, projects));
        container.appendChild(card);
    });
}

// --- MODAL LOGIC ---
let modalCurrentIndex = 0;
let modalProjects = [];

function openProjectModal(index, projects) {
    modalCurrentIndex = index;
    modalProjects = projects;
    let modal = document.getElementById('project-modal');
    if (!modal) {
        modal = createModalDOM();
        document.body.appendChild(modal);
    }
    updateModalContent(modal, modalProjects[modalCurrentIndex]);
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('opacity-100');
        modal.querySelector('.modal-content').classList.remove('opacity-0');
        modal.querySelector('.modal-content').classList.add('opacity-100');
    }, 10);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    modal.classList.remove('opacity-100');
    modal.querySelector('.modal-content').classList.remove('opacity-100');
    modal.querySelector('.modal-content').classList.add('opacity-0');
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
}

function nextProject() {
    if (modalCurrentIndex < modalProjects.length - 1) {
        modalCurrentIndex++;
        animateModalChange('right');
    }
}

function prevProject() {
    if (modalCurrentIndex > 0) {
        modalCurrentIndex--;
        animateModalChange('left');
    }
}

function animateModalChange(direction) {
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-scroll-content');

    if (content) {
        content.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        content.style.opacity = '0';
        content.style.transform = direction === 'right' ? 'translateX(-10px)' : 'translateX(10px)';
    }

    setTimeout(() => {
        if (modalProjects[modalCurrentIndex]) {
            updateModalContent(modal, modalProjects[modalCurrentIndex]);
        }
        if (content) {
            content.style.transition = 'none';
            content.style.transform = direction === 'right' ? 'translateX(10px)' : 'translateX(-10px)';
            requestAnimationFrame(() => {
                content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                content.style.opacity = '1';
                content.style.transform = 'translate(0)';
            });
        }
    }, 200);
}

function createModalDOM() {
    const modal = document.createElement('div');
    modal.id = 'project-modal';
    modal.className = "fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-md opacity-0 transition-opacity duration-300 hidden h-dvh w-screen overscroll-none";

    modal.innerHTML = `
        <div class="absolute inset-0 z-0 cursor-pointer" id="modal-backdrop"></div>
        <button id="mobile-close-btn" class="md:hidden fixed top-4 right-4 z-200 bg-white/90 backdrop-blur-md p-3 rounded-full text-black shadow-lg border border-gray-100 active:scale-95 transition-transform" aria-label="Close Modal">
            <i class="ph-bold ph-x text-xl"></i>
        </button>
        <div class="modal-content relative z-10 w-full h-[100dvh] bg-white overflow-hidden flex flex-col md:flex-row transform opacity-0 transition-all duration-300 shadow-2xl">
            <!-- Left Panel: Image (75% Width) -->
            <div id="modal-left-panel" class="w-full md:w-3/4 h-[40%] md:h-full bg-gray-100 relative shrink-0 overflow-hidden"></div>
            <!-- Right Panel: Content (25% Width) -->
            <div class="w-full md:w-1/4 h-[60%] md:h-full flex flex-col bg-white relative z-20">
                <div class="shrink-0 h-20 border-b border-gray-100 hidden md:flex items-center justify-end px-8 bg-white/90 backdrop-blur-md sticky top-0 z-50">
                     <!-- Title Removed from Here -->
                     <button id="modal-close-desktop" class="group flex items-center gap-2 text-xs font-mono-custom uppercase tracking-widest border border-gray-200 rounded-full px-3.5 py-1 hover:text-gray-500 transition-colors cursor-pointer">
                        Close <i class="ph-bold ph-x text-xl group-hover:rotate-90 transition-transform duration-300"></i>
                    </button>
                </div>
                <div id="modal-scroll-content" class="flex-1 overflow-y-auto p-6 md:p-12 pb-24 md:pb-8 custom-scrollbar relative overscroll-contain"></div>
                <div id="modal-footer" class="shrink-0 p-4 md:p-8 border-t border-gray-100 bg-white z-50">
                     <div class="flex flex-col gap-4">
                        <a id="modal-open-project-btn" href="#" target="_blank" rel="noopener noreferrer" class="hidden w-full flex justify-center items-center gap-3 bg-black text-white px-6 py-4 text-xs font-bold font-mono-custom uppercase tracking-widest hover:bg-gray-800 transition-all group shadow-lg hover:shadow-xl hover:-translate-y-0.5 rounded-sm">
                            Open Project <i class="ph-bold ph-arrow-up-right group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                        </a>
                         <div class="flex gap-4">
                            <button id="modal-prev-btn" class="flex-1 h-12 md:h-14 flex items-center justify-center gap-2 border border-black hover:bg-black hover:text-white transition-all text-black disabled:opacity-30 disabled:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-300 disabled:cursor-not-allowed group">
                                <i class="ph ph-caret-left text-xl group-hover:-translate-x-1 transition-transform"></i>
                                <span class="font-mono-custom text-xs uppercase tracking-wider">Prev</span>
                            </button>
                            <button id="modal-next-btn" class="flex-1 h-12 md:h-14 flex items-center justify-center gap-2 border border-black hover:bg-black hover:text-white transition-all text-black disabled:opacity-30 disabled:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-300 disabled:cursor-not-allowed group">
                                 <span class="font-mono-custom text-xs uppercase tracking-wider">Next</span>
                                <i class="ph ph-caret-right text-xl group-hover:translate-x-1 transition-transform"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.querySelector('#modal-backdrop').onclick = closeProjectModal;
    modal.querySelector('#mobile-close-btn').onclick = closeProjectModal;
    modal.querySelector('#modal-close-desktop').onclick = closeProjectModal;

    // Using simple onclick to avoid duplicate listeners since this element is created ONCE
    const prevBtn = modal.querySelector('#modal-prev-btn');
    const nextBtn = modal.querySelector('#modal-next-btn');

    prevBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); prevProject(); });
    nextBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); nextProject(); });

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('hidden')) {
            if (e.key === 'Escape') closeProjectModal();
            if (e.key === 'ArrowLeft') prevProject();
            if (e.key === 'ArrowRight') nextProject();
        }
    });

    return modal;
}

function updateModalContent(modal, proj) {
    const leftPanel = modal.querySelector('#modal-left-panel');
    const scrollContent = modal.querySelector('#modal-scroll-content');
    const headerTitle = modal.querySelector('#modal-header-title');
    const openBtn = modal.querySelector('#modal-open-project-btn');
    const prevBtn = modal.querySelector('#modal-prev-btn');
    const nextBtn = modal.querySelector('#modal-next-btn');
    const isFirst = modalCurrentIndex === 0;
    const isLast = modalCurrentIndex === modalProjects.length - 1;

    if (headerTitle) {
        headerTitle.textContent = proj.title;
        headerTitle.classList.remove('opacity-0');
        requestAnimationFrame(() => headerTitle.classList.add('opacity-100'));
    }

    leftPanel.innerHTML = `
        <img src="${proj.image}" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105 relative z-0">
        <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-30 flex flex-col items-start text-left pointer-events-none">
             <h2 class="text-3xl md:text-5xl font-bold text-white leading-tight mb-2 drop-shadow-lg" style="text-shadow: 0 4px 20px rgba(0,0,0,0.5);">${proj.title}</h2>
             <span class="text-white/90 text-sm md:text-lg font-mono-custom uppercase tracking-wider drop-shadow-md" style="text-shadow: 0 2px 10px rgba(0,0,0,0.5);">${proj.category}</span>
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
    `;

    scrollContent.scrollTop = 0;
    const techStackHtml = proj.tech.split(/[,•]/).map(t => `<span class="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-mono-custom rounded-full border border-gray-100">${t.trim()}</span>`).join('');
    const featuresHtml = proj.details.features.map(f => {
        const parts = f.split(':');
        if (parts.length > 1) {
            return `<li class="mb-3 text-gray-600"><strong class="text-gray-900 font-medium">${parts[0].trim()}</strong>: ${parts.slice(1).join(':').trim()}</li>`;
        }
        return `<li class="mb-3 text-gray-600">${f}</li>`;
    }).join('');

    scrollContent.innerHTML = `
        <div class="flex justify-between items-start mb-8 border-b border-gray-100 pb-6">
            <div>
                 <span class="block text-[10px] font-mono-custom text-gray-400 uppercase tracking-widest mb-1">Year</span>
                 <span class="text-lg font-medium font-serif-custom">${proj.year}</span>
            </div>
             <div class="text-right">
                 <span class="block text-[10px] font-mono-custom text-gray-400 uppercase tracking-widest mb-1">Domain</span>
                 <span class="text-lg font-medium font-serif-custom">${proj.domain}</span>
            </div>
        </div>
        <p class="font-serif-custom text-xl md:text-lg italic text-gray-800 leading-relaxed mb-10">"${proj.details.desc}"</p>
         <div class="mb-10">
            <h4 class="font-mono-custom text-xs uppercase tracking-widest text-gray-400 mb-5 border-l-2 border-black pl-3">Key Features</h4>
            <ul class="list-disc list-inside text-sm space-y-2 leading-relaxed pl-2">${featuresHtml}</ul>
        </div>
        <div class="mb-12">
            <h4 class="font-mono-custom text-xs uppercase tracking-widest text-gray-400 mb-5 border-l-2 border-black pl-3">Tech Stack</h4>
            <div class="flex flex-wrap gap-2 pl-2">${techStackHtml}</div>
        </div>
    `;

    if (proj.link) {
        openBtn.href = proj.link;
        openBtn.classList.remove('hidden');
        openBtn.classList.add('flex');
    } else {
        openBtn.classList.add('hidden');
        openBtn.classList.remove('flex');
    }

    prevBtn.disabled = isFirst;
    nextBtn.disabled = isLast;
}

export function initParallaxHero() {
    const heroBg = document.querySelector('#hero-parallax img');
    if (!heroBg) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateParallax() {
        const scrolled = lastScrollY;
        if (scrolled < window.innerHeight * 1.5) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParallaxHero);
} else {
    initParallaxHero();
}
