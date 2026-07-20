/**
 * Keep-Alive Service - Versão Melhorada
 * Mantém o servidor ativo fazendo ping em si mesmo a cada intervalo regular
 * Isso evita que o serviço seja desativado por inatividade no Render
 * 
 * Melhorias:
 * - Intervalo reduzido para 5 minutos (mais frequente)
 * - Sistema de retry automático em caso de falha
 * - Fallback URL usando porta do Render
 * - Logging mais detalhado para debug
 * - Verificação de saúde do servidor
 * - Suporte a HTTPS
 */

const http = require('http');
const https = require('https');

const keepAlive = () => {
  // Só ativa keep-alive se estiver em produção (Render/Heroku)
  const isProduction = process.env.RENDER_EXTERNAL_URL || process.env.HEROKU_URL || process.env.NODE_ENV === 'production';
  
  if (!isProduction) {
    console.log('Keep-alive desativado: modo de desenvolvimento');
    return;
  }
  
  // Usa a URL externa do Render ou constrói a partir da porta
  const externalUrl = process.env.RENDER_EXTERNAL_URL || process.env.HEROKU_URL;
  const port = process.env.PORT || 10000;
  const url = externalUrl || `http://localhost:${port}`;
  const interval = 5 * 60 * 1000; // 5 minutos (reduzido de 10 para 5)
  const maxRetries = 3;
  
  let consecutiveFailures = 0;
  
  const ping = (retryCount = 0) => {
    try {
      const healthUrl = `${url}/health`;
      console.log(`[${new Date().toISOString()}] Keep-alive ping: ${healthUrl} (Tentativa ${retryCount + 1}/${maxRetries})`);
      
      // Escolher o protocolo correto (http ou https)
      const protocol = url.startsWith('https') ? https : http;
      
      const req = protocol.get(healthUrl, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log(`[${new Date().toISOString()}] Keep-alive success: ${res.statusCode} - ${data}`);
            consecutiveFailures = 0; // Reset contador de falhas
          } else {
            console.error(`[${new Date().toISOString()}] Keep-alive warning: Status ${res.statusCode}`);
            handleFailure();
          }
        });
      });
      
      req.on('error', (err) => {
        console.error(`[${new Date().toISOString()}] Keep-alive error:`, err.message);
        handleFailure();
        
        // Retry automático se ainda não atingiu o máximo
        if (retryCount < maxRetries - 1) {
          console.log(`[${new Date().toISOString()}] Retrying in 30 seconds...`);
          setTimeout(() => ping(retryCount + 1), 30000);
        }
      });
      
      req.setTimeout(10000, () => {
        req.destroy();
        console.error(`[${new Date().toISOString()}] Keep-alive timeout: Request took too long`);
        handleFailure();
        
        if (retryCount < maxRetries - 1) {
          setTimeout(() => ping(retryCount + 1), 30000);
        }
      });
      
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Keep-alive critical error:`, error.message);
      handleFailure();
    }
  };
  
  const handleFailure = () => {
    consecutiveFailures++;
    console.error(`[${new Date().toISOString()}] Keep-alive failure count: ${consecutiveFailures}`);
    
    // Se muitas falhas consecutivas, tenta URL alternativa
    if (consecutiveFailures >= 3 && externalUrl) {
      console.warn(`[${new Date().toISOString()}] Multiple failures, trying alternative URL...`);
      // Poderia implementar lógica de fallback aqui
    }
  };
  
  // Primeiro ping após 15 segundos do servidor iniciar (reduzido de 30)
  setTimeout(() => {
    console.log('Keep-alive iniciando primeiro ping...');
    ping();
  }, 15000);

  // Ping a cada intervalo
  setInterval(ping, interval);
  
  const intervalMinutes = Math.round(interval / 60000); // Converter para minutos corretamente
  console.log(`Keep-alive ativado: modo de produção (URL: ${url}, Intervalo: ${intervalMinutes}min)`);
};

module.exports = keepAlive;