import {
  addStreamAvailability,
  updateLoading,
  updateStreamingAvailabilityError,
} from 'state/slices/streamingAvailabilitySlice';

export const getStreamingAvailability = async (
  dispatch: any,
  movieID: string
) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      movieID,
    }),
  };
  dispatch(updateLoading(true));
  try {
    const data = await fetch(
      '/.netlify/functions/getStreamingAvailability',
      options
    ).then(response => response.json());
    dispatch(addStreamAvailability(data.result?.streamingInfo?.us));
  } catch (e: any) {
    console.log('getStreamingAvailability Service Call Error:', e.message);
    dispatch(updateStreamingAvailabilityError(true));
  }
  dispatch(updateLoading(false));
};
