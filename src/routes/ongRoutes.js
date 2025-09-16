// src/routes/ongRoutes.js
const express = require('express');
const router = express.Router();
const ongController = require('../controllers/ongController');

// Rota pública para listar todas as ONGs (para a tela principal do App Inventor)
router.get('/', ongController.getAllOngs);

// Rota pública para ver detalhes de UMA ONG (para a tela de detalhes)
router.get('/:id', ongController.getOngById);

// Rota para a ONG se cadastrar
router.post('/register', ongController.register);

// Rota para a ONG fazer login
router.post('/login', ongController.login);

module.exports = router;