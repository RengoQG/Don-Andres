const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs'); // Importa el módulo 'fs' para trabajar con el sistema de archivos
const path = require('path');
const productos = require('../productsController.js');

// Configurar Multer para el almacenamiento de archivos
// Configurar Multer para el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Especifica el directorio de destino donde se guardarán las imágenes
    cb(null, path.join(__dirname, '../../../../Frontend/Frontend/public/images/Productos'));
  },
  filename: function (req, file, cb) {
    // Utiliza el nombre de archivo proporcionado por Multer
    cb(null, file.originalname);
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
router.post('/agregarProducto', upload.single('imagen'), productos.agregarProducto);


module.exports = router;
