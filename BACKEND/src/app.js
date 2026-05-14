const express = require('express');
const cors = require('cors');
const metricRoutes = require('../src/routes/metricRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    req.io = app.get('io'); 
    next();
});


app.use('/api', metricRoutes); 

// Ruta health 
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

module.exports = app;