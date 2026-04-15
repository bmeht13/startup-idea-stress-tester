import { Scores } from "@/types/analysis";
import { ScoreRing } from "@/components/ui/ScoreRing";

interface ScoreCardProps {
  scores: Scores;
}

export function ScoreCard({ scores }: ScoreCardProps) {
  return (
    <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 mb-8">
      <h2 className="text-xl font-semibold text-slate-800 mb-8">Scores</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ScoreRing
          score={scores.marketAttractiveness.value}
          label="Market Attractiveness"
          reasoning={scores.marketAttractiveness.reasoning}
        />
        <ScoreRing
          score={scores.businessModelStrength.value}
          label="Business Model Strength"
          reasoning={scores.businessModelStrength.reasoning}
        />
        <ScoreRing
          score={scores.executionFeasibility.value}
          label="Execution Feasibility"
          reasoning={scores.executionFeasibility.reasoning}
        />
        <ScoreRing
          score={scores.defensibility.value}
          label="Defensibility"
          reasoning={scores.defensibility.reasoning}
        />
      </div>
    </div>
  );
}
