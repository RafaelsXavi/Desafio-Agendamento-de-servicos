const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const testConnection = async () => {
  console.log('=== Teste de Conexão com MongoDB ===\n');
  
  const startTime = Date.now();
  
  try {
    console.log('Tentando conectar ao MongoDB...');
    console.log(`URI: ${process.env.MONGODB_URI}`);
    
    const options = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      dbName: 'agendamento-servicos'
    };
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    const endTime = Date.now();
    const connectionTime = endTime - startTime;
    
    console.log('\n✅ CONEXÃO ESTABELECIDA COM SUCESSO!');
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    console.log(`Tempo de conexão: ${connectionTime}ms`);
    
    // Testar latência de operações
    console.log('\n=== Teste de Latência de Operações ===\n');
    
    // Teste de escrita
    const writeStart = Date.now();
    const testDoc = {
      test: true,
      timestamp: new Date(),
      description: 'Documento de teste de conexão'
    };
    
    const TestModel = mongoose.model('TestConnection', new mongoose.Schema({
      test: Boolean,
      timestamp: Date,
      description: String
    }));
    
    await TestModel.create(testDoc);
    const writeEnd = Date.now();
    console.log(`✅ Escrita: ${writeEnd - writeStart}ms`);
    
    // Teste de leitura
    const readStart = Date.now();
    await TestModel.findOne({ test: true });
    const readEnd = Date.now();
    console.log(`✅ Leitura: ${readEnd - readStart}ms`);
    
    // Teste de contagem
    const countStart = Date.now();
    await TestModel.countDocuments();
    const countEnd = Date.now();
    console.log(`✅ Contagem: ${countEnd - countStart}ms`);
    
    // Limpar dados de teste
    await TestModel.deleteMany({ test: true });
    console.log('\n✅ Limpeza de dados de teste realizada');
    
    await mongoose.connection.close();
    console.log('\n✅ Conexão fechada com sucesso');
    
  } catch (error) {
    const endTime = Date.now();
    console.log(`\n❌ ERRO NA CONEXÃO (após ${endTime - startTime}ms):`);
    console.error(error.message);
    
    if (error.message.includes('querySrv')) {
      console.log('\n⚠️  Erro de resolução DNS. Possíveis causas:');
      console.log('   1. Problema de conexão com a internet');
      console.log('   2. Cluster MongoDB Atlas não está rodando');
      console.log('   3. IP não está autorizado no MongoDB Atlas');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('\n⚠️  Conexão recusada. Possíveis causas:');
      console.log('   1. MongoDB não está rodando localmente');
      console.log('   2. Porta incorreta na URI de conexão');
      console.log('   3. Firewall bloqueando a conexão');
    }
    
    process.exit(1);
  }
};

testConnection();