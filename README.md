# Fortnite Dashboard — Lemoncasting

A minimal web dashboard for Fortnite player stats, powered by [fortnite-api.com](https://fortnite-api.com).

## Features
- Lifetime overview stats (wins, K/D, win rate, etc.)
- Breakdown by mode (Solos, Duos, Squads, LTM)
- Current season stats
- Mobile + desktop friendly

## Deploy to Netlify

### Option A — Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Option B — Drag & Drop
1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag the entire project folder onto the deploy zone
3. Done — Netlify auto-detects `netlify.toml`

### Option C — GitHub
1. Push this folder to a GitHub repo
2. Connect the repo in Netlify → it will auto-deploy on every push

## Local Dev
```bash
npm install -g netlify-cli
netlify dev
```
Then open `http://localhost:8888`

## Project Structure
```
/
├── index.html                  # The dashboard UI
├── netlify.toml                # Netlify config + redirect rules
└── netlify/
    └── functions/
        └── stats.js            # Serverless function — proxies fortnite-api.com
```

## Notes
- No API key needed — fortnite-api.com is free and open for these endpoints
- Stats only show if the Epic account's privacy is set to public
- The Netlify function avoids CORS issues by proxying on the server side
