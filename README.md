# Startup Idea Stress Tester

A web-based tool that evaluates startup ideas with rigorous, critical VC-style analysis using Claude AI.

## Overview

This tool provides honest, evidence-based feedback on startup ideas instead of generic validation. Submit a startup concept (6 fields) and get back a structured analysis with:

- **Verdict** — strong bet, promising but flawed, or weak idea
- **Market Analysis** — opportunity, TAM, demand patterns, market risks
- **Business Assessment** — model, monetization strategy, scalability
- **Execution Difficulty** — feasibility level and critical challenges
- **Competitive Landscape** — market analysis and key differentiators
- **Recommendations** — strengths, concerns, and concrete improvements
- **Scores** — 0–10 ratings for market, business, execution, overall

## Quick Start

### 1. Add Your API Key

Create `.env.local`:

```bash
ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE
```

Get your key from [console.anthropic.com](https://console.anthropic.com).

### 2. Run

```bash
npm install
npm run dev
```

Open **http://localhost:3000**

## How It Works

1. Submit your startup idea (name, description, target users, geography, monetization strategy, stage)
2. Claude Opus 4.5 analyzes it with a 20+ year VC analyst persona
3. Analysis returns as structured JSON
4. Dashboard renders all sections with color-coded verdict banner and numeric scores
5. No data stored—results live only in your browser session

## Tech Stack

- **Next.js 14** (App Router) for frontend + serverless API
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Claude Opus 4.5** for AI analysis
- **Zod** for runtime JSON schema validation
- **React** for interactive UI

## Key Design Decisions

### Analytical Rigor
- Score reasoning explains **why NOT higher** (adversarial framing prevents inflated scores)
- Competitor analysis uses **named real companies** (no placeholders)
- Monetization gaps are flagged as **severe risks**
- Silence on competitive landscape = red flag, not a moat

### Architecture
- **API key stays server-side** — never exposed to browser
- **No database** — stateless, session-only results
- **Validation on two layers** — field validation in form + Zod schema validation on API response
- **Claude response handling** — automatically strips markdown code blocks if Claude wraps JSON

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main page (form + results toggle)
│   ├── layout.tsx            # Root layout + metadata
│   ├── globals.css           # Tailwind + theme
│   └── api/analyze/route.ts  # POST /api/analyze — Claude integration
├── components/
│   ├── IdeaForm.tsx          # 6-field input form
│   ├── ResultsDashboard.tsx  # Analysis output (all sections)
│   └── ui/                   # Reusable UI primitives (Card, Badge, Loading, Error)
├── lib/
│   ├── claude.ts             # Anthropic SDK wrapper + analyzeIdea()
│   ├── prompts.ts            # System + user prompts
│   └── schema.ts             # Zod schema for AnalysisResult
└── types/
    └── analysis.ts           # TypeScript interfaces
```

## Performance

- **API response:** 20–40 seconds (Claude Opus reasoning time)
- **First page load:** ~2 seconds
- **No caching:** Stateless — each request re-analyzes
- **Timeout:** 60 seconds on API route

## Deployment

Works on Vercel, Railway, Render, AWS Amplify, or any Node.js host.

**Required:**
- Set `ANTHROPIC_API_KEY` environment variable in hosting dashboard
- Run `npm run build` locally to verify production build succeeds

**Optional:**
- Use custom domain
- Add rate limiting if exposed publicly
- Monitor Anthropic API usage and costs

## Troubleshooting

**"Invalid x-api-key"**
- Your API key is incomplete or incorrect
- Get a fresh key from [console.anthropic.com](https://console.anthropic.com)
- Make sure .env.local exists locally (never commit it)

**"Analysis took too long"**
- Claude is working normally—20–40 seconds is typical
- API has 60-second timeout
- Check Anthropic API status if consistently failing

**"Claude returned invalid JSON"**
- Claude occasionally returns malformed JSON
- Check browser DevTools → Network → /api/analyze response
- If it shows markdown-wrapped JSON, the app's markdown stripper should handle it
- If it's still invalid, review the system prompt in src/lib/prompts.ts

**Build errors**
- Run `npm install` to ensure all dependencies
- Check TypeScript errors: `npm run type-check`
- Verify src/types/analysis.ts exports AnalysisResult

## Development

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm run type-check # TypeScript check
npm run lint       # ESLint
```

## How to Contribute

1. Review CLAUDE.md for architecture and constraints
2. Make changes in a feature branch
3. Test with `npm run build` and manual testing
4. Use semantic commit messages (feat, fix, docs, chore)
5. Push to GitHub and create a PR

## License

MIT

---

**Built with Claude AI.** Get your API key at [console.anthropic.com](https://console.anthropic.com).
