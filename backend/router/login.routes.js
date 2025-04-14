const express = require("express");
const loginController = require("../controller/login.controller");

const router = express.Router();

router.post("/api/login", loginController.logIn);

module.exports = router;
