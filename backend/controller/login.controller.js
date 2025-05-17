const loginservice = require("../service/login.service");

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

async function logIn(req, res, next) {
  try {
    const { username, password } = req.body;

    let user;
    let role;
    let userIdKey;

    if (username.startsWith("stud.")) {
      user = await loginservice.loginStudent(username, password);
      role = "Student";
    } else if (username.startsWith("admin.")) {
      user = await loginservice.loginAdmin(username, password);
      role = "Admin";
    } else if (username.startsWith("comp.")) {
      user = await loginservice.loginCompany(username, password);
      role = "Company";
    } else if (username.startsWith("dept.")) {
      user = await loginservice.loginDepartment(username, password);
      role = "Department";
    } else if (username.startsWith("acadamic.")) {
      user = await loginservice.loginAcadamic(username, password);
      role = "acadamic";
    }

    if (!user) {
      return res.status(403).json({
        status: "fail",
        message: "Invalid username or password",
      });
    }

    if (user.invalidPassword) {
      return res.status(403).json({
        status: "fail",
        message: "Invalid username or password",
      });
    }

    userIdKey = user.key;

    const payload = {
      [userIdKey]: user.id,
      user_role: role,
      username: username,
      userL: user.user,
    };

    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "24h",
    });

    res.status(200).json({
      status: "success",
      data: {
        message: "User logged in successfully",
        user_token: token,
        userL: user.user,
      },
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function forgotPassword(req, res) {
  try {
    const { username, email } = req.body;

    let user;
    let role;

    if (username.startsWith("stud.")) {
      user = await loginservice.forgotStudentPassword(username, email);
      role = "Student";
    } else if (username.startsWith("admin.")) {
      user = await loginservice.forgotAdminPassword(username, email);
      role = "Admin";
    } else if (username.startsWith("comp.")) {
      user = await loginservice.forgotCompanyPassword(username, email);
      role = "Company";
    } else if (username.startsWith("dept.")) {
      user = await loginservice.forgotDepartmentPassword(
        username,
        email
      );
      role = "Department";
    } else if (username.startsWith("acadamic.")) {
      user = await loginservice.forgotAcadamicPassword(
        username,
        email
      );
      role = "acadamic";
    }

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "No account found with these credentials",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        message: "Password has been sent to your email",
        user_type: role,
      },
    });
  } catch (error) {
    console.error("Error during forgot password:", error.message);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

module.exports = {
  logIn,
  forgotPassword,
};
