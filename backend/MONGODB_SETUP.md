# Guia de Configuração do MongoDB

Este guia ajuda você a configurar o MongoDB para o sistema de agendamento.

## Opção 1: MongoDB Atlas (Recomendado para Produção)

MongoDB Atlas é a versão gratuita na nuvem do MongoDB, ideal para produção.

### Passos:

1. **Criar conta no MongoDB Atlas**
   - Acesse: https://www.mongodb.com/cloud/atlas
   - Clique em "Try Free"
   - Crie uma conta ou faça login

2. **Criar um Cluster Gratuito**
   - Após login, clique em "Build a Database"
   - Selecione "M0 Sandbox" (gratuito)
   - Escolha uma região (ex: São Paulo)
   - Nomeie o cluster (ex: "agendamento-servicos")
   - Clique em "Create"

3. **Configurar Acesso**
   - Na aba "Database Access", clique em "Add New Database User"
   - Username: Escolha um nome (ex: "admin")
   - Password: Crie uma senha forte
   - Selecione "Read and write to any database"
   - Clique em "Add User"

4. **Configurar whitelist de IP**
   - Na aba "Network Access", clique em "Add IP Address"
   - Selecione "Allow Access from Anywhere" (0.0.0.0/0)
   - Clique em "Confirm"

5. **Obter Connection String**
   - Vá para a aba "Database"
   - Clique em "Connect" no seu cluster
   - Selecione "Connect your application"
   - Escolha "Node.js" e versão "4.1 or later"
   - Copie a connection string

6. **Configurar no projeto**
   - Crie um arquivo `.env` na pasta `backend`
   - Cole a connection string substituindo `<password>` pela sua senha
   - Exemplo:
     ```
     MONGODB_URI=mongodb+srv://admin:SUA_SENHA@cluster0.mongodb.net/agendamento-servicos?retryWrites=true&w=majority
     ```

## Opção 2: MongoDB Local (Para Desenvolvimento)

Se preferir rodar o MongoDB localmente:

### Windows:

1. **Baixar MongoDB**
   - Acesse: https://www.mongodb.com/try/download/community
   - Baixe a versão para Windows
   - Execute o instalador

2. **Instalar MongoDB**
   - Siga o assistente de instalação
   - Marque "Install MongoDB as a Service"
   - Marque "Install MongoDB Compass" (interface gráfica opcional)

3. **Verificar instalação**
   - Abra o terminal e execute: `mongod --version`
   - O serviço deve estar rodando automaticamente

4. **Configurar no projeto**
   - Crie um arquivo `.env` na pasta `backend`
   - Adicione:
     ```
     MONGODB_URI=mongodb://localhost:27017/agendamento-servicos
     ```

### macOS:

1. **Usar Homebrew**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

2. **Iniciar MongoDB**
   ```bash
   brew services start mongodb-community
   ```

3. **Configurar no projeto**
   - Crie um arquivo `.env` na pasta `backend`
   - Adicione:
     ```
     MONGODB_URI=mongodb://localhost:27017/agendamento-servicos
     ```

### Linux:

1. **Instalar MongoDB**
   ```bash
   sudo apt-get install mongodb
   ```

2. **Iniciar MongoDB**
   ```bash
   sudo systemctl start mongodb
   sudo systemctl enable mongodb
   ```

3. **Configurar no projeto**
   - Crie um arquivo `.env` na pasta `backend`
   - Adicione:
     ```
     MONGODB_URI=mongodb://localhost:27017/agendamento-servicos
     ```

## Configuração Final

Após configurar o MongoDB:

1. **Criar arquivo .env**
   - Copie o arquivo `.env.example`
   - Renomeie para `.env`
   - Preencha com suas configurações

2. **Variáveis de ambiente necessárias**
   ```env
   MONGODB_URI=sua_connection_string_aqui
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=sua_chave_secreta_aqui
   ```

3. **Reiniciar o backend**
   ```bash
   # Pare o servidor atual (Ctrl+C)
   # Inicie novamente
   npm start
   ```

4. **Verificar conexão**
   - Você deve ver: `✅ MongoDB Connected: ...`
   - O sistema estará pronto para uso

## Solução de Problemas

### Erro: "Authentication failed"
- Verifique se a senha no `.env` está correta
- Certifique-se de que o usuário tem permissões adequadas

### Erro: "querySrv ENOTFOUND"
- Verifique sua conexão com a internet
- Confirme se o cluster no MongoDB Atlas está ativo

### Erro: "IP not whitelisted"
- No MongoDB Atlas, adicione seu IP à whitelist
- Ou use "Allow Access from Anywhere" (0.0.0.0/0)

### Erro: "Connection timeout"
- Verifique se o firewall não está bloqueando a conexão
- Aumente o timeout no arquivo `database.js`

## Próximos Passos

Após configurar o MongoDB:

1. Teste o sistema de agendamento
2. Verifique se os dados estão sendo salvos
3. Acesse o MongoDB Compass para visualizar os dados
4. Configure o backup automático (se usando Atlas)

## Segurança

⚠️ **Importante:**
- Nunca commit o arquivo `.env` no git
- Use senhas fortes
- Em produção, use variáveis de ambiente do serviço de hospedagem
- Limite o acesso ao IP específico quando possível