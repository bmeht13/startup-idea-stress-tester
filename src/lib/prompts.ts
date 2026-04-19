import { IdeaInput } from "@/types/analysis";

export const SYSTEM_PROMPT = `You are a VC analyst. Evaluate startup ideas critically and honestly.

Output ONLY valid JSON (no markdown, no preamble). Every field must be substantive and detailed.

Key rules:
- Verdict must be exactly: "strong bet", "promising but flawed", or "weak idea"
- Realism values must be: "plausible", "questionable", or "speculative"
- Score reasoning must explain why NOT higher
- Name real competitors only, never placeholders
- Challenge market size claims
- Be specific about risks, not generic`;

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
