// controllers/resetPasswordController.js
const { isValidEmail } = require('./services/validations.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

// Función para generar un token único
const generateToken = (payload) => {
  return jwt.sign(payload, 'secreto', { expiresIn: '1h' });
};

// Controlador para manejar las solicitudes de restablecimiento de contraseña
exports.requestReset = async (req, res) => {
  const { email } = req.body;

  // Valida el correo electrónico
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Correo electrónico no válido' });
  }

  try {
    // Genera un token único
    const token = generateToken({ email });

    // Construye la URL con el token incrustado
    const resetUrl = `http://localhost:5173/reset-password?token=${token}`;

    // Envía el correo electrónico con la URL de restablecimiento
    await sendEmail(email, resetUrl);

    // Retorna una respuesta exitosa
    return res.status(200).json({ message: 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña' });
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para enviar el correo electrónico con la URL de restablecimiento
const sendEmail = async (email, resetUrl) => {
  // Configura el transportador de correo electrónico (debes configurar tus propias credenciales SMTP)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // Cambia esto por tu dirección de correo electrónico
      pass: process.env.EMAIL_PASS // Cambia esto por tu contraseña de correo electrónico
    }
  });

  // Define el contenido del correo electrónico
  const mailOptions = {
    from: process.env.EMAIL, // Cambia esto por tu dirección de correo electrónico
    to: email,
    subject: 'Solicitud de restablecimiento de contraseña',
    html: `<p>¡Hola!</p><p>Has solicitado restablecer tu contraseña. Por favor, haz clic en el siguiente enlace para restablecerla:</p><p><a href="${resetUrl}">Restablecer contraseña</a></p>`
  };

  // Envía el correo electrónico
  await transporter.sendMail(mailOptions);
};
