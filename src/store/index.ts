import { configureStore } from '@reduxjs/toolkit';
import preferencesReducer from './slices/preferencesSlice';
import favoritesReducer from './slices/favoritesSlice';
import contentReducer from './slices/contentSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      preferences: preferencesReducer,
      favorites: favoritesReducer,
      content: contentReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
