import { Container } from "@/components/ui/container";
import { PublicHeader } from "@/components/tickets/public-header";

export default function LookupLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PublicHeader active="lookup" />
      <main className="flex-1 py-12 sm:py-20 animate-pulse">
        <Container>
          <div className="mx-auto max-w-lg">
            {/* Header skeleton */}
            <div className="text-center mb-10">
              <div className="h-8 w-64 bg-muted/80 rounded-md mx-auto mb-4"></div>
              <div className="h-4 w-full max-w-[320px] bg-muted/60 rounded-md mx-auto"></div>
            </div>

            {/* Form skeleton */}
            <div className="bg-background rounded-2xl border border-border shadow-sm p-6 sm:p-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="h-4 w-32 bg-muted/60 rounded-md"></div>
                  </div>
                  <div className="h-12 w-full bg-muted/40 rounded-lg border border-border/50"></div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="h-4 w-32 bg-muted/60 rounded-md"></div>
                  </div>
                  <div className="h-12 w-full bg-muted/40 rounded-lg border border-border/50"></div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="h-12 w-full bg-primary/20 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
