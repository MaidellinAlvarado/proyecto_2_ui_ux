#  Proyecto medidor de energia:



### Explicación de la Arquitectura de 3 Capas
Para mantener el código escalable y ordenado, dividimos las responsabilidades:
* **Capa 1 - Rutas (`/routes`):** Es la puerta de entrada. Solo recibe la petición HTTP (ej. un `POST /api/metricas`) y la envía al controlador correspondiente. No tiene lógica.
* **Capa 2 - Controladores (`/controllers`):** Recibe los datos de la ruta (el `req` y `res`). Su único trabajo es extraer la información, enviarla a la capa de Servicios, y luego devolver la respuesta al cliente (ej. un estado 200 OK o 500 Error).
* **Capa 3 - Servicios (`/services`):** Aquí vive el "cerebro" de la aplicación. Hace los cálculos, procesa la información y se comunica con la Base de Datos.

### Notas Importantes para el Futuro
**Sockets:** Recordar que el proyecto prohíbe usar variables globales para los sockets. Deberemos inyectar la instancia de Socket.io en el ciclo de vida de Express

1. Creamos el archivo `.env` para manejar las variables de entorno de forma segura.
2. Configuramos Express en `src/app.js`, agregando los middlewares básicos (`cors`, `express.json`).
3. Creamos el punto de entrada `src/server.js` que levanta el servidor HTTP e inicializa `socket.io`.

### Solución Arquitectónica
Para cumplir con la restricción de **no usar variables globales para los sockets**, implementamos el siguiente patrón:
* En `server.js`, guardamos la instancia de Socket.io dentro de la aplicación de Express usando `app.set('io', io)`.
* En `app.js`, creamos un middleware que intercepta cada petición HTTP e inyecta la instancia en el objeto de la petición: `req.io = app.get('io')`.
* De esta forma, cualquier controlador futuro podrá emitir eventos usando `req.io.emit()` dentro de su propio ciclo de vida.