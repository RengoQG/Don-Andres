const express = require('express');
const db = require('./db.js'); // Importar la configuración de la base de datos
const userRoutes = require('./Controllers/routes/userRuts.js');
const resetPassword = require('./Controllers/routes/resetPassword.js');
const validateToken = require('./Controllers/routes/validateToken.js');
const auth = require('./Controllers/routes/authRoutes.js');
const search = require('./Controllers/routes/serchName.js');
const relacionados = require('./Controllers/routes/relatedRoute.js');
const sugerencias = require('./Controllers/routes/sugerenacisRoute.js');
const categoria = require('./Controllers/routes/categories.js');
const agregarCategoria = require('./Controllers/routes/agregarCategoria');
const contactenos = require('./Controllers/routes/contactenosRoutes.js');
const producto = require('./Controllers/routes/productsRoute.js');
const productoId = require('./Controllers/routes/productoIdRoute.js');
const nuevosProductos = require('./Controllers/routes/nuevosProductosRoute.js');
const similares = require('./Controllers/routes/similaresRoute.js');
const authMiddleware = require('./middlewares/validarToken.js');
const cors = require('cors'); 
const helmet = require('helmet');


const app = express();

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Middleware para configurar CORS
app.use(cors());

// Usar el middleware helmet para configurar encabezados de seguridad
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [] // Aquí se especifican los orígenes permitidos cuando se usa HTTPS
      }
    }
  }));
// Ruta para obtener datos desde la base de datos
app.get('/', async(req, res) => {
    try {
        const connection = await db.getConnection();
        const [rows] = await connection.query('SELECT * FROM categorias');
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error('Error al ejecutar la consulta: ' + error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
// Montar las rutas de usuario
app.use('/users', userRoutes);
//Ruta para recuperar contraseña
app.use('/reset', resetPassword);
//Valida token y actualiza la contraseña
app.use('/validate', validateToken);
//Inicio de sesión
app.use('/users', auth);
//Protegue las rutas
// Rutas protegidas (requieren token de acceso)
app.get('/profile', authMiddleware, (req, res) => {
  // Esta es una ruta protegida, el usuario ha iniciado sesión correctamente
  // Puedes acceder a la información del usuario a través de req.user
  res.json({ message: '¡Bienvenido a tu perfil!' });
});
//ObtenerCategorias
app.use('/categoria', categoria);
//ObtenerProductos
app.use('/producto', producto);
//Buscar producto por nombre
app.use('/searchName', search);
//Sugerencias de productos
app.use('/sugerencias', sugerencias);
//Productos relacionados
app.use('/relacionados', relacionados);
//Contactenos
app.use('/contactenos', contactenos);
//Productos similares
app.use('/similares', similares);
//Producto por id
app.use('/producto', productoId);
//Nuevos productos
app.use('/nuevosProductos', nuevosProductos);
//Registrar una categoria
app.use('/agregarCategoria', agregarCategoria);


// Iniciar el servidor
const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
    console.log('Servidor Express escuchando en el puerto ' + PORT);
});
