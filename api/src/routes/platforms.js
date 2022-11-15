const router = require('express').Router();
const { Videogame, Genre, Platform } = require('../db');
const getPlatforms = require('../controllers/platforms');

//Ruta que crea en la base de datos todos las plataformas de los video juegos de la API
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
  
  });

  module.exports = router;
