import { useState, useEffect } from "react";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import criteriaService from "../../../services/criteria.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CancelButton from "../../../ui/CancelButton";

function CriteriaForm() {
  const [formData, setFormData] = useState({
    weight_disability: 0,
    weight_gender: 0,
    weight_preference: 0,
    weight_grade: 0,
  });

  const [originalFormData, setOriginalFormData] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("Fetching criteria data...");
    const fetchCriteria = async () => {
      try {
        const criteriaId = 1;
        const response = await criteriaService.getCriteriaById(criteriaId);

        setFormData(response.data);
        setOriginalFormData(response.data);
      } catch (error) {
        console.error("Error fetching criteria:", error);
        toast.error("Error fetching criteria", { autoClose: 2000 });
      }
    };
    fetchCriteria();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validation logic for each field
    if (formData.weight_disability < 0 || formData.weight_disability > 100) {
      validationErrors.weight_disability =
        "Weight for Disability must be between 0 and 100";
    }
    if (formData.weight_gender < 0 || formData.weight_gender > 100) {
      validationErrors.weight_gender =
        "Weight for Gender must be between 0 and 100";
    }
    if (formData.weight_preference < 0 || formData.weight_preference > 100) {
      validationErrors.weight_preference =
        "Weight for Preference must be between 0 and 100";
    }
    if (formData.weight_grade < 0 || formData.weight_grade > 100) {
      validationErrors.weight_grade =
        "Weight for Grade must be between 0 and 100";
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        await criteriaService.updateCriteria(1, formData);
        toast.success("Criteria updated successfully", { autoClose: 1000 });
      } catch (error) {
        console.error("Error updating criteria:", error);
        toast.error("Error updating criteria", { autoClose: 2000 });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleCancel = () => {
    // Reset form data to original fetched data
    setFormData(originalFormData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Weight for Disability" error={errors?.weight_disability}>
        <Input
          type="number"
          id="weight_disability"
          name="weight_disability"
          value={formData.weight_disability}
          onChange={handleChange}
        />
      </FormRow>

      <FormRow label="Weight for Gender" error={errors?.weight_gender}>
        <Input
          type="number"
          id="weight_gender"
          name="weight_gender"
          value={formData.weight_gender}
          onChange={handleChange}
        />
      </FormRow>

      <FormRow label="Weight for Preference" error={errors?.weight_preference}>
        <Input
          type="number"
          id="weight_preference"
          name="weight_preference"
          value={formData.weight_preference}
          onChange={handleChange}
        />
      </FormRow>

      <FormRow label="Weight for Grade" error={errors?.weight_grade}>
        <Input
          type="number"
          id="weight_grade"
          name="weight_grade"
          value={formData.weight_grade}
          onChange={handleChange}
        />
      </FormRow>

      <FormRow>
        <CancelButton variant="secondary" type="button" onClick={handleCancel}>
          Cancel
        </CancelButton>
        <Button type="submit">Update Criteria</Button>
      </FormRow>
      <ToastContainer />
    </Form>
  );
}

export default CriteriaForm;
