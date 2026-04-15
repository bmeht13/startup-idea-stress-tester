export type Stage = "idea" | "pre-product" | "mvp" | "growth";

export interface IdeaInput {
  name: string;
  description: string;
  targetUsers: string;
  geography: string;
  monetization?: string;
  stage: Stage;
}

export interface Assumption {
  assumption: string;
  realism: "plausible" | "questionable" | "speculative";
  rationale: string;
}

export interface CoreDecomposition {
  coreProblem: string;
  currentAlternatives: string[];
  valueProposition: string;
  keyAssumptions: Assumption[];
}

export interface MarketAnalysis {
  tam: { estimate: string; methodology: string };
  demandFrequency: "daily" | "weekly" | "monthly" | "occasional" | "one-time";
  willingnessToPaySignals: string;
  marketType: "emerging" | "fragmented" | "saturated" | "monopolized";
  marketTypeRationale: string;
}

export interface BusinessModel {
  revenueStreams: string[];
  unitEconomicsOutlook: string;
  scalabilityAssessment: string;
  monetizationRisks: string[];
}

export interface Competitor {
  name: string;
  type: "direct" | "substitute" | "incumbent";
  threat: "high" | "medium" | "low";
  gap: string;
}

export interface CompetitiveLandscape {
  competitors: Competitor[];
  moatPotential: string;
  incumbentVulnerability: string;
}

export interface ExecutionDifficulty {
  technicalComplexity: string;
  regulatoryRisks: string[];
  distributionChallenge: string;
  capitalIntensity: "low" | "medium" | "high" | "very-high";
  criticalBottlenecks: string[];
}

export interface FailureAnalysis {
  topFailureReasons: string[];
  silentKillers: { risk: string; explanation: string }[];
  blindSpots: string[];
  overestimatedAdvantages: string[];
}

export interface StrategicInsights {
  suggestedImprovements: string[];
  pivotOptions: string[];
  entryWedge: string;
  conditionsForVentureScale: string;
}

export interface Score {
  value: number; // 0–10
  reasoning: string;
}

export interface Scores {
  marketAttractiveness: Score;
  businessModelStrength: Score;
  executionFeasibility: Score;
  defensibility: Score;
}

export type VerdictLabel = "strong bet" | "promising but flawed" | "weak idea";

export interface Verdict {
  label: VerdictLabel;
  summary: string;
  primaryConcern: string;
  bestCaseScenario: string;
}

export interface AnalysisResult {
  coreDecomposition: CoreDecomposition;
  marketAnalysis: MarketAnalysis;
  businessModel: BusinessModel;
  competitiveLandscape: CompetitiveLandscape;
  executionDifficulty: ExecutionDifficulty;
  failureAnalysis: FailureAnalysis;
  strategicInsights: StrategicInsights;
  scores: Scores;
  verdict: Verdict;
}
