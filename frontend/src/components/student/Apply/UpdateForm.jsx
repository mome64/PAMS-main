import { useState, useEffect } from "react";
import styled from "styled-components";
import studentService from "../../../services/student.service";
import { useAuth } from "../../../context/AuthContext";
import companyService from "../../../services/company.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import { NavLink } from "react-router-dom";

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
  border-radius: 5px;
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

  option:checked {
    color: #7dc400;
  }
`;

const Input = styled.input`
  padding: 8px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
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

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

const UpdateForm = () => {
  const [studentData, setStudentData] = useState(null);
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
  const { userId } = useAuth();
  const [placementGenerated, setPlacementGenerated] = useState(false);

  useEffect(() => {
    // Fetch data from local storage
    const placementGeneratedFromLocalStorage =
      localStorage.getItem("placementGenerated");
    if (placementGeneratedFromLocalStorage === "true") {
      setPlacementGenerated(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await studentService.getApplyStudentById(userId);

        if (response.status) {
          const student = response.applyStudents[0];

          setStudentData(student);
          const preferences = student.preferences
            .split(",")
            .map((preference) => parseInt(preference));
          setStudentPreferences(preferences);
          setIsDisabled(student.disability ? "true" : "false");
          setGender(student.gender);
        } else {
          console.error("Failed to fetch student data:", response);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response =
          await companyService.getAllCompaniesWithoutPagination();
        if (response.ok) {
          const data = await response.json();
          if (data && data.companies) {
            setCompanies(data.companies);
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

    fetchCompanies();
  }, []);

  const handlePreferenceChange = (e, preferenceIndex) => {
    const selectedCompanyId = parseInt(e.target.value);

    const updatedStudentPreferences = [...studentPreferences];
    updatedStudentPreferences[preferenceIndex] = selectedCompanyId;
    setStudentPreferences(updatedStudentPreferences);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    if (isGenderSelected && isDisabilitySelected && areAllPreferencesSelected) {
      // Handle form submission
      setIsSubmitted(true);

      const formData = {
        name: studentData.student_name,
        disability: isDisabled === "true" ? 1 : 0,
        gender,
        preferences: studentPreferences,
      };

      try {
        // Send the updated form data to the backend
        await studentService.updateStudentApplyForm(userId, formData);

        // Clear error state and reset form
        setErrors({
          isDisabled: false,
          gender: false,
          preferences: Array.from({ length: 0 }, () => false),
        });
        setIsSubmitted(false);

        toast.success("Form updated successfully!", { autoClose: 1000 });
      } catch (error) {
        console.error("Error updating student form:", error);
      }
    }
  };

  if (!studentData || companies.length === 0) {
    return <div>Loading...</div>;
  }

  const { student_id, student_name } = studentData;

  return (
    <CriteriaStyle>
      <Header />

      {placementGenerated ? (
        <h2
          style={{
            marginTop: "70px",
            background: "var(--color-grey-300)",
            textAlign: "center",
            padding: "15px",
            alignItems: "center",
          }}
        >
          Congratulations! Your placement has already been generated.
          <Button
            type="submit"
            className="mt-3"
            style={{ background: "#7DC400", marginLeft: "30px" }}
            disabled={isSubmitted}
          >
            <StyledNavLink to="/student/placement-results">
              See your placement result
            </StyledNavLink>
          </Button>
        </h2>
      ) : (
        <Form onSubmit={handleSubmit}>
          <FormTitle>May Be Update Your Application Form 👇</FormTitle>
          <FormGroup
            style={{
              display: "flex",
              gap: "2rem",
              border: "none",
              alignItems: "center",
            }}
          >
            <Label htmlFor="studentId">Student ID:</Label>
            <Input
              style={{
                width: "20%",
                border: "none",
                marginTop: "-6px",
                fontWeight: "700",
              }}
              type="text"
              id="studentId"
              value={student_id}
              onChange={(e) =>
                setStudentData({ ...studentData, student_id: e.target.value })
              }
              readOnly
            />

            <Label htmlFor="studentName">Name:</Label>
            <Input
              style={{
                width: "20%",
                border: "none",
                marginTop: "-5px",
                fontWeight: "700",
              }}
              type="text"
              id="studentName"
              value={student_name}
              onChange={(e) =>
                setStudentData({ ...studentData, student_name: e.target.value })
              }
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="disability">Are you Disabled:</Label>
            <SelectStyled
              className="form-select"
              value={isDisabled}
              onChange={(e) => setIsDisabled(e.target.value)}
              invalid={errors.isDisabled}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </SelectStyled>
            {errors.isDisabled && (
              <ErrorText>Please select disability status</ErrorText>
            )}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="gender">Gender:</Label>
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
          <Button
            type="submit"
            className="mt-3"
            style={{ background: "#7DC400" }}
            disabled={isSubmitted}
          >
            Update
          </Button>
        </Form>
      )}

      <ToastContainer />
    </CriteriaStyle>
  );
};

export default UpdateForm;
