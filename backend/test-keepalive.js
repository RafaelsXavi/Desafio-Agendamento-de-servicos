/**
 * Test script para verificar se o keep-alive está configurado corretamente
 */

console.log('=== Teste de Configuração do Keep-Alive ===\n');

try {
  // Testar se o arquivo existe
  const fs = require('fs');
  const path = require('path');
  const keepAlivePath = path.join(__dirname, 'src/utils/keepAlive.js');
  
  if (!fs.existsSync(keepAlivePath)) {
    console.error('❌ Arquivo keep-alive não encontrado em:', keepAlivePath);
    process.exit(1);
  }
  
  console.log('✅ Arquivo keep-alive encontrado');
  
  // Ler o conteúdo
  const content = fs.readFileSync(keepAlivePath, 'utf8');
  
  // Verificar melhorias implementadas
  const checks = [
    {
      name: 'Intervalo reduzido para 5 minutos',
      regex: /5 \* 60 \* 1000/,
      description: 'Intervalo de 5 minutos configurado'
    },
    {
      name: 'Sistema de retry automático',
      regex: /maxRetries.*3/,
      description: 'Máximo de 3 retries configurado'
    },
    {
      name: 'Timeout de 10 segundos',
      regex: /setTimeout\(10000/,
      description: 'Timeout de 10 segundos configurado'
    },
    {
      name: 'Logging detalhado',
      regex: /console\.log.*Keep-alive ping/,
      description: 'Logging de ping implementado'
    },
    {
      name: 'Contador de falhas',
      regex: /consecutiveFailures/,
      description: 'Contador de falhas implementado'
    }
  ];
  
  console.log('\n📋 Verificando melhorias implementadas:\n');
  
  let allPassed = true;
  checks.forEach(check => {
    const passed = check.regex.test(content);
    console.log(`${passed ? '✅' : '❌'} ${check.name}: ${passed ? 'Implementado' : 'Não encontrado'}`);
    if (!passed) allPassed = false;
  });
  
  console.log('\n📋 Verificando configuração do render.yaml:\n');
  
  const renderPath = path.join(__dirname, 'render.yaml');
  if (!fs.existsSync(renderPath)) {
    console.error('❌ Arquivo render.yaml não encontrado');
    allPassed = false;
  } else {
    console.log('✅ Arquivo render.yaml encontrado');
    
    const renderContent = fs.readFileSync(renderPath, 'utf8');
    
    const renderChecks = [
      {
        name: 'RENDER_EXTERNAL_URL configurado',
        regex: /RENDER_EXTERNAL_URL/,
        description: 'Variável RENDER_EXTERNAL_URL configurada'
      },
      {
        name: 'Auto-deploy desativado',
        regex: /autoDeploy: false/,
        description: 'Auto-deploy desativado para evitar deploys desnecessários'
      },
      {
        name: 'Health check configurado',
        regex: /healthCheckPath/,
        description: 'Health check configurado'
      }
    ];
    
    renderChecks.forEach(check => {
      const passed = check.regex.test(renderContent);
      console.log(`${passed ? '✅' : '❌'} ${check.name}: ${passed ? 'Configurado' : 'Não encontrado'}`);
      if (!passed) allPassed = false;
    });
  }
  
  console.log('\n' + '='.repeat(50));
  if (allPassed) {
    console.log('✅ Todas as verificações passaram!');
    console.log('✅ Keep-alive está configurado corretamente');
    console.log('✅ Sistema pronto para deploy');
  } else {
    console.log('❌ Algumas verificações falharam');
    console.log('⚠️  Verifique as configurações antes do deploy');
  }
  console.log('='.repeat(50));
  
  process.exit(allPassed ? 0 : 1);
  
} catch (error) {
  console.error('❌ Erro durante teste:', error.message);
  process.exit(1);
}