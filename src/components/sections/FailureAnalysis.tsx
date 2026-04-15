"use client";

import { useState } from "react";
import { FailureAnalysis as FailureAnalysisType } from "@/types/analysis";
import { SectionCard } from "@/components/ui/SectionCard";
import { ChevronDown } from "lucide-react";
import { Skull } from "lucide-react";

interface FailureAnalysisProps {
  data: FailureAnalysisType;
}

export function FailureAnalysis({ data }: FailureAnalysisProps) {
  const [expandedKiller, setExpandedKiller] = useState<number | null>(0);

  return (
    <SectionCard title="Failure Analysis" icon={Skull} className="bg-slate-800 bg-opacity-5">
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-slate-700 mb-2">
            Top Failure Reasons
          </h4>
          <ol className="space-y-2 text-slate-600">
            {data.topFailureReasons.map((reason, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-bold text-slate-400 w-6">{i + 1}.</span>
                <span>{reason}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-3">Silent Killers</h4>
          <div className="space-y-2">
            {data.silentKillers.map((killer, i) => (
              <div key={i} className="border border-slate-300 rounded overflow-hidden">
                <button
                  onClick={() =>
                    setExpandedKiller(expandedKiller === i ? null : i)
                  }
                  className="w-full flex items-center justify-between p-3 bg-slate-100 hover:bg-slate-200 transition"
                >
                  <span className="font-medium text-slate-700 text-left">
                    {killer.risk}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-600 transition-transform ${
                      expandedKiller === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedKiller === i && (
                  <div className="p-3 bg-white text-slate-600 text-sm">
                    {killer.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-2">Blind Spots</h4>
          <ul className="space-y-2">
            {data.blindSpots.map((spot, i) => (
              <li
                key={i}
                className="text-sm text-slate-600 bg-red-50 p-2 rounded border border-red-200 flex gap-2"
              >
                <span className="text-red-600 font-bold">✗</span>
                <span>{spot}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-2">
            Overestimated Advantages
          </h4>
          <ul className="space-y-2">
            {data.overestimatedAdvantages.map((advantage, i) => (
              <li
                key={i}
                className="text-sm text-slate-600 bg-yellow-50 p-2 rounded border border-yellow-200 flex gap-2"
              >
                <span className="text-yellow-700 font-bold">⚠</span>
                <span>{advantage}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}
