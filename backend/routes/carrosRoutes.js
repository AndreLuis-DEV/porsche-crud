//porsche-crud/backend/routes/carrosRoutes.js

// Importa o framework Express e o controlador de carros
const express = require('express');
const router = express.Router();
const carroController = require('../controllers/carrosController');

// Rotas CRUD
router.get('/', carroController.listarCarros);
router.get('/:id', carroController.buscarCarro);
router.post('/', carroController.criarCarro);
router.put('/:id', carroController.atualizarCarro);
router.delete('/:id', carroController.excluirCarro);

// Rota de pesquisa
router.get('/pesquisa/buscar', carroController.pesquisarCarros);

// Exporta o router para uso no servidor principal
module.exports = router;