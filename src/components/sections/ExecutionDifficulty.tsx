import { ExecutionDifficulty as ExecutionDifficultyType } from "@/types/analysis";
import { SectionCard } from "@/components/ui/SectionCard";
import { AlertTriangle } from "lucide-react";

interface ExecutionDifficultyProps {
  data: ExecutionDifficultyType;
}

const CAPITAL_COLORS: Record<string, string> = {
  low: "bg-green-100",
  medium: "bg-yellow-100",
  high: "bg-orange-100",
  "very-high": "bg-red-100",
};

const CAPITAL_LABELS: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  "very-high": "Very High",
};

export function ExecutionDifficulty({ data }: ExecutionDifficultyProps) {
  const capitalColor = CAPITAL_COLORS[data.capitalIntensity] || CAPITAL_COLORS.medium;

  return (
    <SectionCard title="Execution Difficulty" icon={AlertTriangle}>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-slate-700 mb-2">
            Technical Complexity
          </h4>
          <p className="text-slate-600">{data.technicalComplexity}</p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-2">Distribution</h4>
          <p className="text-slate-600">{data.distributionChallenge}</p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-2">Capital Intensity</h4>
          <div className={`inline-block px-4 py-2 rounded font-semibold text-sm ${capitalColor}`}>
            {CAPITAL_LABELS[data.capitalIntensity]}
          </div>
        </div>

        {data.regulatoryRisks.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-700 mb-2">
              Regulatory Risks
            </h4>
            <ul className="space-y-1 text-slate-600">
              {data.regulatoryRisks.map((risk, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-amber-600">⚠</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="font-semibold text-slate-700 mb-2">
            Critical Bottlenecks
          </h4>
          <ul className="space-y-2">
            {data.criticalBottlenecks.map((bottleneck, i) => (
              <li
                key={i}
                className="text-sm text-slate-600 bg-amber-50 p-2 rounded border border-amber-200 flex gap-2"
              >
                <span className="text-amber-600 font-bold">•</span>
                <span>{bottleneck}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}
