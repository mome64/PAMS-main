import React, { useEffect, useState } from "react";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import Modal from "../../../ui/Modal";
import CancelButton from "../../../ui/CancelButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import departmentService from "../../../services/department.service";
import adminService from "../../../services/acadamic.service";

const CreateDepartment = () => {
  const [collage, setCollage] = useState([]);
  const [formData, setFormData] = useState({
    department_name: "",
    phone_number: "",
    contact_email: "",
    office_location: "",
    password: "",
    collage: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const fetchCollage = async () => {
      try {
        const res = await adminService.getAllAdmins();
        const data = await res.json();
        setCollage(data.admins?.map((collage) => collage.college_name));
      } catch (error) {
        console.error("Error fetching collage data:", error);
      }
    };
    fetchCollage();
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "department_name":
        if (!value.trim()) return "Department name is required";
        if (!/^[A-Za-z\s\-']+$/.test(value))
          return "Department name can only contain letters, spaces";
        if (value.length < 3)
          return "Department name must be at least 3 characters";
        return "";

      case "phone_number":
        if (!value.trim()) return "Phone number is required";
        const cleanedValue = value.replace(/[^\d+]/g, "");
        const isMobile = /^(09|\+2519)\d{8}$/.test(cleanedValue);
        const isFixedLine = /^(7|2517)\d{6,9}$/.test(cleanedValue);

        if (!isMobile && !isFixedLine) {
          return "Invalid Phone number. ";
        }

        if (isMobile) {
          if (
            (cleanedValue.startsWith("09") && cleanedValue.length !== 10) ||
            (cleanedValue.startsWith("+2519") && cleanedValue.length !== 14)
          ) {
            return cleanedValue.startsWith("09")
              ? "Local mobile must be 10 digits (09XXXXXXXX)"
              : "International mobile must be 13 digits (+2519XXXXXXXX)";
          }
        } else {
          if (
            (cleanedValue.startsWith("7") && cleanedValue.length !== 7) ||
            (cleanedValue.startsWith("2517") && cleanedValue.length !== 12)
          ) {
            return cleanedValue.startsWith("7")
              ? "Local fixed line must be 7 digits (7XXXXXXX)"
              : "International fixed must be 12 digits (+2517XXXXXXX)";
          }
        }
        return "";

      case "contact_email":
        if (!value.trim()) return "Contact email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        if (!value.toLowerCase().endsWith("@gmail.com"))
          return "Only @gmail.com addresses are accepted";
        return "";

      case "office_location":
        if (!value.trim()) return "Office location is required";
        if (!/^[A-Za-z0-9\s\-,.]+$/.test(value))
          return "Office location can only contain letters, numbers, spaces";
        return "";

      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/[A-Z]/.test(value))
          return "Password must contain at least one uppercase letter";
        if (!/[a-z]/.test(value))
          return "Password must contain at least one lowercase letter";
        if (!/[0-9]/.test(value))
          return "Password must contain at least one number";

        return "";

      case "collage":
        if (!value.trim()) return "College selection is required";
        return "";

      default:
        return "";
    }
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    setTouched((prev) => ({ ...prev, [id]: true }));
    const errorMessage = validateField(id, formData[id]);
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Special handling for phone number formatting
    if (id === "phone_number") {
      // Remove all non-digit characters except '+'
      const cleanedValue = value.replace(/[^\d+]/g, "");

      // Format with spaces for better readability
      let formattedValue = cleanedValue;
      if (cleanedValue.startsWith("09") && cleanedValue.length > 2) {
        formattedValue = `09${cleanedValue.slice(2, 5)}`;
        if (cleanedValue.length > 5)
          formattedValue += ` ${cleanedValue.slice(5, 9)}`;
        if (cleanedValue.length > 9)
          formattedValue += ` ${cleanedValue.slice(9)}`;
      } else if (cleanedValue.startsWith("+2519") && cleanedValue.length > 5) {
        formattedValue = `+2519 ${cleanedValue.slice(
          5,
          8
        )} ${cleanedValue.slice(8, 12)}`;
      } else if (cleanedValue.startsWith("7") && cleanedValue.length > 1) {
        formattedValue = `7${cleanedValue.slice(1, 4)}`;
        if (cleanedValue.length > 4)
          formattedValue += ` ${cleanedValue.slice(4, 7)}`;
      }

      setFormData((prev) => ({ ...prev, [id]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }

    // Validate if the field has been touched
    if (touched[id]) {
      const errorMessage = validateField(
        id,
        id === "phone_number" ? formData[id].replace(/[^\d+]/g, "") : value
      );
      setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const value =
        key === "phone_number"
          ? formData[key].replace(/[^\d+]/g, "")
          : formData[key];
      const errorMessage = validateField(key, value);
      if (errorMessage) isValid = false;
      newErrors[key] = errorMessage;
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form", { autoClose: 2000 });
      return;
    }

    try {
      // Prepare data with clean phone number
      const submitData = {
        ...formData,
        phone_number: formData.phone_number.replace(/[^\d+]/g, ""),
      };

      const response = await departmentService.createDepartment(submitData);

      if (response.status === 400) {
        const data = await response.json();
        toast.error(data.error, { autoClose: 1000 });
        return;
      }

      if (!response.ok) {
        toast.error("Failed to create department", { autoClose: 2000 });
        return;
      }

      const data = await response.json();
      if (response.status === 200) {
        setFormData({
          department_name: "",
          phone_number: "",
          contact_email: "",
          office_location: "",
          password: "",
          collage: "",
        });
        setErrors({});
        setTouched({});
        toast.success(data.message, { autoClose: 2000 });
      }

      setModalVisible(false);
    } catch (error) {
      toast.error("Error creating department: " + error.message, {
        autoClose: 2000,
      });
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setErrors({});
    setTouched({});
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
                onBlur={handleBlur}
                hasError={errors.department_name}
                placeholder="Enter department name"
              />
            </FormRow>
            <FormRow label="Phone Number" error={errors.phone_number}>
              <Input
                type="text"
                id="phone_number"
                autoComplete="on"
                value={formData.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={errors.phone_number}
                placeholder="Enter Phone ... "
              />
            </FormRow>
            <FormRow label="Contact Email" error={errors.contact_email}>
              <Input
                type="email"
                id="contact_email"
                autoComplete="on"
                value={formData.contact_email}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={errors.contact_email}
                placeholder="example@domain.com"
              />
            </FormRow>
            <FormRow label="Office Location" error={errors.office_location}>
              <Input
                type="text"
                id="office_location"
                autoComplete="on"
                value={formData.office_location}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={errors.office_location}
                placeholder="Building name, room number"
              />
            </FormRow>
            <FormRow label="Select College" error={errors.collage}>
              <select
                id="collage"
                value={formData.collage}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-2 border rounded-md ${
                  errors.collage ? "border-red-500" : ""
                }`}
              >
                <option value="">Select College</option>
                {collage.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </FormRow>
            <FormRow label="Password" error={errors.password}>
              <Input
                type="password"
                id="password"
                autoComplete="off"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={errors.password}
                placeholder="At least 8 characters with mixed case, numbers, and symbols"
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
