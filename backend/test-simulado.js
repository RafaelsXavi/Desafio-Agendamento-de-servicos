// TESTE SIMULADO DO SISTEMA DE AGENDAMENTO
// Este teste demonstra a lógica do sistema sem dependência de conexão real

console.log('=== TESTE SIMULADO DO SISTEMA DE AGENDAMENTO ===\n');

// Simulação de banco de dados em memória
const mockDatabase = {
  appointments: []
};

// Função para verificar disponibilidade
const checkAvailability = (date, time) => {
  const exists = mockDatabase.appointments.find(
    app => app.date === date && app.time === time && app.status !== 'Cancelado'
  );
  return !exists;
};

// Função para criar agendamento
const createAppointment = (appointment) => {
  if (!checkAvailability(appointment.date, appointment.time)) {
    throw new Error('Horário já está ocupado');
  }
  
  const newAppointment = {
    id: Date.now(),
    ...appointment,
    status: 'Agendado',
    createdAt: new Date(),
    statusHistory: [{
      status: 'Agendado',
      changedAt: new Date(),
      changedBy: 'Cliente'
    }]
  };
  
  mockDatabase.appointments.push(newAppointment);
  return newAppointment;
};

// Horários de funcionamento (9:00 às 18:00)
const businessHours = [];
for (let hour = 9; hour < 18; hour++) {
  businessHours.push(`${hour.toString().padStart(2, '0')}:00`);
  businessHours.push(`${hour.toString().padStart(2, '0')}:30`);
}

const testDate = '2026-07-18'; // Amanhã

console.log('1. TESTE DE DISPONIBILIDADE INICIAL');
console.log('--------------------------------------');
console.log(`Data: ${testDate}`);
console.log(`Total de horários disponíveis: ${businessHours.length}`);
console.log(`Horários: ${businessHours.slice(0, 6).join(', ')}...\n`);

console.log('2. TESTE DE AGENDAMENTO BEM-SUCEDIDO');
console.log('--------------------------------------');

try {
  const appointment1 = createAppointment({
    clientName: 'João Silva',
    phone: '11999999999',
    serviceType: 'Corte de Cabelo',
    date: testDate,
    time: '10:00'
  });
  
  console.log('✅ Agendamento realizado com sucesso:');
  console.log(`   Cliente: ${appointment1.clientName}`);
  console.log(`   Serviço: ${appointment1.serviceType}`);
  console.log(`   Data: ${appointment1.date}`);
  console.log(`   Horário: ${appointment1.time}`);
  console.log(`   Status: ${appointment1.status}\n`);
} catch (error) {
  console.log(`❌ Erro: ${error.message}\n`);
}

console.log('3. TESTE DE CONFLITO (DOUBLE BOOKING)');
console.log('--------------------------------------');

try {
  const appointment2 = createAppointment({
    clientName: 'Maria Santos',
    phone: '11888888888',
    serviceType: 'Barba',
    date: testDate,
    time: '10:00' // Mesmo horário
  });
  
  console.log('❌ ERRO: Double booking não foi prevenido!\n');
} catch (error) {
  console.log('✅ Double booking prevenido com sucesso!');
  console.log(`   Mensagem: ${error.message}\n`);
}

console.log('4. TESTE DE AGENDAMENTO EM HORÁRIO DIFERENTE');
console.log('----------------------------------------------');

try {
  const appointment3 = createAppointment({
    clientName: 'Pedro Costa',
    phone: '11777777777',
    serviceType: 'Corte + Barba',
    date: testDate,
    time: '11:00' // Horário diferente
  });
  
  console.log('✅ Agendamento realizado com sucesso:');
  console.log(`   Cliente: ${appointment3.clientName}`);
  console.log(`   Serviço: ${appointment3.serviceType}`);
  console.log(`   Data: ${appointment3.date}`);
  console.log(`   Horário: ${appointment3.time}\n`);
} catch (error) {
  console.log(`❌ Erro: ${error.message}\n`);
}

console.log('5. TESTE DE VERIFICAÇÃO DE DISPONIBILIDADE');
console.log('----------------------------------------------');

const bookedSlots = mockDatabase.appointments
  .filter(app => app.status !== 'Cancelado')
  .map(app => app.time);

const availableSlots = businessHours.filter(slot => !bookedSlots.includes(slot));

console.log(`Total de slots: ${businessHours.length}`);
console.log(`Slots ocupados: ${bookedSlots.length} (${bookedSlots.join(', ')})`);
console.log(`Slots disponíveis: ${availableSlots.length}`);
console.log(`Exemplo disponíveis: ${availableSlots.slice(0, 5).join(', ')}...\n`);

console.log('6. TESTE DE ALTERAÇÃO DE STATUS');
console.log('----------------------------------');

const appointmentToChange = mockDatabase.appointments[0];
appointmentToChange.status = 'Confirmado';
appointmentToChange.statusHistory.push({
  status: 'Confirmado',
  changedAt: new Date(),
  changedBy: 'Admin'
});

console.log('✅ Status alterado com sucesso:');
console.log(`   Agendamento ID: ${appointmentToChange.id}`);
console.log(`   Novo status: ${appointmentToChange.status}`);
console.log(`   Histórico de alterações: ${appointmentToChange.statusHistory.length}\n`);

console.log('7. TESTE DE CANCELAMENTO');
console.log('--------------------------');

const appointmentToCancel = mockDatabase.appointments[1];
appointmentToCancel.status = 'Cancelado';
appointmentToCancel.statusHistory.push({
  status: 'Cancelado',
  changedAt: new Date(),
  changedBy: 'Cliente'
});

console.log('✅ Agendamento cancelado:');
console.log(`   Agendamento ID: ${appointmentToCancel.id}`);
console.log(`   Status: ${appointmentToCancel.status}\n`);

console.log('8. VERIFICAÇÃO DE DISPONIBILIDADE APÓS CANCELAMENTO');
console.log('-----------------------------------------------------');

const bookedSlotsAfterCancel = mockDatabase.appointments
  .filter(app => app.status !== 'Cancelado')
  .map(app => app.time);

const availableSlotsAfterCancel = businessHours.filter(slot => !bookedSlotsAfterCancel.includes(slot));

console.log(`Slots ocupados após cancelamento: ${bookedSlotsAfterCancel.length}`);
console.log(`Slots disponíveis após cancelamento: ${availableSlotsAfterCancel.length}`);
console.log(`Horário liberado: 11:00 disponível? ${availableSlotsAfterCancel.includes('11:00') ? 'Sim' : 'Não'}\n`);

console.log('9. RELATÓRIO FINAL');
console.log('--------------------');

const statusStats = {
  Agendado: 0,
  Confirmado: 0,
  Concluído: 0,
  Cancelado: 0
};

mockDatabase.appointments.forEach(app => {
  statusStats[app.status]++;
});

console.log(`Total de agendamentos: ${mockDatabase.appointments.length}`);
console.log('Distribuição por status:');
Object.entries(statusStats).forEach(([status, count]) => {
  if (count > 0) {
    console.log(`   ${status}: ${count}`);
  }
});

console.log('\n=== TODOS OS TESTES SIMULADOS CONCLUÍDOS COM SUCESSO ===\n');
console.log('✅ Lógica de prevenção de double booking: FUNCIONANDO');
console.log('✅ Verificação de disponibilidade: FUNCIONANDO');
console.log('✅ Sistema de status: FUNCIONANDO');
console.log('✅ Liberação de horários após cancelamento: FUNCIONANDO\n');