# CLAUDE.md — jacksonlutton.com

## What this is
Personal IT portfolio for Jackson Lutton, IT support / helpdesk technician at an MSP in the Dallas–Fort Worth, TX area.
Audience: hiring managers and IT leads. Tone: clear, practical, confident — not salesy.

## Stack — do not change
- Vanilla HTML/CSS/JS only. No frameworks, no build step, no npm.
- Hosted on Netlify from the `main` branch of this repo. Deploy previews on every branch push.
- Keep the existing palette and fonts. Extract them into CSS variables in `css/styles.css`.
  - Palette: `--navy #1e3a5f`, `--blue #2563eb`, `--blue-light #3b82f6`, `--blue-pale #93c5fd` (small text on navy), `--slate #5a6b82` (body text; darkened from #64748b to pass 4.5:1 on gray), `--gray #f1f5f9`, `--white #ffffff`, `--dark #0f172a`, `--border #e2e8f0`.
  - Fonts: Playfair Display (headings/serif accents) + DM Sans (body), loaded from Google Fonts.

## Structure
/index.html            — home
/projects/index.html   — projects grid
/projects/<slug>.html  — one case study per project
/about.html            — bio + resume summary
/404.html
/css/styles.css        — single stylesheet, CSS variables at top
/js/main.js            — nav toggle, accordion, lightbox, small enhancements only
/assets/images/         — photos (fishing/golf/outdoors already present; add screenshots as <slug>-01.png etc. if missing)
/assets/resume/         — resume PDF

## Projects (case studies)
Keep all of these — they're not mutually exclusive:
- **Existing work projects** (real, already shipped at the MSP): Azure AD & Intune Migration, Network Switch Replacement, Uniflow Cloud Print Migration.
- **Personal/homelab projects** (hands-on practice building the same skills used at the MSP): Proxmox homelab (running), Home Assistant apartment build (in progress), Smart mirror (**planned — not started**; always show it under "Up next"/"Planned", never as built).

## Status language
Project status is shown with `.status-chip` classes: `status-done` (Completed — client work), `status-live` (Running), `status-active` (In Progress / Studying / Next Stage), `status-planned` (dashed outline). The home page's "Up Next" roadmap is the single place upcoming projects live; add new ones there and to `/projects/index.html` with a Planned chip.

## Things Jackson set deliberately — don't undo
- Hero status card says **"Currently Employed"** (he changed it from "Open to Roles" in April 2026).
- Contact section has a **Formspree form** (`https://formspree.io/f/mbdqzdbb`) plus a phone card (469-531-2963). The CSP in `netlify.toml` allow-lists formspree.io in `connect-src` and `form-action` — keep that if the CSP changes.
- Scroll-reveal (`.reveal` + delay classes) is his; it only hides content under `@media (scripting: enabled)` so no-JS visitors still see everything.
- Always `git fetch` and check `origin/main` before branching or merging — he commits from the GitHub web UI too.

## Home page = landing page
Order is fixed: Hero → What I Work With → What I've Done (client work) → What I'm Building (homelab) + Up Next roadmap → About teaser → Contact. Keep it simple: no paragraph over three sentences, no new sections without a reason.

## Rules
- Every page shares the same header nav and footer. Put them in each file (no JS includes) and keep them byte-identical.
- Mobile first. Test at 375px and 1280px.
- Semantic HTML, one <h1> per page, real <nav>, <main>, <footer>.
- Each project page uses the case-study template in /projects/_template.html.
- Local preview: `python3 -m http.server 8000` from repo root.
- Never push to `main` directly. Work on `site-overhaul`; merge via GitHub PR.
- When a task is done, list the files changed and what to check in the deploy preview.
