const express = require('express');
const router = express.Router();
const multer = require('multer');
const categoriasController = require('../categories.js');

// Configurar Multer para el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/Johan/Downloads/Carrito-Ecommerce-main/Carrito-Ecommerce-main/Frontend/Frontend/public/images/CategoriaImagenes'); // Ruta completa donde se almacenarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre de archivo único
  }
});
const upload = multer({ storage: storage });

// Ruta para registrar una nueva categoría con su imagen
router.post('/categorias', upload.single('imagen'), categoriasController.crearCategoria);

module.exports = router;
