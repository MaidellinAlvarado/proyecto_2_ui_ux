
const Nodo = require('./Nodo');
const MetricaLog = require('./MetricaLog');

//  Un Nodo tiene muchas Métricas
Nodo.hasMany(MetricaLog, { foreignKey: 'nodo_id', as: 'logs' });
MetricaLog.belongsTo(Nodo, { foreignKey: 'nodo_id', as: 'nodo' });

module.exports = { Nodo, MetricaLog };