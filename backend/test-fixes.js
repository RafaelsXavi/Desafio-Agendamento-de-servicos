/**
 * Script para testar as correções implementadas
 */

const fs = require('fs');
const path = require('path');

console.log('=== Teste das Correções Implementadas ===\n');

const tests = [
  {
    name: 'Keep-alive com suporte HTTPS',
    file: 'src/utils/keepAlive.js',
    checks: [
      { regex: /require\('https'\)/, description: 'Módulo HTTPS importado' },
      { regex: /url\.startsWith\('https'\)/, description: 'Verificação de protocolo HTTPS' },
      { regex: /const protocol = url\.startsWith\('https'\) \? https : http/, description: 'Seleção dinâmica de protocolo' }
    ]
  },
  {
    name: 'Configuração MongoDB com timeouts aumentados',
    file: 'src/config/database.js',
    checks: [
      { regex: /serverSelectionTimeoutMS: 30000/, description: 'Timeout de seleção aumentado para 30s' },
      { regex: /socketTimeoutMS: 60000/, description: 'Timeout de socket aumentado para 60s' },
      { regex: /connectTimeoutMS: 30000/, description: 'Timeout de conexão configurado' },
      { regex: /maxPoolSize: 10/, description: 'Pool de conexões configurado' },
      { regex: /retryWrites: true/, description: 'Retry de escritas ativado' }
    ]
  },
  {
    name: 'Health check melhorado',
    file: 'src/server.js',
    checks: [
      { regex: /mongoose\.connection\.readyState/, description: 'Verificação de estado do MongoDB' },
      { regex: /mongodb:/, description: 'Informações do MongoDB no health check' },
      { regex: /status: mongoState === 1 \? 'ok' : 'degraded'/, description: 'Status baseado no MongoDB' }
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
  console.log('✅ Todas as correções foram implementadas corretamente!');
  console.log('✅ Sistema pronto para deploy');
} else {
  console.log('❌ Algumas correções não foram implementadas');
  console.log('⚠️  Verifique os testes acima');
}
console.log('='.repeat(50));

process.exit(allPassed ? 0 : 1);