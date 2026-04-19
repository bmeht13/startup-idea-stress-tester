# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build production bundle
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm test             # Run tests (if configured)
```

## Project Overview

**Startup Idea Stress Tester** is a Next.js web app that analyzes startup ideas using Claude Opus 4.5 AI with a VC analyst persona. It evaluates ideas across 9 analytical dimensions and returns a structured JSON response that renders as an interactive dashboard.

## Architecture

### Stack
- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS + Lucide icons
- **Backend:** Next.js API routes (serverless)
- **AI:** Anthropic Claude Opus 4.5 via SDK
- **Validation:** Zod (runtime JSON schema validation)
- **No database:** Stateless request/response; results live in React state

### Critical Design Constraint

**The API key never touches the browser.** All Claude calls happen server-side in `/api/analyze/route.ts`. The frontend submits form data to the POST endpoint, which returns the complete analysis JSON.

### Data Flow

```
User Form (IdeaForm.tsx)
    ↓ (POST /api/analyze)
API Route (route.ts)
    ↓
Claude API (Opus 4.5)
    ↓ (JSON response)
Zod Validation (schema.ts)
    ↓
ResultsDashboard.tsx
    ↓
9 Section Components render JSON
```

## Key Files

### Foundation: Types & Validation
- **`src/types/analysis.ts`** — Single source of truth for all TypeScript interfaces (AnalysisResult, all 9 sections, Score, Verdict, etc.). If JSON structure changes, update here first.
- **`src/lib/schema.ts`** — Zod runtime schema that validates Claude's JSON response. Catches hallucinations before they reach the UI. Must stay in sync with types.

### Claude Integration
- **`src/lib/prompts.ts`** — Two parts:
  1. **System prompt:** Enforces VC analyst persona (20+ years experience), instructs internal reasoning without exposing it, mandates score reasoning explains why NOT higher, requires named competitors
  2. **User prompt builder:** Embeds complete JSON schema inline so Claude knows exact output structure
- **`src/lib/claude.ts`** — Anthropic SDK client, `analyzeIdea()` function, JSON parsing + validation
- **`src/app/api/analyze/route.ts`** — POST endpoint, validates required fields, calls analyzeIdea(), returns JSON or error. Timeout: 60s.

### Frontend: Main Entrypoint
- **`src/app/page.tsx`** — Toggles between IdeaForm and ResultsDashboard based on React state. Header styling, layout scaffold.
- **`src/app/layout.tsx`** — Root layout, globals.css, Tailwind config applied here.

### Components: Input
- **`src/components/IdeaForm.tsx`** — 6-field form (name, description, targetUsers, geography, monetization, stage). Controlled inputs, fetch call to /api/analyze, loading/error state management. Min 50 chars for most fields.

### Components: Display
- **`src/components/ResultsDashboard.tsx`** — Orchestrates all 9 sections. Passes `result` JSON to each section component. Includes reset button.
- **`src/components/sections/*.tsx`** — 9 section components. Each reads one nested object from AnalysisResult and renders it. No logic; pure presentation.
  - `Verdict.tsx` — Colored banner (green/amber/red based on verdict label)
  - `ScoreCard.tsx` — 4 SVG score rings (0–10) with color gradients
  - `CoreDecomposition.tsx` — Problem, alternatives, value prop, assumptions w/ realism badges
  - `MarketAnalysis.tsx` — TAM, demand frequency, market type, WTP
  - `BusinessModel.tsx` — Revenue streams, unit economics, scalability, monetization risks (darker red-tinted background)
  - `CompetitiveLandscape.tsx` — Named competitors, threat levels, moat, incumbent gaps
  - `ExecutionDifficulty.tsx` — Technical, regulatory, distribution, capital intensity, bottlenecks
  - `FailureAnalysis.tsx` — Top failure reasons, expandable silent killers, blind spots, overestimated advantages. Darker card background.
  - `StrategicInsights.tsx` — Improvements, pivots, entry wedge, venture scale conditions

### Components: UI Primitives
- **`src/components/ui/SectionCard.tsx`** — Reusable card wrapper w/ title, optional icon, children
- **`src/components/ui/ScoreRing.tsx`** — SVG circular progress 0–10, color-graded (red→amber→yellow→green)
- **`src/components/ui/Badge.tsx`** — Status badge for assumption realism (plausible/questionable/speculative)
- **`src/components/ui/LoadingState.tsx`** — Animated skeleton, cycles through 5 labels every 5 seconds. Makes 20–40s wait feel intentional.
- **`src/components/ui/ErrorBanner.tsx`** — Red alert banner w/ error message + retry button

## Important Constraints & Patterns

### Type Safety
- TypeScript in strict mode. No `any` types.
- `src/types/analysis.ts` is the single source of truth. If you need a new field, add it to types first, then update schema.ts, then prompts.ts.

### Claude Prompt Engineering
- **System prompt is locked in behavior.** It enforces the VC analyst persona and specific reasoning constraints. Don't weaken score logic or allow placeholder competitors.
- **JSON schema is embedded in user prompt.** Claude must output exactly this structure or validation fails.
- **Score reasoning must explain why NOT higher.** This is adversarial framing; it prevents inflated scores.
- **Named competitors required.** No "similar companies" or "competitors like X"; use real company names.

### Validation
- Zod validates every response from Claude before it reaches React.
- If validation fails, the API returns `{ error: "Invalid response structure" }` with 400 status.
- Never silently skip validation or assume Claude returned valid JSON.

### Performance
- Claude Opus takes 20–40 seconds. No caching; no streaming (JSON must be complete).
- First page load: ~2 seconds.
- Timeout: 60 seconds on API route (set via `export const maxDuration = 60`).

### No Database
- Results live only in React state during the session.
- Refreshing the page resets to the form.
- This is intentional: stateless, no privacy concerns, no storage costs.

## Development Workflow

### Adding a New Analysis Dimension
1. Add new interface to `src/types/analysis.ts`
2. Add it to `AnalysisResult` interface
3. Update `src/lib/schema.ts` with Zod validation
4. Add it to user prompt in `src/lib/prompts.ts` (JSON schema + description)
5. Update system prompt if new reasoning constraints needed
6. Create `src/components/sections/NewSection.tsx` that reads the data and renders it
7. Import and add to `ResultsDashboard.tsx`

### Updating the Prompt
- System prompt: `src/lib/prompts.ts`, top of file
- User prompt: `src/lib/prompts.ts`, `buildUserPrompt()` function
- Both are strings; they embed the complete JSON schema
- After changes, test with a curl POST to `/api/analyze` or use the form in dev

### Fixing a Validation Error
1. Check the error message from the API response
2. Run the form again and capture Claude's actual JSON in the network tab
3. Compare against schema in `src/lib/schema.ts`
4. Update schema or types to match reality
5. Re-test

### Responsive Design
- Tailwind breakpoints: `sm`, `md`, `lg` (used in section grids)
- Mobile: stack to 1 column. Desktop: 2-column grid
- See `ResultsDashboard.tsx` for layout

## Testing & Verification

**Before committing:**
- `npm run type-check` — zero TypeScript errors
- `npm run build` — production build succeeds
- Manually test in dev server with 2–3 startup ideas (at least one with obvious flaws)
- Verify all 9 sections render with substantive content
- Check loading state cycles through labels
- Check verdict banner color matches verdict label

**Common test ideas:**
- "Uber for dog walking" — well-known startup, clear market, moderately executed
- "AI for weather prediction" — ambiguous TAM, execution concerns
- "Blockchain healthcare" — regulatory red flag, buzz word combo

## Important Notes

### Never
- Expose the ANTHROPIC_API_KEY in code, .gitignore protects .env.local
- Use `any` or bypass TypeScript checks
- Modify the system prompt to weaken VC skepticism
- Add database/storage without user request
- Change the JSON schema without updating types first

### Always
- Keep types.ts, schema.ts, and prompts.ts in sync
- Test with `npm run build` before pushing
- Validate all external data (form inputs are user-facing; treat as untrusted)
- Use semantic commit messages (feat, fix, docs, chore)

## Debugging

**"Analysis took too long"** — Claude is slow (20–40s normal). Check API logs. Timeout is 60s.

**Zod validation error** — Claude hallucinated or changed schema. Inspect the error, check Claude's actual output in network tab, update schema.

**Build fails with TypeScript errors** — Run `npm install` to ensure dependencies. Check `src/types/analysis.ts` for missing exports.

**Form won't submit** — Check browser console for fetch errors. Verify .env.local has ANTHROPIC_API_KEY. Check API route logs.

## Deployment

- Set `ANTHROPIC_API_KEY` env var (Vercel, Railway, etc. dashboard)
- `npm run build` locally to verify
- Push to main branch; CI/CD deploys
- No special setup needed; stateless app

---

**Repository:** https://github.com/bmeht13/startup-idea-stress-tester
