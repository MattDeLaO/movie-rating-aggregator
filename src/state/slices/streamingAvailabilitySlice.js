import { createSlice } from '@reduxjs/toolkit';
import { createStreamTableData } from '../helpers';

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
};

const streamingAvailabilitySlice = createSlice({
  name: 'streamingAvailability',
  initialState,
  reducers: {
    addStreamAvailability: (state, action) => {
      state.data = createStreamTableData(action.payload);
    },
    updateLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateStreamingAvailabilityError: (state, action) => {
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
