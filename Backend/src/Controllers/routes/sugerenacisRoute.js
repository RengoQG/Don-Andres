const express = require('express');
const router = express.Router();
const sugerenciasPro = require('../sugerenciasController.js');

// Ruta para registrar un nuevo usuario
router.post('/sugerencias', sugerenciasPro.sugerenciasProductos);


module.exports = router;
