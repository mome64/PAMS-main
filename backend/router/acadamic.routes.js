const express = require("express");
const router = express.Router();
const adminController = require("../controller/acadamic.controller");

// Other Routes
router.post("/api/acadamic", adminController.createAdmin);
router.get("/api/acadamic", adminController.getAllAdmins);
router.get("/api/acadamic/:id", adminController.getAdminById);

router.patch(
  "/api/acadamic/:id",
  adminController.UplodeAdminPhoto,
  adminController.updateAdmin
);

router.patch("/api/acadamic/password/:id", adminController.changePassword);

router.get("/api/acadamic/:id/photo", adminController.getAdminPhoto);

module.exports = router;
