const express = require("express");
const sendResultsController = require("../controller/results.controller");
const router = express.Router();

// Route to send results
router.post("/api/send-results", sendResultsController.sendResults);

// Route to send results by department ID
router.get(
  "/api/results/:departmentId",
  sendResultsController.getResultsByDepartmentId
);

router.get(
  "/api/results/student/:studentId",
  sendResultsController.getResultsByStudentId
);

module.exports = router;
