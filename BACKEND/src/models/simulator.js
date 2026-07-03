const axios = require('axios');


const API_URL = 'http://localhost:3000/api/metrics'; 
const NODO_ID = 'bf2938b3-dfdf-4f17-9e81-ebb38d52ee9e';

const enviarDatos = async () => {
    const random = Math.random();
    
dad
    const payload = {
        
        nodo_id: NODO_ID,
        vatios_generados: parseFloat((Math.random() * 900 + 100).toFixed(2)), // Entre 100 y 1000W 
        voltaje: parseFloat((Math.random() * 30 + 100).toFixed(2)), // Entre 100 y 130V 
        status_code: random > 0.9 ? 500 : 200, // 10% de probabilidad de error 
        criticidad: random > 0.9 ? 'error' : (random > 0.7 ? 'warning' : 'info'), // 
        mensaje: random > 0.9 ? "Falla crítica de sensor" : "Lectura estable" // 
    };

    try {
        const res = await axios.post(API_URL, payload);
        console.log(`🚀 [${new Date().toLocaleTimeString()}] Enviado: ${payload.vatios_generados}W | Status: ${res.status}`);
    } catch (err) {
        console.error(`❌ Error: ${err.message}`);
    }
};

// Requisito obligatorio: cada 5 segundos 
setInterval(enviarDatos, 5000);