# Ridoy — Digital Marketing Portfolio

A static portfolio inspired by the supplied white-and-blue editorial reference. Includes a responsive layout, portrait cutout, light/dark toggle, menu, service links, experience, products, community, FAQ, and contact links.

## Upload to your existing GitHub repository

1. Extract `ridoy-portfolio-github.zip` on your computer.
2. Open https://github.com/mohanhridoy/mohanhridoy.github.io.
3. Choose **Add file → Upload files**.
4. Drag in **all the extracted files**. Upload these files at the repository root; do not upload the ZIP or an extra enclosing folder.
5. Commit the changes to `main`. This replaces the existing `index.html` and adds the new CSS, JavaScript, and images. The old `photo.jpg` is removed by this update.
6. If your existing GitHub Pages site already publishes from `main` and `/ (root)`, the update deploys automatically. Otherwise select these under **Settings → Pages → Deploy from a branch**.
7. Wait for the Pages deployment to finish, then visit https://mohanhridoy.github.io/. Hard-refresh if you see the old version.

## Files

- `index.html` — content, page structure, and metadata
- `style.css` — layout, colors, typography, and responsive styles
- `script.js` — theme toggle and navigation
- `portrait.png` — transparent cutout from your newly supplied photo, used in the hero
- `favicon.svg` — browser icon
- `photo.png` — your newly supplied photo, used for the social preview

No build, npm installation, paid service, API key, or backend is required. You can double-click `index.html` to preview locally. Fonts load from Google Fonts when online; system fonts are used as fallbacks. Contact buttons open email, telephone, or LinkedIn.

## Editing

Edit text in `index.html`. Change the main blue using `--blue` near the top of `style.css`. Update the email/phone/LinkedIn links in `index.html` when needed. The experience, dates, product names, contact details, and headline metrics were retained from your existing portfolio. No invented testimonials, case-study results, or prices were added.

The cutout was prepared from your newly supplied photo with the built-in image generation tool. See `ASSET-NOTES.md` for its editing prompt.
