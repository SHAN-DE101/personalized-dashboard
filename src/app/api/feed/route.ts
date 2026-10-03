import { NextResponse } from 'next/server';
import { ContentItem, ContentCategory } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const categories = (searchParams.get('categories') || 'technology,finance').split(',') as ContentCategory[];
  const query = (searchParams.get('q') || '').trim().toLowerCase();

  const items: ContentItem[] = [];

  // 1. News items (with dynamic mock generation for high reliability)
  categories.forEach((cat, idx) => {
    items.push({
      id: `news-${page}-${idx}-${cat}`,
      type: 'news',
      category: cat,
      title: `${cat.toUpperCase()} Insight: Major structural shifts observed in Q4`,
      description: `Analysis into the newest developments in ${cat}. Market dynamics and adoption curves show accelerating momentum globally.`,
      imageUrl: `https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80`,
      sourceUrl: 'https://news.ycombinator.com',
      publishedAt: new Date(Date.now() - (idx + page) * 3600000).toISOString(),
      authorOrCreator: 'Global Tech Wire',
    });
  });

  // 2. Recommendations (Movies/Music)
  items.push({
    id: `rec-${page}-1`,
    type: 'movie',
    category: 'entertainment',
    title: 'Inception & Beyond: Mind-Bending Narratives',
    description: 'A curated cinematic experience exploring non-linear timelines, cerebral suspense, and atmospheric sound design.',
    imageUrl: `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80`,
    sourceUrl: 'https://www.themoviedb.org',
    publishedAt: new Date().toISOString(),
    authorOrCreator: 'TMDB Recommendations',
    likesOrScore: 88,
    metadata: { rating: 8.8 },
  });

  // 3. Social Media Posts
  items.push({
    id: `social-${page}-1`,
    type: 'social',
    category: 'technology',
    title: 'Server Actions vs Traditional REST endpoints in 2026',
    description: 'Simplifying state transitions and eliminating boilerplate endpoints has completely revamped developer productivity. #webdev #react',
    sourceUrl: 'https://twitter.com',
    publishedAt: new Date(Date.now() - 1200000).toISOString(),
    authorOrCreator: '@dan_developer',
    likesOrScore: 412,
    metadata: { handle: 'dan_developer', tags: ['#react', '#fullstack'] },
  });

  items.push({
    id: `social-${page}-2`,
    type: 'social',
    category: 'finance',
    title: 'Decentralized Treasury Liquidity metrics for decentralized apps',
    description: 'Smart contracts automating liquidity rebalancing are cutting protocol fees by ~32%. The data speaks for itself. #fintech',
    sourceUrl: 'https://twitter.com',
    publishedAt: new Date(Date.now() - 4800000).toISOString(),
    authorOrCreator: '@sarah_quant',
    likesOrScore: 689,
    metadata: { handle: 'sarah_quant', tags: ['#fintech', '#markets'] },
  });

  // Filter matching search query if present
  const filtered = query
    ? items.filter(
        (i) =>
          i.title.toLowerCase().includes(query) ||
          i.description.toLowerCase().includes(query) ||
          i.category.toLowerCase().includes(query)
      )
    : items;

  return NextResponse.json({ items: filtered });
}
