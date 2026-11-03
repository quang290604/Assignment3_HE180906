const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/:classId/students', classController.getStudentsByClass);

module.exports = router;