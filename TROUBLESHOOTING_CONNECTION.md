# 🔧 Troubleshooting - Problemas de Conexão Frontend-Backend

## 🚨 Problema Identificado

**Sintomas:**
- Frontend carrega mas calendário mostra todos horários como ocupados
- Erro 404 ao acessar outras páginas
- Backend responde ao health check mas retorna erro 500 em endpoints de API

**Causa Provável:**
- Backend está com problemas no endpoint `/api/appointments/available/:date`
- Possível problema de conexão com MongoDB ou formato de data
- Timeout devido a spin-down do Render

---

## ✅ Soluções Implementadas

### 1. **Aumentar Timeout do Frontend**
- Timeout aumentado de 15s para 30s no serviço de API
- Isso permite mais tempo para o backend "acordar" do spin-down

### 2. **Melhorar Logging do Backend**
- Adicionado logging detalhado no endpoint `getAvailableSlots`
- Isso ajudará a identificar o problema exato nos logs do Render

### 3. **Fallback no Frontend**
- Adicionado fallback no calendário: se falhar ao buscar disponibilidade, mostra todos os horários como disponíveis
- Usuário pode tentar agendar mesmo com erro de conexão

### 4. **Corrigir Roteamento no Vercel**
- Simplificado `vercel.json` para usar `rewrites` em vez de `routes`
- Isso deve corrigir os erros 404

---

## 🔍 Diagnóstico Passo a Passo

### Passo 1: Verificar Logs do Render

1. Acesse o painel do Render
2. Vá para o serviço "agendamento-servicos-backend"
3. Clique em "Logs"
4. Procure por mensagens de erro, especialmente:
   - `[getAvailableSlots] Erro:`
   - Erros de conexão MongoDB
   - Erros de timeout

### Passo 2: Testar Backend Diretamente

Use o script de teste incluído:
```bash
cd frontend
node test-connection.js
```

Isso testará:
- Health check
- Endpoint de disponibilidade
- Criação de agendamento

### Passo 3: Verificar Variáveis de Ambiente

No Render, verifique se as variáveis estão configuradas:
- `MONGODB_URI` - Connection string do MongoDB Atlas
- `JWT_SECRET` - Chave secreta para JWT
- `PORT` - Deve ser 10000
- `NODE_ENV` - Deve ser production
- `RENDER_EXTERNAL_URL` - URL do backend no Render

### Passo 4: Verificar MongoDB Atlas

1. Acesse o painel do MongoDB Atlas
2. Verifique se o cluster está rodando
3. Verifique Network Access (IP whitelist)
4. Teste a connection string localmente

---

## 🛠️ Soluções Específicas

### Solução 1: MongoDB Connection Error

Se os logs mostrarem erro de conexão MongoDB:

**Opção A: Verificar IP Whitelist**
1. No MongoDB Atlas, vá para "Network Access"
2. Adicione `0.0.0.0/0` para permitir qualquer IP (temporário)
3. Ou adicione o IP do Render

**Opção B: Verificar Connection String**
- Certifique-se que a connection string está correta
- Verifique se usuário e senha estão corretos
- Teste a connection string localmente

### Solução 2: Backend Timeout

Se o backend estiver demorando muito para responder:

**Opção A: Wake up o Backend**
1. Acesse `https://seu-backend.onrender.com/health` no navegador
2. Espere alguns segundos
3. Tente usar o frontend novamente

**Opção B: Configurar UptimeRobot**
1. Configure UptimeRobot para pingar a cada 3 minutos
2. Isso manterá o backend ativo

### Solução 3: Formato de Data

Se houver erro de formato de data:

**Opção A: Verificar Formato**
- O frontend deve enviar datas no formato `YYYY-MM-DD`
- Verifique o console do navegador para erros

**Opção B: Adicionar Debugging**
- Os logs do backend agora mostram o formato da data recebida
- Verifique os logs para identificar problemas

---

## 📋 Ações Imediatas Necessárias

### 1. **Fazer Deploy das Alterações**

```bash
git add .
git commit -m "Corrigir problemas de conexão e aumentar timeout"
git push origin main
```

### 2. **Verificar Variáveis de Ambiente no Render**

Certifique-se que `RENDER_EXTERNAL_URL` está configurada:
```env
RENDER_EXTERNAL_URL=https://agendamento-servicos-backend.onrender.com
```

### 3. **Verificar Variáveis de Ambiente no Vercel**

Certifique-se que `VITE_API_URL` está configurada:
```env
VITE_API_URL=https://agendamento-servicos-backend.onrender.com
```

### 4. **Monitorar Logs do Render**

Após o deploy:
1. Vá para "Logs" no Render
2. Procure por mensagens do keep-alive
3. Procure por erros no endpoint `getAvailableSlots`
4. Anote qualquer erro para diagnóstico

---

## 🧪 Testes Após Correção

### Teste 1: Health Check
Acesse: `https://agendamento-servicos-backend.onrender.com/health`
Deve retornar: `{"status":"ok",...}`

### Teste 2: Endpoint de Disponibilidade
Acesse: `https://agendamento-servicos-backend.onrender.com/api/appointments/available/2024-01-15`
Deve retornar lista de horários disponíveis

### Teste 3: Frontend
1. Acesse o frontend no Vercel
2. Selecione uma data
3. Verifique se o calendário mostra horários disponíveis
4. Tente fazer um agendamento

### Teste 4: Painel Admin
1. Acesse `/admin/login`
2. Faça login com `admin@test.com` / `admin123`
3. Verifique se o dashboard carrega

---

## 🆘 Se Nada Funcionar

### Opção 1: Reiniciar o Backend
1. No Render, vá para o serviço
2. Clique em "Manual Deploy"
3. Selecione "Deploy latest commit"
4. Isso reiniciará o servidor

### Opção 2: Verificar MongoDB
1. Acesse MongoDB Atlas
2. Verifique se o cluster está rodando
3. Verifique se há conexões ativas
4. Considere reiniciar o cluster

### Opção 3: Modo Desenvolvimento
Para testes locais:
1. Clone o repositório
2. Configure `.env` local
3. Rode backend localmente
4. Rode frontend localmente
5. Teste a funcionalidade

---

## 📞 Recursos de Ajuda

- **Documentação Render**: https://render.com/docs
- **Documentação Vercel**: https://vercel.com/docs
- **Documentação MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Logs do Render**: Dashboard > Logs
- **Logs do Vercel**: Dashboard > Logs

---

## 🎯 Checklist de Resolução

- [ ] Deploy das alterações feito
- [ ] Variáveis de ambiente verificadas no Render
- [ ] Variáveis de ambiente verificadas no Vercel
- [ ] Logs do Render verificados
- [ ] Health check testado
- [ ] Endpoint de disponibilidade testado
- [ ] Frontend testado
- [ ] Painel admin testado
- [ ] UptimeRobot configurado (recomendado)

---

## 📝 Notas Importantes

1. **Spin-down do Render**: O backend pode demorar para responder após inatividade
2. **MongoDB Free Tier**: Pode ter limitações de conexões
3. **Timeout**: 30 segundos deve ser suficiente para a maioria dos casos
4. **Fallback**: O frontend agora tem fallback para erros de conexão
5. **Logging**: Logs detalhados ajudam no diagnóstico

---

Se após seguir todos os passos o problema persistir, verifique os logs do Render e MongoDB Atlas para erros específicos que possam indicar o problema raiz.