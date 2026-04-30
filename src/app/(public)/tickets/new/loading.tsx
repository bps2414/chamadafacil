import { Container } from "@/components/ui/container";
import { PublicHeader } from "@/components/tickets/public-header";

export default function NewTicketLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PublicHeader active="new" />
      <main className="flex-1 py-12 sm:py-20 animate-pulse">
        <Container>
          <div className="mx-auto max-w-4xl">
            {/* Header skeleton */}
            <div className="mb-10 text-center sm:text-left">
              <div className="h-8 w-64 bg-muted/80 rounded-md mb-4 mx-auto sm:mx-0"></div>
              <div className="h-4 w-full max-w-lg bg-muted/60 rounded-md mx-auto sm:mx-0"></div>
            </div>

            {/* Form skeleton */}
            <div className="bg-background rounded-2xl border border-border shadow-sm p-4 sm:p-6 lg:p-8">
              <div className="space-y-10">
                <div className="space-y-6">
                  <div className="h-6 w-48 bg-muted/80 rounded-md mb-6"></div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="h-12 w-full bg-muted/40 rounded-lg border border-border/50"></div>
                    <div className="h-12 w-full bg-muted/40 rounded-lg border border-border/50"></div>
                    <div className="h-12 w-full bg-muted/40 rounded-lg border border-border/50"></div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="h-6 w-48 bg-muted/80 rounded-md mb-6"></div>
                  <div className="h-12 w-full bg-muted/40 rounded-lg border border-border/50"></div>
                  <div className="h-40 w-full bg-muted/40 rounded-lg border border-border/50"></div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="h-12 w-full sm:w-[200px] bg-primary/20 rounded-lg"></div>
                  <div className="h-4 w-64 bg-muted/60 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
