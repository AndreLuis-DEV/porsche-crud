// porsche-crud/frontend/src/pages/DetalhesCarro.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCarSide, FaHorseHead, FaTachometerAlt, FaMoneyBillWave, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../services/api';

// Página que exibe os detalhes completos de um carro específico
const DetalhesCarro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carro, setCarro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Efeito para carregar os dados do carro quando o componente monta ou o ID muda
  useEffect(() => {
    const buscarCarro = async () => {
      try {
        const resposta = await api.get(`/${id}`);
        if (resposta.success) {
          setCarro(resposta.data);
        } else {
          setErro('Falha ao buscar detalhes do carro');
        }
      } catch (err) {
        setErro('Falha ao buscar detalhes do carro');
        console.error(err);
      } finally {
        setCarregando(false);
      }
    };

    buscarCarro();
  }, [id]);

  // Função para lidar com a exclusão do carro  
  const handleExcluir = async () => {
    if (window.confirm('Tem certeza que deseja excluir este carro?')) {
      try {
        await api.delete(`/${id}`);
        toast.success('Carro excluído com sucesso');
        navigate('/');
      } catch (erro) {
        toast.error('Falha ao excluir carro');
      }
    }
  };

  // Exibe spinner durante o carregamento
  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-porsche-500"></div>
      </div>
    );
  }

  // Exibe mensagem de erro se ocorrer
  if (erro) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-8" role="alert">
        <strong className="font-bold">Erro!</strong>
        <span className="block sm:inline"> {erro}</span>
        <button 
          onClick={() => navigate('/')}
          className="btn-primary mt-2"
        >
          <FaArrowLeft className="mr-2" />
          Voltar
        </button>
      </div>
    );
  }

  // Exibe mensagem se o carro não for encontrado  
  if (!carro) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-gray-600">Carro não encontrado</h2>
        <button 
          onClick={() => navigate('/')}
          className="btn-primary mt-4"
        >
          <FaArrowLeft className="mr-2" />
          Voltar para a lista
        </button>
      </div>
    );
  }

  // Renderiza os detalhes do carro  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden my-8">
      <div className="md:flex">
        {/* Seção da imagem do carro */}
        <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-4">
          <img 
            src={carro.url_imagem || 'https://download.logo.wine/logo/Porsche/Porsche-Logo.wine.png'} 
            alt={carro.modelo} 
            className="max-w-full max-h-[400px] object-contain"
            onError={(e) => {
              e.target.src = 'https://download.logo.wine/logo/Porsche/Porsche-Logo.wine.png';
            }}
          />
        </div>

        {/* Seção das informações do carro */}
        <div className="p-8 md:w-1/2">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-porsche-500 hover:text-porsche-600 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Voltar
          </button>
          
          <h1 className="text-3xl font-bold text-porsche-500 mb-2">{carro.modelo}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <FaCarSide className="mr-2 text-porsche-500" />
            <span>{carro.ano} • {carro.cor}</span>
          </div>
          
          {/* Seção de especificações técnicas */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Especificações</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <FaHorseHead className="mr-2 text-porsche-500" />
                <span><strong>Motor:</strong> {carro.tipo_motor}, {carro.cavalos} HP</span>
              </div>
              <div className="flex items-center">
                <FaTachometerAlt className="mr-2 text-porsche-500" />
                <span><strong>Performance:</strong> Vel. Máx: {carro.velocidade_maxima} km/h, 0-100 km/h: {carro.aceleracao_0_100}s</span>
              </div>
              <div className="flex items-center">
                <FaMoneyBillWave className="mr-2 text-porsche-500" />
                <span><strong>Preço:</strong> R$ {carro.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
          
          {/* Seção de descrição */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Descrição</h2>
            <p className="text-gray-700">{carro.descricao || 'Nenhuma descrição disponível.'}</p>
          </div>
          
          {/* Botões de ação */}
          <div className="flex space-x-4">
            <button
              onClick={() => navigate(`/carros/editar/${id}`)}
              className="btn-primary flex items-center"
            >
              <FaEdit className="mr-2" />
              Editar
            </button>
            <button
              onClick={handleExcluir}
              className="btn-danger flex items-center"
            >
              <FaTrash className="mr-2" />
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesCarro;