const fetch = require('node-fetch');
require('dotenv').config();

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
};

exports.handler = async (event) => {
  try {
    const response = await fetch(
      `https://aztro.sameerkumar.website/?sign=${event.queryStringParameters.sign}&day=${event.queryStringParameters.day}`, {
        method: 'POST'
      }
    );
    const data = await response.json();
    const json = JSON.stringify(data);

    return {
      statusCode: 200,
      headers,
      body: json,
    };
  } catch (error) {
    console.log(error); //eslint-disable-line
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
