const paymentService = require("../service/payment.Service");

async function chapaCallback(req, res) {
  const { tx_ref } = req.query;

  // console.log("Received tx_ref:", tx_ref);

  if (!tx_ref) {
    return res.status(400).json({
      status: false,
      message: "Missing tx_ref in the request query.",
    });
  }

  try {
    // Verify transaction and insert into database
    const result = await paymentService.saveTransaction(tx_ref);

    if (result.status) {
      return res.status(200).json({
        status: true,
        message: "Payment verified and saved successfully",
        data: result.transactionData, // returning the saved transaction data
      });
    } else {
      return res.status(400).json({
        status: false,
        message: result.message,
        details: result.details,
      });
    }
  } catch (error) {
    console.error("Error in chapaCallback:", error.message);
    return res.status(500).json({
      status: false,
      message: "Server Error: Unable to process the payment",
      error: error.message,
    });
  }
}
// Fetch all transactions
async function getAllTransactions(req, res) {
  try {
    const result = await paymentService.fetchAllTransactions();

    if (result.status) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error("Error in getAllTransactions:", error.message);
    return res.status(500).json({
      status: false,
      message: "Server Error: Unable to fetch transactions",
      error: error.message,
    });
  }
}
module.exports = { chapaCallback, getAllTransactions };
