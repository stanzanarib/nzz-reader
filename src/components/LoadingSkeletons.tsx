export function LoadingSkeletons() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {[...Array(6)].map((_, i) => <div key={i} className="h-48 animate-pulse border border-border bg-muted/20" />)}
    </div>
  );
}