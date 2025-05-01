import { useState } from "react";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import CancelButton from "../../../ui/CancelButton";
import Modal from "../../../ui/Modal";
import adminService from "../../../services/acadamic.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateAcadamic = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    phone_number: "",
    location: "",
    college_name: "",
    password: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.full_name) {
      newErrors.full_name = "Full name is required";
      valid = false;
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.phone_number) {
      newErrors.phone_number = "Phone number is required";
      valid = false;
    }

    if (!formData.location) {
      newErrors.location = "Location is required";
      valid = false;
    }

    if (!formData.college_name) {
      newErrors.college_name = "College name is required";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await adminService.createAdmin(formData);

      if (response.status === 400) {
        const data = await response.json();
        toast.error(data.error, { autoClose: 1000 });
        return;
      }

      if (!response.ok) {
        toast.error("Failed to create acadamic", { autoClose: 2000 });
        return;
      }

      const data = await response.json();
      if (response.status === 200) {
        setFormData({
          full_name: "",
          username: "",
          email: "",
          phone_number: "",
          location: "",
          college_name: "",
          password: "",
        });
        setErrors({});
        toast.success(data.message, { autoClose: 2000 });
      }

      setModalVisible(false);
    } catch (error) {
      toast.error("Error creating acadamic: " + error.message, {
        autoClose: 2000,
      });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setErrors({});
  };

  return (
    <div>
      <Button size="medium" onClick={() => setModalVisible(true)}>
        Add New Acadamic
      </Button>

      {modalVisible && (
        <Modal onClick={handleCloseModal}>
          <Form onSubmit={handleSubmit}>
            <FormRow label="Full Name" error={errors.full_name}>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={handleChange}
              />
            </FormRow>
            <FormRow label="Username" error={errors.username}>
              <Input
                id="username"
                value={formData.username}
                onChange={handleChange}
              />
            </FormRow>
            <FormRow label="Email" error={errors.email}>
              <Input
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormRow>
            <FormRow label="Phone Number" error={errors.phone_number}>
              <Input
                id="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </FormRow>
            <FormRow label="Location" error={errors.location}>
              <Input
                id="location"
                value={formData.location}
                onChange={handleChange}
              />
            </FormRow>
            <FormRow label="College Name" error={errors.college_name}>
              <Input
                id="college_name"
                value={formData.college_name}
                onChange={handleChange}
              />
            </FormRow>
            <FormRow label="Password" error={errors.password}>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormRow>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "3rem",
                marginTop: "2rem",
              }}
            >
              <CancelButton onClick={handleCloseModal}>Cancel</CancelButton>
              <Button>Create Acadamic</Button>
            </div>
          </Form>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default CreateAcadamic;
