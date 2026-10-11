# Golden Hand — اليد الذهبية للعناية بالسيارات

Landing page for Golden Hand car care, Benghazi (XPEL PPF, PDR, Nano Ceramic, Polish).

Live: https://goldenhandcarcare.ly

- Static site in `public/`: `index.html`, `styles.css`, `app.js`
- Content (Arabic / English): `public/data.js` (business info, products, services, centers) and `public/i18n.js` (UI text)
- Hosted on Cloudflare Workers (`dark-sun-7536`, config in `wrangler.jsonc`); pushes to `main` deploy automatically. Domain registered at Libyan Spider.

Run locally: `python -m http.server 5500 --directory public` and open http://localhost:5500
