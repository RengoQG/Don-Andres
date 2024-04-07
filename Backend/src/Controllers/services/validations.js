// Función para validar un correo electrónico
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para validar y sanitizar un nombre
function isValidName(name) {
  return name.trim() !== "" && /^[a-zA-Z\s]+$/.test(name);
}

// Función para validar y sanitizar un número de teléfono
function isValidPhoneNumber(phone) {
  // Verificar que el número de teléfono tenga entre 7 y 15 caracteres
  if (phone.length < 7 || phone.length > 15) {
    return false;
  }

    // Verificar que el número de teléfono contenga solo dígitos y algunos caracteres especiales (sin signo negativo)
    const regex = /^[0-9+()\s]+$/;
    if (!regex.test(phone)) {
        return false;
    }

  return /^\+?\d+$/.test(phone);
}

// Función para validar la contraseña
function isValidPassword(password) {
  // Verificar si la contraseña tiene al menos 8 caracteres
  if (password.length < 8) {
    return false;
  }

  // Verificar si la contraseña contiene al menos un número y una letra mayúscula
  const containsNumber = /\d/.test(password);
  const containsUpperCase = /[A-Z]/.test(password);

  // La contraseña debe contener al menos un número y una letra mayúscula
  if (!containsNumber || !containsUpperCase) {
    return false;
  }

  return true;
}

function isValidDocument(document) {
  // Verificar que el documento no esté vacío
  if (document.trim() === "") {
    return false;
  }

  // Verificar que el documento contenga solo letras y números
  const regex = /^[a-zA-Z0-9]+$/;
  if (!regex.test(document)) {
    return false;
  }

  // Verificar que el documento tenga una longitud adecuada (por ejemplo, entre 6 y 12 caracteres)
  if (document.length < 6 || document.length > 12) {
    return false;
  }

  return true;
}

function isValidIssuanceDate(issuance_date, fecha_nacimiento) {
  // Verificar que la fecha de expedición no esté vacía y sea válida (formato de fecha válido)
  if (!issuance_date || isNaN(Date.parse(issuance_date))) {
    return false;
  }

  // Verificar que la fecha de nacimiento no esté vacía y sea válida (formato de fecha válido)
  if (!fecha_nacimiento || isNaN(Date.parse(fecha_nacimiento))) {
    return false;
  }

  // Convertir las fechas a objetos Date para facilitar la comparación
  const expedition = new Date(issuance_date);
  const birth = new Date(fecha_nacimiento);

  // Verificar que la fecha de expedición sea posterior a la fecha de nacimiento
  if (expedition < birth) {
    return false;
  }

  // Verificar que la fecha de expedición no sea en el futuro (no puede haber expediciones en el futuro)
  if (expedition > new Date()) {
    return false;
  }

  // También puedes agregar otras validaciones según sea necesario

  return true;
}

function isValidDocumentType(documentType) {
  // Lista de tipos de documentos válidos en tu sistema
  const validDocumentTypes = ["CC", "CE", "TI", "RC"];

  // Verificar si el tipo de documento proporcionado está en la lista de tipos válidos
  return validDocumentTypes.includes(documentType.toUpperCase());
}



module.exports = {
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
  isValidPassword,
  isValidDocument,
  isValidIssuanceDate,
  isValidDocumentType,
};
