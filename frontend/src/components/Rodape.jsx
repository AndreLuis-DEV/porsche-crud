// porsche-crud/frontend/src/components/Rodape.jsx
const Rodape = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-porsche-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Seção esquerda com logo e descrição */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold font-porsche">
              <span className="text-porsche-gold">Porsche Collection</span>
            </h3>
            <p className="text-sm mt-1">Sistema de gerenciamento de veículos</p>
          </div>
          {/* Seção direita com informações do desenvolvedor */}
          <div className="text-center md:text-right">
            <p className="text-porsche-gold mb-1">Andre Oliveira Ferreira da Silva</p>
            <p className="text-sm">© {new Date().getFullYear()} Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;