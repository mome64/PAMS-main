import styled from "styled-components";
import Logo from "../Logo";
import CompanyMainNav from "./CompanyMainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function CompnySidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <CompanyMainNav />
    </StyledSidebar>
  );
}

export default CompnySidebar;
