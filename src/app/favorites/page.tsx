'use client';

import React from 'react';
import { useAppSelector } from '@/store/hooks';
import ContentCard from '@/components/feed/ContentCard';
import { Bookmark } from 'lucide-react';

export default function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites.items);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Saved Favorites
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Articles, media, and posts you have bookmarked for later.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <Bookmark className="w-10 h-10 mb-2 text-slate-300" />
          <p className="font-semibold text-base">No favorites saved yet</p>
          <span className="text-xs text-slate-500 mt-1">
            Click the heart icon on any card in your feed to save it here.
          </span>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
