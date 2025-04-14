import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

import Heading from "../../ui/Heading";
import Button from "../../ui/Button";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

const headingStyle = {
  color: "#ff5733",
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
};

function Unauthorized() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleGoBack = () => {
    // Navigate back
    navigate("/login");
  };

  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h2">
          <h1 style={headingStyle}>Access Denied</h1>
          Sorry, you don't have the authorization to access the requested page.
        </Heading>
        <br />
        <Button onClick={handleGoBack} size="medium">
          &larr; Go login
        </Button>
      </Box>
    </StyledPageNotFound>
  );
}

export default Unauthorized;
