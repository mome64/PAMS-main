const express = require("express");
const departmentController = require("../controller/department.controler");

const router = express.Router();

router.post("/api/department", departmentController.createDepartment);
router.get("/api/department", departmentController.getAllDepartments);
router.get("/api/department/:id", departmentController.getDepartment);
router.patch("/api/department/:id", departmentController.updateDepartment);
router.delete("/api/department/:id", departmentController.deleteDepartment);
router.get("/api/departments/id", departmentController.getDepartmentIds);

module.exports = router;
