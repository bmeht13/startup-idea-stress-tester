export type Stage = "idea" | "pre-product" | "mvp" | "growth";

export interface IdeaInput {
  name: string;
  description: string;
  targetUsers: string;
  geography: string;
  monetization?: string;
  stage: Stage;
}

export interface AnalysisResult {
  verdict: {
    label: "strong bet" | "promising but flawed" | "weak idea";
    reasoning: string;
  };
  market: {
    opportunity: string;
    tam: string;
    demand: string;
    risks: string[];
  };
  business: {
    model: string;
    monetization: string;
    scalability: string;
  };
  execution: {
    difficulty: "low" | "medium" | "high";
    challenges: string[];
  };
  competition: {
    landscape: string;
    differentiators: string[];
  };
  recommendations: {
    strengths: string[];
    concerns: string[];
    improvements: string[];
  };
  scores: {
    market: number;
    business: number;
    execution: number;
    overall: number;
  };
}
