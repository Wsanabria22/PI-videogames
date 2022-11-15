const router = require('express').Router();
const {getApiData, getDbData} = require('../controllers/videogames');

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

  
module.exports = router;
