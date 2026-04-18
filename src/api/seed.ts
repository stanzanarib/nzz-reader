import type { Article } from "./mockApi";

const authors = ['Stanza Narib', 'Aimee V.', 'Marco Russo', 'Elena Fischer', 'Dr. Reto Müller', 'Sarah Jenkins', 'Hans Peter Tanner'];
const topicsPool = [
  { id: 'politik', name: 'Politik' },
  { id: 'wirtschaft', name: 'Wirtschaft' },
  { id: 'feuilleton', name: 'Feuilleton' },
  { id: 'sport', name: 'Sport' },
  { id: 'wissenschaft', name: 'Wissenschaft' },
  { id: 'meinung', name: 'Meinung' },
  { id: 'international', name: 'International' },
  { id: 'zuerich', name: 'Zürich' },
];

export const ARTICLES: Article[] = Array.from({ length: 65 }).map((_, index) => {
  const id = (index + 1).toString();
  const topic1 = topicsPool[index % topicsPool.length];
  const topic2 = index % 3 === 0 ? topicsPool[(index + 2) % topicsPool.length] : null;
  
  // Rotating content themes to make search interesting
  const themes = ['Innovation', 'Krise', 'Wachstum', 'Debatte', 'Erfolg', 'Wende'];
  const theme = themes[index % themes.length];

  return {
    id,
    title: `${theme} in der ${topic1.name}: Was Sie wissen müssen (${id})`,
    lead: `Ein detaillierter Blick auf die neuesten Entwicklungen im Bereich ${topic1.name}. Wie Experten die Lage einschätzen.`,
    body: `Dies ist der vollständige Text für den Artikel ${id}. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    author: authors[index % authors.length],
    publishedAt: new Date(Date.now() - index * 3600000).toISOString(), // Each article is 1 hour older than the last
    topics: topic2 ? [topic1, topic2] : [topic1],
    premium: index % 4 === 0, // Every 4th article is premium
    imageUrl: `https://picsum.photos/seed/${id}/800/600`,
  };
});