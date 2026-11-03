const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Protected API
router.get('/:studentId/attendances', verifyToken, studentController.getStudentAttendances);

module.exports = router;