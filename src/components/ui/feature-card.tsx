import type { ReactNode } from "react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
};

export function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  return (
    <div 
      className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
      <h3 className="text-xl font-bold tracking-tight mb-3">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
