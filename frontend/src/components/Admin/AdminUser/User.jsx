import { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    // Validation logic
    if (!formData.first_name) {
      errors.first_name = "First Name is required";
    }
    if (!formData.last_name) {
      errors.last_name = "Last Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password needs to be at least 6 characters long";
    }
    setErrors(errors);

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      try {
        // Send a request to create the admin
        const adminResponse = await adminService.createAdmin(formData);

        if (!adminResponse.ok) {
          toast.error("Failed to create admin", { autoClose: 2000 });
          return;
        }

        // Check if the response is valid JSON
        const responseData = await adminResponse.json();
        if (!adminResponse.ok) {
          // If the response is not JSON, display an error message
          throw new Error(responseData.error || "Failed to create admin");
        }

        // Handle the admin creation response
        // Modify this part based on your implementation of createAdmin function

        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });
        toast.success(responseData.message, { autoClose: 2000 });
      } catch (error) {
        console.error("Error creating admin:", error);
        toast.error(error.message || "Error creating admin", {
          autoClose: 2000,
        });
      }
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
        />
      </FormRow>

      <FormRow label="Last Name" error={errors?.last_name}>
        <Input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
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
        />
      </FormRow>

      <FormRow label="Password (min 6 characters)" error={errors?.password}>
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </FormRow>

      <FormRow>
        <CancelButton
          variant="secondary"
          type="reset"
          onClick={() =>
            setFormData({
              first_name: "",
              last_name: "",
              email: "",
              password: "",
            })
          }
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
