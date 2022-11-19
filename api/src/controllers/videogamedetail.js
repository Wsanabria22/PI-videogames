require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db');


// Funcion que Obtiene el detalle de un video juego ya sea de la API o de la Base de Datos 
const getDataGame = async (id) => {
    try {
      const regexId = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/
      if (regexId.test(id)) {
        const dataGame = await Videogame.findByPk(id, 
          { include: [ { model: Genre, as: 'genres' } , { model: Platform, as: 'platforms' } ]}
        );
        console.log('por DB', dataGame);
        return dataGame;
      } else {
          const dataGame = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;
          console.log('por Api', dataGame);
          return {
            background_image: dataGame.background_image,
            name: dataGame.name,
            genres: dataGame.genres.map( genre => genre ),
            description:dataGame.description,
            released: dataGame.released,
            rating: dataGame.rating,
            createdInDb: dataGame.createdInDb,
            platforms: dataGame.platforms.map( platform => platform )
          }
      } 
    } catch (error) {
      console.log('Error Controller (APIS):', error.response.status, error.response.statusText, 
      error.response.data.error );
    }
  };

  module.exports = getDataGame;
  