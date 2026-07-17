const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Import models
const Appointment = require('./src/models/Appointment');

const testComplete = async () => {
  console.log('=== TESTE COMPLETO DO SISTEMA DE AGENDAMENTO ===\n');
  
  try {
    // 1. Teste de Conexão
    console.log('1. TESTE DE CONEXÃO COM MONGODB');
    console.log('-----------------------------------');
    const connStart = Date.now();
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      dbName: 'agendamento-servicos'
    });
    
    const connEnd = Date.now();
    console.log(`✅ Conexão estabelecida em ${connEnd - connStart}ms`);
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Database: ${mongoose.connection.name}\n`);
    
    // Limpar dados de teste anteriores
    await Appointment.deleteMany({ clientName: /TESTE_/i });
    console.log('✅ Limpeza de dados de teste realizada\n');
    
    // 2. Teste de Disponibilidade de Horários
    console.log('2. TESTE DE DISPONIBILIDADE DE HORÁRIOS');
    console.log('----------------------------------------');
    
    const today = new Date();
    const testDate = new Date(today);
    testDate.setDate(today.getDate() + 1); // Amanhã
    const dateString = testDate.toISOString().split('T')[0];
    
    console.log(`   Data teste: ${dateString}`);
    
    // Simular horários disponíveis (9:00 às 18:00)
    const businessHours = [];
    for (let hour = 9; hour < 18; hour++) {
      businessHours.push(`${hour.toString().padStart(2, '0')}:00`);
      businessHours.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    
    console.log(`   Horários de funcionamento: ${businessHours.length} slots`);
    console.log(`   Slots disponíveis inicialmente: ${businessHours.length}\n`);
    
    // 3. Teste de Agendamento Bem-sucedido
    console.log('3. TESTE DE AGENDAMENTO BEM-SUCEDIDO');
    console.log('--------------------------------------');
    
    const appointment1 = await Appointment.create({
      clientName: 'TESTE_Cliente_1',
      phone: '11999999999',
      serviceType: 'Corte de Cabelo',
      date: testDate,
      time: '10:00',
      status: 'Agendado',
      statusHistory: [{
        status: 'Agendado',
        changedAt: new Date(),
        changedBy: 'TESTE_Sistema'
      }]
    });
    
    console.log(`✅ Agendamento 1 criado: ${appointment1.clientName}`);
    console.log(`   Serviço: ${appointment1.serviceType}`);
    console.log(`   Data: ${appointment1.date.toLocaleDateString('pt-BR')}`);
    console.log(`   Horário: ${appointment1.time}`);
    console.log(`   Status: ${appointment1.status}\n`);
    
    // 4. Teste de Conflito (Double Booking)
    console.log('4. TESTE DE CONFLITO (DOUBLE BOOKING)');
    console.log('--------------------------------------');
    
    try {
      const appointment2 = await Appointment.create({
        clientName: 'TESTE_Cliente_2',
        phone: '11888888888',
        serviceType: 'Barba',
        date: testDate,
        time: '10:00', // Mesmo horário
        status: 'Agendado',
        statusHistory: [{
          status: 'Agendado',
          changedAt: new Date(),
          changedBy: 'TESTE_Sistema'
        }]
      });
      
      console.log('❌ ERRO: Double booking não foi prevenido!');
      console.log('   O sistema permitiu dois agendamentos no mesmo horário.\n');
    } catch (error) {
      if (error.code === 11000) {
        console.log('✅ Double booking prevenido com sucesso!');
        console.log('   Erro de índice único capturado corretamente.');
        console.log(`   Código: ${error.code}\n`);
      } else {
        console.log('⚠️  Erro diferente de índice único:');
        console.log(`   ${error.message}\n`);
      }
    }
    
    // 5. Teste de Agendamento em Horário Diferente
    console.log('5. TESTE DE AGENDAMENTO EM HORÁRIO DIFERENTE');
    console.log('------------------------------------------------');
    
    const appointment3 = await Appointment.create({
      clientName: 'TESTE_Cliente_3',
      phone: '11777777777',
      serviceType: 'Corte + Barba',
      date: testDate,
      time: '11:00', // Horário diferente
      status: 'Agendado',
      statusHistory: [{
        status: 'Agendado',
        changedAt: new Date(),
        changedBy: 'TESTE_Sistema'
      }]
    });
    
    console.log(`✅ Agendamento 3 criado: ${appointment3.clientName}`);
    console.log(`   Serviço: ${appointment3.serviceType}`);
    console.log(`   Data: ${appointment3.date.toLocaleDateString('pt-BR')}`);
    console.log(`   Horário: ${appointment3.time}`);
    console.log(`   Status: ${appointment3.status}\n`);
    
    // 6. Teste de Verificação de Disponibilidade
    console.log('6. TESTE DE VERIFICAÇÃO DE DISPONIBILIDADE');
    console.log('--------------------------------------------');
    
    const bookedAppointments = await Appointment.find({
      date: testDate,
      status: { $ne: 'Cancelado' }
    });
    
    const bookedSlots = bookedAppointments.map(app => app.time);
    const availableSlots = businessHours.filter(slot => !bookedSlots.includes(slot));
    
    console.log(`   Total de slots: ${businessHours.length}`);
    console.log(`   Slots ocupados: ${bookedSlots.length}`);
    console.log(`   Slots disponíveis: ${availableSlots.length}`);
    console.log(`   Horários ocupados: ${bookedSlots.join(', ')}`);
    console.log(`   Horários disponíveis (primeiros 5): ${availableSlots.slice(0, 5).join(', ')}...\n`);
    
    // 7. Teste de Performance
    console.log('7. TESTE DE PERFORMANCE');
    console.log('------------------------');
    
    // Teste de leitura
    const readStart = Date.now();
    await Appointment.find({ date: testDate });
    const readEnd = Date.now();
    console.log(`✅ Leitura de agendamentos: ${readEnd - readStart}ms`);
    
    // Teste de contagem
    const countStart = Date.now();
    await Appointment.countDocuments({ date: testDate });
    const countEnd = Date.now();
    console.log(`✅ Contagem de agendamentos: ${countEnd - countStart}ms`);
    
    // Teste de atualização
    const updateStart = Date.now();
    await Appointment.findByIdAndUpdate(appointment1._id, { status: 'Confirmado' });
    const updateEnd = Date.now();
    console.log(`✅ Atualização de status: ${updateEnd - updateStart}ms\n`);
    
    // 8. Relatório Final
    console.log('8. RELATÓRIO FINAL');
    console.log('--------------------');
    
    const totalAppointments = await Appointment.countDocuments({ clientName: /TESTE_/i });
    const statusStats = await Appointment.aggregate([
      { $match: { clientName: /TESTE_/i } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    console.log(`   Total de agendamentos de teste: ${totalAppointments}`);
    console.log('   Distribuição por status:');
    statusStats.forEach(stat => {
      console.log(`   - ${stat._id}: ${stat.count}`);
    });
    
    // Limpar dados de teste
    await Appointment.deleteMany({ clientName: /TESTE_/i });
    console.log('\n✅ Limpeza de dados de teste realizada');
    
    await mongoose.connection.close();
    console.log('✅ Conexão fechada com sucesso');
    
    console.log('\n=== TODOS OS TESTES CONCLUÍDOS COM SUCESSO ===\n');
    
  } catch (error) {
    console.error('\n❌ ERRO DURANTE OS TESTES:');
    console.error(error.message);
    
    // Tentar limpar dados de teste mesmo em caso de erro
    try {
      await Appointment.deleteMany({ clientName: /TESTE_/i });
      await mongoose.connection.close();
    } catch (cleanupError) {
      console.error('Erro durante limpeza:', cleanupError.message);
    }
    
    process.exit(1);
  }
};

testComplete();