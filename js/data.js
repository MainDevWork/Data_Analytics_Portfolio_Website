export async function fetchPortfolioData() {
    try {
        const response = await fetch('./data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return validateData(data);
    } catch (error) {
        console.error("Failed to load portfolio data:", error);
        return { profile: {}, projects: [] };
    }
}

function validateData(data) {
    const validProjects = [];
    
    if (!data.projects || !Array.isArray(data.projects)) {
        console.warn("Invalid or missing 'projects' array in data.");
        data.projects = [];
    }

    data.projects.forEach(project => {
        // Required: id, title, category, summary, repo
        if (project.id && project.title && project.category && project.summary && project.repo) {
            // Canonicalise the category so filtering is not sensitive to casing
            // or stray whitespace in the source JSON.
            validProjects.push({ ...project, category: normalizeCategory(project.category) });
        } else {
            console.warn(`Skipping malformed project entry:`, project);
        }
    });
    
    data.projects = validProjects;
    
    // Sort so featured projects are first
    data.projects.sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1));
    
    return data;
}

export function normalizeCategory(value) {
    return value.toString().trim().toLowerCase();
}
