// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = 'secreto'; // Utilizando la clave secreta directamente aquí

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token de acceso no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token de acceso inválido' });
  }
};

module.exports = verifyToken;
