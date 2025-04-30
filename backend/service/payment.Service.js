const axios = require("axios");
// Import your database query function
const { query } = require("../config/db.config");
const nodemailer = require("nodemailer");

async function saveTransaction(tx_ref) {
  try {
    // 1. Verify the transaction from Chapa
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer CHASECK_TEST-SkGbDjlClafdP3qezBthpYzoe5tC3Sdj`,
        },
      }
    );

    const transaction = response.data;

    // 2. Check if the transaction is successful
    if (
      transaction.status === "success" &&
      transaction.data.status === "success"
    ) {
      const data = transaction.data;

      const {
        first_name,
        last_name,
        email,
        phone_number,
        currency = "ETB",
        amount,
        status = "success",
        tx_ref,
      } = data;

      // 3. Insert into database
      await query(
        "INSERT INTO transactions (first_name, last_name, email, phone_number, currency, amount, status, tx_ref) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          first_name,
          last_name,
          email,
          transaction.data.tx_ref.split("_")[1],
          currency,
          amount,
          status,
          tx_ref,
        ]
      );

      // 4. After success ➡ Send notification email
      await sendPaymentSuccessEmail(email, first_name, amount);

      // 5. Return success
      return {
        status: true,
        message: "Transaction verified, saved, and notification sent",
        transactionData: data,
      };
    } else {
      return {
        status: false,
        message: "Transaction verification failed",
        details: transaction.data,
      };
    }
  } catch (error) {
    console.error("Error in payment service:", error.message);
    throw new Error("Unable to verify or save transaction");
  }
}

// --- 📩 Email Sending Function ---
async function sendPaymentSuccessEmail(email, firstName, amount) {
  try {
    // 1. Create Transporter (use your SMTP or Gmail settings)
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use SMTP settings
      auth: {
        user: "bamsib744@gmail.com", // Your Gmail email address
        pass: "phgt xsht ficd lqbf", // Your Gmail password
      },
    });

    // 2. Email Options
    const mailOptions = {
      from: '"Your Website Name" <bamsib744@gmail.com>',
      to: "mesoudmohammed393@gmail.com",
      subject: "Payment Successful 🎉",
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
         
          
          <h2 style="font-size: 24px; font-weight: 600; color: #111827; margin-bottom: 16px;">
            Hello ${firstName},
          </h2>
          
          <p style="font-size: 18px; color: #374151; margin-top: 16px; line-height: 1.5;">
            Thank you for your payment of <strong style="color: #2563eb;">${amount} ETB</strong>!
          </p>
          
          <p style="font-size: 18px; color: #374151; margin-top: 16px; line-height: 1.5;">
            Your transaction was successful. Here's your receipt:
          </p>
          
          <!-- Receipt Box -->
          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; margin: 20px 0;">
            <p style="font-weight: 600; margin-bottom: 8px;">Payment Details:</p>
            <p style="margin: 4px 0;">Amount: ${amount} ETB</p>
            <p style="margin: 4px 0;">Date: ${new Date().toLocaleDateString()}</p>
            <p style="margin: 4px 0;">Transaction ID: #${Math.random()
              .toString(36)
              .substr(2, 9)
              .toUpperCase()}</p>
          </div>
          
          <p style="font-size: 18px; color: #374151; margin-top: 16px; line-height: 1.5;">
            If you have any questions, reply to this email or contact our support team.
          </p>
          
          <br/>
          
          <p style="font-size: 18px; color: #374151; margin-top: 24px; line-height: 1.5;">
            Best Regards,<br/>
            <span style="font-weight: 600; color: #1f2937;">Your Website Team</span>
          </p>
          
          <!-- Footer -->
          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 14px; color: #6b7280;">
            <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
            <p style="margin-top: 8px;">
              <a href="https://yourwebsite.com" style="color: #2563eb; text-decoration: none;">Visit our website</a> | 
              <a href="https://yourwebsite.com/contact" style="color: #2563eb; text-decoration: none;">Contact Us</a>
            </p>
          </div>
        </div>
      `,
    };
    // 3. Send Email
    await transporter.sendMail(mailOptions);
    console.log(`Payment success email sent to ${email}`);
  } catch (error) {
    console.error("Error sending payment success email:", error.message);
  }
}

// Fetch all transactions
async function fetchAllTransactions() {
  try {
    const transactions = await query("SELECT * FROM transactions");

    return {
      status: true,
      message: "Transactions fetched successfully",
      data: transactions,
    };
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    return {
      status: false,
      message: "Failed to fetch transactions",
      error: error.message,
    };
  }
}

module.exports = { saveTransaction, fetchAllTransactions };
