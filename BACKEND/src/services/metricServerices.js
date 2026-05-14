const { MetricaLog } = require('../models');

const procesarMetrica = async (app, data) => {

    const nuevaMetrica = await MetricaLog.create(data);

    // 3. Recuperar Socket.io
    const io = app.get('io');
if (io) {
    console.log("📢 Emitiendo socket: Nueva Métrica"); // <-- Si no ves esto en la terminal del backend, el socket no se dispara
    io.emit('Nueva Métrica', nuevaMetrica);
}

    if (io) {
        io.emit('Nueva Métrica', nuevaMetrica);

        // 5. Lógica de Alerta Crítica
        if (nuevaMetrica.criticidad === 'error') {
            io.emit('Alerta Critica', {
                msg: `¡ALERTA! Fallo en el nodo ${nuevaMetrica.nodo_id}`,
                data: nuevaMetrica
            });
        }
    }

    return nuevaMetrica;
};

// 6. EXPORTAMOS CON EL NOMBRE CORRECTO
module.exports = { procesarMetrica };