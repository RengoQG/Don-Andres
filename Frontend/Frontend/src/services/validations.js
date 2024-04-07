export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidName = (name) => {
  return name.trim() !== "" && /^[a-zA-Z\s]+$/.test(name);
};

export const isValidPhoneNumber = (phone) => {
  if (phone.length < 7 || phone.length > 15) {
    return false;
  }

  const regex = /^[0-9+()\s]+$/;
  if (!regex.test(phone)) {
    return false;
  }

  return /^\+?\d+$/.test(phone);
};

export const isValidPassword = (password) => {
  if (password.length < 8) {
    return false;
  }

  const containsNumber = /\d/.test(password);
  const containsUpperCase = /[A-Z]/.test(password);

  if (!containsNumber || !containsUpperCase) {
    return false;
  }

  return true;
};

export const isValidAddress = (address) => {
  if (!address.trim()) {
    return false;
  }

  if (address.length > 100) {
    return false; // Por ejemplo, limitar la dirección a 100 caracteres
  }

  return true;
};

export const isValidDocument = (document) => {
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
};

export const isValidIssuanceDate = (issuance_date, fecha_nacimiento) => {
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
};

export const isValidDocumentType = (documentType) => {
  // Lista de tipos de documentos válidos en tu sistema
  const validDocumentTypes = ["CC", "CE", "TI", "RC"];

  // Verificar si el tipo de documento proporcionado está en la lista de tipos válidos
  return validDocumentTypes.includes(documentType.toUpperCase());
};
