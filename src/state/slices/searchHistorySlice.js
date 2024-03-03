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
        state.history = [action.payload, ...state.history];
      }
    },
    removeFromSearchHistory: (state, action) => {
      state.history = state.history.filter(
        media => media.Title !== action.payload.Title
      );
    },
    updateSearchHistoryToggle: (state, action) => {
      state.isEnabled = action.payload;
    },
  },
});

export const {
  addToSearchHistory,
  removeFromSearchHistory,
  updateSearchHistoryToggle,
} = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
