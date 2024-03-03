import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import {
  determineOverallAverage,
  shouldAddSubmissionToSearchHistory,
} from 'state/helpers';
// import { ACTION_TYPE, Media, Action } from 'types/global';

// type MediaState = {
//   isLoading: boolean;
//   error: boolean;
//   result: Media;
//   searchHistory: any[];
// };

// type MediaAction = {
//   type: string;
//   payload: Media;
// };

// const initialState = {
//   isLoading: false,
//   error: false,
//   result: {},
//   searchHistory: [],
// } satisfies MediaState as MediaState;

const initialState = {
  isLoading: false,
  isError: false,
  currentMedia: {},
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  //@ts-ignore
  reducers: {
    addMedia: (state, action) => {
      if (action.payload.Ratings) {
        action.payload.averageRating = determineOverallAverage(
          action.payload.Ratings
        );
      }
      state.currentMedia = action.payload;
    },
    replaceCurrentMedia: (state, action) => {
      state.currentMedia = action.payload;
    },
    updateSearchError: (state, action) => {
      state.isError = action.payload;
    },
    updateLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  addMedia,
  replaceCurrentMedia,
  updateSearchError,
  updateLoading,
} = mediaSlice.actions;
export default mediaSlice.reducer;
