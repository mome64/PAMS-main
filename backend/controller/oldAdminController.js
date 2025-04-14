// Import necessary dependencies
const studentService = require("../service/student.service");
const departmentService = require("../service/department.service");

async function createStudent(req, res, next) {
  try {
    // Generate the username automatically
    const username = `stud_${req.body.first_name.toLowerCase()}_${req.body.last_name
      .slice(0, 2)
      .toLowerCase()}`;

    // Check if student username already exists
    const studentExists = await studentService.checkIfStudentExists(username);

    if (studentExists) {
      return res.status(400).json({
        error: "This student username already exists!",
      });
    }

    if (!req.body.department_type) {
      return res.status(400).json({
        error: "Department type is required.",
      });
    }

    // Create new student
    const studentId = await studentService.createStudent({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      contact_email: req.body.contact_email,
      password: req.body.password,
      department_type: req.body.department_type,
    });

    return res.status(200).json({
      status: true,
      message: "Student created successfully",
      studentId,
    });
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getStudents(req, res, next) {
  try {
    const studentId = req.params.id;
    const students = await studentService.getStudent(studentId);

    return res.status(200).json({
      status: true,
      students,
    });
  } catch (error) {
    console.error("Error getting students:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getAllStudents(req, res, next) {
  try {
    const students = await studentService.getAllStudents();

    return res.status(200).json({
      status: true,
      students,
    });
  } catch (error) {
    console.error("Error getting students:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function updateStudent(req, res, next) {
  try {
    const studentId = req.params.id;
    const updatedStudent = await studentService.updateStudent(
      studentId,
      req.body
    );

    if (!updatedStudent) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function deleteStudent(req, res, next) {
  try {
    const studentId = req.params.id;
    const deleted = await studentService.deleteStudent(studentId);

    if (!deleted) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  createStudent,
  getStudents,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
