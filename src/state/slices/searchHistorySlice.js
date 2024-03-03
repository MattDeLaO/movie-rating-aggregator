import { createSlice } from '@reduxjs/toolkit';
import { shouldAddSubmissionToSearchHistory } from 'state/helpers';

const initialState = {
  history: [],
  isEnabled: true,
};

const searchHistorySlice = createSlice({
  name: 'searchHistroy',
  initialState,
  reducers: {
    addToSearchHistory: (state, action) => {
      console.log('state is equal to:', state);
      if (shouldAddSubmissionToSearchHistory(state, action.payload)) {
        state.searchHistory.history = [
          action.payload,
          ...state.searchHistory.history,
        ];
      }
    },
    removeFromSearchHistory: (state, action) => {
      state.searchHistory.history = state.searchHistory.history.filter(
        media => media.Title !== action.payload.Title
      );
    },
    updateSearchHistoryToggle: (state, action) => {
      state.searchHistory.isEnabled = action.payload;
    },
  },
});

export const {
  addToSearchHistory,
  removeFromSearchHistory,
  updateSearchHistoryToggle,
} = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
