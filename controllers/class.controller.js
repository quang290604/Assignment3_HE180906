const mongoose = require('mongoose');
const Class = require('../models/class.model');
const Student = require('../models/student.model');

exports.getStudentsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const { status } = req.query;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ error: "Invalid ObjectId" });
    }

    // Validate Query Param status
    if (!status || !['enrolled', 'dropped'].includes(status)) {
      return res.status(400).json({ error: `Invalid status: ${status}` });
    }

    // Check Class existence
    const classObj = await Class.findById(classId);
    if (!classObj) {
      return res.status(404).json({ error: `Class with id ${classId} not found` });
    }

    // Filter enrollments and get student info
    const filteredEnrollments = classObj.enrollments.filter(e => e.status === status);
    const studentIds = filteredEnrollments.map(e => e.studentId);

    const students = await Student.find({ _id: { $in: studentIds } });

    const result = students.map(s => ({
      id: s._id.toString(),
      studentCode: s.studentCode,
      fullName: s.fullName,
      email: s.email
    }));

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};