const express = require('express');
const router = express.Router();
const categorias = require('../categories.js');

// Ruta para registrar un nuevo usuario
router.get('/categorias', categorias.obtenerCategorias);


module.exports = router;
