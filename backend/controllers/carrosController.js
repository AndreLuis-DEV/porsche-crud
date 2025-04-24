//porsche-crud/backend/controllers/carrosController.js

// Importa o pool de conexões e o modelo de Carro
const pool = require('../config/db');
const Carro = require('../models/carroModel');

// Objeto que contém todas as funções do controlador de carros
const carroController = {
    /**
     * Lista todos os carros do banco de dados
     */
    listarCarros: async (req, res) => {
        try {
            const carros = await Carro.listarTodos();
            
            if (!carros || carros.length === 0) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Nenhum carro encontrado',
                    suggestion: 'Adicione carros ao banco de dados'
                });
            }

            console.log(`[SUCCESS] ${carros.length} carros encontrados`);
            res.status(200).json({
                success: true,
                count: carros.length,
                data: carros
            });

        } catch (erro) {
            console.error('[ERROR] listarCarros:', erro);
            res.status(500).json({
                success: false,
                message: 'Erro ao listar carros',
                error: process.env.NODE_ENV === 'development' ? erro.message : undefined,
                stack: process.env.NODE_ENV === 'development' ? erro.stack : undefined
            });
        }
    },

    /**
     * Busca um carro específico pelo ID
     */
    buscarCarro: async (req, res) => {
        try {
            const carro = await Carro.buscarPorId(req.params.id);
            
            if (!carro) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Carro não encontrado',
                    suggestion: 'Verifique o ID do carro'
                });
            }

            console.log(`[SUCCESS] Carro encontrado: ${carro.modelo}`);
            res.status(200).json({
                success: true,
                data: carro
            });

        } catch (erro) {
            console.error('[ERROR] buscarCarro:', erro);
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar carro',
                error: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    },

    /**
     * Cria um novo carro no banco de dados
     */
    criarCarro: async (req, res) => {
        try {
            // Validação básica
            if (!req.body.modelo || !req.body.ano) {
                return res.status(400).json({
                    success: false,
                    message: 'Modelo e ano são obrigatórios'
                });
            }

            const novoCarroId = await Carro.criar(req.body);
            const novoCarro = await Carro.buscarPorId(novoCarroId);

            console.log(`[SUCCESS] Novo carro criado: ${novoCarro.modelo}`);
            res.status(201).json({
                success: true,
                message: 'Carro criado com sucesso',
                data: novoCarro
            });

        } catch (erro) {
            console.error('[ERROR] criarCarro:', erro);
            res.status(400).json({
                success: false,
                message: 'Erro ao criar carro',
                error: process.env.NODE_ENV === 'development' ? erro.message : undefined,
                details: process.env.NODE_ENV === 'development' ? {
                    receivedData: req.body
                } : undefined
            });
        }
    },

    /**
     * Atualiza um carro existente
     */
    atualizarCarro: async (req, res) => {
        try {
            const linhasAfetadas = await Carro.atualizar(req.params.id, req.body);
            
            if (linhasAfetadas === 0) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Carro não encontrado para atualização',
                    suggestion: 'Verifique o ID do carro'
                });
            }

            const carroAtualizado = await Carro.buscarPorId(req.params.id);
            
            console.log(`[SUCCESS] Carro atualizado: ${carroAtualizado.modelo}`);
            res.status(200).json({
                success: true,
                message: 'Carro atualizado com sucesso',
                data: carroAtualizado
            });

        } catch (erro) {
            console.error('[ERROR] atualizarCarro:', erro);
            res.status(400).json({
                success: false,
                message: 'Erro ao atualizar carro',
                error: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    },

    /**
     * Exclui um carro do banco de dados
     */
    excluirCarro: async (req, res) => {
        try {
            // Primeiro busca o carro para registrar qual foi excluído
            const carro = await Carro.buscarPorId(req.params.id);
            
            if (!carro) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Carro não encontrado para exclusão'
                });
            }

            const linhasAfetadas = await Carro.excluir(req.params.id);
            
            console.log(`[SUCCESS] Carro excluído: ${carro.modelo}`);
            res.status(200).json({
                success: true,
                message: 'Carro excluído com sucesso',
                deletedData: carro
            });

        } catch (erro) {
            console.error('[ERROR] excluirCarro:', erro);
            res.status(500).json({
                success: false,
                message: 'Erro ao excluir carro',
                error: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    },

    /**
     * Pesquisa carros com base em um termo de busca
     */
    pesquisarCarros: async (req, res) => {
        try {
            const { termo } = req.query;
            
            if (!termo || termo.length < 3) {
                return res.status(400).json({
                    success: false,
                    message: 'Termo de pesquisa deve ter pelo menos 3 caracteres'
                });
            }

            const [carros] = await pool.query(
                `SELECT * FROM carros 
                 WHERE modelo LIKE ? OR cor LIKE ? OR tipo_motor LIKE ? OR descricao LIKE ?`,
                [`%${termo}%`, `%${termo}%`, `%${termo}%`, `%${termo}%`]
            );

            if (carros.length === 0) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Nenhum carro encontrado para o termo pesquisado'
                });
            }

            console.log(`[SUCCESS] ${carros.length} carros encontrados para "${termo}"`);
            res.status(200).json({
                success: true,
                count: carros.length,
                termo: termo,
                data: carros
            });

        } catch (erro) {
            console.error('[ERROR] pesquisarCarros:', erro);
            res.status(500).json({
                success: false,
                message: 'Erro ao pesquisar carros',
                error: process.env.NODE_ENV === 'development' ? erro.message : undefined
            });
        }
    }
};

// Exporta o controlador para uso nas rotas
module.exports = carroController;