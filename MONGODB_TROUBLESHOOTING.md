# 🔧 MongoDB Connection Troubleshooting

## 🚨 Problema Atual

Baseado nos logs do Render:
```
Keep-alive success: 200 - {"status":"degraded","mongodb":{"state":"disconnected","readyState":0}}
```

**O servidor está funcionando mas o MongoDB está desconectado.**

---

## 🔍 Causas Prováveis

### 1. **Variável MONGODB_URI Não Configurada**
A connection string pode não estar configurada ou estar incorreta no Render.

### 2. **MongoDB Atlas Cluster Parado**
O cluster no MongoDB Atlas pode estar desligado.

### 3. **IP Whitelist**
O IP do Render pode não estar na whitelist do MongoDB Atlas.

### 4. **Credenciais Incorretas**
Usuário ou senha podem estar incorretos na connection string.

---

## ✅ Soluções Passo a Passo

### Solução 1: Verificar Variável de Ambiente no Render

1. **Acesse o painel do Render**
2. Vá para o serviço "agendamento-servicos-backend"
3. Clique em "Environment"
4. Verifique se `MONGODB_URI` está configurada

**Formato correto:**
```
mongodb+srv://usuario:senha@cluster0.xxx.mongodb.net/agendamento-servicos?appName=Cluster0
```

**Se não estiver configurada:**
1. Obtenha a connection string do MongoDB Atlas
2. Adicione no Render com a variável `MONGODB_URI`
3. Clique em "Save Changes"
4. O Render fará deploy automático

### Solução 2: Verificar MongoDB Atlas

1. **Acesse o MongoDB Atlas**
2. Vá para "Clusters"
3. Verifique se o cluster está "Paused" ou "Stopped"
4. Se estiver paused, clique em "Resume"

### Solução 3: Configurar IP Whitelist

1. **No MongoDB Atlas**, vá para "Network Access"
2. Clique em "Add IP Address"
3. Selecione "Allow Access from Anywhere" (`0.0.0.0/0`)
4. Clique em "Confirm"

**Nota:** Para produção, é melhor usar o IP específico do Render, mas `0.0.0.0/0` funciona para testes.

### Solução 4: Verificar Credenciais

1. **No MongoDB Atlas**, vá para "Database Access"
2. Verifique se o usuário existe
3. Se necessário, crie um novo usuário ou reset a senha
4. Atualize a `MONGODB_URI` no Render com as credenciais corretas

---

## 🧪 Como Testar Connection String

### Teste Local:

```bash
# No diretório backend
node -e "
const mongoose = require('mongoose');
mongoose.connect('SUA_CONNECTION_STRING_AQUI')
  .then(() => console.log('✅ Conexão sucesso!'))
  .catch(err => console.error('❌ Erro:', err.message));
"
```

### Teste no Deploy:

Após configurar a variável no Render, verifique os logs:
- Deve aparecer: `[MongoDB] Connection string: Configurada`
- Deve aparecer: `✅ MongoDB Connected: ...`
- Deve aparecer: `mongodb: {"state":"connected","readyState":1}`

---

## 📋 Logs Esperados vs Logs Atuais

### ✅ Logs Esperados (MongoDB Conectado):
```
[MongoDB] Tentando conectar (tentativa 1/5)
[MongoDB] Connection string: Configurada
✅ MongoDB Connected: cluster0.xxx.mongodb.net
✅ Database: agendamento-servicos
✅ Connection pool: 1 (1=connected)
Keep-alive success: 200 - {"status":"ok","mongodb":{"state":"connected","readyState":1}}
```

### ❌ Logs Atuais (MongoDB Desconectado):
```
[MongoDB] Tentando conectar (tentativa 1/5)
[MongoDB] Connection string: NÃO CONFIGURADA  # ou erro de conexão
❌ Error connecting to MongoDB: ...
Keep-alive success: 200 - {"status":"degraded","mongodb":{"state":"disconnected","readyState":0}}
```

---

## 🔄 Sistema de Retry Implementado

O sistema agora tenta reconectar automaticamente:

- **5 tentativas** com delay de **5 segundos** entre cada
- **Reconexão automática** se a conexão cair
- **Logging detalhado** para identificar o problema
- **Continua operando** mesmo sem MongoDB (health check ainda funciona)

### Logs de Retry:
```
❌ Error connecting to MongoDB (tentativa 1/5): ...
🔄 Retrying connection in 5 seconds...
[MongoDB] Tentando conectar (tentativa 2/5)
...
```

---

## 🎯 Checklist de Resolução

- [ ] Verificar se `MONGODB_URI` está configurada no Render
- [ ] Verificar formato da connection string
- [ ] Verificar se cluster MongoDB Atlas está rodando
- [ ] Configurar IP whitelist (`0.0.0.0/0`)
- [ ] Verificar credenciais (usuário/senha)
- [ ] Fazer deploy após alterações
- [ ] Verificar logs no Render
- [ ] Confirmar que MongoDB aparece como "connected"

---

## 🚨 Ação Imediata Necessária

**Você precisa configurar a variável `MONGODB_URI` no Render:**

1. Copie sua connection string do MongoDB Atlas
2. Vá ao painel do Render
3. Adicione a variável `MONGODB_URI`
4. Salve e aguarde o deploy

---

## 📞 Recursos

- **MongoDB Atlas**: https://cloud.mongodb.com
- **Render Dashboard**: https://dashboard.render.com
- **Connection String Guide**: https://www.mongodb.com/docs/manual/reference/connection-string/

---

## 💡 Dica Importante

Se você não tem a connection string do MongoDB Atlas:

1. Acesse o MongoDB Atlas
2. Vá para "Clusters" → "Connect"
3. Selecione "Connect your application"
4. Escolha "Node.js" e versão adequada
5. Copie a connection string
6. Substitua `<password>` pela senha real do usuário

---

Após configurar a `MONGODB_URI` corretamente, o sistema deve conectar automaticamente e mostrar:
```
✅ MongoDB Connected
✅ mongodb: {"state":"connected","readyState":1}
```

O frontend então funcionará corretamente e o calendário mostrará os horários disponíveis reais.