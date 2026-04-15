import { CompetitiveLandscape as CompetitiveLandscapeType } from "@/types/analysis";
import { SectionCard } from "@/components/ui/SectionCard";
import { Badge } from "@/components/ui/Badge";
import { Zap } from "lucide-react";

interface CompetitiveLandscapeProps {
  data: CompetitiveLandscapeType;
}

const THREAT_COLORS: Record<string, string> = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
};

export function CompetitiveLandscape({ data }: CompetitiveLandscapeProps) {
  return (
    <SectionCard title="Competitive Landscape" icon={Zap}>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-slate-700 mb-3">Competitors</h4>
          {data.competitors.length > 0 ? (
            <div className="space-y-2">
              {data.competitors.map((competitor, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-50 rounded border border-slate-200"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-800">
                        {competitor.name}
                      </span>
                      <span className="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded">
                        {competitor.type}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${THREAT_COLORS[competitor.threat]}`}
                    >
                      {competitor.threat} threat
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2">{competitor.gap}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 italic">No direct competitors identified</p>
          )}
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-2">Moat Potential</h4>
          <p className="text-slate-600">{data.moatPotential}</p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-2">
            Incumbent Vulnerability
          </h4>
          <p className="text-slate-600">{data.incumbentVulnerability}</p>
        </div>
      </div>
    </SectionCard>
  );
}
