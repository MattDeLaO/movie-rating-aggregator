import { configureStore } from '@reduxjs/toolkit';
import mediaSlice from './slices/mediaSlice';
import searchHistorySlice from './slices/searchHistorySlice';

export default configureStore({
  reducer: {
    media: mediaSlice,
    searchHistory: searchHistorySlice,
  },
});
