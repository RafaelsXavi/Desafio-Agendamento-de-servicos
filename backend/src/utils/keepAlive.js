/**
 * Keep-Alive Service
 * Mantém o servidor ativo fazendo ping em si mesmo a cada intervalo regular
 * Isso evita que o serviço seja desativado por inatividade no Render
 */

const http = require('http');

const keepAlive = () => {
  // Só ativa keep-alive se estiver em produção (Render/Heroku)
  const isProduction = process.env.RENDER_EXTERNAL_URL || process.env.HEROKU_URL || process.env.NODE_ENV === 'production';
  
  if (!isProduction) {
    console.log('Keep-alive desativado: modo de desenvolvimento');
    return;
  }
  
  // Usa a URL externa do Render ou constrói a partir da porta
  const url = process.env.RENDER_EXTERNAL_URL || process.env.HEROKU_URL || `http://localhost:${process.env.PORT || 5000}`;
  const interval = 10 * 60 * 1000; // 10 minutos (em milissegundos)
  
  const ping = () => {
    try {
      const healthUrl = `${url}/health`;
      console.log(`[${new Date().toISOString()}] Keep-alive ping: ${healthUrl}`);
      
      // Faz ping na URL de health check
      http.get(healthUrl, (res) => {
        console.log(`[${new Date().toISOString()}] Keep-alive response: ${res.statusCode}`);
      }).on('error', (err) => {
        console.error(`[${new Date().toISOString()}] Keep-alive error:`, err.message);
      });
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Keep-alive error:`, error.message);
    }
  };

  // Primeiro ping após 30 segundos do servidor iniciar
  setTimeout(ping, 30000);

  // Ping a cada intervalo
  setInterval(ping, interval);
  
  console.log('Keep-alive ativado: modo de produção');
};

module.exports = keepAlive;