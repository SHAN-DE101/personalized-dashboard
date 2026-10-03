'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUnifiedContent, reorderFeed } from '@/store/slices/contentSlice';
import SortableFeed from '@/components/feed/SortableFeed';
import { Loader2, Inbox } from 'lucide-react';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, searchQuery } = useAppSelector((state) => state.content);
  const preferences = useAppSelector((state) => state.preferences);

  useEffect(() => {
    dispatch(
      fetchUnifiedContent({
        page: 1,
        categories: preferences.selectedCategories,
        query: searchQuery,
      })
    );
  }, [dispatch, preferences.selectedCategories, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Unified Feed
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Personalized stream curated from your preferred sources and categories. Drag cards to reorder.
          </p>
        </div>
      </div>

      {status === 'loading' && items.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-2" />
          <span className="text-sm">Fetching your personalized stream...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <Inbox className="w-10 h-10 mb-2 text-slate-300" />
          <p className="font-semibold text-base">No content matches your filters</p>
          <span className="text-xs text-slate-500 mt-1">
            Try adjusting your search query or categories in Preferences.
          </span>
        </div>
      ) : (
        <SortableFeed items={items} onReorder={(reordered) => dispatch(reorderFeed(reordered))} />
      )}
    </div>
  );
}
