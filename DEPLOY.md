# Deploying jacksonlutton.com

The site is plain HTML/CSS/JS with no build step. Netlify watches the GitHub repo and deploys automatically.

## Flow

1. **Branch** — never commit straight to `main`. Create a branch (e.g. `site-overhaul`, `fix-typo`).
2. **Push** — every push to a non-`main` branch triggers a **Netlify deploy preview**. The preview URL shows up on the GitHub PR (and in the Netlify dashboard). The live site is untouched.
3. **PR** — open a pull request from your branch into `main`. Check the deploy preview, ideally on a phone too.
4. **Merge** — merging into `main` triggers a production deploy. The live site updates in about a minute.

## Local preview

From the repo root:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. All paths in the site are root-relative (`/css/styles.css`, `/projects/...`), so serve from the repo root, not a subfolder.

## Files Netlify cares about

- `netlify.toml` — publish directory and security/cache headers
- `_redirects` — `/projects` → `/projects/index.html`, everything unmatched → `404.html`
- `sitemap.xml` / `robots.txt` — SEO; add new pages to the sitemap when you create them

## Adding a project page

Copy `projects/_template.html` to `projects/<slug>.html`, fill in the bracketed placeholders, add a card to `projects/index.html`, and add the URL to `sitemap.xml`.
