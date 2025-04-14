import styled from "styled-components";
import CreateStudent from "../../components/department/Student/CreateStudent";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import StudentList from "../../components/department/Student/StudentList";

// Styled component for the Company component
const StudentContainer = styled.div`
  max-width: 100%;
  overflow: hidden;
`;

function Student() {
  return (
    <StudentContainer>
      <Row type="horizontal">
        <Heading as="h1">All Student</Heading>
        <CreateStudent />
      </Row>
      <br />
      <Row>
        <StudentList />
      </Row>
    </StudentContainer>
  );
}

export default Student;
