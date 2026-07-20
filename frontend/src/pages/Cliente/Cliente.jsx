import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Cliente.css';

const Cliente = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    serviceType: '',
    date: '',
    time: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const serviceTypes = ['Corte de Cabelo', 'Barba', 'Corte + Barba', 'Manicure', 'Pedicure', 'Tratamento'];

  useEffect(() => {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', today);
  }, []);

  useEffect(() => {
    if (formData.date) {
      fetchAvailableSlots(formData.date);
    }
  }, [formData.date]);

  const fetchAvailableSlots = async (date) => {
    try {
      const response = await api.get(`/appointments/available/${date}`);
      setAvailableSlots(response.data.availableSlots);
      setBookedSlots(response.data.bookedSlots || []);
    } catch (err) {
      console.error('Erro ao buscar horários disponíveis:', err);
      // Fallback: mostrar todos os horários como disponíveis em caso de erro
      const businessHours = [];
      for (let hour = 9; hour < 18; hour++) {
        businessHours.push(`${hour.toString().padStart(2, '0')}:00`);
        businessHours.push(`${hour.toString().padStart(2, '0')}:30`);
      }
      setAvailableSlots(businessHours);
      setBookedSlots([]);
      setError('Não foi possível verificar disponibilidade. Todos os horários estão disponíveis.');
    }
  };

  const validateForm = () => {
    if (formData.clientName.length < 3) {
      setError('Nome deve ter pelo menos 3 caracteres');
      return false;
    }

    const phoneClean = formData.phone.replace(/\D/g, '');
    if (phoneClean.length < 10 || phoneClean.length > 11) {
      setError('Telefone inválido');
      return false;
    }

    if (!formData.serviceType) {
      setError('Selecione o tipo de serviço');
      return false;
    }

    if (!formData.date) {
      setError('Selecione a data');
      return false;
    }

    if (!formData.time) {
      setError('Selecione o horário');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/appointments', formData);
      
      setAppointmentDetails(response.data.appointment);
      setShowConfirmation(true);
      setSuccess('Agendamento realizado com sucesso!');
      
      // Reset form
      setFormData({
        clientName: '',
        phone: '',
        serviceType: '',
        date: '',
        time: ''
      });
      setAvailableSlots([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao realizar agendamento');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 0) {
      if (value.length <= 2) {
        value = `(${value}`;
      } else if (value.length <= 7) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      }
    }
    
    setFormData({
      ...formData,
      phone: value
    });
    setError('');
  };

  if (showConfirmation) {
    return (
      <div className="cliente-container">
        <div className="confirmation-card">
          <div className="success-icon">✓</div>
          <h2>Agendamento Confirmado!</h2>
          <div className="appointment-details">
            <p><strong>Cliente:</strong> {appointmentDetails.clientName}</p>
            <p><strong>Telefone:</strong> {appointmentDetails.phone}</p>
            <p><strong>Serviço:</strong> {appointmentDetails.serviceType}</p>
            <p><strong>Data:</strong> {new Date(appointmentDetails.date).toLocaleDateString('pt-BR')}</p>
            <p><strong>Horário:</strong> {appointmentDetails.time}</p>
            <p><strong>Status:</strong> {appointmentDetails.status}</p>
          </div>
          <button 
            className="btn btn-primary" 
            onClick={() => setShowConfirmation(false)}
          >
            Novo Agendamento
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cliente-container">
      <div className="card">
        <h1>Agendamento de Serviços</h1>
        <p>Preencha os dados abaixo para agendar seu serviço</p>
        
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="clientName">Nome Completo *</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefone *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="(00) 00000-0000"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="serviceType">Tipo de Serviço *</label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um serviço</option>
              {serviceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Data *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Horário *</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              disabled={!formData.date || availableSlots.length === 0}
            >
              <option value="">Selecione um horário</option>
              {availableSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {formData.date && availableSlots.length === 0 && (
              <p className="error">Não há horários disponíveis para esta data</p>
            )}
            {formData.date && (
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                {showCalendar ? 'Ocultar Calendário' : 'Ver Calendário de Horários'}
              </button>
            )}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Agendando...' : 'Agendar Serviço'}
          </button>
        </form>

        {showCalendar && formData.date && (
          <div className="calendar-view">
            <h3>Calendário de Horários - {new Date(formData.date).toLocaleDateString('pt-BR')}</h3>
            <div className="calendar-grid">
              {Array.from({ length: 18 }, (_, i) => {
                const hour = 9 + Math.floor(i / 2);
                const minute = i % 2 === 0 ? '00' : '30';
                const timeSlot = `${hour.toString().padStart(2, '0')}:${minute}`;
                const isAvailable = availableSlots.includes(timeSlot);
                const isBooked = bookedSlots.includes(timeSlot);
                
                return (
                  <div 
                    key={timeSlot} 
                    className={`calendar-slot ${isAvailable ? 'available' : 'booked'}`}
                  >
                    <span className="slot-time">{timeSlot}</span>
                    <span className="slot-status">
                      {isAvailable ? 'Disponível' : 'Ocupado'}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="calendar-legend">
              <div className="legend-item">
                <div className="legend-color available"></div>
                <span>Disponível</span>
              </div>
              <div className="legend-item">
                <div className="legend-color booked"></div>
                <span>Ocupado</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cliente;
