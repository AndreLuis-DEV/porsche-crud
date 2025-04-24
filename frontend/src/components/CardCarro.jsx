// porsche-crud/frontend/src/components/CardCarro.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCarSide, FaHorseHead, FaTachometerAlt, FaMoneyBillWave } from 'react-icons/fa';

// Representa um card de carro para exibição na lista
const CardCarro = ({ carro }) => {
  // fallback caso a URL original falhe
  const [imgSrc, setImgSrc] = useState(
    carro.url_imagem || 'https://download.logo.wine/logo/Porsche/Porsche-Logo.wine.png'
  );

  // Verifica se o carro é válido  
  if (!carro || typeof carro !== 'object') {
    return null;
  }

  return (
    // Container principal do card
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      {/* Container da imagem do carro */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={imgSrc}
          alt={carro.modelo || 'Carro Porsche'}
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
          onError={() => setImgSrc('https://download.logo.wine/logo/Porsche/Porsche-Logo.wine.png')}
        />
        {/* Badge com o ano do carro */}
        <div className="absolute top-2 right-2 bg-porsche-500 text-white text-sm font-bold px-2 py-1 rounded-full">
          {carro.ano || '--'}
        </div>
      </div>
      
      {/* Informações do carro */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">
            {carro.modelo || 'Modelo não disponível'}
          </h3>
          <span className="text-lg font-bold text-porsche-600">
            {carro.preco ? `R$ ${carro.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '--'}
          </span>
        </div>
        
        {/* Detalhes do carro com ícones */}
        <div className="space-y-2 text-gray-600 mb-4">
          <div className="flex items-center">
            <FaCarSide className="mr-2 text-porsche-500" />
            <span>{carro.cor || 'Cor não disponível'}</span>
          </div>
          
          <div className="flex items-center">
            <FaHorseHead className="mr-2 text-porsche-500" />
            <span>{carro.cavalos || '--'} HP • {carro.tipo_motor || '--'}</span>
          </div>
          
          <div className="flex items-center">
            <FaTachometerAlt className="mr-2 text-porsche-500" />
            <span>
              {carro.velocidade_maxima || '--'} km/h • 0-100: {carro.aceleracao_0_100 || '--'}s
            </span>
          </div>
        </div>
        
        <div className="flex justify-between gap-2">
          <Link
            to={`/carros/${carro.id}`}
            className="btn-primary flex-1 text-center py-2"
          >
            Detalhes
          </Link>
          <Link
            to={`/carros/editar/${carro.id}`}
            className="btn-secondary flex-1 text-center py-2"
          >
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardCarro;