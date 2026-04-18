// src/hooks/useArticles.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFeed } from '../api/mockApi';

export function useArticles(params: { topics?: string[]; q?: string }) {
  return useInfiniteQuery({
    queryKey: ['articles', params],
    queryFn: ({ pageParam = 0 }) => fetchFeed({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.meta.nextPage,
    initialPageParam: 0,
    retry: 1, 
  });
}