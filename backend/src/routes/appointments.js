const express = require('express');
const router = express.Router();
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getAvailableSlots,
  getStatistics
} = require('../controllers/appointmentController');
const { protect } = require('../middlewares/auth');

// Public routes
router.get('/available/:date', getAvailableSlots);
router.post('/', createAppointment);

// Protected routes (Admin only)
router.get('/', protect, getAppointments);
router.get('/stats', protect, getStatistics);
router.get('/:id', protect, getAppointment);
router.put('/:id/status', protect, updateAppointmentStatus);
router.delete('/:id', protect, deleteAppointment);

module.exports = router;
