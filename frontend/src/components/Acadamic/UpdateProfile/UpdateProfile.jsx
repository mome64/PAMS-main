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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      photo: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.first_name) {
      errors.first_name = "First Name is required";
    }
    if (!formData.last_name) {
      errors.last_name = "Last Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    }

    setErrors(errors);

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      try {
        const formDataWithFile = new FormData();
        formDataWithFile.append("first_name", formData.first_name);
        formDataWithFile.append("last_name", formData.last_name);
        formDataWithFile.append("email", formData.email);
        if (formData.photo) {
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

      <FormRow label="Profile Photo">
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
              photo: null,
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
