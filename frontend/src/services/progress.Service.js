const api_url = "http://localhost:8080";

// Save a new progress report
// async function saveProgress(progressData) {
//   try {
//     const response = await fetch(`${api_url}/api/progress`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(progressData),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     } else {
//       const errorData = await response.json();
//       throw new Error(errorData.error || "Failed to save progress");
//     }
//   } catch (error) {
//     console.error("Error saving progress:", error);
//     throw error;
//   }
// }

const saveProgress = async (payload) => {
  const response = await fetch("http://localhost:8080/api/progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), // 🟢 fixed key
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Get all progress reports for a specific student
async function getProgressByStudentId(studentId) {
  console.log(studentId);
  try {
    const response = await fetch(
      `${api_url}/api/progress/student/${studentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data.progressReports);
      return data.progressReports || [];
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch progress");
    }
  } catch (error) {
    console.error("Error fetching progress:", error);
    throw error;
  }
}

// Optional: Update a progress report by ID
async function updateProgress(progressId, updatedData) {
  try {
    const response = await fetch(`${api_url}/api/progress/${progressId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update progress");
    }
  } catch (error) {
    console.error("Error updating progress:", error);
    throw error;
  }
}

// Optional: Delete a progress report by ID
async function deleteProgress(progressId) {
  try {
    const response = await fetch(`${api_url}/api/progress/${progressId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return { message: "Deleted successfully" };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete progress");
    }
  } catch (error) {
    console.error("Error deleting progress:", error);
    throw error;
  }
}

const progressService = {
  saveProgress,
  getProgressByStudentId,
  updateProgress,
  deleteProgress,
};

export default progressService;
