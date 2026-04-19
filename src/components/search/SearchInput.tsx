import { Search as SearchIcon, X } from 'lucide-react';

interface SearchInputProps {
  query: string;
  onChange: (val: string) => void;
  onClear: () => void;
}

export function SearchInput({ query, onChange, onClear }: SearchInputProps) {
  return (
    <div className="relative max-w-2xl">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title, lead, or content..."
        className="h-11 w-full rounded-none border border-border bg-background pl-10 pr-10 text-sm focus:border-primary focus:outline-none transition-colors"
        aria-label="Search articles"
      />
      {query && (
        <button 
          type="button" 
          onClick={onClear} 
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}