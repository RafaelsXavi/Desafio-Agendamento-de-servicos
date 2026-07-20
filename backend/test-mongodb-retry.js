/**
 * Script para testar as melhorias de conexão MongoDB
 */

const fs = require('fs');
const path = require('path');

console.log('=== Teste de Melhorias de Conexão MongoDB ===\n');

const tests = [
  {
    name: 'Sistema de Retry MongoDB',
    file: 'src/config/database.js',
    checks: [
      { regex: /let retryCount = 0/, description: 'Contador de retry implementado' },
      { regex: /MAX_RETRIES = 5/, description: 'Máximo de 5 retries configurado' },
      { regex: /RETRY_DELAY = 5000/, description: 'Delay de 5 segundos entre retries' },
      { regex: /setTimeout\(connectDB, RETRY_DELAY\)/, description: 'Retry automático implementado' }
    ]
  },
  {
    name: 'Logging Melhorado',
    file: 'src/config/database.js',
    checks: [
      { regex: /\[MongoDB\] Tentando conectar/, description: 'Log de tentativa de conexão' },
      { regex: /Connection string:.*Configurada/, description: 'Verificação de connection string' },
      { regex: /✅ MongoDB Connected:/, description: 'Log de sucesso com emoji' },
      { regex: /❌ Error connecting to MongoDB/, description: 'Log de erro detalhado' }
    ]
  },
  {
    name: 'Reconexão Automática',
    file: 'src/config/database.js',
    checks: [
      { regex: /mongoose\.connection\.on\('disconnected'/, description: 'Listener de desconexão' },
      { regex: /mongoose\.connection\.on\('reconnected'/, description: 'Listener de reconexão' },
      { regex: /mongoose\.connection\.on\('error'/, description: 'Listener de erros' }
    ]
  },
  {
    name: 'Tratamento de Erros Específicos',
    file: 'src/config/database.js',
    checks: [
      { regex: /Authentication failed/, description: 'Tratamento de erro de autenticação' },
      { regex: /ENOTFOUND/, description: 'Tratamento de erro de DNS' },
      { regex: /querySrv/, description: 'Tratamento de erro de DNS SRV' }
    ]
  },
  {
    name: 'Inicialização Robusta',
    file: 'src/server.js',
    checks: [
      { regex: /waitForMongoDB/, description: 'Função de espera por MongoDB' },
      { regex: /⏳ Aguardando conexão com MongoDB/, description: 'Log de espera' },
      { regex: /readyState === 1/, description: 'Verificação de estado antes de criar admin' }
    ]
  }
];

let allPassed = true;

tests.forEach(test => {
  console.log(`📋 Testando: ${test.name}`);
  
  const filePath = path.join(__dirname, test.file);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Arquivo não encontrado: ${test.file}\n`);
    allPassed = false;
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  test.checks.forEach(check => {
    const passed = check.regex.test(content);
    console.log(`${passed ? '✅' : '❌'} ${check.description}`);
    if (!passed) allPassed = false;
  });
  
  console.log();
});

console.log('='.repeat(50));
if (allPassed) {
  console.log('✅ Todas as melhorias de MongoDB foram implementadas!');
  console.log('✅ Sistema com retry automático e reconexão');
  console.log('✅ Logging detalhado para diagnóstico');
} else {
  console.log('❌ Algumas melhorias não foram implementadas');
  console.log('⚠️  Verifique os testes acima');
}
console.log('='.repeat(50));

process.exit(allPassed ? 0 : 1);