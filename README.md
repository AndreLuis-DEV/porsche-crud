# Porsche CRUD - Sistema de Gerenciamento de Veículos

Sistema web completo para gerenciamento de uma coleção de veículos Porsche, desenvolvido como projeto acadêmico.

**Desenvolvedor:** Andre Luís Oliveira Ferreira da Silva

## 📋 Descrição

Este projeto consiste em um sistema CRUD (Create, Read, Update, Delete) completo para gerenciamento de uma coleção de veículos Porsche. O sistema foi desenvolvido com:

- **Frontend:** React.js com Tailwind CSS
- **Backend:** Node.js com Express
- **Banco de Dados:** MySQL

## ✨ Funcionalidades

- Listagem de todos os veículos Porsche cadastrados
- Visualização detalhada de cada veículo
- Adição de novos veículos à coleção
- Edição de informações dos veículos existentes
- Exclusão de veículos
- Pesquisa por modelo ou características
- Design responsivo e moderno

## 🛠 Tecnologias Utilizadas

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- React Icons
- React Toastify
- Vite

### Backend
- Node.js
- Express
- MySQL2
- CORS
- Dotenv

### Banco de Dados
- MySQL

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- MySQL instalado e em execução
- Git (opcional)

### Passo a Passo

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/AndreLuis-DEV/porsche-crud.git
   cd porsche-crud

2. **Configurar o banco de dados**

- Importe o arquivo porsche_db.sql para seu MySQL

- Crie um arquivo .env no diretório backend com as credenciais do seu banco:

DB_HOST=127.0.0.1
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=porsche_db
PORT=5001
NODE_ENV=development

3. **Instalar dependências do backend**

- cd backend
- npm install

4. **Instalar dependências do frontend**

- cd ../frontend
- npm install

5. **Iniciar os servidores**

**Em um terminal, inicie o backend:**
- cd ../backend
- npm start

**Em outro terminal, inicie o frontend:**

- cd ../frontend
- npm run dev

**Acessar a aplicação:**

- Frontend: http://localhost:3000
- Backend: http://localhost:5001
