require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');

// Funcion que devuelve una lista de todos los generos de la lista de video juegos de la API
const getGenres = async () => {
    try {
      let apiDataTotal = [];
      for (let i = 1; i <= 5 ; i++) {
        let apiData = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)).data.results; 
        apiDataTotal = apiDataTotal.concat(apiData);
      }
      const genresData = apiDataTotal.map( game => game.genres )
      return(genresData.flat())
    } catch (error) {
      console.log(error)
    }
  };

module.exports = getGenres;
