import { useEffect, useState } from "react";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import CancelButton from "../../../ui/CancelButton";
import Modal from "../../../ui/Modal";
import companyService from "../../../services/company.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminService from "../../../services/acadamic.service";

const CreateCompany = () => {
  const [collage, setCollage] = useState([]);
  const [formData, setFormData] = useState({
    company_name: "",
    phone_number: "",
    contact_email: "",
    location: "",
    industry_sector: "",
    accepted_student_limit: "",
    website: "",
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
      case "company_name":
        if (!value.trim()) return "Company name is required";
        if (!/^[A-Za-z\s\-\&,.()']+$/.test(value))
          return "Company name can only contain letters, spaces, and basic punctuation";
        if (value.length < 3)
          return "Company name must be at least 3 characters";
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

      case "location":
        if (!value.trim()) return "Location is required";
        if (!/^[A-Za-z\s\-,.]+$/.test(value))
          return "Location can only contain letters, spaces, and basic punctuation";
        return "";

      case "industry_sector":
        if (!value.trim()) return "Industry sector is required";
        if (!/^[A-Za-z\s\-,&]+$/.test(value))
          return "Industry sector can only contain letters and basic punctuation";
        return "";

      case "accepted_student_limit":
        if (!value.trim()) return "Student limit is required";
        if (!/^\d+$/.test(value)) return "Must be a valid number";
        const limit = parseInt(value, 10);
        if (limit < 1) return "Must be at least 1";
        if (limit > 1000) return "Cannot exceed 1000";
        return "";

      case "website":
        if (
          value.trim() &&
          !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i.test(
            value
          )
        )
          return "Invalid website URL (e.g., https://example.com)";
        return "";

      case "password":
        if (!value.trim()) return "Password is required";
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

  // Update the handleChange function for phone number formatting

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
      const errorMessage = validateField(key, formData[key]);
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
          collage: "",
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
            <FormRow label="Company Name" error={errors.company_name}>
              <Input
                type="text"
                id="company_name"
                autoComplete="on"
                value={formData.company_name}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={errors.company_name}
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
                placeholder="Enter Phone Number ...."
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
                hasError={errors.location}
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
                hasError={errors.industry_sector}
              />
            </FormRow>
            <FormRow label="Select Collage" error={errors.collage}>
              <select
                id="collage"
                value={formData.collage}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-2 border rounded-md ${
                  errors.collage ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Collage</option>
                {collage.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
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
                onBlur={handleBlur}
                hasError={errors.accepted_student_limit}
                min="1"
                max="1000"
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
                hasError={errors.website}
                placeholder="https://example.com"
              />
            </FormRow>
            <FormRow label="Password" error={errors.password}>
              <Input
                type="password"
                id="password"
                autoComplete="on"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={errors.password}
              />
            </FormRow>
            <div className="flex justify-end gap-12 mt-8">
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
