import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import resultService from "../../../services/result.service";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const ContentContainer = styled.div`
  max-height: 90vh;
  overflow-y: auto;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid var(--color-grey-100);
  width: 98%;
  background: var(--color-grey-50);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 8px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 17px;
`;

const CancelButton = styled(Button)`
  background-color: red;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const DateInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  text-align: center;
  align-content: center;
  align-items: center;
`;

const SendResults = ({
  studentId,
  departmentId,
  companyId,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    commitment: "",
    courtesy: "",
    conduct: "",
    perseverance: "",
    teamwork: "",
    professional_ethics: "",
    creativity: "",
    technical_knowledge: "",
    efficiency: "",
    professional_comments: "",
    attendance: "",
    advisor_name: "",
    department_assigned: "",
    attachment_from_date: "",
    attachment_to_date: "",
    area_of_work: "",
    total_hours: "",
  });

  const [errors, setErrors] = useState({
    dateRange: "",
    form: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear errors when user changes input
    if (errors.dateRange || errors.form) {
      setErrors({ dateRange: "", form: "" });
    }

    // Validation for number inputs
    if (e.target.type === "number") {
      const labelText = e.target.labels[0].innerText;
      const maxValueMatch = labelText.match(/\d+/);
      const maxValue = maxValueMatch ? parseFloat(maxValueMatch[0]) : Infinity;

      if (
        value === "" ||
        (parseFloat(value) >= 0 && parseFloat(value) <= maxValue)
      ) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    // Validation for text inputs (letters and spaces only)
    if (e.target.type === "text") {
      const regex = /^[a-zA-Z\s]*$/;
      if (regex.test(value) || value === "") {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    // For other input types (date, etc.)
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateDates = () => {
    if (!formData.attachment_from_date || !formData.attachment_to_date) {
      setErrors((prev) => ({ ...prev, form: "Please fill all date fields" }));
      return false;
    }

    const fromDate = new Date(formData.attachment_from_date);
    const toDate = new Date(formData.attachment_to_date);

    if (toDate < fromDate) {
      setErrors((prev) => ({
        ...prev,
        dateRange: "End date cannot be earlier than start date",
      }));
      return false;
    }

    return true;
  };

  const validateForm = () => {
    // Check all required fields are filled
    const requiredFields = Object.entries(formData).filter(
      ([key, value]) => value === ""
    );
    if (requiredFields.length > 0) {
      setErrors((prev) => ({
        ...prev,
        form: "Please fill all required fields",
      }));
      return false;
    }

    // Validate dates
    if (!validateDates()) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await resultService.saveResults({
        student_id: studentId,
        company_id: companyId,
        department_id: departmentId,
        ...formData,
      });
      toast.success("Results submitted successfully!", { autoClose: 2000 });
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (error) {
      console.error("Error saving results:", error);
      toast.error("Failed to submit results. Please try again.");
    }
  };

  return (
    <Modal onClose={onClose}>
      <ContentContainer>
        <h2
          style={{
            textAlign: "center",
            background: "var(--color-grey-50)",
            fontSize: "25px",
            borderRadius: "6px",
            padding: "13px",
            width: "90%",
            margin: "auto",
          }}
        >
          Work Performance Assessment Form (40%)
        </h2>

        <br />
        <hr />

        <Form onSubmit={handleSubmit}>
          {errors.form && (
            <ErrorMessage style={{ marginBottom: "20px" }}>
              {errors.form}
            </ErrorMessage>
          )}

          <h1>Personality and Behavioral Traits (15%)</h1>
          <div
            style={{
              border: "1px solid green",
              padding: "25px",
              margin: "10px 5px 30px 5px",
            }}
          >
            <br />
            <InputContainer>
              <div>
                <Label htmlFor="commitment">
                  Commitment (Attitude towards work showing enthusiasm and
                  interest) 3%
                </Label>
                <Input
                  type="number"
                  id="commitment"
                  name="commitment"
                  value={formData.commitment}
                  onChange={handleChange}
                  min="0"
                  max="3"
                  step="0.1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="courtesy">
                  Courtesy (shows respect for authority at all times) 2%
                </Label>
                <Input
                  type="number"
                  id="courtesy"
                  name="courtesy"
                  value={formData.courtesy}
                  onChange={handleChange}
                  min="0"
                  max="2"
                  step="0.1"
                  required
                />
              </div>
            </InputContainer>

            <InputContainer>
              <div>
                <Label htmlFor="conduct">
                  Conduct (follows rules and regulations of the organization) 2%
                </Label>
                <Input
                  type="number"
                  id="conduct"
                  name="conduct"
                  value={formData.conduct}
                  onChange={handleChange}
                  min="0"
                  max="2"
                  step="0.1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="perseverance">
                  Perseverance and Industriousness (sincerity and seriousness
                  towards works) 2%
                </Label>
                <Input
                  type="number"
                  id="perseverance"
                  name="perseverance"
                  value={formData.perseverance}
                  onChange={handleChange}
                  min="0"
                  max="2"
                  step="0.1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="teamwork">
                  Teamwork (can work harmoniously with other employees) 2%
                </Label>
                <Input
                  type="number"
                  id="teamwork"
                  name="teamwork"
                  value={formData.teamwork}
                  onChange={handleChange}
                  min="0"
                  max="2"
                  step="0.1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="professional_ethics">
                  Professional Ethics (position of traits necessary for
                  employment in this kind) 2%
                </Label>
                <Input
                  type="number"
                  id="professional_ethics"
                  name="professional_ethics"
                  value={formData.professional_ethics}
                  onChange={handleChange}
                  min="0"
                  max="2"
                  step="0.1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="creativity">
                  Creativity and possess initiative in daily task 2%
                </Label>
                <Input
                  type="number"
                  id="creativity"
                  name="creativity"
                  value={formData.creativity}
                  onChange={handleChange}
                  min="0"
                  max="2"
                  step="0.1"
                  required
                />
              </div>
            </InputContainer>
          </div>

          <hr />
          <br />
          <h1>Work-Related Performance Indicator (25%)</h1>
          <div
            style={{
              border: "1px solid green",
              padding: "30px",
              margin: "10px 5px 30px 5px",
            }}
          >
            <br />
            <InputContainer>
              <div>
                <Label htmlFor="technical_knowledge">
                  Technical Knowledge of Work (able to grasp as instructed) 8%
                </Label>
                <Input
                  type="number"
                  id="technical_knowledge"
                  name="technical_knowledge"
                  value={formData.technical_knowledge}
                  onChange={handleChange}
                  min="0"
                  max="8"
                  step="0.1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="efficiency">
                  The efficiency of the student in the job 7%
                </Label>
                <Input
                  type="number"
                  id="efficiency"
                  name="efficiency"
                  value={formData.efficiency}
                  onChange={handleChange}
                  min="0"
                  max="7"
                  step="0.1"
                  required
                />
              </div>
            </InputContainer>

            <InputContainer>
              <div>
                <Label htmlFor="professional_comments">
                  Willing to accept professional comments and apply it in the
                  workplace 5%
                </Label>
                <Input
                  type="number"
                  id="professional_comments"
                  name="professional_comments"
                  value={formData.professional_comments}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="attendance">
                  Attendance and Punctuality (Reports to work assignment as
                  scheduled) 5%
                </Label>
                <Input
                  type="number"
                  id="attendance"
                  name="attendance"
                  value={formData.attendance}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  required
                />
              </div>
            </InputContainer>
          </div>
          <hr />
          <br />
          <h1>General Information</h1>
          <div
            style={{
              border: "1px solid green",
              padding: "30px",
              margin: "10px 5px 30px 5px",
            }}
          >
            <InputContainer>
              <div>
                <Label htmlFor="advisor_name">Advisor Name</Label>
                <Input
                  type="text"
                  id="advisor_name"
                  name="advisor_name"
                  value={formData.advisor_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </InputContainer>

            <InputContainer>
              <div>
                <Label htmlFor="department_assigned">Department Assigned</Label>
                <Input
                  type="text"
                  id="department_assigned"
                  name="department_assigned"
                  value={formData.department_assigned}
                  onChange={handleChange}
                  required
                />
              </div>
            </InputContainer>

            <InputContainer>
              <Label>Inclusive Date of Attachment</Label>
              <DateInputContainer>
                From
                <Input
                  type="date"
                  id="attachment_from_date"
                  name="attachment_from_date"
                  value={formData.attachment_from_date}
                  onChange={handleChange}
                  required
                />
                To
                <Input
                  type="date"
                  id="attachment_to_date"
                  name="attachment_to_date"
                  value={formData.attachment_to_date}
                  onChange={handleChange}
                  min={formData.attachment_from_date}
                  required
                />
              </DateInputContainer>
              {errors.dateRange && (
                <ErrorMessage>{errors.dateRange}</ErrorMessage>
              )}
            </InputContainer>

            <InputContainer>
              <div>
                <Label htmlFor="area_of_work">Area of Work</Label>
                <Input
                  type="text"
                  id="area_of_work"
                  name="area_of_work"
                  value={formData.area_of_work}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="total_hours">
                  Total Working Hours (max 800)
                </Label>
                <Input
                  type="number"
                  id="total_hours"
                  name="total_hours"
                  value={formData.total_hours}
                  onChange={handleChange}
                  min="0"
                  max="800"
                  required
                />
              </div>
            </InputContainer>
          </div>

          <ButtonContainer>
            <Button type="submit">Send</Button>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
          </ButtonContainer>
        </Form>
        <ToastContainer />
      </ContentContainer>
    </Modal>
  );
};

export default SendResults;
