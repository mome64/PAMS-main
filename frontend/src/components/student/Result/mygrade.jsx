import { useEffect, useState } from "react";
import studentService from "../../../services/student.service";
import { useAuth } from "../../../context/AuthContext";
import styled from "styled-components";
import Spinner from "../../../ui/Spinner";
import Header from "../Header/Header";

const Container = styled.div`
  padding: 20px;
  background-color: var(--color-grey-50);
  border-radius: 10px;
  width: 90%; /* Change width to 90% for better responsiveness */
  max-width: 600px; /* Limit max-width for larger screens */
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const ResultBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  max-width: 500px;
  background-color: var(--color-grey-100);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Label = styled.div`
  font-weight: bold;
  margin-top: 10px;
`;

const Value = styled.div`
  font-size: 1.4rem;
`;

const GradeLetter = styled.div`
  font-size: 2rem;
  margin-top: 1rem;
  font-weight: bold;
  color: ${(props) =>
    props.grade === "A+" || props.grade === "A"
      ? "green"
      : props.grade === "F"
      ? "red"
      : "black"};
`;
const PageContainer = styled.div`
  padding-top: 80px;
  text-transform: uppercase;
  background-color: var(--color-grey-200);
  min-height: 100vh;
`;
const MyGradeResult = () => {
  const { userId } = useAuth(); // student user ID
  const [grade, setGrade] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGrade = async () => {
    try {
      const response = await studentService.fetchGrades();
      if (response.success) {
        const myGrade = response.data.find((g) => g.student_id === userId);
        setGrade(myGrade);
      }
    } catch (error) {
      console.error("Error fetching grade:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrade();
  }, []);

  const getLetterGrade = (total) => {
    if (total >= 90) return "A+";
    if (total >= 80) return "A";
    if (total >= 70) return "B";
    if (total >= 60) return "C";
    if (total >= 50) return "D";
    return "F";
  };

  if (loading) return <Spinner />;

  const academic = parseInt(grade?.academic_result || 0);
  const company = parseInt(grade?.company_result || 0);
  const total = academic + company;
  const gradeLetter = getLetterGrade(total);

  return (
    <div>
      <PageContainer>
        <Header />
        {grade ? (
          <Container className="mt-9">
            <h2>Your Grade Result</h2>
            <ResultBox>
              <Label>Academic Score (60%)</Label>
              <Value>{academic}</Value>

              <Label>Company Score (40%)</Label>
              <Value>{company}</Value>

              <Label>Total Score (100%)</Label>
              <Value>{total}</Value>

              <GradeLetter grade={gradeLetter}>
                Final Grade: {gradeLetter}
              </GradeLetter>
            </ResultBox>
          </Container>
        ) : (
          <Container>
            <p>No grade result found for you yet.</p>
          </Container>
        )}
      </PageContainer>
    </div>
  );
};

export default MyGradeResult;
