import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  Outlet,
  Link,
  ScrollRestoration,
  useLocation, // Added for animation tracking
} from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion' 
import Footer from '../components/Footer'
import Header from '../components/Header'
import appCss from '../styles.css?url'
import type { QueryClient } from '@tanstack/react-query'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'

interface MyRouterContext {
  queryClient: QueryClient
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'NZZ Digital Archive' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="display-serif text-6xl font-bold opacity-20">404</h1>
      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
        Seite nicht gefunden
      </p>
      <Link 
        to="/"
        className="mt-10 border border-primary px-8 py-3 text-[10px] font-black uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground" search={{}}      >
        Zurück zur Übersicht
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-6">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h1 className="display-serif text-2xl font-bold">Verbindungsfehler</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground italic">
        {error.message || 'Die Verbindung zum NZZ-Archiv wurde unterbrochen.'}
      </p>
      <button
        onClick={() => reset()}
        className="mt-8 flex items-center gap-2 mx-auto bg-primary px-8 py-3 text-[10px] font-black uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
      >
        <RefreshCw className="h-3 w-3" /> Erneut versuchen
      </button>
    </div>
  ),
  component: RootComponent,
})

function RootComponent() {
  const location = useLocation() // Track location for animation keys

  return (
    <RootDocument>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">
          {/* Framer Motion Wrap */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ 
                duration: 0.60, 
                ease: [0.22, 1, 0.36, 1] // Custom "Out-Expo" for professional feel
              }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
      <ScrollRestoration />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased selection:bg-primary/20">
        {children}
        <Scripts />
      </body>
    </html>
  )
}