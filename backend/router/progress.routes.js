// // In your backend file (e.g., server.js, app.js, or progress.routes.js)

// const express = require("express");
// const router = express.Router();

// // POST request for saving progress
// router.post("/api/progress", (req, res) => {
//   const { studentId, title, description, date, status } = req.body;
//   console.log(req.body);

//   // Logic to save the progress in your database goes here
//   // For now, just return a success message for testing
//   res.json({ message: "Progress saved successfully!", data: req.body });
// });

// module.exports = router;

const express = require("express");
const progressController = require("../controller/progress.controller");
const router = express.Router();

// Route to add a new progress report
router.post("/api/progress", progressController.saveProgress);

// Route to get progress reports by student ID
router.get(
  "/api/progress/student/:studentId",
  progressController.getProgressByStudentId
);

// Route to get all progress reports (optional, if needed)
router.get("/api/progress", progressController.getAllProgressReports);

module.exports = router;
