import { AnalysisResult } from "@/types/analysis";

interface ResultsDashboardProps {
  result: AnalysisResult;
  ideaName: string;
  onReset: () => void;
}

const verdictColors = {
  "strong bet": "bg-green-50 border-green-300 text-green-900",
  "promising but flawed": "bg-amber-50 border-amber-300 text-amber-900",
  "weak idea": "bg-red-50 border-red-300 text-red-900",
};

export function ResultsDashboard({
  result,
  ideaName,
  onReset,
}: ResultsDashboardProps) {
  const verdictColor =
    verdictColors[result.verdict.label as keyof typeof verdictColors];

  return (
    <div className="space-y-8">
      {/* Verdict Banner */}
      <div className={`border-2 rounded-lg p-6 ${verdictColor}`}>
        <h2 className="text-2xl font-bold mb-2 capitalize">
          {result.verdict.label}
        </h2>
        <p className="text-base">{result.verdict.reasoning}</p>
      </div>

      {/* Scores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Market", value: result.scores.market },
          { label: "Business", value: result.scores.business },
          { label: "Execution", value: result.scores.execution },
          { label: "Overall", value: result.scores.overall },
        ].map((score) => (
          <div
            key={score.label}
            className="bg-slate-100 rounded-lg p-4 text-center"
          >
            <div className="text-3xl font-bold text-slate-900">
              {score.value}
            </div>
            <div className="text-sm text-slate-600">{score.label}</div>
          </div>
        ))}
      </div>

      {/* Market */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Market</h3>
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-slate-700 mb-1">Opportunity</h4>
            <p className="text-slate-600">{result.market.opportunity}</p>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 mb-1">TAM</h4>
            <p className="text-slate-600">{result.market.tam}</p>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 mb-1">Demand</h4>
            <p className="text-slate-600">{result.market.demand}</p>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 mb-2">Risks</h4>
            <ul className="space-y-1">
              {result.market.risks.map((risk, i) => (
                <li key={i} className="text-sm text-slate-600 flex gap-2">
                  <span className="text-red-600">•</span> {risk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Business */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Business</h3>
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-slate-700 mb-1">Model</h4>
            <p className="text-slate-600">{result.business.model}</p>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 mb-1">Monetization</h4>
            <p className="text-slate-600">{result.business.monetization}</p>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 mb-1">Scalability</h4>
            <p className="text-slate-600">{result.business.scalability}</p>
          </div>
        </div>
      </div>

      {/* Execution */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Execution</h3>
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-slate-700 mb-1">Difficulty</h4>
            <div className="inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-sm font-medium capitalize">
              {result.execution.difficulty}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 mb-2">Challenges</h4>
            <ul className="space-y-1">
              {result.execution.challenges.map((challenge, i) => (
                <li key={i} className="text-sm text-slate-600 flex gap-2">
                  <span className="text-amber-600">•</span> {challenge}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Competition */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">
          Competition
        </h3>
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-slate-700 mb-1">Landscape</h4>
            <p className="text-slate-600">{result.competition.landscape}</p>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 mb-2">Differentiators</h4>
            <ul className="space-y-1">
              {result.competition.differentiators.map((diff, i) => (
                <li key={i} className="text-sm text-slate-600 flex gap-2">
                  <span className="text-green-600">✓</span> {diff}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">
          Recommendations
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
            <ul className="space-y-1">
              {result.recommendations.strengths.map((s, i) => (
                <li key={i} className="text-sm text-slate-600">
                  ✓ {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-red-700 mb-2">Concerns</h4>
            <ul className="space-y-1">
              {result.recommendations.concerns.map((c, i) => (
                <li key={i} className="text-sm text-slate-600">
                  ✗ {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-700 mb-2">Improvements</h4>
            <ul className="space-y-1">
              {result.recommendations.improvements.map((im, i) => (
                <li key={i} className="text-sm text-slate-600">
                  → {im}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

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
