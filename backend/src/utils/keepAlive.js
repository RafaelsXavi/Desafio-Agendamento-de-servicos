/**
 * Keep-Alive Service
 * Mantém o servidor ativo fazendo ping em si mesmo a cada intervalo regular
 * Isso evita que o serviço seja desativado por inatividade no Render
 */

const http = require('http');

const keepAlive = () => {
  // Só ativa keep-alive se estiver em produção (Render/Heroku)
  const isProduction = process.env.RENDER_EXTERNAL_URL || process.env.HEROKU_URL;
  
  if (!isProduction) {
    console.log('Keep-alive desativado: modo de desenvolvimento');
    return;
  }
  
  const url = process.env.RENDER_EXTERNAL_URL || process.env.HEROKU_URL;
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