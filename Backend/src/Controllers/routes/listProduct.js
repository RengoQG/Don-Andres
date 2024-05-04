const express = require('express');
const router = express.Router();
const multer = require('multer');
const productos = require('../productsController.js');

// Ruta para eliminar una categoría y su imagen asociada
router.get('/listarProductos', productos.obtenerProducto);

module.exports = router;
