import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchArticle, fetchFeed } from '../api/mockApi'
import { useBookmarks } from '../hooks/useBookmarks'
import { useEffect, useState } from 'react'

import { ErrorDisplay } from '../components/ErrorDisplay'
import { ArticleNav } from '@/components/article/ArticleNav'
import { ArticleHeader } from '@/components/article/ArticleHeader'
import { ArticleBody } from '@/components/article/ArticleBody'
import { RelatedArticles } from '@/components/article/RelatedArticles'

export const Route = createFileRoute('/article/$id')({ component: ArticleDetail })

function ArticleDetail() {
  const { id } = Route.useParams()
  const [mounted, setMounted] = useState(false)
  const { toggleBookmark, isBookmarked } = useBookmarks()
  
  useEffect(() => { setMounted(true) }, [])

  const { data: article, isLoading, isError, refetch } = useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchArticle(id),
  })

  const { data: related } = useQuery({
    queryKey: ['related', article?.topics[0]?.id],
    queryFn: () => fetchFeed({ topics: [article?.topics[0]?.id || ''] }),
    enabled: !!article,
  })

  if (isLoading) return <div className="page-container max-w-2xl px-4 py-20 animate-pulse bg-muted h-96" />
  if (isError) return <ErrorDisplay onRetry={refetch} />
  if (!article) return null

  return (
    <main className="page-container max-w-2xl px-4 pb-24 pt-10">
      <ArticleNav id={id} isMounted={mounted} isBookmarked={isBookmarked(id)} onToggle={toggleBookmark} />
      <article>
        <ArticleHeader article={article} />
        <ArticleBody body={article.body} />
      </article>
      {related && (
        <RelatedArticles related={related.data} currentId={id} topic={article.topics[0]} />
      )}
    </main>
  )
}