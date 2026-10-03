import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store';
import ContentCard from '@/components/feed/ContentCard';
import { ContentItem } from '@/types';

const mockItem: ContentItem = {
  id: 'test-card-1',
  type: 'news',
  category: 'technology',
  title: 'Next.js App Router Architecture',
  description: 'A deep dive into server components and layouts.',
  imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
  sourceUrl: 'https://example.com/test',
  publishedAt: new Date().toISOString(),
  authorOrCreator: 'Lead Tech Reviewer',
};

describe('ContentCard Component', () => {
  it('renders content card details accurately', () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <ContentCard item={mockItem} />
      </Provider>
    );

    expect(screen.getByText('Next.js App Router Architecture')).toBeDefined();
    expect(screen.getByText('A deep dive into server components and layouts.')).toBeDefined();
    expect(screen.getByText('Lead Tech Reviewer')).toBeDefined();
    expect(screen.getByText('Read More')).toBeDefined();
  });

  it('toggles favorite state on button click', () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <ContentCard item={mockItem} />
      </Provider>
    );

    const favButton = screen.getByRole('button', { name: /favorite-button/i });
    fireEvent.click(favButton);

    const savedState = store.getState().favorites.items;
    expect(savedState).toHaveLength(1);
    expect(savedState[0].id).toBe('test-card-1');
  });
});
