import styled from "styled-components";
import { NavLink } from "react-router-dom"; // Import NavLink
import DarkModeToggle from "../../ui/DarkModeToggle";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--color-grey-100);
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const Logo = styled.img`
  width: 100px;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-silver-600);
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-silver-600);
  gap: 1rem;
  margin-right: 20px;
`;

// Styled NavLink
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1.7rem;
  font-weight: 500;
  padding: 0 10px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const StyledButton = styled(NavLink)`
  background-color: #08b3c1;
  border-radius: 20px;
  color: #ffffff;
  padding: 3px 10px;

  &:hover {
    background-color: #087aa4;
    border-radius: 20px;
    color: #ffffff;
  }
`;

const HeadingContainer = styled.div`
  display: none;

  @media screen and (min-width: 592px) {
    display: block;
  }

  @media screen and (max-width: 650px) {
    font-size: 13px;
  }
`;

const HeadingText = styled.h2`
  margin: 0;
  font-size: 1.2em;
`;

// Header component
const Header = () => {
  return (
    <HeaderContainer>
      <NavLink to="/">
        <LeftContainer>
          <Logo src="/logo-light.png" alt="IPS" />
          <HeadingContainer>
            <HeadingText>Placement Portal</HeadingText>
          </HeadingContainer>
        </LeftContainer>
      </NavLink>
      <RightContainer>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/FAQ">FAQ</StyledNavLink>
        <DarkModeToggle />
        <StyledButton>
          <StyledNavLink to="/login">Login</StyledNavLink>
        </StyledButton>
      </RightContainer>
    </HeaderContainer>
  );
};

export default Header;
