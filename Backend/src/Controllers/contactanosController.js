const nodemailer = require('nodemailer');
const { isValidEmail } = require('./services/validations.js');
require('dotenv').config();

exports.sendContactMessage = async (req, res) => {
  const { nombre, correo, celular, mensaje } = req.body;

  // Valida el correo electrónico
//   if (!isValidEmail(correo)) {
//     return res.status(400).json({ error: 'Correo electrónico no válido' });
//   }

  try {
    // Configurar el transportador de correo electrónico (debes configurar tus propias credenciales SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "johanquinterogrisales@gmail.com", // Cambia esto por tu dirección de correo electrónico
        pass: "wyim fzkz iypk axga" // Cambia esto por tu contraseña de correo electrónico
      }
    });

    // Definir el contenido del correo electrónico
    const mailOptions = {
      from: "johanquinterogrisales@gmail.com", // Cambia esto por tu dirección de correo electrónico
      to: "johanquinterogrisales@gmail.com", // Cambia esto por el correo al que quieres recibir los mensajes de contacto
      subject: 'Mensaje de Contacto',
      html: `
        <p>¡Hola!</p>
        <p>Has recibido un nuevo mensaje a través del formulario de contacto:</p>
        <ul>
          <li><strong>Nombre:</strong> ${nombre}</li>
          <li><strong>Correo:</strong> ${correo}</li>
          <li><strong>Celular:</strong> ${celular}</li>
          <li><strong>Mensaje:</strong> ${mensaje}</li>
        </ul>
      `
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);

    // Retornar una respuesta exitosa
    return res.status(200).json({ message: 'Mensaje enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
