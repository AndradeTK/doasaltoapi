// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes'); // Importa o arquivo principal de rotas

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares essenciais
app.use(cors()); // Permite que seu app App Inventor acesse a API
app.use(express.json()); // Permite que a API entenda o formato JSON

// Rota principal da API
app.use('/api', routes);
app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});