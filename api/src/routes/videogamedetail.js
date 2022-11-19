const router = require('express').Router();
const getDataGame = require('../controllers/videogamedetail');

// Ruta que devuelve la informacion detallada de un  video juego
router.get('/videogame/:idVideogame', async (req, res)=> {
    try {
      const { idVideogame } = req.params;
      const gameData = await getDataGame(idVideogame);
      console.log('gameData',gameData)
      if (gameData) res.status(200).json(gameData);
      else res.status(404).send(`No existen datos de un juego con el id ${idVideogame}`)
    } catch (error) {
      console.log('Error Routes: ', error)
      res.status(500).send(error.msg)
    }
  });

  module.exports = router;
  