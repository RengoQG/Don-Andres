function isMaliciousWords(message) {
  const reservedWords = [
    // Palabras reservadas relacionadas con React
    'useState', 'useEffect', 'useContext', 'useReducer', 'useCallback',
    'useMemo', 'useRef', 'useImperativeHandle', 'useLayoutEffect',
    'useDebugValue', 'Component', 'PureComponent', 'Fragment', 'Suspense',
    'Lazy', 'memo', 'createContext', 'forwardRef', 'ReactDom', 'ReactDOMServer',
    'PropTypes', 'defaultProps', 'propTypes', 'children', 'key', 'ref', 'style',
    // Palabras reservadas relacionadas con Node.js
    'require', 'module.exports', 'exports', 'global', 'process', '__dirname',
    '__filename', 'Buffer', 'setImmediate', 'setTimeout', 'setInterval',
    'clearTimeout', 'clearInterval', 'process.env',
    // Palabras reservadas relacionadas con SQL
    'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'FROM', 'WHERE', 'JOIN', 'INNER JOIN',
    'LEFT JOIN', 'RIGHT JOIN', 'OUTER JOIN', 'ON', 'GROUP BY', 'HAVING', 'ORDER BY',
    'ASC', 'DESC', 'LIMIT', 'OFFSET', 'CREATE', 'ALTER', 'DROP', 'TABLE', 'INDEX',
    'VIEW', 'DATABASE', 'TRIGGER', 'CONSTRAINT', 'PRIMARY KEY', 'FOREIGN KEY',
    'UNIQUE', 'NOT NULL', 'CHECK', 'DEFAULT', 'NULL', 'AS', 'AND', 'OR', 'NOT',
    'IN', 'BETWEEN', 'LIKE', 'IS NULL', 'IS NOT NULL'
  ];

  // Convertir el mensaje a minúsculas para la comparación
  const lowerCaseMessage = message.toLowerCase();

  // Verificar si el mensaje contiene alguna palabra maliciosa
  for (const word of reservedWords) {
    if (lowerCaseMessage.includes(word.toLowerCase())) {
      return false; // Palabra maliciosa encontrada
    }
  }
  return true; // No se encontraron palabras maliciosas
}
function isValidMessage(message) {
  // Validación de no vacío
  if (message.trim() === "") {
    return "El mensaje no puede estar vacío 😥";
  }

  // Validación de longitud máxima (por ejemplo, 1000 caracteres)
  if (message.length > 1000) {
    return "Excediste la longitud de caracteres 😥";
  }

  // Validación de palabras maliciosas
  if (!isMaliciousWords(message)) {
    return "Contiene palabras malisiosas 😥";
  }

  // Otras validaciones opcionales, como sanitización

  return true;
}
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validación de palabras maliciosas
  // if (!isMaliciousWords(email)) {
  //   return "El email contiene palabras malisiosas 😥";
  // }

  //Validar que el correo no esté vacío
  if(email.trim() === ""){
    return "El email no puede estar vacío 😥"
  };
  
  // Validación de expresión regular
  if (!emailRegex.test(email)) {
    return "El formato del correo electrónico no es válido 😥";
  }
  // Si pasa ambas validaciones, devuelve verdadero
  return true;
}
function isValidName(name) {
  // Validación de palabras maliciosas  
  if(name.trim() === ""){
    return "El nombre no puede estar vacío 😥"
  };

  // Si pasa ambas validaciones, devuelve verdadero
  return true;
}
function isValidPhoneNumber(phone) {
  // Validación de palabras maliciosas
  if (!isMaliciousWords(phone)) {
    return "El telefono contiene palabras malisiosas 😥";
  }

  // Validación de longitud del número de teléfono
  if (phone.length < 7 || phone.length > 15) {
    return "El número de teléfono debe tener entre 7 y 15 caracteres 😒";
  }

  // Validación del formato del número de teléfono
  const regex = /^[0-9+()\s]+$/;
  if (!regex.test(phone) || !/^\+?\d+$/.test(phone)) {
    return "El número de teléfono no es válido 😒";
  }

  // Si pasa todas las validaciones, retorna true
  return true;
}
function isValidPassword(password) {
  if (password.length < 8) {
    return false;
  }
  const containsNumber = /\d/.test(password);
  const containsUpperCase = /[A-Z]/.test(password);
  return containsNumber && containsUpperCase && isMaliciousWords(password);
}
function isValidDocument(document) {
  if (document.trim() === "") {
    return false;
  }
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(document) && document.length >= 6 && document.length <= 12 && isMaliciousWords(document);
}
function isValidIssuanceDate(issuance_date, fecha_nacimiento) {
  if (!issuance_date || isNaN(Date.parse(issuance_date))) {
    return false;
  }
  if (!fecha_nacimiento || isNaN(Date.parse(fecha_nacimiento))) {
    return false;
  }
  const expedition = new Date(issuance_date);
  const birth = new Date(fecha_nacimiento);
  return expedition >= birth && expedition <= new Date() && isMaliciousWords(issuance_date);
}
function isValidDocumentType(documentType) {
  const validDocumentTypes = ["CC", "CE", "TI", "RC"];
  return validDocumentTypes.includes(documentType.toUpperCase()) && isMaliciousWords(documentType);
}
module.exports = {
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
  isValidPassword,
  isValidDocument,
  isValidIssuanceDate,
  isValidDocumentType,
  isValidMessage,
};
