const adminService = require("../service/admin.service");
const multer = require("multer");

async function createAdmin(req, res, next) {
  try {
    // Check if all required fields exist in req.body
    const { first_name, last_name, email, photo, password } = req.body;

    // Generate the username automatically
    const username = `admin.${first_name.toLowerCase()}.${last_name
      .slice(0, 2)
      .toLowerCase()}`;

    // Check if admin username already exists
    const adminExists = await adminService.checkIfAdminExists(username);

    if (adminExists) {
      return res.status(400).json({
        error: "This admin username already exists!",
      });
    }

    // Create new admin
    const adminId = await adminService.createAdmin({
      first_name,
      last_name,
      email,
      photo,
      password,
    });

    return res.status(200).json({
      status: true,
      message: "Admin created successfully",
      adminId,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
async function getAdminById(req, res, next) {
  try {
    // Extract admin ID from request parameters
    const adminId = req.params.id;

    // Call the service function to get the admin by ID
    const admin = await adminService.getAdminById(adminId);

    // Send the admin data in the response
    return res.status(200).json({
      status: true,
      data: admin,
    });
  } catch (error) {
    console.error("Error getting admin by ID:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getAllAdmins(req, res, next) {
  try {
    const admins = await adminService.getAllAdmins();

    return res.status(200).json({
      status: true,
      admins,
    });
  } catch (error) {
    console.error("Error getting all admins:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function updateAdmin(req, res, next) {
  try {
    // Extract admin ID from request parameters
    const adminId = req.params.id;

    // Check if a file was uploaded
    let photoFilename = null;
    if (req.file) {
      photoFilename = req.file.filename;
    }

    // Call the service to update the admin
    const success = await adminService.updateAdmin(
      adminId,
      req.body,
      photoFilename
    );

    // Check if the admin was successfully updated
    if (success) {
      const admins = await adminService.getAllAdmins();
      return res.status(200).json({
        status: true,
        admins,
      });
    } else {
      // If update failed, return an error response
      return res.status(404).json({
        status: false,
        error: "Admin not found",
      });
    }
  } catch (error) {
    console.error("Error updating admin:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

const changePassword = async (req, res, next) => {
  try {
    const adminId = req.params.id;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Check if the new password matches the confirm password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: "fail",
        message: "New password and confirm password do not match.",
      });
    }

    // Call the service method to change the password
    const response = await adminService.changePassword(
      adminId,
      oldPassword,
      newPassword,
      confirmPassword
    );

    if (response) {
      return res.status(200).json({
        status: "success",
        message: "Password updated successfully",
      });
    } else {
      return res.status(400).json({
        status: "fail",
        message: "Failed to update password. The old password is incorrect.",
      });
    }
  } catch (error) {
    if (error.message === "Old password is incorrect") {
      return res.status(402).json({
        status: "fail",
        message: "Failed to update password. The old password is incorrect.",
      });
    } else {
      return res.status(500).json({
        status: "fail",
        message: "Failed to update password. Please try again later.",
      });
    }
  }
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/admin");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.params.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const UplodeAdminPhoto = upload.single("photo");

async function getAdminPhoto(req, res, next) {
  try {
    // Extract admin ID from request parameters
    const adminId = req.params.id;

    // Call the service function to get the admin photo filename
    const photoFilename = await adminService.getAdminPhoto(adminId);

    // If photo filename is not found or empty, send a 404 response
    if (!photoFilename) {
      return res.status(404).json({
        status: false,
        error: "Admin photo not found",
      });
    }

    // Construct the photo URL based on the photo filename
    const photoUrl = `/public/images/admin/${photoFilename}`;

    // Send the photo URL in the response
    return res.status(200).json({
      status: true,
      photoUrl,
    });
  } catch (error) {
    console.error("Error getting admin photo:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  createAdmin,
  getAdminById,
  getAllAdmins,
  updateAdmin,
  changePassword,
  updateAdmin,
  UplodeAdminPhoto,
  getAdminPhoto,
};
