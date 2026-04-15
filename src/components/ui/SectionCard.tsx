import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

export function SectionCard({
  title,
  icon: Icon,
  children,
  className,
}: SectionCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-white p-6 shadow-sm border border-slate-200",
        className
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        {Icon && <Icon className="h-5 w-5 text-slate-600" />}
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="text-sm text-slate-600 leading-relaxed">{children}</div>
    </div>
  );
}
