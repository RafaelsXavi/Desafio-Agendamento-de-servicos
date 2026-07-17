import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: '',
    serviceType: ''
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();

  const serviceTypes = ['Corte de Cabelo', 'Barba', 'Corte + Barba', 'Manicure', 'Pedicure', 'Tratamento'];
  const statusOptions = ['Agendado', 'Confirmado', 'Concluído', 'Cancelado'];

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (appointments.length > 0) {
      fetchFilteredAppointments();
    }
  }, [filters]);

  const fetchData = async () => {
    try {
      const [appointmentsRes, statsRes] = await Promise.all([
        api.get('/appointments'),
        api.get('/appointments/stats')
      ]);

      setAppointments(appointmentsRes.data.appointments);
      setStatistics(statsRes.data.statistics);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        navigate('/admin/login');
      } else {
        setError('Erro ao carregar dados');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredAppointments = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.status) params.append('status', filters.status);
      if (filters.serviceType) params.append('serviceType', filters.serviceType);

      const response = await api.get(`/appointments?${params.toString()}`);
      setAppointments(response.data.appointments);
    } catch (err) {
      console.error('Erro ao filtrar agendamentos:', err);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      status: '',
      serviceType: ''
    });
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await api.put(`/appointments/${appointmentId}/status`, { status: newStatus });
      
      setAppointments(appointments.map(app => 
        app._id === appointmentId 
          ? { ...app, status: newStatus }
          : app
      ));

      // Refresh statistics
      const statsRes = await api.get('/appointments/stats');
      setStatistics(statsRes.data.statistics);
    } catch (err) {
      setError('Erro ao atualizar status');
    }
  };

  const handleDeleteClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/appointments/${selectedAppointment._id}`);
      
      setAppointments(appointments.filter(app => app._id !== selectedAppointment._id));
      setShowDeleteModal(false);
      setSelectedAppointment(null);

      // Refresh statistics
      const statsRes = await api.get('/appointments/stats');
      setStatistics(statsRes.data.statistics);
    } catch (err) {
      setError('Erro ao excluir agendamento');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Agendado': return '#ffc107';
      case 'Confirmado': return '#007bff';
      case 'Concluído': return '#28a745';
      case 'Cancelado': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>📋 Painel do Barbeiro</h1>
          <p>Gerencie seus agendamentos e visualize sua agenda</p>
        </div>
        <button className="btn btn-danger" onClick={handleLogout}>
          Sair
        </button>
      </header>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Statistics Cards */}
      {statistics && (
        <div className="statistics-grid">
          <div className="stat-card">
            <h3>Total de Agendamentos</h3>
            <p className="stat-number">{statistics.total}</p>
          </div>
          <div className="stat-card">
            <h3>Concluídos</h3>
            <p className="stat-number">{statistics.concluded}</p>
          </div>
          <div className="stat-card">
            <h3>Confirmados</h3>
            <p className="stat-number">{statistics.confirmed}</p>
          </div>
          <div className="stat-card">
            <h3>Agendados</h3>
            <p className="stat-number">{statistics.scheduled}</p>
          </div>
          <div className="stat-card">
            <h3>Cancelados</h3>
            <p className="stat-number">{statistics.cancelled}</p>
          </div>
          <div className="stat-card">
            <h3>Taxa de Conclusão</h3>
            <p className="stat-number">{statistics.completionRate}%</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="filters-section">
        <h2>Filtros</h2>
        <div className="filters-grid">
          <div className="form-group">
            <label>Data Inicial</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group">
            <label>Data Final</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Tipo de Serviço</label>
            <select
              name="serviceType"
              value={filters.serviceType}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              {serviceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn btn-secondary" onClick={clearFilters}>
          Limpar Filtros
        </button>
      </div>

      {/* Appointments Section */}
      <div className="appointments-section">
        <div className="section-header">
          <h2>Agendamentos ({appointments.length})</h2>
          <div className="view-toggle">
            <button 
              className={`btn ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('table')}
            >
              📋 Lista
            </button>
            <button 
              className={`btn ${viewMode === 'calendar' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('calendar')}
            >
              📅 Calendário
            </button>
          </div>
        </div>
        
        {viewMode === 'table' ? (
          <>
            {appointments.length === 0 ? (
              <p className="no-appointments">Nenhum agendamento encontrado</p>
            ) : (
              <div className="table-responsive">
                <table className="appointments-table">
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Telefone</th>
                      <th>Serviço</th>
                      <th>Data</th>
                      <th>Horário</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map(appointment => (
                      <tr key={appointment._id}>
                        <td>{appointment.clientName}</td>
                        <td>{appointment.phone}</td>
                        <td>{appointment.serviceType}</td>
                        <td>{new Date(appointment.date).toLocaleDateString('pt-BR')}</td>
                        <td>{appointment.time}</td>
                        <td>
                          <select
                            value={appointment.status}
                            onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                            className="status-select"
                            style={{ backgroundColor: getStatusColor(appointment.status) }}
                          >
                            {statusOptions.map(status => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteClick(appointment)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="calendar-date-selector">
              <label>Selecione a data:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-input"
              />
            </div>
            
            <div className="barber-calendar-view">
              <h3>Agenda do Dia - {new Date(selectedDate).toLocaleDateString('pt-BR')}</h3>
              <div className="barber-calendar-grid">
                {Array.from({ length: 18 }, (_, i) => {
                  const hour = 9 + Math.floor(i / 2);
                  const minute = i % 2 === 0 ? '00' : '30';
                  const timeSlot = `${hour.toString().padStart(2, '0')}:${minute}`;
                  
                  const appointment = appointments.find(
                    app => new Date(app.date).toISOString().split('T')[0] === selectedDate && 
                           app.time === timeSlot && 
                           app.status !== 'Cancelado'
                  );
                  
                  return (
                    <div 
                      key={timeSlot} 
                      className={`barber-calendar-slot ${appointment ? 'occupied' : 'available'}`}
                    >
                      <div className="slot-header">
                        <span className="slot-time">{timeSlot}</span>
                        <span className={`slot-badge ${appointment ? 'occupied' : 'available'}`}>
                          {appointment ? 'Ocupado' : 'Disponível'}
                        </span>
                      </div>
                      {appointment && (
                        <div className="slot-appointment">
                          <p className="appointment-client">{appointment.clientName}</p>
                          <p className="appointment-service">{appointment.serviceType}</p>
                          <p className="appointment-phone">{appointment.phone}</p>
                          <div className="appointment-status">
                            <select
                              value={appointment.status}
                              onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                              className="status-select-sm"
                              style={{ backgroundColor: getStatusColor(appointment.status) }}
                            >
                              {statusOptions.map(status => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir o agendamento de {selectedAppointment?.clientName}?</p>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDeleteConfirm}
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
