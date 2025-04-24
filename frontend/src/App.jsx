//porsche-crud/frontend/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cabecalho from './components/Cabecalho';
import Rodape from './components/Rodape';
import Home from './pages/Home';
import AdicionarCarro from './pages/AdicionarCarro';
import DetalhesCarro from './pages/DetalhesCarro';
import EditarCarro from './pages/EditarCarro';

// Componente principal que define a estrutura da aplicação
function App() {
  return (
    <Router>
      {/* Layout principal com cabeçalho, conteúdo e rodapé */}
      <div className="flex flex-col min-h-screen">
        <Cabecalho />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carros/adicionar" element={<AdicionarCarro />} />
            <Route path="/carros/:id" element={<DetalhesCarro />} />
            <Route path="/carros/editar/:id" element={<EditarCarro />} />
          </Routes>
        </main>
        <Rodape />
        {/* Container para notificações toast */}
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;