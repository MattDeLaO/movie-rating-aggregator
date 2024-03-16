import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { determineOverallAverage } from 'state/helpers';
import { Media } from 'types/global';

type MediaState = {
  isLoading: boolean;
  isError: boolean;
  currentMedia: {} | Media;
};

const initialState: MediaState = {
  isLoading: false,
  isError: false,
  currentMedia: {},
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    addMedia: (state, action) => {
      if (action.payload.Ratings) {
        action.payload.averageRating = determineOverallAverage(
          action.payload.Ratings
        );
      }
      return {
        ...state,
        currentMedia: action.payload,
      };
    },
    replaceCurrentMedia: (state, action: PayloadAction<Media>) => ({
      ...state,
      currentMovie: action.payload,
    }),
    updateSearchError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isError: action.payload,
    }),
    updateLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload,
    }),
  },
});

export const {
  addMedia,
  replaceCurrentMedia,
  updateSearchError,
  updateLoading,
} = mediaSlice.actions;
export default mediaSlice.reducer;
