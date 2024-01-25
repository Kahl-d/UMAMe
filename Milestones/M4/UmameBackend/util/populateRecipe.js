const axios = require("axios");

async function getRandomRecipes(query) {
    const options = {
      method: 'GET',
      url: 'https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe',
      params: {
        query: query
      },
      headers: {
        'X-RapidAPI-Key': '4154f67d29mshc73de5b7f073e68p17138fjsn936ea4c0a836',
        'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = getRandomRecipes;
