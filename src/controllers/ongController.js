const ongModel = require('../models/ongModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const id = await ongModel.create(req.body);
    res.status(201).json({ message: 'ONG cadastrada com sucesso!', id_ong: id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar ONG.', details: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const ong = await ongModel.findByEmail(email);
    if (!ong) {
      return res.status(401).json({ error: 'Credenciais inválidas.' }); // Resposta genérica por segurança
    }
    const isMatch = await bcrypt.compare(senha, ong.senha);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }
    const token = jwt.sign({ id_ong: ong.id_ong }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ message: 'Login bem-sucedido!', token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
};

exports.getAllOngs = async (req, res) => {
    try {
        const ongs = await ongModel.findAll();
        res.status(200).json(ongs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar ONGs.' });
    }
};

exports.getOngById = async (req, res) => {
    try {
        const ong = await ongModel.findById(req.params.id);
        if (!ong) {
            return res.status(404).json({ error: 'ONG não encontrada.' });
        }
        res.status(200).json(ong);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar ONG.' });
    }
};