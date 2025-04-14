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

const CreateCompany = () => {
  const [formData, setFormData] = useState({
    company_name: "",
    phone_number: "",
    contact_email: "",
    location: "",
    industry_sector: "",
    accepted_student_limit: "",
    password: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate company name
    if (!formData.company_name) {
      newErrors.company_name = "Company name is required";
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

    // Validate location
    if (!formData.location) {
      newErrors.location = "Location is required";
      valid = false;
    }

    // Validate industry sector
    if (!formData.industry_sector) {
      newErrors.industry_sector = "Industry sector is required";
      valid = false;
    }

    // Validate accepted student limit
    if (!formData.accepted_student_limit) {
      newErrors.accepted_student_limit = "Accepted student limit is required";
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

  const isValidEmail = (email) => {
    // Email validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Send post request to create company
      const response = await companyService.createCompany(formData);

      if (response.status === 400) {
        // If department name already exists
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
        });
        setErrors({});
        toast.success(responseData.message, { autoClose: 2000 });
      }

      setModalVisible(false);
    } catch (error) {
      toast.error(
        "Error to creating company:",
        {
          autoClose: 2000,
        },
        error.message
      );
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCloseModal = () => {
    setModalVisible(false);
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
              />
            </FormRow>
            <FormRow label="Phone Number" error={errors.phone_number}>
              <Input
                type="text"
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
            <FormRow label="Location" error={errors.location}>
              <Input
                type="text"
                id="location"
                autoComplete="on"
                value={formData.location}
                onChange={handleChange}
              />
            </FormRow>
            <FormRow label="Industry Sector" error={errors.industry_sector}>
              <Input
                type="text"
                id="industry_sector"
                autoComplete="on"
                value={formData.industry_sector}
                onChange={handleChange}
              />
            </FormRow>
            <FormRow
              label="Accepted Student Limit"
              error={errors.accepted_student_limit}
            >
              <Input
                type="number"
                id="accepted_student_limit"
                autoComplete="on"
                value={formData.accepted_student_limit}
                onChange={handleChange}
              />
            </FormRow>

            <FormRow label="Website">
              <Input
                type="text"
                id="website"
                autoComplete="on"
                value={formData.website}
                onChange={handleChange}
              />
            </FormRow>

            <FormRow label="Password" error={errors.password}>
              <Input
                type="password"
                id="password"
                autoComplete="on"
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
              <Button>Create Company</Button>
            </div>
          </Form>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default CreateCompany;
