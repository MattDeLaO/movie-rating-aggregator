import fetch from 'node-fetch';
const apiKey = process.env.REACT_APP_OMDB_API_KEY;

export const handler = async (event, context) => {
  const eventBody = JSON.parse(event.body);
  const { title } = eventBody;
  const url = `https://www.omdbapi.com/?t=${title}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (e) {
    throw new Error(e.message);
  }
};
