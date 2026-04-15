import { BusinessModel as BusinessModelType } from "@/types/analysis";
import { SectionCard } from "@/components/ui/SectionCard";
import { DollarSign, AlertOctagon } from "lucide-react";

interface BusinessModelProps {
  data: BusinessModelType;
}

export function BusinessModel({ data }: BusinessModelProps) {
  return (
    <SectionCard title="Business Model" icon={DollarSign}>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-slate-700 mb-2">Revenue Streams</h4>
          <div className="flex flex-wrap gap-2">
            {data.revenueStreams.map((stream, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-slate-200 text-slate-800 text-sm rounded-full"
              >
                {stream}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-2">
            Unit Economics
          </h4>
          <p className="text-slate-600">{data.unitEconomicsOutlook}</p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-2">Scalability</h4>
          <p className="text-slate-600">{data.scalabilityAssessment}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertOctagon className="h-4 w-4 text-red-600" />
            <h4 className="font-semibold text-slate-700">Monetization Risks</h4>
          </div>
          <ul className="space-y-2">
            {data.monetizationRisks.map((risk, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm text-slate-600 bg-red-50 p-2 rounded border border-red-200"
              >
                <span className="text-red-600 font-bold">•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}
