const express = require('express');
const router = express.Router();
const similares = require('../similarController.js');

// Ruta para registrar un nuevo usuario
router.post('/similares/:id', similares.SimiAll);


module.exports = router;
