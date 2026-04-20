import type { Article } from "./mockApi";

const authors = [
  'Stanza Narib',
  'Aimee V.',
  'Marco Russo',
  'Elena Fischer',
  'Dr. Reto Müller',
  'Sarah Jenkins',
  'Hans Peter Tanner',
];

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

const themes = [
  'Innovation',
  'Krise',
  'Wachstum',
  'Debatte',
  'Erfolg',
  'Wende',
  'Strategie',
  'Reform',
  'Trend',
  'Analyse',
];

// Diverse, working placeholder images
const placeholderImages = [
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
  'https://via.placeholder.com/800x600/4A90E2/FFFFFF?text=News+Image',
];

export const ARTICLES: Article[] = Array.from({ length: 60 }).map((_, index) => {
  const id = (index + 1).toString();
  const topic1 = topicsPool[index % topicsPool.length];
  const topic2 = index % 3 === 0 ? topicsPool[(index + 2) % topicsPool.length] : null;
  const theme = themes[index % themes.length];

  return {
    id,
    title: `${theme} in der ${topic1.name}: Was Sie wissen müssen (${id})`,
    lead: `Ein detaillierter Blick auf die neuesten Entwicklungen im Bereich ${topic1.name}. Wie Experten die Lage einschätzen und welche Konsequenzen sich daraus ergeben könnten.`,
    body: `Dies ist der vollständige Text für den Artikel ${id}.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    author: authors[index % authors.length],
    publishedAt: new Date(Date.now() - index * 3600000).toISOString(),
    topics: topic2 ? [topic1, topic2] : [topic1],
    premium: index % 4 === 0,
    imageUrl: placeholderImages[index % placeholderImages.length],
  };
});