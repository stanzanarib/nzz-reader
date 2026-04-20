import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { useState, useEffect } from 'react'

// Core API
import { fetchFeed } from '../api/mockApi'

// UI Components
import { SearchInput } from '../components/search/SearchInput'
import { SearchResultList } from '../components/search/SearchResultList'
import { ErrorDisplay } from '../components/ErrorDisplay'
import { useDebounce } from '#/components/utils.ts/debounce'

const searchSchema = z.object({ 
  q: z.string().catch('') 
})

export const Route = createFileRoute('/search')({
  validateSearch: (search) => searchSchema.parse(search),
  component: SearchPage,
})



function SearchPage() {
  const { q } = Route.useSearch()
  const navigate = useNavigate({ from: '/search' })
  const [localQuery, setLocalQuery] = useState(q)
  
  // Debounce the local query - waits 300ms after user stops typing
  const debouncedQuery = useDebounce(localQuery, 300)

  // Sync internal input state with URL search params
  useEffect(() => {
    setLocalQuery(q)
  }, [q])

  // Auto-update URL when debounced query changes
  useEffect(() => {
    navigate({ search: { q: debouncedQuery } })
  }, [debouncedQuery, navigate])

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['search', q],
    queryFn: () => fetchFeed({ q }),
    enabled: q.length > 0,
  })

  return (
    <main className="page-container px-4 pb-20 pt-10">
      <section className="mb-12">
        <h2 className="display-serif mb-6 text-3xl font-bold">Archive Search</h2>
        <SearchInput 
          query={localQuery} 
          onChange={setLocalQuery} 
          onClear={() => { 
            setLocalQuery(''); 
            navigate({ search: { q: '' } }); 
          }}
        />
      </section>

      {!q ? (
        <div className="border-t border-border py-20 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
          Enter a keyword to search the archive
        </div>
      ) : isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 animate-pulse border border-border bg-muted/10" />
          ))}
        </div>
      ) : isError ? (
        <ErrorDisplay onRetry={refetch} />
      ) : (
        <SearchResultList 
          results={data?.data || []} 
          query={q} 
        />
      )}
    </main>
  )
}