const db = require("../config/db.config");

async function createTransaction(department, amount, collage) {
  if (!department || isNaN(amount)) {
    throw new Error("Invalid department or amount");
  }

  const sql =
    "INSERT INTO payamout (department, amount,college_name) VALUES (?, ?,?)";
  const result = await db.query(sql, [department, amount, collage]);

  return result;
}

async function getAllTransactions() {
  const sql = "SELECT * FROM payamout ORDER BY created_at DESC";
  const results = await db.query(sql);
  return results;
}

async function deleteTransaction(id) {
  try {
    const sql = "DELETE FROM payamout WHERE id = ?";
    const result = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      throw new Error("Transaction not found");
    }

    return { message: "Transaction deleted successfully" };
  } catch (error) {
    console.error("Error deleting transaction:", error.message);
    throw error;
  }
}

module.exports = {
  createTransaction,
  getAllTransactions,
  deleteTransaction,
  // add more methods here as needed
};
