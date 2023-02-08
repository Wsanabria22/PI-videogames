const router = require('express').Router();
const { Videogame, Genre, Platform } = require('../db');

// Ruta que elimina un videojuego de la base de datos
router.delete('/deletevideogame/:idVideogame', async (req, res) => {
  try {
    const { idVideogame } = req.params;
    if (!idVideogame) {
      res.status(400).json({ message: 'Debe especificar un id de videojuego'})
      throw Error('Debe especificar un id de videojuego')
    }
    // let videogame = 

  } catch (error) {
    console.log('Error en route:',error);
    res.status(500).send(error.msg)
  }
});

module.exports = router;
