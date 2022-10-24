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
        genres: game.genres.map( genre => genre)
      }
    });
    console.log('# apiData', gamesData.length);
    return gamesData;
  } catch (error) {
    console.log(error);
  }
};

const getDbData = async () => {
  try {
      const gamesData = Videogame.findAll(
        { attributes: [ 'id', 'name', 'released', 'rating' ] },
        { includes: Genre }
        );
      console.log('dbData', gamesData);
      return gamesData;
  } catch (error) {
    console.log(error); 
  } 
};

const getDataGame = async (id) => {
  try {
    const regexId = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/
    if (regexId.test(id)) {
      const dataGame = await Videogame.findByPk(id, { includes: Genre, Platform });
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
          platforms: dataGame.platforms.map( platform => platform )
        }
    } 
  } catch (error) {
    console.log(error);
  }
};


router.get('/videogame/:idVideogame', async (req, res)=> {
  try {
    const { idVideogame } = req.params;
    const gameData = await getDataGame(idVideogame);
    if (gameData) res.status(200).json(gameData);
    else res.status(404).send(`No existen datos de un juego con el id ${idVideogame}`)
  } catch (error) {
    console.log(error)
    res.status(500).send(error.msg)
  }
});

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


router.post('/videogames', async (req, res) => {
  try {
    const { name, released, description, rating, genres } = req.body;
    console.log(req.body);
    const videogame = await Videogame.create({
      name, description, released, rating
    });
    const addGenres = await genres.map( genre => videogame.createGenre(genre));
    await Promise.all(addGenres);
    res.status(200).send(`Videogame ${videogame.name} creado satisfactoriamente`)
  } catch (error) {
    console.log(error);
    res.status(500).send(error.msg)
  }
});

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

router.get('/genres', async (req, res) => {
  try {
    const genresList = await getGenres();
    console.log(genresList);
    genresList.forEach( async genre => { await Genre.findOrCreate({ where: { name : genre.name } })})
    const genres = await Genre.findAll();
    res.status(200).json(genres);
  } catch (error) {
    console.log(error);
  }
}); 


module.exports = router;
