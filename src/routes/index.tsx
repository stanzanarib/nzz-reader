import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useArticles } from '../hooks/useArticles'
import { z } from 'zod'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

import { LoadingSkeletons } from '../components/LoadingSkeletons'
import { LoadMoreTrigger } from '../components/LoadMoreTrigger'
import { ErrorDisplay } from '../components/ErrorDisplay'
import { TopicSidebar } from '@/components/feed/TopicSidebar'
import { FeedHeader } from '@/components/feed/FeedHeader'
import { ArticleGrid } from '@/components/feed/ArticleGrid'

export const Route = createFileRoute('/')({
  validateSearch: (s) => z.object({ q: z.string().optional().catch(''), topics: z.array(z.string()).optional().catch([]) }).parse(s),
  component: FeedPage,
})

function FeedPage() {
  const { q = '', topics = [] } = Route.useSearch()
  const navigate = useNavigate({ from: '/' })
  const { ref, inView } = useInView()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, refetch } = useArticles({ q, topics })

  useEffect(() => { if (inView && hasNextPage) fetchNextPage() }, [inView, fetchNextPage, hasNextPage])

  const toggleTopic = (id: string) => {
    const nextTopics = topics.includes(id) ? topics.filter((t) => t !== id) : [...topics, id]
    navigate({ search: (p) => ({ ...p, topics: nextTopics, page: 0 }) })
  }

  if (status === 'error') return <ErrorDisplay onRetry={refetch} />

  return (
    <div className="page-container flex flex-col gap-8 px-4 pb-20 pt-10 md:flex-row">
      <TopicSidebar activeTopics={topics} onToggleTopic={toggleTopic} onReset={() => navigate({ search: (p) => ({ ...p, topics: [] }) })} />
      <div className="flex-1">
        <FeedHeader topics={topics} q={q} />
        {status === 'pending' ? <LoadingSkeletons /> : <ArticleGrid articles={data?.pages.flatMap(p => p.data) || []} />}
        <LoadMoreTrigger ref={ref} isFetching={isFetchingNextPage} hasNext={!!hasNextPage} />
      </div>
    </div>
  )
}