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

module.exports = {
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
  isValidPassword,
};
