const express = require("express");
const installController = require("../controller/install.controller");
const router = express.Router();

router.get("/install", installController.install);

module.exports = router;
