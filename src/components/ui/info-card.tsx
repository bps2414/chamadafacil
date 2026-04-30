import type { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  variant?: "default" | "warning" | "success" | "brand";
};

export function InfoCard({
  title,
  icon,
  children,
  className = "",
  variant = "default",
}: InfoCardProps) {
  const variantStyles = {
    default: "bg-surface-hover border-border text-foreground",
    warning: "bg-warning/10 border-warning/20 text-warning-foreground",
    success: "bg-success/10 border-success/20 text-success-foreground",
    brand: "bg-primary/5 border-primary/20 text-foreground",
  };

  const iconStyles = {
    default: "text-muted-foreground",
    warning: "text-warning",
    success: "text-success",
    brand: "text-primary",
  };

  return (
    <div
      className={`rounded-xl border p-5 shadow-sm transition-colors ${variantStyles[variant]} ${className}`}
    >
      <div className="flex items-center gap-3 mb-3">
        {icon && (
          <div className={`shrink-0 ${iconStyles[variant]}`}>{icon}</div>
        )}
        <h3 className="font-semibold text-sm sm:text-base leading-none">
          {title}
        </h3>
      </div>
      <div className="text-sm leading-relaxed text-muted-foreground space-y-2">
        {children}
      </div>
    </div>
  );
}
