// Import necessary dependencies
const { query } = require("../config/db.config");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../sendEmail");

// Function to check if the admin exists in the database
async function checkIfAdminExists(username) {
  const sql = "SELECT * FROM acadamic WHERE username = ?";
  const rows = await query(sql, [username]);
  return rows.length > 0;
}

// Function to create a new admin
async function createAdmin(admin) {
  try {
    // Construct the username as "acadamic_firstname_firstTwoLettersOfLastName"
    const username = `acadamic.${admin.full_name
      .toLowerCase()
      .replace(/\s+/g, "")}`;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(admin.password, 10);

    // Check if the admin already exists
    const adminExists = await checkIfAdminExists(username);
    if (adminExists) {
      throw new Error("Acadamic already exists.");
    }

    // Insert admin details into the acadamic table, including phone number, location, and college name
    const insertAdminSql = `
      INSERT INTO acadamic (
        full_name,
        username,
        email,
        phone_number,
        location,
        college_name,
        photo,
        password
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const defaultPhotoPath = "default.jpg";
    const result = await query(insertAdminSql, [
      admin.full_name,
      username,
      admin.email,
      admin.phone_number,
      admin.location,
      admin.college_name,
      defaultPhotoPath,
      hashedPassword,
    ]);
    const adminId = result.insertId;
    await sendEmail(admin.full_name, admin.email, username, admin.password);
    return adminId;
  } catch (error) {
    console.error("Error creating acadamic:", error.message);
    throw new Error("Failed to create acadamic");
  }
}
async function deleteAcademic(academicId) {
  try {
    // Check if academicId is undefined
    if (academicId === undefined) {
      throw new Error("Academic ID is undefined");
    }

    const deleteSql = "DELETE FROM acadamic WHERE acadamic_id = ?";
    const result = await query(deleteSql, [academicId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error deleting academic:", error.message);
    throw new Error("Failed to delete academic");
  }
}

async function getAdminById(adminId) {
  try {
    // Construct SQL query to fetch admin by ID
    const sql = "SELECT * FROM acadamic WHERE acadamic_id = ?";

    // Execute the query with the admin ID as a parameter
    const [admin] = await query(sql, [adminId]);

    // Return the admin data
    return admin;
  } catch (error) {
    console.error("Error getting acadamic by ID:", error.message);
    throw new Error("Failed to get acadamic by ID");
  }
}

// Function to retrieve all admins from the database
async function getAllAdmins() {
  try {
    const sql = "SELECT * FROM acadamic";
    const admins = await query(sql);
    return admins;
  } catch (error) {
    console.error("Error retrieving admins:", error.message);
    throw new Error("Failed to retrieve admins");
  }
}

async function updateAdmin(adminId, adminData) {
  try {
    console.log("ad", adminData);
    const { full_name, email, photo } = adminData;

    // Check if a photo filename is provided and update the adminData accordingly
    const last_name = "HU";

    const username = `acadamic.${full_name.toLowerCase()}.${last_name
      .slice(0, 2)
      .toLowerCase()}`;

    // Update the admin data
    const updateSql = `
      UPDATE acadamic
      SET full_name = ?,
         
         
          username = ?,
          email = ?,
          photo = ?
      WHERE acadamic_id = ?
    `;

    const params = [full_name, username, email, photo, adminId];

    // Execute the SQL update query
    const result = await query(updateSql, params);

    // Check if the update was successful
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`Error updating acadamic: ${error.message}`);
  }
}

// Function to change the password of an admin
async function changePassword(
  adminId,
  oldPassword,
  newPassword,
  confirmPassword
) {
  try {
    // Check if the new password matches the confirm password
    if (newPassword !== confirmPassword) {
      throw new Error("New password and confirm password do not match");
    }

    // Retrieve the current password of the admin from the database
    const sql = "SELECT password FROM acadamic WHERE acadamic_id = ?";
    const [admin] = await query(sql, [adminId]);

    // Verify if the provided old password matches the current password
    const isPasswordValid = await bcrypt.compare(oldPassword, admin.password);
    if (!isPasswordValid) {
      throw new Error("Old password is incorrect");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the admin's password in the database
    const updatePasswordSql = `
      UPDATE acadamic
      SET password = ?
      WHERE acadamic_id = ?
    `;
    const result = await query(updatePasswordSql, [hashedPassword, adminId]);

    // Check if the password was updated successfully
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Failed to change password: " + error.message);
  }
}

async function getAdminPhoto(adminId) {
  try {
    // Fetch admin data by ID
    const admin = await getAdminById(adminId);

    // Return admin's photo filename
    return admin?.photo;
  } catch (error) {
    console.error("Error getting admin photo:", error);
    throw new Error("Failed to get admin photo");
  }
}

module.exports = {
  deleteAcademic,
  checkIfAdminExists,
  getAdminById,
  createAdmin,
  getAllAdmins,
  updateAdmin,
  changePassword,
  getAdminPhoto,
};
