const express = require('express');
const router = express.Router();
const relacionados = require('../relatedController.js');

// Ruta para registrar un nuevo usuario
router.get('/products/:id', relacionados.relatedAll);


module.exports = router;
