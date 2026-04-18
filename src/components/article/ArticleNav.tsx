import { Link } from '@tanstack/react-router';
import { Bookmark, ChevronLeft } from 'lucide-react';

// Define the interface for the component props
interface ArticleNavProps {
  id: string;
  isMounted: boolean;
  isBookmarked: boolean;
  onToggle: (id: string) => void;
}

export function ArticleNav({ id, isMounted, isBookmarked, onToggle }: ArticleNavProps) {
  return (
    <nav className="mb-12 flex items-center justify-between border-b border-border pb-6">
      <Link 
        to="/" 
        className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-3 w-3" /> Back
      </Link>
      
      <button 
        onClick={() => onToggle(id)} 
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        <Bookmark 
          className="h-4 w-4" 
          fill={isMounted && isBookmarked ? "currentColor" : "none"} 
        />
        {isMounted && isBookmarked ? 'Saved' : 'Save'}
      </button>
    </nav>
  );
}