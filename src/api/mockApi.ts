import { ARTICLES } from './seed';

export type Article = {
  id: string;
  title: string;
  lead: string;
  body: string;
  author: string;
  publishedAt: string;
  topics: { id: string; name: string }[];
  premium: boolean;
  imageUrl: string | null;
};

export type FeedResponse = {
  data: Article[];
  meta: { nextPage: number | null; total: number };
};

const PAGE_SIZE = 10;

// Simulated network delay
const delay = () =>
  new Promise((r) => setTimeout(r, 300 + Math.random() * 400));

export async function fetchFeed(
  params: { page?: number; topics?: string[]; q?: string; pageSize?: number } = {}
): Promise<FeedResponse> {
  await delay();

  if (Math.random() < 0.05) throw new Error('Network error');

  const page = params.page ?? 0;
  // Use passed pageSize, or fallback to the module-level PAGE_SIZE constant
  const limit = params.pageSize ?? PAGE_SIZE;

  let filtered = ARTICLES;

  // Topic Filtering logic
  if (params.topics?.length) {
    filtered = filtered.filter((a) =>
      a.topics.some((t: { id: string; name: string }) => params.topics!.includes(t.id))
    );
  }

  // Free-text Search logic
  if (params.q) {
    const q = params.q.toLowerCase();
    filtered = filtered.filter((a) =>
      [a.title, a.lead, a.body].some((f) => f.toLowerCase().includes(q))
    );
  }

  const start = page * limit;
  const slice = filtered.slice(start, start + limit);
  const nextPage = start + limit < filtered.length ? page + 1 : null;

  return { data: slice, meta: { nextPage, total: filtered.length } };
}

export async function fetchArticle(id: string): Promise<Article> {
  await delay();
  const article = ARTICLES.find((a) => a.id === id);
  if (!article) throw new Error('Not found');
  return article;
}