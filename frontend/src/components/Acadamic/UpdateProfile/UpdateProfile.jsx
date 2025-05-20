import { useState, useEffect } from "react";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import adminService from "../../../services/acadamic.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CancelButton from "../../../ui/CancelButton";
import { useAuth } from "../../../context/AuthContext";

function UpdateProfile() {
  const { userId } = useAuth();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    photo: "default.jpg",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminService.getAdminById(userId);
        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        const academic = data.data;

        setFormData({
          full_name: academic.full_name || "",
          email: academic.email || "",
          photo: null,
        });
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load profile");
      }
    };

    if (userId) fetchData();
  }, [userId]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "full_name":
        if (!value.trim()) {
          error = "Full name is required";
        } else if (value.length < 3) {
          error = "Full name must be at least 3 characters";
        } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
          error = "Full name can only contain letters and spaces";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        } else if (!value.endsWith("@gmail.com")) {
          error = "Only Gmail addresses are allowed (@gmail.com)";
        }
        break;
      case "photo":
        if (!value) {
          error = "Profile photo is required";
        } else if (value && value !== "default.jpg") {
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
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate the field when it changes
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Update the form data with the file object for validation
    setFormData((prev) => ({ ...prev, photo: file }));

    // Validate the file
    const error = validateField("photo", file);
    setErrors((prev) => ({ ...prev, photo: error }));

    // If valid, extract the file name for submission
    if (!error) {
      const filePath = e.target.value;
      const fileName = filePath.split(/(\\|\/)/g).pop();
      setFormData((prev) => ({ ...prev, photo: fileName }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate all fields
    Object.keys(formData).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const data = new FormData();
      data.append("full_name", formData.full_name);
      data.append("email", formData.email);
      if (formData.photo && formData.photo !== "default.jpg") {
        data.append("photo", formData.photo);
      }
      const formDataObject = Object.fromEntries(data.entries());

      const updateRes = await adminService.updateAdmin(userId, formDataObject);

      if (!updateRes.ok) throw new Error("Failed to update");
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Update failed");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Full Name" error={errors.full_name}>
        <Input
          type="text"
          id="full_name"
          name="full_name"
          required
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
      </FormRow>

      <FormRow label="Email" error={errors.email}>
        <Input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="example@gmail.com"
        />
      </FormRow>

      <FormRow label="Profile Photo" error={errors.photo}>
        <Input
          type="file"
          id="photo"
          required
          name="photo"
          accept="image/*"
          onChange={handleFileChange}
        />
      </FormRow>

      <FormRow>
        <CancelButton
          type="reset"
          onClick={() => setFormData({ full_name: "", email: "", photo: null })}
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
