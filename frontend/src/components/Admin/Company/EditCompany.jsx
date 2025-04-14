import { useState, useEffect } from "react";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import Modal from "../../../ui/Modal";
import CancelButton from "../../../ui/CancelButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import companyService from "../../../services/company.service";
import { CompanyForm } from "../../FormField";

const EditCompany = ({
  companyId,
  initialData,
  onCancel,
  onCompanyUpdated,
}) => {
  const [formData, setFormData] = useState({});
  const [modalVisible, setModalVisible] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await companyService.getCompany(companyId);
        if (response.ok) {
          const responseData = await response.json();
          setFormData(responseData.company);
        } else {
          throw new Error(`Failed to fetch company: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching company:", error);
        // Optionally, you can set an error state here to display to the user
      }
    };

    if (initialData) {
      setFormData(initialData);
    } else {
      fetchCompanyData();
    }
  }, [companyId, initialData]);

  const handleCloseModal = () => {
    setModalVisible(false);
    onCancel(); // Call onCancel function provided by parent
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.company_name) {
      newErrors.company_name = "Company name is required";
    }

    if (!formData.phone_number) {
      newErrors.phone_number = "Phone number is required";
    }

    if (!formData.contact_email) {
      newErrors.contact_email = "Contact email is required";
    } else if (!isValidEmail(formData.contact_email)) {
      newErrors.contact_email = "Invalid email format";
    }

    if (!formData.location) {
      newErrors.location = "Location is required";
    }

    if (!formData.industry_sector) {
      newErrors.industry_sector = "Industry sector is required";
    }

    if (!formData.accepted_student_limit) {
      newErrors.accepted_student_limit = "Accepted student limit is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
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
      const response = await companyService.updateCompany(companyId, formData);

      // Check if the request was successful
      if (response) {
        // Assuming response contains an error message if the request fails
        if (response.error) {
          throw new Error(response.error); // Handle the error
        } else {
          // Handle successful response
          toast.success("Company updated successfully", { autoClose: 700 });

          // Clear any previous errors
          setErrors({});
          setModalVisible(false);

          setTimeout(onCompanyUpdated, 1200);
        }
      } else {
        throw new Error("Failed to update company");
      }
    } catch (error) {
      console.error("Error updating company:", error); // Log the error
      toast.error("Error updating company.", { autoClose: 2000 });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div>
      {modalVisible && (
        <Modal onClick={handleCloseModal}>
          <Form onSubmit={handleSubmit}>
            {CompanyForm.map((field) => (
              <FormRow
                key={field.id}
                label={field.label}
                error={errors[field.id]}
              >
                <Input
                  type={field.type}
                  id={field.id}
                  autoComplete={field.autoComplete}
                  value={formData[field.id] || ""}
                  onChange={handleChange}
                />
              </FormRow>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "3rem",
                marginTop: "2rem",
              }}
            >
              <CancelButton onClick={handleCloseModal}>Cancel</CancelButton>
              <Button type="submit">Update Company</Button>
            </div>
          </Form>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default EditCompany;
