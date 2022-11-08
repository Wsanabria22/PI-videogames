require('dotenv').config();
const { Router } = require('express');
const { API_KEY } = process.env;
const { Videogame, Genre, Platform } = require('../db');
const axios = require('axios');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// const getApiData = async ()=> {
//     await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
//     .then(r => console.log(r.json()))
// }

//  Funcion que Obtiene la lista de video juegos de la API
const getApiData = async ()=> {
  try {
    let apiDataTotal = [];
    for (let i = 1; i <= 5 ; i++) {
      let apiData = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)).data.results; 
      apiDataTotal = apiDataTotal.concat(apiData);
      // console.log(apiDataTotal);
    }
    // console.log(apiDataTotal);
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
    console.log(error);
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
    console.log(error); 
  } 
};

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
    console.log(error);
  }
};

// Ruta que devuelve la informacion detallada de un  video juegos 
router.get('/videogame/:idVideogame', async (req, res)=> {
  try {
    const { idVideogame } = req.params;
    const gameData = await getDataGame(idVideogame);
    console.log('gameData',gameData)
    if (gameData) res.status(200).json(gameData);
    else res.status(404).send(`No existen datos de un juego con el id ${idVideogame}`)
  } catch (error) {
    console.log(error)
    res.status(500).send(error.msg)
  }
});

// Ruta que devuelve la lista de juegos consolidada de la API y la Base de datos
router.get('/videogames', async (req, res)=> {
  try {
    const { name } = req.query;
    const apiData = await getApiData();
    const dbData = await getDbData();
    const gamesData = apiData.concat(dbData);
    if (name){
      const gameData = gamesData.filter( game => ( game.name.toLowerCase().includes(name.toLowerCase())));
      // console.log('totalData', gameData);
      if (gameData.length > 0) {
        if (gameData.length > 15) gameData.splice(1,15);
        res.status(200).json(gameData)
      } else res.status(404).send(`No existe un juego con el nombre ${name}`);
    } else {
      // console.log('totalData', gamesData);
      res.status(200).json(gamesData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.msg);
  }  
});

// Ruta que crea un video juego en la base de datos
router.post('/videogames', async (req, res) => {
  try {
    const { name, released, description, rating, genres, background_image, platforms } = req.body;
    console.log('req.body', req.body);
    const videogame = await Videogame.create({
      name, description, released, rating, background_image
    });
    const addGenres = await genres.map( genre => videogame.createGenre(genre));
    await Promise.all(addGenres);
    const addPlatform = await platforms.map( plaform =>  videogame.createPlatform(plaform));
    await Promise.all(addPlatform);
    res.status(200).send(`Videogame ${videogame.name} creado satisfactoriamente`)
  } catch (error) {
    console.log(error);
    res.status(500).send(error.msg)
  }
});

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

// Ruta que crea en la base de datos todos los generos de los video juegos de la API
router.get('/genres', async (req, res) => {
  try {
    const genresList = await getGenres();
    // console.log(genresList);
    genresList.forEach( async genre => { await Genre.findOrCreate({ where: { name : genre.name } })})
    const genres = await Genre.findAll();
    res.status(200).json(genres);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.msg)
  }
}); 

// Funcion que devuelve una lista de todos las plataformas de la lista de video juegos de la API
const getPlatforms = async () => {
  try {
    let apiDataTotal = [];
    for (let i = 1; i <= 5 ; i++) {
      let apiData = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)).data.results; 
      apiDataTotal = apiDataTotal.concat(apiData);
    }
    const platformsData = apiDataTotal.map( game => {
        return game.platforms.map( platform => platform.platform.name ) 
    })
    return(platformsData.flat())
  } catch (error) {
    console.log(error)
  }
};

router.get('/platforms', async (req, res) => {
  try {
    const platformsList = await getPlatforms();
    platformsList.forEach( async platform => { await Platform.findOrCreate({ where: { name: platform } })})
    const platforms = await Platform.findAll();
    res.status(200).json(platforms)
  } catch (error) {
    console.log(error)
    res.status(500).send(error.msg)
  }

})

module.exports = router;
