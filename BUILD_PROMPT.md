# Portfolio Website — Build Prompt

Paste this into Claude Code at the project root. Build incrementally; commit after each phase.

## What I'm building

A static portfolio website to showcase my GitHub repos — **data analytics projects** and **AI software projects**. I'm a Data Analyst (web dev background) based in Johannesburg. The site must be fast, easy to maintain, and let me add a new project by editing **one JSON file** — never touching markup.

## Hard constraints

- **No framework, no build step.** Plain HTML + CSS + vanilla JS (ES modules). It must open by double-clicking `index.html` or via any static host (GitHub Pages, Netlify, Cloudflare Pages).
- **Data-driven.** All projects live in `data/projects.json`. JS fetches it and renders cards. Adding a repo = adding one JSON object.
- **Two project categories:** `data` (analytics) and `ai` (AI software). Support a filter toggle: All / Data / AI.
- **Accessible & responsive.** Works down to 360px, visible keyboard focus, `prefers-reduced-motion` respected, semantic HTML, alt text.
- **No secrets in the repo.** Email/links come from the profile block in JSON.

## Architecture (keep this exact structure)

```
/
├── index.html            # single page, semantic sections
├── css/
│   └── styles.css        # design tokens as CSS vars + component styles
├── js/
│   ├── main.js           # entry: load data, wire filters
│   ├── render.js         # pure render functions (project card, profile)
│   └── data.js           # fetch + validate projects.json
├── data/
│   └── projects.json     # single source of truth (profile + projects[])
├── assets/               # favicon, og-image, any static images
└── README.md             # how to add a project, how to deploy
```

Keep render functions **pure** (data in → DOM string/node out) so they're testable and swappable. No inline styles, no inline event handlers — wire events in `main.js`.

## Data contract (`data/projects.json`)

```json
{
  "profile": {
    "name": "", "role": "", "tagline": "",
    "location": "", "github": "", "linkedin": "", "email": ""
  },
  "projects": [
    {
      "id": "kebab-case-unique",
      "title": "",
      "category": "data | ai",
      "summary": "one line for the card",
      "description": "2–3 sentences for detail",
      "stack": ["Python", "Power BI"],
      "repo": "https://github.com/...",
      "demo": "optional url or empty string",
      "featured": true
    }
  ]
}
```

`data.js` must validate each project (required: id, title, category, summary, repo) and skip + `console.warn` malformed entries rather than crash.

## Page sections (in order)

1. **Hero** — name, role, tagline, primary links (GitHub, LinkedIn, email). This is the thesis: lead with what makes me distinct as a Data Analyst, not a generic "I build things."
2. **Projects** — filter toggle (All / Data / AI), responsive card grid. Featured projects render first. Each card: title, summary, stack chips, "View repo" link, optional "Live demo".
3. **About** — short bio pulled from profile + a line on current focus (PL-300, analytics + AI).
4. **Footer** — links repeated, copyright.

## Design direction

Technical and data-literate, but warm — not a dark-terminal cliché and not the cream-paper-serif default. Pick a deliberate palette and a display/body type pairing that signals analytical precision. Use a subtle grid or measured-line motif as the signature element (it should encode something true — data/structure — not just decorate). One restrained scroll-reveal on the project grid is enough; don't over-animate.

State your design plan (palette as named hex, type pairing, layout concept, signature element) in 5 lines before coding, then build to it.

## Build order (commit between each)

1. Scaffold files + `projects.json` with my 4 real projects (SME Rise Capital Matching, Bank Customer Churn Dashboard, Telecom Churn Analysis, Investor Education Chatbot). Placeholder links I'll fill in.
2. `index.html` semantic skeleton + design tokens in `styles.css`.
3. `data.js` (fetch + validate) and `render.js` (pure renderers).
4. `main.js` — load, render, wire filter toggle + reduced-motion-aware reveal.
5. Responsive pass + accessibility pass (focus states, contrast, keyboard nav).
6. `README.md`: "Add a project" steps + GitHub Pages deploy steps.

## Acceptance checks

- Adding a JSON object renders a new card with zero markup edits.
- Filter toggle works and is keyboard-operable.
- Lighthouse: Accessibility ≥ 95, no console errors.
- Renders correctly at 360px and on desktop.
- Opens from `file://` and from a static host.

When done, print the file tree and the exact commands to preview locally and deploy to GitHub Pages.
