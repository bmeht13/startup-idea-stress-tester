# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build production bundle
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## Project Overview

**Startup Idea Stress Tester** is a Next.js web app that analyzes startup ideas using Claude Opus 4.5 with a critical VC analyst persona. It takes a 6-field form submission and returns a compact, structured JSON analysis with verdict, market insights, business assessment, execution feasibility, competition analysis, and recommendations.

## Architecture

### Stack
- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS + Lucide icons
- **Backend:** Next.js API routes (serverless)
- **AI:** Anthropic Claude Opus 4.5 via SDK
- **Validation:** Zod (runtime JSON schema validation)
- **No database:** Stateless request/response; results live in React state

### Critical Design Constraint

**The API key never touches the browser.** All Claude API calls happen server-side in `/api/analyze/route.ts`. The frontend submits form data via POST and receives validated JSON response, which React renders directly.

### Data Flow

```
User Form (IdeaForm.tsx)
    ↓ (POST /api/analyze)
API Route (route.ts)
    ↓ (markdown stripping)
Claude API (Opus 4.5, 16K tokens)
    ↓ (JSON response)
Zod Validation (schema.ts)
    ↓
ResultsDashboard.tsx renders all fields
```

### Response Schema

The simplified AnalysisResult contains:
- **verdict** — label (strong bet | promising but flawed | weak idea) + reasoning
- **market** — opportunity, TAM estimate, demand patterns, risks array
- **business** — model, monetization, scalability assessment
- **execution** — difficulty level + challenges array
- **competition** — landscape analysis + differentiators array
- **recommendations** — strengths, concerns, improvements arrays
- **scores** — market, business, execution, overall (0-10 each)

## Key Files

### Foundation: Types & Validation
- **`src/types/analysis.ts`** — Single source of truth for AnalysisResult interface. If JSON structure changes, update here first.
- **`src/lib/schema.ts`** — Zod runtime schema validating Claude's JSON response. Enforces all required fields and minimum string lengths. Catches hallucinations before reaching UI.

### Claude Integration
- **`src/lib/prompts.ts`** — System prompt (VC analyst persona, critical framing) and `buildUserPrompt()` function (embeds JSON schema so Claude knows exact output structure).
- **`src/lib/claude.ts`** — Anthropic SDK initialization, `analyzeIdea()` function, markdown code-block stripping (handles cases where Claude wraps JSON in \`\`\`json), JSON parsing, Zod validation. Returns AnalysisResult or throws descriptive error.
- **`src/app/api/analyze/route.ts`** — POST endpoint at /api/analyze. Validates IdeaInput fields server-side, calls analyzeIdea(), returns JSON or `{ error: string }` with appropriate HTTP status. Timeout: 60s via `export const maxDuration = 60`.

### Frontend: Main Components
- **`src/app/page.tsx`** — Toggles between IdeaForm and ResultsDashboard based on React state. Header with title and tagline. No logic; orchestrator only.
- **`src/app/layout.tsx`** — Root layout, metadata, Tailwind + Geist fonts applied here.
- **`src/components/IdeaForm.tsx`** — 6-field form (name, description, targetUsers, geography, monetization optional, stage required). Controlled inputs, loading/error states. Disabled during analysis. Posts to /api/analyze on submit.
- **`src/components/ResultsDashboard.tsx`** — Single component that reads entire AnalysisResult and renders all sections in one page. Score boxes grid, card-based sections for each analysis area. Reset button returns to form.

### UI Primitives
- **`src/components/ui/SectionCard.tsx`** — Reusable card wrapper with title, optional icon, children. Border and padding.
- **`src/components/ui/ErrorBanner.tsx`** — Red alert with icon, message, optional retry button.
- **`src/components/ui/LoadingState.tsx`** — Animated dots, cycling status messages every 5 seconds. Makes 20–40s Claude wait feel intentional.
- **`src/components/ui/Badge.tsx`** — Simple badge component (used in older code, can be removed if not imported).

## Important Constraints & Patterns

### Type Safety
- TypeScript in strict mode. No `any` types.
- `src/types/analysis.ts` is the single source of truth. Changes to AnalysisResult structure must update:
  1. `types.ts` (interfaces)
  2. `schema.ts` (Zod validation)
  3. `prompts.ts` (JSON schema in user prompt)
  4. `ResultsDashboard.tsx` (rendering logic)

### Claude Prompt Engineering
- **System prompt:** Locked-in VC analyst persona. Enforces critical, evidence-based reasoning. Don't weaken.
- **JSON schema in user prompt:** Claude must output exactly this structure. Schema is embedded inline in the user prompt message.
- **Markdown handling:** Claude sometimes wraps JSON in \`\`\`json code blocks. `src/lib/claude.ts` strips these before JSON.parse().
- **Named competitors required:** If competition landscape is blank, that's a red flag. Prompts enforce real company names, not placeholders.

### Validation
- Zod validates every Claude response before it reaches React.
- If validation fails, API returns `{ error: "schema validation failed: ..." }` with 400 status.
- Never skip validation or assume Claude returned perfect JSON.

### Performance
- Claude Opus takes 20–40 seconds. No caching; no streaming (full JSON must arrive before parsing).
- First page load: ~2 seconds.
- max_tokens: 16000 (enough for full response with verbose reasoning).
- Timeout: 60 seconds on API route.

### No Database
- Results exist only in React state during session.
- Page refresh resets to form.
- This is intentional: stateless, no privacy concerns, no storage costs.

## Development Workflow

### Modifying the Analysis Structure
1. Update `src/types/analysis.ts` (AnalysisResult interface)
2. Update `src/lib/schema.ts` (Zod schema to match)
3. Update `src/lib/prompts.ts` (embed new JSON schema in user prompt)
4. Update `src/components/ResultsDashboard.tsx` (rendering logic for new fields)
5. Test with `npm run dev` and submit a test idea
6. Verify `npm run build` passes

### Updating Prompts
- System prompt: `src/lib/prompts.ts`, top (SYSTEM_PROMPT constant)
- User prompt: `src/lib/prompts.ts`, buildUserPrompt() function
- Both are string templates; they can reference input fields directly
- After changes, test locally with `npm run dev` using the form
- If Claude stops producing valid JSON, check browser network tab → /api/analyze → response to see raw output

### Debugging JSON Errors
1. Open browser DevTools → Network tab
2. Submit a test idea and look for /api/analyze POST request
3. Check the response preview to see raw Claude output
4. If it's markdown-wrapped, the stripping regex in `src/lib/claude.ts` should handle it
5. If it's malformed JSON, the error message from Zod will indicate what failed validation

### Testing Locally
- `npm run dev` starts on localhost:3000
- Try with a few different startup ideas (ambiguous markets, missing monetization, regulatory concerns)
- Check that verdict color matches label (green = strong bet, amber = promising but flawed, red = weak idea)
- Verify score box displays numbers and all recommendation arrays populate

## Before Committing

- `npm run type-check` — zero TypeScript errors
- `npm run build` — production build succeeds with no errors
- Test form submission with at least one idea
- Verify rendered output displays all sections without crashes

## Important Notes

### Never
- Expose ANTHROPIC_API_KEY in code; .gitignore protects .env.local
- Use `any` or bypass TypeScript checks
- Commit .env.local to git
- Change JSON schema without updating all 4 files listed above
- Add server-side caching without understanding stateless design

### Always
- Keep types.ts, schema.ts, prompts.ts, and ResultsDashboard.tsx in sync
- Test with `npm run build` before pushing
- Use semantic commit messages: feat, fix, refactor, docs, chore, style

## Common Issues & Fixes

**Form won't submit:** Check browser console for fetch errors. Verify .env.local has ANTHROPIC_API_KEY. Check that API key has correct format (sk-ant-...).

**"Claude returned invalid JSON":** Claude may have wrapped response in markdown code blocks or hallucinated wrong structure. Check network tab response. If consistently failing, review system/user prompts in `src/lib/prompts.ts` for clarity.

**Build fails with TypeScript errors:** Likely mismatch between types.ts, schema.ts, and prompts.ts. Ensure AnalysisResult interface matches Zod schema and user prompt JSON structure.

**Analysis times out (>60s):** Claude is occasionally slow. This is normal. If consistently failing, check Anthropic API status.

## Deployment

- Set `ANTHROPIC_API_KEY` env var in hosting dashboard (Vercel, Railway, etc.)
- `npm run build` locally to verify production build
- No additional config needed; stateless app
- First request to new deployment may be slow (cold start)

---

**Repository:** https://github.com/bmeht13/startup-idea-stress-tester
**Model Used:** Claude Opus 4.5 (via Anthropic SDK)
