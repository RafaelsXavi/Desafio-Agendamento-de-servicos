const Appointment = require('../models/Appointment');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private (Admin)
const getAppointments = async (req, res) => {
  try {
    const { startDate, endDate, status, serviceType } = req.query;

    let query = {};

    // Filter by date range
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by service type
    if (serviceType) {
      query.serviceType = serviceType;
    }

    const appointments = await Appointment.find(query).sort({ date: 1, time: 1 });

    res.json({
      success: true,
      count: appointments.length,
      appointments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private (Admin)
const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }

    res.json({
      success: true,
      appointment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
const createAppointment = async (req, res) => {
  try {
    const { clientName, phone, serviceType, date, time } = req.body;

    // Validate required fields
    if (!clientName || !phone || !serviceType || !date || !time) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios' });
    }

    // Check if date is in the past
    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (appointmentDate < today) {
      return res.status(400).json({ message: 'Não é possível agendar para datas passadas' });
    }

    // Check if time slot is already taken
    const existingAppointment = await Appointment.findOne({
      date: appointmentDate,
      time,
      status: { $ne: 'Cancelado' }
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'Horário já está ocupado' });
    }

    // Create appointment
    const appointment = await Appointment.create({
      clientName,
      phone,
      serviceType,
      date: appointmentDate,
      time,
      status: 'Agendado',
      statusHistory: [{
        status: 'Agendado',
        changedAt: new Date(),
        changedBy: 'Cliente'
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Agendamento realizado com sucesso',
      appointment
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Horário já está ocupado' });
    }
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private (Admin)
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['Agendado', 'Confirmado', 'Concluído', 'Cancelado'].includes(status)) {
      return res.status(400).json({ message: 'Status inválido' });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }

    // Add to status history
    appointment.statusHistory.push({
      status,
      changedAt: new Date(),
      changedBy: req.admin.email
    });

    appointment.status = status;
    await appointment.save();

    res.json({
      success: true,
      message: 'Status atualizado com sucesso',
      appointment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private (Admin)
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }

    await appointment.deleteOne();

    res.json({
      success: true,
      message: 'Agendamento excluído com sucesso'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// @desc    Get available time slots for a date
// @route   GET /api/appointments/available/:date
// @access  Public
const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.params;

    // Define business hours (9:00 to 18:00)
    const businessHours = [];
    for (let hour = 9; hour < 18; hour++) {
      businessHours.push(`${hour.toString().padStart(2, '0')}:00`);
      businessHours.push(`${hour.toString().padStart(2, '0')}:30`);
    }

    // Get booked slots for the date
    const bookedAppointments = await Appointment.find({
      date: new Date(date),
      status: { $ne: 'Cancelado' }
    });

    const bookedSlots = bookedAppointments.map(app => app.time);

    // Filter available slots
    const availableSlots = businessHours.filter(slot => !bookedSlots.includes(slot));

    res.json({
      success: true,
      availableSlots,
      bookedSlots
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// @desc    Get statistics
// @route   GET /api/appointments/stats
// @access  Private (Admin)
const getStatistics = async (req, res) => {
  try {
    const total = await Appointment.countDocuments();
    const concluded = await Appointment.countDocuments({ status: 'Concluído' });
    const cancelled = await Appointment.countDocuments({ status: 'Cancelado' });
    const scheduled = await Appointment.countDocuments({ status: 'Agendado' });
    const confirmed = await Appointment.countDocuments({ status: 'Confirmado' });

    const completionRate = total > 0 ? ((concluded / total) * 100).toFixed(2) : 0;

    res.json({
      success: true,
      statistics: {
        total,
        concluded,
        cancelled,
        scheduled,
        confirmed,
        completionRate
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getAvailableSlots,
  getStatistics
};
