const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configurar Multer para el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../../../Frontend/Frontend/public/images/SwiperSlider');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Usar el nombre original del archivo
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
});

router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se ha subido ninguna imagen.' });
    }
    res.status(200).json({ message: 'Imagen subida correctamente.', fileName: req.file.originalname });
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

module.exports = router;
