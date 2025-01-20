const express = require('express');
const router = express.Router();
const multer = require('multer');
const producto = require('../productsController.js');

// Ruta para eliminar una categoría y su imagen asociada
router.get('/listDetals/:id', producto.listDetals);

module.exports = router;
