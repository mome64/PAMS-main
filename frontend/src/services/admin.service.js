// Import from the env
const api_url = "http://localhost:8080";

// A function to send post request to create a new admin
const createAdmin = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/admin`, requestOptions);
  return response;
};

// A function to send a get request to get an admin by ID
const getAdminById = async (userId) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${api_url}/api/admin/${userId}`,
    requestOptions
  );
  return response;
};

// A function to send get request to get all admins
const getAllAdmins = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${api_url}/api/admin/`, requestOptions);
  return response;
};

const updateAdmin = async (adminId, adminData) => {
  const requestOptions = {
    method: "PATCH",
    body: adminData, // Using FormData directly as the body
  };

  const response = await fetch(
    `${api_url}/api/admin/${adminId}`,
    requestOptions
  );
  return response;
};

const changePassword = async (
  adminId,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
  };
  const response = await fetch(
    `${api_url}/api/admin/password/${adminId}`,
    requestOptions
  );
  return response;
};

const getAdminPhotoById = async (adminId) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${api_url}/api/admin/${adminId}/photo`,
    requestOptions
  );
  return response;
};

// Export all the functions
const adminService = {
  createAdmin,
  getAdminById,
  getAllAdmins,
  updateAdmin,
  changePassword,
  getAdminPhotoById,
};

export default adminService;
