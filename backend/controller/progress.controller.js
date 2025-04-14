const progressService = require("../service/progress.service"); // Import the progress service

// Controller method to save a new progress report
async function saveProgress(req, res) {
  try {
    const formData = req.body; // Get the data from the request body

    // Call the progress service to save the progress report
    await progressService.saveProgress(formData);

    return res.status(201).json({
      status: true,
      message: "Progress report saved successfully",
    });
  } catch (error) {
    console.error("Error saving progress report:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}

// Controller method to fetch progress reports by student ID
async function getProgressByStudentId(req, res) {
  try {
    const studentId = req.params.studentId; // Get the student ID from the request parameters
   

    // Call the progress service to fetch progress reports by student ID
    const progressReports = await progressService.getProgressByStudentId(
      studentId
    );

    return res.status(200).json({
      status: true,
      progressReports,
    });
  } catch (error) {
    console.error("Error fetching progress reports by student ID:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}

// Controller method to fetch all progress reports
async function getAllProgressReports(req, res) {
  try {
    // Call the progress service to fetch all progress reports
    const progressReports = await progressService.getAllProgressReports();

    return res.status(200).json({
      status: true,
      progressReports,
    });
  } catch (error) {
    console.error("Error fetching all progress reports:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}

module.exports = {
  saveProgress,
  getProgressByStudentId,
  getAllProgressReports,
};
