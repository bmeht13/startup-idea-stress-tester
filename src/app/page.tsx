"use client";

import { useState } from "react";
import { AnalysisResult } from "@/types/analysis";
import { IdeaForm } from "@/components/IdeaForm";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { LoadingState } from "@/components/ui/LoadingState";

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFormSubmit = (analysisResult: AnalysisResult) => {
    setResult(analysisResult);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold">Startup Idea Stress Tester</h1>
          <p className="text-slate-300 text-sm mt-2">
            Rigorous, critical analysis of your startup ideas
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {!result ? (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-slate-800">
                What startup idea do you want to stress test?
              </h2>
              <p className="text-slate-600 mt-2">
                Get honest, critical feedback like a seasoned venture capitalist would provide
              </p>
            </div>
            <IdeaForm onResult={handleFormSubmit} />
          </div>
        ) : (
          <ResultsDashboard
            result={result}
            ideaName=""
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}
