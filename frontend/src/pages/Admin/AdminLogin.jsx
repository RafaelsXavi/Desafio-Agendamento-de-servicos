import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './AdminLogin.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminData', JSON.stringify(response.data.admin));
      
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <h1>Acesso Administrativo</h1>
        <p>Entre com suas credenciais para acessar o painel</p>
        
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@exemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="back-link">
          <a href="/">← Voltar para agendamento</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
