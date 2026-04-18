import { Search as SearchIcon, X } from 'lucide-react';

interface SearchInputProps {
  query: string;
  onChange: (val: string) => void;
  onClear: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SearchInput({ query, onChange, onClear, onSubmit }: SearchInputProps) {
  return (
    <form onSubmit={onSubmit} className="relative flex max-w-2xl gap-2">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by title, lead, or content..."
          className="h-11 w-full rounded-none border border-border bg-background pl-10 pr-10 text-sm focus:border-primary focus:outline-none"
        />
        {query && (
          <button type="button" onClick={onClear} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <button type="submit" className="bg-primary px-6 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90">
        Search
      </button>
    </form>
  );
}