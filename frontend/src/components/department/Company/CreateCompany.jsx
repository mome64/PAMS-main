import { useState } from "react";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import CancelButton from "../../../ui/CancelButton";
import Modal from "../../../ui/Modal";
import companyService from "../../../services/company.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/AuthContext";

const CreateCompany = () => {
  const { collage } = useAuth();
  const [formData, setFormData] = useState({
    company_name: "",
    phone_number: "",
    contact_email: "",
    location: "",
    industry_sector: "",
    accepted_student_limit: "",
    website: "",
    password: "",
    collage: collage,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "company_name":
        if (!value.trim()) return "Company name is required";
        if (!/^[A-Za-z0-9\s&.,-]+$/.test(value))
          return "Company name can only contain letters, numbers, spaces, &, ., -";
        if (value.length < 3)
          return "Company name must be at least 3 characters";
        if (value.length > 100)
          return "Company name must be less than 100 characters";
        return "";

      case "phone_number":
        if (!value.trim()) return "Phone number is required";
        const cleanedValue = value.replace(/[^\d+]/g, "");
        const isMobile = /^(09|\+2519)\d{8}$/.test(cleanedValue);
        const isFixedLine = /^(7|2517)\d{6,9}$/.test(cleanedValue);

        if (!isMobile && !isFixedLine) {
          return "Invalid Ethiopian phone number format";
        }

        if (isMobile) {
          if (
            (cleanedValue.startsWith("09") && cleanedValue.length !== 10) ||
            (cleanedValue.startsWith("+2519") && cleanedValue.length !== 13)
          ) {
            return cleanedValue.startsWith("09")
              ? "Local mobile must be 10 digits (09XXXXXXXX)"
              : "International mobile must be 13 digits (+2519XXXXXXXX)";
          }
        } else {
          if (
            (cleanedValue.startsWith("7") && cleanedValue.length !== 7) ||
            (cleanedValue.startsWith("2517") && cleanedValue.length !== 11)
          ) {
            return cleanedValue.startsWith("7")
              ? "Local fixed line must be 7 digits (7XXXXXXX)"
              : "International fixed must be 11 digits (2517XXXXXXX)";
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

      case "location":
        if (!value.trim()) return "Location is required";
        if (!/^[A-Za-z0-9\s\-,.]+$/.test(value))
          return "Location can only contain letters, numbers, spaces, - and ,";
        return "";

      case "industry_sector":
        if (!value.trim()) return "Industry sector is required";
        if (!/^[A-Za-z\s\-&]+$/.test(value))
          return "Industry sector can only contain letters, spaces, & and -";
        return "";

      case "accepted_student_limit":
        if (!value.trim()) return "Student limit is required";
        if (isNaN(value) || Number(value) <= 0)
          return "Must be a positive number";
        if (Number(value) > 1000) return "Student limit cannot exceed 1000";
        return "";

      case "website":
        if (
          value &&
          !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
            value
          )
        )
          return "Invalid website URL format";
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
        if (!/[!@#$%^&*]/.test(value))
          return "Password must contain at least one special character";
        return "";

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      if (field === "collage") return; // Skip collage validation as it comes from context
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await companyService.createCompany(formData);

      if (response.status === 400) {
        const responseData = await response.json();
        toast.error(responseData.error, { autoClose: 1000 });
        return;
      }

      if (!response.ok) {
        toast.error("Failed to create company", { autoClose: 2000 });
        return;
      }

      const responseData = await response.json();
      if (response.status === 200) {
        setFormData({
          company_name: "",
          phone_number: "",
          contact_email: "",
          location: "",
          industry_sector: "",
          accepted_student_limit: "",
          website: "",
          password: "",
          collage: collage,
        });
        setErrors({});
        toast.success(responseData.message, { autoClose: 2000 });
      }

      setModalVisible(false);
    } catch (error) {
      toast.error("Error creating company: " + error.message, {
        autoClose: 2000,
      });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Validate field on change if it has an error
    if (errors[id]) {
      const error = validateField(id, value);
      setErrors((prev) => ({
        ...prev,
        [id]: error || undefined,
      }));
    }
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    const error = validateField(id, value);
    setErrors((prev) => ({
      ...prev,
      [id]: error || undefined,
    }));
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setFormData({
      company_name: "",
      phone_number: "",
      contact_email: "",
      location: "",
      industry_sector: "",
      accepted_student_limit: "",
      website: "",
      password: "",
      collage: collage,
    });
    setErrors({});
  };

  return (
    <div>
      <Button size="medium" onClick={() => setModalVisible(true)}>
        Add New
      </Button>

      {modalVisible && (
        <Modal onClick={handleCloseModal}>
          <Form onSubmit={handleSubmit}>
            <FormRow label="Company Name" error={errors.company_name}>
              <Input
                type="text"
                id="company_name"
                autoComplete="on"
                value={formData.company_name}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!errors.company_name}
              />
            </FormRow>
            <FormRow label="Phone Number" error={errors.phone_number}>
              <Input
                type="text"
                id="phone_number"
                autoComplete="tel"
                value={formData.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!errors.phone_number}
                placeholder="e.g., 0912345678 or +251912345678"
              />
            </FormRow>
            <FormRow label="Contact Email" error={errors.contact_email}>
              <Input
                type="email"
                id="contact_email"
                autoComplete="email"
                value={formData.contact_email}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!errors.contact_email}
                placeholder="e.g., contact@company.com"
              />
            </FormRow>
            <FormRow label="Location" error={errors.location}>
              <Input
                type="text"
                id="location"
                autoComplete="on"
                value={formData.location}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!errors.location}
                placeholder="e.g., Addis Ababa, Bole"
              />
            </FormRow>
            <FormRow label="Industry Sector" error={errors.industry_sector}>
              <Input
                type="text"
                id="industry_sector"
                autoComplete="on"
                value={formData.industry_sector}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!errors.industry_sector}
                placeholder="e.g., Technology, Healthcare"
              />
            </FormRow>
            <FormRow
              label="Accepted Student Limit"
              error={errors.accepted_student_limit}
            >
              <Input
                type="number"
                id="accepted_student_limit"
                min="1"
                max="1000"
                value={formData.accepted_student_limit}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!errors.accepted_student_limit}
              />
            </FormRow>

            <FormRow label="Website" error={errors.website}>
              <Input
                type="url"
                id="website"
                autoComplete="on"
                value={formData.website}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!errors.website}
                placeholder="e.g., https://company.com"
              />
            </FormRow>

            <FormRow label="Password" error={errors.password}>
              <Input
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!errors.password}
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
              <Button type="submit">Create Company</Button>
            </div>
          </Form>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default CreateCompany;
