import { CoreDecomposition as CoreDecompositionType } from "@/types/analysis";
import { SectionCard } from "@/components/ui/SectionCard";
import { Badge } from "@/components/ui/Badge";
import { Lightbulb } from "lucide-react";

interface CoreDecompositionProps {
  data: CoreDecompositionType;
}

export function CoreDecomposition({ data }: CoreDecompositionProps) {
  return (
    <SectionCard title="Core Decomposition" icon={Lightbulb}>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-slate-700 mb-2">Core Problem</h4>
          <p className="text-slate-600">{data.coreProblem}</p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-2">
            Current Alternatives
          </h4>
          <ul className="space-y-1 text-slate-600">
            {data.currentAlternatives.map((alt, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-slate-400">•</span>
                <span>{alt}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-2">
            Value Proposition
          </h4>
          <p className="text-slate-600">{data.valueProposition}</p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-3">Key Assumptions</h4>
          <div className="space-y-3">
            {data.keyAssumptions.map((assumption, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="flex items-start gap-2 mb-1">
                  <span className="text-slate-600 font-medium flex-1">
                    {assumption.assumption}
                  </span>
                  <Badge variant={assumption.realism}>
                    {assumption.realism}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {assumption.rationale}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
