'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Flame, Bookmark, Settings, Layers } from 'lucide-react';

const navItems = [
  { name: 'Unified Feed', href: '/', icon: LayoutDashboard },
  { name: 'Trending', href: '/trending', icon: Flame },
  { name: 'Favorites', href: '/favorites', icon: Bookmark },
  { name: 'Preferences', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between hidden md:flex min-h-screen">
      <div className="p-6">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="p-2 rounded-xl bg-indigo-600 text-white">
            <Layers className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
            OmniDash
          </span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-400">
        OmniFeed Engine v1.0
      </div>
    </aside>
  );
}
