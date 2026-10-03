'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleCategory, toggleSource } from '@/store/slices/preferencesSlice';
import { ContentCategory, ContentSourceType } from '@/types';
import { Check } from 'lucide-react';

const categories: { key: ContentCategory; label: string }[] = [
  { key: 'technology', label: 'Technology' },
  { key: 'finance', label: 'Finance & Markets' },
  { key: 'sports', label: 'Sports' },
  { key: 'entertainment', label: 'Entertainment' },
  { key: 'science', label: 'Science' },
];

const sources: { key: ContentSourceType; label: string }[] = [
  { key: 'news', label: 'News Publications' },
  { key: 'movie', label: 'Media Recommendations' },
  { key: 'social', label: 'Social Feeds' },
];

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const preferences = useAppSelector((state) => state.preferences);

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Feed Preferences
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize what appears in your unified dashboard. Preferences persist across page reloads.
        </p>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Favorite Categories
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {categories.map((c) => {
            const isSelected = preferences.selectedCategories.includes(c.key);
            return (
              <button
                key={c.key}
                onClick={() => dispatch(toggleCategory(c.key))}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Active Sources
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {sources.map((s) => {
            const isSelected = preferences.enabledSources.includes(s.key);
            return (
              <button
                key={s.key}
                onClick={() => dispatch(toggleSource(s.key))}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-200 dark:shadow-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                {s.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
