const express = require('express');
const router = express.Router();
const relacionados = require('../relatedController.js');

// Ruta para registrar un nuevo usuario
router.post('/products/:id', relacionados.relatedAll);


module.exports = router;
