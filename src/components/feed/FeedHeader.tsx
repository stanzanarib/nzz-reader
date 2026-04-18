export function FeedHeader({ topics, q }: { topics: string[], q: string }) {
  return (
    <header className="mb-8 border-b border-border pb-4">
      <h2 className="display-serif text-2xl font-bold">{topics.length > 0 ? 'Filtered News' : 'Latest Feed'}</h2>
      {q && <p className="text-xs text-muted-foreground mt-1">Search results for "{q}"</p>}
    </header>
  );
}