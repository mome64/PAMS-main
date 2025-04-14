const { query } = require("../config/db.config");

async function addPlacementResult(placement) {
  const { student_id, company_id } = placement;

  // Insert the placement result into the database using the query function
  await query(
    "INSERT INTO placement_results (student_id, company_id) VALUES (?, ?)",
    [student_id, company_id]
  );
}

// Function to fetch placement results for a specific student
async function getPlacementResult(studentId) {
  try {
    // Query the database to fetch placement results for the specified student ID
    const queryResult = await query(
      "SELECT * FROM placement_results WHERE student_id = ?",
      [studentId]
    );

    // Return the fetched placement results
    return queryResult;
  } catch (error) {
    // If an error occurs, throw the error to be caught by the controller
    throw error;
  }
}

// Function to fetch all placement results by department ID
async function getAllPlacementResultsByDepartment(departmentId) {
  try {
    // Query the database to fetch all placement results with student name, company name, and department ID
    const queryResult = await query(
      `
      SELECT 
        pr.placement_id,
        s.first_name AS student_first_name,
        s.last_name AS student_last_name,
        c.company_name,
        c.contact_email,
        c.phone_number,
        saf.gender,
        d.department_id,
        d.department_name
      FROM 
        placement_results pr
      JOIN 
        student_apply_form saf ON pr.student_id = saf.student_id
      JOIN 
        companies c ON pr.company_id = c.company_id
      JOIN 
        students s ON saf.student_id = s.student_id
      JOIN 
        departments d ON s.department_id = d.department_id
      WHERE 
        s.department_id = ?
    `,
      [departmentId]
    );

    // Return the fetched placement results
    return queryResult;
  } catch (error) {
    // If an error occurs, throw the error to be caught by the controller
    throw error;
  }
}

// Function to fetch company details by company ID
async function getCompanyDetails(companyId) {
  try {
    // Query the database to fetch company details by company ID
    const queryResult = await query(
      "SELECT * FROM companies WHERE company_id = ?",
      [companyId]
    );

    // Return the fetched company details
    return queryResult[0]; // Assuming there's only one company with the given ID
  } catch (error) {
    // If an error occurs, throw the error to be caught by the controller
    throw error;
  }
}

// Function to fetch all placement results by department ID
async function getAllPlacementResultsByCompanyId(companyId) {
  try {
    // Query the database to fetch all placement results with student name, company name, company ID, and department ID
    const queryResult = await query(
      `
      SELECT 
        pr.placement_id,
        s.first_name AS student_first_name,
        s.last_name AS student_last_name,
        s.student_id,
        c.company_id,
        c.company_name,
        saf.gender,
        saf.disability,
        d.department_id,
        d.department_name
      FROM 
        placement_results pr
      JOIN 
        student_apply_form saf ON pr.student_id = saf.student_id
      JOIN 
        companies c ON pr.company_id = c.company_id
      JOIN 
        students s ON saf.student_id = s.student_id
      JOIN 
        departments d ON s.department_id = d.department_id
      WHERE 
        c.company_id = ?
    `,
      [companyId]
    );

    // Return the fetched placement results
    return queryResult;
  } catch (error) {
    // If an error occurs, throw the error to be caught by the controller
    throw error;
  }
}

// Function to fetch company details by company ID
async function getCompanyDetails(companyId) {
  try {
    // Query the database to fetch company details by company ID
    const queryResult = await query(
      "SELECT * FROM companies WHERE company_id = ?",
      [companyId]
    );

    // Return the fetched company details
    return queryResult[0]; // Assuming there's only one company with the given ID
  } catch (error) {
    // If an error occurs, throw the error to be caught by the controller
    throw error;
  }
}

module.exports = {
  addPlacementResult,
  getPlacementResult,
  getCompanyDetails,
  getAllPlacementResultsByDepartment,
  getAllPlacementResultsByCompanyId,
};
