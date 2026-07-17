const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Por favor, forneça email e senha' });
    }

    // Check for admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Check password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Create token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

module.exports = { login };
