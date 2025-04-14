// Import criteria service
const criteriaService = require("../service/criteria.service");

// Controller function to update criteria
async function updateCriteria(req, res, next) {
  try {
    // Extract criteria ID from request parameters
    const criteriaId = req.params.id;

    // Check if all required fields exist in req.body
    const {
      weight_disability,
      weight_gender,
      weight_preference,
      weight_grade,
    } = req.body;

    // Call the service function to update the criteria
    const success = await criteriaService.updateCriteria(criteriaId, {
      weight_disability,
      weight_gender,
      weight_preference,
      weight_grade,
    });

    // Respond based on the success status
    if (success) {
      return res.status(200).json({
        status: true,
        message: "Criteria updated successfully",
      });
    } else {
      return res.status(400).json({
        status: false,
        error: "Failed to update criteria",
      });
    }
  } catch (error) {
    // Handle errors
    console.error("Error updating criteria:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
// Controller function to get criteria
async function getCriteria(req, res, next) {
  try {
    // Extract criteria ID from request parameters
    const criteriaId = req.params.id;

    // Call the service function to fetch criteria data by ID
    const criteria = await criteriaService.getCriteria(criteriaId);

    // Respond with the fetched criteria data
    return res.status(200).json({
      status: true,
      data: criteria,
    });
  } catch (error) {
    // Handle errors
    console.error("Error getting criteria:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  updateCriteria,
  getCriteria,
};
