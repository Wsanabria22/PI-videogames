require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db');


//  Funcion que Obtiene la lista de video juegos de la API
const getApiData = async ()=> {
    try {
      let apiDataTotal = [];
      for (let i = 1; i <= 5 ; i++) {
        let apiData = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)).data.results; 
        apiDataTotal = apiDataTotal.concat(apiData);
      }
      
      const gamesData = apiDataTotal.map( game => {
        return {
          id: game.id,
          name: game.name,
          released: game.released,
          background_image: game.background_image,
          rating: game.rating,
          genres: game.genres.map( genre => genre),
          createdInDb: false
        }
      });
      console.log('# apiData', gamesData.length);
      return gamesData;
    } catch (error) {
      console.log('Error Controller (APIS):', error.response.status, error.response.statusText, 
      error.response.data.error, error.message );
    }
  };
  
  // Funcion que Obtiene la lista de video juetos de la Base de Datos
const getDbData = async () => {
    try {
        const gamesData = Videogame.findAll(
          { attributes: [ 'id', 'name', 'released', 'background_image', 'rating', 'createdInDb' ],
            include: { model: Genre, as: 'genres' }
          });
        console.log('dbData', gamesData);
        return gamesData;
    } catch (error) {
      console.log('Error Controller (DB):', error); 
    } 
  };

module.exports = { getApiData, getDbData };
