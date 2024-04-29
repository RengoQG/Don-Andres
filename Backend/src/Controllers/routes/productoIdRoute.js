const express = require('express');
const router = express.Router();
const producto = require('../productsController.js');

// Ruta para registrar un nuevo usuario
router.get('/producto/:id', producto.obtenerProductosID);


module.exports = router;
