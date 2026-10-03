'use client';

import React, { useEffect, useState } from 'react';
import { ContentItem } from '@/types';
import ContentCard from '@/components/feed/ContentCard';
import { Flame, Loader2 } from 'lucide-react';

export default function TrendingPage() {
  const [trendingItems, setTrendingItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/feed?categories=technology,finance,entertainment')
      .then((res) => res.json())
      .then((data) => {
        const sorted = (data.items || []).sort(
          (a: ContentItem, b: ContentItem) => (b.likesOrScore || 0) - (a.likesOrScore || 0)
        );
        setTrendingItems(sorted);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 text-amber-500 text-sm font-bold uppercase tracking-wider mb-1">
          <Flame className="w-4 h-4 fill-amber-500" /> High Engagement
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Trending Content
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          The most popular news, media recommendations, and community discussions.
        </p>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500 mb-2" />
          <span className="text-sm">Loading trending stories...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {trendingItems.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
