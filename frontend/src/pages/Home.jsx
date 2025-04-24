// porsche-crud/frontend/src/pages/Home.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner, FaPlus, FaSearch } from 'react-icons/fa';
import CardCarro from '../components/CardCarro';
import api from '../services/api';

// Página principal que lista todos os carros
const Home = () => {
  const [carros, setCarros] = useState([]); // lista de carros
  const [loading, setLoading] = useState(true); // carregamento
  const [error, setError] = useState(null); // erros
  const [searchTerm, setSearchTerm] = useState(''); // termo de busca

  // Efeito para carregar os carros quando o componente monta
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/');
        if (response.success && Array.isArray(response.data)) {
          setCarros(response.data);
        } else {
          throw new Error('Formato de dados inválido');
        }
      } catch (err) {
        console.error('Erro ao buscar carros:', err);
        setError('Erro ao carregar dados. Tente recarregar a página.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Filtra os carros com base no termo de busca
  const filteredCars = carros.filter(carro => 
    carro.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carro.cor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Exibe spinner durante o carregamento
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <FaSpinner className="animate-spin text-4xl text-porsche-500" />
      </div>
    );
  }

  // Exibe mensagem de erro se ocorrer
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="btn-primary flex items-center mx-auto"
        >
          Recarregar Página
        </button>
      </div>
    );
  }

  // Renderiza a página principal
  return (
    <div className="pb-12">
      {/* Banner superior */}
      <div className="bg-gradient-to-r from-porsche-800 to-gray-900 text-white py-12 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-porsche">
            Porsche <span className="text-porsche-gold">Collection</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Explore nossa exclusiva coleção de veículos Porsche
          </p>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-6 py-8">
        {/* Barra de pesquisa e botão de adicionar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar por modelo ou cor..."
              className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-porsche-500 focus:border-porsche-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Link
            to="/carros/adicionar"
            className="btn-primary flex items-center w-full md:w-auto justify-center"
          >
            <FaPlus className="mr-2" />
            Adicionar Porsche
          </Link>
        </div>

        {/* Lista de carros ou mensagem de lista vazia */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl text-gray-600 mb-4">
              {searchTerm ? 'Nenhum carro encontrado' : 'Nenhum carro cadastrado'}
            </h2>
            {!searchTerm && (
              <Link
                to="/carros/adicionar"
                className="btn-primary inline-flex items-center"
              >
                <FaPlus className="mr-2" />
                Adicionar Primeiro Porsche
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map(carro => (
              <CardCarro key={carro.id} carro={carro} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;