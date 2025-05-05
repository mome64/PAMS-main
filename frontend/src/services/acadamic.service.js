// Import from the env
const api_url = "http://localhost:8080";

// A function to send post request to create a new admin
const createAdmin = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/acadamic`, requestOptions);
  return response;
};

// A function to send a get request to get an admin by ID
const getAdminById = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${api_url}/api/acadamic/${id}`, requestOptions);
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
  const response = await fetch(`${api_url}/api/acadamic/`, requestOptions);
  return response;
};

const updateAdmin = async (adminId, adminData) => {
  console.log(adminId, adminData);
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(adminData), // Using FormData directly as the body
  };

  const response = await fetch(
    `${api_url}/api/acadamic/${adminId}`,
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
    `${api_url}/api/acadamic/password/${adminId}`,
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
    `${api_url}/api/acadamic/${adminId}/photo`,
    requestOptions
  );
  return response;
};

const getDeleteAcademic = async (id) => {
  console.log("iddddddd", id);
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(`${api_url}/api/acadamic/${id}`, requestOptions);
  return response;
};

// Export all the functions
const adminService = {
  getDeleteAcademic,
  createAdmin,
  getAdminById,
  getAllAdmins,
  updateAdmin,
  changePassword,
  getAdminPhotoById,
};

export default adminService;
