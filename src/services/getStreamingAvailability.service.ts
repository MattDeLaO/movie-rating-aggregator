import { ACTION_TYPE } from 'types/global';

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
  try {
    const data = await fetch(
      '/.netlify/functions/getStreamingAvailability',
      options
    ).then(response => response.json());
    dispatch({
      type: ACTION_TYPE.ADD_STREAMING_AVAILABILITY,
      payload: data.result.streamingInfo.us,
    });
  } catch (e: any) {
    console.log(e.message);
  }
};
