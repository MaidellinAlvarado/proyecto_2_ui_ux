
const metricService = require('../services/metricServerices'); 

const registrarNuevaMetrica = async (req, res) => {
    try {
        // Obtenemos los datos del cuerpo de la petición (JSON) 
        const datosMetrica = req.body;

        // LLAMADA AL SERVICIO: 
        // Pasamos req.app para acceder a 'io' sin usar globales 
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

        // El error de sintaxis estaba aquí: se cerró mal el bloque catch
        return res.status(500).json({
            success: false,
            message: "Error interno",
            error: error.message 
        }); // Se cerró correctamente el .json()
    } // Se cierra el bloque catch
}; // Se cierra la función registrarNuevaMetrica

module.exports = { registrarNuevaMetrica };