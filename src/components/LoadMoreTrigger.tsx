import { forwardRef } from 'react';

export const LoadMoreTrigger = forwardRef<HTMLDivElement, { isFetching: boolean, hasNext: boolean }>(({ isFetching, hasNext }, ref) => (
  <div ref={ref} className="py-16 text-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">
    {isFetching ? 'Fetching...' : hasNext ? 'Scroll to load more' : 'Archive complete'}
  </div>
));