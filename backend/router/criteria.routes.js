const express = require("express");
const router = express.Router();
const criteriaController = require("../controller/criteria.controller");

// Route to update criteria
router.patch("/api/criteria/:id", criteriaController.updateCriteria);

// Route to get criteria
router.get("/api/criteria/:id", criteriaController.getCriteria);

module.exports = router;
