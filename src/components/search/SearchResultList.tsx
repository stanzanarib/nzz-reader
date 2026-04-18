import type { Article } from '#/api/mockApi';
import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';

export function SearchResultList({ results, query }: { results: Article[], query: string }) {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          {results.length} results for "{query}"
        </p>
      </div>
      <div className="grid gap-px bg-border">
        {results.map((article) => (
          <Link key={article.id} to="/article/$id" params={{ id: article.id }} className="group bg-background p-5 transition-colors hover:bg-accent/40">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-primary">{article.topics[0]?.name}</span>
                <h3 className="display-serif mt-1 text-xl font-bold leading-tight group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground italic">{article.lead}</p>
                <div className="mt-4 text-[9px] font-bold uppercase text-muted-foreground/60">
                  By {article.author} • {new Date(article.publishedAt).toLocaleDateString('de-CH')}
                </div>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 text-muted-foreground/30 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}