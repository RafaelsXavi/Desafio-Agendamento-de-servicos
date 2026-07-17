# 🚀 Deploy do Frontend no Vercel - Passo a Passo

## 📋 Pré-requisitos

- ✅ Backend funcionando no Render
- ✅ URL do backend disponível
- ✅ Repositório GitHub atualizado
- ✅ Conta no Vercel

---

## 🎯 Passo 1: Obter URL do Backend

### Acessar Render Dashboard
1. Acesse https://dashboard.render.com
2. Selecione o serviço do backend
3. Copie a URL do serviço (ex: `https://agendamento-servicos-backend.onrender.com`)

### Verificar se Backend está Online
```bash
curl https://SUA-URL.onrender.com/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

---

## 🎨 Passo 2: Preparar Frontend no Vercel

### 2.1 Criar Conta no Vercel
1. Acesse https://vercel.com
2. Clique em "Sign Up"
3. Faça login com GitHub

### 2.2 Importar Projeto
1. No dashboard, clique em "Add New Project"
2. Selecione o repositório `Desafio-Agendamento-de-servicos`
3. Clique em "Import"

### 2.3 Configurar Projeto

**Framework Preset:**
- **Framework**: `Vite`
- **Root Directory**: `frontend`

**Environment Variables:**
1. Role até "Environment Variables"
2. Adicione a variável:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://SUA-URL-BACKEND.onrender.com`
   - **Environment**: Production, Preview, Development

**IMPORTANTE**: Substitua `SUA-URL-BACKEND` pela URL real do seu backend no Render.

### 2.4 Deploy
1. Clique em "Deploy"
2. Aguarde o processo de build (aprox. 2-3 minutos)
3. Após conclusão, você receberá uma URL como:
   - `https://desafio-agendamento-de-servicos.vercel.app`

---

## ✅ Passo 3: Verificar Deploy

### 3.1 Acessar Frontend
1. Acesse a URL fornecida pelo Vercel
2. Verifique se a página carrega corretamente
3. Deve ver o formulário de agendamento

### 3.2 Testar Conexão com Backend
1. Tente fazer um agendamento
2. Preencha o formulário
3. Verifique se o agendamento é criado
4. Deve receber mensagem de sucesso

### 3.3 Testar Painel Admin
1. Acesse `/admin/login`
2. Faça login com `admin@test.com` / `admin123`
3. Verifique se o painel carrega
4. Confirme se os agendamentos aparecem

---

## 🔧 Solução de Problemas

### Frontend não conecta ao backend

**Problema**: Erro de conexão com API

**Solução**:
1. Verifique se `VITE_API_URL` está correta no Vercel
2. Acesse o projeto no Vercel Dashboard
3. Vá para "Settings" → "Environment Variables"
4. Confirme a URL do backend
5. Faça redeploy se necessário

### Backend não responde

**Problema**: Backend offline ou com erro

**Solução**:
1. Acesse Render Dashboard
2. Verifique logs do backend
3. Confirme que MongoDB está conectado
4. Verifique se keep-alive está funcionando

### Erro de CORS

**Problema**: Browser bloqueia requisições

**Solução**:
1. Verifique se CORS está configurado no backend
2. Confirme que a URL do frontend está autorizada
3. O código já tem CORS configurado para aceitar qualquer origem

---

## 📊 Configuração de Domínio Customizado (Opcional)

### 1. Adicionar Domínio Próprio
1. Vercel Dashboard → Projeto → Settings → Domains
2. Clique "Add Domain"
3. Digite seu domínio (ex: `agendamento.seusite.com`)

### 2. Configurar DNS
1. Vercel fornecerá registros DNS
2. Adicione no seu provedor de domínio
3. Aguarde propagação (até 24 horas)

---

## 🎯 Pós-Deploy Checklist

- [ ] Frontend acessível via URL do Vercel
- [ ] Conexão com backend funcionando
- [ ] Agendamento de cliente funcionando
- [ ] Painel admin funcionando
- [ ] Calendário visual funcionando
- [ ] Sistema responsivo em mobile
- [ ] Sem erros no console do browser
- [ ] Logs do Vercel sem erros críticos

---

## 🔄 Atualizações Futuras

### Como Atualizar o Sistema
1. Faça alterações no código local
2. Commit e push para GitHub
3. Vercel fará deploy automático
4. Render precisará de deploy manual (ou configure webhook)

### Deploy Automático no Render
1. Render Dashboard → Serviço → Settings
2. Configure "Auto Deploy" para branch main
3. Cada push no GitHub triggers deploy

---

## 📱 Monitoramento

### Vercel Dashboard
- Acesse https://vercel.com/dashboard
- Monitore performance, erros, tráfego
- Configure alertas se necessário

### Render Dashboard
- Acesse https://dashboard.render.com
- Monitore backend, logs, métricas
- Verifique uptime do serviço

---

## 🎉 Conclusão

Após seguir estes passos, você terá:

- ✅ **Frontend online** (Vercel - sempre ativo)
- ✅ **Backend online** (Render - com keep-alive)
- ✅ **Sistema completo** (integração funcionando)
- ✅ **Pronto para avaliação** (100% funcional)

**URLs Finais:**
- Frontend: `https://seu-projeto.vercel.app`
- Backend: `https://seu-backend.onrender.com`
- Health Check: `https://seu-backend.onrender.com/health`

**Boa sorte no processo seletivo!** 🚀