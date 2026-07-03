// seed.js
const { Nodo } = require('./src/models/index'); 
const sequelize = require('./src/config/db'); 

async function poblarBaseDeDatos() {
  try {
    // Sincronizamos la base de datos 
    await sequelize.sync({ force: false }); 
    console.log("✅ Conexión establecida y tablas verificadas.");

    // Creacion del primer nodo 
    const nuevoNodo = await Nodo.create({
      nombre: "Telus prueba",
      ubicacion: "Techo A1",
      version_fw: "v1.0.2"
    });

    console.log("\n🚀 ¡Base de datos poblada!");
    console.log("-----------------------------------------");
    console.log("🆔 COPIA ESTE UUID:");
    console.log(nuevoNodo.id); 
    console.log("-----------------------------------------\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error);
    process.exit(1);
  }
}

poblarBaseDeDatos();