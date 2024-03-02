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
    const data = await fetch('/.netlify/functions/getMedia', options).then(
      response => response.json()
    );
    if (data?.Error) {
      dispatch({ type: ACTION_TYPE.SEARCH_ERROR, payload: true });
    } else {
      dispatch({ type: ACTION_TYPE.ADD_MOVIE, payload: data });
    }
    dispatch({ type: ACTION_TYPE.LOADING, payload: false });
  } catch (e: any) {
    console.log(e.message);
    dispatch({ type: ACTION_TYPE.LOADING, payload: false });
    dispatch({ type: ACTION_TYPE.SEARCH_ERROR, payload: true });
  }
};
