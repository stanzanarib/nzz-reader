import { useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';

interface FeedState {
  scrollY: number;
  filters: string[];
  query: string;
}

const FEED_STATE_KEY = 'nzz-feed-state';

/**
 * Hook to preserve and restore feed state (scroll position, filters, search)
 * Saves state when user navigates away, restores when they come back
 */
export function useFeedStatePreservation() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate({ from: '/' });

  // Save state to sessionStorage when navigating away
  const saveFeedState = (filters: string[], query: string) => {
    if (scrollContainerRef.current) {
      const state: FeedState = {
        scrollY: scrollContainerRef.current.scrollTop,
        filters,
        query,
      };
      sessionStorage.setItem(FEED_STATE_KEY, JSON.stringify(state));
    }
  };

  // Restore state and scroll position
  const restoreFeedState = () => {
    try {
      const stored = sessionStorage.getItem(FEED_STATE_KEY);
      if (stored && scrollContainerRef.current) {
        const state: FeedState = JSON.parse(stored);
        // Restore scroll after a brief delay to ensure DOM is ready
        setTimeout(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = state.scrollY;
          }
        }, 0);
        return state;
      }
    } catch (err) {
      console.error('Failed to restore feed state:', err);
    }
    return null;
  };

  // Clear saved state (when user explicitly changes filters)
  const clearFeedState = () => {
    sessionStorage.removeItem(FEED_STATE_KEY);
  };

  return {
    scrollContainerRef,
    saveFeedState,
    restoreFeedState,
    clearFeedState,
  };
}