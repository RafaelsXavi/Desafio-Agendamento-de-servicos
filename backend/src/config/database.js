const mongoose = require('mongoose');

const connectDB = async () => {
  try {
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
    };
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    console.log(`Connection pool: ${conn.connection.readyState} (1=connected)`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    if (error.message.includes('querySrv')) {
      console.error('DNS resolution failed. This might be a network connectivity issue.');
      console.error('Try: 1) Check your internet connection');
      console.error('     2) Verify the MongoDB Atlas cluster is running');
      console.error('     3) Check if your IP is whitelisted in MongoDB Atlas');
    }
    // Não encerrar o processo em produção - permitir que o servidor responda health check
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
