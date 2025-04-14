const nodemailer = require("nodemailer");

// Function to send email to the company with login credentials
async function sendEmail(name, email, username, password) {
  try {
    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bamsib744@gmail.com", // Your Gmail email address
        pass: "phgt xsht ficd lqbf", // Your Gmail password
      },
    });

    // Email content with inline CSS styles
    const mailOptions = {
      from: "bamsib744@gmail.com",
      to: email,
      subject: "Welcome to Our Company",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; border-radius: 10px; width: 80%; margin: 0 auto;">
          <h1 style="color: #333;  margin-bottom: 20px;">Welcome to Our System!</h1>
          <p style="color: #555;">Hi ${name},</p>
          <p style="color: #555;">Your account has been successfully created.</p>
          <p style="color: #555; ">Username:<span style="font-weight: bold; color: #7DC400;"> ${username}</span></p>
          <p style="color: #555; font-weight: bold;">Password:<span style="font-weight: bold; color: #7DC400;"> ${password}</span> </p>
          <p style="color: #555;">Thank you for joining us!</p>
          <div style=" margin-top: 30px;">
            <a href="http://localhost:5173/login" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Login Here</a>
          </div>
          <p style="color: #777; margin-top: 10px;">For security reasons, please log in and change your password as soon as possible.</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

module.exports = {
  sendEmail,
};
