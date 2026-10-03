'use client';

import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useAppDispatch } from '@/store/hooks';
import { setSearchQuery } from '@/store/slices/contentSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const debounced = useDebounce(searchTerm, 350);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    dispatch(setSearchQuery(debounced));
  }, [debounced, dispatch]);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search news, movies, or posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>

      <div className="flex items-center gap-4 ml-4">
        <button
          onClick={toggleTheme}
          aria-label="toggle dark mode"
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-700">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
            SD
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-slate-700 dark:text-slate-300">
            Shantanu Dey
          </span>
        </div>
      </div>
    </header>
  );
}
