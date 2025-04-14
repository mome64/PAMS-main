// services/progress.service.js
const { query } = require("../config/db.config"); // Database query function

// Function to save a new progress report
async function saveProgress(formData) {
  let { student_id, title, description, date, status } = formData;

  console.log(formData, title);

  // Validate that student_id is provided
  if (!student_id) {
    throw new Error("Missing student_id.");
  }

  // Optional: Validate other fields if needed
  if (!title || !date || !status) {
    throw new Error("Missing required fields: title, date, or status.");
  }

  // Ensure no undefined or missing values are passed to the query
  student_id = student_id ?? null;
  title = title ?? null;
  description = description ?? null;
  date = date ?? null;
  status = status ?? null;

  await query(
    "INSERT INTO student_progress (student_id, title, description, date, status) VALUES (?, ?, ?, ?, ?)",
    [student_id, title, description, date, status]
  );
}

// Function to get progress reports by student ID
async function getProgressByStudentId(studentId) {
  const progressReports = await query(
    `SELECT 
      students.first_name AS student_first_name, 
      students.last_name AS student_last_name, 
      student_progress.* 
    FROM 
      student_progress 
    INNER JOIN 
      students ON student_progress.student_id = students.student_id 
    WHERE 
      student_progress.student_id = ?`,
    [studentId]
  );

  return progressReports;
}

// Function to get all progress reports (optional)
async function getAllProgressReports() {
  const progressReports = await query(
    `SELECT 
      students.first_name AS student_first_name, 
      students.last_name AS student_last_name, 
      student_progress.* 
    FROM 
      student_progress 
    INNER JOIN 
      students ON student_progress.student_id = students.student_id`
  );

  return progressReports;
}

module.exports = {
  saveProgress,
  getProgressByStudentId,
  getAllProgressReports,
};
