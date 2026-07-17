# 🚀 Instruções de Deploy - Vercel + Render

## 📋 Visão Geral

Este guia fornece instruções passo a passo para fazer o deploy do Sistema de Agendamento de Serviços utilizando:
- **Vercel** para o frontend React (sempre online)
- **Render** para o backend Node.js (com keep-alive para evitar spin-down)
- **MongoDB Atlas** para o banco de dados (já configurado)

---

## 🎯 Estratégia de Deploy

### Por que esta combinação?
- ✅ **Frontend sempre online** (Vercel nunca faz spin-down)
- ✅ **Backend otimizado** (Render com keep-alive automático)
- ✅ **Custo zero** (ambos têm planos gratuitos)
- ✅ **Performance profissional** (CDN global do Vercel)
- ✅ **MongoDB Atlas já configurado** (sem mudanças necessárias)

---

## 📝 Passo 1: Preparar Repositório

### 1.1 Verificar arquivos de configuração
Certifique-se de que os seguintes arquivos estão no repositório:

**Frontend:**
- `frontend/vercel.json` - Configuração do Vercel
- `frontend/.env.production` - Variáveis de ambiente de produção

**Backend:**
- `backend/render.yaml` - Configuração do Render
- `backend/.env.production` - Exemplo de variáveis de ambiente
- `backend/src/utils/keepAlive.js` - Sistema de keep-alive

### 1.2 Commit e push das alterações
```bash
git add .
git commit -m "Adicionar configurações de deploy (Vercel + Render)"
git push origin main
```

---

## 🖥️ Passo 2: Deploy do Backend no Render

### 2.1 Criar conta no Render
1. Acesse https://render.com
2. Clique em "Sign Up"
3. Faça login com sua conta GitHub

### 2.2 Criar novo Web Service
1. No dashboard do Render, clique em "New +"
2. Selecione "Web Service"
3. Conecte seu repositório GitHub
4. Selecione o repositório `Desafio-Agendamento-de-servicos`

### 2.3 Configurar o Web Service

**Basic Settings:**
- **Name**: `agendamento-servicos-backend`
- **Region**: Selecione a região mais próxima (ex: Oregon)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Advanced Settings:**
- **Instance Type**: `Free`
- **Environment**: `Node`

### 2.4 Configurar Variáveis de Ambiente

No Render, adicione as seguintes variáveis de ambiente:

1. Clique em "Environment" na configuração do serviço
2. Adicione as variáveis:

```env
MONGODB_URI=mongodb+srv://rafaelx:081327sr@cluster0.ksktc7n.mongodb.net/agendamento-servicos?appName=Cluster0
JWT_SECRET=081327sr
PORT=10000
```

**IMPORTANTE**: Substitua `MONGODB_URI` e `JWT_SECRET` pelos seus valores reais do arquivo `.env` local.

### 2.5 Deploy
1. Clique em "Create Web Service"
2. Aguarde o processo de build e deploy
3. Após a conclusão, você receberá uma URL como:
   - `https://agendamento-servicos-backend.onrender.com`

### 2.6 Verificar Health Check
Acesse `https://sua-url.onrender.com/health` - deve retornar:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

---

## 🎨 Passo 3: Deploy do Frontend no Vercel

### 3.1 Criar conta no Vercel
1. Acesse https://vercel.com
2. Clique em "Sign Up"
3. Faça login com sua conta GitHub

### 3.2 Importar Projeto
1. No dashboard do Vercel, clique em "Add New Project"
2. Selecione o repositório `Desafio-Agendamento-de-servicos`
3. Clique em "Import"

### 3.3 Configurar o Projeto

**Framework Preset:**
- **Framework**: `Vite`
- **Root Directory**: `frontend`

**Environment Variables:**
Adicione a variável:
```env
VITE_API_URL=https://agendamento-servicos-backend.onrender.com
```

**Substitua pela URL real do seu backend no Render.**

### 3.4 Deploy
1. Clique em "Deploy"
2. Aguarde o processo de build
3. Após a conclusão, você receberá uma URL como:
   - `https://seu-projet.vercel.app`

### 3.5 Verificar Deploy
Acesse a URL fornecida pelo Vercel e verifique:
- ✅ Página carrega corretamente
- ✅ Formulário de agendamento funciona
- ✅ Conexão com backend está funcionando

---

## 🔄 Passo 4: Configurar Monitoramento (UptimeRobot)

### 4.1 Criar conta no UptimeRobot
1. Acesse https://uptimerobot.com
2. Crie uma conta gratuita
3. Faça login

### 4.2 Adicionar Monitor
1. Clique em "Add New Monitor"
2. Configure:
   - **Monitor Type**: `HTTP(s)`
   - **Friendly Name**: `Agendamento Backend Health`
   - **URL**: `https://seu-backend.onrender.com/health`
   - **Monitoring Interval**: `5 minutes`
   - **Alert Contacts**: Adicione seu email

### 4.3 Salvar e Ativar
1. Clique em "Create Monitor"
2. O UptimeRobot fará ping a cada 5 minutos
3. Isso mantém o backend ativo no Render

---

## 🧪 Passo 5: Testar Integração Completa

### 5.1 Testar Frontend
1. Acesse a URL do Vercel
2. Tente fazer um agendamento
3. Verifique se o agendamento é criado

### 5.2 Testar Backend
1. Acesse `/health` do backend
2. Verifique logs no Render
3. Confirme que keep-alive está funcionando

### 5.3 Testar Painel Admin
1. Acesse `/admin/login`
2. Faça login com `admin@test.com` / `admin123`
3. Verifique se os agendamentos aparecem

---

## 📊 Passo 6: Monitorar e Manter

### Monitoramento Contínuo
- **Vercel Dashboard**: Monitore erros e performance do frontend
- **Render Dashboard**: Monitore logs e métricas do backend
- **UptimeRobot**: Verifique uptime do backend
- **MongoDB Atlas**: Monitore uso do banco de dados

### Manutenção
- **Keep-alive**: O sistema de keep-alive mantém o backend ativo
- **Logs**: Verifique logs regularmente para detectar problemas
- **Atualizações**: Para atualizar, basta fazer push para o GitHub

---

## 🔧 Solução de Problemas

### Backend não responde
1. Verifique logs no Render Dashboard
2. Confirme variáveis de ambiente estão corretas
3. Verifique conexão MongoDB Atlas
4. Confirme que UptimeRobot está fazendo ping

### Frontend não conecta ao backend
1. Verifique `VITE_API_URL` no Vercel
2. Confirme CORS está configurado corretamente
3. Verifique se backend está online
4. Teste endpoint `/health` do backend

### MongoDB connection error
1. Verifique IP whitelist no MongoDB Atlas
2. Confirme connection string está correta
3. Verifique se cluster está rodando
4. Confirme credenciais estão corretas

---

## 📝 Checklist de Deploy

- [ ] Repositório atualizado com arquivos de configuração
- [ ] Backend deployado no Render
- [ ] Variáveis de ambiente configuradas no Render
- [ ] Health check funcionando
- [ ] Frontend deployado no Vercel
- [ ] VITE_API_URL configurado no Vercel
- [ ] UptimeRobot configurado
- [ ] Teste de agendamento funcionando
- [ ] Painel admin funcionando
- [ ] Monitoramento ativo

---

## 🎉 Conclusão

Após seguir estes passos, seu sistema estará:
- ✅ **Online 24/7** (frontend Vercel + keep-alive backend)
- ✅ **Monitorado** (UptimeRobot + dashboards)
- ✅ **Pronto para avaliação** (totalmente funcional)
- ✅ **Custo zero** (todos os serviços gratuitos)

**URLs Finais:**
- Frontend: `https://seu-projeto.vercel.app`
- Backend: `https://seu-backend.onrender.com`
- Health Check: `https://seu-backend.onrender.com/health`

**Boa sorte no processo seletivo!** 🚀