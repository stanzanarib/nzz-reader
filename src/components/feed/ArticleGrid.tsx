import type { Article } from '#/api/mockApi';
import { Link } from '@tanstack/react-router';
import { ChevronRight, Crown } from 'lucide-react';
import { getRelativeTime } from '../utils.ts/helpers';



export function ArticleGrid({ articles }: { articles: Article[] }) {
  return (
    <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-2">
      {articles.map((article) => (
        <Link 
          key={article.id} 
          to="/article/$id" 
          params={{ id: article.id }} 
          className="group bg-background overflow-hidden hover:bg-accent/30 transition-colors"
        >
          <article className="flex h-full flex-col">
            {article.imageUrl && (
              <div className="relative h-40 overflow-hidden bg-muted">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                
                {article.premium && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 px-3 py-1.5 text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg border border-amber-300/50 backdrop-blur-sm">
                    <Crown className="h-3.5 w-3.5 fill-current" />
                    Premium
                  </div>
                )}
              </div>
            )}

            <div className="p-4 flex flex-col flex-1">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {article.topics.map((topic) => (
                  <span 
                    key={topic.id}
                    className="text-[9px] font-black uppercase text-primary tracking-tight"
                  >
                    {topic.name}
                  </span>
                ))}
              </div>

              <h3 className="display-serif text-lg font-bold leading-snug mb-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>

              <p className="text-xs text-muted-foreground italic line-clamp-2 mb-3">
                {article.lead}
              </p>

              <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
                <span className="text-[9px] font-bold uppercase text-muted-foreground">
                  {article.author} • {getRelativeTime(article.publishedAt)}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}