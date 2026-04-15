"use client";

import { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "Decomposing the core problem...",
  "Stress-testing your assumptions...",
  "Mapping the competitive landscape...",
  "Running failure analysis...",
  "Calculating scores...",
];

export function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-96 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
      <div className="text-center space-y-6">
        {/* Animated dots */}
        <div className="flex justify-center gap-2">
          <div
            className="w-3 h-3 bg-slate-400 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="w-3 h-3 bg-slate-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-3 h-3 bg-slate-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>

        {/* Loading message with fade transition */}
        <div className="h-8 flex items-center justify-center">
          <p
            key={messageIndex}
            className="text-slate-600 font-medium animate-in fade-in duration-300"
          >
            {LOADING_MESSAGES[messageIndex]}
          </p>
        </div>

        <p className="text-sm text-slate-500">
          This may take 20-40 seconds...
        </p>
      </div>
    </div>
  );
}
