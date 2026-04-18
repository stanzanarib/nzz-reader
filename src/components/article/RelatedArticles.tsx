import type { Article } from '#/api/mockApi';
import { Link } from '@tanstack/react-router';

interface RelatedArticlesProps {
  related: Article[];
  currentId: string;
  topic: { id: string; name: string };
}

export function RelatedArticles({ related, currentId, topic }: RelatedArticlesProps) {
  // Filter out the current article and take the first two
  const filtered = related.filter((a) => a.id !== currentId).slice(0, 2);
  
  if (filtered.length === 0) return null;

  return (
    <section className="mt-24 border-t-4 border-foreground pt-12">
      <h4 className="island-kicker mb-8 text-[11px] text-primary">
        More in {topic?.name}
      </h4>
      <div className="grid gap-8 md:grid-cols-2">
        {filtered.map((rel) => (
          <Link 
            key={rel.id} 
            to="/article/$id" 
            params={{ id: rel.id }} 
            className="group block"
          >
            <h5 className="display-serif mb-2 text-lg font-bold leading-tight group-hover:underline">
              {rel.title}
            </h5>
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {rel.lead}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}