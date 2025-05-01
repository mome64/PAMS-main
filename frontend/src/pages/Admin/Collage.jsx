import CreateCompany from "../../components/Admin/CollageUser/CreateCompany";
import CompanyList from "../../components/Admin/CollageUser/CompanyList";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import styled from "styled-components";

// Styled component for the Company component
const CompanyContainer = styled.div`
  max-width: 100%;
  overflow: hidden;
`;

function Collage() {
  return (
    <CompanyContainer>
      <Row type="horizontal">
        <Heading as="h2">All Collage</Heading>
        <CreateCompany />
      </Row>
      <br />
      <Row>
        <CompanyList />
      </Row>
    </CompanyContainer>
  );
}

export default Collage;
