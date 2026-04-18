import type { Article } from '#/api/mockApi';
import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';

interface BookmarkListItemProps {
  article: Article;
  onRemove: (id: string) => void;
}

export function BookmarkListItem({ article, onRemove }: BookmarkListItemProps) {
  return (
    <div className="bg-background flex items-center justify-between gap-6 p-4 transition-colors hover:bg-accent/50">
      <Link to="/article/$id" params={{ id: article.id }} className="flex-1 group">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-[9px] font-black uppercase tracking-widest text-primary">
            {article.topics[0]?.name}
          </span>
          {article.premium && <span className="badge-premium">Premium</span>}
        </div>
        <h3 className="display-serif text-lg font-bold group-hover:underline">
          {article.title}
        </h3>
      </Link>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => onRemove(article.id)}
          className="text-muted-foreground hover:text-destructive text-[10px] font-bold uppercase tracking-tighter transition-colors"
        >
          Remove
        </button>
        <ChevronRight className="text-muted-foreground h-4 w-4" />
      </div>
    </div>
  );
}