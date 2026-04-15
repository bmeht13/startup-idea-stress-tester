import { StrategicInsights as StrategicInsightsType } from "@/types/analysis";
import { SectionCard } from "@/components/ui/SectionCard";
import { Lightbulb } from "lucide-react";

interface StrategicInsightsProps {
  data: StrategicInsightsType;
}

export function StrategicInsights({ data }: StrategicInsightsProps) {
  return (
    <SectionCard title="Strategic Insights" icon={Lightbulb}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-slate-700 mb-3">
              Suggested Improvements
            </h4>
            <ul className="space-y-2">
              {data.suggestedImprovements.map((improvement, i) => (
                <li
                  key={i}
                  className="text-sm text-slate-600 bg-green-50 p-2 rounded border border-green-200"
                >
                  ✓ {improvement}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-700 mb-3">Pivot Options</h4>
            <ul className="space-y-2">
              {data.pivotOptions.map((pivot, i) => (
                <li
                  key={i}
                  className="text-sm text-slate-600 bg-blue-50 p-2 rounded border border-blue-200"
                >
                  → {pivot}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 border-2 border-purple-200 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-700 mb-2">Entry Wedge</h4>
          <p className="text-sm text-slate-600 italic">"{data.entryWedge}"</p>
        </div>

        <div className="bg-indigo-50 border-2 border-indigo-200 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-700 mb-2">
            Conditions for Venture Scale
          </h4>
          <p className="text-sm text-slate-600 italic">
            "{data.conditionsForVentureScale}"
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
