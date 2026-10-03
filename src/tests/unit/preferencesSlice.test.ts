import { describe, it, expect } from 'vitest';
import preferencesReducer, { toggleCategory } from '@/store/slices/preferencesSlice';
import { UserPreferences } from '@/types';

describe('preferencesSlice reducers', () => {
  const baseState: UserPreferences = {
    selectedCategories: ['technology'],
    enabledSources: ['news', 'movie', 'social'],
    theme: 'system',
  };

  it('should add a category if it is not selected', () => {
    const nextState = preferencesReducer(baseState, toggleCategory('sports'));
    expect(nextState.selectedCategories).toContain('sports');
    expect(nextState.selectedCategories).toContain('technology');
  });

  it('should prevent removing the last selected category', () => {
    const nextState = preferencesReducer(baseState, toggleCategory('technology'));
    expect(nextState.selectedCategories).toHaveLength(1);
    expect(nextState.selectedCategories).toContain('technology');
  });
});
