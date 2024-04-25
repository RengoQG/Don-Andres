// controllers/resetPasswordController.js
const nodemailer = require('nodemailer');
require('dotenv').config();
const { isValidEmail, isValidName, isValidPhoneNumber, isValidMessage } = require('./services/validations.js');


// Controlador para manejar las solicitudes de restablecimiento de contraseña
exports.sendContactMessage = async (req, res) => {
  const { email, name, phone, message } = req.body;
  
  const emailValidationResult = isValidEmail(email);
  if (emailValidationResult !== true) {
    return res.status(400).json({ error: emailValidationResult });
  }
  const nameValidationResult = isValidName(name);
  if (nameValidationResult !== true) {
    return res.status(400).json({ error: nameValidationResult });
  }
  const phoneValidationResult = isValidPhoneNumber(phone);
  if (phoneValidationResult !== true) {
    return res.status(400).json({ error: phoneValidationResult });
  }
  const messageValidationResult = isValidMessage(message);
  if (messageValidationResult !== true) {
    return res.status(400).json({ error: messageValidationResult });
  }

  try {
    // Envía el correo electrónico
    await sendEmail(email, name, phone, message);
    
    // Retorna una respuesta exitosa
    return res.status(200).json({ message: 'Se ha enviado un correo electrónico' });
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para enviar el correo electrónico
const sendEmail = async (email, name, phone, message) => {
  try {
    // Configura el transportador de correo electrónico (debes configurar tus propias credenciales SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });
  
    // Define el contenido del correo electrónico
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Mensaje de Contacto',
      html: `
        <p>¡Hola!</p>
        <p>Has recibido un nuevo mensaje a través del formulario de contacto:</p>
        <ul>
          <li><strong>Nombre:</strong> ${name}</li>
          <li><strong>Correo:</strong> ${email}</li>
          <li><strong>Celular:</strong> ${phone}</li>
          <li><strong>Mensaje:</strong> ${message}</li>
        </ul>
      `
    };
  
    // Envía el correo electrónico
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Error al enviar el correo electrónico:', error);
  }
};
