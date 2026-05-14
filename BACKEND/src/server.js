require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const io = new Server(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST']
    }
});


const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// Middleware para validar JWT en el Handshake - COMENTADO TEMPORALMENTE
/* io.use((socket, next) => {
    const token = socket.handshake.auth.token; 

    if (!token) {
        return next(new Error('Acceso denegado'));
    }

    jwt.verify(token, getKey, {
        audience: process.env.AUTH0_AUDIENCE,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ['RS256']
    }, (err, decoded) => {
        if (err) return next(new Error('Invalido'));
        socket.user = decoded; 
        next();
    });
});
*/

// Hacemos que io esté disponible en las rutas de Express
app.set('io', io);

// Escuchamos conexiones entrantes de WebSockets
io.on('connection', (socket) => {
    console.log(`🔌 Nuevo cliente de socket conectado: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`🔴 Cliente desconectado: ${socket.id}`);
    });
});

// Levantamos el servidor
server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});