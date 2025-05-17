const { query } = require("../config/db.config");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
async function loginStudent(username, password) {
  try {
    const sql = "SELECT * FROM students WHERE username = ?";
    const [student] = await query(sql, [username]);

    if (!student) {
      return null; // User not found
    }

    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      return { invalidPassword: true }; // Incorrect password
    }
    console.log(student);
    return {
      id: student.student_id,
      key: "student_id",
      user: student,
    };
  } catch (error) {
    console.error("Error logging in student:", error.message);
    throw error;
  }
}

async function loginAdmin(username, password) {
  try {
    const sql = "SELECT * FROM admins WHERE username = ?";
    const [admin] = await query(sql, [username]);

    if (!admin) {
      return null; // User not found
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return { invalidPassword: true }; // Incorrect password
    }

    return {
      id: admin.admin_id,
      key: "admin_id",
      user: admin,
    };
  } catch (error) {
    console.error("Error logging in admin:", error.message);
    throw error;
  }
}
async function loginAcadamic(username, password) {
  try {
    const sql = "SELECT * FROM acadamic WHERE username = ?";
    const [admin] = await query(sql, [username]);

    if (!admin) {
      return null; // User not found
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return { invalidPassword: true }; // Incorrect password
    }
    console.log(admin);
    return {
      id: admin.acadamic_id,
      key: "acadamic_id",
      user: admin,
    };
  } catch (error) {
    console.error("Error logging in admin:", error.message);
    throw error;
  }
}
async function loginCompany(username, password) {
  try {
    const sql = "SELECT * FROM companies WHERE username = ?";
    const [company] = await query(sql, [username]);

    if (!company) {
      return null; // User not found
    }

    const match = await bcrypt.compare(password, company.password);
    if (!match) {
      return { invalidPassword: true }; // Incorrect password
    }

    return {
      id: company.company_id,
      key: "company_id",
      user: company,
    };
  } catch (error) {
    console.error("Error logging in company:", error.message);
    throw error;
  }
}

async function loginDepartment(username, password) {
  try {
    const sql = "SELECT * FROM departments WHERE username = ?";
    const [department] = await query(sql, [username]);

    if (!department) {
      return null; // User not found
    }

    const match = await bcrypt.compare(password, department.password);
    if (!match) {
      return { invalidPassword: true }; // Incorrect password
    }

    return {
      id: department.department_id,
      key: "department_id",
      user: department,
    };
  } catch (error) {
    console.error("Error logging in department:", error.message);
    throw error;
  }
}

// Function to send password via email (using your template style)
async function sendPasswordEmail(name, email, username, password, userType) {
  console.log(name, email, username, password, userType);
  try {
    // Configure nodemailer transporter (using your Gmail example)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bamsib744@gmail.com", // Your Gmail email address
        pass: "phgt xsht ficd lqbf", // Your Gmail password
      },
    });

    // Email content with inline CSS styles (adapted from your template)
    const mailOptions = {
      from: "bamsib744@gmail.com",
      to: email,
      subject: `${userType} Account Password Recovery`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; border-radius: 10px; width: 80%; margin: 0 auto;">
          <h1 style="color: #333; margin-bottom: 20px;">Password Recovery</h1>
          <p style="color: #555;">Hi ${name},</p>
          <p style="color: #555;">Here are your ${userType} account credentials:</p>
          <p style="color: #555;">Username: <span style="font-weight: bold; color: #7DC400;">${username}</span></p>
          <p style="color: #555;">Password: <span style="font-weight: bold; color: #7DC400;">${password}</span></p>
          <div style="margin-top: 30px;">
            <a href="http://localhost:5173/login" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Login Here</a>
          </div>
          <p style="color: #777; margin-top: 30px; font-weight: bold;">
            For security reasons, please change your password after logging in.
          </p>
          <p style="color: #ff0000; font-size: 12px;">
            If you didn't request this, please secure your account immediately.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Password email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending password email:", error);
    throw error;
  }
}

// Student Password Retrieval
async function forgotStudentPassword(username, email) {
  console.log(username, email);
  try {
    // 1. Verify student exists
    const [student] = await query(
      "SELECT student_id as id, username FROM students WHERE username = ? AND contact_email = ?",
      [username, email]
    );

    if (!student) return null;

    // 2. Generate secure random password (12 characters: letters + numbers)
    const newPassword = crypto
      .randomBytes(9)
      .toString("base64") // ~12 chars
      .replace(/[+/]/g, "")
      .slice(0, 12);

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Update database
    await query("UPDATE students SET password = ? WHERE student_id = ?", [
      hashedPassword,
      student.id,
    ]);

    // 5. Send email with temporary password
    await sendPasswordEmail(
      "Student", // Generic name since we don't use first_name
      email,
      username,
      newPassword,
      "Student"
    );

    return { success: true };
  } catch (error) {
    console.error("Password reset error:", error);
    throw error;
  }
}

// Helper function for password generation
const generateTempPassword = () => {
  return crypto
    .randomBytes(9)
    .toString("base64")
    .replace(/[+/]/g, "")
    .slice(0, 6);
};

// Admin Password Reset
async function forgotAdminPassword(username, email) {
  try {
    const [admin] = await query(
      "SELECT admin_id as id, first_name, username FROM admins WHERE username = ? AND email = ?",
      [username, email]
    );

    if (!admin) return null;

    const newPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await query("UPDATE admins SET password = ? WHERE admin_id = ?", [
      hashedPassword,
      admin.id,
    ]);

    await sendPasswordEmail(
      admin.first_name,
      email,
      admin.username,
      newPassword,
      "Admin"
    );
    return { success: true };
  } catch (error) {
    console.error("Admin password reset error:", error);
    throw error;
  }
}

// Company Password Reset
async function forgotCompanyPassword(username, email) {
  try {
    const [company] = await query(
      "SELECT company_id as id, company_name as name, username FROM companies WHERE username = ? AND contact_email = ?",
      [username, email]
    );

    if (!company) return null;

    const newPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await query("UPDATE companies SET password = ? WHERE company_id = ?", [
      hashedPassword,
      company.id,
    ]);

    await sendPasswordEmail(
      company.name,
      email,
      company.username,
      newPassword,
      "Company"
    );
    return { success: true };
  } catch (error) {
    console.error("Company password reset error:", error);
    throw error;
  }
}

// Department Password Reset
async function forgotDepartmentPassword(username, email) {
  try {
    const [dept] = await query(
      "SELECT department_id as id, department_name as name, username FROM departments WHERE username = ? AND contact_email = ?",
      [username, email]
    );

    if (!dept) return null;

    const newPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await query("UPDATE departments SET password = ? WHERE department_id = ?", [
      hashedPassword,
      dept.id,
    ]);

    await sendPasswordEmail(
      dept.name,
      email,
      dept.username,
      newPassword,
      "Department"
    );
    return { success: true };
  } catch (error) {
    console.error("Department password reset error:", error);
    throw error;
  }
}

// Academic Password Reset
async function forgotAcadamicPassword(username, email) {
  try {
    const [academic] = await query(
      "SELECT acadamic_id as id, full_name, username FROM acadamic WHERE username = ? AND email = ?",
      [username, email]
    );

    if (!academic) return null;

    const newPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await query("UPDATE acadamic SET password = ? WHERE acadamic_id = ?", [
      hashedPassword,
      academic.id,
    ]);

    await sendPasswordEmail(
      academic.full_name,
      email,
      academic.username,
      newPassword,
      "Academic"
    );
    return { success: true };
  } catch (error) {
    console.error("Academic password reset error:", error);
    throw error;
  }
}
module.exports = {
  forgotStudentPassword,
  forgotAdminPassword,
  forgotCompanyPassword,
  forgotDepartmentPassword,
  forgotAcadamicPassword,
  loginStudent,
  loginAdmin,
  loginCompany,
  loginDepartment,
  loginAcadamic,
};
