import { useState, useEffect } from "react";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import adminService from "../../../services/admin.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CancelButton from "../../../ui/CancelButton";
import { useAuth } from "../../../context/AuthContext";

function UpdateProfile() {
  const { userId } = useAuth();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    photo: "default.jpg",
  });

  const [errors, setErrors] = useState({});

  const fetchAdminData = async () => {
    try {
      const response = await adminService.getAdminById(userId);

      if (!response.ok) {
        throw new Error("Failed to fetch admin data");
      }
      const adminData = await response.json();
      const admin = adminData.data;
      setFormData(admin);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      toast.error("Error fetching admin data", { autoClose: 2000 });
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [userId]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "first_name":
        if (!value.trim()) {
          error = "First Name is required";
        } else if (value.length < 2) {
          error = "First Name must be at least 2 characters";
        } else if (!/^[a-zA-Z]+$/.test(value)) {
          error = "First Name can only contain letters";
        }
        break;
      case "last_name":
        if (!value.trim()) {
          error = "Last Name is required";
        } else if (value.length < 2) {
          error = "Last Name must be at least 2 characters";
        } else if (!/^[a-zA-Z]+$/.test(value)) {
          error = "Last Name can only contain letters";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "photo":
        if (value && value !== "default.jpg") {
          const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
          const maxSize = 2 * 1024 * 1024; // 2MB
          if (value.size > maxSize) {
            error = "Image size must be less than 2MB";
          } else if (!allowedTypes.includes(value.type)) {
            error = "Only JPG, PNG, or GIF images are allowed";
          }
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate field on change
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      photo: file || "default.jpg",
    }));

    // Validate file
    const error = validateField("photo", file);
    setErrors((prevErrors) => ({
      ...prevErrors,
      photo: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      if (key !== "photo" || formData[key] !== "default.jpg") {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const formDataWithFile = new FormData();
        formDataWithFile.append("first_name", formData.first_name);
        formDataWithFile.append("last_name", formData.last_name);
        formDataWithFile.append("email", formData.email);
        if (formData.photo && formData.photo !== "default.jpg") {
          formDataWithFile.append("photo", formData.photo);
        }

        // Update admin information
        const updateResponse = await adminService.updateAdmin(
          userId,
          formDataWithFile
        );

        if (!updateResponse.ok) {
          throw new Error("Failed to update admin");
        }

        // Show success toast message
        toast.success("Profile updated successfully", {
          autoClose: 500,
        });
      } catch (error) {
        console.error("Error updating admin profile:", error);
        // Show error toast message
        toast.error("Failed to update admin profile", { autoClose: 2000 });
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="First Name" error={errors?.first_name}>
        <Input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
      </FormRow>

      <FormRow label="Last Name" error={errors?.last_name}>
        <Input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email}>
        <Input
          type="email"
          id="email"
          name="email"
          autoComplete="off"
          value={formData.email}
          onChange={handleChange}
        />
      </FormRow>

      <FormRow label="Profile Photo" error={errors?.photo}>
        <Input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handleFileChange}
        />
      </FormRow>

      <FormRow>
        <CancelButton
          variant="secondary"
          type="reset"
          onClick={() =>
            setFormData({
              first_name: "",
              last_name: "",
              email: "",
              photo: "default.jpg",
            })
          }
        >
          Cancel
        </CancelButton>
        <Button type="submit">Update Profile</Button>
      </FormRow>
      <ToastContainer />
    </Form>
  );
}

export default UpdateProfile;
