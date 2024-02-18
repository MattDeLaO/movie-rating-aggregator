import axios from 'axios';
import { ACTION_TYPE } from 'types/global';

export const getStreamingAvailability = async (
  dispatch: any,
  movieID: string
) => {
  const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/get',
    params: {
      output_language: 'en',
      imdb_id: movieID,
    },
    headers: {
      'X-RapidAPI-Key': '0335d87bfdmshe185805710ab1b7p14e11djsn3bb675c83ca4',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
    },
  };
  try {
    const response = await axios.request(options);
    const { data } = response;
    dispatch({ type: ACTION_TYPE.ADD_STREAMING_AVAILABILITY, payload: data });
    console.log('getStreamingAvailability', response.data);
  } catch (e: any) {
    console.log(e.message);
  }
};
