import { useState, useEffect } from "react";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import Modal from "../../../ui/Modal";
import CancelButton from "../../../ui/CancelButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StudentForm } from "../../FormField";
import departmentService from "../../../services/department.service";
import studentService from "../../../services/student.service";
import styled from "styled-components";
import { useAuth } from "../../../context/AuthContext";

// Styled component for the select container
const SelectContainer = styled.div`
  input {
    width: 100%;
    padding: 0.7rem;
    border: 1px solid #ccc;
    background-color: var(--color-grey-50);
    border-radius: 5px;
    font-size: 1.4rem;
  }
`;

const EditStudent = ({ studentId, initialData, onCancel, fetchStudents }) => {
  const { userId } = useAuth();
  const [formData, setFormData] = useState(initialData || {});
  const [modalVisible, setModalVisible] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch department IDs when component mounts
    const fetchDepartmentIds = async () => {
      try {
        await departmentService.getDepartmentIds();

        setFormData((prevData) => ({
          ...prevData,
          department_id: userId,
        }));
      } catch (error) {
        console.error("Error fetching department IDs:", error.message);
      }
    };

    fetchDepartmentIds();
  }, [userId]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await studentService.getStudent(studentId);
        if (response.ok) {
          const responseData = await response.json();
          setFormData(responseData.students);
        } else {
          console.error("Failed to fetch student:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };
    if (!initialData) {
      fetchStudentData();
    }
  }, [initialData, studentId]);

  const handleCloseModal = () => {
    setModalVisible(false);
    onCancel(); // Call onCancel function provided by parent
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate each field in the formData
    StudentForm.forEach((field) => {
      if (!formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      } else if (field.type === "email" && !isValidEmail(formData[field.id])) {
        newErrors[field.id] = `Invalid ${field.label} format`;
      }
    });

    setErrors(newErrors);

    // If there are no errors, return true
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
      const response = await studentService.updateStudent(studentId, formData);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const responseData = await response.json();

      if (response.status === 200) {
        setErrors({});
        toast.success(responseData.message, { autoClose: 700 });
      }

      setModalVisible(false);
      setTimeout(() => {
        fetchStudents();
      }, 1000);
    } catch (error) {
      console.error("Error updating student:", error); // Log the error
      toast.error("Error updating student.", { autoClose: 2000 });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <div>
      {modalVisible && (
        <Modal onClick={handleCloseModal}>
          <Form onSubmit={handleSubmit}>
            {StudentForm.map((field) => (
              <FormRow
                key={field.id}
                label={field.label}
                error={errors[field.id]}
              >
                {field.id === "department_id" ? (
                  <SelectContainer>
                    <Input
                      type="text"
                      id={field.id}
                      value={formData[field.id] || ""}
                      onChange={handleChange}
                      disabled // Prevent editing
                    />
                  </SelectContainer>
                ) : (
                  <Input
                    type={field.type}
                    id={field.id}
                    autoComplete={field.autoComplete}
                    value={formData[field.id] || ""}
                    onChange={handleChange}
                  />
                )}
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
              <Button type="submit">Update Student</Button>
            </div>
          </Form>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default EditStudent;
