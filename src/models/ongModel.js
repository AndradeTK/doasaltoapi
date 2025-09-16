const db = require('../config/database');
const bcrypt = require('bcryptjs');

// Função para criar uma nova ONG no banco
const create = async (ongData) => {
  const { nome, cnpj, email, senha, telefone, endereco, descricao, dados_bancarios } = ongData;
  
  // Criptografar a senha antes de salvar
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(senha, salt);

  const sql = 'INSERT INTO ongs (nome, cnpj, email, senha, telefone, endereco, descricao, dados_bancarios) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [nome, cnpj, email, hashedPassword, telefone, endereco, descricao, dados_bancarios];
  
  const [result] = await db.query(sql, values);
  return result.insertId; // Retorna o ID da ONG criada
};

// Função para buscar uma ONG pelo email
const findByEmail = async (email) => {
  const sql = 'SELECT * FROM ongs WHERE email = ?';
  const [rows] = await db.query(sql, [email]);
  return rows[0]; // Retorna a primeira ONG encontrada ou undefined
};

// Função para buscar uma ONG pelo ID
const findById = async (id) => {
  const sql = 'SELECT id_ong, nome, cnpj, email, telefone, endereco, descricao, dados_bancarios, data_cadastro FROM ongs WHERE id_ong = ?';
  const [rows] = await db.query(sql, [id]);
  return rows[0];
};

// Função para buscar todas as ONGs
const findAll = async () => {
  const sql = 'SELECT id_ong, nome, descricao, endereco, telefone FROM ongs'; // Apenas dados públicos
  const [rows] = await db.query(sql);
  return rows;
};

module.exports = {
  create,
  findByEmail,
  findById,
  findAll,
};