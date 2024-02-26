import axios from 'axios';
import { ACTION_TYPE } from 'types/global';

const apiKey = process.env.REACT_APP_OMDB_API_KEY;

export const getMedia = async (dispatch: any, movieTitle: string) => {
  const options = {
    method: 'GET',
    url: `https://www.omdbapi.com`,
    params: {
      apiKey,
      t: movieTitle,
    },
  };
  dispatch({ type: ACTION_TYPE.LOADING, payload: true });
  try {
    const response = await axios.request(options);
    console.log('getMedia:', response.data);
    const { data } = response;
    if (data.Error) {
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
