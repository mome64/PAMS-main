import styled from "styled-components";
import Logo from "../Logo";
import DepMainNav from "./DepartmentMainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function DepSidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <DepMainNav />
    </StyledSidebar>
  );
}

export default DepSidebar;
