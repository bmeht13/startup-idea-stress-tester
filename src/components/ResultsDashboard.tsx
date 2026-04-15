import { AnalysisResult } from "@/types/analysis";
import { Verdict } from "./sections/Verdict";
import { ScoreCard } from "./sections/ScoreCard";
import { CoreDecomposition } from "./sections/CoreDecomposition";
import { MarketAnalysis } from "./sections/MarketAnalysis";
import { BusinessModel } from "./sections/BusinessModel";
import { CompetitiveLandscape } from "./sections/CompetitiveLandscape";
import { ExecutionDifficulty } from "./sections/ExecutionDifficulty";
import { FailureAnalysis } from "./sections/FailureAnalysis";
import { StrategicInsights } from "./sections/StrategicInsights";

interface ResultsDashboardProps {
  result: AnalysisResult;
  ideaName: string;
  onReset: () => void;
}

export function ResultsDashboard({
  result,
  ideaName,
  onReset,
}: ResultsDashboardProps) {
  return (
    <div className="space-y-8">
      {/* Verdict Banner */}
      <Verdict verdict={result.verdict} />

      {/* Score Cards */}
      <ScoreCard scores={result.scores} />

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CoreDecomposition data={result.coreDecomposition} />
        <MarketAnalysis data={result.marketAnalysis} />
        <BusinessModel data={result.businessModel} />
        <CompetitiveLandscape data={result.competitiveLandscape} />
        <ExecutionDifficulty data={result.executionDifficulty} />
        <FailureAnalysis data={result.failureAnalysis} />
      </div>

      {/* Strategic Insights (Full Width) */}
      <StrategicInsights data={result.strategicInsights} />

      {/* Reset Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition"
        >
          Analyze Another Idea
        </button>
      </div>
    </div>
  );
}
