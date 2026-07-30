import { fetchPortfolioData, normalizeCategory } from './data.js';
import { renderHero, renderProjectCard, renderAbout, renderFooter } from './render.js';

document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchPortfolioData();
    
    // Elements
    const heroSection = document.getElementById('hero');
    const projectsGrid = document.getElementById('projects-grid');
    const aboutSection = document.getElementById('about-section');
    const footer = document.getElementById('footer');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Render static profile sections
    if (data.profile) {
        if (data.profile.siteTitle) {
            document.title = data.profile.siteTitle;
        }
        heroSection.innerHTML = renderHero(data.profile);
        aboutSection.innerHTML = renderAbout(data.profile);
        footer.innerHTML = renderFooter(data.profile);
    }
    
    // Render projects
    const renderProjects = (projectsToRender, label) => {
        if (projectsToRender.length === 0) {
            projectsGrid.innerHTML = `<p class="projects-empty">No ${label} projects yet.</p>`;
            return;
        }
        projectsGrid.innerHTML = projectsToRender.map(renderProjectCard).join('');
        initScrollReveal();
    };

    // Show only the projects in the selected category; 'all' shows every project.
    const applyFilter = (filterValue, label) => {
        const filter = normalizeCategory(filterValue);
        const filtered = filter === 'all'
            ? data.projects
            : data.projects.filter(p => p.category === filter);
        renderProjects(filtered, label);
    };

    renderProjects(data.projects, 'All');

    // Filtering logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            applyFilter(btn.getAttribute('data-filter'), btn.textContent.trim());
        });
    });
});

// Reduced-motion-aware scroll reveal
function initScrollReveal() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // CSS handles static display

    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(revealCallback, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });
    
    revealElements.forEach(el => observer.observe(el));
}
