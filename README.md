# Startup Idea Stress Tester

A web-based tool that evaluates startup ideas with deep, structured, critical VC/consultant-style analysis using Claude AI.

## Overview

This tool applies rigorous, honest analysis to startup ideas instead of generic validation. It evaluates ideas across nine critical dimensions:

1. **Core Decomposition** — Problem, alternatives, value prop, and key assumptions
2. **Market Analysis** — TAM, demand frequency, willingness to pay, market type
3. **Business Model** — Revenue streams, unit economics, scalability, monetization risks
4. **Competitive Landscape** — Direct competitors, substitutes, incumbents, moat potential
5. **Execution Difficulty** — Technical complexity, regulatory, distribution, capital intensity
6. **Failure Analysis** — Top failure reasons, silent killers, blind spots, overestimated advantages
7. **Strategic Insights** — Improvements, pivots, entry wedge, conditions for venture scale
8. **Scores** — 0–10 ratings with reasoning for market attractiveness, business model strength, execution feasibility, defensibility
9. **Verdict** — "strong bet," "promising but flawed," or "weak idea" with full explanation

## Quick Start

### 1. Add Your API Key

Edit `.env.local`:

```
ANTHROPIC_API_KEY=sk-ant-YOUR_ACTUAL_KEY_HERE
```

Get your key from [console.anthropic.com](https://console.anthropic.com).

### 2. Run

```bash
npm run dev
```

Open **http://localhost:3000**

## How It Works

1. Submit a startup idea (6 form fields)
2. Claude analyzes using a specialized VC analyst persona
3. Results render with all 9 sections, 4 scores, verdict
4. No data storage — session-only

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Claude Opus 4.5
- Zod validation

## Features

- **Verdict banner** — colored by verdict (green/amber/red)
- **Score rings** — SVG progress indicators, color-graded
- **Visual hierarchy** — 2-column grid, full-width insights section
- **Loading state** — cycles through progress labels
- **Responsive design** — mobile-friendly

## Key Design Decisions

### Analytical Rigor
- Score reasoning explains why NOT higher (adversarial framing)
- Competitors must be named companies (no placeholders)
- Failure analysis includes "silent killers"
- Silence on competition = red flag

### Prompt Engineering
- System prompt enforces VC analyst persona
- Internal chain-of-thought without exposing it
- Zod validates JSON to catch hallucinations
- Max tokens 4096 for substantive output

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Main page
│   └── api/analyze/route.ts     # Claude API handler
├── components/
│   ├── IdeaForm.tsx
│   ├── ResultsDashboard.tsx
│   ├── sections/                # 9 analysis components
│   └── ui/                      # Primitives
├── lib/
│   ├── claude.ts                # Anthropic client
│   ├── prompts.ts               # Claude prompts
│   ├── schema.ts                # Zod schema
│   └── utils.ts
└── types/
    └── analysis.ts              # Interfaces
```

## Performance

- API response: 20–40 seconds (Claude Opus)
- First load: ~2 seconds
- No caching (stateless)

## Deployment

Vercel, Railway, or any Node.js host. Set `ANTHROPIC_API_KEY` env var.

## Troubleshooting

**"Invalid x-api-key"** — Your `.env.local` key is incomplete or wrong. Get a fresh key from console.anthropic.com.

**"Analysis took too long"** — Claude is slow. Try again. Route timeout is 60 seconds.

**Build errors** — Run `npm install` to ensure all dependencies are present.

---

**Next steps:** Add your API key to `.env.local` and run `npm run dev` 🚀
