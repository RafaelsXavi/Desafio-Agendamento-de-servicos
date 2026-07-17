# 📊 Guia de Monitoramento - Sistema de Agendamento

## 🎯 Visão Geral

Este documento descreve o sistema de monitoramento implementado para garantir que o sistema de agendamento esteja sempre online e funcionando corretamente durante o processo seletivo.

---

## 🏗️ Arquitetura de Monitoramento

### 1. Sistema de Keep-Alive (Backend)

**Arquivo**: `backend/src/utils/keepAlive.js`

**Funcionamento**:
- Faz ping automático no endpoint `/health` a cada 10 minutos
- Utiliza a URL externa do serviço (RENDER_EXTERNAL_URL)
- Primeiro ping 30 segundos após o servidor iniciar
- Registra logs de cada ping e resposta

**Código**:
```javascript
const interval = 10 * 60 * 1000; // 10 minutos
const healthUrl = `${url}/health`;
http.get(healthUrl, (res) => {
  console.log(`Keep-alive response: ${res.statusCode}`);
});
```

### 2. Health Check Endpoint

**Arquivo**: `backend/src/server.js`

**Endpoint**: `GET /health`

**Resposta**:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

**Configuração Render**: O arquivo `render.yaml` configura este endpoint para health check automático.

### 3. Monitoramento Externo (UptimeRobot)

**Serviço**: UptimeRobot (gratuito)

**Configuração**:
- **URL**: `https://seu-backend.onrender.com/health`
- **Intervalo**: 5 minutos
- **Tipo**: HTTP(s)
- **Alertas**: Email em caso de falha

---

## 📈 Dashboard de Monitoramento

### Render Dashboard

**Acesso**: https://dashboard.render.com

**Métricas Disponíveis**:
- CPU Usage
- Memory Usage
- Response Time
- Request Count
- Error Rate

**Logs**:
- Logs em tempo real do servidor
- Logs do keep-alive
- Logs de requisições HTTP
- Logs de erros

**Alertas**:
- Servidor desativado
- Erros de conexão
- High memory usage
- Slow response times

### Vercel Dashboard

**Acesso**: https://vercel.com/dashboard

**Métricas Disponíveis**:
- Page Views
- Unique Visitors
- Bandwidth Usage
- Build Time
- Edge Function invocations

**Logs**:
- Build logs
- Deployment logs
- Function logs
- Error logs

### MongoDB Atlas Dashboard

**Acesso**: https://cloud.mongodb.com

**Métricas Disponíveis**:
- Connections
- Operations
- Memory Usage
- Storage Usage
- Network I/O

**Alertas**:
- High connection count
- Slow queries
- Storage limit approaching
- Replication lag

---

## 🔧 Configuração de Alertas

### Alertas Render

**Configuração**:
1. Acesse o serviço no Render Dashboard
2. Vá para "Metrics" → "Alerts"
3. Configure alertas para:
   - Response time > 5 segundos
   - Error rate > 5%
   - Memory usage > 90%

### Alertas UptimeRobot

**Configuração**:
1. Acesse https://uptimerobot.com
2. Configure monitor com suas credenciais
3. Adicione email para notificações
4. Configure intervalo de 5 minutos

### Alertas MongoDB Atlas

**Configuração**:
1. Acesse cluster no MongoDB Atlas
2. Vá para "Alerts" → "Configuration"
3. Configure alertas para:
   - CPU > 80%
   - Memory > 80%
   - Storage > 80%

---

## 📱 Monitoramento em Tempo Real

### Logs do Backend

**Ver logs no Render**:
```bash
# Via CLI (se tiver render-cli instalado)
render logs agendamento-servicos-backend

# Via dashboard
Render Dashboard → Serviço → Logs
```

**Logs importantes**:
- `Keep-alive ping` - Indica sistema funcionando
- `Server running on port` - Indica servidor iniciado
- `MongoDB Connected` - Indica conexão com banco
- Erros de conexão - Indicam problemas

### Logs do Frontend

**Ver logs no Vercel**:
1. Acesse projeto no Vercel Dashboard
2. Vá para "Deployments"
3. Clique no deployment mais recente
4. Veja "Build Logs" e "Function Logs"

---

## 🧪 Testes de Monitoramento

### Teste Manual de Health Check

```bash
# Testar endpoint de health
curl https://seu-backend.onrender.com/health

# Resposta esperada:
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

### Teste de Keep-Alive

**Verificar logs do backend**:
```bash
# Logs devem mostrar:
[2024-01-01T00:00:00.000Z] Keep-alive ping: https://seu-backend.onrender.com/health
[2024-01-01T00:00:00.100Z] Keep-alive response: 200
```

### Teste de UptimeRobot

**Verificar status**:
1. Acesse https://uptimerobot.com
2. Confirme que monitor mostra "Up"
3. Verifique last ping time
4. Confirme response time < 1 segundo

---

## 🚨 Resolução de Problemas

### Backend Offline

**Sintomas**:
- Health check retorna erro
- UptimeRobot mostra "Down"
- Logs mostram conexão recusada

**Soluções**:
1. Verificar variáveis de ambiente no Render
2. Verificar conexão MongoDB Atlas
3. Verificar logs de erro no Render
4. Fazer novo deploy se necessário

### Keep-Alive Não Funcionando

**Sintomas**:
- Backend faz spin-down
- Logs não mostram pings de keep-alive
- UptimeRobot mostra "Down"

**Soluções**:
1. Verificar se `keepAlive()` está sendo chamado
2. Verificar `RENDER_EXTERNAL_URL` está configurada
3. Verificar logs de erro no keep-alive
4. Reiniciar serviço no Render

### Frontend Não Conecta

**Sintomas**:
- Erros de CORS no console
- Requisições falhando
- Dados não carregando

**Soluções**:
1. Verificar `VITE_API_URL` no Vercel
2. Verificar se backend está online
3. Verificar configuração CORS no backend
4. Testar endpoints diretamente

---

## 📊 Relatórios de Monitoramento

### Relatório Diário

**Verificar diariamente**:
- Status UptimeRobot (deve ser 100%)
- Uptime do backend (Render Dashboard)
- Logs de erros (Render + Vercel)
- Métricas de performance

### Relatório Semanal

**Verificar semanalmente**:
- Tendências de uso
- Picos de tráfego
- Performance do banco de dados
- Custos (deve ser $0)

---

## 🎯 Checklist de Monitoramento

### Configuração Inicial
- [ ] Keep-alive implementado
- [ ] Health check endpoint funcionando
- [ ] UptimeRobot configurado
- [ ] Alertas configurados
- [ ] Dashboards acessíveis

### Verificação Diária
- [ ] Status UptimeRobot: Up
- [ ] Health check respondendo
- [ ] Logs sem erros críticos
- [ ] Backend online (Render)
- [ ] Frontend online (Vercel)

### Verificação Semanal
- [ ] Analisar tendências de uso
- [ ] Verificar performance
- [ ] Revisar logs de erros
- [ ] Atualizar documentação se necessário

---

## 📞 Suporte e Contingência

### Em Caso de Falha Crítica

1. **Identificar problema**:
   - Verificar UptimeRobot
   - Verificar Render Dashboard
   - Verificar Vercel Dashboard

2. **Diagnóstico**:
   - Analisar logs
   - Testar endpoints
   - Verificar variáveis de ambiente

3. **Resolução**:
   - Fazer novo deploy
   - Reiniciar serviços
   - Atualizar configurações

4. **Comunicação**:
   - Documentar incidente
   - Comunicar se necessário
   - Implementar prevenção

---

## 🎉 Conclusão

O sistema de monitoramento implementado garante:

- ✅ **Backend sempre ativo** (keep-alive + UptimeRobot)
- ✅ **Frontend sempre online** (Vercel não faz spin-down)
- ✅ **Alertas automáticos** (falhas detectadas rapidamente)
- ✅ **Logs detalhados** (fácil diagnóstico)
- ✅ **Custo zero** (todos serviços gratuitos)

**O sistema está preparado para funcionar perfeitamente durante o processo seletivo!** 🚀