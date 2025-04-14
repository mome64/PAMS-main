import CreateDepartment from "../../components/Admin/Department/CreateDepartment";
import DepartmentList from "../../components/Admin/Department/DepartmentList";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import styled from "styled-components";

// Styled component for the Department component
const DepartmentContainer = styled.div`
  max-width: 100%;
  overflow: hidden;
`;

function Department() {
  return (
    <DepartmentContainer>
      <Row type="horizontal">
        <Heading as="h2">All Department</Heading>
        <CreateDepartment />
      </Row>
      <br />
      <Row>
        <DepartmentList />
      </Row>
    </DepartmentContainer>
  );
}

export default Department;
