const xss = require('xss');

// Middleware para prevenir ataques XSS
function preventXSS(req, res, next) {
  // Recorrer todas las propiedades del objeto de solicitud (req.body, req.params, req.query, etc.)
  // y escapar cualquier entrada del usuario que contenga scripts maliciosos
  Object.keys(req.body).forEach(key => {
    req.body[key] = xss(req.body[key]);
  });

  // Continuar con el siguiente middleware
  next();
}

module.exports = preventXSS;
