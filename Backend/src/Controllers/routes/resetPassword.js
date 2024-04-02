const express = require('express');
const router = express.Router();
const resetController = require('../resetPasswordController.js');

// Ruta para registrar un nuevo usuario
router.post('/reset', resetController.requestReset);


module.exports = router;
