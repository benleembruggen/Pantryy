const { url } = require('inspector');
const fetch = require('node-fetch');
const querystring = require('querystring');

const BASE_URL = 'https://api.edamam.com/api/food-database/v2/';

const APP_ID = '';
const APP_KEY = '';

const callFoodApi = async (endpoint, parameters) => {
  const urlToFetch = buildUrl(endpoint, parameters);
  console.log('Fetching: ', urlToFetch);
  const response = await fetch(urlToFetch);
  return response.json();
}


const buildUrl = (endpoint, parameters) => {
  const params = {
    app_id: APP_ID,
    app_key: APP_KEY,
    ...parameters,
  }
  return `${BASE_URL}${endpoint}${querystring.stringify(params)}`;
}

module.exports = { callFoodApi };
