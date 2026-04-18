import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 px-4 backdrop-blur-lg">
      <nav className="page-container flex flex-wrap items-center gap-x-6 gap-y-2 py-3 sm:py-4">
        
        {/* NZZ Logo / Brand Link */}
        <h1 className="m-0 flex-shrink-0">
          <Link
            to="/"
            className="display-serif text-xl font-bold tracking-tight text-foreground no-underline"
          >
            NZZ <span className="text-muted-foreground font-light">Reader</span>
          </Link>
        </h1>

        {/* Navigation Links */}
        <div className="order-3 flex w-full flex-wrap items-center gap-x-6 gap-y-1 text-sm font-bold sm:order-2 sm:w-auto sm:flex-nowrap">
          <Link
            to="/"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
            activeOptions={{ exact: true }}
          >
            Feed
          </Link>
          <Link
            to="/bookmarks"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Bookmarks
          </Link>
          <Link
            to="/search"
            search={{ q: '' }}
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Search
          </Link>
        </div>

        {/* Theme & Utility Actions */}
        <div className="ml-auto flex items-center gap-4 sm:order-3">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
