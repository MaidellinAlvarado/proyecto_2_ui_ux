const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// CAMBIO AQUÍ: El primer argumento debe ser 'MetricaLog', no una ruta.
const MetricaLog = sequelize.define('MetricaLog', {
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
  },
  nodo_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'nodos',
      key: 'id'
    }
  },
  vatios_generados: {
    type: DataTypes.FLOAT,
    allowNull: false 
  },
  voltaje: {
    type: DataTypes.FLOAT,
    allowNull: false 
  },
  status_code: {
    type: DataTypes.INTEGER,
    allowNull: false 
  },
  criticidad: {
    type: DataTypes.ENUM('info', 'warning', 'error'),  
    allowNull: false
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: true 
  }
}, {
  tableName: 'metricas_log', // Este es el nombre real en la DB
  timestamps: false
});

module.exports = MetricaLog;