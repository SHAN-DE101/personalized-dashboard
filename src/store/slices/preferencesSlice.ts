import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentCategory, ContentSourceType, UserPreferences } from '@/types';

const STORAGE_KEY = 'dashboard_preferences';

const loadPreferences = (): UserPreferences => {
  if (typeof window === 'undefined') {
    return {
      selectedCategories: ['technology', 'finance'],
      enabledSources: ['news', 'movie', 'social'],
      theme: 'system',
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw
      ? JSON.parse(raw)
      : {
          selectedCategories: ['technology', 'finance'],
          enabledSources: ['news', 'movie', 'social'],
          theme: 'system',
        };
  } catch {
    return {
      selectedCategories: ['technology', 'finance'],
      enabledSources: ['news', 'movie', 'social'],
      theme: 'system',
    };
  }
};

const initialState: UserPreferences = loadPreferences();

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<ContentCategory>) => {
      const cat = action.payload;
      if (state.selectedCategories.includes(cat)) {
        if (state.selectedCategories.length > 1) {
          state.selectedCategories = state.selectedCategories.filter((c) => c !== cat);
        }
      } else {
        state.selectedCategories.push(cat);
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    },
    toggleSource: (state, action: PayloadAction<ContentSourceType>) => {
      const src = action.payload;
      if (state.enabledSources.includes(src)) {
        if (state.enabledSources.length > 1) {
          state.enabledSources = state.enabledSources.filter((s) => s !== src);
        }
      } else {
        state.enabledSources.push(src);
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    },
  },
});

export const { toggleCategory, toggleSource } = preferencesSlice.actions;
export default preferencesSlice.reducer;
