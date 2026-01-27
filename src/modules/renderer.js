// --- RENDERER MODULE ---

// --- RENDERER MODULE ---

export function renderContent(appState) {
    // Render Projects
    if (document.getElementById('project-list')) {
        renderListWithLimit('project-list', appState.projects, 'project', 5);
    }

    // Render Leadership Log
    if (document.getElementById('leadership-log')) {
        renderListWithLimit('leadership-log', appState.leadership, 'leadership', 3);
    }

    // Render Committees (New)
    if (document.getElementById('committee-items')) {
        renderListWithLimit('committee-items', appState.committees, 'leadership', 3); // Reusing leadership style
    }

    // Render Skills Matrix (No limit for now, or maybe 5)
    if (document.getElementById('skill-items')) {
        renderListWithLimit('skill-items', appState.skills, 'skill', 99);
    }

    // Render Education
    if (document.getElementById('education-items')) {
        // Education usually doesn't need "See More" if it's short, but let's use the helper for consistency
        renderListWithLimit('education-items', appState.education, 'education', 99);
    }
}

/**
 * Renders a list with a "See More" button if items exceed the limit.
 * @param {string} containerId - The ID of the container element.
 * @param {Array} data - The array of data items.
 * @param {string} type - The type of item ('project', 'leadership', 'skill', etc.).
 * @param {number} limit - The number of items to show initially.
 */
function renderListWithLimit(containerId, data, type, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    // If data is empty, do nothing
    if (!data || data.length === 0) return;

    // 1. Render Initial Items
    const initialItems = data.slice(0, limit);
    initialItems.forEach((item, i) => {
        container.appendChild(createDynamicEntry(item, type, i));
    });

    // 2. Check if we need a "See More" button
    if (data.length > limit) {
        const remainingItems = data.slice(limit);

        // Create Button Container
        const btnContainer = document.createElement('div');
        btnContainer.className = "w-full flex justify-center mt-8 dynamic-entry smooth-entry";
        btnContainer.style.transitionDelay = `${0.05 * limit}s`; // Delay after last item

        const btn = document.createElement('button');
        btn.className = "group inline-flex items-center gap-2 text-xs font-mono-custom uppercase tracking-widest text-gray-500 hover:text-black transition-colors px-4 py-2 border border-gray-200 hover:border-black rounded-full";
        btn.innerHTML = `
            <span>View All (${data.length})</span>
            <i class="ph ph-arrow-down group-hover:translate-y-1 transition-transform"></i>
        `;

        btn.onclick = () => {
            // Remove button
            btnContainer.remove();

            // Render remaining items
            remainingItems.forEach((item, i) => {
                // Adjust index for delay calculation logic if needed, 
                // but usually we want them to appear sequentially after the click
                const node = createDynamicEntry(item, type, limit + i);
                // Reset delay to make them appear quickly one by one
                node.style.transitionDelay = `${0.05 * i}s`;
                // Ensure they are visible immediately (handled by CSS usually, but class helps)

                container.appendChild(node);

                // Trigger reflow/animation if needed (optional)
                setTimeout(() => node.classList.add('visible'), 10);
            });
        };

        btnContainer.appendChild(btn);
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
        else if (data.domain.includes('Web')) domainIcon = 'ph-globe';
        else if (data.domain.includes('IoT') || data.domain.includes('Farm')) domainIcon = 'ph-plant';
        else if (data.domain.includes('EdTech')) domainIcon = 'ph-student';

        // Tech Stack: Render ALL items with simple text style
        // Split by comma or bullet, trim, and filter empty
        const techStack = data.tech.split(/[,•]/).map(t => t.trim()).filter(t => t);
        const techBadges = techStack.map(t => `
            <span class="tech-badge">${t}</span>
        `).join('');

        htmlContent = `
            <div class="col-span-1 text-xs text-gray-400 font-mono-custom relative z-10 pointer-events-none flex items-center">
                <span class="mr-2 opacity-50">/ ${num}</span>
            </div>
            <div class="col-span-11 md:col-span-6 relative z-10 pointer-events-none flex items-center gap-4">
                 <i class="ph ${domainIcon} text-xl text-gray-300 transition-colors duration-300"></i>
                 <span class="text-xl md:text-2xl font-medium tracking-tight text-gray-900 group-hover:pl-2 transition-all duration-500 animate-text">${data.title}</span>
                 <span class="md:hidden text-[10px] text-gray-400 font-mono-custom ml-2 opacity-70 animate-pulse">(Tap for details)</span>
            </div>
            <div class="hidden md:flex col-span-5 md:col-span-3 flex-wrap items-center justify-start relative z-10 pointer-events-none pr-4">
                ${techBadges}
            </div>
            <div class="hidden md:flex col-span-2 text-right text-xs text-gray-400 font-mono-custom relative z-10 pointer-events-none items-center justify-end animate-text">
                ${data.domain}
            </div>
        `;
    } else if (type === 'leadership' || type === 'skill') {
        let iconClass = 'ph-caret-right';
        if (type === 'leadership') iconClass = 'ph-users';
        if (type === 'skill') iconClass = 'ph-lightning';

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
        // Education - Clean Layout (Flex Col on Mobile -> Row on Desktop)
        htmlContent = `
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-md transition-all border border-gray-100 w-full group">
                <div class="flex-1 pr-4 mb-4 md:mb-0">
                    <h4 class="text-xl font-medium mb-1 text-gray-900 flex items-center gap-2 group-hover:text-black transition-colors">
                        <i class="ph ph-graduation-cap text-gray-400 group-hover:text-black text-lg transition-colors"></i>
                        <span class="animate-text">${data.name}</span>
                    </h4>
                    <p class="text-sm font-serif-custom italic text-gray-700 ml-0 md:ml-7 leading-relaxed animate-text">${data.degree}</p>
                </div>
                <div class="w-full md:w-auto text-left md:text-right shrink-0 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 pl-0 md:pl-6 mt-2 md:mt-0">
                     <span class="block text-xs font-mono-custom text-gray-500 bg-white px-2 py-1 rounded border border-gray-200 mb-1 shadow-sm animate-text">${data.period}</span>
                     <p class="text-xs text-gray-400 flex items-center gap-1 md:justify-end animate-text"><i class="ph-fill ph-map-pin"></i> ${data.location}</p>
                </div>
            </div>
        `;
    }

    if (type === 'project') {
        const container = document.createElement('div');
        const header = document.createElement('div');
        header.className = "project-item group grid grid-cols-12 py-8 border-b border-gray-100 cursor-pointer relative transition-all duration-300 hover:border-black items-center dynamic-entry smooth-entry";
        header.innerHTML = htmlContent;

        const details = document.createElement('div');
        details.className = "project-details"; // Transition handles in CSS

        // Fix: Technical Depth Parsing - Force Block Layout
        const featuresHtml = data.details.features.map(f => {
            const parts = f.split(':');
            if (parts.length > 1) {
                const key = parts[0].trim();
                const value = parts.slice(1).join(':').trim();
                // BLOCK LAYOUT: Key on top line, value in paragraph below
                return `
                <li class="mb-5 block border-l-2 border-gray-100 pl-4">
                    <div class="mb-1">
                        <strong class="font-mono-custom text-xs uppercase tracking-widest text-gray-800 block">${key}</strong>
                    </div>
                    <div class="text-sm text-gray-600 font-light leading-relaxed animate-text">
                        ${value}
                    </div>
                </li>`;
            }
            // Standard Bullet
            return `<li class="text-sm text-gray-600 flex items-start leading-relaxed mb-3">
                <span class="mr-3 text-gray-300 mt-1.5 text-[10px]">●</span>
                <span class="animate-text">${f}</span>
            </li>`;
        }).join('');

        const detailsContent = `
            <div class="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-gray-100">
                <div class="border-r-0 md:border-r border-gray-100 pr-0 md:pr-12">
                    <div class="font-mono-custom text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                        <i class="ph ph-quotes"></i> THE NARRATIVE
                    </div>
                    <p class="text-gray-900 leading-loose font-serif-custom text-lg italic mb-10 animate-text">
                        "${data.details.desc}"
                    </p>
                    ${data.link ? `<a href="${data.link}" target="_blank" rel="noopener noreferrer" class="group/link inline-flex items-center gap-4 bg-black text-white px-6 py-3 rounded-none text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl">
                        Visit Project <i class="ph-bold ph-arrow-right group-hover/link:translate-x-2 transition-transform"></i>
                    </a>` : ''}
                </div>
                <div>
                    <div class="font-mono-custom text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                        <i class="ph ph-code"></i> TECHNICAL DEPTH
                    </div>
                    <ul class="block">
                        ${featuresHtml}
                    </ul>
                </div>
            </div>
        `;
        details.innerHTML = detailsContent;

        header.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            const isOpen = details.classList.contains('expanded');

            // Close others
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
            ? "py-4 mb-4 dynamic-entry smooth-entry"
            : "py-5 border-b border-gray-100 group hover:bg-gray-50 transition-colors duration-300 grid grid-cols-12 items-center dynamic-entry smooth-entry";

        wrapper.innerHTML = htmlContent;
        wrapper.style.transitionDelay = `${delay}s`;
        return wrapper;
    }
}
