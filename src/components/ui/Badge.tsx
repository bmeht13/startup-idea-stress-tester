import { cn } from "@/lib/utils";

interface BadgeProps {
  children: string;
  variant?: "plausible" | "questionable" | "speculative" | "threat" | "default";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const baseClasses =
    "inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap";

  const variantClasses = {
    plausible: "bg-green-100 text-green-800",
    questionable: "bg-yellow-100 text-yellow-800",
    speculative: "bg-red-100 text-red-800",
    threat: "bg-red-100 text-red-800",
    default: "bg-slate-200 text-slate-800",
  };

  return (
    <span
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {children}
    </span>
  );
}
