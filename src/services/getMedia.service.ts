import { ACTION_TYPE } from 'types/global';

export const getMedia = async (dispatch: any, title: string) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      title,
    }),
  };
  dispatch({ type: ACTION_TYPE.LOADING, payload: true });
  try {
    const response = await fetch('/.netlify/functions/getMedia', options).then(
      res => res.json()
    );
    if (response.Error) {
      dispatch({ type: ACTION_TYPE.SEARCH_ERROR, payload: true });
    } else {
      dispatch({ type: ACTION_TYPE.ADD_MOVIE, payload: response });
    }
    dispatch({ type: ACTION_TYPE.LOADING, payload: false });
  } catch (e: any) {
    console.log(e.message);
    dispatch({ type: ACTION_TYPE.LOADING, payload: false });
    dispatch({ type: ACTION_TYPE.SEARCH_ERROR, payload: true });
  }
};
