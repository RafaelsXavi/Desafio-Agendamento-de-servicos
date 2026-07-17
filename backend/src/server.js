const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const Admin = require('./models/Admin');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Create default admin if not exists
const createDefaultAdmin = async () => {
  try {
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

const PORT = process.env.PORT || 5000;

// Start server and create admin
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await createDefaultAdmin();
});
