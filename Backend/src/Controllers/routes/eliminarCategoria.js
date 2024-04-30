const express = require('express');
const router = express.Router();
const multer = require('multer');
const categorias = require('../categories.js');

// Ruta para eliminar una categoría y su imagen asociada
router.delete('/eliminarCategoria/:id', categorias.eliminarCategoria);

module.exports = router;
