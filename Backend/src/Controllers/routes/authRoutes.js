const express = require('express');
const router = express.Router();
const auth = require('../authController.js');
const preventXSS = require('../../middlewares/preventXSS.js'); // Importa el middleware preventXSS

// Ruta para registrar un nuevo usuario
router.post('/login', preventXSS, auth.login);


module.exports = router;
