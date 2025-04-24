// porsche-crud/frontend/src/components/FormularioCarro.jsx

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash, FaSave, FaTimes } from "react-icons/fa";
import api from "../services/api";

// Componente de formulário para adicionar/editar carros
const FormularioCarro = ({ edicao = false }) => {
  // Estado para armazenar os dados do formulário
  const [dadosFormulario, setDadosFormulario] = useState({
    modelo: "",
    ano: "",
    preco: "",
    cor: "",
    tipo_motor: "",
    cavalos: "",
    velocidade_maxima: "",
    aceleracao_0_100: "",
    descricao: "",
    url_imagem: "",
  });

  // Estados para controlar o carregamento e exclusão
  const [carregando, setCarregando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  
  // Hooks para navegação e parâmetros da rota
  const navigate = useNavigate();
  const { id } = useParams();

  // Efeito para carregar os dados do carro quando em modo de edição
  useEffect(() => {
    if (edicao && id) {
      const buscarCarro = async () => {
        try {
          // Busca os dados do carro pela API
          const resposta = await api.get(`/${id}`);
          setDadosFormulario(resposta.data);
        } catch (erro) {
          toast.error("Falha ao buscar dados do carro");
          navigate("/");
        }
      };
      buscarCarro();
    }
  }, [id, edicao, navigate]);

  // Manipulador de mudança nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manipulador de envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);

    try {
      if (edicao) {
        // Atualiza carro existente
        await api.put(`/${id}`, dadosFormulario);
        toast.success("Carro atualizado com sucesso!");
      } else {
        // Cria novo carro
        await api.post("/", dadosFormulario);
        toast.success("Carro adicionado com sucesso!");
      }
      navigate("/");
    } catch (erro) {
      console.error("Erro ao salvar:", erro);
      toast.error(erro.response?.data?.mensagem || "Ocorreu um erro");
    } finally {
      setCarregando(false);
    }
  };

  // Manipulador para exclusão de carro
  const handleExcluir = async () => {
    if (window.confirm("Tem certeza que deseja excluir este carro permanentemente?")) {
      setExcluindo(true);
      try {
        await api.delete(`/${id}`);
        toast.success("Carro excluído com sucesso!");
        navigate("/");
      } catch (erro) {
        console.error("Erro ao excluir:", erro);
        toast.error("Falha ao excluir carro");
      } finally {
        setExcluindo(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      {/* Título do formulário (edição ou adição) */}
      <h2 className="text-2xl font-bold text-porsche-DEFAULT mb-6">
        {edicao ? "Editar Porsche" : "Adicionar Novo Porsche"}
      </h2>
      
      {/* Formulário principal */}
      <form onSubmit={handleSubmit}>
        {/* Grid responsivo com campos do formulário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Campo Modelo */}
          <div>
            <label className="block text-gray-700 mb-2">Modelo</label>
            <input
              type="text"
              name="modelo"
              value={dadosFormulario.modelo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-porsche-DEFAULT"
              required
            />
          </div>
          
          {/* Campo Ano */}
          <div>
            <label className="block text-gray-700 mb-2">Ano</label>
            <input
              type="number"
              name="ano"
              value={dadosFormulario.ano}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-porsche-DEFAULT"
              required
              min="1950"
              max="2025"
            />
          </div>
          
          {/* Campo Preço */}
          <div>
            <label className="block text-gray-700 mb-2">Preço (R$)</label>
            <input
              type="number"
              name="preco"
              value={dadosFormulario.preco}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-porsche-DEFAULT"
              required
              min="0"
              step="0.01"
            />
          </div>
          
          {/* Campo Cor */}
          <div>
            <label className="block text-gray-700 mb-2">Cor</label>
            <input
              type="text"
              name="cor"
              value={dadosFormulario.cor}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-porsche-DEFAULT"
              required
            />
          </div>
          
          {/* Campo Tipo de Motor */}
          <div>
            <label className="block text-gray-700 mb-2">Tipo de Motor</label>
            <input
              type="text"
              name="tipo_motor"
              value={dadosFormulario.tipo_motor}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-porsche-DEFAULT"
              required
            />
          </div>
          
          {/* Campo Cavalos */}
          <div>
            <label className="block text-gray-700 mb-2">Cavalos</label>
            <input
              type="number"
              name="cavalos"
              value={dadosFormulario.cavalos}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-porsche-DEFAULT"
              required
              min="0"
            />
          </div>
          
          {/* Campo Velocidade Máxima */}
          <div>
            <label className="block text-gray-700 mb-2">Velocidade Máxima (km/h)</label>
            <input
              type="number"
              name="velocidade_maxima"
              value={dadosFormulario.velocidade_maxima}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-porsche-DEFAULT"
              min="0"
            />
          </div>
          
          {/* Campo Aceleração 0-100 */}
          <div>
            <label className="block text-gray-700 mb-2">Aceleração (0-100 km/h)</label>
            <input
              type="number"
              name="aceleracao_0_100"
              value={dadosFormulario.aceleracao_0_100}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-porsche-DEFAULT"
              min="0"
              step="0.1"
            />
          </div>
        </div>
        
        {/* Campo URL da Imagem */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">URL da Imagem</label>
          <input
            type="url"
            name="url_imagem"
            value={dadosFormulario.url_imagem}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-porsche-DEFAULT"
            placeholder="https://download.logo.wine/logo/Porsche/Porsche-Logo.wine.png"
          />
        </div>
        
        {/* Campo Descrição */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Descrição</label>
          <textarea
            name="descricao"
            value={dadosFormulario.descricao}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-porsche-DEFAULT"
            rows="3"
          ></textarea>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <div className="flex gap-4">
            {/* Botão Cancelar */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center justify-center px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300 w-full sm:w-auto"
            >
              <FaTimes className="mr-2" />
              Cancelar
            </button>

            {/* Botão Excluir (apenas no modo edição) */}
            {edicao && (
              <button
                type="button"
                onClick={handleExcluir}
                disabled={excluindo}
                className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaTrash className="mr-2" />
                {excluindo ? "Excluindo..." : "Excluir Carro"}
              </button>
            )}
          </div>

          {/* Botão Salvar/Atualizar */}
          <button
            type="submit"
            disabled={carregando}
            className="flex items-center justify-center px-4 py-2 bg-porsche-500 text-white rounded-lg hover:bg-porsche-600 transition duration-300 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaSave className="mr-2" />
            {carregando
              ? "Salvando..."
              : edicao
              ? "Atualizar Carro"
              : "Adicionar Carro"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioCarro;