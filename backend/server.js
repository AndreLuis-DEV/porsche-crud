//porsche-crud/backend/server.js
const express = require('express');
const cors = require('cors');
const carrosRoutes = require('./routes/carrosRoutes');

const app = express();

// Configuração detalhada do CORS para permitir requisições do frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware para garantir JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para headers padrão nas respostas
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

// Rotas
app.use('/api/carros', carrosRoutes);

// Rota de verificação de saúde da aplicação
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 5001;
// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🟢 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 Endpoint: http://localhost:${PORT}/api/carros`);
});