const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../db');
const {getUserByEmail} = require('./services/funciones.js');

const {
    isValidPassword,
  } = require("./services/validations.js");

  exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, 'secreto');
        const email = decoded.email;

        if (!isValidPassword(newPassword)) {
            return res.status(400).json({ error: 'La contraseña no cumple con los requisitos de seguridad' });
        }

        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado para el correo electrónico: ' + email });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const query = 'UPDATE clientes SET password = ? WHERE email = ?';
        await connection.query(query, [hashedPassword, email]);

        return res.status(200).json({ message: 'Contraseña restablecida exitosamente para el usuario: ' + email });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ error: 'El token ha expirado' });
        }
        return res.status(500).json({ error: 'Ha ocurrido un error interno, por favor intenta de nuevo más tarde' });
    }
};
