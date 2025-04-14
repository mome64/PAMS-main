import { useState, useEffect } from "react";
import styled from "styled-components";
import companyService from "../../../services/company.service";
import studentService from "../../../services/student.service";
import { useAuth } from "../../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

const CriteriaStyle = styled.div`
  background-color: var(--color-grey-200);
  min-height: 100vh;
  padding: 10px;
`;

const Form = styled.form`
  background-color: var(--color-grey-0);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 800px;
  margin: 80px auto;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  padding: 7px;
  font-weight: 550;
  border-radius: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 30px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 7px;
  display: block;
`;

const SelectStyled = styled.select`
  padding: 5px;
  border: 1px solid ${({ invalid }) => (invalid ? "red" : "#ccc")};
  border-radius: 5px;
  font-size: 16px;
  width: 100%;

  option {
    color: black;
  }

  option[selected="true"] {
    color: red;
  }
`;

const Button = styled.button`
  padding: 10px 30px;
  background-color: #12a37f;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #16a37f;
  }
`;

const ErrorText = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 5px;
  display: block;
`;

const StudentPlacementForm = () => {
  const [companies, setCompanies] = useState([]);
  const [studentPreferences, setStudentPreferences] = useState([]);
  const [isDisabled, setIsDisabled] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({
    isDisabled: false,
    gender: false,
    preferences: Array.from({ length: 0 }, () => false),
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { userId, secondName } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          await companyService.getAllCompaniesWithoutPagination();
        if (response.ok) {
          const data = await response.json();
          if (data && data.companies) {
            setCompanies(
              data.companies.map((company) => ({
                ...company,
                disabled: Array.from({ length: 1 }, () => false),
              }))
            );
            const initialStudentPreferences = Array.from(
              { length: data.companies.length },
              () => ""
            );
            setStudentPreferences(initialStudentPreferences);
          } else {
            console.error("Failed to fetch companies:", data);
          }
        } else {
          console.error("Failed to fetch companies:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchData();
  }, []);

  const handlePreferenceChange = (e, preferenceIndex) => {
    const selectedCompanyId = e.target.value;

    // Check if the selected company is already selected in other dropdowns
    studentPreferences.some(
      (preference, index) =>
        index !== preferenceIndex && preference === selectedCompanyId
    );

    // Update the studentPreferences array to store only the selected preference for the current student
    const updatedStudentPreferences = studentPreferences.map(
      (preference, index) => {
        if (index === preferenceIndex) {
          return selectedCompanyId;
        }
        return preference;
      }
    );
    setStudentPreferences(updatedStudentPreferences);

    // Disable the selected company in other dropdowns
    const updatedCompanies = companies.map((company, index) => {
      if (index !== preferenceIndex) {
        // Check if the selected company is already selected in other dropdowns
        const isCompanySelected = updatedStudentPreferences.includes(
          String(company.company_id)
        );
        return {
          ...company,
          disabled: isCompanySelected ? [true] : [false],
        };
      }
      return company;
    });
    setCompanies(updatedCompanies);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const isGenderSelected = gender !== "";
    const isDisabilitySelected = isDisabled !== "";
    const areAllPreferencesSelected = studentPreferences.every(
      (preference) => preference !== ""
    );

    // Update error state
    setErrors({
      isDisabled: !isDisabilitySelected,
      gender: !isGenderSelected,
      preferences: studentPreferences.map((preference) => !preference),
    });

    // Check if any company is selected more than once
    const duplicateCompany = studentPreferences.some((companyId, index) => {
      return studentPreferences.indexOf(companyId) !== index;
    });

    // If any company is selected more than once, display an error message and return
    if (duplicateCompany) {
      toast.error("can't select the same company", {
        autoClose: 1200,
      });
      return;
    }

    if (isGenderSelected && isDisabilitySelected && areAllPreferencesSelected) {
      // Handle form submission
      setIsSubmitted(true);
      const formData = {
        student_id: userId,
        name: secondName,
        disability: isDisabled === "true",
        gender,
        preferences: studentPreferences,
      };

      try {
        await studentService.acceptStudentApplyForm(formData);
        // Clear error state and remove red border on successful submission
        setErrors({
          isDisabled: false,
          gender: false,
          preferences: Array.from({ length: 0 }, () => false),
        });
        // Clear student preferences
        setStudentPreferences(
          Array.from({ length: companies.length }, () => "")
        );
        // Clear gender and disability selection
        setGender("");
        setIsDisabled("");
        // Reset isSubmitted to false to allow resubmission
        setIsSubmitted(false);
        toast.success("Form submitted successfully!", { autoClose: 1000 });
        setTimeout(() => {
          navigate("/student/form/update");
        }, 2000);
      } catch (error) {
        console.error("Error accepting student apply form:", error);
      }
    }
  };

  return (
    <>
      <CriteriaStyle>
        <Header />
        <Form onSubmit={handleSubmit}>
          <FormTitle>Fill The Form Then Click Submit To Apply</FormTitle>
          <FormGroup className="mb-3">
            <Label>Are you Disabled</Label>
            <SelectStyled
              className="form-select"
              value={isDisabled}
              onChange={(e) => setIsDisabled(e.target.value)}
              invalid={errors.isDisabled}
            >
              <option value="">Select</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </SelectStyled>
            {errors.isDisabled && (
              <ErrorText>Please select disability status</ErrorText>
            )}
          </FormGroup>

          <FormGroup className="mb-4">
            <Label>Gender:</Label>
            <SelectStyled
              className="form-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              invalid={errors.gender}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </SelectStyled>
            {errors.gender && <ErrorText>Please select a gender</ErrorText>}
          </FormGroup>

          {companies.map((company, preferenceIndex) => (
            <FormGroup
              key={`${preferenceIndex}-${company.company_id}`}
              className="mb-3"
            >
              <Label>{`Preference ${
                preferenceIndex + 1
              } (please select from drop down menu) * `}</Label>
              <SelectStyled
                className="form-select"
                value={studentPreferences[preferenceIndex]}
                onChange={(e) => handlePreferenceChange(e, preferenceIndex)}
                invalid={errors.preferences[preferenceIndex]}
              >
                <option value="">select</option>
                {companies.map((company) => (
                  <option key={company.company_id} value={company.company_id}>
                    {company.company_name}
                  </option>
                ))}
              </SelectStyled>
              {errors.preferences[preferenceIndex] && (
                <ErrorText>Please select a preference</ErrorText>
              )}
            </FormGroup>
          ))}

          <Button type="submit" className="mt-3" disabled={isSubmitted}>
            Submit
          </Button>
        </Form>
        <ToastContainer />
      </CriteriaStyle>
    </>
  );
};

export default StudentPlacementForm;
