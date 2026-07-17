const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Por favor, forneça o nome do cliente'],
    minlength: [3, 'Nome deve ter pelo menos 3 caracteres'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Por favor, forneça o telefone'],
    validate: {
      validator: function(v) {
        return /^\d{10,11}$/.test(v.replace(/\D/g, ''));
      },
      message: 'Telefone inválido'
    }
  },
  serviceType: {
    type: String,
    required: [true, 'Por favor, selecione o tipo de serviço'],
    enum: ['Corte de Cabelo', 'Barba', 'Corte + Barba', 'Manicure', 'Pedicure', 'Tratamento']
  },
  date: {
    type: Date,
    required: [true, 'Por favor, selecione a data']
  },
  time: {
    type: String,
    required: [true, 'Por favor, selecione o horário'],
    validate: {
      validator: function(v) {
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: 'Horário inválido'
    }
  },
  status: {
    type: String,
    enum: ['Agendado', 'Confirmado', 'Concluído', 'Cancelado'],
    default: 'Agendado'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  statusHistory: [{
    status: String,
    changedAt: {
      type: Date,
      default: Date.now
    },
    changedBy: String
  }]
});

// Index to prevent double booking
appointmentSchema.index({ date: 1, time: 1 }, { unique: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
