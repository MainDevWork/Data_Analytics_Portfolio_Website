# Data Analytics & AI Portfolio

A static portfolio website built without frameworks or build steps, designed to showcase data analytics and AI projects. 

## Features
- **Data-Driven:** All projects and profile info are loaded from `data/projects.json`.
- **No Build Step:** Plain HTML/CSS/JS (ES modules).
- **Responsive & Accessible:** Works on all devices, respects `prefers-reduced-motion`, and is fully keyboard navigable.

## How to Add a Project

To add a new project, you do not need to touch the HTML. Simply edit `data/projects.json` and add a new object to the `projects` array:

```json
{
  "id": "unique-project-id",
  "title": "Project Title",
  "category": "data", // or "ai"
  "summary": "One line summary for the card.",
  "description": "2-3 sentences providing more detail.",
  "stack": ["Python", "SQL"],
  "repo": "https://github.com/...",
  "demo": "https://optional-live-demo.com",
  "featured": true
}
```

## Local Development

The site is designed to run from any static host or via `file://`.
*Note on `file://` access:* Browsers like Google Chrome have strict CORS policies that block `fetch()` requests for local files. If you open `index.html` directly in Chrome, the project data might not load. Firefox generally permits this. 

For the most reliable local testing:
1. Navigate to the project folder in your terminal.
2. Run a simple local server (e.g., using Python):
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.

## Deployment to GitHub Pages

1. Commit all your changes and push them to your GitHub repository's `main` branch.
2. Go to your repository settings on GitHub.
3. Navigate to **Pages** in the left sidebar.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder.
6. Click **Save**.
7. Your site will be live at `https://[username].github.io/[repo-name]/` in a few minutes.
