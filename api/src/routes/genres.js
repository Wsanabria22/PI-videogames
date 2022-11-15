const router = require('express').Router();
const { Videogame, Genre, Platform } = require('../db');
const getGenres = require('../controllers/genres');

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

  module.exports = router;
