const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs'); // Importa el módulo 'fs' para trabajar con el sistema de archivos
const path = require('path');
const categoriasController = require('../categories.js');

// Configurar Multer para el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../../Frontend/Frontend/public/images/CategoriaImagenes'));
  },
  filename: function (req, file, cb) {
    // Verifica si el archivo ya existe en el directorio de destino
    const archivoExistente = fs.existsSync(path.join(__dirname, '../../../../Frontend/Frontend/public/images/CategoriaImagenes', file.originalname));
    if (archivoExistente) {
      // Si el archivo ya existe, muestra un mensaje de error y no lo guarda
      cb(new Error('Ya hay una imagen con ese nombre'), null);
    } else {
      // Si el archivo no existe, guarda el archivo con su nombre original
      cb(null, file.originalname);
    }
  }
});

const upload = multer({ 
  storage: storage,
  // Sobrescribe el archivo si ya existe
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
});

// Ruta para registrar una nueva categoría con su imagen
router.post('/categorias', upload.single('imagen'), categoriasController.crearCategoria);

module.exports = router;
