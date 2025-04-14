import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header/Header";

// Styled components
const PageContainer = styled.div`
  padding-top: 80px;
  text-transform: uppercase;
  background-color: var(--color-grey-200);
  min-height: 100vh;
`;

const Container = styled.div`
  padding: 20px;
  background-color: var(--color-grey-50);
  border-radius: 10px;
  width: 90%; /* Change width to 90% for better responsiveness */
  max-width: 600px; /* Limit max-width for larger screens */
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column; /* Change to column layout for smaller screens */
  align-items: center; /* Center buttons vertically */
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #12a37f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #16a37f;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ResultType = () => {
  return (
    <PageContainer>
      <Header />
      <Container>
        <Title>Discover Your Results</Title>
        <ButtonContainer>
          <Link to="/student/placement-results">
            <Button>Placement Results</Button>
          </Link>
          <Link to="/student/evaluation-results">
            <Button>Evaluation Results</Button>
          </Link>
        </ButtonContainer>
      </Container>
    </PageContainer>
  );
};

export default ResultType;
