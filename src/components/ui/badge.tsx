import React from "react";

type BadgeVariant = 
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "destructive"
  | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  showDot?: boolean;
}

export function Badge({
  children,
  variant = "default",
  className = "",
  showDot = false,
}: BadgeProps) {
  const baseStyles = "inline-flex items-center whitespace-nowrap px-2.5 py-0.5 rounded-full text-xs font-medium border";
  
  const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-muted/50 text-muted-foreground border-transparent",
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary text-secondary-foreground border-transparent",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
    outline: "bg-transparent text-foreground border-border",
  };

  const dotColors: Record<BadgeVariant, string> = {
    default: "bg-muted-foreground",
    primary: "bg-primary",
    secondary: "bg-secondary-foreground",
    success: "bg-success",
    warning: "bg-warning",
    destructive: "bg-destructive",
    outline: "bg-foreground",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColors[variant]}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
