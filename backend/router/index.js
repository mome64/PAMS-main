const express = require("express");
const router = express.Router();

const installRouter = require("./install.routes");
const studentRouter = require("./student.routes");
const adminRouter = require("./admin.routes");
const acadamicRouter = require("./acadamic.routes");
const companyRouter = require("./company.routes");
const departmentRouter = require("./department.routes");
const loginRouter = require("./login.routes");
const criteriaRouter = require("./criteria.routes");
const placementRouter = require("./placement.routes");
const resultRouter = require("./result.routes");
const progressRouter = require("./progress.routes"); // Adjust the path accordingly
const PaymentRouter = require("./payment.routes");
const transaction = require("./transaction.routes");
router.use(installRouter);
router.use(progressRouter);
router.use(PaymentRouter);
router.use(studentRouter);
router.use(adminRouter);
router.use(companyRouter);
router.use(departmentRouter);
router.use(loginRouter);
router.use(criteriaRouter);
router.use(placementRouter);
router.use(resultRouter);
router.use(acadamicRouter);
router.use(transaction);

module.exports = router;
