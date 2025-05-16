import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";
import { NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaUserTie,
  FaUserGraduate,
  FaUserShield,
  FaUserFriends,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const StyledLogo = styled.div`
  text-align: center;
  border-bottom: 1px solid red;
  padding: 1rem 0;
  margin: auto;
`;

const IconWrapper = styled.div`
  font-size: 5rem;
  color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};
  margin: auto;
  display: flex;
  justify-content: center;
`;

function Logo() {
  const { userRole } = useAuth();
  const { isDarkMode } = useDarkMode();

  const getIconByRole = (role) => {
    switch (role) {
      case "admin":
        return <FaUserShield />;

      case "Department":
        return <FaUserFriends />;
      case "Company":
        return <FaUserTie />;
      case "acadamic":
        return <FaUserCircle />;
      default:
        return <FaUserCircle />;
    }
  };

  return (
    <NavLink to={`/${userRole}/dashboard`}>
      <StyledLogo>
        <IconWrapper isDarkMode={isDarkMode}>
          {getIconByRole(userRole)}
        </IconWrapper>
      </StyledLogo>
    </NavLink>
  );
}

export default Logo;
