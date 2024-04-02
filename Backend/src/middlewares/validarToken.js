// middleware/authenticate.js

const jwt = require('jsonwebtoken');

// Middleware para autenticar y verificar el token de acceso
const authenticateToken = (req, res, next) => {
  // Obtener el token de acceso del encabezado de autorización
  const token = req.headers['authorization'];

  // Verificar si se proporcionó un token
  if (!token) {
    return res.status(401).json({ error: 'Token de acceso no proporcionado' });
  }

  // Verificar y decodificar el token
  jwt.verify(token, 'secreto', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token de acceso inválido' });
    }
    // Adjuntar el usuario decodificado al objeto de solicitud
    req.user = decoded;
    next(); // Continuar con la siguiente middleware o controlador
  });
};

module.exports = authenticateToken;
