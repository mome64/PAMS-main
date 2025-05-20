import React, { useEffect, useState } from "react";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import CancelButton from "../../../ui/CancelButton";
import Modal from "../../../ui/Modal";
import studentService from "../../../services/student.service";
import departmentService from "../../../services/department.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/AuthContext";
import styled from "styled-components";
import * as XLSX from "xlsx";
import "react-toastify/dist/ReactToastify.css";

const SelectContainer = styled.div`
  select {
    width: 100%;
    padding: 0.7rem;
    border: 1px solid #ccc;
    background-color: var(--color-grey-50);
    border-radius: 5px;
    font-size: 1.4rem;
  }

  select option:checked {
    background-color: #007bff;
  }
`;

const CreateStudent = () => {
  const { userId, collage } = useAuth();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    contact_email: "",
    gpa: "",
    password: "",
    department_id: "",
    collage: collage,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [departmentIds, setDepartmentIds] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDepartmentIds = async () => {
      try {
        const ids = await departmentService.getDepartmentIds();
        setFormData((prevData) => ({
          ...prevData,
          department_id: userId,
        }));
        setDepartmentIds(ids);
      } catch (error) {
        console.error("Error fetching department IDs:", error.message);
      }
    };

    fetchDepartmentIds();
  }, [userId]);

  const validateField = (name, value) => {
    switch (name) {
      case "first_name":
        if (!value.trim()) return "First name is required";
        if (!/^[A-Za-z\s\-']+$/.test(value))
          return "First name can only contain letters and spaces";
        if (value.length < 2) return "First name must be at least 2 characters";
        if (value.length > 50)
          return "First name must be less than 50 characters";
        return "";

      case "last_name":
        if (!value.trim()) return "Last name is required";
        if (!/^[A-Za-z\s\-']+$/.test(value))
          return "Last name can only contain letters and spaces";
        if (value.length < 2) return "Last name must be at least 2 characters";
        if (value.length > 50)
          return "Last name must be less than 50 characters";
        return "";

      case "phone_number":
        if (!value.trim()) return "Phone number is required";
        const cleanedValue = value.replace(/[^\d+]/g, "");
        const isMobile = /^(09|\+2519)\d{8}$/.test(cleanedValue);
        const isFixedLine = /^(7|2517)\d{6,9}$/.test(cleanedValue);

        if (!isMobile && !isFixedLine) {
          return "Invalid Phone number format";
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
            (cleanedValue.startsWith("9") && cleanedValue.length !== 9) ||
            (cleanedValue.startsWith("2517") && cleanedValue.length !== 11)
          ) {
            return cleanedValue.startsWith("9")
              ? "Local fixed line must be 7 digits (7XXXXXXX)"
              : "International fixed must be 11 digits (2517XXXXXXX)";
          }
        }
        return "";

      case "contact_email":
        if (!value.trim()) return "Contact email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        if (value.length > 100) return "Email must be less than 100 characters";
        if (!value.toLowerCase().endsWith("@gmail.com"))
          return "Only @gmail.com addresses are accepted";
        return "";

      case "gpa":
        if (!value.trim()) return "GPA is required";
        const num = parseFloat(value);
        if (isNaN(num)) return "GPA must be a number";
        if (num < 0 || num > 4) return "GPA must be between 0 and 4";
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
        if (value.length > 50)
          return "Password must be less than 50 characters";
        return "";

      case "department_id":
        if (!value.trim()) return "Department is required";
        return "";

      default:
        return "";
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await studentService.createStudent(formData);

      if (response.status === 400) {
        const responseData = await response.json();
        toast.error(responseData.error, { autoClose: 2000 });
        return;
      }

      if (!response.ok) {
        toast.error("Failed to create student", { autoClose: 2000 });
        return;
      }

      const responseData = await response.json();
      if (response.status === 200) {
        setFormData({
          first_name: "",
          last_name: "",
          phone_number: "",
          contact_email: "",
          gpa: "",
          password: "",
          department_id: userId,
          collage: "",
        });
        setErrors({});
        toast.success("Student created successfully", { autoClose: 1000 });
      }

      setModalVisible(false);
    } catch (error) {
      toast.error("Error creating student", { autoClose: 1000 });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Validate field on change
    const error = validateField(id, value);
    setErrors((prev) => ({
      ...prev,
      [id]: error,
    }));
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setErrors({});
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target.result;
        const workbook = XLSX.read(bstr, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet);

        if (data.length === 0) {
          toast.error("The Excel file is empty", { autoClose: 3000 });
          return;
        }

        let hasErrors = false;
        const errorMessages = [];

        for (const [index, student] of data.entries()) {
          const rowNumber = index + 2;
          const rowErrors = [];

          // Convert all values to strings before processing
          const processedStudent = {
            first_name: String(student.first_name || ""),
            last_name: String(student.last_name || ""),
            phone_number: String(student.phone_number || ""),
            contact_email: String(student.contact_email || ""),
            gpa: String(student.gpa || ""),
            password: String(student.password || "Default@123"),
          };

          // Check required fields
          const requiredFields = [
            "first_name",
            "last_name",
            "phone_number",
            "contact_email",
            "gpa",
          ];

          for (const field of requiredFields) {
            if (!processedStudent[field].trim()) {
              rowErrors.push(`Missing ${field.replace("_", " ")}`);
            }
          }

          // Validate email format if present
          if (
            processedStudent.contact_email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(processedStudent.contact_email)
          ) {
            rowErrors.push("Invalid email format");
          }

          // Validate phone number format if present
          if (processedStudent.phone_number) {
            const cleanedPhone = processedStudent.phone_number.replace(
              /[^\d+]/g,
              ""
            );
            if (
              !/^(09|\+2519)\d{8}$/.test(cleanedPhone) &&
              !/^(9|2517)\d{6,9}$/.test(cleanedPhone)
            ) {
              rowErrors.push("Invalid phone number format");
            }
          }

          // Validate GPA if present
          if (processedStudent.gpa) {
            const gpa = parseFloat(processedStudent.gpa);
            if (isNaN(gpa)) {
              rowErrors.push("GPA must be a number");
            } else if (gpa < 0 || gpa > 4) {
              rowErrors.push("GPA must be between 0 and 4");
            }
          }

          if (rowErrors.length > 0) {
            hasErrors = true;
            errorMessages.push(
              `Row ${rowNumber}: ${processedStudent.first_name} ${
                processedStudent.last_name
              } - ${rowErrors.join(", ")}`
            );
          }
        }

        if (hasErrors) {
          toast.error(
            <div>
              <strong>Validation errors found:</strong>
              <ul className="list-disc pl-5">
                {errorMessages.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            </div>,
            { autoClose: false }
          );
          return;
        }

        // Process each student if validation passes
        const results = [];
        for (const student of data) {
          try {
            const formattedStudent = {
              first_name: String(student.first_name || ""),
              last_name: String(student.last_name || ""),
              phone_number: String(`0${student.phone_number}` || ""),
              contact_email: String(student.contact_email || ""),
              gpa: String(student.gpa || ""),
              password: String(student.password || "Default@123"),
              department_id: userId,
              collage: collage,
            };

            const response = await studentService.createStudent(
              formattedStudent
            );

            if (!response.ok) {
              const error = await response.json();
              throw new Error(error.error || "Failed to create student");
            }

            results.push({
              name: `${formattedStudent.first_name} ${formattedStudent.last_name}`,
              success: true,
            });
          } catch (error) {
            results.push({
              name: `${student.first_name || ""} ${student.last_name || ""}`,
              success: false,
              error: error.message,
            });
          }
        }

        // Show import results
        const successful = results.filter((r) => r.success).length;
        const failed = results.filter((r) => !r.success).length;

        if (failed > 0) {
          toast.warning(
            <div>
              <strong>Import completed with {failed} error(s):</strong>
              <ul className="list-disc pl-5">
                {results
                  .filter((r) => !r.success)
                  .map((r, i) => (
                    <li key={i}>
                      {r.name}: {r.error}
                    </li>
                  ))}
              </ul>
            </div>,
            { autoClose: false }
          );
        }

        if (successful > 0) {
          toast.success(`Successfully imported ${successful} students`, {
            autoClose: 3000,
          });
        }
      } catch (err) {
        console.error("Import error:", err);
        toast.error(`Error importing students: ${err.message}`, {
          autoClose: 3000,
        });
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <div className="flex">
        <Button size="medium" onClick={() => setModalVisible(true)}>
          Add New
        </Button>

        <div className="mt-4 mx-4">
          <label htmlFor="uploadExcel" className="cursor-pointer">
            <Button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
              Import from Excel
            </Button>
          </label>
          <input
            placeholder="Import"
            type="file"
            id="uploadExcel"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {modalVisible && (
        <Modal onClick={handleCloseModal}>
          <Form onSubmit={handleSubmit}>
            <FormRow label="First Name" error={errors.first_name}>
              <Input
                type="text"
                id="first_name"
                autoComplete="on"
                value={formData.first_name}
                onChange={handleChange}
                hasError={!!errors.first_name}
                placeholder="Enter first name"
              />
            </FormRow>

            <FormRow label="Last Name" error={errors.last_name}>
              <Input
                type="text"
                id="last_name"
                autoComplete="on"
                value={formData.last_name}
                onChange={handleChange}
                hasError={!!errors.last_name}
                placeholder="Enter last name"
              />
            </FormRow>

            <FormRow label="Phone Number" error={errors.phone_number}>
              <Input
                type="text"
                id="phone_number"
                autoComplete="on"
                value={formData.phone_number}
                onChange={handleChange}
                hasError={!!errors.phone_number}
                placeholder="09XXXXXXXX or +2519XXXXXXXX"
              />
            </FormRow>

            <FormRow label="Contact Email" error={errors.contact_email}>
              <Input
                type="email"
                id="contact_email"
                autoComplete="on"
                value={formData.contact_email}
                onChange={handleChange}
                hasError={!!errors.contact_email}
                placeholder="example@domain.com"
              />
            </FormRow>

            <FormRow label="Student GPA" error={errors.gpa}>
              <Input
                type="number"
                id="gpa"
                autoComplete="off"
                value={formData.gpa}
                onChange={handleChange}
                hasError={!!errors.gpa}
                step="0.01"
                min="0"
                max="4"
                placeholder="0.00 - 4.00"
              />
            </FormRow>

            <FormRow label="Password" error={errors.password}>
              <Input
                type="password"
                id="password"
                autoComplete="on"
                value={formData.password}
                onChange={handleChange}
                hasError={!!errors.password}
                placeholder="At least 8 characters with uppercase, lowercase, and number"
              />
            </FormRow>

            <FormRow
              label="Department"
              error={errors.department_id}
              style={{ display: "none" }}
            >
              <Input
                type="text"
                id="department_id"
                value={collage}
                onChange={handleChange}
                disabled
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
              <Button>Create Student</Button>
            </div>
          </Form>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default CreateStudent;
