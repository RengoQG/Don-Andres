const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs'); // Importa el módulo 'fs' para trabajar con el sistema de archivos
const path = require('path');
const productos = require('../productsController.js');



// Ruta para registrar un nuevo usuario
router.put('/actualizarProductoDetalle/:id/:detalleId', productos.actualizarProductoDetalle);


module.exports = router;
