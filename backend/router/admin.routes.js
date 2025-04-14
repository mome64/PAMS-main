const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller");

// Other Routes
router.post("/api/admin", adminController.createAdmin);
router.get("/api/admin", adminController.getAllAdmins);
router.get("/api/admin/:id", adminController.getAdminById);

router.patch(
  "/api/admin/:id",
  adminController.UplodeAdminPhoto,
  adminController.updateAdmin
);

router.patch("/api/admin/password/:id", adminController.changePassword);

router.get("/api/admin/:id/photo", adminController.getAdminPhoto);

module.exports = router;
