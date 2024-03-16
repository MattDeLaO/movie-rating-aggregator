import { configureStore } from '@reduxjs/toolkit';
import mediaSlice from './slices/mediaSlice';
import searchHistorySlice from './slices/searchHistorySlice';
import streamingAvailabilitySlice from './slices/streamingAvailabilitySlice';

export const store = configureStore({
  reducer: {
    media: mediaSlice,
    searchHistory: searchHistorySlice,
    streamingAvailability: streamingAvailabilitySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
