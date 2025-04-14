// Import from the env
const api_url = "http://localhost:8080";

// A function to send post request to create a new company
const createCompany = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/company`, requestOptions);
  return response;
};

// A function to send get request to get all companies
const getAllCompanies = async (page, size) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${api_url}/api/companies/page?page=${page}&size=${size}`,
    requestOptions
  );

  return response;
};

// A function to send get request to get all companies
const getAllCompaniesWithoutPagination = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${api_url}/api/company`, requestOptions);

  return response;
};

// A function to send get request to get all companies
const getCompany = async (companyId) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${api_url}/api/company/${companyId}`,
    requestOptions
  );
  return response;
};

const updateCompany = async (companyId, formData) => {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(
      `${api_url}/api/company/${companyId}`,
      requestOptions
    );

    if (!response.ok) {
      // Get error message from response body or status text
      const errorMessage = await response.text();
      throw new Error(`Failed to update company: ${errorMessage}`);
    }

    return response;
  } catch (error) {
    throw new Error(`Error updating company: ${error.message}`);
  }
};

// A function to send delete request to delete a company
const deleteCompany = async (companyId) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${api_url}/api/company/${companyId}`,
    requestOptions
  );
  return response;
};

// Export all the functions
const companyService = {
  createCompany,
  getAllCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
  getAllCompaniesWithoutPagination,
};

export default companyService;
