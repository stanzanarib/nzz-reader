import { useBookmarks } from '#/hooks/useBookmarks';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('useBookmarks', () => {
  // Clear localStorage and mocks before each test to ensure isolation
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with empty bookmarks', () => {
    const { result } = renderHook(() => useBookmarks());
    expect(result.current.bookmarks).toEqual([]);
  });

  it('should add a bookmark and save to localStorage', () => {
    const { result } = renderHook(() => useBookmarks());

    act(() => {
      result.current.toggleBookmark('art-1');
    });

    expect(result.current.bookmarks).toContain('art-1');
    expect(localStorage.getItem('nzz_bookmarks')).toBe(JSON.stringify(['art-1']));
  });

  it('should remove a bookmark if it already exists (toggle)', () => {
    localStorage.setItem('nzz_bookmarks', JSON.stringify(['art-1']));
    
    const { result } = renderHook(() => useBookmarks());

    act(() => {
      result.current.toggleBookmark('art-1');
    });

    expect(result.current.bookmarks).not.toContain('art-1');
    expect(localStorage.getItem('nzz_bookmarks')).toBe(JSON.stringify([]));
  });

  it('should correctly report isBookmarked status', () => {
    const { result } = renderHook(() => useBookmarks());

    act(() => {
      result.current.toggleBookmark('art-1');
    });

    expect(result.current.isBookmarked('art-1')).toBe(true);
    expect(result.current.isBookmarked('art-2')).toBe(false);
  });

  it('should handle corrupted localStorage data gracefully', () => {
    // Manually inject invalid JSON into localStorage
    localStorage.setItem('nzz_bookmarks', 'NOT_VALID_JSON');
    
    const { result } = renderHook(() => useBookmarks());
    
    // Should fallback to empty array instead of crashing
    expect(result.current.bookmarks).toEqual([]);
  });
});