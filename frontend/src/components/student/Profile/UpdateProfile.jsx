import { useState, useEffect } from "react";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CancelButton from "../../../ui/CancelButton";
import Header from "../Header/Header";
import studentService from "../../../services/student.service";
import { useAuth } from "../../../context/AuthContext";

function UpdateProfile() {
  const { userId } = useAuth();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    contact_email: "",
    phone_number: "",
    photo: "default.jpg",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await studentService.getStudent(userId);

        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const responseData = await response.json();
        const studentData = responseData.students;
        setFormData(studentData);
      } catch (error) {
        console.error("Error fetching student data:", error);
        toast.error("Error fetching student data", { autoClose: 2000 });
      }
    };

    fetchStudentData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      photo: file,
    }));
  };
  console.log("ffffffff", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.first_name) {
      errors.first_name = "First Name is required";
    }
    if (!formData.last_name) {
      errors.last_name = "Last Name is required";
    }
    if (!formData.contact_email) {
      errors.contact_email = "Email is required";
    }
    if (!formData.phone_number) {
      errors.phone_number = "Phone is required";
    }

    setErrors(errors);

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      try {
        const formDataWithFile = new FormData();
        formDataWithFile.append("first_name", formData.first_name);
        formDataWithFile.append("last_name", formData.last_name);
        formDataWithFile.append("contact_email", formData.contact_email);
        formDataWithFile.append("phone_number", formData.phone_number);
        if (formData.photo) {
          formDataWithFile.append("photo", formData.photo);
        }

        // Update student information
        const updateResponse = await studentService.updateStudentProfile(
          userId,
          formDataWithFile
        );

        if (!updateResponse.ok) {
          throw new Error("Failed to update student");
        }

        // Show success toast message
        toast.success("Profile updated successfully", {
          autoClose: 500,
        });
      } catch (error) {
        console.error("Error updating student profile:", error);
        // Show error toast message
        toast.error("Failed to update student profile", { autoClose: 2000 });
      }
    }
  };

  return (
    <>
      <Header />
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

        <FormRow label="Email address" error={errors?.contact_email}>
          <Input
            type="email"
            id="contact_email"
            name="contact_email"
            autoComplete="off"
            value={formData.contact_email}
            onChange={handleChange}
          />
        </FormRow>
        <FormRow label="Phone Number" error={errors?.phone_number}>
          <Input
            type="number"
            id="phone_number"
            name="phone_number"
            autoComplete="off"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </FormRow>

        <FormRow label="Profile Photo">
          <Input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
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
                contact_email: "",
                photo: null,
              })
            }
          >
            Cancel
          </CancelButton>
          <Button type="submit">Update Profile</Button>
        </FormRow>
        <ToastContainer />
      </Form>
    </>
  );
}

export default UpdateProfile;
