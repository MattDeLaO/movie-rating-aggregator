import { createSlice } from '@reduxjs/toolkit';
import { createStreamTableData } from '../helpers';
import type { PayloadAction } from '@reduxjs/toolkit';
import { StreamingServiceResult } from 'types/global';

type StreamingAvailabilityState = {
  isLoading: boolean;
  isError: boolean;
  data: null | StreamingServiceResult[];
};
const initialState: StreamingAvailabilityState = {
  isLoading: false,
  isError: false,
  data: null,
};

const streamingAvailabilitySlice = createSlice({
  name: 'streamingAvailability',
  initialState,
  reducers: {
    addStreamAvailability: (
      state,
      action: PayloadAction<StreamingServiceResult>
    ) => {
      state.data = createStreamTableData(action.payload);
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateStreamingAvailabilityError: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isError = action.payload;
    },
  },
});

export const {
  addStreamAvailability,
  updateLoading,
  updateStreamingAvailabilityError,
} = streamingAvailabilitySlice.actions;
export default streamingAvailabilitySlice.reducer;
