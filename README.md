# PropCopy AI — Real Estate Content Generator

AI-powered tool for US real estate agents. Generates listing descriptions, buyer follow-up emails, and social captions instantly.

## Tech Stack
- Frontend: Vanilla HTML/CSS/JS (no build step needed)
- Backend: Vercel Serverless Function (Node.js)
- AI: Groq API — Llama 3.3 70B (FREE tier: 14,400 req/day)

---

## Deploy in 5 Minutes (Free)

### Step 1 — Get your free Groq API key
1. Go to https://console.groq.com/keys
2. Sign up with Google (one click)
3. Click "Create API Key" and copy it

### Step 2 — Upload to GitHub
1. Go to https://github.com and create a new repository (name it "propcopy-ai")
2. Upload all these files keeping the same folder structure:
   - `api/generate.js`
   - `public/index.html`
   - `vercel.json`

### Step 3 — Deploy to Vercel (free)
1. Go to https://vercel.com and sign up with GitHub
2. Click "Add New Project" → import your "propcopy-ai" repo
3. Click Deploy (default settings are fine)

### Step 4 — Add your Groq API key
1. In Vercel dashboard → your project → Settings → Environment Variables
2. Add: Name = `GROQ_API_KEY`, Value = your key from Step 1
3. Click Save → go to Deployments → click the 3 dots → Redeploy

Your app is now live at: https://propcopy-ai.vercel.app (or similar URL)

---

## How to Sell This
- Cold email US real estate agents on LinkedIn
- Charge $49–99/month per agent
- Offer white-label for brokerages at $300–500 one-time
