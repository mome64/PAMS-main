// Import from the env
const api_url = "http://localhost:8080";

async function sendPlacementResults(placementResults) {
  try {
    const response = await fetch(`${api_url}/api/placement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(placementResults),
    });

    // Check if the response is successful (status code 200-299)
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // Handle errors if the response is not successful
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to send placement results");
    }
  } catch (error) {
    // Handle errors if the request fails
    console.error("Error sending placement results:", error);
    throw error;
  }
}

async function getPlacementResult(studentId) {
  try {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`${api_url}/api/placement/${studentId}`, {
      requestOptions,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch placement results");
    }
  } catch (error) {
    console.error("Error fetching placement results:", error);
    throw error;
  }
}

async function getAllPlacementResultsByDepartmentId(departmentId) {
  try {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `${api_url}/api/all/placement/${departmentId}`,
      { requestOptions }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch placement results");
    }
  } catch (error) {
    console.error("Error fetching placement results:", error);
    throw error;
  }
}

async function getAllPlacementResultsByCompanyId(companyId) {
  try {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`${api_url}/api/students/send/${companyId}`, {
      requestOptions,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch placement results");
    }
  } catch (error) {
    console.error("Error fetching placement results:", error);
    throw error;
  }
}

// Export all the functions
const placementService = {
  sendPlacementResults,
  getPlacementResult,
  getAllPlacementResultsByDepartmentId,
  getAllPlacementResultsByCompanyId,
};

export default placementService;
