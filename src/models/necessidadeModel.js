const db = require('../config/database');

// Função para criar uma nova necessidade
const create = async (necessidadeData, ongId) => {
  const { id_categoria, item_descricao, quantidade_necessaria, unidade_medida } = necessidadeData;
  const sql = 'INSERT INTO necessidades (id_ong, id_categoria, item_descricao, quantidade_necessaria, unidade_medida) VALUES (?, ?, ?, ?, ?)';
  const values = [ongId, id_categoria, item_descricao, quantidade_necessaria, unidade_medida];

  const [result] = await db.query(sql, values);
  return result.insertId;
};

// Função para buscar todas as necessidades de uma ONG específica
const findByOngId = async (id_ong) => {
  // Usamos JOIN para pegar o nome da categoria junto, o que é útil para o app
  const sql = `
    SELECT n.*, c.nome_categoria 
    FROM necessidades n
    JOIN categorias c ON n.id_categoria = c.id_categoria
    WHERE n.id_ong = ?
    ORDER BY n.status, n.data_atualizacao DESC
  `;
  const [rows] = await db.query(sql, [id_ong]);
  return rows;
};

// Função para atualizar uma necessidade
const update = async (id_necessidade, necessidadeData, ongId) => {
  const { id_categoria, item_descricao, quantidade_necessaria, unidade_medida, status } = necessidadeData;
  const sql = 'UPDATE necessidades SET id_categoria = ?, item_descricao = ?, quantidade_necessaria = ?, unidade_medida = ?, status = ? WHERE id_necessidade = ? AND id_ong = ?';
  const values = [id_categoria, item_descricao, quantidade_necessaria, unidade_medida, status, id_necessidade, ongId];

  const [result] = await db.query(sql, values);
  return result.affectedRows; // Retorna 1 se atualizou, 0 se não encontrou (ou não tinha permissão)
};

// Função para remover uma necessidade
const remove = async (id_necessidade, ongId) => {
  // O "AND id_ong = ?" garante que uma ONG só possa deletar suas próprias necessidades
  const sql = 'DELETE FROM necessidades WHERE id_necessidade = ? AND id_ong = ?';
  const [result] = await db.query(sql, [id_necessidade, ongId]);
  return result.affectedRows; // Retorna 1 se deletou, 0 se não encontrou
};


module.exports = {
  create,
  findByOngId,
  update,
  remove,
};