// Import necessary dependencies
const { query } = require("../config/db.config");

// Function to update criteria in the database
async function updateCriteria(criteriaId, criteria) {
  try {
    // Construct the SQL query to update criteria in the table
    const updateCriteriaSql = `
      UPDATE weights
      SET
        weight_disability = ?,
        weight_gender = ?,
        weight_preference = ?,
        weight_grade = ?
      WHERE weight_id = ?
    `;

    // Execute the SQL query to update criteria
    const result = await query(updateCriteriaSql, [
      criteria.weight_disability,
      criteria.weight_gender,
      criteria.weight_preference,
      criteria.weight_grade,
      criteriaId,
    ]);

    // Check if any rows were affected (criteria updated successfully)
    return result.affectedRows > 0;
  } catch (error) {
    // Throw an error if something goes wrong
    console.error("Error updating criteria:", error.message);
    throw new Error("Failed to update criteria");
  }
}

// Function to fetch criteria from the database by ID
async function getCriteria(criteriaId) {
  try {
    // Construct the SQL query to select criteria by ID
    const selectCriteriaSql = `
      SELECT *
      FROM weights
      WHERE weight_id = ?
    `;

    // Execute the SQL query to fetch criteria by ID
    const criteria = await query(selectCriteriaSql, [criteriaId]);

    // Return the fetched criteria data
    return criteria[0]; // Assuming the result is an array, return the first element
  } catch (error) {
    // Throw an error if something goes wrong
    console.error("Error fetching criteria by ID:", error.message);
    throw new Error("Failed to fetch criteria by ID");
  }
}

module.exports = {
  updateCriteria,
  getCriteria,
};
