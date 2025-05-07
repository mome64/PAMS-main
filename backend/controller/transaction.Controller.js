const transactionService = require("../service/transaction.Service");

async function createTransaction(req, res) {
  try {
    const { department, amount, collage } = req.body;

    const result = await transactionService.createTransaction(
      department,
      amount,
      collage
    );

    res.status(201).json({
      status: true,
      message: "Transaction inserted successfully",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error("Error creating transaction:", error.message);
    res.status(500).json({ status: false, error: error.message });
  }
}

async function getAllTransactions(req, res) {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.status(200).json({ status: true, data: transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    res.status(500).json({ status: false, error: "Internal server error" });
  }
}

async function deleteTransaction(req, res) {
  const { id } = req.params;

  try {
    const result = await transactionService.deleteTransaction(id);

    res.status(200).json({
      status: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Delete controller error:", error.message);
    res.status(500).json({
      status: false,
      error: error.message || "Internal server error",
    });
  }
}

module.exports = {
  createTransaction,
  getAllTransactions,
  deleteTransaction,
  // other methods
};
