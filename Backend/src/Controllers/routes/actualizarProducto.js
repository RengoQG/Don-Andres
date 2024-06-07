const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs'); // Importa el módulo 'fs' para trabajar con el sistema de archivos
const path = require('path');
const productos = require('../productsController.js');

// Configurar Multer para el almacenamiento de archivos
// Configurar Multer para el almacenamiento de archivos
// Actualiza la función filename en la configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../../Frontend/Frontend/public/images/Productos'));
  },
  filename: function (req, file, cb) {
    // Genera un nombre de archivo único usando un timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

  
  const upload = multer({ 
    storage: storage,
    // Sobrescribe el archivo si ya existe
    fileFilter: (req, file, cb) => {
      cb(null, true);
    }
  });

// Ruta para registrar un nuevo usuario
router.put('/actualizarProducto/:id', upload.single('imagen'), productos.actualizarProducto);


module.exports = router;
