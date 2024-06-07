const express = require('express');
const router = express.Router();
const producto = require('../productsController.js');

// Ruta para registrar un nuevo usuario
router.post('/agregarInfoProducto', producto.agregarInfoProducto);


module.exports = router;
