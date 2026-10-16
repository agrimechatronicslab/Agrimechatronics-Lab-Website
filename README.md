# Agri Mechatronics — GitHub Pages

## How to deploy

1. Create a new GitHub repository (e.g. `agrimechatronics`).
2. Upload **all files in this folder** to the repository root (keep the folder structure: `assets/`, `uploads/`, `index.html`, `news.html`, `support.js`, `image-slot.js`).
3. In the repo: **Settings → Pages → Source: Deploy from a branch → Branch: main, folder: / (root) → Save**.
4. Wait ~1 minute. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

Notes
- `index.html` is the main website (it loads `support.js` — keep them together).
- `news.html` is embedded inside the main page; it also works standalone.
- The "Active Research Projects" section renders a LiDAR-style 3D terrain flythrough. It loads three.js from a CDN (`unpkg.com`) at runtime — GitHub Pages is online, so this works out of the box. If the CDN is ever blocked, the section still shows the research cards over a dark stage (it fails gracefully).
- If videos are over 100 MB GitHub will reject them — none here should be, but if one is, compress it or use Git LFS.
