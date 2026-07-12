export function renderHero(profile) {
    return `
        <h1>${escapeHTML(profile.name)}</h1>
        <div class="role">${escapeHTML(profile.role)}</div>
        <p>${escapeHTML(profile.tagline)}</p>
        <ul class="social-links">
            ${profile.github ? `<li><a href="${escapeHTML(profile.github)}" target="_blank" rel="noopener noreferrer">GitHub</a></li>` : ''}
            ${profile.linkedin ? `<li><a href="${escapeHTML(profile.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>` : ''}
            ${profile.email ? `<li><a href="mailto:${escapeHTML(profile.email)}">Email</a></li>` : ''}
        </ul>
    `;
}

export function renderProjectCard(project) {
    const stackHTML = project.stack 
        ? project.stack.map(tech => `<span class="stack-chip">${escapeHTML(tech)}</span>`).join('') 
        : '';

    const demoLink = project.demo 
        ? `<a href="${escapeHTML(project.demo)}" target="_blank" rel="noopener noreferrer">Live Demo</a>` 
        : '';

    return `
        <article class="project-card reveal" data-category="${escapeHTML(project.category)}">
            <div class="card-header">
                <h3 class="project-title">${escapeHTML(project.title)}</h3>
                <span class="project-category">${escapeHTML(project.category)}</span>
            </div>
            <p class="project-summary">${escapeHTML(project.summary)}</p>
            <p class="project-desc">${escapeHTML(project.description)}</p>
            <div class="project-stack">
                ${stackHTML}
            </div>
            <div class="project-links">
                <a href="${escapeHTML(project.repo)}" target="_blank" rel="noopener noreferrer">View Repo</a>
                ${demoLink}
            </div>
        </article>
    `;
}

export function renderAbout(profile) {
    return `
        <div class="about-content">
            <h2>About</h2>
            <p>I'm ${escapeHTML(profile.name)}, a ${escapeHTML(profile.role)} based in ${escapeHTML(profile.location)}.</p>
            <p>My background in web development equips me with a unique approach to data analysis — I don't just find the insights, I build the tools and dashboards that make them accessible and actionable.</p>
        </div>
    `;
}

export function renderFooter(profile) {
    const currentYear = new Date().getFullYear();
    return `
        <ul class="social-links">
            ${profile.github ? `<li><a href="${escapeHTML(profile.github)}" target="_blank" rel="noopener noreferrer">GitHub</a></li>` : ''}
            ${profile.linkedin ? `<li><a href="${escapeHTML(profile.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>` : ''}
            ${profile.email ? `<li><a href="mailto:${escapeHTML(profile.email)}">Email</a></li>` : ''}
        </ul>
        <div class="footer-text">
            &copy; ${currentYear} ${escapeHTML(profile.name)}. All rights reserved.
        </div>
    `;
}

// Simple HTML escaper to prevent XSS
function escapeHTML(str) {
    if (!str) return '';
    return str.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
