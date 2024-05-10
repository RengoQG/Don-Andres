const express = require('express');
const router = express.Router();
const multer = require('multer');
const producto = require('../productsController.js');

// Ruta para eliminar una categoría y su imagen asociada
router.delete('/eliminarProducto/:id', producto.eliminarProducto);

module.exports = router;
