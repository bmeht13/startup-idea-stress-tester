import { Verdict as VerdictType } from "@/types/analysis";
import { AlertCircle, TrendingUp, AlertTriangle } from "lucide-react";

interface VerdictProps {
  verdict: VerdictType;
}

export function Verdict({ verdict }: VerdictProps) {
  let bgClass = "bg-green-50 border-green-200";
  let headerClass = "text-green-900";
  let icon = <TrendingUp className="h-8 w-8 text-green-600" />;

  if (verdict.label === "promising but flawed") {
    bgClass = "bg-amber-50 border-amber-200";
    headerClass = "text-amber-900";
    icon = <AlertTriangle className="h-8 w-8 text-amber-600" />;
  } else if (verdict.label === "weak idea") {
    bgClass = "bg-red-50 border-red-200";
    headerClass = "text-red-900";
    icon = <AlertCircle className="h-8 w-8 text-red-600" />;
  }

  return (
    <div
      className={`rounded-lg border-2 ${bgClass} p-8 mb-8`}
    >
      <div className="flex gap-4 items-start">
        {icon}
        <div className="flex-1">
          <h2 className={`text-4xl font-bold uppercase tracking-wider ${headerClass}`}>
            {verdict.label}
          </h2>
          <p className="text-slate-700 mt-4 text-lg leading-relaxed">
            {verdict.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white bg-opacity-60 p-4 rounded">
              <h3 className="font-semibold text-slate-800 mb-2">
                Primary Concern
              </h3>
              <p className="text-sm text-slate-600">{verdict.primaryConcern}</p>
            </div>
            <div className="bg-white bg-opacity-60 p-4 rounded">
              <h3 className="font-semibold text-slate-800 mb-2">
                Best Case Scenario
              </h3>
              <p className="text-sm text-slate-600">
                {verdict.bestCaseScenario}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
