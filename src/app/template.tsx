export default function Template({ children }: { children: React.ReactNode }) {
  /*
   * page-enter  → opacity 0→1 + translateY(6px→0) in 200ms.
   * Pure CSS, GPU-composited (only opacity + transform).
   * Runs on every Next.js route change (template.tsx re-mounts per navigation).
   */
  return <div className="page-enter">{children}</div>;
}
