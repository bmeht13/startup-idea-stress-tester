import { z } from "zod";

export const AnalysisResultSchema = z.object({
  verdict: z.object({
    label: z.enum(["strong bet", "promising but flawed", "weak idea"]),
    reasoning: z.string().min(30),
  }),
  market: z.object({
    opportunity: z.string().min(20),
    tam: z.string().min(15),
    demand: z.string().min(15),
    risks: z.array(z.string().min(10)).min(1),
  }),
  business: z.object({
    model: z.string().min(20),
    monetization: z.string().min(15),
    scalability: z.string().min(15),
  }),
  execution: z.object({
    difficulty: z.enum(["low", "medium", "high"]),
    challenges: z.array(z.string().min(10)).min(1),
  }),
  competition: z.object({
    landscape: z.string().min(20),
    differentiators: z.array(z.string().min(8)).min(1),
  }),
  recommendations: z.object({
    strengths: z.array(z.string().min(8)).min(1),
    concerns: z.array(z.string().min(8)).min(1),
    improvements: z.array(z.string().min(8)).min(1),
  }),
  scores: z.object({
    market: z.number().min(0).max(10),
    business: z.number().min(0).max(10),
    execution: z.number().min(0).max(10),
    overall: z.number().min(0).max(10),
  }),
});
