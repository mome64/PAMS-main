// Import from the env
const api_url = "http://localhost:8080";

// Function to send a PATCH request to update criteria
const updateCriteria = async (criteriaId, formData) => {
  try {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(
      `${api_url}/api/criteria/${criteriaId}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Failed to update criteria");
    }
    return response.json();
  } catch (error) {
    console.error("Error updating criteria:", error.message);
    throw new Error("Failed to update criteria");
  }
};

// Function to send a GET request to fetch criteria by ID
const getCriteriaById = async (criteriaId) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `${api_url}/api/criteria/${criteriaId}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Failed to fetch criteria");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching criteria by ID:", error.message);
    throw new Error("Failed to fetch criteria by ID");
  }
};

// Export all the functions
const criteriaService = {
  updateCriteria,
  getCriteriaById,
};

export default criteriaService;
