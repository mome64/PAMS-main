import { useState, useEffect } from "react";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CancelButton from "../../../ui/CancelButton";
import adminService from "./../../../services/admin.service";

function SignupForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    first_name: false,
    last_name: false,
    email: false,
    password: false,
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateName = (name) => {
    const re = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    return re.test(String(name));
  };

  // Real-time validation effect
  useEffect(() => {
    const newErrors = {};

    // First Name validation
    if (touched.first_name) {
      if (!formData.first_name.trim()) {
        newErrors.first_name = "First Name is required";
      } else if (!validateName(formData.first_name)) {
        newErrors.first_name = "First Name should contain only letters";
      } else if (formData.first_name.length > 50) {
        newErrors.first_name = "First Name should be less than 50 characters";
      }
    }

    // Last Name validation
    if (touched.last_name) {
      if (!formData.last_name.trim()) {
        newErrors.last_name = "Last Name is required";
      } else if (!validateName(formData.last_name)) {
        newErrors.last_name = "Last Name should contain only letters";
      } else if (formData.last_name.length > 50) {
        newErrors.last_name = "Last Name should be less than 50 characters";
      }
    }

    // Email validation
    if (touched.email) {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      } else if (!formData.email.toLowerCase().endsWith("@gmail.com")) {
        newErrors.email = "Only Gmail addresses are allowed (@gmail.com)";
      } else if (formData.email.length > 100) {
        newErrors.email = "Email should be less than 100 characters";
      }
    }

    // Password validation
    if (touched.password) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password needs to be at least 6 characters long";
      } else if (formData.password.length > 50) {
        newErrors.password = "Password should be less than 50 characters";
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password =
          "Password should contain at least one uppercase letter";
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password =
          "Password should contain at least one lowercase letter";
      } else if (!/[0-9]/.test(formData.password)) {
        newErrors.password = "Password should contain at least one number";
      } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
        newErrors.password =
          "Password should contain at least one special character";
      }
    }

    setErrors(newErrors);
  }, [formData, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First Name is required";
    } else if (!validateName(formData.first_name)) {
      newErrors.first_name = "First Name should contain only letters";
    } else if (formData.first_name.length > 50) {
      newErrors.first_name = "First Name should be less than 50 characters";
    }

    // Last Name validation
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last Name is required";
    } else if (!validateName(formData.last_name)) {
      newErrors.last_name = "Last Name should contain only letters";
    } else if (formData.last_name.length > 50) {
      newErrors.last_name = "Last Name should be less than 50 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (!formData.email.toLowerCase().endsWith("@gmail.com")) {
      newErrors.email = "Only Gmail addresses are allowed (@gmail.com)";
    } else if (formData.email.length > 100) {
      newErrors.email = "Email should be less than 100 characters";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password needs to be at least 6 characters long";
    } else if (formData.password.length > 50) {
      newErrors.password = "Password should be less than 50 characters";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password =
        "Password should contain at least one lowercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password should contain at least one number";
    }

    setErrors(newErrors);
    setTouched({
      first_name: true,
      last_name: true,
      email: true,
      password: true,
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const adminResponse = await adminService.createAdmin(formData);

      if (!adminResponse.ok) {
        toast.error("Failed to create admin", { autoClose: 2000 });
        return;
      }

      const responseData = await adminResponse.json();
      if (!adminResponse.ok) {
        throw new Error(responseData.error || "Failed to create admin");
      }

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
      setTouched({
        first_name: false,
        last_name: false,
        email: false,
        password: false,
      });
      toast.success(responseData.message, { autoClose: 2000 });
    } catch (error) {
      console.error("Error creating admin:", error);
      if (error.message.includes("email")) {
        setErrors((prev) => ({
          ...prev,
          email: "This email is already in use",
        }));
      }
      toast.error(error.message || "Error creating admin", {
        autoClose: 2000,
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="First Name" error={errors?.first_name}>
        <Input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.first_name}
        />
      </FormRow>

      <FormRow label="Last Name" error={errors?.last_name}>
        <Input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.last_name}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email}>
        <Input
          type="email"
          id="email"
          name="email"
          autoComplete="off"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.email}
          placeholder="user@gmail.com"
        />
      </FormRow>

      <FormRow label="Password (min 6 characters)" error={errors?.password}>
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          hasError={!!errors.password}
        />
      </FormRow>

      <FormRow>
        <CancelButton
          variant="secondary"
          type="reset"
          onClick={() => {
            setFormData({
              first_name: "",
              last_name: "",
              email: "",
              password: "",
            });
            setErrors({});
            setTouched({
              first_name: false,
              last_name: false,
              email: false,
              password: false,
            });
          }}
        >
          Cancel
        </CancelButton>
        <Button type="submit">Create new user</Button>
      </FormRow>
      <ToastContainer />
    </Form>
  );
}

export default SignupForm;
