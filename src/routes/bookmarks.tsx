import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchFeed } from '../api/mockApi'
import { useBookmarks } from '../hooks/useBookmarks'
import { ErrorDisplay } from '../components/ErrorDisplay'
import { EmptyBookmarks } from '@/components/bookmark/EmptyBookmarks'
import { BookmarkListItem } from '@/components/bookmark/BookmarkListItem'

export const Route = createFileRoute('/bookmarks')({
  component: BookmarksPage,
})

function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useBookmarks()
  
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['articles', 'all'],
    queryFn: () => fetchFeed({ page: 0 }),
  })

  // Filter based on stored IDs
  const savedArticles = data?.data.filter(article => bookmarks.includes(article.id)) || []

  if (isLoading) {
    return <div className="py-20 text-center text-xs uppercase tracking-widest animate-pulse">Loading Library...</div>
  }

  if (isError) return <ErrorDisplay onRetry={refetch} />

  return (
    <main className="page-container px-4 pb-20 pt-10">
      <header className="mb-12 border-b border-border pb-6">
        <h2 className="display-serif text-3xl font-bold">Your Bookmarks</h2>
        <p className="text-muted-foreground mt-2 text-sm italic">
          {savedArticles.length} {savedArticles.length === 1 ? 'article' : 'articles'} saved for later.
        </p>
      </header>

      {savedArticles.length === 0 ? (
        <EmptyBookmarks />
      ) : (
        <div className="grid gap-px bg-border">
          {savedArticles.map((article) => (
            <BookmarkListItem 
              key={article.id} 
              article={article} 
              onRemove={toggleBookmark} 
            />
          ))}
        </div>
      )}
    </main>
  )
}