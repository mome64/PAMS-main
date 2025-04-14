const { getStudentTypes } = require("../service/student.service");
const { getDepartmentTypes } = require("../service/department.service");

const authorizeDepartmentType = async (req, res, next) => {
  try {
    // Get the department type from the logged-in department's information
    const loggedInDepartmentType = req.user.department_type; // Assuming the department type is stored in req.user

    // If the logged-in user is an admin, they have access to all departments
    if (req.user.role === "admin") {
      return next();
    }
    if (req.user.role === "acadamic") {
      return next();
    }

    // If the department type is not provided in the request, return an error
    if (!loggedInDepartmentType) {
      return res.status(403).json({ error: "Department type is required" });
    }

    // Retrieve distinct department types from the departments table
    const departmentTypes = await getDepartmentTypes();

    // Check if the logged-in department's department type matches any of the authorized department types
    if (!departmentTypes.includes(loggedInDepartmentType)) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // If the logged-in department's department type is "system", retrieve distinct student types from the students table
    if (loggedInDepartmentType === "system") {
      const studentTypes = await getStudentTypes();

      // Check if the logged-in department's department type matches any of the authorized student types
      if (!studentTypes.includes(loggedInDepartmentType)) {
        return res.status(403).json({ error: "Unauthorized access" });
      }
    }

    // If authorized, call next() to pass control to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error authorizing department type:", error.message);
    res.status(500).json({ error: "Failed to authorize department type" });
  }
};

module.exports = authorizeDepartmentType;
