import CreateCompany from "../../components/Admin/Company/CreateCompany";
import CompanyList from "../../components/Admin/Company/CompanyList";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import styled from "styled-components";

// Styled component for the Company component
const CompanyContainer = styled.div`
  max-width: 100%;
  overflow: hidden;
`;

function Company() {
  return (
    <CompanyContainer>
      <Row type="horizontal">
        <Heading as="h2">All Companies</Heading>
        <CreateCompany />
      </Row>
      <br />
      <Row>
        <CompanyList />
      </Row>
    </CompanyContainer>
  );
}

export default Company;
