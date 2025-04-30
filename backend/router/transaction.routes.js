const express = require("express");
const router = express.Router();
const transactionController = require("../controller/transaction.Controller");
router.post("/api/transactions", transactionController.createTransaction);
router.get("/api/transactions", transactionController.getAllTransactions);
router.delete("/api/transactions/:id", transactionController.deleteTransaction);

module.exports = router;
