const express = require('express');
const router = express.Router();
const productos = require('../productsController.js');

// Ruta para registrar un nuevo usuario
router.get('/products', productos.obtenerProductos);


module.exports = router;
