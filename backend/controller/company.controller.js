// Import necessary dependencies
const companyService = require("../service/company.service");

async function createCompany(req, res, next) {
  try {
    // Generate the username automatically
    const username = `comp.${req.body.company_name.toLowerCase()}`;

    // Check if company name already exists
    const companyExists = await companyService.checkIfCompanyExists(username);

    if (companyExists) {
      return res.status(400).json({
        error: "This company name already exists!",
      });
    }

    // Create new company
    const companyId = await companyService.createCompany({
      company_name: req.body.company_name,
      phone_number: req.body.phone_number,
      contact_email: req.body.contact_email,
      location: req.body.location,
      industry_sector: req.body.industry_sector,
      accepted_student_limit: req.body.accepted_student_limit,
      website: req.body.website,
      password: req.body.password,
    });

    // Return success response
    return res.status(200).json({
      status: true,
      message: "Company created successfully",
      companyId,
    });
  } catch (error) {
    console.error("Error creating company:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getCompany(req, res, next) {
  try {
    const companyId = req.params.id;
    const company = await companyService.getCompany(companyId);

    if (!company) {
      return res.status(404).json({
        error: "Company not found",
      });
    }

    return res.status(200).json({
      status: true,
      company,
    });
  } catch (error) {
    console.error("Error getting company:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getAllCompaniesWithoutPagination(req, res, next) {
  try {
    // Call the service function to fetch all companies
    const companies = await companyService.getAllCompaniesWithoutPagination();

    // Calculate total count of companies
    const totalCount = companies.length;

    res.json({
      companies,
      totalCount,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const getAllCompanies = async (req, res) => {
  try {
    // Extract page number and page size from query parameters
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const size = req.query.size ? parseInt(req.query.size) : 5;

    // Call the service function to fetch companies with pagination
    const companies = await companyService.getAllCompanies(page, size);

    // Calculate total count of companies
    const totalCount = await companyService.getCompanyCount();

    // Calculate total pages based on total count and page size
    const totalPages = Math.ceil(totalCount / size);

    res.json({
      companies,
      totalCount,
      totalPages,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

async function updateCompany(req, res, next) {
  try {
    const companyId = req.params.id;
    const updatedCompany = await companyService.updateCompany(
      companyId,
      req.body
    );

    if (!updatedCompany) {
      return res.status(404).json({
        error: "Company not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Company updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function deleteCompany(req, res, next) {
  try {
    const companyId = req.params.id;
    const deleted = await companyService.deleteCompany(companyId);

    if (!deleted) {
      return res.status(404).json({
        error: "Company not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  createCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany,
  getAllCompaniesWithoutPagination,
  getCompany,
};
