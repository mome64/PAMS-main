// Import necessary dependencies
const { query } = require("../config/db.config");
const bcrypt = require("bcrypt");

// Function to check if the admin exists in the database
async function checkIfAdminExists(username) {
  const sql = "SELECT * FROM admins WHERE username = ?";
  const rows = await query(sql, [username]);
  return rows.length > 0;
}

// Function to create a new admin
async function createAdmin(admin) {
  try {
    // Construct the username as "admin_firstname_firstTwoLettersOfLastName"
    const username = `admin.${admin.first_name.toLowerCase()}.${admin.last_name
      .slice(0, 2)
      .toLowerCase()}`;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(admin.password, 10);

    // Check if the admin already exists
    const adminExists = await checkIfAdminExists(username);
    if (adminExists) {
      throw new Error("Admin already exists.");
    }

    // Insert admin details into the admins table, including the default photo path
    const insertAdminSql = `
        INSERT INTO admins (
          first_name,
          last_name,
          username,
          email,
          photo,
          password
        ) VALUES (?, ?, ?, ?, ?, ?)
      `;
    const defaultPhotoPath = "default.jpg";
    const result = await query(insertAdminSql, [
      admin.first_name,
      admin.last_name,
      username,
      admin.email,
      defaultPhotoPath,
      hashedPassword,
    ]);
    const adminId = result.insertId;

    return adminId;
  } catch (error) {
    console.error("Error creating admin:", error.message);
    throw new Error("Failed to create admin");
  }
}

async function getAdminById(adminId) {
  try {
    // Construct SQL query to fetch admin by ID
    const sql = "SELECT * FROM admins WHERE admin_id = ?";

    // Execute the query with the admin ID as a parameter
    const [admin] = await query(sql, [adminId]);

    // Return the admin data
    return admin;
  } catch (error) {
    console.error("Error getting admin by ID:", error.message);
    throw new Error("Failed to get admin by ID");
  }
}

// Function to retrieve all admins from the database
async function getAllAdmins() {
  try {
    const sql = "SELECT * FROM admins";
    const admins = await query(sql);
    return admins;
  } catch (error) {
    console.error("Error retrieving admins:", error.message);
    throw new Error("Failed to retrieve admins");
  }
}

async function updateAdmin(adminId, adminData, photoFilename) {
  try {
    const { first_name, last_name, email } = adminData;

    // Check if a photo filename is provided and update the adminData accordingly
    if (photoFilename) {
      adminData.photo = photoFilename;
    }

    const username = `admin.${first_name.toLowerCase()}.${last_name
      .slice(0, 2)
      .toLowerCase()}`;

    // Update the admin data
    const updateSql = `
      UPDATE admins
      SET first_name = ?,
          last_name = ?,
          username = ?,
          email = ?,
          photo = ?
      WHERE admin_id = ?
    `;

    const params = [
      first_name,
      last_name,
      username,
      email,
      adminData.photo,
      adminId,
    ];

    // Execute the SQL update query
    const result = await query(updateSql, params);

    // Check if the update was successful
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`Error updating admin: ${error.message}`);
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
    const sql = "SELECT password FROM admins WHERE admin_id = ?";
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
      UPDATE admins
      SET password = ?
      WHERE admin_id = ?
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
    return admin.photo;
  } catch (error) {
    console.error("Error getting admin photo:", error);
    throw new Error("Failed to get admin photo");
  }
}

module.exports = {
  checkIfAdminExists,
  getAdminById,
  createAdmin,
  getAllAdmins,
  updateAdmin,
  changePassword,
  getAdminPhoto,
};
