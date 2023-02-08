const router = require('express').Router();
const { Videogame, Genre, Platform } = require('../db');

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
      console.log('Error en route:',error);
      res.status(500).send(error.msg)
    }
  });

  module.exports = router;
  