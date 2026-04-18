import { useState, useEffect } from 'react'

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('nzz_bookmarks')
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse bookmarks", e)
      }
    }
  }, [])

  const toggleBookmark = (id: string) => {
    const next = bookmarks.includes(id)
      ? bookmarks.filter((b) => b !== id)
      : [...bookmarks, id]
    
    setBookmarks(next)
    localStorage.setItem('nzz_bookmarks', JSON.stringify(next))
  }

  const isBookmarked = (id: string) => bookmarks.includes(id)

  return { bookmarks, toggleBookmark, isBookmarked }
}