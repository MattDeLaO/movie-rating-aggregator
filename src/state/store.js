import { configureStore } from '@reduxjs/toolkit';
import mediaSlice from './slices/mediaSlice';
import searchHistorySlice from './slices/searchHistorySlice';
import streamingAvailabilitySlice from './slices/streamingAvailabilitySlice';

export default configureStore({
  reducer: {
    media: mediaSlice,
    searchHistory: searchHistorySlice,
    streamingAvailability: streamingAvailabilitySlice,
  },
});
