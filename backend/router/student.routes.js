const express = require("express");
const studentController = require("../controller/student.controller");

const router = express.Router();

router.post("/api/student", studentController.createStudent);
router.post("/api/student/apply", studentController.acceptStudentApplyForm);

router.get("/api/student", studentController.getAllStudents);
router.get("/api/students/byId/:studentId", studentController.getStudents);
router.get("/api/student/types", studentController.getStudentTypes);
router.get(
  "/api/students/:departmentType",
  studentController.getStudentsByDepartment
);
router.get(
  "/api/students/apply/list/:id",
  studentController.getApplyStudentsById
);
router.get("/api/student/:id/photo", studentController.getStudentPhoto);
router.get("/api/students/apply/list", studentController.getAllApplyStudents);

router.delete("/api/student/:id", studentController.deleteStudent);
router.delete(
  "/api/placement-result",
  studentController.deleteAllPlacementResults
);

router.patch(
  "/api/student/changepassword/:id",
  studentController.changePassword
);
router.patch(
  "/api/student/update/profile/:id",
  studentController.UplodeStudentPhoto,
  studentController.updateStudentProfile
);
router.patch("/api/student/update/:id", studentController.updateStudent);
router.patch(
  "/api/student/apply/update/:studentId",
  studentController.updateStudentApplyForm
);

module.exports = router;
