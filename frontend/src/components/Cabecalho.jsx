// porsche-crud/frontend/src/components/Cabecalho.jsx
import { Link } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';

// Componente de cabeçalho da aplicação
const Cabecalho = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-porsche-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        {/* Logo e título da aplicação */}
        <div className="flex justify-center items-center">
          <Link to="/" className="flex items-center space-x-3">
            <FaCar className="text-2xl text-porsche-gold" />
            <span className="text-2xl font-bold font-porsche tracking-tight">
              Porsche <span className="text-porsche-gold">Collection</span>
            </span>
          </Link>
        </div>
      </div>
      {/* Rodapé do cabeçalho com informações */}
      <div className="bg-black py-2 px-4 text-sm text-center text-porsche-gold">
        Desenvolvido por Andre Oliveira Ferreira da Silva
      </div>
    </header>
  );
};

export default Cabecalho;