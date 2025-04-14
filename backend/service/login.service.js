const { query } = require("../config/db.config");
const bcrypt = require("bcrypt");

async function loginStudent(username, password) {
  try {
    const sql = "SELECT student_id, password FROM students WHERE username = ?";
    const [student] = await query(sql, [username]);

    if (!student) {
      return null; // User not found
    }

    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      return { invalidPassword: true }; // Incorrect password
    }

    return {
      id: student.student_id,
      key: "student_id",
    };
  } catch (error) {
    console.error("Error logging in student:", error.message);
    throw error;
  }
}

async function loginAdmin(username, password) {
  try {
    const sql = "SELECT admin_id, password FROM admins WHERE username = ?";
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
    };
  } catch (error) {
    console.error("Error logging in admin:", error.message);
    throw error;
  }
}
async function loginAcadamic(username, password) {
  try {
    const sql = "SELECT acadamic_id, password FROM acadamic WHERE username = ?";
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
    };
  } catch (error) {
    console.error("Error logging in admin:", error.message);
    throw error;
  }
}
async function loginCompany(username, password) {
  try {
    const sql = "SELECT company_id, password FROM companies WHERE username = ?";
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
    };
  } catch (error) {
    console.error("Error logging in company:", error.message);
    throw error;
  }
}

async function loginDepartment(username, password) {
  try {
    const sql =
      "SELECT department_id, password FROM departments WHERE username = ?";
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
    };
  } catch (error) {
    console.error("Error logging in department:", error.message);
    throw error;
  }
}

module.exports = {
  loginStudent,
  loginAdmin,
  loginCompany,
  loginDepartment,
  loginAcadamic,
};
