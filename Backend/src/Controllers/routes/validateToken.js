const express = require('express');
const router = express.Router();
const validate = require('../validateTokenController.js');

// Ruta para registrar un nuevo usuario
router.post('/validate', validate.resetPassword);


module.exports = router;
