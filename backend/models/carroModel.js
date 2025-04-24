//porsche-crud/backend/models/carroModel.js

// Importa o pool de conexões com o banco de dados
const pool = require('../config/db');

const Carro = {
    /**
     * Lista todos os carros ordenados pela data de criação (mais recentes primeiro)
     */
    async listarTodos() {
        try {
            const [linhas] = await pool.query('SELECT * FROM carros ORDER BY criado_em DESC');
            return linhas;
        } catch (erro) {
            throw erro;
        }
    },

    /**
     * Busca um carro específico pelo ID
     * @param {number} id - ID do carro a ser buscado
     */
    async buscarPorId(id) {
        try {
            const [linhas] = await pool.query('SELECT * FROM carros WHERE id = ?', [id]);
            return linhas[0];
        } catch (erro) {
            throw erro;
        }
    },

    /**
     * Cria um novo registro de carro no banco de dados
     */    
    async criar(dadosCarro) {
        try {
            const { modelo, ano, preco, cor, tipo_motor, cavalos, velocidade_maxima, aceleracao_0_100, descricao, url_imagem } = dadosCarro;
            const [resultado] = await pool.query(
                'INSERT INTO carros (modelo, ano, preco, cor, tipo_motor, cavalos, velocidade_maxima, aceleracao_0_100, descricao, url_imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [modelo, ano, preco, cor, tipo_motor, cavalos, velocidade_maxima, aceleracao_0_100, descricao, url_imagem]
            );
            return resultado.insertId;
        } catch (erro) {
            throw erro;
        }
    },

    /**
     * Atualiza os dados de um carro existente
     */    
    async atualizar(id, dadosCarro) {
        try {
            const { modelo, ano, preco, cor, tipo_motor, cavalos, velocidade_maxima, aceleracao_0_100, descricao, url_imagem } = dadosCarro;
            const [resultado] = await pool.query(
                'UPDATE carros SET modelo = ?, ano = ?, preco = ?, cor = ?, tipo_motor = ?, cavalos = ?, velocidade_maxima = ?, aceleracao_0_100 = ?, descricao = ?, url_imagem = ? WHERE id = ?',
                [modelo, ano, preco, cor, tipo_motor, cavalos, velocidade_maxima, aceleracao_0_100, descricao, url_imagem, id]
            );
            return resultado.affectedRows;
        } catch (erro) {
            throw erro;
        }
    },

    /**
     * Exclui um carro do banco de dados
     */    
    async excluir(id) {
        try {
            const [resultado] = await pool.query('DELETE FROM carros WHERE id = ?', [id]);
            return resultado.affectedRows;
        } catch (erro) {
            throw erro;
        }
    }
};

// Exporta o modelo para uso nos controladores
module.exports = Carro;