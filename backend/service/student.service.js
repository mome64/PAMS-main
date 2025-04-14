// Import necessary dependencies
const { query } = require("../config/db.config");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../sendEmail");

// Function to check if the student exists in the database
async function checkIfStudentExists(username) {
  const sql = "SELECT * FROM students WHERE username = ?";
  const rows = await query(sql, [username]);
  return rows.length > 0;
}

async function createStudent(student) {
  try {
    // Construct the username as "student_firstname_firstTwoLettersOfLastName"
    const username = `stud.${student.first_name.toLowerCase()}.${student.last_name
      .slice(0, 2)
      .toLowerCase()}`;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(student.password, 10);

    // Check if the student already exists
    const studentExist = await checkIfStudentExists(username);
    if (studentExist) {
      throw new Error("Student already exists.");
    }

    // Insert student details into the students table
    const insertStudentSql = `
      INSERT INTO students (
        first_name,
        last_name,
        username,
        phone_number,
        contact_email,
        gpa,
        photo,
        password,
        department_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const defaultPhotoPath = "default.jpg";
    const result = await query(insertStudentSql, [
      student.first_name,
      student.last_name,
      username,
      student.phone_number,
      student.contact_email,
      student.gpa,
      defaultPhotoPath,
      hashedPassword,
      student.department_id,
    ]);
    const studentId = result.insertId;

    await sendEmail(
      student.first_name,
      student.contact_email,
      username,
      student.password
    );

    return studentId;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
}

async function getStudent(studentId) {
  try {
    const sql = `
      SELECT *
      FROM students
      WHERE student_id = ?
    `;
    const [student] = await query(sql, [studentId]);
    return student;
  } catch (error) {
    throw new Error(`Error getting student: ${error.message}`);
  }
}

// Function to get all students
async function getAllStudents() {
  try {
    const sql = `SELECT * FROM  students
    ORDER BY student_id DESC`;

    const students = await query(sql);
    return students;
  } catch (error) {
    console.error("Error getting all students:", error);
    throw new Error("Failed to get all students");
  }
}

async function updateStudentProfile(studentId, studentData, photoFilename) {
  try {
    const { first_name, last_name, contact_email, phone_number } = studentData;

    // If photoFilename is provided, update studentData with it
    if (photoFilename) {
      studentData.photo = photoFilename;
    }

    // Construct the username as "student_firstname_firstTwoLettersOfLastName"
    const username = `stud.${first_name.toLowerCase()}.${last_name
      .slice(0, 2)
      .toLowerCase()}`;

    // Update the student data including the hashed password, gpa, and photo
    const updateSql = `
      UPDATE students
      SET first_name = ?,
          last_name = ?,
          username = ?,
          contact_email = ?,
          phone_number = ?,
          photo = ?
      WHERE student_id = ?
    `;

    // Create an array of parameters to pass to the query function
    const params = [
      first_name,
      last_name,
      username,
      contact_email,
      phone_number,
      studentData.photo,
      studentId,
    ];

    if (photoFilename === undefined) {
      params[5] = null;
    }

    // Execute the query
    const result = await query(updateSql, params);

    // Check if the update was successful
    return result.affectedRows > 0;
  } catch (error) {
    // Throw an error if any exception occurs during the update process
    throw new Error(`Error updating student: ${error.message}`);
  }
}

async function updateStudent(studentId, studentData) {
  try {
    const { first_name, last_name, phone_number, contact_email, gpa } =
      studentData;

    // Construct the username as "student_firstname_firstTwoLettersOfLastName"
    const username = `stud.${first_name.toLowerCase()}.${last_name
      .slice(0, 2)
      .toLowerCase()}`;

    // Update the student data including the hashed password, gpa, and photo
    const updateSql = `
      UPDATE students
      SET first_name = ?,
          last_name = ?,
          username = ?,
          phone_number = ?,
          contact_email = ?,
          gpa = ?
        WHERE student_id = ?
    `;

    // Create an array of parameters to pass to the query function
    const params = [
      first_name,
      last_name,
      username,
      phone_number,
      contact_email,
      gpa,
      studentId,
    ];

    // Execute the query
    const result = await query(updateSql, params);

    // Check if the update was successful
    return result.affectedRows > 0;
  } catch (error) {
    // Throw an error if any exception occurs during the update process
    throw new Error(`Error updating student: ${error.message}`);
  }
}

async function getStudentPhoto(studentId) {
  try {
    // Fetch student data by ID
    const student = await getStudent(studentId);

    // Return student's photo filename
    return student.photo;
  } catch (error) {
    console.error("Error getting student photo:", error);
    throw new Error("Failed to get student photo");
  }
}

// Function to change the password of a student
async function changePassword(
  studentId,
  oldPassword,
  newPassword,
  confirmPassword
) {
  try {
    // Check if the new password matches the confirm password
    if (newPassword !== confirmPassword) {
      throw new Error("New password and confirm password do not match");
    }

    // Retrieve the current password of the student from the database
    const sql = "SELECT password FROM students WHERE student_id = ?";
    const [student] = await query(sql, [studentId]);

    // Verify if the provided old password matches the current password
    const isPasswordValid = await bcrypt.compare(oldPassword, student.password);
    if (!isPasswordValid) {
      throw new Error("Old password is incorrect");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the student's password in the database
    const updatePasswordSql = `
      UPDATE students
      SET password = ?
      WHERE student_id = ?
    `;
    const result = await query(updatePasswordSql, [hashedPassword, studentId]);

    // Check if the password was updated successfully
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Failed to change password: " + error.message);
  }
}

// Function to delete an existing student
async function deleteStudent(studentId) {
  try {
    // Check if studentId is undefined
    if (studentId === undefined) {
      throw new Error("Student ID is undefined");
    }

    const deleteSql = "DELETE FROM students WHERE student_id = ?";
    const result = await query(deleteSql, [studentId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error deleting student:", error.message);
    throw new Error("Failed to delete student");
  }
}

async function getStudentsByDepartment(departmentType) {
  try {
    const sql = `
      SELECT *
      FROM students
      WHERE department_id = ?
    `;
    const row = await query(sql, [departmentType]);
    return row;
  } catch (error) {
    console.error("Error getting students by department:", error.message);
    throw new Error("Failed to retrieve students by department");
  }
}

async function acceptStudentApplyForm({
  student_id,
  name,
  disability,
  gender,
  preferences,
}) {
  try {
    const insertApplyFormSql = `
      INSERT INTO student_apply_form (student_id, name, disability, gender)
      VALUES (?, ?, ?, ?)
    `;
    const result = await query(insertApplyFormSql, [
      student_id,
      name,
      disability,
      gender,
    ]);
    const apply_id = result.insertId;

    for (let i = 0; i < preferences.length; i++) {
      const insertPreferenceSql = `
        INSERT INTO student_preferences (apply_id, preference_order, student_id, company_id)
        VALUES (?, ?, ?, ?)
      `;
      await query(insertPreferenceSql, [
        apply_id,
        i + 1,
        student_id,
        preferences[i],
      ]);
    }
  } catch (error) {
    throw new Error(
      `Error accepting student apply form and preferences: ${error.message}`
    );
  }
}

async function getAllApplyStudents() {
  try {
    const sql = `
      SELECT
        sa.apply_id,
        s.student_id,
        CONCAT(s.first_name, ' ', s.last_name) AS student_name,
        sa.disability,
        sa.gender,
        s.gpa,
        GROUP_CONCAT(DISTINCT sp.company_id ORDER BY sp.preference_order) AS preferences,
        p.company_name
      FROM
        students s
      INNER JOIN
        student_apply_form sa ON s.student_id = sa.student_id
      LEFT JOIN
        student_preferences sp ON sa.apply_id = sp.apply_id
      LEFT JOIN
        placement_results pr ON s.student_id = pr.student_id
      LEFT JOIN
        companies p ON pr.company_id = p.company_id
      GROUP BY
        sa.apply_id;
    `;
    const students = await query(sql);
    return students;
  } catch (error) {
    console.error("Error retrieving students:", error.message);
    throw new Error(`Failed to retrieve students: ${error.message}`);
  }
}

async function getApplyStudentsById(id) {
  try {
    // Query to retrieve apply students by ID
    const sql = `
      SELECT
      sa.apply_id,
      s.student_id,
      CONCAT(s.first_name, ' ', s.last_name) AS student_name,
      sa.disability,
      sa.gender,
      s.gpa,
      GROUP_CONCAT(DISTINCT sp.company_id ORDER BY sp.preference_order) AS preferences
    FROM
        students s
    INNER JOIN
        student_apply_form sa ON s.student_id = sa.student_id
    LEFT JOIN
        student_preferences sp ON sa.apply_id = sp.apply_id
    LEFT JOIN
        placement_results pr ON s.student_id = pr.student_id
    WHERE
        s.student_id = ?
    GROUP BY
        sa.apply_id;

    `;
    // Execute the query with the provided student ID
    const applyStudents = await query(sql, [id]);
    return applyStudents;
  } catch (error) {
    console.error("Error retrieving apply students by ID:", error);
    throw new Error("Internal server error");
  }
}

async function updateStudentApplyForm({ student_id, formdata }) {
  try {
    const { name, disability, gender, preferences } = formdata;
    const updateApplyFormSql = `
      UPDATE student_apply_form
      SET name = ?,
          disability = ?,
          gender = ?
      WHERE student_id = ?
    `;
    await query(updateApplyFormSql, [name, disability, gender, student_id]);

    // Check if preferences already exist for the student
    const existingPreferencesSql = `
      SELECT * FROM student_preferences WHERE student_id = ?
    `;
    const existingPreferences = await query(existingPreferencesSql, [
      student_id,
    ]);

    if (existingPreferences.length > 0) {
      // Preferences exist, update them
      for (let i = 0; i < preferences.length; i++) {
        const updatePreferenceSql = `
          UPDATE student_preferences
          SET company_id = ?
          WHERE student_id = ? AND preference_order = ?
        `;
        await query(updatePreferenceSql, [preferences[i], student_id, i + 1]);
      }
    } else {
      // Preferences do not exist, insert new preferences
      for (let i = 0; i < preferences.length; i++) {
        const insertPreferenceSql = `
          INSERT INTO student_preferences (apply_id, preference_order, student_id, company_id)
          VALUES (?, ?, ?, ?)
        `;
        await query(insertPreferenceSql, [
          apply_id, // Assuming apply_id is available in the scope
          i + 1,
          student_id,
          preferences[i],
        ]);
      }
    }

    return "Apply form data updated successfully";
  } catch (error) {
    console.error("Error updating student apply form data:", error);
    throw new Error("Internal server error");
  }
}

async function deleteAllPlacementResults() {
  try {
    // Write the SQL query to delete all records from the "placement_results" table
    const sql = `DELETE FROM placement_results`;

    // Execute the query
    await query(sql);

    // Return a success message or handle the result as needed
    return {
      success: true,
      message: "All placement results have been deleted",
    };
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error("Error deleting placement results:", error);
    throw new Error("Failed to delete placement results");
  }
}

// Export the functions
module.exports = {
  checkIfStudentExists,
  createStudent,
  acceptStudentApplyForm,

  getStudent,
  getAllApplyStudents,
  getApplyStudentsById,
  getStudentsByDepartment,
  getAllStudents,
  getStudentPhoto,

  updateStudent,
  updateStudentApplyForm,
  updateStudentProfile,

  deleteStudent,
  deleteAllPlacementResults,
  changePassword,
};
