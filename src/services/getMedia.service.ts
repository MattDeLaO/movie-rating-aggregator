import {
  addMedia,
  updateLoading,
  updateSearchError,
} from 'state/slices/mediaSlice';
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
  } catch (e: any) {
    console.log('getMedia Service Call Error:', e.message);
    dispatch(updateSearchError(true));
  }
  dispatch(updateLoading(false));
};
