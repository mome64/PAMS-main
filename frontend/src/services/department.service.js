// Import from the env
const api_url = "http://localhost:8080";

// A function to send post request to create a new department
const createDepartment = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/department`, requestOptions);
  return response;
};

// A function to send get request to get a department by ID
const getDepartments = async (departmentId) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${api_url}/api/department/${departmentId}`,
    requestOptions
  );

  return response;
};

// A function to send get request to get all departments
const getAllDepartments = async (page, size) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${api_url}/api/department?page=${page}&size=${size}`,
    requestOptions
  );

  return response;
};

const updateDepartment = async (departmentId, formData) => {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(
      `${api_url}/api/department/${departmentId}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Failed to update department");
    }

    return response;
  } catch (error) {
    throw new Error(`Error updating department: ${error.message}`);
  }
};

// A function to send delete request to delete a department
const deleteDepartment = async (departmentId) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${api_url}/api/department/${departmentId}`,
    requestOptions
  );
  return response;
};

// A function to send get request to fetch department IDs
const getDepartmentIds = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `${api_url}/api/departments/id`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Failed to fetch department IDs");
    }
    const data = await response.json();
    return data.departmentIds;
  } catch (error) {
    throw new Error(`Error fetching department IDs: ${error.message}`);
  }
};

// Export all the functions
const departmentService = {
  createDepartment,
  getDepartments,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
  getDepartmentIds,
};

export default departmentService;
