# CLAUDE.md — jacksonlutton.com

## What this is
Personal IT portfolio for Jackson Lutton, IT support / helpdesk technician at an MSP in the Dallas–Fort Worth, TX area.
Audience: hiring managers and IT leads. Tone: clear, practical, confident — not salesy.

## Stack — do not change
- Vanilla HTML/CSS/JS only. No frameworks, no build step, no npm.
- Hosted on Netlify from the `main` branch of this repo. Deploy previews on every branch push.
- Keep the existing palette and fonts. Extract them into CSS variables in `css/styles.css`.
  - Palette: `--navy #1e3a5f`, `--blue #2563eb`, `--blue-light #3b82f6`, `--slate #64748b`, `--gray #f1f5f9`, `--white #ffffff`, `--dark #0f172a`, `--border #e2e8f0`.
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
- **Personal/homelab projects** (hands-on practice building the same skills used at the MSP): Proxmox homelab, Home Assistant apartment build, Smart mirror (in progress).

## Rules
- Every page shares the same header nav and footer. Put them in each file (no JS includes) and keep them byte-identical.
- Mobile first. Test at 375px and 1280px.
- Semantic HTML, one <h1> per page, real <nav>, <main>, <footer>.
- Each project page uses the case-study template in /projects/_template.html.
- Local preview: `python3 -m http.server 8000` from repo root.
- Never push to `main` directly. Work on `site-overhaul`; merge via GitHub PR.
- When a task is done, list the files changed and what to check in the deploy preview.
