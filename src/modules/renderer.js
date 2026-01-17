// --- RENDERER MODULE ---

export function renderContent(appState) {
    // Render Projects
    const projectList = document.getElementById('project-list');
    if (projectList) {
        projectList.innerHTML = ''; // Clean before render
        appState.projects.forEach((p, i) => {
            const item = createDynamicEntry(p, 'project', i);
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

function createDynamicEntry(data, type, index) {
    const delay = 0.05 * index;
    let htmlContent;

    if (type === 'project') {
        const num = (index + 1).toString().padStart(2, '0');

        let domainIcon = 'ph-code';
        if (data.domain.includes('Robotics') || data.domain.includes('Automation')) domainIcon = 'ph-robot';
        else if (data.domain.includes('Vision')) domainIcon = 'ph-eye';
        else if (data.domain.includes('Web')) domainIcon = 'ph-globe';
        else if (data.domain.includes('IoT') || data.domain.includes('Farming')) domainIcon = 'ph-plant';
        else if (data.domain.includes('EdTech')) domainIcon = 'ph-student';

        const techStack = data.tech.split(/,|\//).map(t => t.trim());
        const techBadges = techStack.map(t => `<span class="tech-badge">${t}</span>`).join('');

        htmlContent = `
            <div class="col-span-1 text-xs text-gray-400 font-mono-custom relative z-10 pointer-events-none flex items-center">
                <span class="mr-2">/ ${num}</span>
            </div>
            <div class="col-span-6 md:col-span-6 relative z-10 pointer-events-none flex items-center gap-3">
                 <i class="ph ${domainIcon} text-lg text-gray-400"></i>
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

    if (type === 'project') {
        const container = document.createElement('div');
        const header = document.createElement('div');
        header.className = "project-item group grid grid-cols-12 py-4 border-b border-gray-100 cursor-pointer relative dynamic-entry smooth-entry text-left items-start";
        header.style.transitionDelay = `${delay}s`;
        header.innerHTML = htmlContent;

        const details = document.createElement('div');
        details.className = "project-details";

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

        header.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;

            const isExpanded = details.classList.contains('expanded');
            document.querySelectorAll('.project-details.expanded').forEach(el => {
                if (el !== details) {
                    el.classList.remove('expanded');
                    el.previousElementSibling.classList.remove('active');
                    el.previousElementSibling.classList.remove('expanded');
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

        container.appendChild(header);
        container.appendChild(details);
        return container;
    } else {
        const wrapper = document.createElement('div');
        wrapper.className = type === 'education'
            ? "group cursor-default p-4 border border-gray-100 bg-white hover:shadow-md transition-shadow duration-300 dynamic-entry smooth-entry rounded-lg"
            : "project-item group grid grid-cols-12 py-4 border-b border-gray-100 cursor-pointer relative dynamic-entry smooth-entry text-left";

        wrapper.style.transitionDelay = `${delay}s`;
        wrapper.innerHTML = htmlContent;
        return wrapper;
    }
}
