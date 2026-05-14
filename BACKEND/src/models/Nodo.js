
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Nodo = sequelize.define('Nodo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true 
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false 
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: false 
  },
  version_fw: {
    type: DataTypes.STRING,
    allowNull: false 
  }
}, {
  tableName: 'nodos',
  timestamps: false 
});

module.exports = Nodo;