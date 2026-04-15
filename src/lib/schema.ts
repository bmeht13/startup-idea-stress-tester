import { z } from "zod";

export const AssumptionSchema = z.object({
  assumption: z.string().min(10),
  realism: z.enum(["plausible", "questionable", "speculative"]),
  rationale: z.string().min(10),
});

export const ScoreSchema = z.object({
  value: z.number().min(0).max(10),
  reasoning: z.string().min(20),
});

export const AnalysisResultSchema = z.object({
  coreDecomposition: z.object({
    coreProblem: z.string().min(20),
    currentAlternatives: z.array(z.string().min(5)).min(1),
    valueProposition: z.string().min(20),
    keyAssumptions: z.array(AssumptionSchema).min(3),
  }),
  marketAnalysis: z.object({
    tam: z.object({
      estimate: z.string().min(10),
      methodology: z.string().min(20),
    }),
    demandFrequency: z.enum([
      "daily",
      "weekly",
      "monthly",
      "occasional",
      "one-time",
    ]),
    willingnessToPaySignals: z.string().min(20),
    marketType: z.enum(["emerging", "fragmented", "saturated", "monopolized"]),
    marketTypeRationale: z.string().min(20),
  }),
  businessModel: z.object({
    revenueStreams: z.array(z.string().min(5)).min(1),
    unitEconomicsOutlook: z.string().min(20),
    scalabilityAssessment: z.string().min(20),
    monetizationRisks: z.array(z.string().min(10)).min(1),
  }),
  competitiveLandscape: z.object({
    competitors: z.array(
      z.object({
        name: z.string().min(2),
        type: z.enum(["direct", "substitute", "incumbent"]),
        threat: z.enum(["high", "medium", "low"]),
        gap: z.string().min(10),
      })
    ),
    moatPotential: z.string().min(20),
    incumbentVulnerability: z.string().min(20),
  }),
  executionDifficulty: z.object({
    technicalComplexity: z.string().min(20),
    regulatoryRisks: z.array(z.string().min(10)),
    distributionChallenge: z.string().min(20),
    capitalIntensity: z.enum(["low", "medium", "high", "very-high"]),
    criticalBottlenecks: z.array(z.string().min(10)).min(1),
  }),
  failureAnalysis: z.object({
    topFailureReasons: z.array(z.string().min(10)).min(2),
    silentKillers: z.array(
      z.object({
        risk: z.string().min(10),
        explanation: z.string().min(20),
      })
    ),
    blindSpots: z.array(z.string().min(10)).min(1),
    overestimatedAdvantages: z.array(z.string().min(10)).min(1),
  }),
  strategicInsights: z.object({
    suggestedImprovements: z.array(z.string().min(10)).min(2),
    pivotOptions: z.array(z.string().min(10)).min(1),
    entryWedge: z.string().min(20),
    conditionsForVentureScale: z.string().min(20),
  }),
  scores: z.object({
    marketAttractiveness: ScoreSchema,
    businessModelStrength: ScoreSchema,
    executionFeasibility: ScoreSchema,
    defensibility: ScoreSchema,
  }),
  verdict: z.object({
    label: z.enum(["strong bet", "promising but flawed", "weak idea"]),
    summary: z.string().min(20),
    primaryConcern: z.string().min(20),
    bestCaseScenario: z.string().min(20),
  }),
});

export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;
