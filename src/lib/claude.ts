import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompts";
import { AnalysisResultSchema } from "./schema";
import { IdeaInput, AnalysisResult } from "@/types/analysis";

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY environment variable is not set.");
}

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyzeIdea(input: IdeaInput): Promise<AnalysisResult> {
  const message = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: buildUserPrompt(input),
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(content.text);
  } catch {
    throw new Error(
      `Claude returned invalid JSON: ${content.text.substring(0, 200)}`
    );
  }

  const result = AnalysisResultSchema.safeParse(parsed);
  if (!result.success) {
    console.error("Schema validation error:", result.error);
    throw new Error(
      `Analysis schema validation failed: ${result.error.message}`
    );
  }

  return result.data as AnalysisResult;
}
