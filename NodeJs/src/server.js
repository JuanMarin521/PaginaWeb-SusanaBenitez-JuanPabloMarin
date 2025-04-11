const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Middleware para analizar JSON
app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Importar rutas
const routes = require('./rout/routes');

// Usar las rutas
app.use('/', routes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal en el servidor.');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});