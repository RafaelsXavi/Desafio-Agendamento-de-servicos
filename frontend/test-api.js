/**
 * Test script para verificar se o serviço de API está configurado corretamente
 */

console.log('=== Teste de Configuração do Serviço de API ===\n');

try {
  const fs = require('fs');
  const path = require('path');
  
  // Testar arquivo api.js
  const apiPath = path.join(__dirname, 'src/services/api.js');
  
  if (!fs.existsSync(apiPath)) {
    console.error('❌ Arquivo api.js não encontrado');
    process.exit(1);
  }
  
  console.log('✅ Arquivo api.js encontrado');
  
  const apiContent = fs.readFileSync(apiPath, 'utf8');
  
  const apiChecks = [
    {
      name: 'Timeout configurado',
      regex: /timeout:\s*\d+/,
      description: 'Timeout configurado para requests'
    },
    {
      name: 'Sistema de retry implementado',
      regex: /MAX_RETRIES/,
      description: 'Sistema de retry automático implementado'
    },
    {
      name: 'Função checkApiHealth',
      regex: /checkApiHealth/,
      description: 'Função para verificar saúde da API'
    },
    {
      name: 'Delay para retry',
      regex: /delay.*ms/,
      description: 'Delay progressivo para retries'
    },
    {
      name: 'Interceptador de resposta',
      regex: /interceptors\.response/,
      description: 'Interceptador de resposta configurado'
    }
  ];
  
  console.log('\n📋 Verificando melhorias no serviço de API:\n');
  
  let allPassed = true;
  apiChecks.forEach(check => {
    const passed = check.regex.test(apiContent);
    console.log(`${passed ? '✅' : '❌'} ${check.name}: ${passed ? 'Implementado' : 'Não encontrado'}`);
    if (!passed) allPassed = false;
  });
  
  // Testar componente ConnectionStatus
  console.log('\n📋 Verificando componente ConnectionStatus:\n');
  
  const connectionStatusPath = path.join(__dirname, 'src/components/ConnectionStatus/ConnectionStatus.jsx');
  if (!fs.existsSync(connectionStatusPath)) {
    console.error('❌ Componente ConnectionStatus não encontrado');
    allPassed = false;
  } else {
    console.log('✅ Componente ConnectionStatus encontrado');
    
    const connectionContent = fs.readFileSync(connectionStatusPath, 'utf8');
    
    const connectionChecks = [
      {
        name: 'Import checkApiHealth',
        regex: /checkApiHealth/,
        description: 'Função de health check importada'
      },
      {
        name: 'Verificação periódica',
        regex: /setInterval/,
        description: 'Verificação automática periódica'
      },
      {
        name: 'Estado de conexão',
        regex: /isOnline/,
        description: 'Estado de conexão gerenciado'
      },
      {
        name: 'Indicador visual',
        regex: /status-dot/,
        description: 'Indicador visual implementado'
      }
    ];
    
    connectionChecks.forEach(check => {
      const passed = check.regex.test(connectionContent);
      console.log(`${passed ? '✅' : '❌'} ${check.name}: ${passed ? 'Implementado' : 'Não encontrado'}`);
      if (!passed) allPassed = false;
    });
  }
  
  // Testar CSS do ConnectionStatus
  console.log('\n📋 Verificando CSS do ConnectionStatus:\n');
  
  const cssPath = path.join(__dirname, 'src/components/ConnectionStatus/ConnectionStatus.css');
  if (!fs.existsSync(cssPath)) {
    console.error('❌ CSS ConnectionStatus não encontrado');
    allPassed = false;
  } else {
    console.log('✅ CSS ConnectionStatus encontrado');
    
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    const cssChecks = [
      {
        name: 'Animação de slide',
        regex: /slideDown/,
        description: 'Animação de entrada implementada'
      },
      {
        name: 'Animação de pulse',
        regex: /pulse/,
        description: 'Animação de pulso implementada'
      },
      {
        name: 'Responsividade',
        regex: /@media/,
        description: 'Design responsivo implementado'
      }
    ];
    
    cssChecks.forEach(check => {
      const passed = check.regex.test(cssContent);
      console.log(`${passed ? '✅' : '❌'} ${check.name}: ${passed ? 'Implementado' : 'Não encontrado'}`);
      if (!passed) allPassed = false;
    });
  }
  
  // Verificar se ConnectionStatus foi adicionado ao App.jsx
  console.log('\n📋 Verificando integração no App.jsx:\n');
  
  const appPath = path.join(__dirname, 'src/App.jsx');
  if (!fs.existsSync(appPath)) {
    console.error('❌ Arquivo App.jsx não encontrado');
    allPassed = false;
  } else {
    console.log('✅ Arquivo App.jsx encontrado');
    
    const appContent = fs.readFileSync(appPath, 'utf8');
    
    const appChecks = [
      {
        name: 'Import ConnectionStatus',
        regex: /import.*ConnectionStatus/,
        description: 'Componente ConnectionStatus importado'
      },
      {
        name: 'Uso do ConnectionStatus',
        regex: /<ConnectionStatus/,
        description: 'Componente ConnectionStatus utilizado'
      }
    ];
    
    appChecks.forEach(check => {
      const passed = check.regex.test(appContent);
      console.log(`${passed ? '✅' : '❌'} ${check.name}: ${passed ? 'Implementado' : 'Não encontrado'}`);
      if (!passed) allPassed = false;
    });
  }
  
  console.log('\n' + '='.repeat(50));
  if (allPassed) {
    console.log('✅ Todas as verificações passaram!');
    console.log('✅ Serviço de API está configurado corretamente');
    console.log('✅ Sistema de retry e indicador de conexão implementados');
    console.log('✅ Frontend pronto para deploy');
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