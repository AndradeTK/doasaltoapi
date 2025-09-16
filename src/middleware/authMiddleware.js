// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido ou mal formatado.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Adiciona o ID da ONG logada ao objeto da requisição
    req.ongId = decoded.id_ong; 
    next(); // Se o token for válido, continua para o controller
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};