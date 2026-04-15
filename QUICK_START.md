# Quick Start Guide

## 1️⃣ Add Your API Key

Edit `.env.local`:

```
ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE
```

Get your key from: https://console.anthropic.com/api/keys

## 2️⃣ Run the App

```bash
npm run dev
```

## 3️⃣ Open in Browser

Visit: **http://localhost:3000**

## 4️⃣ Test It

Fill out the form with a startup idea and click "Analyze Idea"

Examples to try:
- AI tutoring platform for students
- Uber for dog walking
- Sustainable packaging for e-commerce
- B2B AI code review tool
- Community-driven fitness app

Analysis takes **20–40 seconds** (that's Claude Opus doing deep reasoning).

---

## What You Get

✅ **9 Analysis Sections:**
1. Core Decomposition (problem, alternatives, assumptions)
2. Market Analysis (TAM, demand, willingness to pay)
3. Business Model (revenue, unit economics, risks)
4. Competitive Landscape (competitors, moat, incumbent gap)
5. Execution Difficulty (technical, regulatory, distribution)
6. Failure Analysis (top risks, silent killers, blind spots)
7. Strategic Insights (improvements, pivots, entry wedge)
8. 4 Scores (0–10 with reasoning)
9. Verdict (strong bet / promising but flawed / weak idea)

✅ **Clean Dashboard:**
- Color-coded verdict banner
- Animated score rings
- Responsive grid layout
- Dark mode header

✅ **Rigorous Analysis:**
- VC-style critical feedback
- No generic platitudes
- Real named competitors
- Reasoning explains WHY scores aren't higher

---

## Troubleshooting

### "Invalid x-api-key" Error
Your API key in `.env.local` is wrong or incomplete. Get a fresh key from console.anthropic.com and paste it.

### "Analysis took too long" Error
Claude is slow. This is normal. Try again in a few minutes.

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### TypeScript Errors
Run:
```bash
npm install
npm run build
```

---

## What's Happening Behind the Scenes

1. **You submit a form** with 6 fields (idea name, description, target users, geography, monetization, stage)
2. **API call** to Claude Opus at `/api/analyze`
3. **Claude analyzes** using a specialized VC analyst prompt
4. **Zod validates** the JSON response to catch hallucinations
5. **React renders** 9 sections with color-coded insights
6. **You get honest feedback** — not cheerleading

---

## File Structure (What You Need to Know)

- `.env.local` — Your API key (critical!)
- `src/app/page.tsx` — Main UI
- `src/components/IdeaForm.tsx` — Input form
- `src/app/api/analyze/route.ts` — Claude integration
- `src/lib/prompts.ts` — The system prompt (analysis quality depends on this)
- `src/components/sections/` — 9 analysis components

---

## Next Steps

1. **Try a few ideas** and get a feel for the analysis style
2. **Share feedback** if something could be better
3. **Deploy to production** (Vercel, Railway, etc.) by setting the ANTHROPIC_API_KEY env var
4. **Optional:** Add features like PDF export, idea comparison, history

---

**Ready?** Run `npm run dev` and start stress-testing startup ideas! 🚀
