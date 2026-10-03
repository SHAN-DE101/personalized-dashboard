'use client';

import React from 'react';
import { Reorder } from 'framer-motion';
import { ContentItem } from '@/types';
import ContentCard from './ContentCard';
import { GripVertical } from 'lucide-react';

interface Props {
  items: ContentItem[];
  onReorder: (items: ContentItem[]) => void;
}

export default function SortableFeed({ items, onReorder }: Props) {
  return (
    <Reorder.Group axis="y" values={items} onReorder={onReorder} className="space-y-4">
      {items.map((item) => (
        <Reorder.Item
          key={item.id}
          value={item}
          className="relative group/drag"
          whileDrag={{ scale: 1.01 }}
        >
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/drag:opacity-60 cursor-grab active:cursor-grabbing p-1">
            <GripVertical className="w-4 h-4 text-slate-400" />
          </div>
          <ContentCard item={item} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
