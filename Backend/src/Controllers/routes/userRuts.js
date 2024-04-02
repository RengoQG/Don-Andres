const express = require('express');
const router = express.Router();
const userController = require('../userController.js');

// Ruta para registrar un nuevo usuario
router.post('/register', userController.register);


module.exports = router;
