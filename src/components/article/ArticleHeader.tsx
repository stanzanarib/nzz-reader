import type { Article } from '#/api/mockApi';
import { User, Clock, Crown, Share2, Check } from 'lucide-react';
import { useState } from 'react';

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const deepLink = `${window.location.origin}/article/${article.id}`;
    
    // Try native share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.lead,
          url: deepLink,
        });
        return;
      } catch (err) {
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(deepLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = deepLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="mb-12">
      {/* Hero Image */}
      {article.imageUrl && (
        <div className="relative mb-8 h-96 overflow-hidden rounded-lg bg-muted">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover"
          />
          {article.premium && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 px-3 py-2 text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg border border-amber-300/50">
              <Crown className="h-4 w-4 fill-current" />
              Premium
            </div>
          )}
        </div>
      )}
      
      {/* Topic Tags */}
      <div className="mb-6 flex flex-wrap gap-2">
        {article.topics.map((t) => (
          <span 
            key={t.id} 
            className="bg-primary/10 text-primary px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded"
          >
            {t.name}
          </span>
        ))}
      </div>
      
      {/* Title */}
      <h1 className="display-serif mb-6 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
        {article.title}
      </h1>
      
      {/* Lead */}
      <p className="display-serif text-xl leading-relaxed text-muted-foreground/90 italic mb-8">
        {article.lead}
      </p>
      
      {/* Meta Information & Actions */}
      <div className="flex flex-col gap-4 border-t border-border pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-foreground">{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{new Date(article.publishedAt).toLocaleDateString('de-CH')}</span>
            </div>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className={`flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest border rounded transition-colors ${
              copied
                ? 'border-green-600 bg-green-50 text-green-600'
                : 'border-border hover:bg-accent/30 text-foreground'
            }`}
            title="Share article"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                Share
              </>
            )}
          </button>
        </div>

        {/* Premium Indicator */}
        {article.premium && (
          <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-amber-600">
            <Crown className="h-3.5 w-3.5 fill-current" />
            Premium Article
          </div>
        )}
      </div>
    </header>
  );
}