// src/routes/necessidadeRoutes.js
const express = require('express');
const router = express.Router();
const necessidadeController = require('../controllers/necessidadeController');
const authMiddleware = require('../middleware/authMiddleware');

// Rota para buscar todas as necessidades de uma ONG específica
router.get('/ong/:id_ong', necessidadeController.getNecessidadesByOng);

// --- ROTAS PROTEGIDAS ---
// O `authMiddleware` será executado antes das funções do controller.
// Ele vai garantir que apenas uma ONG logada possa realizar estas ações.

// Rota para uma ONG criar uma nova necessidade
router.post('/', authMiddleware, necessidadeController.createNecessidade);

// Rota para uma ONG atualizar uma necessidade (ex: marcar como "atendida")
router.put('/:id_necessidade', authMiddleware, necessidadeController.updateNecessidade);

// Rota para uma ONG deletar uma necessidade
router.delete('/:id_necessidade', authMiddleware, necessidadeController.deleteNecessidade);

module.exports = router;