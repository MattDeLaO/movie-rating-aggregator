import fetch from 'node-fetch';
const apiKey = process.env.REACT_APP_OMDB_API_KEY;

export const handler = async event => {
  const eventBody = JSON.parse(event?.body);
  const url = `https://www.omdbapi.com/?t=${eventBody.title}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
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
