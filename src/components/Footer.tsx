export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-border px-4 pb-14 pt-10 text-muted-foreground">
      <div className="page-container flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div className="space-y-1">
          <p className="m-0 text-sm font-medium">
            &copy; {year} Stanza Narib. All rights reserved.
          </p>
          <p className="text-xs opacity-70">
            NZZ Frontend Take-Home Challenge
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-2 sm:items-end">
          <p className="island-kicker m-0 text-[10px] tracking-widest text-primary">
            Built with TanStack Start & TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}