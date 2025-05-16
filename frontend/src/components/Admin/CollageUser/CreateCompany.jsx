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
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "full_name":
        if (!value.trim()) return "User name is required";
        if (value.trim().length < 3)
          return "User name must be at least 3 characters";
        if (!/^[a-zA-Z\s]*$/.test(value))
          return "User name can only contain letters and spaces";
        return "";
      case "username":
        if (!value.trim()) return "name is required";
        if (!/^[a-zA-Z0-9_]+$/.test(value))
          return "name can only contain letters, numbers, and underscores";
        if (value.length < 4) return "name must be at least 4 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        if (!value.endsWith("@gmail.com"))
          return "Only @gmail.com addresses are accepted";
        return "";
      case "phone_number":
        if (!value.trim()) return "Phone number is required";
        const cleanedValue = value.replace(/[^\d+]/g, "");
        const isMobile = /^(09|\+2519)\d{8}$/.test(cleanedValue);
        const isFixedLine = /^(7|2517)\d{6,9}$/.test(cleanedValue);

        if (!isMobile && !isFixedLine) {
          return "Invalid Ethiopian number. Use: 09XXXXXXXX, +2519XXXXXXXX, 7XXXXXXX, or +2517XXXXXXX";
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
            (cleanedValue.startsWith("2517") && cleanedValue.length !== 12)
          ) {
            return cleanedValue.startsWith("7")
              ? "Local fixed line must be 7 digits (7XXXXXXX)"
              : "International fixed must be 12 digits (+2517XXXXXXX)";
          }
        }
        return "";
      case "location":
        if (!value.trim()) return "Location is required";
        if (!/^[A-Za-z\s]+$/.test(value))
          return "Location can only contain letters and spaces";
        return "";
      case "college_name":
        if (!value.trim()) return "College name is required";
        if (!/^[A-Za-z\s]+$/.test(value))
          return "College name can only contain letters and spaces";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        if (!/[A-Z]/.test(value))
          return "Password must contain at least one uppercase letter";
        if (!/[a-z]/.test(value))
          return "Password must contain at least one lowercase letter";
        if (!/[0-9]/.test(value))
          return "Password must contain at least one number";
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
      // Remove all non-digit characters first
      const cleanedValue = value.replace(/\D/g, "");

      // Format with spaces: 09XX XXX XXXX for mobile numbers
      let formattedValue = cleanedValue;
      if (cleanedValue.startsWith("09") && cleanedValue.length > 2) {
        formattedValue = `09${cleanedValue.slice(2, 5)}`;
        if (cleanedValue.length > 5) {
          formattedValue += ` ${cleanedValue.slice(5, 9)}`;
        }
        if (cleanedValue.length > 9) {
          formattedValue += ` ${cleanedValue.slice(9, 13)}`;
        }
      } else if (cleanedValue.startsWith("9") && cleanedValue.length > 1) {
        formattedValue = `9${cleanedValue.slice(1, 4)}`;
        if (cleanedValue.length > 4) {
          formattedValue += ` ${cleanedValue.slice(4, 8)}`;
        }
        if (cleanedValue.length > 8) {
          formattedValue += ` ${cleanedValue.slice(8, 12)}`;
        }
      } else if (cleanedValue.startsWith("7")) {
        // Format for fixed lines: 7XX XXX XXX
        formattedValue = cleanedValue.slice(0, 3);
        if (cleanedValue.length > 3) {
          formattedValue += ` ${cleanedValue.slice(3, 6)}`;
        }
        if (cleanedValue.length > 6) {
          formattedValue += ` ${cleanedValue.slice(6, 9)}`;
        }
      } else {
        formattedValue = cleanedValue;
      }

      setFormData((prev) => ({ ...prev, [id]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }

    // Only validate if the field has been touched (visited)
    if (touched[id]) {
      const errorMessage = validateField(
        id,
        id === "phone_number" ? formData.phone_number.replace(/\D/g, "") : value
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
          ? formData[key].replace(/\D/g, "")
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
      // Prepare data with clean phone number (digits only)
      const submitData = {
        ...formData,
        phone_number: formData.phone_number.replace(/\D/g, ""),
      };

      const response = await adminService.createAdmin(submitData);

      if (response.status === 400) {
        const data = await response.json();
        toast.error(data.error, { autoClose: 1000 });
        return;
      }

      if (!response.ok) {
        toast.error("Failed to create academic", { autoClose: 2000 });
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
        setTouched({});
        toast.success(data.message, { autoClose: 2000 });
      }

      setModalVisible(false);
    } catch (error) {
      toast.error("Error creating academic: " + error.message, {
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
        Add New Collage
      </Button>

      {modalVisible && (
        <Modal onClick={handleCloseModal}>
          <Form onSubmit={handleSubmit}>
            <FormRow
              label="User Name"
              error={touched.full_name && errors.full_name}
            >
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={touched.full_name && errors.full_name}
              />
            </FormRow>
            <FormRow
              label="Full Name"
              error={touched.username && errors.username}
            >
              <Input
                id="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={touched.username && errors.username}
              />
            </FormRow>
            <FormRow label="Email" error={touched.email && errors.email}>
              <Input
                id="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={touched.email && errors.email}
              />
            </FormRow>
            <FormRow
              label="Phone Number"
              error={touched.phone_number && errors.phone_number}
            >
              <Input
                id="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={touched.phone_number && errors.phone_number}
                placeholder="09XX XXX XXXX or 7XX XXX XXX"
              />
            </FormRow>
            <FormRow
              label="Location"
              error={touched.location && errors.location}
            >
              <Input
                id="location"
                value={formData.location}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={touched.location && errors.location}
              />
            </FormRow>
            <FormRow
              label="College Name"
              error={touched.college_name && errors.college_name}
            >
              <Input
                id="college_name"
                value={formData.college_name}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={touched.college_name && errors.college_name}
              />
            </FormRow>
            <FormRow
              label="Password"
              error={touched.password && errors.password}
            >
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={touched.password && errors.password}
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
              <Button>Create Collage</Button>
            </div>
          </Form>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default CreateAcadamic;
