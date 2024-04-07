const bcrypt = require("bcrypt");
const connection = require("../db.js");
const {
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
  isValidDocument,
  isValidIssuanceDate,
  isValidDocumentType,
} = require("./services/validations.js");

// Función para verificar duplicados en la base de datos
async function checkDuplicates(email, document) {
  const [existingUser] = await connection.execute(
    'SELECT * FROM clientes WHERE email = ? OR document = ?',
    [email, document]
  );
  return existingUser;
}

// Función para hashear la contraseña
async function hashPassword(password) {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new Error("Error al hashear la contraseña");
  }
}

// Función para insertar un nuevo usuario en la base de datos
async function insertUser(name, email, hashedPassword, address, phone, document, fecha_nacimiento, document_type, issuance_date) {
  const query = `INSERT INTO clientes (name, email, password, address, phone, document, fecha_nacimiento, document_type, issuance_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  await connection.execute(query, [name, email, hashedPassword, address, phone, document, fecha_nacimiento, document_type, issuance_date]);
}

// Controlador para manejar las solicitudes de registro de usuarios
exports.register = async (req, res) => {
  const { name, email, password, address, phone, document, fecha_nacimiento, document_type, issuance_date } = req.body;

  // Validación de los datos del usuario
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Correo electrónico no válido." });
  }

  if (!isValidName(name)) {
    return res.status(400).json({ error: "Nombre no válido." });
  }

  if (!isValidPhoneNumber(phone)) {
    return res.status(400).json({ error: "Número de teléfono no válido." });
  }

  if (!isValidDocument(document)) {
    return res.status(400).json({ error: "Documento no válido." });
  }

  if(!isValidIssuanceDate(issuance_date,fecha_nacimiento)){
    return res.status(400).json({ error: "No hay coherencia en las fechas." });
  }

  if(!isValidDocumentType(document_type)){
    return res.status(400).json({ error: "Tipo de documento no valido." });
  }

  try {
    // Verificar si el correo electrónico o el documento ya están registrados
    const existingUser = await checkDuplicates(email, document);

    // Si ya existe un usuario con ese correo electrónico o documento, enviar un mensaje de error
    if (existingUser.length > 0) {
      const duplicateField = existingUser[0].email === email ? "correo electrónico" : "documento";
      return res.status(400).json({ error: `Este ${duplicateField} ya está registrado` });
    }

    // Hashear la contraseña
    const hashedPassword = await hashPassword(password);

    // Insertar nuevo usuario en la base de datos
    await insertUser(name, email, hashedPassword, address, phone, document, fecha_nacimiento, document_type, issuance_date);

    // Enviar respuesta de éxito
    return res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar al usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
