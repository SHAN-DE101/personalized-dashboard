'use client';

import React from 'react';
import { ContentItem } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import { Heart, ExternalLink, Sparkles, Newspaper, MessageSquare } from 'lucide-react';

interface Props {
  item: ContentItem;
}

export default function ContentCard({ item }: Props) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((f) => f.id === item.id);

  const getBadge = () => {
    switch (item.type) {
      case 'news':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
            <Newspaper className="w-3 h-3" /> News
          </span>
        );
      case 'movie':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300">
            <Sparkles className="w-3 h-3" /> Recommendation
          </span>
        );
      case 'social':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
            <MessageSquare className="w-3 h-3" /> Social
          </span>
        );
    }
  };

  return (
    <article
      data-testid="content-card"
      className="group relative flex flex-col md:flex-row bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {item.imageUrl && (
        <div className="w-full md:w-56 h-44 flex-shrink-0 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              {getBadge()}
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                {item.category}
              </span>
            </div>

            <button
              aria-label="favorite-button"
              onClick={() => dispatch(toggleFavorite(item))}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorite
                    ? 'fill-rose-500 text-rose-500'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              />
            </button>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 mb-1.5">
            {item.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{item.authorOrCreator || 'Verified Publisher'}</span>

          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {item.type === 'movie' ? 'Play Now' : 'Read More'}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
