const express = require('express');

const acordosController = require('../controllers/acordos');

const router = express.Router();

// GET /api/v1/acordos
router.get('/acordos', acordosController.getAcordos);

module.exports = router;