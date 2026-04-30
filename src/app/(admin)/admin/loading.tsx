import { AdminHeader } from "@/components/admin/admin-header";
import { Container } from "@/components/ui/container";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <AdminHeader />
      <main className="flex-1 py-8 sm:py-10 animate-pulse">
        <Container>
          {/* Section Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 w-48 bg-muted/80 rounded-md mb-2"></div>
            <div className="h-4 w-96 max-w-full bg-muted/60 rounded-md"></div>
          </div>

          {/* Stats Row Skeleton */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-[104px] rounded-xl border border-border bg-background p-5">
                <div className="flex justify-between items-center mb-2">
                  <div className="h-4 w-24 bg-muted/60 rounded"></div>
                  <div className="h-6 w-6 rounded-full bg-muted/40"></div>
                </div>
                <div className="h-8 w-16 bg-muted/80 rounded mt-2"></div>
              </div>
            ))}
          </div>

          {/* Filters Skeleton */}
          <div className="mb-6 h-14 w-full bg-muted/30 rounded-lg border border-border"></div>

          {/* List Skeleton */}
          <div className="rounded-2xl border border-border bg-background p-6">
            <div className="h-5 w-32 bg-muted/80 rounded mb-6" />
            <div className="space-y-4">
              {[0, 1, 2, 3].map((item) => (
                <div
                  className="h-20 rounded-xl bg-muted/50"
                  key={item}
                />
              ))}
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
