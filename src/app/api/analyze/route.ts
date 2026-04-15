import { NextRequest, NextResponse } from "next/server";
import { analyzeIdea } from "@/lib/claude";
import { IdeaInput } from "@/types/analysis";

export async function POST(req: NextRequest) {
  try {
    const body: IdeaInput = await req.json();

    // Basic server-side validation
    if (
      !body.name ||
      !body.description ||
      !body.targetUsers ||
      !body.geography ||
      !body.stage
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, description, targetUsers, geography, stage",
        },
        { status: 400 }
      );
    }

    const result = await analyzeIdea(body);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Analysis error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Increase timeout — Claude Opus can take 20–40s for this prompt
export const maxDuration = 60;
