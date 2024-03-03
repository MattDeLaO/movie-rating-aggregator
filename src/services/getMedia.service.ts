import {
  addMedia,
  updateLoading,
  updateSearchError,
  //@ts-ignore
} from 'state/slices/mediaSlice';
//@ts-ignore
import { addToSearchHistory } from 'state/slices/searchHistorySlice';

export const getMedia = async (dispatch: any, title: string) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      title,
    }),
  };
  dispatch(updateLoading(true));
  try {
    const data = await fetch('/.netlify/functions/getMedia', options).then(
      response => response.json()
    );
    if (data?.Error) {
      dispatch(updateSearchError(true));
    } else {
      dispatch(addMedia(data));
      dispatch(addToSearchHistory(data));
    }
    dispatch(updateLoading(false));
  } catch (e: any) {
    console.log('getMedia Service Call Error:', e.message);
    dispatch(updateLoading(false));
    // TODO: fix this error from updating addToSearchHistory
    dispatch(updateSearchError(true));
  }
};
