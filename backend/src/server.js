const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const Admin = require('./models/Admin');
const keepAlive = require('./utils/keepAlive');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Create default admin if not exists
const createDefaultAdmin = async () => {
  try {
    // Verificar se está conectado ao MongoDB antes de tentar criar admin
    if (mongoose.connection.readyState !== 1) {
      console.log('Skipping admin creation: MongoDB not connected');
      return;
    }
    
    const adminExists = await Admin.findOne({ email: 'admin@test.com' });
    if (!adminExists) {
      await Admin.create({
        email: 'admin@test.com',
        password: 'admin123'
      });
      console.log('Default admin created: admin@test.com / admin123');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/auth', require('./routes/auth'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Sistema de Agendamento de Serviços - API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      appointments: '/api/appointments',
      auth: '/api/auth'
    },
    status: 'operational'
  });
});

// Health check endpoint for Render monitoring
app.get('/health', async (req, res) => {
  try {
    // Verificar conexão com MongoDB
    const mongoState = mongoose.connection.readyState;
    const mongoStates = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    const healthData = {
      status: mongoState === 1 ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      mongodb: {
        state: mongoStates[mongoState],
        readyState: mongoState
      }
    };
    
    // Se MongoDB não estiver conectado, retorna degraded mas ainda 200
    // Isso permite que o Render continue monitorando
    const statusCode = mongoState === 1 ? 200 : 200;
    
    res.status(statusCode).json(healthData);
  } catch (error) {
    // Mesmo com erro, retorna 200 para não falhar o health check do Render
    res.status(200).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;

// Start server and create admin
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  // Aguardar um pouco para garantir conexão com MongoDB
  setTimeout(async () => {
    await createDefaultAdmin();
    
    // Iniciar keep-alive para evitar spin-down no Render
    keepAlive();
    console.log('Keep-alive service started');
  }, 2000);
});
