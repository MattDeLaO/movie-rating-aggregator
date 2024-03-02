import fetch from 'node-fetch';
const apiKey = process.env.REACT_APP_STREAM_AVAILABILITY_API_KEY;

export const handler = async event => {
  const eventBody = JSON.parse(event?.body);
  const url = `https://streaming-availability.p.rapidapi.com/get?output_language=en&imdb_id=${eventBody.movieID}`;

  try {
    const options = {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (e) {
    console.log('REQUEST_ERROR:', e.message);
    return {
      statusCode: 400,
      body: e.stack,
    };
  }
};
