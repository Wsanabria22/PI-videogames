const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
 const videogames = require('./videogames');
 const videogamedetail = require('./videogamedetail');
 const createvideogame = require('./createvideogame');
 const genres = require('./genres');
 const platforms = require('./platforms');
 const updatevideogame = require('./updatevideogame');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(videogames);
router.use(videogamedetail);
router.use(createvideogame);
router.use(genres);
router.use(platforms);
router.use(updatevideogame);

module.exports = router;
