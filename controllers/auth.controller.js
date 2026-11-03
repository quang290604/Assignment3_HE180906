const jwt = require('jsonwebtoken');
const Student = require('../models/student.model');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: 'Email and password are required' });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const codeLower = student.studentCode.toLowerCase();
    const codeUpper = student.studentCode.toUpperCase();
    if (password !== `${codeLower}@123` && password !== `${codeUpper}@123`) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        studentId: student._id.toString(),
        studentCode: student.studentCode,
        email: student.email
      },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};