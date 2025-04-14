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

    // Add additional check for incorrect password
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
    };
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "24h",
    });

    res.status(200).json({
      status: "success",
      data: {
        message: "User logged in successfully",
        user_token: token,
      },
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  logIn,
};
