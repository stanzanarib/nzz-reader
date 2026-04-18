import { Link } from '@tanstack/react-router';
import { BookmarkX } from 'lucide-react';

export function EmptyBookmarks() {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <div className="bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-full">
        <BookmarkX className="text-muted-foreground h-8 w-8" />
      </div>
      <p className="text-muted-foreground text-sm font-medium">No bookmarks yet.</p>
      <Link to="/" className="text-primary mt-4 text-xs font-bold uppercase tracking-widest hover:underline">
        Explore the Feed
      </Link>
    </div>
  );
}