const resultService = require("../service/result.service");

async function sendResults(req, res) {
  try {
    const formData = req.body;

    await resultService.saveResults(formData);

    return res.status(201).json({
      status: true,
      message: "Results sent successfully",
    });
  } catch (error) {
    console.error("Error sending results:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getResultsByDepartmentId(req, res) {
  try {
    const departmentId = req.params.departmentId;

    // Call the service method to fetch results by department ID
    const results = await resultService.getResultsByDepartmentId(departmentId);

    return res.status(200).json({
      status: true,
      results,
    });
  } catch (error) {
    console.error("Error fetching results by department ID:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getResultsByStudentId(req, res) {
  try {
    const studentId = req.params.studentId;

    // Call the service method to fetch results by student ID
    const results = await resultService.getResultsByStudentId(studentId);

    return res.status(200).json({
      status: true,
      results,
    });
  } catch (error) {
    console.error("Error fetching results by student ID:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function submitGrades(req, res) {
  const { grades } = req.body;
  console.log(grades);
  if (!grades || !Array.isArray(grades)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid grade data" });
  }

  try {
    await resultService.submitGrades(grades);
    res
      .status(200)
      .json({ success: true, message: "Grades submitted successfully" });
  } catch (error) {
    console.error("Error in submitGrades controller:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting grades",
    });
  }
}
async function getGrades(req, res) {
  try {
    const grades = await resultService.fetchAllGrades();
    res.status(200).json({
      success: true,
      data: grades,
    });
  } catch (error) {
    console.error("Error fetching grades:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching grades",
    });
  }
}

module.exports = {
  sendResults,
  getGrades,
  submitGrades,
  getResultsByDepartmentId,
  getResultsByStudentId,
};
