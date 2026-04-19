

interface SideBarProps {
     activeTopics: string[];
     onToggleTopic: (id:string) => void;
     onReset: () => void;
}


export function TopicSidebar({ activeTopics, onToggleTopic, onReset }:SideBarProps) {
  const NZZ_TOPICS = [{id: 'politik', name: 'Politik'}, {id: 'wirtschaft', name: 'Wirtschaft'}, {id: 'feuilleton', name: 'Feuilleton'}, {id: 'sport', name: 'Sport'}, {id: 'wissenschaft', name: 'Wissenschaft'}, {id: 'meinung', name: 'Meinung'}, {id: 'international', name: 'International'}, {id: 'zuerich', name: 'Zürich'}];
  
  return (
    <aside className="w-full shrink-0 md:sticky md:top-24 md:h-fit md:w-48">
      <h3 className="island-kicker mb-4 text-[10px] text-muted-foreground">Topics</h3>
      <div className="flex flex-wrap gap-2 md:flex-col md:gap-1">
        {NZZ_TOPICS.map((t) => {
          const isActive = activeTopics.includes(t.id);
          return (
            <button key={t.id} onClick={() => onToggleTopic(t.id)} 
              className={`flex items-center justify-between px-2 py-1.5 text-left text-xs ${isActive ? 'bg-primary text-white font-bold' : 'hover:bg-accent'}`}>
              {t.name} {isActive && <span className="ml-2 text-[8px]">●</span>}
            </button>
          );
        })}
      </div>
      {activeTopics.length > 0 && (
        <button onClick={onReset} className="mt-4 text-[10px] font-bold uppercase text-destructive hover:underline">Reset Filters</button>
      )}
    </aside>
  );
}