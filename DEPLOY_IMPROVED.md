# 🚀 Deploy Melhorado - Keep-Alive Robusto

## 📋 Visão Geral das Melhorias

Este guia descreve as melhorias implementadas no sistema de deploy para garantir que o backend fique online 24/7 e que o painel admin possa ser testado sem problemas.

### Melhorias Implementadas

1. **Keep-Alive Robusto (Backend)**
   - Intervalo reduzido de 10 para 5 minutos
   - Sistema de retry automático (até 3 tentativas)
   - Timeout de 10 segundos para requests
   - Logging detalhado para debug
   - Contador de falhas consecutivas

2. **Configuração Render Aprimorada**
   - Adicionada variável `RENDER_EXTERNAL_URL`
   - Auto-deploy desativado (evita deploys desnecessários)
   - Health check configurado corretamente

3. **Serviço de API com Retry (Frontend)**
   - Timeout de 15 segundos
   - Retry automático em caso de falha de rede
   - Até 3 tentativas com delay progressivo
   - Função `checkApiHealth()` para verificar status

4. **Indicador de Conexão (Frontend)**
   - Componente `ConnectionStatus` para mostrar status da conexão
   - Verificação automática a cada 30 segundos
   - Alerta visual quando servidor está offline

---

## 🔧 Configuração do Backend (Render)

### 1. Atualizar Variáveis de Ambiente no Render

No painel do Render, adicione/atualize as seguintes variáveis de ambiente:

```env
MONGODB_URI=mongodb+srv://seu-usuario:sua-senha@cluster0.xxx.mongodb.net/agendamento-servicos
JWT_SECRET=sua-chave-secreta
PORT=10000
NODE_ENV=production
RENDER_EXTERNAL_URL=https://agendamento-servicos-backend.onrender.com
```

**IMPORTANTE:**
- Substitua `MONGODB_URI` e `JWT_SECRET` pelos seus valores reais
- `RENDER_EXTERNAL_URL` deve ser a URL exata do seu serviço no Render

### 2. Fazer Deploy das Alterações

```bash
git add .
git commit -m "Melhorar keep-alive e confiabilidade do backend"
git push origin main
```

O Render fará deploy automático com as novas configurações.

### 3. Verificar Logs no Render

Após o deploy, verifique os logs no painel do Render:
- Deve ver: "Keep-alive ativado: modo de produção"
- Deve ver pings a cada 5 minutos
- Deve ver "Keep-alive success: 200" para cada ping

---

## 🎨 Configuração do Frontend (Vercel)

### 1. Atualizar Variáveis de Ambiente no Vercel

No painel do Vercel, certifique-se de que a variável `VITE_API_URL` está configurada:

```env
VITE_API_URL=https://agendamento-servicos-backend.onrender.com
```

### 2. Fazer Deploy das Alterações

```bash
git add .
git commit -m "Adicionar indicador de conexão e retry automático"
git push origin main
```

O Vercel fará deploy automático.

---

## 📊 Configuração do Monitoramento (UptimeRobot)

### 1. Criar Conta no UptimeRobot

1. Acesse https://uptimerobot.com
2. Crie uma conta gratuita
3. Faça login

### 2. Adicionar Monitor para o Backend

1. Clique em "Add New Monitor"
2. Configure da seguinte forma:

   **Monitor Type:** HTTP(s)
   
   **Friendly Name:** Agendamento Backend Health
   
   **URL:** `https://agendamento-servicos-backend.onrender.com/health`
   
   **Monitoring Interval:** 5 minutos (ou 3 minutos para mais segurança)
   
   **Alert Contacts:** Adicione seu email

3. Clique em "Create Monitor"

### 3. Adicionar Monitor para o Frontend (Opcional)

1. Clique em "Add New Monitor" novamente
2. Configure:

   **Monitor Type:** HTTP(s)
   
   **Friendly Name:** Agendamento Frontend
   
   **URL:** `https://seu-projeto.vercel.app`
   
   **Monitoring Interval:** 5 minutos
   
   **Alert Contacts:** Adicione seu email

---

## 🧪 Testar o Sistema

### 1. Verificar Health Check do Backend

Acesse no navegador:
```
https://agendamento-servicos-backend.onrender.com/health
```

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

### 2. Verificar Logs do Backend

No painel do Render:
1. Vá para "Logs"
2. Deve ver mensagens do keep-alive a cada 5 minutos
3. Deve ver "Keep-alive success: 200" para cada ping

### 3. Testar Painel Admin

1. Acesse: `https://seu-projeto.vercel.app/admin/login`
2. Faça login com: `admin@test.com` / `admin123`
3. Deve conseguir acessar o dashboard

### 4. Testar Indicador de Conexão

1. Acesse qualquer página do frontend
2. Se o backend estiver online, não deve aparecer nenhum alerta
3. Se o backend estiver offline, deve aparecer um alerta vermelho no topo

---

## 🔍 Troubleshooting

### Backend continua ficando offline

**Solução 1: Verificar se keep-alive está ativo**
- Verifique logs no Render
- Deve ver "Keep-alive ativado: modo de produção"
- Se não verificar, verifique se `NODE_ENV=production`

**Solução 2: Verificar URL externa**
- Certifique-se que `RENDER_EXTERNAL_URL` está configurada
- Deve ser a URL exata do serviço no Render

**Solução 3: Reduzir intervalo do keep-alive**
- Edite `backend/src/utils/keepAlive.js`
- Reduza `interval` para 3 minutos (180000 ms)

**Solução 4: Verificar UptimeRobot**
- Certifique-se que o monitor está ativo
- Verifique se está fazendo ping com sucesso
- Configure intervalo menor (3 minutos)

### Frontend não conecta ao backend

**Solução 1: Verificar VITE_API_URL**
- No Vercel, verifique se a variável está configurada
- Deve ser a URL exata do backend no Render

**Solução 2: Verificar CORS**
- O backend já está configurado com CORS
- Verifique logs no Render para erros de CORS

**Solução 3: Verificar health check**
- Acesse `/health` do backend diretamente
- Se não funcionar, o problema é no backend

### Erro de conexão no frontend

**Solução 1: Verificar indicador de conexão**
- Deve aparecer alerta vermelho se backend estiver offline
- Se não aparecer, pode ser erro no componente

**Solução 2: Verificar console do navegador**
- Abra DevTools (F12)
- Verifique Console para erros de API
- Verifique Network para requests falhando

**Solução 3: Limpar cache**
- Limpe cache do navegador
- Tente em modo anônimo

---

## 📈 Monitoramento Contínuo

### Dashboard UptimeRobot

1. Acesse https://uptimerobot.com
2. Verifique "Uptime" dos monitores
3. Deve estar próximo de 100%
4. Configure alertas por email

### Logs do Render

1. Acesse painel do Render
2. Vá para "Logs"
3. Verifique mensagens do keep-alive
4. Deve ver pings sucessivos com sucesso

### Logs do Vercel

1. Acesse painel do Vercel
2. Vá para "Logs"
3. Verifique erros de conexão
4. Deve ver requests ao backend com sucesso

---

## 🎯 Checklist de Deploy Melhorado

- [ ] Keep-alive melhorado implementado
- [ ] render.yaml atualizado com RENDER_EXTERNAL_URL
- [ ] Serviço de API com retry implementado
- [ ] Componente ConnectionStatus adicionado
- [ ] Variáveis de ambiente atualizadas no Render
- [ ] Variáveis de ambiente atualizadas no Vercel
- [ ] Deploy feito no Render
- [ ] Deploy feito no Vercel
- [ ] Health check testado manualmente
- [ ] Logs do keep-alive verificados
- [ ] UptimeRobot configurado
- [ ] Painel admin testado com sucesso
- [ ] Indicador de conexão testado

---

## 🎉 Próximos Passos

Após concluir este deploy melhorado, o sistema deve:

✅ **Backend online 24/7** (keep-alive + UptimeRobot)
✅ **Painel admin acessível** (sem problemas de spin-down)
✅ **Retry automático** (mais resiliência a falhas)
✅ **Monitoramento ativo** (alertas em caso de problemas)
✅ **Feedback visual** (usuário sabe quando está offline)

Agora você pode testar o painel admin sem problemas e o sistema estará pronto para avaliação!

**URLs Importantes:**
- Frontend: `https://seu-projeto.vercel.app`
- Backend: `https://agendamento-servicos-backend.onrender.com`
- Health Check: `https://agendamento-servicos-backend.onrender.com/health`
- Admin Login: `https://seu-projeto.vercel.app/admin/login`
- Credenciais: `admin@test.com` / `admin123`