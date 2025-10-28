# Dr. Ekta Dabaas — Portfolio (Demo)

This is a small static portfolio site for Dr. Ekta Dabaas (physiotherapist). It includes a client-side review system that stores reviews in the browser's localStorage for demo purposes.

Files
- `a.html` — main portfolio page (open this in your browser)
- `styles.css` — styling for the site
- `script.js` — review system logic (localStorage)

How to run

1. Open the file `a.html` in your web browser (double-click or use `start` from PowerShell):

```powershell
start "" "a.html"
```

2. Scroll to the "Patient Reviews" section to read seeded sample reviews and add your own.

Notes
- Reviews are stored only in the local browser where the page is opened. Clearing browser storage will remove them.
- This is a demo-only review system. For a production site, add server-side storage, spam moderation, and authentication as needed.

Next steps / suggestions
- Add server API (Node/Express, Firebase, etc.) to persist reviews centrally.
- Add image assets and a real booking/contact integration.
- Accessibility improvements: focus management, labels and better keyboard controls for star input.

Enjoy!
