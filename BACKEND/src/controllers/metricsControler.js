
const metricService = require('../services/metricServerices'); 

const registrarNuevaMetrica = async (req, res) => {
    try {
   
        const datosMetrica = req.body;

        // LLAMADA AL SERVICIO: 
  
        const resultado = await metricService.procesarMetrica(req.app, datosMetrica);

        // Si todo sale bien, respondemos con éxito 
        return res.status(201).json({
            success: true,
            message: "Métrica recibida y procesada en tiempo real",
            data: resultado
        });
        
    } catch (error) {
        console.error("🔴 ERROR DETECTADO EN EL CONTROLADOR:");
        console.error(error.message);

  
        return res.status(500).json({
            success: false,
            message: "Error interno",
            error: error.message 
        }); 
    } 
}; 

module.exports = { registrarNuevaMetrica };