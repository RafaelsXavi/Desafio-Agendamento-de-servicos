# Sistema de Agendamento de Serviços

Uma aplicação web full-stack para agendamento de serviços com duas interfaces distintas: uma para clientes agendar serviços e outra para administradores gerenciar agendamentos.

## 📋 Descrição do Projeto

Este sistema permite que clientes agendem serviços de forma intuitiva através de uma interface amigável com calendário visual de horários disponíveis, enquanto barbeiros podem gerenciar todos os agendamentos através de um painel administrativo completo com visão de lista e calendário, funcionalidades de filtragem, estatísticas e gestão de status.

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** v20.10.0 - Runtime JavaScript
- **Express** v4.18.2 - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** v8.0.0 - ODM para MongoDB
- **JWT** v9.0.2 - Autenticação via tokens
- **bcryptjs** v2.4.3 - Hash de senhas
- **cors** v2.8.5 - Cross-Origin Resource Sharing
- **dotenv** v16.3.1 - Gestão de variáveis de ambiente
- **express-validator** v7.0.1 - Validação de dados

### Frontend
- **React** v18.2.0 - Biblioteca JavaScript para interfaces
- **Vite** v5.0.0 - Build tool e dev server
- **React Router DOM** v6.20.0 - Roteamento
- **Axios** v1.6.2 - Cliente HTTP

### Ferramentas de Desenvolvimento
- **nodemon** v3.0.1 - Auto-reload do servidor
- **@vitejs/plugin-react** v4.2.0 - Plugin React para Vite

## 🤖 Ferramentas de IA Utilizadas

Durante o desenvolvimento deste projeto, foi utilizada a **Devin AI** para:

- **Geração de código boilerplate**: Criação inicial da estrutura de pastas e arquivos de configuração
- **Estruturação do projeto**: Organização da arquitetura frontend/backend seguindo melhores práticas
- **Documentação**: Geração de README e comentários no código
- **Debugging**: Identificação e correção de problemas de configuração e dependências
- **Otimização**: Sugestões de melhorias no código e estrutura

A IA foi utilizada como ferramenta auxiliar para acelerar o desenvolvimento, com todo o código sendo revisado e validado para garantir qualidade e funcionamento correto.

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js (v18 ou superior)
- MongoDB (instalado localmente OU conta gratuita no MongoDB Atlas)
- npm ou yarn

**Nota**: Se você não tiver MongoDB instalado localmente, pode usar o MongoDB Atlas gratuitamente. Veja as instruções na seção de configuração.

### Instalação Passo a Passo

#### 1. Clone o repositório
```bash
git clone https://github.com/usuario/agendamento-servicos.git
cd agendamento-servicos
```

#### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```bash
# Backend
MONGODB_URI=mongodb://localhost:27017/agendamento-servicos
JWT_SECRET=sua-chave-secreta-aqui
PORT=5000

# Frontend
VITE_API_URL=http://localhost:5000
```

#### 3. Instale as dependências do backend

```bash
cd backend
npm install
```

#### 4. Instale as dependências do frontend

```bash
cd ../frontend
npm install
```

#### 5. Configure o MongoDB

**Opção 1: MongoDB Local com Docker (Recomendado)**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Opção 2: MongoDB Local**
- Instale o MongoDB Community Server em https://www.mongodb.com/try/download/community
- Inicie o serviço MongoDB
- Verifique se está rodando em `mongodb://localhost:27017`

**Opção 3: MongoDB Atlas**
- Crie uma conta gratuita em https://www.mongodb.com/cloud/atlas
- Configure a connection string no `.env`

#### 6. Crie o usuário administrador

O usuário administrador é criado automaticamente na primeira execução:

```bash
cd backend
node createAdmin.js
```

Isso criará um admin com:
- Email: admin@test.com
- Senha: admin123

#### 7. Inicie o backend

```bash
cd backend
npm start
```

O servidor irá iniciar na porta 5000.

#### 8. Inicie o frontend

Em um novo terminal:

```bash
cd frontend
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🔐 Credenciais de Acesso

### Administrador Padrão
- **Email**: admin@test.com
- **Senha**: admin123

### Acesso à Aplicação

1. **Cliente**: Acesse `http://localhost:3002` para agendar serviços
2. **Admin**: Acesse `http://localhost:3002/admin/login` para gerenciar agendamentos

## 📁 Estrutura do Projeto

```
agendamento-servicos/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # Configuração do MongoDB
│   │   ├── controllers/
│   │   │   ├── appointmentController.js  # Lógica de agendamentos
│   │   │   └── authController.js        # Lógica de autenticação
│   │   ├── middlewares/
│   │   │   └── auth.js               # Middleware de autenticação
│   │   ├── models/
│   │   │   ├── Appointment.js       # Modelo de agendamento
│   │   │   └── Admin.js             # Modelo de administrador
│   │   ├── routes/
│   │   │   ├── appointments.js      # Rotas de agendamentos
│   │   │   └── auth.js              # Rotas de autenticação
│   │   └── server.js                # Entry point do servidor
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/              # Componentes reutilizáveis
│   │   ├── pages/
│   │   │   ├── Cliente/
│   │   │   │   ├── Cliente.jsx     # Interface do cliente
│   │   │   │   └── Cliente.css
│   │   │   └── Admin/
│   │   │       ├── AdminLogin.jsx  # Login do admin
│   │   │       ├── AdminLogin.css
│   │   │       ├── AdminDashboard.jsx  # Painel admin
│   │   │       └── AdminDashboard.css
│   │   ├── services/
│   │   │   └── api.js               # Configuração do Axios
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   └── index.css
│   │   ├── App.jsx                  # Componente principal
│   │   └── main.jsx                 # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 🔗 Links Importantes

- **Repositório GitHub**: https://github.com/usuario/agendamento-servicos
- **Produção**: https://agendamento-servicos.vercel.app (a ser configurado)

## 📋 Funcionalidades

### Área do Cliente
- ✅ Formulário de agendamento com validação em tempo real
- ✅ Seleção de tipo de serviço (Corte, Barba, Manicure, etc.)
- ✅ Escolha de data e horário com verificação de disponibilidade
- ✅ **NOVO**: Calendário visual de horários disponíveis/ocupados
- ✅ Validação de telefone com formatação automática
- ✅ Prevenção de agendamento em datas passadas
- ✅ Confirmação visual do agendamento
- ✅ Prevenção de double booking (dois clientes no mesmo horário)
- ✅ Interface responsiva e intuitiva

### Área do Barbeiro (Admin)
- ✅ Dashboard com estatísticas em tempo real
- ✅ **NOVO**: Visão de calendário da agenda do dia
- ✅ **NOVO**: Seletor de data para visualizar agenda específica
- ✅ **NOVO**: Cards de horários com detalhes do cliente
- ✅ **NOVO**: Alternância entre visão de lista e calendário
- ✅ Listagem de todos os agendamentos
- ✅ Filtros por data, status e tipo de serviço
- ✅ Alteração de status (Agendado, Confirmado, Concluído, Cancelado)
- ✅ Exclusão de agendamentos com confirmação
- ✅ Histórico de alterações de status
- ✅ Taxa de conclusão de agendamentos
- ✅ Autenticação segura com JWT

## 🎯 Decisões Técnicas

### Por que Node.js + Express?
- **Performance**: Node.js oferece excelente performance para I/O operations
- **JavaScript Full-stack**: Permite usar a mesma linguagem no frontend e backend
- **Ecossistema**: npm oferece vasta biblioteca de pacotes
- **Escalabilidade**: Arquitetura event-loop permite alta concorrência

### Por que MongoDB?
- **Flexibilidade**: Schema flexível ideal para aplicações em evolução
- **Performance**: Excelente performance para operações de leitura
- **Escalabilidade**: Fácil escalabilidade horizontal
- **JSON Nativo**: Trabalha naturalmente com dados JSON

### Por que React + Vite?
- **Componentização**: Arquitetura baseada em componentes reutilizáveis
- **Performance**: Virtual DOM proporciona atualizações eficientes
- **Vite**: Build tool extremamente rápido com HMR instantâneo
- **Ecossistema**: Vasta biblioteca de componentes e hooks

### Padrões Arquiteturais Utilizados
- **MVC**: Separação clara entre Models, Views e Controllers
- **RESTful API**: Interface seguindo princípios REST
- **JWT Authentication**: Autenticação stateless e escalável
- **Component-Based UI**: Arquitetura de componentes no frontend

### Desafios e Soluções

#### Desafio 1: Prevenção de Double Booking
**Solução**: Implementação de índice único no MongoDB para combinação data+horário, além de verificação antes da criação do agendamento.

#### Desafio 2: Validação de Telefone
**Solução**: Implementação de máscara de input no frontend e validação regex no backend para garantir formato correto.

#### Desafio 3: Sincronização de Status
**Solução**: Sistema de histórico de status que rastreia todas as mudanças com timestamp e responsável pela alteração.

#### Desafio 4: Responsividade
**Solução**: Uso de CSS Grid e Flexbox com media queries para garantir experiência consistente em todos os dispositivos.

## 🧪 Testes

### Testes Realizados

O sistema foi submetido a testes abrangentes para garantir o funcionamento correto de todas as funcionalidades:

1. **Teste de Conexão com Banco de Dados**: Configuração e validação da conexão MongoDB
2. **Teste de Agendamento Bem-Sucedido**: Verificação do fluxo completo de agendamento
3. **Teste de Prevenção de Double Booking**: Confirmação que dois clientes não podem agendar no mesmo horário
4. **Teste de Verificação de Disponibilidade**: Validação da exibição correta de horários disponíveis/ocupados
5. **Teste de Alteração de Status**: Verificação do sistema de gestão de status
6. **Teste de Cancelamento**: Confirmação da liberação de horários após cancelamento

**Resultado**: ✅ Todos os testes passaram com sucesso

Para mais detalhes, consulte o arquivo [RELATORIO_TESTES.md](./RELATORIO_TESTES.md)

### Testes Manuais Sugeridos

1. **Teste de Agendamento**:
   - Preencha o formulário como cliente
   - Verifique a validação dos campos
   - Utilize o calendário visual para escolher horários
   - Confirme o agendamento e visualize o comprovativo

2. **Teste de Double Booking**:
   - Tente agendar o mesmo horário com dois clientes diferentes
   - Verifique se o sistema impede o segundo agendamento

3. **Teste Administrativo**:
   - Faça login como admin
   - Verifique as estatísticas
   - Teste os filtros
   - Alterne entre visão de lista e calendário
   - Altere status de agendamentos
   - Exclua um agendamento

4. **Teste de Responsividade**:
   - Teste em diferentes tamanhos de tela
   - Verifique comportamento em mobile
   - Confirme usabilidade em tablet

## 📝 Licença

Este projeto está sob licença ISC.

## 👨‍💻 Desenvolvimento

Desenvolvido como parte do desafio de agendamento de serviços, utilizando methodologies modernas de desenvolvimento e ferramentas de IA para acelerar o processo sem comprometer a qualidade.

---

**Nota**: Este é um projeto educacional. Para uso em produção, recomenda-se adicionar testes automatizados, CI/CD, monitoramento e outras práticas de DevOps.

## 🔧 Troubleshooting

### MongoDB Connection Error
Se você encontrar erro `ECONNREFUSED` ou `querySrv ECONNREFUSED`:
- **Para MongoDB Atlas**:
  - Verifique se o cluster está rodando no painel do Atlas
  - Adicione seu IP à Network Access (0.0.0.0/0 para qualquer IP)
  - Verifique se as credenciais estão corretas
  - Confirme que o database name está correto
- **Para MongoDB Local**:
  - Verifique se o MongoDB está rodando localmente
  - Atualize a `MONGODB_URI` no arquivo `.env`

### Port Already in Use
Se a porta 5000 estiver em uso:
- Altere a `PORT` no arquivo `.env`
- OU encerre o processo que está usando a porta 5000

### CORS Errors
Se encontrar erros de CORS:
- Verifique se o `VITE_API_URL` no frontend está correto
- Certifique-se de que o backend está rodando

### Module Not Found Errors
Se encontrar erros de módulos não encontrados:
- Execute `npm install` nas pastas `backend` e `frontend`
- Verifique se todas as dependências foram instaladas corretamente
