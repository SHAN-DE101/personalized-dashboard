import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem, ContentCategory } from '@/types';

interface ContentState {
  items: ContentItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  hasMore: boolean;
  searchQuery: string;
}

const initialState: ContentState = {
  items: [],
  status: 'idle',
  error: null,
  page: 1,
  hasMore: true,
  searchQuery: '',
};

export const fetchUnifiedContent = createAsyncThunk(
  'content/fetchUnified',
  async (
    {
      page,
      categories,
      query,
    }: {
      page: number;
      categories: ContentCategory[];
      query?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        categories: categories.join(','),
        ...(query ? { q: query } : {}),
      });

      const res = await fetch(`/api/feed?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch unified content');
      const data = await res.json();
      return { items: data.items as ContentItem[], page };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 1;
    },
    reorderFeed: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnifiedContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUnifiedContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.page === 1) {
          state.items = action.payload.items;
        } else {
          const existingIds = new Set(state.items.map((i) => i.id));
          const fresh = action.payload.items.filter((i) => !existingIds.has(i.id));
          state.items = [...state.items, ...fresh];
        }
        state.page = action.payload.page;
        state.hasMore = action.payload.items.length > 0;
      })
      .addCase(fetchUnifiedContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to load content';
      });
  },
});

export const { setSearchQuery, reorderFeed } = contentSlice.actions;
export default contentSlice.reducer;
