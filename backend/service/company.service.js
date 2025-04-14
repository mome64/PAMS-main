// Import necessary dependencies
const { query } = require("../config/db.config");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../sendEmail");

// Function to check if the company exists in the database
async function checkIfCompanyExists(username) {
  const sql = "SELECT * FROM companies WHERE username = ?";
  const rows = await query(sql, [username]);
  return rows.length > 0;
}

async function createCompany(company) {
  try {
    // Generate a unique username for the company
    const username = `comp.${company.company_name.toLowerCase()}`;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(company.password, 10);

    // Check if the company already exists
    const companyExists = await checkIfCompanyExists(username);
    if (companyExists) {
      throw new Error("Company already exists.");
    }

    // Insert company details into the companies table
    const insertCompanySql = `
        INSERT INTO companies (
          company_name,
          username,
          phone_number,
          contact_email,
          location,
          industry_sector,
          accepted_student_limit,
          website,
          password
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
    const result = await query(insertCompanySql, [
      company.company_name,
      username,
      company.phone_number,
      company.contact_email,
      company.location,
      company.industry_sector,
      company.accepted_student_limit,
      company.website,
      hashedPassword,
    ]);
    const companyId = result.insertId;

    await sendEmail(
      company.company_name,
      company.contact_email,
      username,
      company.password
    );

    return companyId;
  } catch (error) {
    console.error("Error creating company:", error.message);
    throw new Error("Failed to create company");
  }
}

async function getCompany(companyId) {
  try {
    const sql = `
      SELECT * 
      FROM companies
      WHERE company_id = ?
    `;
    const [company] = await query(sql, [companyId]);
    return company;
  } catch (error) {
    throw new Error(`Error getting company: ${error.message}`);
  }
}

async function getCompanyCount() {
  try {
    const sql = `SELECT COUNT(*) AS total FROM companies`;
    const [{ total }] = await query(sql);
    return total;
  } catch (error) {
    throw new Error(`Error getting total count of companies: ${error.message}`);
  }
}

// Function to fetch companies with pagination
async function getAllCompanies(page, size) {
  try {
    // Calculate offset based on page number and page size
    const offset = (page - 1) * size;

    // Modify the SQL query to include LIMIT and OFFSET clauses
    const sql = `
      SELECT * 
      FROM companies
      ORDER BY company_id ASC
      LIMIT ? OFFSET ?
    `;

    // Execute the query with parameters for LIMIT and OFFSET
    const rows = await query(sql, [size, offset]);

    return rows;
  } catch (error) {
    throw new Error(`Error fetching companies: ${error.message}`);
  }
}

async function getAllCompaniesWithoutPagination() {
  try {
    const sql = `
      SELECT * 
      FROM companies
      ORDER BY company_id ASC
    `;
    const companies = await query(sql);
    return companies;
  } catch (error) {
    throw new Error(
      `Error fetching companies without pagination: ${error.message}`
    );
  }
}

async function updateCompany(companyId, companyData) {
  try {
    const {
      company_name,
      phone_number,
      contact_email,
      location,
      industry_sector,
      accepted_student_limit,
      website,
    } = companyData;

    const username = `comp.${company_name.toLowerCase()}`;

    // Update the company data including the hashed password and website
    const updateSql = `
      UPDATE companies
      SET company_name = ?,
          username = ?,
          phone_number = ?,
          contact_email = ?,
          location = ?,
          industry_sector = ?,
          accepted_student_limit = ?,
          website = ?
      WHERE company_id = ?
    `;

    // Execute the SQL query
    const params = [
      company_name,
      username,
      phone_number,
      contact_email,
      location,
      industry_sector,
      accepted_student_limit,
      website,
      companyId,
    ];

    const result = await query(updateSql, params);

    // Check if the update was successful
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`Error updating company: ${error.message}`);
  }
}

// Function to delete an existing company
async function deleteCompany(companyId) {
  try {
    // Check if companyId is undefined
    if (companyId === undefined) {
      throw new Error("Company ID is undefined");
    }

    const deleteSql = "DELETE FROM companies WHERE company_id = ?";
    const result = await query(deleteSql, [companyId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error deleting company:", error.message);
    throw new Error("Failed to delete company");
  }
}

// Export the functions
module.exports = {
  checkIfCompanyExists,
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany,
  getAllCompanies,
  getAllCompaniesWithoutPagination,
  getCompanyCount,
};
