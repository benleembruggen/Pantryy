const fetch = require('node-fetch');
const querystring = require('querystring');

const BASE_URL = 'https://api.edamam.com/api';

const APP_AUTH = {
  food: {
    app_id: 'b9f85c9b',
    app_key: 'c5ec0f3d437d3801f72d9923919618d1',
  },
  recipe: {
    app_id: 'bde5815c',
    app_key: '0d20dbd6a136543ba232fe0367439049',
  }
}

const endpointAliases = {
  'food': '/food-database/v2/parser',
}

const callFoodApi = async (endpoint, parameters) => {
  const urlToFetch = buildUrl(endpoint, parameters);
  console.log('Fetching: ', urlToFetch);
  const response = await fetch(urlToFetch);
  return response.json();
}


const buildUrl = (endpoint, parameters) => {
  const translatedEndpoint = endpointAliases[endpoint] || endpoint;

  const apiToUse = translatedEndpoint.includes('food-database') ? 'food' : 'recipe';

  const params = {
    ...APP_AUTH[apiToUse],
    ...parameters,
  }

  return `${BASE_URL}${translatedEndpoint}?${querystring.stringify(params)}`;
}

module.exports = { callFoodApi };
