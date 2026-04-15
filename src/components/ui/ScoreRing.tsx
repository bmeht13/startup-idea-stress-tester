"use client";

interface ScoreRingProps {
  score: number; // 0-10
  label: string;
  reasoning: string;
}

export function ScoreRing({ score, label, reasoning }: ScoreRingProps) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 10) * circumference;

  // Color gradient by score
  let ringColor = "#ef4444"; // red (0-3)
  if (score > 3 && score <= 5) ringColor = "#f59e0b"; // amber (4-5)
  else if (score > 5 && score <= 7) ringColor = "#eab308"; // yellow (6-7)
  else if (score > 7) ringColor = "#22c55e"; // green (8-10)

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-28 h-28">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 80 80"
        >
          {/* Background circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="3"
          />
          {/* Progress circle with animation */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.8s ease-out",
            }}
          />
        </svg>
        {/* Score text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-slate-800">{score}</span>
        </div>
      </div>

      {/* Label and reasoning */}
      <div className="text-center w-full max-w-xs">
        <h4 className="font-semibold text-slate-700 text-sm">{label}</h4>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
          {reasoning}
        </p>
      </div>
    </div>
  );
}
