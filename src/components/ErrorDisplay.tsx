export function ErrorDisplay({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="py-20 text-center">
      <p className="text-destructive mb-4 font-bold">Network Connection Flaky</p>
      <button onClick={onRetry} className="border border-border px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-accent">
        Retry Fetch
      </button>
    </div>
  );
}