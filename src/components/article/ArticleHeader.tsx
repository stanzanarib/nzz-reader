import type { Article } from '#/api/mockApi';
import { User, Clock } from 'lucide-react';

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className="mb-12">
      <div className="mb-6 flex flex-wrap gap-3">
        {article.topics.map((t) => (
          <span 
            key={t.id} 
            className="bg-primary/10 text-primary px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter"
          >
            {t.name}
          </span>
        ))}
      </div>
      
      <h1 className="display-serif mb-6 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
        {article.title}
      </h1>
      
      <p className="display-serif text-xl leading-relaxed text-muted-foreground/90 italic">
        {article.lead}
      </p>
      
      <div className="mt-10 flex items-center gap-6 border-t border-border pt-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-3.5 w-3.5" />
          <span className="text-foreground">{article.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" />
          <span>{new Date(article.publishedAt).toLocaleDateString('de-CH')}</span>
        </div>
      </div>
    </header>
  );
}