"use client";

import { useState } from "react";
import { AnalysisResult, IdeaInput, Stage } from "@/types/analysis";
import { ErrorBanner } from "./ui/ErrorBanner";

interface IdeaFormProps {
  onResult: (result: AnalysisResult) => void;
}

const STAGES: { value: Stage; label: string }[] = [
  { value: "idea", label: "Idea" },
  { value: "pre-product", label: "Pre-Product" },
  { value: "mvp", label: "MVP" },
  { value: "growth", label: "Growth" },
];

export function IdeaForm({ onResult }: IdeaFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<IdeaInput, "stage"> & { stage: string }>({
    name: "",
    description: "",
    targetUsers: "",
    geography: "",
    monetization: "",
    stage: "idea",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          stage: formData.stage as Stage,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Analysis failed");
      }

      const result: AnalysisResult = await response.json();
      onResult(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {error && <ErrorBanner message={error} onRetry={() => setError(null)} />}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Idea Name *
        </label>
        <input
          type="text"
          required
          placeholder="e.g., Uber for Dog Walking"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Description *
        </label>
        <textarea
          required
          placeholder="What does the product do? How does it work?"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Target Users *
        </label>
        <input
          type="text"
          required
          placeholder="e.g., Dog owners in urban areas"
          value={formData.targetUsers}
          onChange={(e) =>
            setFormData({ ...formData, targetUsers: e.target.value })
          }
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Geography *
        </label>
        <input
          type="text"
          required
          placeholder="e.g., United States, Europe, etc."
          value={formData.geography}
          onChange={(e) =>
            setFormData({ ...formData, geography: e.target.value })
          }
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Monetization Strategy (Optional)
        </label>
        <textarea
          placeholder="e.g., Subscription, Commission-based, Freemium, etc."
          value={formData.monetization}
          onChange={(e) =>
            setFormData({ ...formData, monetization: e.target.value })
          }
          rows={2}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Stage *
        </label>
        <select
          required
          value={formData.stage}
          onChange={(e) =>
            setFormData({ ...formData, stage: e.target.value })
          }
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          disabled={loading}
        >
          {STAGES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Analyzing..." : "Analyze Idea"}
      </button>

      <p className="text-xs text-slate-500 text-center">
        * Required fields. The analysis typically takes 20-40 seconds.
      </p>
    </form>
  );
}
