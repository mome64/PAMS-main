import React, { useState } from "react";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import Modal from "../../../ui/Modal";
import CancelButton from "../../../ui/CancelButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import departmentService from "../../../services/department.service";

const CreateDepartment = () => {
  const [formData, setFormData] = useState({
    department_name: "",
    phone_number: "",
    contact_email: "",
    office_location: "",
    password: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate department name
    if (!formData.department_name) {
      newErrors.department_name = "Department name is required";
      valid = false;
    }

    // Validate phone number
    if (!formData.phone_number) {
      newErrors.phone_number = "Phone number is required";
      valid = false;
    }

    // Validate contact email
    if (!formData.contact_email) {
      newErrors.contact_email = "Contact email is required";
      valid = false;
    } else if (!isValidEmail(formData.contact_email)) {
      newErrors.contact_email = "Invalid email format";
      valid = false;
    }

    // Validate office location
    if (!formData.office_location) {
      newErrors.office_location = "Office location is required";
      valid = false;
    }

    // Validate password
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Send post request to create department
      const response = await departmentService.createDepartment(formData);

      if (response.status === 400) {
        // If department name already exists
        const responseData = await response.json();
        toast.error(responseData.error, { autoClose: 1000 });
        return;
      }

      if (!response.ok) {
        toast.error("Failed to create department", { autoClose: 1000 });
        return;
      }

      const responseData = await response.json();
      if (response.status === 200) {
        setFormData({
          department_name: "",
          phone_number: "",
          contact_email: "",
          office_location: "",
          password: "",
        });
        setErrors({});
        toast.success(responseData.message, { autoClose: 2000 });
      }

      setModalVisible(false);
    } catch (error) {
      // Show error message using toast notification
      toast.error("Error creating department.", { autoClose: 2000 });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const isValidEmail = (email) => {
    // Email validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div>
      <Button size="medium" onClick={() => setModalVisible(true)}>
        Add New
      </Button>

      {modalVisible && (
        <Modal onClick={handleCloseModal}>
          <Form onSubmit={handleSubmit}>
            <FormRow label="Department Name" error={errors.department_name}>
              <Input
                type="text"
                id="department_name"
                autoComplete="on"
                value={formData.department_name}
                onChange={handleChange}
              />
            </FormRow>
            <FormRow label="Phone Number" error={errors.phone_number}>
              <Input
                type="number"
                id="phone_number"
                autoComplete="on"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </FormRow>
            <FormRow label="Contact Email" error={errors.contact_email}>
              <Input
                type="text"
                id="contact_email"
                autoComplete="on"
                value={formData.contact_email}
                onChange={handleChange}
              />
            </FormRow>
            <FormRow label="Office Location" error={errors.office_location}>
              <Input
                type="text"
                id="office_location"
                autoComplete="on"
                value={formData.office_location}
                onChange={handleChange}
              />
            </FormRow>
            <FormRow label="Password" error={errors.password}>
              <Input
                type="password"
                id="password"
                autoComplete="off"
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
              <Button type="submit">Create Department</Button>
            </div>
          </Form>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default CreateDepartment;
