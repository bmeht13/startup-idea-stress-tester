import { IdeaInput } from "@/types/analysis";

export const SYSTEM_PROMPT = `You are a VC analyst. Evaluate startup ideas critically and honestly.

CRITICAL: Return ONLY raw JSON. No markdown code blocks. No backticks. No preamble. No explanation. Just the JSON object.

Every field must be substantive (2-3 sentences minimum).

Rules:
- Verdict label: exactly "strong bet", "promising but flawed", or "weak idea"
- Be critical and specific
- Name real companies where they exist
- Every array must have at least 2 items`;

export function buildUserPrompt(input: IdeaInput): string {
  return `Analyze this startup idea and return ONLY valid JSON (no markdown, no preamble):

IDEA: ${input.name}
DESCRIPTION: ${input.description}
TARGET USERS: ${input.targetUsers}
GEOGRAPHY: ${input.geography}
MONETIZATION: ${input.monetization ?? "Not specified"}
STAGE: ${input.stage}

Return exactly this JSON structure:
{
  "verdict": {
    "label": "strong bet|promising but flawed|weak idea",
    "reasoning": "Detailed verdict explanation"
  },
  "market": {
    "opportunity": "Market opportunity description",
    "tam": "Total addressable market estimate",
    "demand": "Demand frequency and patterns",
    "risks": ["Risk 1", "Risk 2"]
  },
  "business": {
    "model": "Business model description",
    "monetization": "How it makes money",
    "scalability": "Scalability assessment"
  },
  "execution": {
    "difficulty": "low|medium|high",
    "challenges": ["Challenge 1", "Challenge 2"]
  },
  "competition": {
    "landscape": "Competitive landscape analysis",
    "differentiators": ["Differentiator 1", "Differentiator 2"]
  },
  "recommendations": {
    "strengths": ["Strength 1", "Strength 2"],
    "concerns": ["Concern 1", "Concern 2"],
    "improvements": ["Improvement 1", "Improvement 2"]
  },
  "scores": {
    "market": 0-10,
    "business": 0-10,
    "execution": 0-10,
    "overall": 0-10
  }
}`;
}
