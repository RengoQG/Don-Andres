// const fs = require('fs');
// const https = require('https');
// const express = require('express');
// const db = require('./db.js'); // Importar la configuración de la base de datos
// const userRoutes = require('./Controllers/routes/userRuts.js');
// const resetPassword = require('./Controllers/routes/resetPassword.js');
// const validateToken = require('./Controllers/routes/validateToken.js');
// const auth = require('./Controllers/routes/authRoutes.js');
// const search = require('./Controllers/routes/serchName.js');
// const relacionados = require('./Controllers/routes/relatedRoute.js');
// const sugerencias = require('./Controllers/routes/sugerenacisRoute.js');
// const categoria = require('./Controllers/routes/categories.js');
// const agregarCategoria = require('./Controllers/routes/agregarCategoria.js');
// const editarCategoria = require('./Controllers/routes/editarCategoria.js');
// const eliminarCategoria = require('./Controllers/routes/eliminarCategoria.js');
// const traerCategoria = require('./Controllers/routes/traerCategoria.js');
// const contactenos = require('./Controllers/routes/contactenosRoutes.js');
// const producto = require('./Controllers/routes/productsRoute.js');
// const productoId = require('./Controllers/routes/productoIdRoute.js');
// const nuevosProductos = require('./Controllers/routes/nuevosProductosRoute.js');
// const productoList = require('./Controllers/routes/listProduct.js');
// const agregarProducto = require('./Controllers/routes/agregarProducto.js');
// const agregarInfoProducto = require('./Controllers/routes/agregarInfoProducto.js');
// const agregarDestalleProducto = require('./Controllers/routes/agregarDestalleProducto.js');
// const actualizarProducto = require('./Controllers/routes/actualizarProducto.js');
// const actualizarDestalleProducto = require('./Controllers/routes/actualizarProductoDetalle.js');
// const actualizarProductoInfo = require('./Controllers/routes/actualizarInfoProducto.js');
// const obtenerProducto = require('./Controllers/routes/obtenerProducto.js');
// const eliminarProducto = require('./Controllers/routes/eliminarProducto.js');
// const upload = require('./Controllers/routes/upload.js');
// const similares = require('./Controllers/routes/similaresRoute.js');
// const authMiddleware = require('./middlewares/validarToken.js');
// const cors = require('cors');
// const helmet = require('helmet');

// const app = express();
// const port = 3000; // Puerto donde quieres que escuche tu servidor HTTPS

const fs = require('fs');
// const http = require('http'); // Cambiar https a http
const https = require('https');
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
const agregarCategoria = require('./Controllers/routes/agregarCategoria.js');
const editarCategoria = require('./Controllers/routes/editarCategoria.js');
const eliminarCategoria = require('./Controllers/routes/eliminarCategoria.js');
const traerCategoria = require('./Controllers/routes/traerCategoria.js');
const contactenos = require('./Controllers/routes/contactenosRoutes.js');
const producto = require('./Controllers/routes/productsRoute.js');
const productoId = require('./Controllers/routes/productoIdRoute.js');
const nuevosProductos = require('./Controllers/routes/nuevosProductosRoute.js');
const productoList = require('./Controllers/routes/listProduct.js');
const agregarProducto = require('./Controllers/routes/agregarProducto.js');
const agregarInfoProducto = require('./Controllers/routes/agregarInfoProducto.js');
const agregarDestalleProducto = require('./Controllers/routes/agregarDestalleProducto.js');
const actualizarProducto = require('./Controllers/routes/actualizarProducto.js');
const actualizarDestalleProducto = require('./Controllers/routes/actualizarProductoDetalle.js');
const actualizarProductoInfo = require('./Controllers/routes/actualizarInfoProducto.js');
const obtenerProducto = require('./Controllers/routes/obtenerProducto.js');
const eliminarProducto = require('./Controllers/routes/eliminarProducto.js');
const listDetals = require('./Controllers/routes/listDetals.js');
const listProductDetails = require('./Controllers/routes/listProductDetails.js');
const upload = require('./Controllers/routes/upload.js');
const similares = require('./Controllers/routes/similaresRoute.js');
const authMiddleware = require('./middlewares/validarToken.js');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const port = 3000; // Puerto donde quieres que escuche tu servidor HTTP

//Descomenar para cuando se vaya a iniciar en https
const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/horizonsolutions.com.co/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/horizonsolutions.com.co/fullchain.pem')
};

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Middleware para configurar CORS
app.use(cors());

// Usar el middleware helmet para configurar encabezados de seguridad
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [] // Aquí se especifican los orígenes permitidos cuando se usa HTTPS
      }
    }
  })
);

// Middleware para configurar CORS manualmente
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Ruta para obtener datos desde la base de datos
app.get('/', async (req, res) => {
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

// Ruta para recuperar contraseña
app.use('/reset', resetPassword);

// Valida token y actualiza la contraseña
app.use('/validate', validateToken);

// Inicio de sesión
app.use('/users', auth);

// Rutas protegidas (requieren token de acceso)
app.get('/profile', authMiddleware, (req, res) => {
  // Esta es una ruta protegida, el usuario ha iniciado sesión correctamente
  // Puedes acceder a la información del usuario a través de req.user
  res.json({ message: '¡Bienvenido a tu perfil!' });
});

// ObtenerCategorias
app.use('/categoria', categoria);

// ObtenerProductos
app.use('/producto', producto);

// Buscar producto por nombre
app.use('/searchName', search);

// Sugerencias de productos
app.use('/sugerencias', sugerencias);

// Productos relacionados
app.use('/relacionados', relacionados);

// Contactenos
app.use('/contactenos', contactenos);

// Productos similares
app.use('/similares', similares);

// Producto por id
app.use('/producto', productoId);

// Nuevos productos
app.use('/nuevosProductos', nuevosProductos);

// Registrar una categoria
app.use('/agregarCategoria', agregarCategoria);

// Editar una categoria
app.use('/editarCategoria', editarCategoria);

// Obtener una categoria por id
app.use('/traerCategoria', traerCategoria);

// Eliminar una categoria
app.use('/eliminarCategoria', eliminarCategoria);

// Listar producto
app.use('/obtenerProducto', productoList);

// Agregar producto
app.use('/agregarProducto', agregarProducto);

// Agregar info a un producto
app.use('/agregarInfoProducto', agregarInfoProducto);

// Agregar detalles del producto
app.use('/agregarDestalleProducto', agregarDestalleProducto);

// Actualizar producto
app.use('/actualizarProducto', actualizarProducto);

// Actualizar detalles del producto
app.use('/actualizarDestalleProducto', actualizarDestalleProducto);

// Actualizar info del producto
app.use('/actualizarInfoProducto', actualizarProductoInfo);

// Obtener producto por id
app.use('/obtenerProductoId', obtenerProducto);

// Eliminar producto
app.use('/eliminarProducto', eliminarProducto);

// Para actualizar las imágenes
app.use('/upload', upload);
//Listar info de un producto
app.use('/listDetals', listDetals);
//Listar detalles de un producto
app.use('/listProductDetails', listProductDetails);

// Iniciar servidor HTTPS
const server = https.createServer(httpsOptions, app);
server.listen(port, '0.0.0.0', () => {
  console.log(`Servidor HTTPS iniciado en https://localhost:${port}`);
});

//Iniciar localmente
// const PORT = process.env.PORT || 6001;
// app.listen(PORT, () => {
//     console.log('Servidor Express escuchando en el puerto ' + PORT);
// });
