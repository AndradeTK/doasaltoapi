// src/routes/index.js
const express = require('express');
const router = express.Router();

const ongRoutes = require('./ongRoutes');
const necessidadeRoutes = require('./necessidadeRoutes');

router.use('/ongs', ongRoutes);

router.use('/necessidades', necessidadeRoutes);

module.exports = router;