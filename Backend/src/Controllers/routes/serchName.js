const express = require('express');
const router = express.Router();
const search = require('../SearchNameController.js');

// Ruta para registrar un nuevo usuario
router.post('/search', search.buscarProductosPorNombre);


module.exports = router;
