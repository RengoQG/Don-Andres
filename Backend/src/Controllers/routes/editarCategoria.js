    const express = require('express');
    const router = express.Router();
    const path = require('path');
    const multer = require('multer');
    const categorias = require('../categories.js');

    // Configurar Multer para el almacenamiento de archivos
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../../../../Frontend/Frontend/public/images/CategoriaImagenes'));
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname); // Utiliza el nombre original del archivo
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
    router.put('/categoria/:id', upload.single('imagen'), categorias.editarCategoria);


    module.exports = router;
