const mongoose = require('mongoose');

let retryCount = 0;
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 segundos

const connectDB = async () => {
  try {
    console.log(`[MongoDB] Tentando conectar (tentativa ${retryCount + 1}/${MAX_RETRIES})`);
    console.log(`[MongoDB] Connection string: ${process.env.MONGODB_URI ? 'Configurada' : 'NÃO CONFIGURADA'}`);
    
    const options = {
      serverSelectionTimeoutMS: 30000, // Aumentado de 10s para 30s
      socketTimeoutMS: 60000, // Aumentado de 45s para 60s
      connectTimeoutMS: 30000, // Timeout de conexão
      dbName: 'agendamento-servicos',
      // Opções adicionais para melhorar estabilidade
      maxPoolSize: 10, // Máximo de conexões no pool
      minPoolSize: 2, // Mínimo de conexões no pool
      retryWrites: true, // Retry de escritas
      retryReads: true, // Retry de leituras
      family: 4, // Forçar IPv4
    };
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✅ Database: ${conn.connection.name}`);
    console.log(`✅ Connection pool: ${conn.connection.readyState} (1=connected)`);
    
    // Reset contador de retry em sucesso
    retryCount = 0;
    
    // Setup listeners para reconexão automática
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB desconectado. Tentando reconectar...');
      retryCount++;
      if (retryCount < MAX_RETRIES) {
        setTimeout(connectDB, RETRY_DELAY);
      }
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB error:', err);
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconectado com sucesso');
      retryCount = 0;
    });
    
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB (tentativa ${retryCount + 1}/${MAX_RETRIES}):`, error.message);
    
    if (error.message.includes('querySrv')) {
      console.error('❌ DNS resolution failed. This might be a network connectivity issue.');
      console.error('   Try: 1) Check your internet connection');
      console.error('        2) Verify the MongoDB Atlas cluster is running');
      console.error('        3) Check if your IP is whitelisted in MongoDB Atlas');
    }
    
    if (error.message.includes('Authentication failed')) {
      console.error('❌ Authentication failed. Check username/password in MONGODB_URI');
    }
    
    if (error.message.includes('ENOTFOUND')) {
      console.error('❌ Host not found. Check MONGODB_URI format');
    }
    
    // Retry automático em produção
    if (process.env.NODE_ENV === 'production' && retryCount < MAX_RETRIES) {
      retryCount++;
      console.log(`🔄 Retrying connection in ${RETRY_DELAY/1000} seconds... (tentativa ${retryCount}/${MAX_RETRIES})`);
      setTimeout(connectDB, RETRY_DELAY);
    } else if (process.env.NODE_ENV !== 'production') {
      // Em desenvolvimento, encerrar após falhas
      process.exit(1);
    } else {
      // Em produção, após exceder retries, não tentar mais
      console.error(`❌ MongoDB connection failed after ${MAX_RETRIES} attempts. Server will continue without database.`);
    }
  }
};

module.exports = connectDB;
