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
    photo: null,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.full_name)
      validationErrors.full_name = "Full name is required";
    if (!formData.email) validationErrors.email = "Email is required";
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      console.log(data);
      const data = new FormData();
      data.append("full_name", formData.full_name);
      data.append("email", formData.email);
      if (formData.photo) data.append("photo", formData.photo);

      const updateRes = await adminService.updateAdmin(userId, data);
      console.log(updateRes);
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
          value={formData.full_name}
          onChange={handleChange}
        />
      </FormRow>

      <FormRow label="Email" error={errors.email}>
        <Input
          type="email"
          id="email"
          name="email"
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
