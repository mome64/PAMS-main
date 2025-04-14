const { query } = require("../config/db.config");

async function saveResults(formData) {
  const {
    student_id,
    department_id,
    company_id,
    commitment,
    courtesy,
    conduct,
    perseverance,
    teamwork,
    professional_ethics,
    creativity,
    technical_knowledge,
    efficiency,
    professional_comments,
    attendance,
    advisor_name,
    department_assigned,
    attachment_from_date,
    attachment_to_date,
    area_of_work,
    total_hours,
  } = formData;

  // Insert the results into the database
  await query(
    "INSERT INTO student_organizational_result (student_id, department_id, company_id, commitment, courtesy, conduct, perseverance, teamwork, professional_ethics, creativity, technical_knowledge, efficiency, professional_comments, attendance, advisor_name, department_assigned, attachment_from_date, attachment_to_date, area_of_work, total_hours) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      student_id,
      department_id,
      company_id,
      commitment,
      courtesy,
      conduct,
      perseverance,
      teamwork,
      professional_ethics,
      creativity,
      technical_knowledge,
      efficiency,
      professional_comments,
      attendance,
      advisor_name,
      department_assigned,
      attachment_from_date,
      attachment_to_date,
      area_of_work,
      total_hours,
    ]
  );
}

async function getResultsByDepartmentId(departmentId) {
  const results = await query(
    `SELECT 
    students.first_name AS student_first_name, 
    students.last_name AS student_last_name, 
    companies.company_name,
    departments.department_name,
    student_organizational_result.*
  FROM 
    student_organizational_result 
  INNER JOIN 
    students ON student_organizational_result.student_id = students.student_id 
  INNER JOIN 
    companies ON student_organizational_result.company_id = companies.company_id 
  INNER JOIN 
    departments ON student_organizational_result.department_id = departments.department_id 
  WHERE 
    student_organizational_result.department_id = ?`,
    [departmentId]
  );

  return results;
}

async function getResultsByStudentId(studentId) {
  const results = await query(
    `SELECT 
      students.first_name AS student_first_name, 
      students.last_name AS student_last_name, 
      companies.company_name,
      departments.department_name,
      student_organizational_result.*
    FROM 
      student_organizational_result 
    INNER JOIN 
      students ON student_organizational_result.student_id = students.student_id 
    INNER JOIN 
      companies ON student_organizational_result.company_id = companies.company_id 
    INNER JOIN 
      departments ON student_organizational_result.department_id = departments.department_id 
    WHERE 
      student_organizational_result.student_id = ?`,
    [studentId]
  );

  return results;
}

module.exports = {
  saveResults,
  getResultsByDepartmentId,
  getResultsByStudentId,
};
