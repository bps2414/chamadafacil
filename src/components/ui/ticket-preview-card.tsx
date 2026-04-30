import { Badge } from "./badge";
import { DocumentIcon, MessageIcon } from "./icons";

type TicketPreviewCardProps = {
  title: string;
  status: "open" | "in_progress" | "resolved";
  priority: "low" | "medium" | "high" | "urgent";
  date: string;
  messages?: number;
  className?: string;
  delay?: number;
  ticketNumber?: string;
};

export function TicketPreviewCard({
  title,
  status,
  priority,
  date,
  messages = 0,
  className = "",
  delay = 0,
  ticketNumber = "CF-102934",
}: TicketPreviewCardProps) {
  const statusConfig = {
    open: { label: "Aberto", variant: "default" as const },
    in_progress: { label: "Em andamento", variant: "primary" as const },
    resolved: { label: "Resolvido", variant: "success" as const },
  };

  const priorityConfig = {
    low: { label: "Baixa", variant: "default" as const },
    medium: { label: "Média", variant: "warning" as const },
    high: { label: "Alta", variant: "destructive" as const },
    urgent: { label: "Urgente", variant: "destructive" as const },
  };

  return (
    <div 
      className={`group rounded-xl border border-border/60 bg-background/90 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary/30 animate-slide-up ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <DocumentIcon className="h-3.5 w-3.5" />
          <span>{ticketNumber}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant={priorityConfig[priority].variant} className="text-[10px] px-1.5 py-0 h-5">
            {priorityConfig[priority].label}
          </Badge>
          <Badge variant={statusConfig[status].variant} className="text-[10px] px-1.5 py-0 h-5">
            {statusConfig[status].label}
          </Badge>
        </div>
      </div>
      
      <h4 className="text-sm font-semibold text-foreground line-clamp-1 mb-3">
        {title}
      </h4>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-3">
        <span>{date}</span>
        {messages > 0 && (
          <div className="flex items-center gap-1">
            <MessageIcon className="h-3.5 w-3.5" />
            <span>{messages}</span>
          </div>
        )}
      </div>
    </div>
  );
}
