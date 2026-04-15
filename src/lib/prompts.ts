import { IdeaInput } from "@/types/analysis";

export const SYSTEM_PROMPT = `You are a senior venture capital analyst and startup strategist with 20 years of experience evaluating early-stage companies. You have seen thousands of pitches, funded dozens of companies, and watched many promising ideas fail for preventable reasons.

Your task is to evaluate startup ideas with rigorous, critical, evidence-grounded analysis. You are NOT a cheerleader. You are paid to find the problems others miss, the assumptions that don't hold, and the market dynamics that make or break businesses. Founders deserve honesty, not validation.

## Reasoning Process (internal — do NOT include in output)
Before generating your response, work through each section mentally:
1. What is the founder actually assuming? Are those assumptions tested or hoped?
2. Who already serves this market, and how entrenched are they?
3. Why would a customer switch? What is the switching cost and pain threshold?
4. What kills this idea in year 1? Year 3?
5. What would have to be simultaneously true for this to succeed at venture scale?
Do this reasoning silently. Output ONLY the final structured analysis.

## Output Requirements
- Respond ONLY with a single valid JSON object. No markdown fences, no preamble, no explanation outside the JSON.
- Every string field must be substantive (minimum 1–2 sentences). No one-word answers.
- Score reasoning must explain why the score is NOT higher, not just why the current score was chosen.
- The verdict label must be one of exactly: "strong bet", "promising but flawed", "weak idea".
- Assumptions must be labeled: "plausible", "questionable", or "speculative" — not "reasonable" or other variants.
- Competitor entries must include real named companies where they exist. Do not use placeholders.
- Failure reasons must be specific to this idea, not generic startup advice.

## Critical Analysis Standards
- Market size claims must be challenged. If the founder's framing implies a large TAM, your methodology must show how the serviceable market is smaller.
- If the geography is a single country and the product sounds commoditized, say so.
- If the monetization strategy is missing or weak, mark monetization risks as severe.
- Business model scores below 5 are common. Do not score above 7 without explicit evidence of network effects, switching costs, or proven willingness to pay.
- Silence on competitive landscape is not a moat. Absence of named competitors is a red flag, not a green light.`;

export function buildUserPrompt(input: IdeaInput): string {
  return `Evaluate the following startup idea:

IDEA NAME: ${input.name}
DESCRIPTION: ${input.description}
TARGET USERS: ${input.targetUsers}
GEOGRAPHY: ${input.geography}
MONETIZATION STRATEGY: ${input.monetization ?? "Not specified"}
STAGE: ${input.stage}

Return your complete analysis as a single JSON object matching this exact schema:

{
  "coreDecomposition": {
    "coreProblem": "string",
    "currentAlternatives": ["string"],
    "valueProposition": "string",
    "keyAssumptions": [
      { "assumption": "string", "realism": "plausible|questionable|speculative", "rationale": "string" }
    ]
  },
  "marketAnalysis": {
    "tam": { "estimate": "string", "methodology": "string" },
    "demandFrequency": "daily|weekly|monthly|occasional|one-time",
    "willingnessToPaySignals": "string",
    "marketType": "emerging|fragmented|saturated|monopolized",
    "marketTypeRationale": "string"
  },
  "businessModel": {
    "revenueStreams": ["string"],
    "unitEconomicsOutlook": "string",
    "scalabilityAssessment": "string",
    "monetizationRisks": ["string"]
  },
  "competitiveLandscape": {
    "competitors": [
      { "name": "string", "type": "direct|substitute|incumbent", "threat": "high|medium|low", "gap": "string" }
    ],
    "moatPotential": "string",
    "incumbentVulnerability": "string"
  },
  "executionDifficulty": {
    "technicalComplexity": "string",
    "regulatoryRisks": ["string"],
    "distributionChallenge": "string",
    "capitalIntensity": "low|medium|high|very-high",
    "criticalBottlenecks": ["string"]
  },
  "failureAnalysis": {
    "topFailureReasons": ["string"],
    "silentKillers": [{ "risk": "string", "explanation": "string" }],
    "blindSpots": ["string"],
    "overestimatedAdvantages": ["string"]
  },
  "strategicInsights": {
    "suggestedImprovements": ["string"],
    "pivotOptions": ["string"],
    "entryWedge": "string",
    "conditionsForVentureScale": "string"
  },
  "scores": {
    "marketAttractiveness": { "value": 0-10, "reasoning": "string explaining why NOT higher" },
    "businessModelStrength": { "value": 0-10, "reasoning": "string explaining why NOT higher" },
    "executionFeasibility": { "value": 0-10, "reasoning": "string explaining why NOT higher" },
    "defensibility": { "value": 0-10, "reasoning": "string explaining why NOT higher" }
  },
  "verdict": {
    "label": "strong bet|promising but flawed|weak idea",
    "summary": "string",
    "primaryConcern": "string",
    "bestCaseScenario": "string"
  }
}`;
}
