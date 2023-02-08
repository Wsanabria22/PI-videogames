const router = require('express').Router();
const { Videogame, Genre, Platform } = require('../db');

// Ruta que actualiza un video juego en la base de datos
router.put('/updatevideogame', async (req, res) => {
    try {
      const { id, name, released, description, rating, genres, background_image, platforms } = req.body;
      console.log('req.body', req.body);
      let videogame = await Videogame.update(
        {
            name: name, 
            description: description, 
            released: released, 
            rating: rating, 
            background_image: background_image
        },
        { where: { id: id }}
      );
      Videogame.findByPk(id)
      .then(vgame => vgame.setGenres(null))
      .then(result => {
        Videogame.findByPk(id)
        .then(vgame => {
          let genr = genres.map(genre => genre.id)
          vgame.addGenres(genr)
        })
        .then(genres => console.log(genres));
      } ); 

      Videogame.findByPk(id)
      .then(vgame => vgame.setPlatforms(null))
      .then(result => {
        Videogame.findByPk(id)
        .then(vgame => {
          let platf = platforms.map(platform => platform.id)
          vgame.addPlatforms(platf)
        })
        .then(platforms => console.log(platforms));
      } ); 

      // const addGenres = await genres.map( genre => videogame.createGenre(genre));
      // await Promise.all(addGenres);
      // if (videogame.hasPlatforms()) await videogame.reomovePlatforms();
      // const addPlatform = await platforms.map( plaform =>  videogame.createPlatform(plaform));
      // await Promise.all(addPlatform);
      res.status(200).send(`Videogame ${name} actualizado satisfactoriamente`)
    } catch (error) {
      console.log('Error en route:',error);
      res.status(500).send(error.msg)
    }
  });

  module.exports = router;