const express = require("express");
const placementController = require("../controller/placement.controller");
const router = express.Router();

// Route to add placement result
router.post("/api/placement", placementController.addPlacementResult);

// Route to fetch placement results for a specific student
router.get("/api/placement/:studentId", placementController.getPlacementResult);

router.get(
  "/api/all/placement/:departmentId",
  placementController.getAllPlacementResultsByDepartment
);
router.get(
  "/api/students/send/:companyId",
  placementController.getAllPlacementResultsByCompanyId
);

module.exports = router;
