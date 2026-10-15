# Sydney Moyo website — editable version

## What's included
Seven-page original-style website, editable JSON content, photo uploads folder, and a Decap CMS admin at `/admin/`. This is a working *starter*, not a configured live editing service. The homepage and other pages retain local-file fallbacks for previewing.

## Preview now
Unzip and open `index.html` to see the original design. CMS-driven changes require a web server or deployment; browsers usually block `fetch()` on `file://` URLs. To test dynamic content locally, run `python3 -m http.server 8000` in this folder and open `http://localhost:8000`.

## Publish and activate editing
1. Create a **private or public** GitHub repository and upload the files from this folder to its root. GitHub OAuth must be granted access to that repository.
2. In `admin/config.yml`, replace `YOUR_GITHUB_USERNAME/YOUR_REPOSITORY` with your actual repository path.
3. Connect the GitHub repository to Netlify, deploying the root folder as a static site (no build command required).
4. Configure a **compatible Decap CMS GitHub OAuth authentication provider**. Set `base_url` and `auth_endpoint` in `admin/config.yml` to match that provider. Netlify hosting alone does NOT supply this OAuth provider. Do not use an untrusted OAuth service or commit OAuth secrets to the repository.
5. Visit `https://YOUR-SITE.netlify.app/admin/` and sign in with GitHub. Save a test edit, confirm that it commits to the repository and appears on the live site.
6. When satisfied, connect `sydneymoyo.com` via Netlify domain settings and the DNS records your registrar requires. Do not cancel Squarespace or alter the existing domain until the new site is tested.

## Editing
Use Website Pages for home/about/teaching/contact; Research Projects, Publications, and Lab Members have add/remove controls. Images uploaded through the editor go to `/images`. You can change the placeholder images whenever you have the originals. The dragonfly SVG is a temporary stand-in for your original logo.

## Notes
The editing dashboard needs a configured GitHub OAuth provider and deployment before sign-in works. Some images are remote Unsplash placeholders. There is no backend database or ongoing hosting subscription required by the static files themselves; service pricing/limits vary.
