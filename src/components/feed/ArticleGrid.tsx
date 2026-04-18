import type { Article } from '#/api/mockApi';
import { Link } from '@tanstack/react-router';


export function ArticleGrid({ articles }: { articles: Article[] }) {
  return (
    <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-2">
      {articles.map((article) => (
        <Link key={article.id} to="/article/$id" params={{ id: article.id }} className="group bg-background p-4 hover:bg-accent/30">
          <article className="flex h-full flex-col justify-between">
            <div>
              <span className="text-[9px] font-black uppercase text-primary">{article.topics[0]?.name}</span>
              <h3 className="display-serif mt-2 text-lg font-bold leading-snug">{article.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground italic line-clamp-2">{article.lead}</p>
            </div>
            <div className="mt-4 text-[9px] font-bold uppercase text-muted-foreground">
              {article.author} <span className="opacity-0 group-hover:opacity-100 ml-2">Read →</span>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}