const necessidadeModel = require('../models/necessidadeModel');

// Controller para criar uma nova necessidade (requer autenticação)
exports.createNecessidade = async (req, res) => {
  try {
    const ongId = req.ongId; // Pego do middleware de autenticação
    const id_necessidade = await necessidadeModel.create(req.body, ongId);
    res.status(201).json({ message: 'Necessidade criada com sucesso!', id_necessidade });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar necessidade.' });
  }
};

// Controller para buscar as necessidades de uma ONG (público)
exports.getNecessidadesByOng = async (req, res) => {
  try {
    const { id_ong } = req.params;
    const necessidades = await necessidadeModel.findByOngId(id_ong);
    res.status(200).json(necessidades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar necessidades.' });
  }
};

// Controller para atualizar uma necessidade (requer autenticação)
exports.updateNecessidade = async (req, res) => {
  try {
    const { id_necessidade } = req.params;
    const ongId = req.ongId; // Pego do middleware
    
    const affectedRows = await necessidadeModel.update(id_necessidade, req.body, ongId);
    
    if (affectedRows > 0) {
      res.status(200).json({ message: 'Necessidade atualizada com sucesso!' });
    } else {
      res.status(404).json({ error: 'Necessidade não encontrada ou você não tem permissão para editá-la.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar necessidade.' });
  }
};

// Controller para deletar uma necessidade (requer autenticação)
exports.deleteNecessidade = async (req, res) => {
  try {
    const { id_necessidade } = req.params;
    const ongId = req.ongId; // Pego do middleware

    const affectedRows = await necessidadeModel.remove(id_necessidade, ongId);

    if (affectedRows > 0) {
      res.status(200).json({ message: 'Necessidade removida com sucesso!' });
    } else {
      res.status(404).json({ error: 'Necessidade não encontrada ou você não tem permissão para removê-la.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover necessidade.' });
  }
};