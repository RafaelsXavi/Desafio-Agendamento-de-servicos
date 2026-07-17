const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const options = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      dbName: 'agendamento-servicos'
    };
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    if (error.message.includes('querySrv')) {
      console.error('DNS resolution failed. This might be a network connectivity issue.');
      console.error('Try: 1) Check your internet connection');
      console.error('     2) Verify the MongoDB Atlas cluster is running');
      console.error('     3) Check if your IP is whitelisted in MongoDB Atlas');
    }
    process.exit(1);
  }
};

module.exports = connectDB;
