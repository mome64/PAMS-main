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
import { useAuth } from "../../../context/AuthContext";

const CreateDepartment = () => {
  const { collage } = useAuth();
  const [formData, setFormData] = useState({
    department_name: "",
    phone_number: "",
    contact_email: "",
    office_location: "",
    password: "",
    collage,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleCloseModal = () => {
    setModalVisible(false);
    setErrors({});
    setTouched({});
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "department_name":
        if (!value.trim()) error = "Department name is required";
        else if (value.length < 3)
          error = "Department name must be at least 3 characters";
        else if (!/^[a-zA-Z\s\-']+$/.test(value))
          error = "Department name contains invalid characters";
        break;

      case "phone_number":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^\d{10}$/.test(value))
          error = "Phone number must be 10 digits";
        break;

      case "contact_email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        if (!value.toLowerCase().endsWith("@gmail.com"))
          error = "Only @gmail.com addresses are accepted";

        break;

      case "office_location":
        if (!value.trim()) error = "Office location is required";
        else if (value.length < 5)
          error = "Office location must be at least 5 characters";
        break;

      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 8)
          error = "Password must be at least 8 characters";
        else if (!/[A-Z]/.test(value))
          error = "Password must contain at least one uppercase letter";
        else if (!/[a-z]/.test(value))
          error = "Password must contain at least one lowercase letter";
        else if (!/[0-9]/.test(value))
          error = "Password must contain at least one number";

        break;

      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (key !== "collage") {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    setTouched({ ...touched, [id]: true });

    // Validate the field when it loses focus
    const error = validateField(id, formData[id]);
    setErrors({ ...errors, [id]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Mark all fields as touched to show errors
      const allTouched = {};
      Object.keys(formData).forEach((key) => {
        if (key !== "collage") allTouched[key] = true;
      });
      setTouched(allTouched);
      return;
    }

    try {
      const response = await departmentService.createDepartment(formData);

      if (response.status === 400) {
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
          collage: collage,
        });
        setErrors({});
        setTouched({});
        toast.success(responseData.message, { autoClose: 2000 });
      }

      setModalVisible(false);
    } catch (error) {
      toast.error("Error creating department.", { autoClose: 2000 });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Validate the field as the user types (if it's been touched)
    if (touched[id]) {
      const error = validateField(id, value);
      setErrors({ ...errors, [id]: error });
    }
  };

  return (
    <div>
      <Button size="medium" onClick={() => setModalVisible(true)}>
        Add New
      </Button>

      {modalVisible && (
        <Modal onClick={handleCloseModal}>
          <Form onSubmit={handleSubmit}>
            <FormRow
              label="Department Name"
              error={touched.department_name && errors.department_name}
            >
              <Input
                type="text"
                id="department_name"
                autoComplete="on"
                value={formData.department_name}
                onChange={handleChange}
                onBlur={handleBlur}
                $invalid={touched.department_name && !!errors.department_name}
              />
            </FormRow>

            <FormRow
              label="Phone Number"
              error={touched.phone_number && errors.phone_number}
            >
              <Input
                type="tel"
                id="phone_number"
                autoComplete="on"
                value={formData.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                $invalid={touched.phone_number && !!errors.phone_number}
              />
            </FormRow>

            <FormRow
              label="Contact Email"
              error={touched.contact_email && errors.contact_email}
            >
              <Input
                type="email"
                id="contact_email"
                autoComplete="on"
                value={formData.contact_email}
                onChange={handleChange}
                onBlur={handleBlur}
                $invalid={touched.contact_email && !!errors.contact_email}
              />
            </FormRow>

            <FormRow
              label="Office Location"
              error={touched.office_location && errors.office_location}
            >
              <Input
                type="text"
                id="office_location"
                autoComplete="on"
                value={formData.office_location}
                onChange={handleChange}
                onBlur={handleBlur}
                $invalid={touched.office_location && !!errors.office_location}
              />
            </FormRow>

            <FormRow
              label="Password"
              error={touched.password && errors.password}
            >
              <Input
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                $invalid={touched.password && !!errors.password}
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
