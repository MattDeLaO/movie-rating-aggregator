import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { shouldAddSubmissionToSearchHistory } from 'state/helpers';
import { Media } from 'types/global';

type SearchHistoryState = {
  history: Media[];
  isEnabled: boolean;
};

const initialState: SearchHistoryState = {
  history: [],
  isEnabled: true,
};

const searchHistorySlice = createSlice({
  name: 'searchHistroy',
  initialState,
  reducers: {
    addToSearchHistory: (state, action: PayloadAction<Media>) => {
      console.log('state is equal to:', state);
      if (shouldAddSubmissionToSearchHistory(state, action.payload)) {
        state.history = [action.payload, ...state.history];
      }
    },
    removeFromSearchHistory: (state, action: PayloadAction<Media>) => {
      state.history = state.history.filter(
        media => media.Title !== action.payload.Title
      );
    },
    updateSearchHistoryToggle: (state, action: PayloadAction<boolean>) => {
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
