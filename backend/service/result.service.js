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
  const TotalScore =
    Number(commitment) +
    Number(courtesy) +
    Number(conduct) +
    Number(perseverance) +
    Number(teamwork) +
    Number(professional_ethics) +
    Number(creativity) +
    Number(technical_knowledge) +
    Number(efficiency) +
    Number(professional_comments) +
    Number(attendance);

  // Insert the results into the database
  const [existing] = await query("SELECT 1 FROM results WHERE student_id = ?", [
    student_id,
  ]);

  if (existing) {
    // If student already exists, update the company_result
    await query("UPDATE results SET company_result = ? WHERE student_id = ?", [
      TotalScore,
      student_id,
    ]);
  } else {
    // If student doesn't exist, insert a new record
    await query(
      "INSERT INTO results (student_id, company_result) VALUES (?, ?)",
      [student_id, TotalScore]
    );
  }

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

async function submitGrades(grades) {
  const upsertPromises = grades.map(({ student_id, grade }) => {
    const sql = `
      INSERT INTO results (student_id, academic_result)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE academic_result = VALUES(academic_result)
    `;
    return new Promise((resolve, reject) => {
      query(sql, [student_id, grade], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  });

  return Promise.all(upsertPromises);
}
async function fetchAllGrades() {
  try {
    const sql = `
    SELECT student_id, academic_result, company_result, total_result
    FROM results
    ORDER BY student_id DESC
  `;

    // Fetch all grades
    const rows = await query(sql); // Destructure to get the rows

    return rows; // Return the fetched grades
  } catch (error) {
    console.error("Error fetching grades:", error);
    throw new Error("Failed to fetch grades");
  }
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
  fetchAllGrades,
  submitGrades,
  getResultsByDepartmentId,
  getResultsByStudentId,
};
