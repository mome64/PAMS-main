// Import necessary dependencies
const departmentService = require("../service/department.service");

async function createDepartment(req, res, next) {
  try {
    // Generate the username automatically
    const username = `dept.${req.body.department_name}`;
    // Check if department name already exists
    const departmentExists = await departmentService.checkIfDepartmentExists(
      username
    );

    if (departmentExists) {
      return res.status(400).json({
        error: "This department name already exists!",
      });
    }

    // Create new department
    const departmentId = await departmentService.createDepartment({
      department_name: req.body.department_name,
      phone_number: req.body.phone_number,
      contact_email: req.body.contact_email,
      office_location: req.body.office_location,
      password: req.body.password,
    });

    return res.status(200).json({
      status: true,
      message: "Department created successfully",
      departmentId,
    });
  } catch (error) {
    console.error("Error creating department:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getDepartment(req, res, next) {
  try {
    const departmentId = req.params.id;
    const department = await departmentService.getDepartment(departmentId);

    if (!department) {
      return res.status(404).json({
        error: "Department not found",
      });
    }

    return res.status(200).json({
      status: true,
      department,
    });
  } catch (error) {
    console.error("Error getting department:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getAllDepartments(req, res, next) {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const size = req.query.size ? parseInt(req.query.size) : 5;

    // Fetch the total count of departments
    const totalCount = await departmentService.getDepartmentCount();

    const departments = await departmentService.getAllDepartments(page, size);

    // Calculate total pages based on total count and page size
    const totalPages = Math.ceil(totalCount / size);

    return res.status(200).json({
      status: true,
      departments,
      totalCount,
      totalPages,
    });
  } catch (error) {
    console.error("Error getting departments:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function updateDepartment(req, res, next) {
  try {
    const departmentId = req.params.id;
    const updatedDepartment = await departmentService.updateDepartment(
      departmentId,
      req.body
    );

    if (!updatedDepartment) {
      return res.status(404).json({
        error: "Department not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Department updated successfully",
      department: updatedDepartment,
    });
  } catch (error) {
    console.error("Error updating department:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function deleteDepartment(req, res, next) {
  try {
    const departmentId = req.params.id;
    const deleted = await departmentService.deleteDepartment(departmentId);

    if (!deleted) {
      return res.status(404).json({
        error: "Department not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting department:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getDepartmentIds(req, res, next) {
  try {
    const departmentIds = await departmentService.getDepartmentIds();

    if (!departmentIds || departmentIds.length === 0) {
      return res.status(404).json({
        error: "Department IDs not found",
      });
    }

    return res.status(200).json({
      status: true,
      departmentIds,
    });
  } catch (error) {
    console.error("Error getting department IDs:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  createDepartment,
  getDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
  getDepartmentIds,
};
