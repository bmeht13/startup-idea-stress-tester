import { MarketAnalysis as MarketAnalysisType } from "@/types/analysis";
import { SectionCard } from "@/components/ui/SectionCard";
import { Badge } from "@/components/ui/Badge";
import { BarChart3 } from "lucide-react";

interface MarketAnalysisProps {
  data: MarketAnalysisType;
}

const FREQUENCY_COLORS: Record<string, string> = {
  daily: "bg-green-100 text-green-800",
  weekly: "bg-blue-100 text-blue-800",
  monthly: "bg-purple-100 text-purple-800",
  occasional: "bg-yellow-100 text-yellow-800",
  "one-time": "bg-gray-100 text-gray-800",
};

export function MarketAnalysis({ data }: MarketAnalysisProps) {
  const frequencyColor = FREQUENCY_COLORS[data.demandFrequency] || FREQUENCY_COLORS.occasional;

  return (
    <SectionCard title="Market Analysis" icon={BarChart3}>
      <div className="space-y-6">
        <div className="bg-slate-50 p-4 rounded border border-slate-200">
          <h4 className="font-semibold text-slate-700 mb-2">
            Total Addressable Market (TAM)
          </h4>
          <p className="font-medium text-slate-800 mb-1">{data.tam.estimate}</p>
          <p className="text-xs text-slate-500">{data.tam.methodology}</p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-2">Demand Frequency</h4>
          <div className={`inline-block px-4 py-2 rounded-full font-medium text-sm ${frequencyColor}`}>
            {data.demandFrequency.replace("-", " ")}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-2">Market Type</h4>
          <Badge variant="default">{data.marketType}</Badge>
          <p className="text-slate-600 mt-2">{data.marketTypeRationale}</p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-2">
            Willingness to Pay
          </h4>
          <p className="text-slate-600">{data.willingnessToPaySignals}</p>
        </div>
      </div>
    </SectionCard>
  );
}
