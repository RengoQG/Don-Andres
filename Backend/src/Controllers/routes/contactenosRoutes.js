const express = require('express');
const router = express.Router();
const contactenos = require('../contactanosController.js');

// Ruta para registrar un nuevo usuario
router.post('/contactenos', contactenos.sendContactMessage);


module.exports = router;
