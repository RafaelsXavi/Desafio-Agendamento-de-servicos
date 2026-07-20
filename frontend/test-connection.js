/**
 * Script para testar conexão com o backend
 * Execute com: node test-connection.js
 */

const axios = require('axios');

// URL do backend (substitua pela URL real do seu backend no Render)
const BACKEND_URL = 'https://agendamento-servicos-backend.onrender.com';

console.log('=== Teste de Conexão com Backend ===\n');
console.log(`Backend URL: ${BACKEND_URL}\n`);

async function testConnection() {
  try {
    // Test 1: Health check
    console.log('📡 Testando health check...');
    const healthResponse = await axios.get(`${BACKEND_URL}/health`, {
      timeout: 10000
    });
    
    console.log('✅ Health check bem-sucedido!');
    console.log(`   Status: ${healthResponse.data.status}`);
    console.log(`   Uptime: ${healthResponse.data.uptime}s\n`);
    
    // Test 2: Endpoint de disponibilidade (público)
    console.log('📡 Testando endpoint de disponibilidade...');
    const today = new Date().toISOString().split('T')[0];
    const availabilityResponse = await axios.get(`${BACKEND_URL}/api/appointments/available/${today}`, {
      timeout: 30000  // Aumentado para 30 segundos
    });
    
    console.log('✅ Endpoint de disponibilidade acessível!');
    console.log(`   Data testada: ${today}`);
    console.log(`   Horários disponíveis: ${availabilityResponse.data.availableSlots?.length || 0}`);
    console.log(`   Horários ocupados: ${availabilityResponse.data.bookedSlots?.length || 0}\n`);
    
    // Test 3: Criar agendamento de teste (público)
    console.log('📡 Testando criação de agendamento...');
    const testAppointment = {
      clientName: 'Teste Conexão',
      phone: '(11) 99999-9999',
      serviceType: 'Corte de Cabelo',
      date: today,
      time: availabilityResponse.data.availableSlots?.[0] || '09:00'
    };
    
    if (availabilityResponse.data.availableSlots?.length > 0) {
      const createResponse = await axios.post(`${BACKEND_URL}/api/appointments`, testAppointment, {
        timeout: 30000  // Aumentado para 30 segundos
      });
      
      console.log('✅ Criação de agendamento funcionou!');
      console.log(`   ID do agendamento: ${createResponse.data.appointment?._id}\n`);
    } else {
      console.log('⚠️  Não há horários disponíveis hoje para teste de criação\n');
    }
    
    console.log('='.repeat(50));
    console.log('✅ Todos os testes de conexão passaram!');
    console.log('✅ Backend está online e funcionando corretamente');
    console.log('='.repeat(50));
    
  } catch (error) {
    console.error('❌ Erro de conexão:');
    
    if (error.code === 'ECONNREFUSED') {
      console.error('   Backend não está respondendo (Connection refused)');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('   Timeout - Backend demorou muito para responder');
    } else if (error.response) {
      console.error(`   Erro HTTP: ${error.response.status}`);
      console.error(`   Mensagem: ${error.response.data?.message || error.message}`);
    } else {
      console.error(`   Erro: ${error.message}`);
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('❌ Conexão com backend falhou');
    console.log('⚠️  Verifique se o backend está online no Render');
    console.log('⚠️  Verifique se a URL está correta');
    console.log('='.repeat(50));
    
    process.exit(1);
  }
}

testConnection();