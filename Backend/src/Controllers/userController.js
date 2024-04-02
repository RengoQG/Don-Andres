const bcrypt = require("bcrypt");
const connection = require("../db.js"); // Importa el módulo de conexión a la base de datos
const {
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
} = require("./services/validations.js");

// Controlador para manejar las solicitudes de registro de usuarios
exports.register = async (req, res) => {
  const { name, email, password, address, phone } = req.body;

  // Validación de los datos del usuario
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Correo electrónico no válido" });
  }

  if (!isValidName(name)) {
    return res.status(400).json({ error: "Nombre no válido" });
  }

  if (!isValidPhoneNumber(phone)) {
    return res.status(400).json({ error: "Número de teléfono no válido" });
  }

  try {
    // Hashear la contraseña utilizando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Consulta SQL para insertar un nuevo usuario en la base de datos
    const query = `INSERT INTO clientes (name, email, password, address, phone) VALUES (?, ?, ?, ?, ?)`;

    // Ejecutar la consulta SQL
    await connection.execute(query, [
      name,
      email,
      hashedPassword,
      address,
      phone,
    ]);

    // Enviar respuesta de éxito
    return res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar al usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
