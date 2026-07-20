# 📅 Sistema de Agendamento de Serviços

<div align="center">

![Status](https://img.shields.io/badge/status-online-success)
![Versão](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-green)

**Uma aplicação web full-stack moderna para agendamento de serviços com interface intuitiva e painel administrativo completo**

[Demo Online](#-acesso-à-aplicação) • [Documentação](#-documentação) • [Funcionalidades](#-funcionalidades) • [Tecnologias](#-tecnologias)

</div>

---

## 📋 Visão Geral

O Sistema de Agendamento de Serviços é uma solução completa para gerenciamento de agendamentos, desenvolvida com foco em usabilidade, performance e escalabilidade. O sistema oferece duas interfaces distintas:

- **Interface do Cliente**: Permite agendamento intuitivo com calendário visual de horários disponíveis
- **Painel Administrativo**: Dashboard completo para gerenciamento de agendamentos com estatísticas e filtros avançados

### 🎯 Objetivo do Projeto

Este projeto foi desenvolvido como parte de um desafio técnico para demonstrar habilidades em desenvolvimento full-stack, arquitetura de software, e implementação de soluções modernas para problemas reais de negócio.

---

## 🚀 Acesso à Aplicação

### 🌐 Ambiente de Produção

- **Frontend**: [Disponível no Vercel](https://seu-projeto.vercel.app)
- **Backend**: [Hospedado no Render](https://agendamento-servicos-backend.onrender.com)
- **Status**: ✅ Online 24/7 com monitoramento ativo

### 🔐 Credenciais de Acesso

**Administrador Padrão:**
- **Email**: `admin@test.com`
- **Senha**: `admin123`

### 📱 Links de Acesso

- **Área do Cliente**: [Agendar Serviço](https://seu-projeto.vercel.app)
- **Painel Admin**: [Login Administrativo](https://seu-projeto.vercel.app/admin/login)

---

## ✨ Funcionalidades

### 🎨 Interface do Cliente

- ✅ **Formulário Inteligente**: Validação em tempo real com feedback visual
- ✅ **Calendário Visual**: Visualização intuitiva de horários disponíveis/ocupados
- ✅ **Múltiplos Serviços**: Corte, Barba, Manicure, Pedicure, Tratamentos
- ✅ **Validação de Telefone**: Formatação automática (XX) XXXXX-XXXX
- ✅ **Prevenção de Erros**: Bloqueio de datas passadas e double booking
- ✅ **Confirmação Visual**: Comprovativo de agendamento com detalhes
- ✅ **Design Responsivo**: Experiência otimizada para mobile, tablet e desktop

### 📊 Painel Administrativo

- ✅ **Dashboard Estatístico**: Métricas em tempo real (total, concluídos, cancelados, taxa de conclusão)
- ✅ **Visão de Calendário**: Agenda visual do dia com cards detalhados
- ✅ **Visão de Lista**: Tabela completa com todos os agendamentos
- ✅ **Filtros Avançados**: Por data, status e tipo de serviço
- ✅ **Gestão de Status**: Agendado, Confirmado, Concluído, Cancelado
- ✅ **Histórico de Alterações**: Rastreamento completo de mudanças de status
- ✅ **Seletor de Data**: Visualização de agenda de qualquer dia específico
- ✅ **Exclusão Segura**: Confirmação antes de remover agendamentos

### 🔧 Funcionalidades Técnicas

- ✅ **Autenticação JWT**: Sistema seguro de autenticação stateless
- ✅ **Retry Automático**: Reconexão automática em caso de falhas
- ✅ **Keep-Alive Inteligente**: Sistema de manutenção de conexão ativa
- ✅ **Health Checks**: Monitoramento contínuo da saúde do sistema
- ✅ **Logging Detalhado**: Logs estruturados para diagnóstico fácil
- ✅ **Timeouts Otimizados**: Configuração de timeouts para ambientes cloud

---

## 🛠️ Tecnologias Utilizadas

### Backend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Node.js** | v20.10.0 | Runtime JavaScript |
| **Express** | v4.18.2 | Framework web minimalista |
| **MongoDB** | Atlas | Banco de dados NoSQL |
| **Mongoose** | v8.0.0 | ODM para MongoDB |
| **JWT** | v9.0.2 | Autenticação via tokens |
| **bcryptjs** | v2.4.3 | Hash de senhas |
| **cors** | v2.8.5 | Cross-Origin Resource Sharing |
| **dotenv** | v16.3.1 | Gestão de variáveis de ambiente |

### Frontend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **React** | v18.2.0 | Biblioteca JavaScript para interfaces |
| **Vite** | v5.0.0 | Build tool ultrarrápido |
| **React Router DOM** | v6.20.0 | Roteamento client-side |
| **Axios** | v1.6.2 | Cliente HTTP com interceptors |

### Infraestrutura

| Serviço | Descrição |
|---------|-----------|
| **Vercel** | Hospedagem do frontend (CDN global) |
| **Render** | Hospedagem do backend (Node.js) |
| **MongoDB Atlas** | Banco de dados gerenciado |
| **UptimeRobot** | Monitoramento de disponibilidade |

---

## 🤖 Desenvolvimento Assistido por IA

Durante o desenvolvimento deste projeto, foram utilizadas ferramentas de Inteligência Artificial para otimizar o processo de desenvolvimento:

### 🎯 Ferramentas Utilizadas

- **Devin AI**: Assistente de desenvolvimento para código e arquitetura
- **GitHub Copilot**: Sugestões de código e autocompletar
- **ChatGPT**: Consultas técnicas e resolução de problemas

### 📋 Aplicações da IA

**Estruturação e Arquitetura:**
- Geração da estrutura inicial de pastas e arquivos
- Organização seguindo melhores práticas de desenvolvimento
- Implementação de padrões arquiteturais (MVC, RESTful)

**Desenvolvimento de Código:**
- Criação de boilerplate e componentes base
- Implementação de funcionalidades complexas
- Otimização de performance e refatoração

**Documentação e Qualidade:**
- Geração de documentação técnica
- Criação de READMEs e guias de instalação
- Comentários explicativos no código

**Debugging e Solução de Problemas:**
- Identificação de bugs e erros de configuração
- Sugestões de correção e otimização
- Análise de logs e troubleshooting

### ⚖️ Abordagem Híbrida

A IA foi utilizada como **ferramenta auxiliar** para acelerar o desenvolvimento, mas:

- ✅ Todo o código foi revisado e validado manualmente
- ✅ Decisões técnicas foram tomadas de forma independente
- ✅ Funcionalidades foram testadas exaustivamente
- ✅ Arquitetura foi projetada para escalar e evoluir

Esta abordagem permitiu **entregar um produto de alta qualidade em tempo reduzido**, mantendo a integridade técnica e profissionalismo esperado em um ambiente de produção.

---

## 🏗️ Arquitetura do Sistema

### Estrutura do Projeto

```
agendamento-servicos/
├── backend/                    # API Node.js + Express
│   ├── src/
│   │   ├── config/           # Configurações (MongoDB, etc)
│   │   ├── controllers/      # Lógica de negócio
│   │   ├── middlewares/      # Middlewares (auth, etc)
│   │   ├── models/           # Modelos de dados (Mongoose)
│   │   ├── routes/           # Rotas da API
│   │   ├── utils/            # Utilitários (keep-alive, etc)
│   │   └── server.js         # Entry point
│   └── package.json
├── frontend/                  # Aplicação React + Vite
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── pages/            # Páginas (Cliente, Admin)
│   │   ├── services/         # Serviços (API, etc)
│   │   ├── styles/           # Estilos globais
│   │   ├── App.jsx           # Componente principal
│   │   └── main.jsx          # Entry point
│   └── package.json
└── README.md
```

### Fluxo de Arquitetura

```
┌─────────────┐
│   Cliente   │
│  (React)    │
└──────┬──────┘
       │ HTTP/HTTPS
       ↓
┌─────────────┐
│   Vercel    │ ← CDN Global
│  (Frontend) │
└──────┬──────┘
       │ API Calls
       ↓
┌─────────────┐
│   Render    │ ← Backend Node.js
│  (Backend)  │
└──────┬──────┘
       │ Mongoose
       ↓
┌─────────────┐
│  MongoDB    │ ← Banco de Dados
│   Atlas     │
└─────────────┘
```

### Padrões Arquiteturais

- **MVC (Model-View-Controller)**: Separação clara de responsabilidades
- **RESTful API**: Interface seguindo princípios REST
- **JWT Authentication**: Autenticação stateless e escalável
- **Component-Based UI**: Arquitetura de componentes no frontend
- **Middleware Pattern**: Chain de responsabilidade para processamento de requests

---

## 📊 Decisões Técnicas

### Por que Node.js + Express?

- **Performance**: Event-loop ideal para I/O operations
- **JavaScript Full-Stack**: Mesma linguagem frontend/backend
- **Ecossistema Mature**: npm com vasta biblioteca de pacotes
- **Escalabilidade**: Arquitetura não-bloqueante para alta concorrência

### Por que MongoDB?

- **Flexibilidade**: Schema flexível para evolução do projeto
- **Performance**: Excelente para operações de leitura/escrita
- **Escalabilidade Horizontal**: Sharding e replicação nativos
- **JSON Nativo**: Trabalha naturalmente com APIs REST

### Por que React + Vite?

- **Componentização**: Reutilização e manutenção facilitada
- **Virtual DOM**: Atualizações eficientes da UI
- **Vite**: HMR instantâneo e build ultrarrápido
- **Ecossistema**: Vasta biblioteca de componentes e hooks

### Estratégia de Deploy

- **Frontend (Vercel)**: CDN global, edge caching, zero cold start
- **Backend (Render)**: Auto-scaling, SSL automático, health checks
- **MongoDB Atlas**: Backup automático, escalabilidade, monitoramento
- **Monitoramento**: UptimeRobot para garantia de disponibilidade

---

## 🧪 Testes e Validação

### Testes Realizados

O sistema foi submetido a testes abrangentes:

1. **✅ Conexão com Banco de Dados**: Validação de conexão MongoDB
2. **✅ Fluxo de Agendamento**: Teste completo de criação de agendamentos
3. **✅ Prevenção de Double Booking**: Verificação de conflitos de horário
4. **✅ Verificação de Disponibilidade**: Validação de horários livres/ocupados
5. **✅ Gestão de Status**: Teste de alteração de status de agendamentos
6. **✅ Cancelamento**: Confirmação de liberação de horários
7. **✅ Autenticação**: Teste de login e proteção de rotas
8. **✅ Responsividade**: Teste em diferentes dispositivos e tamanhos de tela

### Resultado

**✅ Todos os testes passaram com sucesso**

Para mais detalhes, consulte [RELATORIO_TESTES.md](./RELATORIO_TESTES.md)

---

## 🚀 Deploy em Produção

### Infraestrutura Atual

- **Frontend**: Vercel (sempre online, CDN global)
- **Backend**: Render (com keep-alive automático)
- **Banco de Dados**: MongoDB Atlas (cluster M0 gratuito)
- **Monitoramento**: UptimeRobot (health checks a cada 5 minutos)

### Configurações de Alta Disponibilidade

- **Keep-Alive Inteligente**: Sistema que mantém backend ativo
- **Retry Automático**: Reconexão automática em falhas de conexão
- **Health Checks**: Monitoramento contínuo da saúde do sistema
- **Timeouts Otimizados**: Configuração para ambientes cloud
- **Logging Estruturado**: Logs detalhados para diagnóstico

### Documentação de Deploy

- [Instruções Completas de Deploy](./DEPLOY_INSTRUCTIONS.md)
- [Deploy no Vercel](./DEPLOY_VERCEL.md)
- [Guia de Monitoramento](./MONITORAMENTO.md)
- [Troubleshooting de Conexão](./TROUBLESHOOTING_CONNECTION.md)
- [Troubleshooting MongoDB](./MONGODB_TROUBLESHOOTING.md)

---

## 📖 Como Executar Localmente

### Pré-requisitos

- Node.js (v18 ou superior)
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/RafaelsXavi/Desafio-Agendamento-de-servicos.git
cd Desafio-Agendamento-de-servicos

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais

# Instale as dependências do backend
cd backend
npm install

# Instale as dependências do frontend
cd ../frontend
npm install

# Inicie o backend (em um terminal)
cd backend
npm start

# Inicie o frontend (em outro terminal)
cd frontend
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

---

## 🔗 Links e Recursos

### Documentação

- [README Principal](./README.md)
- [Instruções de Deploy](./DEPLOY_INSTRUCTIONS.md)
- [Deploy Vercel](./DEPLOY_VERCEL.md)
- [Guia de Monitoramento](./MONITORAMENTO.md)
- [Guia de Teste Manual](./TESTE_MANUAL.md)
- [Relatório de Testes](./RELATORIO_TESTES.md)
- [Troubleshooting Conexão](./TROUBLESHOOTING_CONNECTION.md)
- [Troubleshooting MongoDB](./MONGODB_TROUBLESHOOTING.md)

### Repositório

- **GitHub**: [https://github.com/RafaelsXavi/Desafio-Agendamento-de-servicos](https://github.com/RafaelsXavi/Desafio-Agendamento-de-servicos)

### Tecnologias

- [Node.js](https://nodejs.org/)
- [React](https://react.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Vite](https://vitejs.dev/)
- [Vercel](https://vercel.com/)
- [Render](https://render.com/)

---

## 🎯 Funcionalidades Futuras

O sistema foi desenvolvido com arquitetura escalável, permitindo fácil adição de novas funcionalidades:

- [ ] Notificações por email/SMS
- [ ] Integração com calendários externos (Google Calendar)
- [ ] Sistema de avaliações e feedback
- [ ] Multi-serviços e multi-profissionais
- [ ] Relatórios e analytics avançados
- [ ] Sistema de pagamentos integrado
- [ ] App mobile (React Native)
- [ ] Chatbot para suporte

---

## 📝 Licença

Este projeto está sob licença ISC.

---

## 👨‍💻 Desenvolvimento

Desenvolvido como parte de um desafio técnico para demonstrar competências em:

- ✅ Desenvolvimento Full-Stack (Node.js + React)
- ✅ Arquitetura de Software e Design de Sistemas
- ✅ Bancos de Dados NoSQL (MongoDB)
- ✅ Deploy e Infraestrutura Cloud (Vercel + Render)
- ✅ Automação e Monitoramento
- ✅ Uso eficiente de ferramentas de IA no desenvolvimento

---

## 🔧 Troubleshooting

### Problemas Comuns

**MongoDB Connection Error:**
- Verifique se o cluster está rodando no MongoDB Atlas
- Confirme IP whitelist (0.0.0.0/0 para qualquer IP)
- Valide credenciais na connection string

**Backend Timeout:**
- O keep-alive pode precisar "acordar" o backend
- Acesse `/health` para verificar status
- Verifique logs no Render para erros

**Frontend Connection Error:**
- Confirme `VITE_API_URL` no Vercel
- Verifique se backend está online
- Teste endpoint `/health` do backend

Para troubleshooting detalhado, consulte os guias específicos na seção de documentação.

---

<div align="center">

**Desenvolvido com 💪 e tecnologia de ponta**

[⬆ Voltar ao topo](#-sistema-de-agendamento-de-serviços)

</div>