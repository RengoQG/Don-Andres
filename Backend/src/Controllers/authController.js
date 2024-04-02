const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../db.js');
const moment = require('moment');
const { isValidEmail } = require('./services/validations.js');

// Controlador para manejar las solicitudes de inicio de sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const MAX_VALID_LOGIN_ATTEMPTS = 3;
  const BLOCK_DURATION_MINUTES = 1;

  try {
    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: 'Debe de ser un Email valido'
      });
    };

    if (password === '' || !password) {
      return res.status(400).json({
        error: `La contraseña no puede estar vacía`
      });
    };

    // Consulta SQL para obtener el usuario por su correo electrónico
    const query = 'SELECT * FROM clientes WHERE email = ?';

    // Ejecutar la consulta SQL
    const [results] = await connection.execute(query, [email]);

    // Verificar si se encontró un usuario con el correo electrónico proporcionado
    if (results.length === 1) {
      const user = results[0];

      // Verificar si la cuenta está bloqueada
      if (user.is_blocked) {
        const blockedUntil = moment(user.blocked_until);
        const currentTime = moment();
        if (blockedUntil.isValid() && blockedUntil.isAfter(currentTime)) {
          const timeRemaining = blockedUntil.diff(currentTime, 'seconds');
          return res.status(400).json({
            error: `Has excedido el límite de intentos fallidos. La cuenta ha sido bloqueada temporalmente. Por favor, inténtalo de nuevo más tarde.`,
            timeRemaining
          });
        }
      }
      // Verificar la contraseña
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        // Contraseña válida, restablecer el contador de intentos fallidos
        await resetFailedLoginAttempts(user.customer_id);

        // Continuar con la autenticación
        const token = jwt.sign({ userId: user.customer_id }, 'secreto', { expiresIn: '1h' });

        // Imprimir el token generado
        console.log("Token generado:", token);

        delete user.password; // Eliminar la contraseña para no enviarla al cliente
        return res.status(200).json({
          'Id': user.customer_id,
          'Nombre': user.name,
          'Email': user.email,
          'Dirección': user.address,
          'Telefono': user.phone,
          token
        });
      } else {
        // Contraseña incorrecta, actualizar el contador de intentos fallidos
        await updateFailedLoginAttempts(user.customer_id);
        const failedAttempts = await getFailedLoginAttempts(user.customer_id);

        // Si se excede el límite de intentos fallidos, bloquear la cuenta temporalmente
        if (failedAttempts >= MAX_VALID_LOGIN_ATTEMPTS) {
          const blockedUntil = moment().add(BLOCK_DURATION_MINUTES, 'minutes');
          await blockAccount(user.customer_id, blockedUntil);
          return res.status(401).json({
            error: 'Has excedido el límite de intentos fallidos. La cuenta ha sido bloqueada temporalmente. Por favor, inténtalo de nuevo más tarde.',
            timeRemaining: BLOCK_DURATION_MINUTES * 60 // Convertir minutos a segundos
          });
        }

        const remainingAttempts = MAX_VALID_LOGIN_ATTEMPTS - failedAttempts;
        return res.status(401).json({ error: 'Credenciales inválidas', remainingAttempts });
      }
    } else {
      // Usuario no encontrado
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

async function updateFailedLoginAttempts(customerId) {
  const query = 'UPDATE clientes SET failed_login_attempts = failed_login_attempts + 1, last_failed_login = NOW() WHERE customer_id = ?';
  await connection.execute(query, [customerId]);
}

async function resetFailedLoginAttempts(customerId) {
  const query = 'UPDATE clientes SET failed_login_attempts = 0, last_failed_login = NULL WHERE customer_id = ?';
  await connection.execute(query, [customerId]);
}

async function getFailedLoginAttempts(customerId) {
  const query = 'SELECT failed_login_attempts FROM clientes WHERE customer_id = ?';
  const [rows] = await connection.execute(query, [customerId]);
  if (rows.length > 0) {
    return rows[0].failed_login_attempts;
  }
  return 0;
}

async function blockAccount(customerId, blockedUntil) {
  const query = 'UPDATE clientes SET is_blocked = true, blocked_until = ? WHERE customer_id = ?';
  await connection.execute(query, [blockedUntil.format('YYYY-MM-DD HH:mm:ss'), customerId]);
}
