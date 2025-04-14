import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";
import { NavLink } from "react-router-dom";

const StyledLogo = styled.div`
  text-align: center;
  border-bottom: 1px solid red;
`;

const Img = styled.img`
  height: 8.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  return (
    <NavLink to="/admin/dashboard">
      <StyledLogo>
        <Img src={src} alt="Logo" />
      </StyledLogo>
    </NavLink>
  );
}

export default Logo;
