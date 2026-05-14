const express = require('express');
const router = express.Router();
const metricsController = require('../controllers/metricsControler');
router.post('/metrics', metricsController.registrarNuevaMetrica);

module.exports = router;