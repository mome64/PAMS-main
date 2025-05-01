import { useState, useEffect } from "react";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import Modal from "../../../ui/Modal";
import CancelButton from "../../../ui/CancelButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminService from "../../../services/acadamic.service";
import { AcademicForm } from "../../FormField"; // Adjust this import if necessary

const EditAcademic = ({
  academicId,
  initialData,
  onCancel,
  onAcademicUpdated,
}) => {
  const [formData, setFormData] = useState({});
  const [modalVisible, setModalVisible] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        const response = await adminService.getAdminById(academicId);
        if (response.ok) {
          const responseData = await response.json();
          setFormData(responseData.admin || {}); // Defensive default
        } else {
          throw new Error(`Failed to fetch academic: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching academic:", error);
      }
    };

    if (initialData) {
      setFormData(initialData);
    } else {
      fetchAcademicData();
    }
  }, [academicId, initialData]);

  const handleCloseModal = () => {
    setModalVisible(false);
    onCancel();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name) {
      newErrors.full_name = "Full name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone_number) {
      newErrors.phone_number = "Phone number is required";
    }
    if (!formData.department) {
      newErrors.department = "Department is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await adminService.updateAdmin(academicId, formData);
      if (response && response.ok) {
        toast.success("Academic updated successfully", { autoClose: 700 });
        setErrors({});
        setModalVisible(false);
        setTimeout(onAcademicUpdated, 1200);
      } else {
        const errMsg = response.error || "Failed to update academic";
        throw new Error(errMsg);
      }
    } catch (error) {
      console.error("Error updating academic:", error);
      toast.error("Error updating academic.", { autoClose: 2000 });
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
            {formData &&
              AcademicForm.map((field) => (
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
              <Button type="submit">Update Academic</Button>
            </div>
          </Form>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default EditAcademic;
